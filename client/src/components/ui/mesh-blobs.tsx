/**
 * MeshBlobs — textured, grainy gradient orbs
 * Each blob is a blurred radial gradient with an SVG grain filter on top.
 * Use as a fixed full-screen layer (already handled in App.tsx).
 */

interface Blob {
  color: string;
  size: number;
  top?: string; bottom?: string;
  left?: string; right?: string;
  blur: number;
  opacity: number;
}

const BLOBS: Blob[] = [
  { color: "109,92,231",   size: 700, top: "-8%",  right: "-6%",  blur: 70,  opacity: 0.10 },
  { color: "79,70,229",    size: 550, bottom: "5%", left: "-8%",   blur: 90,  opacity: 0.07 },
  { color: "139,92,246",   size: 420, top: "35%",   left: "30%",   blur: 110, opacity: 0.05 },
  { color: "45,212,191",   size: 380, bottom: "20%",right: "10%",  blur: 100, opacity: 0.04 },
  { color: "99,102,241",   size: 320, top: "60%",   left: "60%",   blur: 80,  opacity: 0.04 },
];

export function MeshBlobs() {
  return (
    <>
      {/* SVG grain filter definition — referenced by blobs */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="blob-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.62"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {BLOBS.map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width:  b.size,
              height: b.size,
              top:    b.top,
              bottom: b.bottom,
              left:   b.left,
              right:  b.right,
              borderRadius: "50%",
              background: `radial-gradient(circle at 40% 40%,
                rgba(${b.color},${b.opacity}) 0%,
                rgba(${b.color},${b.opacity * 0.5}) 40%,
                transparent 70%)`,
              filter: `blur(${b.blur}px)`,
              // grain texture via SVG filter on a pseudo-element isn't possible
              // so we layer a grain div on top of each blob
            }}
          >
            {/* grain overlay for this blob */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                backgroundSize: "180px 180px",
                opacity: 0.18,
                mixBlendMode: "overlay",
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
