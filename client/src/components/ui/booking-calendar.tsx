import { useState } from "react";
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, getDay, isSameDay, isBefore, startOfDay, isWeekend,
} from "date-fns";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM",
];

async function submitBooking(data: {
  name: string; email: string; phone?: string; date: string; time: string;
}) {
  const res = await fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Booking failed");
  return res.json();
}

interface BookingCalendarProps {
  dark?: boolean;
}

export function BookingCalendar({ dark = false }: BookingCalendarProps) {
  const today  = startOfDay(new Date());
  const [month, setMonth]     = useState(today);
  const [selected, setSelected] = useState<Date | null>(null);
  const [time, setTime]       = useState<string | null>(null);
  const [step, setStep]       = useState<"date" | "time" | "details" | "done">("date");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: () => setStep("done"),
    onError: (e: Error) =>
      toast({ title: "Booking failed", description: e.message, variant: "destructive" }),
  });

  const monthStart = startOfMonth(month);
  const monthEnd   = endOfMonth(month);
  const days       = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const blanks     = Array(getDay(monthStart)).fill(null);

  const pickDate = (d: Date) => { setSelected(d); setTime(null); setStep("time"); };
  const pickTime = (t: string) => { setTime(t); setStep("details"); };

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !time) return;
    mutation.mutate({
      name, email,
      phone: phone || undefined,
      date: format(selected, "EEEE, MMMM d, yyyy"),
      time,
    });
  };

  // ── token maps so one component handles both themes ──────────────────────
  const T = dark ? {
    header:      "bg-white/5 border-white/10 text-white",
    headerLabel: "text-white/40",
    back:        "text-white/40 hover:text-white",
    navBtn:      "hover:bg-white/10 text-white/50 hover:text-white disabled:opacity-20",
    navText:     "text-white",
    dayLabel:    "text-white/30",
    dayDisabled: "text-white/15",
    dayHover:    "hover:bg-white/10 text-white/70 hover:text-white",
    daySelected: "!bg-white !text-black",
    dayToday:    "ring-1 ring-white/30",
    note:        "text-white/30",
    slotsLabel:  "text-white/30",
    slot:        "border-white/10 text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5",
    slotSel:     "!bg-white !text-black !border-white",
    inputLabel:  "text-white/40",
    input:       "border-white/15 text-white placeholder:text-white/30 focus:border-white/50 bg-transparent",
    submitBtn:   "bg-white text-black hover:bg-white/90 disabled:opacity-40",
    caption:     "text-white/25",
    doneIcon:    "bg-white text-black",
    doneHead:    "text-white",
    doneSub:     "text-white/50",
    doneMeta:    "text-white/30",
    doneLink:    "text-white/30 hover:text-white",
  } : {
    header:      "bg-black border-black/10 text-white",
    headerLabel: "text-white/50",
    back:        "text-white/60 hover:text-white",
    navBtn:      "hover:bg-black/5 text-black disabled:opacity-20",
    navText:     "text-black",
    dayLabel:    "text-black/30",
    dayDisabled: "text-black/18",
    dayHover:    "hover:bg-black/5 text-black",
    daySelected: "!bg-black !text-white",
    dayToday:    "ring-1 ring-black/20",
    note:        "text-black/35",
    slotsLabel:  "text-black/40",
    slot:        "border-black/12 text-black/70 hover:border-black/40 hover:bg-black/3",
    slotSel:     "!bg-black !text-white !border-black",
    inputLabel:  "text-black/45",
    input:       "border-black/15 text-black focus:border-black bg-transparent",
    submitBtn:   "bg-black text-white hover:bg-black/90 disabled:opacity-40",
    caption:     "text-black/35",
    doneIcon:    "bg-black text-white",
    doneHead:    "text-black",
    doneSub:     "text-black/55",
    doneMeta:    "text-black/40",
    doneLink:    "text-black/40 hover:text-black",
  };

  // ── Done ────────────────────────────────────────────────────────────────
  if (step === "done") {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center px-8">
        <div className={`w-14 h-14 flex items-center justify-center mb-6 ${T.doneIcon}`}>
          <Check className="w-6 h-6" />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${T.doneHead}`}>You're booked.</h3>
        <p className={`text-sm leading-relaxed mb-1 ${T.doneSub}`}>
          {format(selected!, "EEEE, MMMM d")} · {time}
        </p>
        <p className={`text-xs mt-4 ${T.doneMeta}`}>
          Confirmation sent to <strong>{email}</strong>
        </p>
        <button
          className={`mt-8 text-xs underline underline-offset-4 transition-colors ${T.doneLink}`}
          onClick={() => {
            setStep("date"); setSelected(null); setTime(null);
            setName(""); setEmail(""); setPhone("");
          }}
        >
          Book another time
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* ── Header strip ──────────────────────────────────────────────────── */}
      <div className={`px-6 py-4 border-b flex items-center justify-between ${T.header}`}>
        <div>
          <p className={`text-[10px] uppercase tracking-widest font-semibold ${T.headerLabel}`}>
            {step === "date" ? "Select Date" : step === "time" ? "Select Time" : "Your Details"}
          </p>
          <p className="text-sm font-semibold mt-0.5">
            {step === "date"
              ? "Choose a day for your discovery call"
              : step === "time"
              ? format(selected!, "EEEE, MMMM d, yyyy")
              : `${format(selected!, "MMM d")} · ${time}`}
          </p>
        </div>
        {step !== "date" && (
          <button
            onClick={() => setStep(step === "details" ? "time" : "date")}
            className={`text-[11px] underline underline-offset-2 transition-colors ${T.back}`}
          >
            ← Back
          </button>
        )}
      </div>

      {/* ── Date ────────────────────────────────────────────────────────── */}
      {step === "date" && (
        <div className="flex-1 p-6">
          {/* month nav */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setMonth(subMonths(month, 1))}
              disabled={isBefore(endOfMonth(subMonths(month, 1)), today)}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${T.navBtn}`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className={`text-sm font-bold tracking-tight ${T.navText}`}>
              {format(month, "MMMM yyyy")}
            </span>
            <button
              onClick={() => setMonth(addMonths(month, 1))}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${T.navBtn}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <div key={d} className={`text-center text-[10px] font-bold uppercase tracking-widest py-1 ${T.dayLabel}`}>
                {d}
              </div>
            ))}
          </div>

          {/* day grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {blanks.map((_, i) => <div key={`b${i}`} />)}
            {days.map((d) => {
              const past    = isBefore(d, today);
              const weekend = isWeekend(d);
              const isToday = isSameDay(d, today);
              const isSel   = selected ? isSameDay(d, selected) : false;
              const disabled = past || weekend;
              return (
                <button
                  key={d.toISOString()}
                  disabled={disabled}
                  onClick={() => pickDate(d)}
                  className={`
                    aspect-square flex items-center justify-center text-sm font-medium
                    transition-all duration-150
                    ${disabled ? `${T.dayDisabled} cursor-default` : `${T.dayHover} cursor-pointer`}
                    ${isSel ? T.daySelected : ""}
                    ${isToday && !isSel ? T.dayToday : ""}
                  `}
                >
                  {format(d, "d")}
                </button>
              );
            })}
          </div>
          <p className={`text-[11px] mt-5 text-center ${T.note}`}>Mon – Fri · Weekends unavailable</p>
        </div>
      )}

      {/* ── Time ────────────────────────────────────────────────────────── */}
      {step === "time" && (
        <div className="flex-1 p-6 overflow-y-auto">
          <p className={`text-xs uppercase tracking-widest font-bold mb-4 ${T.slotsLabel}`}>
            Available times · Eastern
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                onClick={() => pickTime(t)}
                className={`py-3 px-4 text-sm font-medium border transition-all duration-150 text-left
                  ${time === t ? T.slotSel : T.slot}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Details ─────────────────────────────────────────────────────── */}
      {step === "details" && (
        <form onSubmit={confirm} className="flex-1 p-6 flex flex-col gap-4">
          {[
            { label: "Full Name",           type: "text",  val: name,  set: setName,  ph: "Jane Smith",        req: true },
            { label: "Email",               type: "email", val: email, set: setEmail, ph: "jane@example.com",  req: true },
            { label: "Phone (optional)",    type: "tel",   val: phone, set: setPhone, ph: "(555) 000-0000",    req: false },
          ].map(({ label, type, val, set, ph, req }) => (
            <div key={label} className="space-y-1.5">
              <label className={`text-[10px] uppercase tracking-widest font-bold block ${T.inputLabel}`}>
                {label}
              </label>
              <input
                type={type}
                required={req}
                value={val}
                onChange={(e) => set(e.target.value)}
                placeholder={ph}
                className={`w-full border px-4 h-11 text-sm outline-none transition-colors ${T.input}`}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={mutation.isPending || !name || !email}
            className={`w-full h-12 mt-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${T.submitBtn}`}
          >
            {mutation.isPending
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking...</>
              : "Confirm Booking"}
          </button>
          <p className={`text-[11px] text-center ${T.caption}`}>
            A confirmation will be sent to your email.
          </p>
        </form>
      )}
    </div>
  );
}
