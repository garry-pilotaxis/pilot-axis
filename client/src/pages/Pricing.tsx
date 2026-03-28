import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const P  = "#7269ea";
const PL = "#9b8bf4";
const PD = "rgba(109,92,231,0.18)";
const PB = "rgba(109,92,231,0.28)";
const CB = "rgba(0,0,0,0.03)";
const BD = "rgba(0,0,0,0.08)";
const BM = "rgba(0,0,0,0.12)";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-20 px-4" style={{ borderBottom: `1px solid ${BD}` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">Pricing</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-gray-900">
            Simple pricing. Real systems.
          </h1>
          <p className="text-lg text-gray-500">
            No hidden fees. Premium automation built for scale.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

            {/* Starter */}
            <div className="p-8 flex flex-col card-premium" style={{ background: CB, border: `1px solid ${BD}` }}>
              <h3 className="text-2xl font-bold mb-1 text-gray-900">Starter</h3>
              <p className="text-sm font-medium text-gray-400 mb-1">AI Receptionist</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">$500 <span className="text-base font-normal text-gray-500">CAD/month</span></p>
              <p className="text-xs text-gray-400 mb-8 pb-6" style={{ borderBottom: `1px solid ${BD}` }}>+ as per call time usage</p>
              <ul className="space-y-4 mb-10 flex-grow">
                {["Answer calls & qualify","Answer custom FAQs","Basic call routing","Lead capture & logging","Call summary emails"].map((f) => (
                  <li key={f} className="flex items-start text-sm text-gray-600 gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PL }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button
                  className="w-full rounded-none text-gray-900 bg-transparent btn-glow-outline h-12"
                  style={{ border: `1px solid ${BM}` }}
                >
                  Book a Call
                </Button>
              </Link>
            </div>

            {/* Growth — featured */}
            <div
              className="p-8 flex flex-col relative md:-translate-y-4"
              style={{
                background: PD,
                border: `1px solid ${PB}`,
                boxShadow: `0 0 40px rgba(109,92,231,0.2), 0 0 80px rgba(109,92,231,0.08)`,
              }}
            >
              <div
                className="absolute top-0 right-8 -translate-y-1/2 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider"
                style={{ background: P, border: `1px solid ${PL}` }}
              >
                Recommended
              </div>
              <h3 className="text-2xl font-bold mb-1 text-gray-900">Growth</h3>
              <p className="text-sm font-medium text-gray-500 mb-1">Scheduling + CRM</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">$700 <span className="text-base font-normal text-gray-500">CAD/month</span></p>
              <p className="text-xs text-gray-500 mb-8 pb-6" style={{ borderBottom: `1px solid ${PB}` }}>+ as per call time usage</p>
              <ul className="space-y-4 mb-10 flex-grow">
                {["Everything in Starter, plus:","Full booking & scheduling","Reschedule & cancel workflows","Direct CRM integration","Automated SMS/Email reminders"].map((f, i) => (
                  <li key={f} className={`flex items-start text-sm gap-3 ${i === 0 ? "font-bold text-gray-900" : "text-gray-600"}`}>

                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PL }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button
                  className="w-full rounded-none text-white border-0 btn-glow btn-sweep h-12"
                  style={{ background: `linear-gradient(135deg, ${P}, ${PL})` }}
                >
                  Book a Call
                </Button>
              </Link>
            </div>

            {/* Premium */}
            <div className="p-8 flex flex-col card-premium" style={{ background: CB, border: `1px solid ${BD}` }}>
              <h3 className="text-2xl font-bold mb-1 text-gray-900">Premium</h3>
              <p className="text-sm font-medium text-gray-400 mb-1">Full Operations System</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">$1,000 <span className="text-base font-normal text-gray-500">CAD/month</span></p>
              <p className="text-xs text-gray-400 mb-8 pb-6" style={{ borderBottom: `1px solid ${BD}` }}>+ as per call time usage</p>
              <ul className="space-y-4 mb-10 flex-grow">
                {["Everything in Growth, plus:","Missed-call recovery system","Multi-location / complex routing","Custom Operations Dashboard","Priority monthly optimization"].map((f, i) => (
                  <li key={f} className={`flex items-start text-sm gap-3 ${i === 0 ? "font-bold text-gray-900" : "text-gray-600"}`}>
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PL }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button
                  className="w-full rounded-none text-gray-900 bg-transparent btn-glow-outline h-12"
                  style={{ border: `1px solid ${BM}` }}
                >
                  Book a Call
                </Button>
              </Link>
            </div>
          </div>

          {/* No setup fee */}
          <p className="text-center text-sm text-gray-400 mt-10">
            No setup fee — ever.
          </p>

          {/* Human vs AI Comparison */}
          <div className="mt-24" style={{ borderTop: `1px solid ${BD}` }}>
            <div className="pt-16 text-center mb-12">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">The Real Cost</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 mb-3">
                Why pay $4,500/mo for a human<br className="hidden md:block" /> when AI costs $500?
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                A full-time receptionist in Canada runs $3,800–$5,200/month after salary, payroll taxes, and benefits — and they still take breaks, get sick, and miss calls.
              </p>
            </div>

            {/* Comparison table */}
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-400 font-normal text-xs uppercase tracking-wider w-1/2" style={{ borderBottom: `1px solid ${BD}` }}></th>
                    <th className="py-4 px-6 text-center text-xs uppercase tracking-wider font-bold text-gray-500 w-1/4" style={{ borderBottom: `1px solid ${BD}`, background: "rgba(0,0,0,0.03)" }}>
                      Human Receptionist
                    </th>
                    <th className="py-4 px-6 text-center text-xs uppercase tracking-wider font-bold w-1/4" style={{ borderBottom: `1px solid ${PB}`, background: PD, color: PL }}>
                      Pilot Axis AI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Monthly Cost",
                      human: "$3,800 – $5,200 CAD",
                      ai: "From $500 CAD",
                      highlight: true,
                    },
                    {
                      label: "Available Hours",
                      human: "9am – 5pm (Mon–Fri)",
                      ai: "24/7/365",
                    },
                    {
                      label: "Sick Days / Vacation",
                      human: "Yes — you still pay",
                      ai: "Never",
                    },
                    {
                      label: "Simultaneous Calls",
                      human: "1 at a time",
                      ai: "Unlimited",
                    },
                    {
                      label: "Missed Calls",
                      human: "Frequent",
                      ai: "Zero",
                    },
                    {
                      label: "Response Consistency",
                      human: "Varies by mood & training",
                      ai: "Always on-brand, always accurate",
                    },
                    {
                      label: "Setup & Onboarding Time",
                      human: "Weeks of training",
                      ai: "Instant",
                    },
                    {
                      label: "Turnover Risk",
                      human: "High — avg 1–2 years",
                      ai: "None",
                    },
                    {
                      label: "CRM & Booking Integration",
                      human: "Manual, error-prone",
                      ai: "Automatic",
                    },
                    {
                      label: "Payroll Taxes & Benefits",
                      human: "+18–25% on top of salary",
                      ai: "Included",
                    },
                  ].map((row, i) => (
                    <tr key={row.label} style={{ borderBottom: `1px solid ${i % 2 === 0 ? "rgba(0,0,0,0.04)" : "transparent"}` }}>
                      <td className="py-4 px-6 text-gray-600">{row.label}</td>
                      <td className="py-4 px-6 text-center text-gray-400" style={{ background: "rgba(0,0,0,0.02)" }}>
                        {row.human}
                      </td>
                      <td
                        className="py-4 px-6 text-center font-semibold"
                        style={{ background: "rgba(109,92,231,0.08)", color: row.highlight ? PL : "rgba(0,0,0,0.85)" }}
                      >
                        {row.ai}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Savings callout */}
            <div
              className="mt-10 max-w-4xl mx-auto p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: PD, border: `1px solid ${PB}` }}
            >
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Average Annual Savings</p>
                <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter">
                  $40,000+{" "}
                  <span className="text-xl font-normal text-gray-500">CAD / year</span>
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Switching from a $4,500/mo receptionist to Pilot Axis Growth at $700/mo saves you <span style={{ color: PL }} className="font-semibold">$45,600 per year</span> — with better coverage.
                </p>
              </div>
              <Link href="/contact" className="shrink-0">
                <Button
                  className="rounded-none text-white border-0 btn-glow btn-sweep h-12 px-8 whitespace-nowrap"
                  style={{ background: `linear-gradient(135deg, ${P}, ${PL})` }}
                >
                  Start Saving Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Included in all plans */}
          <div
            className="mt-20 pt-10 text-center max-w-2xl mx-auto"
            style={{ borderTop: `1px solid ${BD}` }}
          >
            <h4 className="font-bold mb-6 text-gray-900">What's included in all plans:</h4>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500">
              {["Continuous Monitoring","Monthly Maintenance","Secure Architecture","Full Documentation"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: PL }} /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
