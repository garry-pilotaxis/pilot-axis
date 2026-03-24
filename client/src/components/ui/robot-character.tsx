import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── palette ────────────────────────────────────────────────────────────────────
const C  = "#9b8bf4";
const PD = "rgba(109,92,231,0.18)";
const PB = "rgba(109,92,231,0.32)";

// ── jokes (cycling, never the same twice in a row) ────────────────────────────
const JOKES = [
  "Still answering calls manually?\nBold strategy. 📞",
  "Miss a call. Miss a client.\nMiss a mortgage payment. 😬",
  "Your voicemail is full.\nSo is your competitor's wallet. 💸",
  "You: 'I'll call back later.'\nThem: *books with someone else* 🏃",
  "Sticky-note CRM.\nClassic. Timeless. Financially risky. 📝",
  "Your hold music slaps.\nToo bad no one stayed to hear it. 🎵",
  "Manual scheduling:\nwhere appointments go to die. ⚰️",
  "847 unread emails.\n12 were bookings. RIP. 📭",
  "Hiring a receptionist in 2025\nis very vintage of you. 🏛️",
  "You missed 3 calls while\nreading this. Just saying. 👀",
  "Your CRM is a spreadsheet\nyour intern made in 2019. 💀",
  "The AI works 24/7.\nYou do not. One of you is winning. 🤖",
];

function getNextJoke(current: number) {
  const next = Math.floor(Math.random() * JOKES.length);
  return next === current ? (next + 1) % JOKES.length : next;
}

// ── speech bubble ─────────────────────────────────────────────────────────────
function Bubble({ text, isHi }: { text: string; isHi?: boolean }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, scale: 0.7, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{    opacity: 0, scale: 0.7, y: 6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        position: "absolute",
        bottom: "calc(100% + 12px)",
        right: isHi ? "50%" : 0,
        transform: isHi ? "translateX(50%)" : undefined,
        minWidth: 170,
        maxWidth: 230,
        background: "rgba(15,12,40,0.96)",
        border: `1px solid ${PB}`,
        padding: "10px 14px",
        borderRadius: 14,
        fontSize: 12.5,
        fontWeight: 500,
        lineHeight: 1.55,
        color: "rgba(255,255,255,0.88)",
        whiteSpace: "pre-line",
        backdropFilter: "blur(14px)",
        boxShadow: "0 0 24px rgba(109,92,231,0.35), 0 4px 20px rgba(0,0,0,0.5)",
        zIndex: 10,
      }}
    >
      {/* purple top bar */}
      <div style={{
        position: "absolute", top: 0, left: 12, right: 12, height: 2,
        background: `linear-gradient(90deg, transparent, ${C}, transparent)`,
        borderRadius: 2,
      }} />
      {text}
      {/* tail */}
      <span style={{
        position: "absolute",
        bottom: -8,
        right: isHi ? "50%" : 18,
        marginRight: isHi ? -7 : 0,
        borderLeft:  "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop:   "8px solid rgba(15,12,40,0.96)",
      }} />
    </motion.div>
  );
}

// ── thruster ──────────────────────────────────────────────────────────────────
function Thruster() {
  return (
    <motion.div
      animate={{ scaleY: [0.7, 1.4, 0.6, 1.2, 0.8], opacity: [0.7, 0.4, 0.9, 0.5, 0.7] }}
      transition={{ duration: 0.35, repeat: Infinity }}
      style={{
        position: "absolute",
        bottom: -14, left: "50%", marginLeft: -6,
        width: 12, height: 18,
        background: "linear-gradient(to bottom, rgba(155,139,244,0.95), rgba(109,92,231,0.4), transparent)",
        borderRadius: "0 0 50% 50%",
        transformOrigin: "top center",
        filter: "blur(2px)",
      }}
    />
  );
}

// ── robot svg ─────────────────────────────────────────────────────────────────
function RobotSVG({ phase }: { phase: Phase }) {
  const waving  = phase === "waving";
  const flying  = phase === "flying";
  const resting = phase === "resting";

  return (
    <svg width="68" height="92" viewBox="0 0 68 92" fill="none" style={{ overflow: "visible" }}>
      <defs>
        <filter id="rg2"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="eg2"><feGaussianBlur stdDeviation="3.5" result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      {/* antenna */}
      <line x1="34" y1="2" x2="34" y2="14" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
      <motion.circle cx="34" cy="3" r="3.5" fill={C} filter="url(#eg2)"
        animate={{ r: [3, 4.2, 3], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />

      {/* head */}
      <rect x="11" y="14" width="46" height="32" rx="9" stroke={C} strokeWidth="1.6" filter="url(#rg2)"/>

      {/* eyes — blink when resting */}
      <motion.g animate={resting ? { scaleY: [1, 1, 0.1, 1, 1, 1, 1, 0.1, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "34px 29px" }}
      >
        <circle cx="25" cy="29" r="5" fill={C} filter="url(#eg2)" opacity="0.9"/>
        <circle cx="43" cy="29" r="5" fill={C} filter="url(#eg2)" opacity="0.9"/>
        <circle cx="27" cy="27" r="1.6" fill="rgba(255,255,255,0.9)"/>
        <circle cx="45" cy="27" r="1.6" fill="rgba(255,255,255,0.9)"/>
      </motion.g>

      {/* mouth — smile or smirk */}
      <path d={resting ? "M22 38 Q34 46 46 38" : "M21 39 Q34 47 47 39"}
        stroke={C} strokeWidth="1.6" strokeLinecap="round" fill="none" filter="url(#rg2)"/>

      {/* body */}
      <rect x="14" y="51" width="40" height="29" rx="7" stroke={C} strokeWidth="1.6" filter="url(#rg2)"/>
      <rect x="24" y="58" width="20" height="11" rx="3" stroke={C} strokeWidth="1" opacity="0.45"/>
      <motion.circle cx="34" cy="63" r="4" fill={C} filter="url(#eg2)"
        animate={{ r: [3.4, 4.6, 3.4], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.3, repeat: Infinity }}
      />

      {/* LEFT arm — waves */}
      <motion.g style={{ transformOrigin: "14px 56px" }}
        animate={
          waving  ? { rotate: [8, -52, 14, -52, 14, -52, 8, 0] } :
          flying  ? { rotate: [0, 10, -10, 0] } :
          resting ? { rotate: [0, -12, 0] } : { rotate: 0 }
        }
        transition={
          waving  ? { duration: 2.6, ease: "easeInOut" } :
          flying  ? { duration: 1.1, repeat: Infinity } :
          resting ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" } :
          {}
        }
      >
        <rect x="1" y="53" width="13" height="8" rx="4" stroke={C} strokeWidth="1.5" filter="url(#rg2)"/>
        <circle cx="2" cy="57" r="4.2" stroke={C} strokeWidth="1.4" filter="url(#rg2)"/>
        {waving && <line x1="2" y1="53" x2="2" y2="49" stroke={C} strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>}
      </motion.g>

      {/* RIGHT arm */}
      <motion.g style={{ transformOrigin: "54px 56px" }}
        animate={flying ? { rotate: [0, -10, 10, 0] } : resting ? { rotate: [0, 12, 0] } : { rotate: 0 }}
        transition={flying ? { duration: 1.1, repeat: Infinity, delay: 0.3 } : resting ? { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 } : {}}
      >
        <rect x="54" y="53" width="13" height="8" rx="4" stroke={C} strokeWidth="1.5" filter="url(#rg2)"/>
        <circle cx="66" cy="57" r="4.2" stroke={C} strokeWidth="1.4" filter="url(#rg2)"/>
      </motion.g>

      {/* legs */}
      <motion.g
        animate={{ y: resting ? [0, -2, 0] : flying ? [-2, 2, -2] : 0 }}
        transition={{ duration: resting ? 2 : 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="19" y="80" width="12" height="12" rx="5" stroke={C} strokeWidth="1.5" filter="url(#rg2)"/>
        <rect x="37" y="80" width="12" height="12" rx="5" stroke={C} strokeWidth="1.5" filter="url(#rg2)"/>
      </motion.g>
    </svg>
  );
}

// ── main component ─────────────────────────────────────────────────────────────
type Phase = "falling" | "waving" | "flying" | "resting";

export function RobotCharacter() {
  const [phase, setPhase]         = useState<Phase>("falling");
  const [showBubble, setShowBubble] = useState(false);
  const [hiMode, setHiMode]       = useState(true);
  const [jokeIdx, setJokeIdx]     = useState(0);
  const dims = useRef({ w: 1200, h: 800 });

  useEffect(() => {
    dims.current = { w: window.innerWidth, h: window.innerHeight };

    // sequence
    const t1 = setTimeout(() => { setPhase("waving"); setShowBubble(true); },              1100);
    const t2 = setTimeout(() => { setShowBubble(false); },                                  3300);
    const t3 = setTimeout(() => { setPhase("flying"); },                                    3700);
    const t4 = setTimeout(() => {
      setPhase("resting");
      setTimeout(() => { setHiMode(false); setJokeIdx(0); setShowBubble(true); }, 600);
    }, 13700); // 10 s of flying

    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  // cycle jokes every 5 s while resting
  useEffect(() => {
    if (phase !== "resting" || !showBubble || hiMode) return;
    const id = setInterval(() => setJokeIdx(p => getNextJoke(p)), 5200);
    return () => clearInterval(id);
  }, [phase, showBubble, hiMode]);

  const { w, h } = dims.current;
  const landX = w / 2 - 34;
  const landY = h * 0.37;
  const restX = w - 110;
  const restY = h - 140;

  // 10-second flight path touching all corners
  const fx = [landX, w*.82, w*.08, w*.70, w*.06, w*.85, w*.45, restX];
  const fy = [landY, h*.08, h*.65, h*.12, h*.55, h*.72, h*.25, restY];

  const bubble = hiMode
    ? "Hi there! 👋"
    : JOKES[jokeIdx];

  return (
    <motion.div
      className="pointer-events-none select-none"
      style={{ position: "fixed", left: 0, top: 0, zIndex: 9000 }}
      initial={{ x: landX, y: -130 }}
      animate={
        phase === "falling" || phase === "waving"
          ? { x: landX, y: landY }
          : phase === "flying"
          ? { x: fx, y: fy }
          : { x: restX, y: restY }
      }
      transition={
        phase === "falling"
          ? { type: "spring", damping: 9, stiffness: 70 }
          : phase === "waving"
          ? {}
          : phase === "flying"
          ? { duration: 10, ease: [0.4, 0, 0.2, 1] }
          : { type: "spring", damping: 14, stiffness: 60 }
      }
    >
      {/* gentle idle float when resting */}
      <motion.div
        animate={phase === "resting" ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "relative", display: "inline-block" }}
      >
        {phase === "flying" && <Thruster />}
        <RobotSVG phase={phase} />
        <AnimatePresence mode="wait">
          {showBubble && <Bubble key={bubble} text={bubble} isHi={hiMode} />}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
