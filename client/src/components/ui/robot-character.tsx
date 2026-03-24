import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── palette ────────────────────────────────────────────────────────────────────
const C  = "#9b8bf4";
const PB = "rgba(109,92,231,0.32)";

// ── jokes ─────────────────────────────────────────────────────────────────────
const JOKES = [
  "Your 'system' for following up with leads\nis a sticky note that says 'call Dave' from 2019.\nDave moved. 💀😂",
  "You manually copy-paste data between spreadsheets.\nYour intern quit.\nYour intern was also you. 💀🔥",
  "Your business runs 9 to 5.\nAI runs 24/7. Your competitor chose AI.\nYou chose a lunch break. 😂💀",
  "You still reply to every inquiry by hand.\nSomewhere, a robot is laughing.\nEfficiently. Without taking breaks. 🤖💀",
  "Your follow-up sequence:\nemail Monday, forget Tuesday, panic Friday,\nblame the lead by Saturday. 😂🔥",
  "You hired someone just to send the same email 200 times.\nThat person has a degree. 💀😂",
  "Your CRM is a Gmail inbox\nwith 14,000 unread messages\nand a search bar you've given up on. 💀🔥",
  "You set a reminder to send a reminder\nto remember to follow up.\nThe reminder has a reminder. 😂💀",
  "You're doing $8/hour data entry work\nwhile your $8,000/month clients wait on hold.\nRespectable hustle. 💀🔥",
  "Your voicemail says 'I'll get back to you shortly.'\nThat message is from 2021. 😂💀",
  "You track your leads in a notebook.\nA physical one. With a pen.\nThat ran out of ink in March. 💀😂",
  "Your competitor's AI answered 47 calls last night.\nYou answered 0. You were sleeping.\nFair enough, but still. 🔥💀",
  "You built a 6-figure business\non spreadsheets and vibes.\nIncredible. Also terrifying. 😂💀",
  "Your 'automation' is telling your assistant\nto 'just remember it.' 💀🔥",
  "You have a 'system' for onboarding clients.\nThe system is you, panicking, at 11pm. 😂💀",
  "You spent 3 hours this week chasing a payment\nthat a workflow would've collected automatically\nin 3 seconds. 💀🔥",
  "Your business has a bottleneck.\nThe bottleneck is you.\nYou are aware. You have done nothing. 😂💀",
  "You print emails to read them on the go.\nOn the go means your kitchen. 💀😂",
  "You manually send birthday emails to clients.\nSweet. Also, you forgot 11 of them this year. 🔥💀",
  "Your appointment booking process:\nemail back and forth 7 times, settle on a time,\nthey cancel, repeat. 😂💀",
  "You spent $500 on a logo\nand $0 on anything that saves you time.\nThe logo is beautiful. You have no time to enjoy it. 💀🔥",
  "'I'll automate it next month'\nis your most used sentence.\nThis month is next month from last month. 😂💀",
  "Your business operates like a Formula 1 car\nbeing steered with a garden hose. 💀🔥",
  "You have 3 browser tabs open: your inbox,\nyour other inbox, and a YouTube video about productivity\nyou paused 4 days ago. 😂💀",
  "Your response time is 'as soon as possible.'\nPossible has been taking weekends off. 💀🔥",
  "You once missed a $4,000 lead\nbecause you were in a meeting\nabout the leads you were missing. 😂💀",
  "Your onboarding doc is a PDF from 2018\nwith a font your computer no longer supports. 💀🔥",
  "You're the CEO, CFO, CMO,\nand also the person who orders the printer paper. 😂💀",
  "Your competitor uses AI to qualify leads while they sleep.\nYou qualify leads while you skip sleep. 💀🔥",
  "Your 'growth strategy' is hoping the right person finds you on Google\nand isn't scared off by your contact form. 😂💀",
  "You answer the same 6 client questions every single day.\nBy hand. One at a time.\nWith your fingers. On a keyboard. 💀🔥",
  "Your business has no automation\nbecause you 'like the personal touch.'\nYour burnout also has a personal touch. 😂💀",
  "You track your revenue in a spreadsheet\nthat only you understand,\nand even you don't understand it anymore. 💀🔥",
  "You've been meaning to 'set up a proper system'\nsince the Obama administration. 😂💀",
  "Your intake form is someone emailing you\nand you just hoping you remember to write it down. 💀🔥",
  "You do your own invoicing, chasing, filing, and crying.\nVery entrepreneurial. Very unnecessary. 😂💀",
  "Your business is built on you showing up every day.\nWhat a fragile empire. 💀🔥",
  "You manually check if your team finished their tasks.\nYour team is two people.\nOne of them is your spouse. 😂💀",
  "Your pipeline is a mental map that lives entirely in your head\nand updates randomly at 2am. 💀🔥",
  "You spent 40 hours this month on tasks\nthat cost less than minimum wage to automate.\nBold financial strategy. 😂💀",
  "You once described your business as 'mostly under control.'\nThat was a very brave sentence. 💀🔥",
  "Your clients wait 6 hours for a reply.\nYour competitor's AI replied in 6 seconds.\nSame client. Different result. 😂💀",
  "You're still deciding whether to automate.\nThe automation has been waiting patiently.\nIt has no feelings. It will wait forever. 💀🔥",
  "Your scheduling process involves 4 emails,\n2 texts, a phone call, and a mild grudge. 😂💀",
  "You have a whiteboard full of ideas\nand zero workflows turning them into money. 💀🔥",
  "You call it 'being hands-on.'\nYour therapist calls it something else. 😂💀",
  "Your business is thriving despite your systems,\nnot because of them.\nThat's not a compliment. 💀🔥",
  "You spent Tuesday manually sending 80 invoices.\nTuesday is gone.\nThe invoices are still partially sent. 😂💀",
  "You don't use AI because you 'tried ChatGPT once and it was weird.'\nA hammer once slipped and hit your thumb\nbut you still use hammers. 💀🔥",
  "You built a business from nothing, hired a team,\nserved hundreds of clients, and still run it all\nthrough your brain and a Gmail account.\nHonestly? Respect. Also — there's a better way.\npilotaxis.ca 🔥😂",
];

function getNextJoke(current: number) {
  if (JOKES.length <= 1) return 0;
  let next = Math.floor(Math.random() * JOKES.length);
  while (next === current) next = Math.floor(Math.random() * JOKES.length);
  return next;
}

// ── static joke bubble (fixed to screen, not robot) ──────────────────────────
function JokeBubble({ text }: { text: string }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, x: -18, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -18, scale: 0.88 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        position: "fixed",
        left: 148,
        bottom: 110,
        minWidth: 220,
        maxWidth: 290,
        background: "rgba(15,12,40,0.97)",
        border: `1px solid ${PB}`,
        padding: "12px 16px",
        borderRadius: 16,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.88)",
        whiteSpace: "pre-line",
        backdropFilter: "blur(18px)",
        boxShadow: "0 0 32px rgba(109,92,231,0.4), 0 6px 28px rgba(0,0,0,0.55)",
        zIndex: 9001,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* purple top bar */}
      <div style={{
        position: "absolute", top: 0, left: 14, right: 14, height: 2,
        background: `linear-gradient(90deg, transparent, ${C}, transparent)`,
        borderRadius: 2,
      }} />
      {text}
      {/* left-pointing tail (toward robot on left) */}
      <span style={{
        position: "absolute",
        left: -8,
        top: "50%",
        marginTop: -7,
        borderTop:    "7px solid transparent",
        borderBottom: "7px solid transparent",
        borderRight:  "8px solid rgba(15,12,40,0.97)",
      }} />
    </motion.div>
  );
}

// ── hi bubble (stays relative to robot, shows when waving) ───────────────────
function HiBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{    opacity: 0, scale: 0.7, y: 6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        position: "absolute",
        bottom: "calc(100% + 12px)",
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: 130,
        background: "rgba(15,12,40,0.96)",
        border: `1px solid ${PB}`,
        padding: "9px 14px",
        borderRadius: 14,
        fontSize: 13,
        fontWeight: 600,
        color: "rgba(255,255,255,0.9)",
        textAlign: "center",
        whiteSpace: "nowrap",
        backdropFilter: "blur(14px)",
        boxShadow: "0 0 24px rgba(109,92,231,0.35), 0 4px 20px rgba(0,0,0,0.5)",
        zIndex: 10,
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 12, right: 12, height: 2,
        background: `linear-gradient(90deg, transparent, ${C}, transparent)`,
        borderRadius: 2,
      }} />
      Hi there! 👋
      <span style={{
        position: "absolute",
        bottom: -8,
        left: "50%",
        marginLeft: -7,
        borderLeft:  "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop:   "8px solid rgba(15,12,40,0.96)",
      }} />
    </motion.div>
  );
}

// ── robot svg ─────────────────────────────────────────────────────────────────
type Phase = "falling" | "waving" | "resting";

function RobotSVG({ phase, laughing, pointing }: { phase: Phase; laughing: boolean; pointing: boolean }) {
  const waving  = phase === "waving";
  const resting = phase === "resting";
  const calm    = resting && !laughing && !pointing;

  return (
    <svg width="68" height="92" viewBox="0 0 68 92" fill="none" style={{ overflow: "visible" }}>
      <defs>
        <filter id="rg2"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="eg2"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      {/* antenna */}
      <line x1="34" y1="2" x2="34" y2="14" stroke={C} strokeWidth="1.5" strokeLinecap="round"/>
      <motion.circle cx="34" cy="3" r="3.5" fill={C} filter="url(#eg2)"
        animate={{ r: [3, 4.2, 3], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />

      {/* head */}
      <rect x="11" y="14" width="46" height="32" rx="9" stroke={C} strokeWidth="1.6" filter="url(#rg2)"/>

      {/* eyes */}
      <motion.g
        animate={
          laughing
            ? { scaleY: [1, 0.06, 1, 0.06, 1, 0.06, 1, 0.06, 1, 0.06, 1] }
            : calm
            ? { scaleY: [1, 1, 0.1, 1, 1, 1, 1, 0.1, 1] }
            : {}
        }
        transition={
          laughing
            ? { duration: 0.22, repeat: 4, ease: "easeInOut" }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformOrigin: "34px 29px" }}
      >
        <circle cx="25" cy="29" r="5" fill={C} filter="url(#eg2)" opacity="0.9"/>
        <circle cx="43" cy="29" r="5" fill={C} filter="url(#eg2)" opacity="0.9"/>
        <circle cx="27" cy="27" r="1.6" fill="rgba(255,255,255,0.9)"/>
        <circle cx="45" cy="27" r="1.6" fill="rgba(255,255,255,0.9)"/>
      </motion.g>

      {/* mouth — huge open grin when laughing, gentle smile otherwise */}
      <motion.path
        d={laughing ? "M16 36 Q34 58 52 36" : resting ? "M22 38 Q34 46 46 38" : "M21 39 Q34 47 47 39"}
        stroke={C} strokeWidth="1.6" strokeLinecap="round" fill="none" filter="url(#rg2)"
        animate={{ d: laughing ? "M16 36 Q34 58 52 36" : "M22 38 Q34 46 46 38" }}
        transition={{ duration: 0.15 }}
      />
      {/* open mouth fill when laughing */}
      {laughing && (
        <motion.path
          d="M18 37 Q34 56 50 37 Q34 42 18 37"
          fill={C} opacity={0.18}
          initial={{ opacity: 0 }} animate={{ opacity: 0.18 }}
        />
      )}

      {/* body */}
      <rect x="14" y="51" width="40" height="29" rx="7" stroke={C} strokeWidth="1.6" filter="url(#rg2)"/>
      <rect x="24" y="58" width="20" height="11" rx="3" stroke={C} strokeWidth="1" opacity="0.45"/>
      <motion.circle cx="34" cy="63" r="4" fill={C} filter="url(#eg2)"
        animate={{ r: [3.4, 4.6, 3.4], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.3, repeat: Infinity }}
      />

      {/* LEFT arm */}
      <motion.g style={{ transformOrigin: "14px 56px" }}
        animate={
          laughing  ? { rotate: [-85, -5, -90, -3, -85, -5, -85, -3, -85] } :
          waving    ? { rotate: [8, -52, 14, -52, 14, -52, 8, 0] } :
          pointing  ? { rotate: [-20, -28, -20] } :
          calm      ? { rotate: [0, -12, 0] } : { rotate: 0 }
        }
        transition={
          laughing  ? { duration: 0.18, repeat: 7, ease: "easeInOut" } :
          waving    ? { duration: 2.6, ease: "easeInOut" } :
          pointing  ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } :
          calm      ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" } :
          {}
        }
      >
        <rect x="1" y="53" width="13" height="8" rx="4" stroke={C} strokeWidth="1.5" filter="url(#rg2)"/>
        <circle cx="2" cy="57" r="4.2" stroke={C} strokeWidth="1.4" filter="url(#rg2)"/>
        {waving && <line x1="2" y1="53" x2="2" y2="49" stroke={C} strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>}
      </motion.g>

      {/* RIGHT arm — POINTS toward screen (right) when joke showing */}
      <motion.g style={{ transformOrigin: "54px 56px" }}
        animate={
          laughing  ? { rotate: [85, 5, 90, 3, 85, 5, 85, 3, 85] } :
          pointing  ? { rotate: [-68, -72, -68] } :   // arm extends right/forward → pointing at viewer
          calm      ? { rotate: [0, 12, 0] } : { rotate: 0 }
        }
        transition={
          laughing  ? { duration: 0.18, repeat: 7, ease: "easeInOut" } :
          pointing  ? { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 } :
          calm      ? { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 } :
          {}
        }
      >
        <rect x="54" y="53" width="13" height="8" rx="4" stroke={C} strokeWidth="1.5" filter="url(#rg2)"/>
        <circle cx="66" cy="57" r="4.2" stroke={C} strokeWidth="1.4" filter="url(#rg2)"/>
        {/* extended pointing finger */}
        {pointing && !laughing && (
          <line x1="67" y1="57" x2="78" y2="57" stroke={C} strokeWidth="2" strokeLinecap="round" filter="url(#rg2)"/>
        )}
      </motion.g>

      {/* legs — kick up when laughing */}
      <motion.g
        animate={{ y: laughing ? [0, -11, 0, -9, 0, -8, 0, -10, 0] : calm ? [0, -2, 0] : 0 }}
        transition={{
          duration: laughing ? 0.2 : calm ? 2 : 0.8,
          repeat: laughing ? 7 : Infinity,
          ease: "easeInOut",
        }}
      >
        <rect x="19" y="80" width="12" height="12" rx="5" stroke={C} strokeWidth="1.5" filter="url(#rg2)"/>
        <rect x="37" y="80" width="12" height="12" rx="5" stroke={C} strokeWidth="1.5" filter="url(#rg2)"/>
      </motion.g>
    </svg>
  );
}

// ── main component ─────────────────────────────────────────────────────────────
export function RobotCharacter() {
  const [phase, setPhase]       = useState<Phase>("falling");
  const [showHi, setShowHi]     = useState(false);
  const [jokeIdx, setJokeIdx]   = useState(0);
  const [showJoke, setShowJoke] = useState(false);
  const [laughing, setLaughing] = useState(false);
  const [pointing, setPointing] = useState(false);
  const dims = useRef({ w: typeof window !== "undefined" ? window.innerWidth : 1200, h: typeof window !== "undefined" ? window.innerHeight : 800 });

  const triggerLaugh = () => {
    setLaughing(true);
    setTimeout(() => setLaughing(false), 2600);
  };

  const showNewJoke = (idx: number) => {
    setJokeIdx(idx);
    setShowJoke(true);
    setPointing(true);
    // brief pause then EXPLODE laughing
    setTimeout(() => {
      triggerLaugh();
    }, 600);
  };

  useEffect(() => {
    dims.current = { w: window.innerWidth, h: window.innerHeight };

    // sequence: heavy fall → wave hi → spring to left corner → jokes + insane laughing
    const t1 = setTimeout(() => { setPhase("waving"); setShowHi(true); },  1200);
    const t2 = setTimeout(() => { setShowHi(false); },                     3500);
    const t3 = setTimeout(() => { setPhase("resting"); },                  3900);
    const t4 = setTimeout(() => { showNewJoke(0); },                       5000);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cycle jokes every 25 s while resting
  useEffect(() => {
    if (phase !== "resting" || !showJoke) return;
    const id = setInterval(() => {
      setJokeIdx(prev => {
        const next = getNextJoke(prev);
        showNewJoke(next);
        return next;
      });
    }, 25000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, showJoke]);

  const { w, h } = dims.current;
  const landX = w / 2 - 34;   // centre of screen on landing
  const landY = h * 0.37;

  // REST: bottom-LEFT corner
  const restX = 58;
  const restY = h - 148;

  return (
    <>
      {/* ── static joke bubble (fixed, independent of robot) ── */}
      <AnimatePresence mode="wait">
        {phase === "resting" && showJoke && (
          <JokeBubble key={jokeIdx} text={JOKES[jokeIdx]} />
        )}
      </AnimatePresence>

      {/* ── robot ── */}
      <motion.div
        className="pointer-events-none select-none"
        style={{ position: "fixed", left: 0, top: 0, zIndex: 9000 }}
        initial={{ x: landX, y: -240 }}
        animate={
          phase === "falling" || phase === "waving"
            ? { x: landX, y: landY }
            : { x: restX, y: restY }
        }
        transition={
          phase === "falling"
            ? { type: "spring", damping: 5, stiffness: 200, mass: 3.2 }   // heavy thud
            : phase === "waving"
            ? {}
            : { type: "spring", damping: 14, stiffness: 65 }              // slide to corner
        }
      >
        {/* whole-body shake when laughing, gentle float when calm */}
        <motion.div
          animate={
            laughing
              ? { rotate: [-7, 7], x: [-3, 3] }
              : phase === "resting"
              ? { y: [0, -5, 0] }
              : {}
          }
          transition={
            laughing
              ? { duration: 0.09, repeat: 26, repeatType: "mirror", ease: "linear" }
              : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ position: "relative", display: "inline-block" }}
        >
          <RobotSVG phase={phase} laughing={laughing} pointing={pointing && !laughing} />

          {/* hi bubble stays relative to robot */}
          <AnimatePresence>
            {showHi && <HiBubble key="hi" />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
