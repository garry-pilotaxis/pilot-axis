import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CursorGlow() {
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const springX = useSpring(mouseX, { stiffness: 80, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25, mass: 0.5 });

  // Slow parallax for ambient orbs
  const slowX = useSpring(mouseX, { stiffness: 20, damping: 40, mass: 1 });
  const slowY = useSpring(mouseY, { stiffness: 20, damping: 40, mass: 1 });

  const orbX = useTransform(
    slowX,
    [0, typeof window !== "undefined" ? window.innerWidth : 1440],
    [-60, 60]
  );
  const orbY = useTransform(
    slowY,
    [0, typeof window !== "undefined" ? window.innerHeight : 900],
    [-40, 40]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden
    >
      {/* Primary cursor spotlight — works on light sections via multiply */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(0,0,0,0.055) 0%, transparent 65%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Secondary spotlight — works on dark sections via screen */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Ambient orb top-right — parallaxes with cursor */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 900,
          height: 900,
          right: -200,
          top: -200,
          x: orbX,
          y: orbY,
          background:
            "radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 60%)",
        }}
      />

      {/* Ambient orb bottom-left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 800,
          height: 800,
          left: -200,
          bottom: -200,
          x: useTransform(orbX, (v) => -v * 0.6),
          y: useTransform(orbY, (v) => -v * 0.6),
          background:
            "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
