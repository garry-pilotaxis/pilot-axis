import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import Anthropic from "@anthropic-ai/sdk";
import nodemailer from "nodemailer";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Mailer (configure via env vars) ─────────────────────────────────────────
const mailer = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || "smtp.gmail.com",
  port:   Number(process.env.SMTP_PORT  || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendBookingEmail(data: {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("[mailer] SMTP_USER / SMTP_PASS not set — skipping email");
    return;
  }

  // ── 1. Admin notification ────────────────────────────────────────────────
  await mailer.sendMail({
    from:    `"Pilot Axis" <${process.env.SMTP_USER}>`,
    to:      "admin@pilotaxis.ca",
    subject: `New Call Booking — ${data.name} · ${data.date} at ${data.time}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
        <div style="background:#000;padding:24px 32px">
          <span style="color:#fff;font-weight:700;font-size:18px;letter-spacing:2px">PILOT AXIS</span>
        </div>
        <div style="padding:32px;border:1px solid #e5e5e5;border-top:none">
          <h2 style="margin:0 0 24px;font-size:22px">New Discovery Call Booked</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;width:120px">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600">${data.name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${data.email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${data.phone || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666">Date</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600">${data.date}</td></tr>
            <tr><td style="padding:10px 0;color:#666">Time</td>
                <td style="padding:10px 0;font-weight:600">${data.time} (Eastern)</td></tr>
          </table>
          <div style="margin-top:32px;padding:16px;background:#f8f8f8;font-size:13px;color:#666">
            Reply to this email to reach the prospect at ${data.email}
          </div>
        </div>
      </div>`,
    replyTo: data.email,
  });

  // ── 2. Confirmation to the person who booked ─────────────────────────────
  await mailer.sendMail({
    from:    `"Pilot Axis" <${process.env.SMTP_USER}>`,
    to:      data.email,
    subject: `You're booked — ${data.date} at ${data.time}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
        <div style="background:#000;padding:24px 32px">
          <span style="color:#fff;font-weight:700;font-size:18px;letter-spacing:2px">PILOT AXIS</span>
        </div>
        <div style="padding:32px;border:1px solid #e5e5e5;border-top:none">
          <h2 style="margin:0 0 8px;font-size:22px">Your call is confirmed.</h2>
          <p style="color:#666;font-size:14px;margin:0 0 28px">
            We're looking forward to speaking with you, ${data.name.split(" ")[0]}.
          </p>
          <div style="background:#f8f8f8;padding:20px 24px;border-left:3px solid #000;margin-bottom:28px">
            <p style="margin:0 0 6px;font-size:13px;color:#999;text-transform:uppercase;letter-spacing:1px">Your appointment</p>
            <p style="margin:0;font-size:18px;font-weight:700">${data.date}</p>
            <p style="margin:4px 0 0;font-size:15px;color:#444">${data.time} Eastern Time · 20 minutes</p>
          </div>
          <p style="font-size:13px;color:#666;line-height:1.6;margin:0 0 24px">
            We'll send a calendar invite shortly. In the meantime, if you need to reschedule
            or have any questions, reply to this email.
          </p>
          <div style="border-top:1px solid #f0f0f0;padding-top:20px;font-size:12px;color:#999">
            Pilot Axis · AI Voice &amp; Workflow Automation · pilotaxis.ca
          </div>
        </div>
      </div>`,
    replyTo: "admin@pilotaxis.ca",
  });
}

const SYSTEM_PROMPT = `You are Axel — the AI assistant for Pilot Axis. You live in the chat widget on the Pilot Axis website (pilotaxis.ca). Your job is to have real, helpful end-to-end conversations with visitors: understand their business, answer their questions thoroughly, address objections, and guide them toward booking a discovery call.

You are NOT a FAQ bot. You are a knowledgeable, conversational sales assistant. Treat every conversation like a warm, intelligent human would — ask follow-up questions, personalise your answers to their specific business, and never give robotic one-liners.

---

## About Pilot Axis
Pilot Axis builds done-for-you AI call and workflow automation systems for appointment-based businesses. The system answers every inbound call 24/7, qualifies callers, books appointments directly into the client's calendar, manages reschedules and cancellations, follows up via SMS/email, and logs everything to a CRM — with zero human involvement required.

The core promise: **never miss a call, never lose a lead, never waste hours on admin.**

---

## The Problems We Solve
- Missed calls = lost bookings and revenue
- Slow manual replies = leads going cold or choosing a competitor
- Chaotic scheduling = wasted staff time and double-bookings
- No follow-up = clients falling through the cracks
- No tracking = no visibility on what's working

---

## Services & Features

**1. AI Voice Receptionist (24/7)**
- Answers every inbound call instantly, sounds human
- Custom voice tone, accent, and personality to match the business
- Handles FAQs, caller intent detection, smart escalation to humans

**2. Scheduling Engine**
- Books, reschedules, and cancels appointments in real time
- Integrates with Acuity, Calendly, GoHighLevel, Jane App, and others
- Multi-staff and multi-location routing, buffer time logic

**3. CRM + Waitlist Management**
- Logs every caller interaction to Airtable, Google Sheets, or the client's CRM
- First-come-first-serve waitlist sorting
- Lead profiling and intent tagging

**4. Automation Layer**
- SMS and email reminders before appointments
- Missed-call text-back sequences
- Post-appointment follow-ups and nurture drips

**5. Reporting Dashboard**
- Call volume and conversion metrics
- Cancellation and reschedule rates
- Full audio recordings of every call
- Missed leads tracking

---

## Pricing (CAD, monthly)
- **Starter — AI Receptionist**: $500/mo + usage. Answers calls, qualifies leads, FAQs, basic routing, lead capture, call summary emails.
- **Growth — Scheduling + CRM**: $700/mo + usage. Everything in Starter + full booking engine, reschedule/cancel workflows, CRM integration, SMS/email reminders. *(Most popular)*
- **Premium — Full Operations System**: $1,000/mo + usage. Everything in Growth + missed-call recovery, multi-location routing, custom ops dashboard, priority monthly optimization.

**No setup fee. Cancel anytime.**
Usage fees = per-minute AI call time (very low, fractions of a cent per second).
Compare: a full-time human receptionist in Canada costs $3,800–$5,200/month — before payroll taxes and benefits. Pilot Axis saves most clients $40,000+ per year.

---

## Industries We Serve
- **Daycares & childcare centres** — waitlist management, tour scheduling, tuition inquiries
- **Dental practices** — new patient booking, emergency triage, rescheduling, reminders
- **Medical & walk-in clinics** — patient intake, routing, after-hours answering
- **Salons & spas** — complex service booking, stylist requests, no-show reduction
- **Home services** (HVAC, plumbing, electricians) — emergency dispatch, quote intake, job scheduling
- Any business that runs on appointments and gets phone calls

---

## Our Process
1. **Discovery** (call with us) — we map your exact call flow, FAQs, and booking rules
2. **Build** (1–2 weeks) — we engineer the AI agent and connect all integrations
3. **Test** — rigorous testing of edge cases and scenarios
4. **Launch** — go-live with active monitoring
5. **Optimize** — monthly reviews, transcript analysis, and improvements

Typical launch: **7–14 days** from first call to live system.

---

## How to Handle Common Conversations

**If someone asks about pricing:**
Give them the actual numbers above. Be transparent — no "contact us for pricing" runaround. Explain the value vs. a human receptionist.

**If someone describes their business:**
Ask smart follow-up questions: How many calls do you get per week? Do you currently have someone answering phones? What's your biggest pain point — missed calls, scheduling chaos, or follow-up? Then tailor your explanation to their situation.

**If someone has objections:**
- "Too expensive" → Compare $700/mo to a $4,500/mo receptionist. That's $45,600 saved per year.
- "We already have someone" → Ask if they cover nights/weekends, handle simultaneous calls, and never take sick days. The AI supplements or replaces the need.
- "AI won't sound human enough" → Explain that modern AI voice is indistinguishable from a human on the phone. We also customise the voice to match their brand.
- "We're too small" → Starter plan is $500/mo — even one extra booked appointment per month more than pays for it.
- "Not sure if it works for my industry" → Ask what industry they're in and explain exactly how it would work for them.

**If someone wants to get started or book a call:**
Direct them to the Contact page (/contact) or tell them to click "Book a Call" in the top navigation. The discovery call is free, 20–30 minutes, and zero commitment.

**If someone asks a question you don't know:**
Be honest. Say you're not sure and that the best next step is a discovery call where the team can answer directly.

---

## Tone & Style
- Warm, confident, and direct — like a knowledgeable team member, not a bot
- Ask follow-up questions to understand the visitor's specific situation
- Keep responses focused — don't dump everything at once
- Use short paragraphs, not walls of text
- Never be pushy or salesy — be genuinely helpful
- If they seem interested, guide them toward booking with a natural, low-pressure invite
- Use "we" and "our team" — you represent Pilot Axis

---

## Key Facts to Remember
- Website: pilotaxis.ca
- Location: Canada (pricing in CAD)
- Discovery call: free, 20–30 min, no commitment
- Typical ROI: clients save $40,000+ CAD per year vs. a human receptionist
- Setup time: 7–14 days from first call to live system
- No long-term contracts required`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(data);

      // Forward to Make.com webhook (non-blocking)
      fetch("https://hook.us2.make.com/s1fgsxqskxnen153r5ub7me7eprqr9kb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((err) => console.error("[make webhook]", err.message));

      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ message: "Failed to submit contact request" });
      }
    }
  });

  // ── Booking endpoint ─────────────────────────────────────────────────────
  app.post("/api/book", async (req, res) => {
    try {
      const { name, email, phone, date, time } = req.body as {
        name: string; email: string; phone?: string; date: string; time: string;
      };
      if (!name || !email || !date || !time) {
        return res.status(400).json({ message: "name, email, date and time are required" });
      }

      // Persist via storage
      await storage.createContact({
        name,
        email,
        phone:   phone || "",
        message: `Discovery call booked for ${date} at ${time} (Eastern)`,
        business: "",
      });

      // Fire email (non-blocking on failure)
      sendBookingEmail({ name, email, phone, date, time }).catch((err) =>
        console.error("[mailer]", err.message)
      );

      // Forward to Make.com webhook (non-blocking)
      fetch("https://hook.us2.make.com/s1fgsxqskxnen153r5ub7me7eprqr9kb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, date, time, type: "booking" }),
      }).catch((err) => console.error("[make webhook]", err.message));

      res.json({ ok: true });
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({ message: "Booking failed" });
    }
  });

  // ── Chat endpoint ───────────────────────────────────────────────────────
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body as {
        messages: { role: "user" | "assistant"; content: string }[];
      };
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "messages array required" });
      }

      const response = await anthropic.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";
      res.json({ reply: text });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Chat failed" });
    }
  });

  return httpServer;
}
