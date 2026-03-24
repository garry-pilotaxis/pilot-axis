import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PhoneCall, Calendar, Database, GitMerge, LineChart, X } from "lucide-react";

export default function Solutions() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-black text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6">
            Everything you need to turn calls into booked revenue.
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            One system. Built for your business. Maintained monthly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-32">
            
            {/* 1. AI Voice Agent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 border border-black/10 flex items-center justify-center mb-6 bg-[#fcfcfc]">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold mb-4">1. AI Voice Agent</h2>
                <p className="text-black/70 mb-6 leading-relaxed">
                  A front-line responder that sounds human, never sleeps, and handles concurrent calls effortlessly. It answers, qualifies, provides specific FAQs, and routes effectively.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Voice Tone & Accent Control
                  </li>
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Caller Intent Detection
                  </li>
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Smart Escalation to Humans
                  </li>
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Custom After-Hours Mode
                  </li>
                </ul>
              </div>
              <div className="aspect-square bg-[#fcfcfc] border border-black/10 p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                <div className="relative z-10 space-y-4">
                   <div className="bg-white border border-black/10 p-4 shadow-sm w-3/4">
                     <p className="text-xs text-black/50 mb-1">Caller</p>
                     <p className="text-sm">"Hi, do you take walk-ins for a consultation?"</p>
                   </div>
                   <div className="bg-black text-white p-4 shadow-sm w-3/4 ml-auto">
                     <p className="text-xs text-white/50 mb-1">Pilot Agent</p>
                     <p className="text-sm">"We operate by appointment only to give you our full attention. I have a 2:30 PM slot open today. Would you like me to book that for you?"</p>
                   </div>
                </div>
              </div>
            </div>

            {/* 2. Scheduling Engine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 aspect-square bg-[#fcfcfc] border border-black/10 p-8 flex items-center justify-center">
                 <div className="w-full border border-black/10 bg-white shadow-sm">
                    <div className="border-b border-black/10 p-3 flex justify-between items-center bg-[#fcfcfc]">
                      <span className="text-xs font-bold uppercase">October 24</span>
                      <span className="text-xs">Dr. Smith</span>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-xs p-2 border border-black/5 flex justify-between text-black/40"><span>09:00 AM</span><span>Unavailable</span></div>
                      <div className="text-xs p-2 border border-black bg-black text-white flex justify-between font-medium"><span>10:30 AM</span><span>New Booking</span></div>
                      <div className="text-xs p-2 border border-black/5 flex justify-between text-black/40"><span>11:00 AM</span><span>Unavailable</span></div>
                      <div className="text-xs p-2 border border-black/10 bg-[#fcfcfc] flex justify-between"><span>01:00 PM</span><span>Available</span></div>
                    </div>
                 </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-16 h-16 border border-black/10 flex items-center justify-center mb-6 bg-[#fcfcfc]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold mb-4">2. Scheduling Engine</h2>
                <p className="text-black/70 mb-6 leading-relaxed">
                  Real-time calendar synchronization. The system intelligently navigates timezones, buffer times, and multi-staff availability to secure appointments instantly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Book, Check, Reschedule, Cancel
                  </li>
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Multi-calendar & Staff Routing
                  </li>
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Intelligent Buffer Logic
                  </li>
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Instant Confirmation Dispatch
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. CRM + Waitlist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 border border-black/10 flex items-center justify-center mb-6 bg-[#fcfcfc]">
                  <Database className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold mb-4">3. CRM + Waitlist</h2>
                <p className="text-black/70 mb-6 leading-relaxed">
                  Stop losing leads on sticky notes. Every interaction is parsed, structured, and logged centrally. Our waitlist manager automatically sorts requests on a first-come, first-serve basis.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Airtable / Google Sheets Logging
                  </li>
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> FCFS Waitlist Sorting
                  </li>
                  <li className="flex items-center text-sm font-medium border-b border-black/5 pb-2">
                    <span className="w-2 h-2 bg-black mr-4 shrink-0"></span> Parent / Student / Lead Profiling
                  </li>
                </ul>
              </div>
              <div className="aspect-square bg-[#fcfcfc] border border-black/10 p-6 flex flex-col gap-2">
                 <div className="grid grid-cols-4 gap-2 text-[10px] uppercase font-bold text-black/50 border-b border-black/10 pb-2">
                   <span>Name</span><span>Intent</span><span>Priority</span><span>Status</span>
                 </div>
                 <div className="grid grid-cols-4 gap-2 text-xs py-2 border-b border-black/5 items-center">
                   <span className="font-medium">J. Doe</span><span>Consult</span><span className="bg-black text-white px-2 py-1 text-center w-max">HIGH</span><span>Logged</span>
                 </div>
                 <div className="grid grid-cols-4 gap-2 text-xs py-2 border-b border-black/5 items-center">
                   <span className="font-medium">S. Miller</span><span>Reschedule</span><span className="border border-black/20 px-2 py-1 text-center w-max text-black/60">MED</span><span>Actioned</span>
                 </div>
                 <div className="grid grid-cols-4 gap-2 text-xs py-2 border-b border-black/5 items-center">
                   <span className="font-medium">M. Scott</span><span>Waitlist</span><span className="border border-black/20 px-2 py-1 text-center w-max text-black/60">MED</span><span>Queued</span>
                 </div>
              </div>
            </div>

            {/* 4 & 5. Automation + Reporting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="border border-black/10 p-8 hover:border-black/30 transition-colors">
                <GitMerge className="w-8 h-8 mb-6" />
                <h3 className="text-2xl font-bold mb-4">4. Automation Layer</h3>
                <p className="text-black/60 mb-6">Invisible workflows that keep clients engaged and informed.</p>
                <ul className="space-y-2 text-sm">
                  <li>• Automated reminders (SMS/Email)</li>
                  <li>• Missed call text-back sequences</li>
                  <li>• Post-appointment follow-ups</li>
                  <li>• Nurture drip campaigns</li>
                </ul>
              </div>
              
              <div className="border border-black/10 p-8 hover:border-black/30 transition-colors">
                <LineChart className="w-8 h-8 mb-6" />
                <h3 className="text-2xl font-bold mb-4">5. Reporting</h3>
                <p className="text-black/60 mb-6">Clear visibility into system performance and captured revenue.</p>
                <ul className="space-y-2 text-sm">
                  <li>• Call volume & conversion metrics</li>
                  <li>• Cancellation / Reschedule rates</li>
                  <li>• Complete audio recordings</li>
                  <li>• Missed leads dashboard</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 bg-[#fcfcfc] border-t border-black/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-12">What we don't do.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="flex gap-4 p-6 border border-black/10 bg-white">
              <X className="w-6 h-6 text-black shrink-0" />
              <div>
                <h4 className="font-bold mb-2">We don't sell generic bots.</h4>
                <p className="text-sm text-black/60">Every system is engineered specifically for your exact operational workflows and rules. No out-of-the-box templates.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 border border-black/10 bg-white">
              <X className="w-6 h-6 text-black shrink-0" />
              <div>
                <h4 className="font-bold mb-2">We don't disappear after setup.</h4>
                <p className="text-sm text-black/60">We monitor, maintain, and continuously optimize the agent based on real caller transcripts every month.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <Link href="/contact">
          <Button size="lg" className="rounded-none bg-black text-white h-14 px-12 hover-lift text-base">
            Book a Call
          </Button>
        </Link>
      </section>
    </div>
  );
}
