import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const P  = "#7269ea";
const PL = "#9b8bf4";
const PD = "rgba(109,92,231,0.18)";
const PB = "rgba(109,92,231,0.28)";
const CB = "rgba(0,0,0,0.03)";
const BD = "rgba(0,0,0,0.08)";

const principles = [
  { title: "Precision",           body: "Exact routing, deterministic scheduling rules, and flawless data logging. It works as intended." },
  { title: "Minimalism",          body: "No unnecessary features. We strip away the noise to build exactly what drives revenue and saves time." },
  { title: "Reliability",         body: "Fail-safes, fallbacks, and human escalations. Systems built to handle edge cases without breaking." },
  { title: "Measurable Outcomes", body: "If it doesn't increase booked appointments or dramatically reduce admin hours, we don't build it." },
];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-20 px-4" style={{ borderBottom: `1px solid ${BD}` }}>
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">About</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-gray-900">
            Built for control, not hype.
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">

          {/* Prose */}
          <div className="mb-24 space-y-6">
            <p className="text-xl leading-relaxed font-medium text-gray-900">
              We focus on operational automation: turning calls into structured data, and structured data into booked outcomes.
            </p>
            <p className="leading-relaxed text-gray-600">
              Pilot Axis was founded on a simple premise: appointment-based businesses lose too much revenue to missed calls and chaotic manual scheduling. While the market flooded with gimmicky AI chatbots, we built rigorous, reliable systems.
            </p>
            <p className="leading-relaxed text-gray-600">
              We design for trust and simplicity. We build systems that stay stable, are monitored constantly, and improve monthly. No bloated software. Just precise engineering that handles your frontline operations.
            </p>
          </div>

          {/* Principles */}
          <div style={{ borderTop: `1px solid ${BD}` }} className="pt-16">
            <h2 className="text-2xl font-bold mb-10 text-center text-gray-900">Our Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.map(({ title, body }) => (
                <div
                  key={title}
                  className="p-8 card-premium"
                  style={{ background: CB, border: `1px solid ${BD}` }}
                >
                  <div className="w-6 h-px mb-4" style={{ background: PB }} />
                  <h3 className="font-bold text-lg mb-3 text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <Link href="/contact">
              <Button
                className="rounded-none text-white px-10 h-12 border-0 btn-glow btn-sweep"
                style={{ background: `linear-gradient(135deg, ${P}, ${PL})` }}
              >
                Work With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
