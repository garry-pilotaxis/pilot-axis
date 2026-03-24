import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const P  = "#7269ea";
const PL = "#9b8bf4";
const PD = "rgba(109,92,231,0.18)";
const PB = "rgba(109,92,231,0.28)";
const CB = "rgba(255,255,255,0.04)";
const BD = "rgba(255,255,255,0.08)";

export default function UseCases() {
  const industries = [
    {
      title: "Daycare & Childcare",
      intents: ["Facility tours", "Tuition inquiries", "Waitlist joining", "Call-outs"],
      flows: ["Qualify ages & needs", "Add to FCFS waitlist", "Schedule tour automatically", "Send info packet"],
      outcomes: "Directors save 10+ hours a week. Waitlists are managed passively. Zero missed inquiries during chaos."
    },
    {
      title: "Dental Practices",
      intents: ["New patient booking", "Emergency triage", "Rescheduling", "Insurance questions"],
      flows: ["Identify emergency vs routine", "Check PMS calendar", "Book & send intake forms", "Automated reminders"],
      outcomes: "Schedules stay full. Front desk focuses on in-person patients. Cancellations get automatically filled."
    },
    {
      title: "Medical Clinics",
      intents: ["Appointment booking", "Prescription refills", "Lab results", "General info"],
      flows: ["Patient verification", "Symptom routing", "Secure message logging", "Direct booking"],
      outcomes: "Reduced hold times. Correct routing to nursing vs front desk. Seamless after-hours intake."
    },
    {
      title: "Salons & Spas",
      intents: ["Service booking", "Specific stylist requests", "Pricing", "Running late"],
      flows: ["Service & duration mapping", "Multi-calendar check", "Deposit info relay", "No-show follow-up"],
      outcomes: "Complex service combos booked correctly without double booking. Significant reduction in no-shows."
    },
    {
      title: "Home Services",
      intents: ["Emergency dispatch", "Quote requests", "Status checks", "Service info"],
      flows: ["Capture address & issue", "Dispatch notification", "Estimator scheduling", "Follow-up texts"],
      outcomes: "Capture every emergency lead 24/7. Convert competitors' missed calls into your booked jobs."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-white">

      {/* Hero */}
      <section className="pt-28 pb-20 px-4" style={{ borderBottom: `1px solid ${BD}` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/35 mb-4">Use Cases</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 text-white">
            Built around real business workflows.
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto">
            See how the system adapts to different industries to capture leads and eliminate admin.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="p-8 md:p-12 flex flex-col md:flex-row gap-12 card-premium"
                style={{ background: CB, border: `1px solid ${BD}` }}
              >
                {/* Left: title + intents */}
                <div className="md:w-1/3 pb-8 md:pb-0 md:pr-8" style={{ borderBottom: `1px solid ${BD}`, ...(window.innerWidth >= 768 ? { borderBottom: "none", borderRight: `1px solid ${BD}` } : {}) }}>
                  <h2 className="text-2xl font-bold mb-4 text-white">{industry.title}</h2>
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/35 mb-3">Typical Intents</p>
                    <ul className="space-y-2">
                      {industry.intents.map((intent, j) => (
                        <li key={j} className="text-sm text-white/65 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ background: PL }} />
                          {intent}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: flows + outcome */}
                <div className="md:w-2/3 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/35 mb-3">Automation Flow</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {industry.flows.map((flow, j) => (
                        <span
                          key={j}
                          className="px-3 py-1.5 text-xs font-medium text-white/65"
                          style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BD}` }}
                        >
                          {flow}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6" style={{ background: PD, border: `1px solid ${PB}` }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: PL }}>The Outcome</p>
                    <p className="text-sm leading-relaxed text-white/80">{industry.outcomes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom workflows CTA */}
          <div className="mt-16 p-12 text-center" style={{ border: `1px solid ${PB}`, background: PD }}>
            <h3 className="text-2xl font-bold mb-4 text-white">Custom Workflows</h3>
            <p className="text-white/55 mb-8 max-w-xl mx-auto">
              If your business has calls, scheduling, and follow-ups, we can build it. We engineer systems to map perfectly to your unique rules.
            </p>
            <Link href="/contact">
              <Button
                className="rounded-none text-white border-0 btn-glow btn-sweep"
                style={{ background: `linear-gradient(135deg, ${P}, ${PL})` }}
              >
                Get a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
