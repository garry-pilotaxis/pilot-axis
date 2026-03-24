import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const P  = "#7269ea";
const PL = "#9b8bf4";
const PD = "rgba(109,92,231,0.18)";
const PB = "rgba(109,92,231,0.28)";
const CB = "rgba(255,255,255,0.04)";
const BD = "rgba(255,255,255,0.08)";
const BM = "rgba(255,255,255,0.12)";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen text-white">

      {/* Hero */}
      <section className="pt-28 pb-20 px-4" style={{ borderBottom: `1px solid ${BD}` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/35 mb-4">Pricing</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
            Simple pricing. Real systems.
          </h1>
          <p className="text-lg text-white/55">
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
              <h3 className="text-2xl font-bold mb-1 text-white">Starter</h3>
              <p className="text-sm font-medium text-white/40 mb-8 pb-6" style={{ borderBottom: `1px solid ${BD}` }}>
                AI Receptionist
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                {["Answer calls & qualify","Answer custom FAQs","Basic call routing","Lead capture & logging","Call summary emails"].map((f) => (
                  <li key={f} className="flex items-start text-sm text-white/65 gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PL }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button
                  className="w-full rounded-none text-white bg-transparent btn-glow-outline h-12"
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
              <h3 className="text-2xl font-bold mb-1 text-white">Growth</h3>
              <p className="text-sm font-medium text-white/40 mb-8 pb-6" style={{ borderBottom: `1px solid ${PB}` }}>
                Scheduling + CRM
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                {["Everything in Starter, plus:","Full booking & scheduling","Reschedule & cancel workflows","Direct CRM integration","Automated SMS/Email reminders"].map((f, i) => (
                  <li key={f} className={`flex items-start text-sm gap-3 ${i === 0 ? "font-bold text-white" : "text-white/70"}`}>
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
              <h3 className="text-2xl font-bold mb-1 text-white">Premium</h3>
              <p className="text-sm font-medium text-white/40 mb-8 pb-6" style={{ borderBottom: `1px solid ${BD}` }}>
                Full Operations System
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                {["Everything in Growth, plus:","Missed-call recovery system","Multi-location / complex routing","Custom Operations Dashboard","Priority monthly optimization"].map((f, i) => (
                  <li key={f} className={`flex items-start text-sm gap-3 ${i === 0 ? "font-bold text-white" : "text-white/65"}`}>
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PL }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button
                  className="w-full rounded-none text-white bg-transparent btn-glow-outline h-12"
                  style={{ border: `1px solid ${BM}` }}
                >
                  Book a Call
                </Button>
              </Link>
            </div>
          </div>

          {/* Included in all plans */}
          <div
            className="mt-20 pt-10 text-center max-w-2xl mx-auto"
            style={{ borderTop: `1px solid ${BD}` }}
          >
            <h4 className="font-bold mb-6 text-white">What's included in all plans:</h4>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-white/55">
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
