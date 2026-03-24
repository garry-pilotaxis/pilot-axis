import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-24 pb-16 px-4 bg-black text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Simple pricing. Real systems.
          </h1>
          <p className="text-lg text-white/60">
            No hidden fees. Premium automation built for scale.
          </p>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Starter */}
            <div className="border border-black/10 p-8 flex flex-col bg-white hover:border-black/30 transition-all">
              <h3 className="text-2xl font-bold mb-1">Starter</h3>
              <p className="text-sm font-medium text-black/50 mb-8 border-b border-black/10 pb-6">AI Receptionist</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Answer calls & qualify</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Answer custom FAQs</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Basic call routing</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Lead capture & logging</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Call summary emails</span>
                </li>
              </ul>
              
              <Link href="/contact">
                <Button className="w-full rounded-none border border-black bg-transparent text-black hover:bg-black hover:text-white h-12">
                  Book a Call
                </Button>
              </Link>
            </div>

            {/* Growth */}
            <div className="border-2 border-black p-8 flex flex-col bg-white relative transform md:-translate-y-4 shadow-xl">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                Recommended
              </div>
              <h3 className="text-2xl font-bold mb-1">Growth</h3>
              <p className="text-sm font-medium text-black/50 mb-8 border-b border-black/10 pb-6">Scheduling + CRM</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start text-sm font-bold">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Everything in Starter, plus:</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Full booking & scheduling</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Reschedule & cancel workflows</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Direct CRM integration</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Automated SMS/Email reminders</span>
                </li>
              </ul>
              
              <Link href="/contact">
                <Button className="w-full rounded-none bg-black text-white hover:bg-black/90 h-12">
                  Book a Call
                </Button>
              </Link>
            </div>

            {/* Premium */}
            <div className="border border-black/10 p-8 flex flex-col bg-[#fcfcfc] hover:border-black/30 transition-all">
              <h3 className="text-2xl font-bold mb-1">Premium</h3>
              <p className="text-sm font-medium text-black/50 mb-8 border-b border-black/10 pb-6">Full Operations System</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start text-sm font-bold">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Everything in Growth, plus:</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Missed-call recovery system</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Multi-location / complex routing</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Custom Operations Dashboard</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-5 h-5 mr-3 text-black shrink-0" />
                  <span className="leading-tight">Priority monthly optimization</span>
                </li>
              </ul>
              
              <Link href="/contact">
                <Button className="w-full rounded-none border border-black bg-transparent text-black hover:bg-black hover:text-white h-12">
                  Book a Call
                </Button>
              </Link>
            </div>

          </div>

          <div className="mt-20 pt-10 border-t border-black/10 text-center max-w-2xl mx-auto">
            <h4 className="font-bold mb-6">What's included in all plans:</h4>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-black/70">
              <span className="flex items-center"><Check className="w-4 h-4 mr-2" /> Continuous Monitoring</span>
              <span className="flex items-center"><Check className="w-4 h-4 mr-2" /> Monthly Maintenance</span>
              <span className="flex items-center"><Check className="w-4 h-4 mr-2" /> Secure Architecture</span>
              <span className="flex items-center"><Check className="w-4 h-4 mr-2" /> Full Documentation</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
