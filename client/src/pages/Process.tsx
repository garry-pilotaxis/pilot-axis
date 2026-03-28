import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const P  = "#7269ea";
const PL = "#9b8bf4";
const PD = "rgba(109,92,231,0.18)";
const PB = "rgba(109,92,231,0.28)";
const CB = "rgba(0,0,0,0.03)";
const BD = "rgba(0,0,0,0.08)";

export default function Process() {
  const steps = [
    { num: "01", title: "Discovery", desc: "We map your exact call flow, FAQs, booking rules, and edge cases. No detail is too small.", detail: "We conduct a deep-dive interview and review your past call recordings to understand intent and tone." },
    { num: "02", title: "Build",     desc: "We engineer the AI agent, configure the integrations, and set up your data logging infrastructure.", detail: "We connect to your CRM/calendar, program the logic trees, and refine the voice synthesis for a natural feel." },
    { num: "03", title: "Test",      desc: "Rigorous internal testing of edge cases, fail-safes, and complex booking scenarios.", detail: "We run dozens of simulated calls to ensure the agent handles interruptions, bad connections, and complex requests gracefully." },
    { num: "04", title: "Launch",    desc: "Seamless go-live with active monitoring.", detail: "We route a portion of calls to the system, monitor live performance, and slowly scale up as confidence is established." },
    { num: "05", title: "Optimize",  desc: "Monthly reviews, reporting, and continuous improvement based on real call data.", detail: "We analyze transcripts to add new FAQs, refine conversational paths, and improve booking conversion rates." },
  ];

  return (
    <div className="flex flex-col min-h-screen text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-20 px-4" style={{ borderBottom: `1px solid ${BD}` }}>
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">Process</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-gray-900">
            A clean rollout. No chaos.
          </h1>
          <p className="text-lg text-gray-500">
            Precision engineering from day one to launch.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Vertical timeline */}
          <div className="relative">
            {/* center line */}
            <div
              className="absolute hidden md:block"
              style={{
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                background: `linear-gradient(to bottom, transparent, ${PB} 10%, ${PB} 90%, transparent)`,
                transform: "translateX(-50%)",
              }}
            />
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group py-12"
                >
                  {/* Circle node */}
                  <div
                    className="flex items-center justify-center w-20 h-20 rounded-full shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative font-heading font-bold text-xl"
                    style={{
                      background: `linear-gradient(135deg, ${P}, ${PL})`,
                      boxShadow: `0 0 24px rgba(109,92,231,0.5), 0 0 48px rgba(109,92,231,0.2)`,
                      color: "#fff",
                    }}
                  >
                    {step.num}
                  </div>

                  {/* Card */}
                  <div
                    className="w-[calc(100%-6rem)] md:w-[calc(50%-4rem)] p-6 card-premium transition-all duration-300"
                    style={{ background: CB, border: `1px solid ${BD}` }}
                  >
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="font-medium text-sm mb-3 text-gray-700">{step.desc}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline callout */}
          <div
            className="mt-24 p-8 text-center max-w-md mx-auto"
            style={{ border: `1px solid ${PB}`, background: PD }}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Timeline</p>
            <p className="text-4xl font-heading font-bold text-gray-900">7 – 14 Days</p>
            <p className="text-xs mt-2 text-gray-500">Typical launch duration</p>

          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <Link href="/contact">
              <Button
                className="rounded-none text-white px-10 h-12 border-0 btn-glow btn-sweep"
                style={{ background: `linear-gradient(135deg, ${P}, ${PL})` }}
              >
                Start the Process
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
