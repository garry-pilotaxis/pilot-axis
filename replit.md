# Pilot Axis

Premium, ultra-minimalist marketing website for Pilot Axis — an AI automation and voice agent company serving appointment-based businesses.

## Architecture

- **Frontend**: React + Tailwind CSS v4 + Wouter routing + TanStack Query
- **Backend**: Express.js with API routes
- **Database**: PostgreSQL via Drizzle ORM
- **Styling**: Black/white only, Space Grotesk headings + Inter body, sharp corners (0 radius)

## Pages

| Route | Page |
|-------|------|
| `/` | Home (hero, problem, solutions, use cases, proof, process, pricing, FAQ, CTA) |
| `/solutions` | Solutions (voice agent, scheduling, CRM, automation, reporting) |
| `/use-cases` | Use Cases (daycare, dental, clinic, salon, home services) |
| `/process` | Process (discovery, build, test, launch, optimize) |
| `/pricing` | Pricing (starter, growth, premium tiers) |
| `/about` | About (principles, story) |
| `/contact` | Contact (form + calendar booking) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form / booking request |

## Database Schema

### contact_submissions
- `id` (serial, PK)
- `name` (text, required)
- `business` (text, optional)
- `email` (text, required)
- `phone` (text, optional)
- `message` (text, required)
- `preferred_date` (text, optional)
- `created_at` (timestamp, auto)

## Key Files

- `shared/schema.ts` — Drizzle schema + Zod validation
- `server/routes.ts` — Express API routes
- `server/storage.ts` — Database storage layer
- `client/src/App.tsx` — Router + layout
- `client/src/components/layout/` — Navbar, Footer
- `client/src/pages/` — All page components
