## Goal
Wire the existing "Send Property Request" form to deliver submissions to `sweethomesrealty10@gmail.com` via a secure backend — no visual changes.

## Approach
1. **Enable Lovable Cloud** (required for any backend/email sending).
2. **Set up Lovable's built-in email infrastructure** with a sender domain so emails are sent securely server-side (not via mailto).
3. **Create a public server route** `/api/public/contact` that:
   - Accepts the form fields (validated with Zod).
   - Sends a formatted email to `sweethomesrealty10@gmail.com` with subject `New Property Request — SweetHomes Realty` and the exact body format requested.
   - Returns success/error JSON.
4. **Wire the existing form's submit handler** in `src/components/LandingPage.tsx` to POST to that route — keeping all current UI, validation, success state ("Thank you. SweetHomes Realty will contact you shortly.") and error state ("Something went wrong. Please try again or contact us directly on WhatsApp.") intact. No markup, copy, or styling changes.

## What stays untouched
Design, layout, fonts, colors, images, sections, button text, spacing, animations, responsiveness, all existing fields.

## One question before I build
Lovable's built-in email sender requires a verified sender domain (e.g. `notify@sweethomesrealty.com`). The recipient is your Gmail, but the *sender* needs to be a domain you own.

**Pick one:**
- **A. You own a domain** (e.g. sweethomesrealty.com) → I'll trigger the email-domain setup dialog so you can add DNS records. Most professional, best deliverability.
- **B. No domain yet** → I can integrate the **Gmail connector** instead, which sends from `sweethomesrealty10@gmail.com` to itself using your Google account (one-click OAuth, no DNS).
- **C. Use a third-party** like Resend (requires API key + domain).

Reply with **A**, **B**, or **C** and I'll implement.
