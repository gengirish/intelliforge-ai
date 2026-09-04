# IntelliForge AI — Business Setup Guide

## Individual Proprietorship Registration in Hyderabad, Telangana

This guide covers the step-by-step process to legally set up your AI agency as an Individual Proprietorship in India.

---

## 1. Individual Proprietorship — Overview

An Individual Proprietorship (Sole Proprietorship) is the simplest business structure in India:
- **No separate registration act** — it's recognized through other registrations (GST, Udyam, bank account)
- **Owner = Business** — you are personally liable for all business obligations
- **Easiest to start** — minimal compliance, lowest cost
- **Best for**: Solo founders, service businesses, freelancers, consultants

---

## 2. Step-by-Step Setup Checklist

### Step 1: Choose Your Business Name
- [x] Business Name: **IntelliForge AI**
- Ensure the name doesn't conflict with any registered trademarks
- Check on [IP India](https://ipindiaservices.gov.in/tmrpublicsearch/frmmain.aspx) for trademark availability
- Consider registering a trademark later (costs ~₹4,500 for individuals)

### Step 2: Virtual Office Address (Completed)
- [x] Virtual office booked via [myHQ](https://myhq.in/virtual-office/)
- This serves as your **registered business address** for:
  - GST registration
  - Bank account opening
  - Professional correspondence
- Ensure you have the **rent agreement** and **NOC (No Objection Certificate)** from myHQ

### Step 3: PAN Card
- [ ] Ensure your PAN card is active and linked to Aadhaar
- The proprietorship uses your **personal PAN** (no separate PAN needed)
- Verify PAN-Aadhaar linking at [incometax.gov.in](https://www.incometax.gov.in/)

### Step 4: Open a Current (Business) Bank Account
- [ ] Visit any bank with the following documents:
  - PAN Card
  - Aadhaar Card
  - Address proof (myHQ virtual office agreement)
  - Business name declaration / Udyam certificate
  - Passport-size photos
- **Recommended banks**: ICICI, HDFC, Kotak (good digital banking for proprietorships)
- Open the account in the name: **"IntelliForge AI — [Your Full Name]"**

### Step 5: Udyam Registration (MSME)
- [ ] Register at [udyamregistration.gov.in](https://udyamregistration.gov.in/)
- **Free of cost** — no fees
- Classify as: **Micro Enterprise** (investment < ₹1 crore, turnover < ₹5 crore)
- NIC Code for IT services: **62099** (Other information technology service activities)
- Benefits:
  - Priority sector lending from banks
  - Government tender eligibility
  - Various subsidies and schemes

### Step 6: GST Registration
- [ ] Register at [gst.gov.in](https://www.gst.gov.in/)
- **Mandatory** if annual turnover exceeds ₹20 lakh (for services)
- **Recommended** to register early — it adds credibility and allows B2B invoicing
- Documents needed:
  - PAN Card
  - Aadhaar Card
  - Bank account details (passbook / statement)
  - Virtual office rent agreement + NOC from myHQ
  - Passport-size photo
  - Digital signature (optional but recommended)
- GST rate for IT/AI consulting services: **18% CGST + SGST** (or IGST for interstate)
- Consider **Composition Scheme** if turnover < ₹50 lakh (flat 6% for services)

### Step 7: Professional Tax Registration (Telangana)
- [ ] Register at [professionaltax.telangana.gov.in](https://professionaltax.telangana.gov.in/)
- **Mandatory** for professionals and businesses in Telangana
- Annual tax: ₹2,500 for proprietors
- Payable annually or half-yearly

### Step 8: Shop & Establishment Act Registration
- [ ] Register under Telangana Shops & Establishments Act
- Apply at [labour.telangana.gov.in](https://labour.telangana.gov.in/)
- Required for any business operating in Telangana
- Nominal fees (₹200–500)

---

## 3. Domain & Digital Presence

### Domain Name
- [x] Registered **intelliforge.tech** via GoDaddy
- `.tech` domains typically cost ₹150–400/year (first year), ~₹3,500/year renewal

### Business Email
- [ ] Set up **contact@intelliforge.tech** using:
  - [Google Workspace](https://workspace.google.com/) (₹136/user/month)
  - [Zoho Mail](https://www.zoho.com/mail/) (free for 1 user)

### Website Deployment
- [ ] Deploy on [Vercel](https://vercel.com) (free tier)
- Connect custom domain
- Enable SSL (automatic with Vercel)

### Booking / Strategy Call Scheduler
Every "Book Free Strategy Call" CTA on the site reads `NEXT_PUBLIC_CALENDLY_URL`. While it is unset the CTAs fall back to the contact form — usable, but no self-serve booking.

- [ ] Create a free [Calendly](https://calendly.com) account (API access works on the Free plan; a new account already ships with a **30 Minute Meeting** event type)
- [ ] Rename that event to something like *Free AI Strategy Call* and set your availability
- [ ] Generate a personal access token: Calendly → **Integrations → API & Webhooks**
- [ ] Add `CALENDLY_API_TOKEN=<token>` to `.env.local` (gitignored — never commit it)
- [ ] Run `npm run sync:calendly` to list your event types, then `npm run sync:calendly -- --write` to write `NEXT_PUBLIC_CALENDLY_URL` into `.env.local`
- [ ] Add the same `NEXT_PUBLIC_CALENDLY_URL` in the Vercel dashboard for **Production, Preview and Development**
- [ ] **Redeploy** — `NEXT_PUBLIC_*` values are inlined at build time, so a dashboard change alone will not reach the live site
- [ ] Verify on `https://www.intelliforge.tech/contact` that the card opens Calendly in a new tab

Free-plan limits worth knowing: one active event type, Calendly branding stays, no round-robin/team routing. Webhook subscriptions (`POST /webhook_subscriptions`) work fine on Free via a personal access token — verified 2026-09-04 by creating a live subscription and having it fire on a real booking; an earlier note here claiming webhooks require a paid plan was wrong. [Cal.com](https://cal.com) is a drop-in alternative if Free's other limits bite — the same env var accepts any `https://` scheduling link.

### Voice Confirmation Calls (Calendly Webhook → OmniDimension)
`app/api/calendly-webhook/route.ts` + `lib/omnidimension.ts` receive Calendly's `invitee.created` event and trigger an outbound OmniDimension call (agent id in `OMNIDIM_CONFIRMATION_AGENT_ID`) confirming the booking.

**✅ Live as of 2026-09-04.** A previous note here claimed this was blocked on Calendly's Free plan requiring a Standard-tier upgrade (~$120/year) — that was checked in error. Webhook subscriptions work on Free via a personal access token; the live subscription was created and verified firing on a real booking the same day.

- [x] Commit and merge `app/api/calendly-webhook/route.ts` + `lib/omnidimension.ts` so the route ships to production
- [x] Add `CALENDLY_WEBHOOK_SIGNING_KEY`, `OMNIDIM_API_KEY`, `OMNIDIM_CONFIRMATION_AGENT_ID` to the Vercel project's Production/Preview/Development env vars, redeployed
- [x] Verify the route is live: `POST https://www.intelliforge.tech/api/calendly-webhook` returns `401 Invalid signature` on an unsigned request, not 404/500
- [x] Test the OmniDimension leg independently — dispatched a real call, confirmed via `GET /calls/logs`
- [x] Create the live subscription via `POST https://api.calendly.com/webhook_subscriptions` — active, `GET /webhook_subscriptions` confirms it (uri ends `d636faf6-b951-40f1-926d-9985dd43780c`)
- [x] Confirmed firing on a real booking — call transcript captured name, date/time, matched the agent's own guardrails (correctly refused an in-call reschedule request, redirected to the Calendly link)
- [x] Phone number source fixed 2026-09-04: a custom **"Phone Number" invitee question** (Event Types → AI Strategy Call → Invitee Questions), not Calendly's SMS-reminders opt-in — that field is gated behind Calendly's Teams plan and doesn't appear on Free/Essentials/Professional at all, which is why the original best-effort approach silently never worked in testing
- [ ] **Still needed:** mark that Phone Number question **required** on the event type — right now it's opt-in, so bookings without an answer silently skip the confirmation call. Dashboard-only, the Calendly API can't set this.

---

## 4. Financial & Tax Setup

### Accounting
- [ ] Set up accounting software:
  - [Zoho Books](https://www.zoho.com/books/) — good for Indian businesses, GST compliant
  - [ClearTax](https://cleartax.in/) — for GST filing
- Maintain proper books of accounts (mandatory under Income Tax Act)

### Tax Obligations
| Tax | Frequency | Due Date |
|-----|-----------|----------|
| GST Returns (GSTR-1, GSTR-3B) | Monthly/Quarterly | 11th/13th of following month |
| Income Tax (ITR-3 or ITR-4) | Annual | July 31 |
| Professional Tax | Annual | March 31 |
| Advance Tax | Quarterly | Jun 15, Sep 15, Dec 15, Mar 15 |
| TDS (if applicable) | Monthly | 7th of following month |

### Invoice Format
- [ ] Create GST-compliant invoices with:
  - Your GSTIN
  - SAC code: **998314** (Management consulting and management services including AI consulting)
  - HSN/SAC description
  - CGST/SGST or IGST breakup

---

## 5. Legal & Compliance

### Contracts & Agreements
- [ ] Prepare standard client service agreements covering:
  - Scope of work
  - Payment terms (milestone-based recommended)
  - IP ownership
  - Confidentiality / NDA
  - Limitation of liability
  - AI-specific disclaimers (model accuracy, data handling)

### Data Protection
- [ ] Follow Digital Personal Data Protection Act (DPDPA) 2023 guidelines
- Implement data handling policies
- Include privacy policy on website
- Get client consent for data processing

### Insurance (Recommended)
- [ ] Consider Professional Indemnity Insurance
- Covers errors, omissions, and professional negligence claims
- Cost: ₹5,000–15,000/year for ₹10–25 lakh coverage

---

## 6. Bharat AI Mission Alignment

### How to Get Involved
- [ ] Visit [bharataimission.org](https://bharataimission.org/) and join as an Industry/Startup partner
- [ ] Register on the [IndiaAI portal](https://indiaai.gov.in/)
- [ ] Explore [AIKosh](https://aikosh.indiaai.gov.in/) for datasets and AI models (7,500+ datasets, 273 AI models)
- [ ] Access affordable GPU compute at ₹65/hour through IndiaAI Mission's 38,000+ GPUs

### Government Schemes to Explore
- **IndiaAI Innovation Centre** — collaborate on AI research
- **IndiaAI FutureSkills** — participate as a training partner
- **Startup India** — register for benefits at [startupindia.gov.in](https://www.startupindia.gov.in/)
- **T-Hub Hyderabad** — join Telangana's startup ecosystem

---

## 7. Estimated Initial Costs

| Item | Cost (Approx.) |
|------|----------------|
| Virtual Office (myHQ) | ₹5,000–10,000/month |
| Domain (.tech) | ₹150–3,500/year |
| Google Workspace Email | ₹1,632/year |
| GST Registration | Free (or ₹500 via CA) |
| Udyam Registration | Free |
| Professional Tax | ₹2,500/year |
| Shop & Establishment | ₹200–500 |
| Accounting Software | ₹3,000–5,000/year |
| Professional Indemnity Insurance | ₹5,000–15,000/year |
| **Total First Year** | **~₹30,000–50,000** |

---

## 8. Quick Start — Priority Order

1. **PAN-Aadhaar linking** (if not done)
2. **Udyam Registration** (free, instant, online)
3. **Open Current Bank Account** (with Udyam certificate + myHQ docs)
4. **GST Registration** (using bank account details)
5. **Professional Tax Registration**
6. **Domain + Email setup**
7. **Deploy website on Vercel**
8. **Connect the Calendly booking link** (see §3 — until then the strategy-call CTAs only reach the contact form)
9. **Start invoicing clients**

---

*This guide is for informational purposes. Consult a Chartered Accountant (CA) for specific tax and compliance advice tailored to your situation.*
