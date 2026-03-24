import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Built for control, not hype.
          </h1>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg text-black/80 max-w-none mb-24">
            <p className="text-xl leading-relaxed mb-8 font-medium text-black">
              We focus on operational automation: turning calls into structured data, and structured data into booked outcomes.
            </p>
            <p className="mb-6 leading-relaxed">
              Pilot Axis was founded on a simple premise: appointment-based businesses lose too much revenue to missed calls and chaotic manual scheduling. While the market flooded with gimmicky AI chatbots, we built rigorous, reliable systems.
            </p>
            <p className="leading-relaxed">
              We design for trust and simplicity. We build systems that stay stable, are monitored constantly, and improve monthly. No bloated software. Just precise engineering that handles your frontline operations.
            </p>
          </div>

          <div className="border-t border-black/10 pt-16">
            <h2 className="text-2xl font-bold mb-10 text-center">Our Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border border-black/10 p-8 bg-[#fcfcfc]">
                <h3 className="font-bold text-lg mb-2">Precision</h3>
                <p className="text-sm text-black/60 leading-relaxed">Exact routing, deterministic scheduling rules, and flawless data logging. It works as intended.</p>
              </div>
              <div className="border border-black/10 p-8 bg-[#fcfcfc]">
                <h3 className="font-bold text-lg mb-2">Minimalism</h3>
                <p className="text-sm text-black/60 leading-relaxed">No unnecessary features. We strip away the noise to build exactly what drives revenue and saves time.</p>
              </div>
              <div className="border border-black/10 p-8 bg-[#fcfcfc]">
                <h3 className="font-bold text-lg mb-2">Reliability</h3>
                <p className="text-sm text-black/60 leading-relaxed">Fail-safes, fallbacks, and human escalations. Systems built to handle edge cases without breaking.</p>
              </div>
              <div className="border border-black/10 p-8 bg-[#fcfcfc]">
                <h3 className="font-bold text-lg mb-2">Measurable Outcomes</h3>
                <p className="text-sm text-black/60 leading-relaxed">If it doesn't increase booked appointments or dramatically reduce admin hours, we don't build it.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-24 text-center">
            <Link href="/contact">
              <Button className="rounded-none bg-black text-white px-10 h-12 hover-lift">
                Work With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
