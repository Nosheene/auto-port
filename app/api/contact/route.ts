import {
  contactSubjectLabel,
  hasContactErrors,
  validateContact,
  type ContactValues,
} from "@/lib/contact";
import { profile } from "@/lib/profile";

type ContactPayload = ContactValues & { company?: unknown };

function isContactPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    typeof record.subject === "string" &&
    typeof record.message === "string"
  );
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!isContactPayload(payload)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const values: ContactValues = {
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
  };
  const errors = validateContact(values);
  if (hasContactErrors(errors)) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: false, error: "missing-key" }, { status: 503 });
  }

  const name = oneLine(values.name);
  const email = values.email.trim();
  const subjectLabel = contactSubjectLabel(values.subject);
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [profile.email],
        reply_to: email,
        subject: `Portfolio — ${subjectLabel} — ${name}`,
        text: `${values.message.trim()}\n\n— ${name}\n${email}`,
      }),
    });

    if (!response.ok) {
      return Response.json({ ok: false }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
