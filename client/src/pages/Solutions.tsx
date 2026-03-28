import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PhoneCall, Calendar, Database, GitMerge, LineChart, X } from "lucide-react";

const P  = "#7269ea";
const PL = "#9b8bf4";
const PD = "rgba(109,92,231,0.18)";
const PB = "rgba(109,92,231,0.28)";
const CB = "rgba(0,0,0,0.03)";
const BD = "rgba(0,0,0,0.08)";
const BM = "rgba(0,0,0,0.12)";

export default function Solutions() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-20 px-4" style={{ borderBottom: `1px solid ${BD}` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">What We Build</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 text-gray-900">
            Everything you need to turn calls into booked revenue.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            One system. Built for your business. Maintained monthly.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-32">

            {/* 1. AI Voice Agent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="w-16 h-16 flex items-center justify-center mb-6 icon-glow"
                  style={{ border: `1px solid ${PB}`, background: PD }}
                >
                  <PhoneCall className="w-6 h-6" style={{ color: PL }} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">1. AI Voice Agent</h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  A front-line responder that sounds human, never sleeps, and handles concurrent calls effortlessly. It answers, qualifies, provides specific FAQs, and routes effectively.
                </p>
                <ul className="space-y-3">
                  {["Voice Tone & Accent Control","Caller Intent Detection","Smart Escalation to Humans","Custom After-Hours Mode"].map((item) => (
                    <li key={item} className="flex items-center text-sm font-medium pb-2" style={{ borderBottom: `1px solid ${BD}` }}>
                      <span className="w-2 h-2 mr-4 shrink-0 rounded-full" style={{ background: PL }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="aspect-square p-8 flex flex-col justify-center relative overflow-hidden"
                style={{ background: CB, border: `1px solid ${BD}` }}
              >
                <div className="relative z-10 space-y-4">
                  <div className="p-4 w-3/4" style={{ background: "rgba(0,0,0,0.06)", border: `1px solid ${BD}` }}>
                    <p className="text-xs text-gray-400 mb-1">Caller</p>
                    <p className="text-sm text-gray-700">"Hi, do you take walk-ins for a consultation?"</p>
                  </div>
                  <div className="p-4 w-3/4 ml-auto" style={{ background: PD, border: `1px solid ${PB}` }}>
                    <p className="text-xs mb-1" style={{ color: PL }}>Pilot Agent</p>
                    <p className="text-sm text-gray-700">"We operate by appointment only to give you our full attention. I have a 2:30 PM slot open today. Would you like me to book that for you?"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Scheduling Engine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 aspect-square p-8 flex items-center justify-center" style={{ background: CB, border: `1px solid ${BD}` }}>
                <div className="w-full" style={{ border: `1px solid ${BD}` }}>
                  <div className="p-3 flex justify-between items-center" style={{ borderBottom: `1px solid ${BD}`, background: "rgba(0,0,0,0.03)" }}>
                    <span className="text-xs font-bold uppercase text-gray-600">October 24</span>
                    <span className="text-xs text-gray-400">Dr. Smith</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      { time: "09:00 AM", label: "Unavailable", dark: false },
                      { time: "10:30 AM", label: "New Booking",  dark: true  },
                      { time: "11:00 AM", label: "Unavailable", dark: false },
                      { time: "01:00 PM", label: "Available",   dark: false },
                    ].map(({ time, label, dark }) => (
                      <div
                        key={time}
                        className="text-xs p-2 flex justify-between font-medium"
                        style={{
                          background: dark ? PD : "transparent",
                          border: `1px solid ${dark ? PB : BD}`,
                          color: dark ? "#fff" : "rgba(0,0,0,0.40)",
                        }}
                      >
                        <span>{time}</span><span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-16 h-16 flex items-center justify-center mb-6 icon-glow" style={{ border: `1px solid ${PB}`, background: PD }}>
                  <Calendar className="w-6 h-6" style={{ color: PL }} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">2. Scheduling Engine</h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Real-time calendar synchronization. The system intelligently navigates timezones, buffer times, and multi-staff availability to secure appointments instantly.
                </p>
                <ul className="space-y-3">
                  {["Book, Check, Reschedule, Cancel","Multi-calendar & Staff Routing","Intelligent Buffer Logic","Instant Confirmation Dispatch"].map((item) => (
                    <li key={item} className="flex items-center text-sm font-medium pb-2" style={{ borderBottom: `1px solid ${BD}` }}>
                      <span className="w-2 h-2 mr-4 shrink-0 rounded-full" style={{ background: PL }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. CRM + Waitlist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 flex items-center justify-center mb-6 icon-glow" style={{ border: `1px solid ${PB}`, background: PD }}>
                  <Database className="w-6 h-6" style={{ color: PL }} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">3. CRM + Waitlist</h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Stop losing leads on sticky notes. Every interaction is parsed, structured, and logged centrally. Our waitlist manager automatically sorts requests on a first-come, first-serve basis.
                </p>
                <ul className="space-y-3">
                  {["Airtable / Google Sheets Logging","FCFS Waitlist Sorting","Parent / Student / Lead Profiling"].map((item) => (
                    <li key={item} className="flex items-center text-sm font-medium pb-2" style={{ borderBottom: `1px solid ${BD}` }}>
                      <span className="w-2 h-2 mr-4 shrink-0 rounded-full" style={{ background: PL }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-square p-6 flex flex-col gap-2" style={{ background: CB, border: `1px solid ${BD}` }}>
                <div className="grid grid-cols-4 gap-2 text-[10px] uppercase font-bold text-gray-400 pb-2" style={{ borderBottom: `1px solid ${BD}` }}>
                  <span>Name</span><span>Intent</span><span>Priority</span><span>Status</span>
                </div>
                {[
                  { name: "J. Doe",    intent: "Consult",     priority: "HIGH", status: "Logged",   hi: true  },
                  { name: "S. Miller", intent: "Reschedule",  priority: "MED",  status: "Actioned", hi: false },
                  { name: "M. Scott",  intent: "Waitlist",    priority: "MED",  status: "Queued",   hi: false },
                ].map((row) => (
                  <div key={row.name} className="grid grid-cols-4 gap-2 text-xs py-2 items-center" style={{ borderBottom: `1px solid ${BD}` }}>
                    <span className="font-medium text-gray-700">{row.name}</span>
                    <span className="text-gray-500">{row.intent}</span>
                    <span className="px-2 py-1 text-center w-max text-[10px] font-bold" style={{
                      background: row.hi ? PD : "transparent",
                      border: `1px solid ${row.hi ? PB : BD}`,
                      color: row.hi ? PL : "rgba(0,0,0,0.45)",
                    }}>{row.priority}</span>
                    <span className="text-gray-500">{row.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 & 5. Automation + Reporting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { Icon: GitMerge, title: "4. Automation Layer", desc: "Invisible workflows that keep clients engaged and informed.", items: ["Automated reminders (SMS/Email)","Missed call text-back sequences","Post-appointment follow-ups","Nurture drip campaigns"] },
                { Icon: LineChart, title: "5. Reporting",        desc: "Clear visibility into system performance and captured revenue.", items: ["Call volume & conversion metrics","Cancellation / Reschedule rates","Complete audio recordings","Missed leads dashboard"] },
              ].map(({ Icon, title, desc, items }) => (
                <div key={title} className="p-8 transition-all duration-300 card-premium icon-glow group" style={{ background: CB, border: `1px solid ${BD}` }}>
                  <Icon className="w-8 h-8 mb-6 transition-colors" style={{ color: "rgba(146,133,244,0.6)" }} />
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
                  <p className="text-gray-500 mb-6">{desc}</p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: PL }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* "What we don't do" */}
      <section className="py-24 px-4" style={{ background: "rgba(0,0,0,0.02)", borderTop: `1px solid ${BD}` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-12 text-gray-900">What we don't do.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              { title: "We don't sell generic bots.", body: "Every system is engineered specifically for your exact operational workflows and rules. No out-of-the-box templates." },
              { title: "We don't disappear after setup.", body: "We monitor, maintain, and continuously optimize the agent based on real caller transcripts every month." },
            ].map(({ title, body }) => (
              <div key={title} className="flex gap-4 p-6" style={{ border: `1px solid ${BD}`, background: CB }}>
                <X className="w-6 h-6 shrink-0" style={{ color: PL }} />
                <div>
                  <h4 className="font-bold mb-2 text-gray-900">{title}</h4>
                  <p className="text-sm text-gray-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <Link href="/contact">
          <Button
            size="lg"
            className="rounded-none text-white h-14 px-12 text-base border-0 btn-glow btn-sweep"
            style={{ background: `linear-gradient(135deg, ${P}, ${PL})` }}
          >
            Book a Call
          </Button>
        </Link>
      </section>
    </div>
  );
}
