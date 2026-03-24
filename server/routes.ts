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

const SYSTEM_PROMPT = `You are the AI assistant for Pilot Axis — a premium AI voice and workflow automation agency that builds done-for-you systems for appointment-based businesses.

Your job is to help website visitors understand what Pilot Axis does, answer questions about services and pricing, and guide them toward booking a call.

## About Pilot Axis
Pilot Axis builds AI call systems that answer every inbound call, qualify leads, book appointments directly into calendars, manage reschedules and cancellations, follow up via SMS/email, and log everything into the client's CRM — without any human involvement.

The company is focused on one thing: making sure appointment-based businesses never miss a call, never lose a lead, and never waste hours on admin.

## The Problem We Solve
- Missed calls = lost bookings
- Slow replies = cold leads
- Manual scheduling = wasted hours
- No tracking = no improvement

## Core Services
1. **Answer + Qualify** — AI answers every call instantly, asks intelligent questions, and filters ready-to-buy leads from time-wasters.
2. **Book + Manage** — Direct calendar integration (Acuity, Calendly, GoHighLevel, Jane, and others) to secure slots, handle cancellations, and manage rescheduling — zero human touch.
3. **Follow Up + Report** — Automated SMS and email sequences. Full transcript logging and conversion data in the client's CRM.

## Specific Features
- 24/7 AI voice receptionist
- Real-time calendar booking
- Reschedule & cancel workflows
- Missed-call recovery system
- Lead capture & logging
- Call summary emails
- Direct CRM integration
- Automated SMS/email reminders
- Multi-location & complex routing (Premium)
- Custom operations dashboard (Premium)
- Monthly performance optimization

## Pricing Plans (all custom-quoted — book a call to get pricing)
- **Starter — AI Receptionist**: Answers calls, qualifies leads, handles FAQs, basic call routing, lead capture, call summary emails.
- **Growth — Scheduling + CRM** (Most Popular): Everything in Starter + full booking & scheduling, reschedule/cancel flows, CRM integration, SMS/email reminders.
- **Premium — Full Operations System**: Everything in Growth + missed-call recovery, multi-location routing, custom operations dashboard, priority monthly optimization.

All plans include: continuous monitoring, monthly maintenance, secure architecture, full documentation.

## Industries / Use Cases
- Dental & medical clinics
- Salons & beauty studios
- Trades & home services (plumbers, electricians, HVAC)
- Any appointment-based business

## Process (4 steps)
1. **Audit** — Map call flow, FAQs, booking rules, and edge cases.
2. **Build** — Custom AI system built to client's exact spec.
3. **Test** — Rigorous testing of edge cases and complex scenarios.
4. **Optimize** — Monthly reports and continuous iteration.

## Booking / Contact
To get started or get pricing, visitors should book a discovery call at pilotaxis.com/contact (or click "Book a Call" on the site). All plans are custom-quoted based on call volume and complexity.

## Tone & Style
- Be concise, confident, and premium — match the brand's voice
- Never be salesy or pushy — be genuinely helpful
- Keep answers short unless they ask for detail
- Always guide toward booking a call for pricing or getting started
- If asked something you don't know, say so and suggest they book a call for a direct answer

Do not make up pricing numbers. All pricing is custom and revealed on the discovery call.`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(data);
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
