/** Jeton documenté pour exercer le chemin d'erreur sans backend. */
export const NETWORK_ERROR_TOKEN = "ERREUR_RESEAU";

export const contactSubjects = [
  { value: "mission", label: "Mission QA / automatisation" },
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
  }

  return errors;
}

export function hasContactErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

export async function simulateContactSubmit(values: ContactValues): Promise<"success" | "error"> {
  await new Promise((resolve) => {
    setTimeout(resolve, 400);
  });

  if (values.message.includes(NETWORK_ERROR_TOKEN)) {
    return "error";
  }

  return "success";
}
