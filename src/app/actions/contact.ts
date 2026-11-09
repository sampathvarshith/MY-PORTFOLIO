"use server";

import { headers } from "next/headers";
import { contact } from "@/content/site";
import { composeEmail, readValues, validate, type EnquiryState } from "@/lib/enquiry";

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort per-instance throttle; serverless instances don't share memory.
const recent = new Map<string, number[]>();

function throttled(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > MAX_PER_WINDOW;
}

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const values = readValues(form);

  // Spam traps: hidden honeypot field (bots get a silent "success") and a minimum time-to-fill.
  const honeypot = String(form.get("website") ?? "");
  if (honeypot) return { status: "success" };
  const startedAt = Number(form.get("startedAt") ?? 0);
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", values, message: "That was very quick — please check your details and submit again." };
  }

  const errors = validate(values);
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (throttled(ip)) {
    return {
      status: "error",
      values,
      message: "Too many enquiries from this connection. Please try again later or send an email instead.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || contact.email;
  if (!apiKey || !from) {
    return {
      status: "not_configured",
      values,
      message: "Direct sending isn’t switched on yet. Your enquiry is ready — send it from your email app instead.",
    };
  }

  const { subject, body } = composeEmail(values);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: values.email, subject, text: body }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { status: "success" };
  } catch (err) {
    console.error("Enquiry delivery failed", err);
    return {
      status: "error",
      values,
      message: "Your enquiry couldn’t be sent right now. Please try again, or send it by email instead.",
    };
  }
}
