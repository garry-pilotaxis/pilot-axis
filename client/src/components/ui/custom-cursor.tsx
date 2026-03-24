import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef     = useRef<HTMLDivElement>(null);
  const bracketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot     = dotRef.current;
    const bracket = bracketRef.current;
    if (!dot || !bracket) return;

    let mouseX = 0, mouseY = 0;
    let bX = 0,     bY = 0;
    let raf: number;
    let magnetEl: HTMLElement | null = null;  // currently hovered magnetic element

    // ── dark-section detection ────────────────────────────────────────────
    const isDark = (el: Element | null): boolean => {
      while (el && el !== document.body) {
        const bg    = getComputedStyle(el).backgroundColor;
        const match = bg.match(/[\d.]+/g);
        if (match && match.length >= 3) {
          const r = Number(match[0]), g = Number(match[1]), b = Number(match[2]);
          const a = match.length >= 4 ? Number(match[3]) : 1;
          if (a < 0.1) { el = el.parentElement; continue; }
          if (0.299 * r + 0.587 * g + 0.114 * b < 80) return true;
          return false;
        }
        el = el.parentElement;
      }
      return false;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      document.body.classList.toggle("cursor-dark", isDark(el));
    };

    // ── magnetic hover ────────────────────────────────────────────────────
    const onEnter = (e: Event) => {
      magnetEl = e.currentTarget as HTMLElement;
      document.body.classList.add("cursor-hover");
    };
    const onLeave = () => {
      magnetEl = null;
      document.body.classList.remove("cursor-hover");
    };

    const bindInteractives = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, label")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    // ── animation loop ────────────────────────────────────────────────────
    const animate = () => {
      // dot tracks instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;

      // bracket target — pulled toward magnet element centre when hovering
      let targetX = mouseX;
      let targetY = mouseY;

      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        // pull 22% toward element centre — feels magnetic, not teleporting
        targetX = mouseX + (cx - mouseX) * 0.22;
        targetY = mouseY + (cy - mouseY) * 0.22;
      }

      bX += (targetX - bX) * 0.14;
      bY += (targetY - bY) * 0.14;
      bracket.style.left = `${bX}px`;
      bracket.style.top  = `${bY}px`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    bindInteractives();
    raf = requestAnimationFrame(animate);

    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={bracketRef} className="cursor-bracket">
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>
    </>
  );
}
