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

  const name = values.name.trim();
  const email = values.email.trim();
  const subjectLabel = contactSubjectLabel(values.subject);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        _subject: `Portfolio — ${subjectLabel} — ${name}`,
        sujet: subjectLabel,
        message: values.message.trim(),
        _captcha: "false",
        _template: "table",
      }),
    });

    const data = (await response.json()) as { success?: string | boolean };
    const accepted = data.success === true || data.success === "true";
    if (!response.ok || !accepted) {
      return Response.json({ ok: false }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
