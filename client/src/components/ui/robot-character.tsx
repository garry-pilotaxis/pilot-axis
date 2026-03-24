import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── palette ────────────────────────────────────────────────────────────────────
const C  = "#9b8bf4";           // body colour
const CG = "rgba(109,92,231,0.85)"; // glow
const EG = "rgba(155,139,244,0.9)"; // eye glow

// ── speech bubble ─────────────────────────────────────────────────────────────
function Bubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{   opacity: 0, scale: 0.4, y: 8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: "absolute",
        bottom: "calc(100% + 10px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(109,92,231,0.92)",
        border: "1px solid rgba(155,139,244,0.6)",
        padding: "7px 16px",
        borderRadius: 24,
        fontSize: 15,
        fontWeight: 700,
        color: "#fff",
        whiteSpace: "nowrap",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 20px rgba(109,92,231,0.5), 0 0 40px rgba(109,92,231,0.2)",
        letterSpacing: "0.02em",
      }}
    >
      Hi there! 👋
      {/* tail */}
      <span style={{
        position: "absolute",
        bottom: -8,
        left: "50%",
        marginLeft: -7,
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop: "8px solid rgba(109,92,231,0.92)",
      }} />
    </motion.div>
  );
}

// ── thruster flame (shows while flying) ───────────────────────────────────────
function Thruster({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: [0.8, 0.4, 0.9, 0.5, 0.8], scaleY: [0.8, 1.3, 0.7, 1.2, 0.9] }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: -14,
            left: "50%",
            marginLeft: -6,
            width: 12,
            height: 16,
            background: "linear-gradient(to bottom, rgba(155,139,244,0.9), rgba(109,92,231,0.3), transparent)",
            borderRadius: "0 0 50% 50%",
            transformOrigin: "top center",
            filter: "blur(2px)",
          }}
        />
      )}
    </AnimatePresence>
  );
}

// ── robot svg ─────────────────────────────────────────────────────────────────
function RobotSVG({ waving, flying }: { waving: boolean; flying: boolean }) {
  return (
    <svg width="72" height="96" viewBox="0 0 72 96" fill="none" style={{ overflow: "visible" }}>
      {/* ── glow filter ─────────────────────────────────────────────────── */}
      <defs>
        <filter id="rg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="eg" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── antenna ──────────────────────────────────────────────────────── */}
      <line x1="36" y1="2" x2="36" y2="15" stroke={C} strokeWidth="1.5" strokeLinecap="round" />
      <motion.circle
        cx="36" cy="3" r="4" fill={C} filter="url(#eg)"
        animate={{ r: [3.5, 4.5, 3.5], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      {/* ── head ─────────────────────────────────────────────────────────── */}
      <rect x="12" y="15" width="48" height="34" rx="9" stroke={C} strokeWidth="1.6" filter="url(#rg)" />

      {/* ── eyes ─────────────────────────────────────────────────────────── */}
      <motion.circle
        cx="27" cy="29" r="5.5" fill={C} filter="url(#eg)"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.1 }}
      />
      <motion.circle
        cx="45" cy="29" r="5.5" fill={C} filter="url(#eg)"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
      />
      {/* eye shine */}
      <circle cx="29" cy="27" r="1.8" fill="rgba(255,255,255,0.85)" />
      <circle cx="47" cy="27" r="1.8" fill="rgba(255,255,255,0.85)" />

      {/* ── mouth ────────────────────────────────────────────────────────── */}
      <path d="M22 40 Q36 49 50 40" stroke={C} strokeWidth="1.6" strokeLinecap="round" fill="none" filter="url(#rg)" />

      {/* ── body ─────────────────────────────────────────────────────────── */}
      <rect x="16" y="53" width="40" height="30" rx="7" stroke={C} strokeWidth="1.6" filter="url(#rg)" />
      {/* chest panel */}
      <rect x="26" y="60" width="20" height="12" rx="3" stroke={C} strokeWidth="1" opacity="0.5" />
      {/* chest light */}
      <motion.circle
        cx="36" cy="66" r="4" fill={C} filter="url(#eg)"
        animate={{ r: [3.5, 4.5, 3.5], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />

      {/* ── left arm — WAVES ─────────────────────────────────────────────── */}
      <motion.g
        style={{ transformOrigin: "16px 58px" }}
        animate={waving
          ? { rotate: [10, -55, 15, -55, 15, -55, 10, 0] }
          : flying
          ? { rotate: [0, 8, -8, 0] }
          : { rotate: 0 }
        }
        transition={waving
          ? { duration: 2.4, ease: "easeInOut" }
          : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <rect x="1" y="54" width="15" height="9" rx="4.5" stroke={C} strokeWidth="1.5" filter="url(#rg)" />
        {/* hand */}
        <circle cx="2" cy="58" r="4.5" stroke={C} strokeWidth="1.4" filter="url(#rg)" />
        {/* finger */}
        <line x1="2" y1="54" x2="2" y2="50" stroke={C} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </motion.g>

      {/* ── right arm ────────────────────────────────────────────────────── */}
      <motion.g
        style={{ transformOrigin: "56px 58px" }}
        animate={flying ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <rect x="56" y="54" width="15" height="9" rx="4.5" stroke={C} strokeWidth="1.5" filter="url(#rg)" />
        <circle cx="70" cy="58" r="4.5" stroke={C} strokeWidth="1.4" filter="url(#rg)" />
      </motion.g>

      {/* ── legs — idle bob / flying spread ──────────────────────────────── */}
      <motion.g
        animate={flying ? { y: [-2, 2, -2] } : { y: 0 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="20" y="83" width="13" height="13" rx="5" stroke={C} strokeWidth="1.5" filter="url(#rg)" />
        <rect x="39" y="83" width="13" height="13" rx="5" stroke={C} strokeWidth="1.5" filter="url(#rg)" />
      </motion.g>
    </svg>
  );
}

// ── main exported component ────────────────────────────────────────────────────
type Phase = "falling" | "waving" | "flying";

export function RobotCharacter() {
  const [phase, setPhase]       = useState<Phase>("falling");
  const [showBubble, setShowBubble] = useState(false);
  const dims = useRef({ w: 800, h: 700 });

  useEffect(() => {
    dims.current = { w: window.innerWidth, h: window.innerHeight };

    const t1 = setTimeout(() => { setPhase("waving"); setShowBubble(true); },  1200);
    const t2 = setTimeout(() => { setShowBubble(false); },                      3400);
    const t3 = setTimeout(() => { setPhase("flying"); },                        3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const { w, h } = dims.current;

  // Land target — just below the hero headline, roughly centred
  const landX = w / 2 - 36;
  const landY = h * 0.38;

  // Flying waypoints: visits all four quadrants + center
  const fx = [landX, w * 0.78, w * 0.08, w * 0.65, w * 0.12, w * 0.82, w * 0.40, w * 0.55];
  const fy = [landY, h * 0.08, h * 0.60, h * 0.15, h * 0.72, h * 0.55, h * 0.30, h * 0.70];

  return (
    <motion.div
      className="pointer-events-none select-none"
      style={{ position: "fixed", left: 0, top: 0, zIndex: 9000 }}
      initial={{ x: landX, y: -130 }}
      animate={
        phase === "falling" || phase === "waving"
          ? { x: landX, y: landY, rotate: 0 }
          : { x: fx,    y: fy,    rotate: [0, -8, 6, -5, 8, -4, 0, 3] }
      }
      transition={
        phase === "falling"
          ? { type: "spring", damping: 9, stiffness: 70 }
          : phase === "waving"
          ? { duration: 0.1 }
          : {
              duration: 16,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }
      }
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <Thruster active={phase === "flying"} />
        <RobotSVG waving={phase === "waving"} flying={phase === "flying"} />
        <AnimatePresence>{showBubble && <Bubble />}</AnimatePresence>
      </div>
    </motion.div>
  );
}
