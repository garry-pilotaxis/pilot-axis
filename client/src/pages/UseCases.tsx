import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <div className="flex flex-col min-h-screen">
      <section className="pt-24 pb-16 px-4 bg-[#fcfcfc] border-b border-black/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6">
            Built around real business workflows.
          </h1>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            See how the system adapts to different industries to capture leads and eliminate admin.
          </p>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12">
            {industries.map((industry, i) => (
              <div key={i} className="border border-black/10 p-8 md:p-12 bg-white flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-black/10 pb-8 md:pb-0 md:pr-8">
                  <h2 className="text-2xl font-bold mb-4">{industry.title}</h2>
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-3">Typical Intents</p>
                    <ul className="space-y-1">
                      {industry.intents.map((intent, j) => (
                        <li key={j} className="text-sm font-medium">{intent}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:w-2/3 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-3">Automation Flow</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {industry.flows.map((flow, j) => (
                        <span key={j} className="bg-[#fcfcfc] border border-black/10 px-3 py-1.5 text-xs font-medium">
                          {flow}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-black text-white p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">The Outcome</p>
                    <p className="text-sm leading-relaxed">{industry.outcomes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 border border-black/10 bg-[#fcfcfc] text-center">
            <h3 className="text-2xl font-bold mb-4">Custom Workflows</h3>
            <p className="text-black/60 mb-8 max-w-xl mx-auto">
              If your business has calls, scheduling, and follow-ups, we can build it. We engineer systems to map perfectly to your unique rules.
            </p>
            <Link href="/contact">
              <Button className="rounded-none bg-black text-white hover-lift">
                Get a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
