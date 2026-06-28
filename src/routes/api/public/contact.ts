import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(255),
  location: z.string().trim().max(200).optional().default(""),
  budget: z.string().trim().max(200).optional().default(""),
  purpose: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
});

const DEFAULT_RECIPIENT = "sweethomesrealty10@gmail.com";
const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = ContactSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        const d = parsed.data;

        const resendApiKey = process.env.RESEND_API_KEY;
        const resendFrom = process.env.RESEND_FROM;
        const recipient = process.env.CONTACT_RECIPIENT || DEFAULT_RECIPIENT;

        if (!resendApiKey || !resendFrom) {
          console.error("Missing Resend credentials");
          return Response.json({ error: "Email service unavailable" }, { status: 500 });
        }

        const text =
          `New Property Request\n\n` +
          `Full Name: ${d.name}\n` +
          `Phone Number: ${d.phone}\n` +
          `Email Address: ${d.email}\n` +
          `Preferred Location: ${d.location}\n` +
          `Budget Range: ${d.budget}\n` +
          `Buying Purpose: ${d.purpose}\n` +
          `Message: ${d.message}\n`;

        const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.6">
  <h2 style="margin:0 0 16px">New Property Request</h2>
  <p><strong>Full Name:</strong> ${escapeHtml(d.name)}</p>
  <p><strong>Phone Number:</strong> ${escapeHtml(d.phone)}</p>
  <p><strong>Email Address:</strong> ${escapeHtml(d.email)}</p>
  <p><strong>Preferred Location:</strong> ${escapeHtml(d.location)}</p>
  <p><strong>Budget Range:</strong> ${escapeHtml(d.budget)}</p>
  <p><strong>Buying Purpose:</strong> ${escapeHtml(d.purpose)}</p>
  <p><strong>Message:</strong><br/>${escapeHtml(d.message).replace(/\n/g, "<br/>")}</p>
</div>`;

        try {
          const res = await fetch(RESEND_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: resendFrom,
              to: [recipient],
              reply_to: d.email,
              subject: "New Property Request - SweetHomes Realty",
              text,
              html,
            }),
          });

          if (!res.ok) {
            const errBody = await res.text();
            console.error(`Resend email failed [${res.status}]: ${errBody}`);
            return Response.json({ error: "Failed to send email" }, { status: 502 });
          }

          return Response.json({ success: true });
        } catch (err) {
          console.error("Email send error:", err);
          return Response.json({ error: "Failed to send email" }, { status: 500 });
        }
      },
    },
  },
});
