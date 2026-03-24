import { useEffect, useRef } from "react";

// ─── antigravity.google replica ───────────────────────────────────────────────
// · Evenly distributed across screen (grid + jitter, not pure random)
// · Angle always faces direction of motion  →  looks like objects flying in space
// · Always drifting — never stop
// · Cursor drags nearby particles along with it

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  length: number;
  thick: number;
  alpha: number;
}

const COUNT       = 200;
const DRAG_R      = 160;
const DRAG_R_SQ   = DRAG_R * DRAG_R;
const DRAG_FACTOR = 0.22;
const RETURN_RATE = 0.025;

function buildParticles(W: number, H: number): Particle[] {
  // grid layout → even spread, no clumping
  const cols   = Math.round(Math.sqrt(COUNT * (W / H)));
  const rows   = Math.ceil(COUNT / cols);
  const cellW  = W / cols;
  const cellH  = H / rows;
  const list: Particle[] = [];

  for (let r = 0; r < rows && list.length < COUNT; r++) {
    for (let c = 0; c < cols && list.length < COUNT; c++) {
      const speed = Math.random() * 0.3 + 0.15;     // 0.15 – 0.45 px/frame (slow, graceful)
      const dir   = Math.random() * Math.PI * 2;
      list.push({
        // jitter within cell so it's organic, not grid-rigid
        x:      (c + 0.15 + Math.random() * 0.7) * cellW,
        y:      (r + 0.15 + Math.random() * 0.7) * cellH,
        vx:     Math.cos(dir) * speed,
        vy:     Math.sin(dir) * speed,
        baseVx: Math.cos(dir) * speed,
        baseVy: Math.sin(dir) * speed,
        length: Math.random() * 8 + 5,              // 5 – 13 px  (small & delicate)
        thick:  Math.random() * 0.7 + 0.9,          // 0.9 – 1.6 px (thin)
        alpha:  Math.random() * 0.22 + 0.12,        // 0.12 – 0.34 (subtle)
      });
    }
  }
  return list;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = window.innerWidth;
    let H = window.innerHeight;

    let mouseX   = -9999, mouseY  = -9999;
    let prevX    = -9999, prevY   = -9999;
    let cursorVx = 0,     cursorVy = 0;
    let raf: number;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = devicePixelRatio || 1;
      canvas.width        = W * dpr;
      canvas.height       = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    let particles = buildParticles(W, H);

    const onMove = (e: MouseEvent) => {
      if (prevX !== -9999) {
        cursorVx = e.clientX - prevX;
        cursorVy = e.clientY - prevY;
      }
      prevX = mouseX = e.clientX;
      prevY = mouseY = e.clientY;
    };
    const onLeave = () => {
      mouseX = mouseY = prevX = prevY = -9999;
      cursorVx = cursorVy = 0;
    };
    const onResize = () => {
      resize();
      particles = buildParticles(W, H);
    };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize",     onResize);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      // cursor velocity decays each frame
      cursorVx *= 0.82;
      cursorVy *= 0.82;

      ctx.fillStyle = "rgba(200,192,255,1)"; // soft lavender — visible on dark bg

      for (const p of particles) {
        // ── cursor drag ──────────────────────────────────────────────────
        const dx     = p.x - mouseX;
        const dy     = p.y - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < DRAG_R_SQ && mouseX !== -9999) {
          const w = 1 - Math.sqrt(distSq) / DRAG_R;
          p.vx   += cursorVx * w * DRAG_FACTOR;
          p.vy   += cursorVy * w * DRAG_FACTOR;
        }

        // ── return to natural drift ──────────────────────────────────────
        p.vx += (p.baseVx - p.vx) * RETURN_RATE;
        p.vy += (p.baseVy - p.vy) * RETURN_RATE;

        // ── integrate ────────────────────────────────────────────────────
        p.x += p.vx;
        p.y += p.vy;

        // ── wrap edges ───────────────────────────────────────────────────
        const pad = p.length + 4;
        if (p.x < -pad)    p.x = W + pad;
        if (p.x > W + pad) p.x = -pad;
        if (p.y < -pad)    p.y = H + pad;
        if (p.y > H + pad) p.y = -pad;

        // ── angle FOLLOWS velocity — key premium touch ───────────────────
        const angle = Math.atan2(p.vy, p.vx);

        // ── draw ─────────────────────────────────────────────────────────
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.roundRect(
          -p.length / 2, -p.thick / 2,
           p.length,       p.thick,
          p.thick / 2
        );
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize",     onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  );
}
