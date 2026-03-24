import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content: "Hi! I'm the Pilot Axis AI assistant. Ask me anything about our systems, pricing, or how we can help your business — I'll give you a straight answer.",
};

const QUICK_REPLIES = [
  "What exactly do you do?",
  "How much does it cost?",
  "How long to set up?",
  "Is it right for my business?",
];

export function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // focus input when opened
  useEffect(() => {
    if (open) {
      setShowNudge(false);
      setNudgeDismissed(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // proactive nudge after 8 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open && !nudgeDismissed) setShowNudge(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [open, nudgeDismissed]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    const userMsg: Message = { role: "user", content: msg };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const history = next.filter((_, i) => i > 0);
      const res  = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error — please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // show quick replies only after the greeting and no user messages yet
  const showQuickReplies = messages.length === 1 && !loading;

  return (
    <>
      {/* ── Proactive nudge bubble ──────────────────────────────────────── */}
      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{    opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[99991] bg-black text-white px-4 py-3 text-sm shadow-xl max-w-[220px] leading-snug"
          >
            <button
              onClick={() => { setShowNudge(false); setNudgeDismissed(true); }}
              className="absolute top-1.5 right-2 text-white/40 hover:text-white text-xs"
            >✕</button>
            <p className="pr-4">Got questions? I can answer them instantly 👋</p>
            {/* arrow */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating toggle button + label ─────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[99990] flex items-center gap-3">
        {/* "Talk to me please!" label — hides when chat is open */}
        <AnimatePresence>
          {!open && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{    opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] font-semibold uppercase tracking-widest text-black/50 whitespace-nowrap select-none"
            >
              Talk to me please!
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((o) => !o)}
          className="w-14 h-14 bg-black text-white flex items-center justify-center shadow-2xl shrink-0"
          style={{ borderRadius: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chat"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{    rotate:  90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90,  opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{    rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MessageSquare size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat panel ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[99989] w-[380px] max-w-[calc(100vw-3rem)] bg-white shadow-2xl flex flex-col"
            style={{ height: 540, border: "1px solid rgba(0,0,0,0.10)" }}
          >
            {/* header */}
            <div className="bg-black text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <MessageSquare size={15} />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">PILOT AXIS</p>
                  <p className="text-[10px] text-white/50 mt-0.5 font-medium uppercase tracking-widest">
                    AI Assistant · Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/40 hover:text-white transition-colors ml-1"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] px-4 py-3 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-black text-white"
                      : "bg-[#f5f5f5] text-black border-l-2 border-black/10"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* quick reply chips — only shown on first load */}
              {showQuickReplies && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-[11px] border border-black/15 px-3 py-1.5 hover:bg-black hover:text-white hover:border-black transition-all duration-200 text-black/60 font-medium tracking-wide"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#f5f5f5] border-l-2 border-black/10 px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-black/30 block"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* input */}
            <div className="shrink-0 border-t border-black/8 px-4 py-3 flex gap-3 items-center bg-white">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask me anything…"
                disabled={loading}
                className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-black/30 disabled:opacity-50"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 bg-black text-white flex items-center justify-center disabled:opacity-25 transition-opacity shrink-0 hover:bg-black/80"
              >
                {loading
                  ? <Loader2 size={14} className="animate-spin" />
                  : <Send size={14} />
                }
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
