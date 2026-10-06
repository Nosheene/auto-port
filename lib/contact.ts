export const contactSubjects = [
  { value: "mission", label: "Mission fullstack" },
  { value: "echange", label: "Échange technique" },
  { value: "autre", label: "Autre" },
] as const;

export type ContactSubject = (typeof contactSubjects)[number]["value"];

export type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactField = keyof ContactValues;

export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBJECTS = new Set<string>(contactSubjects.map((subject) => subject.value));

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = "Indiquez un nom d'au moins 2 caractères.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Indiquez une adresse e-mail valide.";
  }

  if (!SUBJECTS.has(values.subject)) {
    errors.subject = "Choisissez un sujet.";
  }

  if (message.length < 20) {
    errors.message = "Écrivez au moins 20 caractères pour que je puisse vous répondre utilement.";
  } else if (message.length > 4000) {
    errors.message = "Le message dépasse 4 000 caractères.";
  }

  return errors;
}

export function contactSubjectLabel(value: string): string {
  return contactSubjects.find((subject) => subject.value === value)?.label ?? value;
}

export function contactDraft(values: ContactValues, to: string) {
  const subject = `Portfolio — ${contactSubjectLabel(values.subject)} — ${values.name.trim()}`;
  const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
  return { to, subject, body };
}

export function buildContactMailto(values: ContactValues, to: string): string {
  const draft = contactDraft(values, to);
  const params = new URLSearchParams({ subject: draft.subject, body: draft.body });
  return `mailto:${draft.to}?${params.toString()}`;
}

export async function submitContact(values: ContactValues, company = ""): Promise<"success" | "error"> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...values, company }),
    });

    if (!response.ok) return "error";

    const data = (await response.json()) as { ok?: boolean };
    return data.ok ? "success" : "error";
  } catch {
    return "error";
  }
}

async function submitWithFormSubmit(values: ContactValues, to: string): Promise<"success" | "error"> {
  const draft = contactDraft(values, to);
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        _replyto: values.email.trim(),
        _subject: draft.subject,
        _captcha: "false",
        _template: "table",
        message: draft.body,
      }),
    });

    if (!response.ok) return "error";

    const data = (await response.json()) as { success?: string | boolean };
    return data.success === true || data.success === "true" ? "success" : "error";
  } catch {
    return "error";
  }
}

export async function deliverContact(
  values: ContactValues,
  to: string,
  company = "",
): Promise<"success" | "error"> {
  if (company.trim() !== "") return "success";

  if ((await submitContact(values, company)) === "success") return "success";

  return submitWithFormSubmit(values, to);
}

export function hasContactErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
