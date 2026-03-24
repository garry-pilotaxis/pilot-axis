import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, PhoneCall, Calendar, Database, GitMerge } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BookingCalendar } from "@/components/ui/booking-calendar";

// ── Motion config ─────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};

// ── Scroll-reveal section wrapper ─────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.section>
  );
}

// ── Animated count-up number ──────────────────────────────────────────────────
function CountUp({ to, suffix = "", prefix = "", duration = 1800 }: {
  to: number; suffix?: string; prefix?: string; duration?: number;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);      // ease-out cubic
      setCount(Math.round(e * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 md:pt-40 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute top-20 left-8 w-px h-24 bg-gradient-to-b from-transparent via-black/15 to-transparent hidden md:block" />
        <div className="absolute top-20 right-8 w-px h-24 bg-gradient-to-b from-transparent via-black/15 to-transparent hidden md:block" />

        <div className="container mx-auto max-w-5xl text-center relative">
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 border border-black/10 bg-white/70 backdrop-blur-sm px-4 py-1.5 mb-8 text-xs font-medium tracking-widest uppercase text-black/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 inline-block" />
            AI Voice &amp; Workflow Automation
          </motion.div>

          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-6"
          >
            AI call systems that book
            <br className="hidden md:block" />
            {" "}<span className="relative inline-block">
              appointments{" "}
              <motion.span
                className="absolute bottom-1 left-0 h-[3px] bg-black w-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
              />
            </span>
            and capture every lead.
          </motion.h1>

          <motion.p
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="text-lg md:text-xl text-black/60 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Pilot Axis builds done-for-you AI voice and workflow automation for
            appointment-based businesses—so you stop missing calls and stop wasting hours on admin.
          </motion.p>

          <motion.div
            variants={fadeUp} custom={3} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/contact">
              <Button size="lg" className="btn-sweep rounded-none bg-black text-white h-12 px-8 w-full sm:w-auto font-medium tracking-wide">
                Book a Call
              </Button>
            </Link>
            <Link href="/use-cases">
              <Button variant="outline" size="lg" className="btn-sweep-outline rounded-none border-black/20 h-12 px-8 w-full sm:w-auto hover:bg-black/5 font-medium tracking-wide">
                See Use Cases <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeIn} custom={5} initial="hidden" animate="visible"
            className="pt-8 border-t border-black/8 flex flex-col items-center gap-2"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-black/40">
              Built for: Daycares · Clinics · Dental · Home Services · Salons
            </p>
            <p className="text-xs text-black/30">24/7 answering. Real scheduling. Real operations.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ───────────────────────────────────────────────────────── */}
      <Section className="py-20 bg-black text-white px-4 section-dark relative">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            variants={fadeUp} custom={0}
            className="text-3xl md:text-5xl font-bold mb-12 border-b border-white/10 pb-8"
          >
            Most businesses lose revenue on the phone.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
            {[
              "Missed calls = lost bookings",
              "Slow replies = cold leads",
              "Manual scheduling = chaos",
              "No tracking = no improvement",
            ].map((line, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2.5 shrink-0" />
                <p className="text-white/75">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Bento: What Pilot Axis Does ───────────────────────────────────── */}
      <Section className="py-24 px-4 border-b border-black/8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <motion.p variants={fadeUp} custom={0} className="text-xs tracking-widest uppercase text-black/40 mb-3">
              What we do
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold tracking-tight">
              The complete system.
            </motion.h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* Large feature card — 2 cols */}
            <motion.div
              variants={fadeUp} custom={0}
              className="md:col-span-2 border border-black/8 p-10 bg-white group flex flex-col justify-between min-h-[280px] card-premium"
            >
              <div>
                <div className="w-8 h-px bg-black/20 mb-8 group-hover:w-16 transition-all duration-500" />
                <p className="text-[10px] tracking-widest uppercase text-black/30 mb-3">01 — Core Function</p>
                <h3 className="text-3xl font-bold mb-4">Answer + Qualify</h3>
                <p className="text-black/55 leading-relaxed max-w-md">
                  Instant response to every caller. Intelligent questions to filter
                  ready-to-buy leads from tire kickers. Never miss a call, never lose a lead.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 text-xs text-black/35 tracking-wide">
                <span>24/7 availability</span>
                <span className="w-1 h-1 bg-black/20 rounded-full" />
                <span>Natural voice</span>
                <span className="w-1 h-1 bg-black/20 rounded-full" />
                <span>Lead scoring</span>
              </div>
            </motion.div>

            {/* Dark stat card */}
            <motion.div
              variants={fadeUp} custom={1}
              className="section-dark relative border border-black bg-black text-white p-8 flex flex-col justify-between min-h-[280px]"
            >
              <p className="text-[10px] tracking-widest uppercase text-white/30">Answer Rate</p>
              <div>
                <p className="text-7xl font-bold tracking-tighter leading-none">
                  <CountUp to={98} suffix="%" />
                </p>
                <p className="text-white/35 text-sm mt-3 leading-relaxed">
                  of all inbound calls handled automatically
                </p>
              </div>
            </motion.div>

            {/* Light stat card */}
            <motion.div
              variants={fadeUp} custom={2}
              className="border border-black/8 bg-[#fafafa] p-8 flex flex-col justify-between min-h-[200px]"
            >
              <p className="text-[10px] tracking-widest uppercase text-black/30">Setup time</p>
              <div>
                <p className="text-5xl font-bold tracking-tighter leading-none">
                  7–14<span className="text-xl font-normal text-black/35"> days</span>
                </p>
                <p className="text-black/40 text-sm mt-3">from discovery to go-live</p>
              </div>
            </motion.div>

            {/* Wide dual-feature card — 2 cols */}
            <motion.div
              variants={fadeUp} custom={3}
              className="md:col-span-2 border border-black/8 bg-[#fafafa] p-10 group"
            >
              <div className="w-6 h-px bg-black/20 mb-8 group-hover:w-12 transition-all duration-500" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-black/30 mb-3">02 — Scheduling</p>
                  <h4 className="text-xl font-bold mb-3">Book + Manage</h4>
                  <p className="text-black/55 text-sm leading-relaxed">
                    Direct calendar integration to secure slots, handle cancellations,
                    and manage rescheduling. Zero human touch.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-black/30 mb-3">03 — Intelligence</p>
                  <h4 className="text-xl font-bold mb-3">Follow Up + Report</h4>
                  <p className="text-black/55 text-sm leading-relaxed">
                    Automated SMS and email sequences. Full transcript logging
                    and conversion data pushed straight to your CRM.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </Section>

      {/* ── Solutions Preview ─────────────────────────────────────────────── */}
      <Section className="py-24 px-4 bg-[#fafafa]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.p variants={fadeUp} custom={0} className="text-xs font-medium tracking-widest uppercase text-black/40 mb-3">
                The System
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold tracking-tight mb-2">
                Everything working together.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-black/55 max-w-lg text-sm">
                Four components, one system — capturing revenue around the clock.
              </motion.p>
            </div>
            <motion.div variants={fadeUp} custom={3}>
              <Link href="/solutions">
                <Button variant="link" className="p-0 text-black minimal-link rounded-none font-medium h-auto pb-1">
                  Explore all solutions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
            {[
              { icon: PhoneCall, title: "AI Voice Agent",     desc: "Handles calls, answers FAQs, and routes complex inquiries 24/7 with a natural voice." },
              { icon: Calendar,  title: "Scheduling Engine",  desc: "Intelligently books, reschedules, or cancels appointments across multiple staff calendars." },
              { icon: Database,  title: "CRM + Waitlist",     desc: "Logs every interaction to Airtable or Sheets. Manages waitlists with automated first-come-first-serve sorting." },
              { icon: GitMerge,  title: "Automation Layer",   desc: "Triggers emails, SMS follow-ups, and reminders. Missed call text-back functionality." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-6 group">
                <div className="w-12 h-12 shrink-0 border border-black/10 flex items-center justify-center bg-white group-hover:border-black/30 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{title}</h4>
                  <p className="text-black/55 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Use Cases Grid ────────────────────────────────────────────────── */}
      <Section className="py-24 px-4 border-y border-black/8">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Built for your industry
          </motion.h2>
          <motion.div
            variants={fadeIn} custom={1}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-black/8 border border-black/8"
          >
            {[
              { title: "Daycare",           desc: "Waitlist management + facility tour scheduling" },
              { title: "Dental",            desc: "Patient booking + reminders + cancellations" },
              { title: "Clinic",            desc: "Patient intake + routing to correct departments" },
              { title: "Salon",             desc: "Complex appointment flows + no-show reduction" },
              { title: "Home Services",     desc: "Quote intake + dispatch scheduling" },
              { title: "Appointment Biz",   desc: "Missed-call recovery and calendar filling" },
            ].map((useCase, i) => (
              <motion.div
                key={i} variants={fadeUp} custom={i * 0.5}
                className="bg-white p-8 hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer"
              >
                <h4 className="text-xl font-bold mb-3">{useCase.title}</h4>
                <p className="text-sm opacity-55 group-hover:opacity-70 leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Proof / Stats ─────────────────────────────────────────────────── */}
      <Section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl font-bold mb-4">
            What you get is not a bot.
            <br />It's a system.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-black/50 text-sm mb-16">
            Built for operations, not demos.
          </motion.p>

          {/* Live counting stats */}
          <motion.div
            variants={fadeIn} custom={2}
            className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-black/8 border border-black/8 mb-20"
          >
            {[
              { label: "Calls answered",    num: 98,  suffix: "%"    },
              { label: "Hours saved / wk",  num: 15,  suffix: "+"    },
              { label: "Days to go-live",   num: 14,  suffix: " max" },
              { label: "Client retention",  num: 100, suffix: "%"    },
            ].map(({ label, num, suffix }, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 2} className="bg-white p-8 text-center">
                <p className="text-4xl font-bold tracking-tighter mb-2">
                  <CountUp to={num} suffix={suffix} />
                </p>
                <p className="text-xs tracking-widest uppercase text-black/40">{label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { quote: "Our missed calls dropped to zero. The system books appointments while we are working.",     name: "Sarah J.",   role: "Clinic Director"  },
              { quote: "The waitlist management alone saved us 15 hours a week. It just runs in the background.", name: "Michael T.", role: "Daycare Owner"    },
              { quote: "Finally an AI that actually connects to our calendar and CRM without breaking.",           name: "David W.",   role: "Home Services"    },
            ].map((t, i) => (
              <motion.div
                key={i} variants={fadeUp} custom={i}
                className="p-6 border border-black/8 card-premium bg-[#fafafa]"
              >
                <p className="italic text-black/60 mb-6 text-sm leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black/6 border border-black/10 flex items-center justify-center text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-black/45">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <Section className="py-24 px-4 bg-black text-white section-dark relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-xs tracking-widest uppercase text-white/35 mb-4">
              How it works
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-bold mb-4">
              A Clean Rollout.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-sm">
              Four steps to automated operations.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { n: "01", title: "Audit",    desc: "We map your call flow and booking rules." },
              { n: "02", title: "Build",    desc: "Agent + workflows + integrations created for you." },
              { n: "03", title: "Launch",   desc: "Rigorous testing followed by seamless go-live." },
              { n: "04", title: "Optimize", desc: "Monthly reports and continuous iteration." },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="group">
                <div className="text-3xl font-heading font-light text-white/20 mb-4 border-b border-white/10 pb-4 group-hover:text-white/40 transition-colors duration-300">
                  {step.n}
                </div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <Section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-xs tracking-widest uppercase text-black/40 mb-3">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold tracking-tight mb-4">
              Simple Pricing. Real Systems.
            </motion.h2>
            <motion.div variants={fadeUp} custom={2}>
              <Link href="/pricing">
                <Button variant="link" className="p-0 text-black minimal-link rounded-none font-medium h-auto pb-1">
                  View detailed pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div variants={fadeUp} custom={0} className="border border-black/10 p-8 flex flex-col bg-[#fafafa] card-premium">
              <h3 className="text-xl font-bold mb-1">Starter</h3>
              <p className="text-xs text-black/40 mb-6 tracking-wide uppercase">AI Receptionist</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {["24/7 Call Answering","Custom FAQs","Call Routing","Basic Lead Capture","Call Summary Emails"].map((f) => (
                  <li key={f} className="flex items-center text-sm gap-3 text-black/70">
                    <Check className="w-3.5 h-3.5 text-black/30 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button className="w-full rounded-none btn-sweep border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300">
                  Book a Call
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="border border-black p-8 flex flex-col bg-black text-white relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider border border-black">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-1">Growth</h3>
              <p className="text-xs text-white/35 mb-6 tracking-wide uppercase">Scheduling + CRM</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {["Everything in Starter","Full Booking Engine","Reschedule/Cancel flow","Direct CRM Logging","SMS/Email Reminders"].map((f) => (
                  <li key={f} className="flex items-center text-sm gap-3 text-white/70">
                    <Check className="w-3.5 h-3.5 text-white/30 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button className="w-full rounded-none bg-white text-black hover:bg-white/90">
                  Book a Call
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="border border-black/10 p-8 flex flex-col bg-[#fafafa] card-premium">
              <h3 className="text-xl font-bold mb-1">Premium</h3>
              <p className="text-xs text-black/40 mb-6 tracking-wide uppercase">Full Operations System</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {["Everything in Growth","Missed-call Recovery","Multi-location Support","Operations Dashboard","Priority Support"].map((f) => (
                  <li key={f} className="flex items-center text-sm gap-3 text-black/70">
                    <Check className="w-3.5 h-3.5 text-black/30 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button className="w-full rounded-none btn-sweep border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300">
                  Book a Call
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <Section className="py-24 px-4 bg-[#fafafa] border-t border-black/8">
        <div className="container mx-auto max-w-3xl">
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </motion.h2>
          <motion.div variants={fadeIn} custom={1}>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Will it sound human?",                    a: "Yes. We use advanced LLMs and high-quality voice synthesis. It handles interruptions naturally, pauses when the caller speaks, and maintains a professional, empathetic tone tailored to your business." },
                { q: "Can it book directly in my calendar?",    a: "Yes. We integrate directly with your existing scheduling software (Acuity, Calendly, GoHighLevel, Jane, etc.) to check real-time availability and book slots instantly." },
                { q: "Can it handle reschedule/cancel requests?", a: "Absolutely. The system verifies the caller's identity, locates their existing appointment, and processes the cancellation or finds a new time slot based on your rules." },
                { q: "Can it handle multiple staff or calendars?", a: "Yes. The agent can ask the caller who they wish to see, or route them based on the service type, checking the specific availability for that staff member or room." },
                { q: "What happens with complex questions?",     a: "We design fail-safes. If a question falls outside the defined knowledge base, the agent politely takes a message, promises a callback, and immediately routes the inquiry to your human staff via SMS, email, or Slack." },
                { q: "Can it log into our CRM?",               a: "Yes. We push call summaries, transcripts, and structured lead data directly into Hubspot, Salesforce, Airtable, Sheets, or whatever CRM you rely on." },
                { q: "How long to launch?",                    a: "Our typical rollout takes 7 to 14 days from discovery to go-live, depending on the complexity of your integrations and call flows." },
              ].map(({ q, a }, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-black/8">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-black/70 text-sm py-5">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-black/55 leading-relaxed text-sm">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </Section>

      {/* ── Book a Call — full-bleed dark with embedded calendar ──────────── */}
      <section className="relative bg-black text-white overflow-hidden section-dark">
        <div className="container mx-auto max-w-7xl px-4 py-28 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="text-[10px] tracking-widest uppercase text-white/30 mb-6">Get Started</p>
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.0] mb-8">
                Stop missing<br />calls. Start<br />controlling<br />your pipeline.
              </h2>
              <p className="text-white/45 leading-relaxed mb-10 max-w-sm">
                Book a 20-minute discovery call. We'll map your current call flow
                and show you exactly what the system would look like for your business.
              </p>
              <div className="flex flex-wrap gap-6 text-xs text-white/30 tracking-wide">
                {["20 minutes","No commitment","Free audit"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white/30 rounded-full" />{t}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: glass calendar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="border border-white/10 bg-white/4 backdrop-blur-sm"
              style={{ minHeight: 520 }}
            >
              <BookingCalendar dark />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
