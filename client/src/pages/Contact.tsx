import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { BookingCalendar } from "@/components/ui/booking-calendar";

// ─── Contact form ────────────────────────────────────────────────────────────
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


// ─── Page ─────────────────────────────────────────────────────────────────────
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
    <div className="flex flex-col min-h-screen">
      {/* hero */}
      <section className="pt-24 pb-12 px-4 border-b border-black/10 bg-[#fcfcfc]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-widest font-bold text-black/35 mb-4">
            Get Started
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Book a discovery call.
          </h1>
          <p className="text-black/55 max-w-md mx-auto text-sm leading-relaxed">
            30 minutes. We'll map your call flow and show you exactly what we'd build.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

            {/* ── Left: contact form ──────────────────────────────────── */}
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/35 mb-6">
                Or send a message
              </p>
              <form id="contact-form" className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-black/45">Name</Label>
                    <Input id="name" name="name" required placeholder="Jane Smith"
                      className="rounded-none border-black/20 focus-visible:ring-1 focus-visible:ring-black h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="business" className="text-[10px] uppercase tracking-widest font-bold text-black/45">Business</Label>
                    <Input id="business" name="business" placeholder="Acme Clinic"
                      className="rounded-none border-black/20 focus-visible:ring-1 focus-visible:ring-black h-11" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-black/45">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="jane@example.com"
                      className="rounded-none border-black/20 focus-visible:ring-1 focus-visible:ring-black h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-[10px] uppercase tracking-widest font-bold text-black/45">Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="(555) 000-0000"
                      className="rounded-none border-black/20 focus-visible:ring-1 focus-visible:ring-black h-11" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-black/45">
                    What do you need automated?
                  </Label>
                  <Textarea id="message" name="message" required
                    className="rounded-none border-black/20 focus-visible:ring-1 focus-visible:ring-black min-h-[120px] resize-none"
                    placeholder="We get ~50 missed calls/week and need them routed to our waitlist..." />
                </div>
                <Button type="submit" disabled={mutation.isPending}
                  className="w-full rounded-none bg-black text-white h-12 text-sm font-medium">
                  {mutation.isPending
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                    : "Send Message"}
                </Button>
                <p className="text-[11px] text-center text-black/40">
                  We respond within 24 hours.
                </p>
              </form>
            </div>

            {/* ── Right: premium calendar ──────────────────────────────── */}
            <div className="border border-black/10 bg-white shadow-sm" style={{ minHeight: 520 }}>
              <BookingCalendar />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
