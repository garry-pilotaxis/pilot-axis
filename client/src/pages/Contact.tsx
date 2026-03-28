import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { BookingCalendar } from "@/components/ui/booking-calendar";

const P  = "#7269ea";
const PL = "#9b8bf4";
const PD = "rgba(109,92,231,0.18)";
const PB = "rgba(109,92,231,0.28)";
const CB = "rgba(0,0,0,0.03)";
const BD = "rgba(0,0,0,0.08)";
const BM = "rgba(0,0,0,0.12)";

async function submitContact(data: {
  name: string; business?: string; email: string; phone?: string; message: string;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Submission failed");
  return res.json();
}

// Shared styled input component for dark theme
function DarkInput({ id, name, type = "text", required, placeholder, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      {...props}
      className="w-full h-11 px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200"
      style={{
        background: "rgba(0,0,0,0.03)",
        border: `1px solid ${BD}`,
        color: "#111",
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = PB; e.currentTarget.style.boxShadow = `0 0 0 1px ${PB}, 0 0 16px rgba(109,92,231,0.15)`; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = BD; e.currentTarget.style.boxShadow = "none"; }}
    />
  );
}

function DarkTextarea({ id, name, required, placeholder }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      rows={5}
      className="w-full px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none resize-none transition-all duration-200"
      style={{ background: "rgba(0,0,0,0.03)", border: `1px solid ${BD}`, color: "#111" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = PB; e.currentTarget.style.boxShadow = `0 0 0 1px ${PB}, 0 0 16px rgba(109,92,231,0.15)`; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = BD; e.currentTarget.style.boxShadow = "none"; }}
    />
  );
}

export default function Contact() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      toast({ title: "Request submitted", description: "We'll reach out within 24 hours." });
      (document.getElementById("contact-form") as HTMLFormElement)?.reset();
    },
    onError: (e: Error) =>
      toast({ title: "Something went wrong", description: e.message, variant: "destructive" }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    mutation.mutate({
      name:     fd.get("name") as string,
      business: (fd.get("business") as string) || undefined,
      email:    fd.get("email") as string,
      phone:    (fd.get("phone") as string) || undefined,
      message:  fd.get("message") as string,
    });
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4" style={{ borderBottom: `1px solid ${BD}` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-4">
            Get Started
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900">
            Book a discovery call.
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            30 minutes. We'll map your call flow and show you exactly what we'd build.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

            {/* Contact form */}
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-6">
                Or send a message
              </p>
              <form id="contact-form" className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block">Name</label>
                    <DarkInput id="name" name="name" required placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="business" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block">Business</label>
                    <DarkInput id="business" name="business" placeholder="Acme Clinic" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block">Email</label>
                    <DarkInput id="email" name="email" type="email" required placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block">Phone</label>
                    <DarkInput id="phone" name="phone" type="tel" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block">
                    What do you need automated?
                  </label>
                  <DarkTextarea id="message" name="message" required placeholder="We get ~50 missed calls/week and need them routed to our waitlist..." />
                </div>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full rounded-none text-white h-12 text-sm font-medium border-0 btn-glow btn-sweep"
                  style={{ background: `linear-gradient(135deg, ${P}, ${PL})` }}
                >
                  {mutation.isPending
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                    : "Send Message"}
                </Button>
                <p className="text-[11px] text-center text-gray-400">
                  We respond within 24 hours.
                </p>
              </form>
            </div>

            {/* Calendar */}
            <div
              style={{
                border: `1px solid ${PB}`,
                background: "rgba(109,92,231,0.05)",
                backdropFilter: "blur(12px)",
                minHeight: 520,
                boxShadow: `0 0 40px rgba(109,92,231,0.12)`,
              }}
            >
              <BookingCalendar />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
