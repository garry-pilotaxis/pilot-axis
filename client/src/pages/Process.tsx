import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We map your exact call flow, FAQs, booking rules, and edge cases. No detail is too small.",
      detail: "We conduct a deep-dive interview and review your past call recordings to understand intent and tone."
    },
    {
      num: "02",
      title: "Build",
      desc: "We engineer the AI agent, configure the integrations, and set up your data logging infrastructure.",
      detail: "We connect to your CRM/calendar, program the logic trees, and refine the voice synthesis for a natural feel."
    },
    {
      num: "03",
      title: "Test",
      desc: "Rigorous internal testing of edge cases, fail-safes, and complex booking scenarios.",
      detail: "We run dozens of simulated calls to ensure the agent handles interruptions, bad connections, and complex requests gracefully."
    },
    {
      num: "04",
      title: "Launch",
      desc: "Seamless go-live with active monitoring.",
      detail: "We route a portion of calls to the system, monitor live performance, and slowly scale up as confidence is established."
    },
    {
      num: "05",
      title: "Optimize",
      desc: "Monthly reviews, reporting, and continuous improvement based on real call data.",
      detail: "We analyze transcripts to add new FAQs, refine conversational paths, and improve booking conversion rates."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            A clean rollout. No chaos.
          </h1>
          <p className="text-lg text-black/60">
            Precision engineering from day one to launch.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[2.25rem] md:before:ml-[50%] before:-translate-x-px md:before:translate-x-0 before:w-0.5 before:bg-black/10">
            {steps.map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group py-12">
                <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-white bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] z-10 relative">
                  <span className="text-white font-heading font-bold text-xl">{step.num}</span>
                </div>
                
                <div className="w-[calc(100%-6rem)] md:w-[calc(50%-4rem)] p-6 border border-black/10 bg-white hover:border-black/30 transition-colors">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="font-medium text-sm mb-3">{step.desc}</p>
                  <p className="text-xs text-black/50 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-8 border border-black text-center max-w-md mx-auto relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] z-0"></div>
             <div className="relative z-10 bg-white p-6 border border-black/10">
                <p className="text-sm font-bold uppercase tracking-widest text-black/50 mb-2">Timeline</p>
                <p className="text-3xl font-heading font-bold">7 – 14 Days</p>
                <p className="text-xs mt-2 text-black/60">Typical launch duration</p>
             </div>
          </div>
          
          <div className="text-center mt-20">
             <Link href="/contact">
                <Button className="rounded-none bg-black text-white px-10 h-12 hover-lift">Start the Process</Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
