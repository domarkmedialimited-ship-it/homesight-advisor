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

const RECIPIENT = "sweethomesrealty10@gmail.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

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

        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const GOOGLE_MAIL_API_KEY = process.env.GOOGLE_MAIL_API_KEY;
        if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) {
          console.error("Missing email credentials");
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
          const subject = "New Property Request — SweetHomes Realty";
          const boundary = `bnd_${Date.now()}`;
          const rfc2822 = [
            `To: ${RECIPIENT}`,
            `Reply-To: ${d.email}`,
            `Subject: =?UTF-8?B?${Buffer.from(subject, "utf-8").toString("base64")}?=`,
            `MIME-Version: 1.0`,
            `Content-Type: multipart/alternative; boundary="${boundary}"`,
            ``,
            `--${boundary}`,
            `Content-Type: text/plain; charset="UTF-8"`,
            ``,
            text,
            `--${boundary}`,
            `Content-Type: text/html; charset="UTF-8"`,
            ``,
            html,
            `--${boundary}--`,
            ``,
          ].join("\r\n");

          const raw = Buffer.from(rfc2822, "utf-8")
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

          const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "X-Connection-Api-Key": GOOGLE_MAIL_API_KEY,
            },
            body: JSON.stringify({ raw }),
          });

          if (!res.ok) {
            const errBody = await res.text();
            console.error(`Gmail send failed [${res.status}]: ${errBody}`);
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