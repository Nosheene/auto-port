"use client";

import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSubjects,
  emptyContactValues,
  hasContactErrors,
  NETWORK_ERROR_TOKEN,
  simulateContactSubmit,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact";
import { profile } from "@/lib/profile";
import { useHydrated } from "@/lib/use-hydrated";

const controlClass =
  "h-11 rounded-lg border-border bg-background px-3 text-sm md:text-sm dark:bg-background";

export function Contact() {
  const formId = useId();
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const ready = useHydrated();

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    if (hasContactErrors(nextErrors)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const result = await simulateContactSubmit(values);
    setStatus(result === "success" ? "success" : "error");
  }

  function resetForm() {
    setValues(emptyContactValues);
    setErrors({});
    setStatus("idle");
  }

  const validationFailed = status === "error" && hasContactErrors(errors);
  const networkFailed = status === "error" && !hasContactErrors(errors);

  return (
    <section id="contact" data-testid="contact" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:px-8 md:py-24">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">Contact</p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight md:text-4xl">
            Un message court suffit pour démarrer.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Mission d&apos;automatisation, recette ou échange sur une suite de tests. Je réponds
            sous deux jours ouvrés.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>
              <a
                className="underline decoration-border underline-offset-4 hover:decoration-primary"
                href={`mailto:${profile.email}`}
                data-testid="contact-email-link"
              >
                {profile.email}
              </a>
            </li>
            <li>
              <a
                className="underline decoration-border underline-offset-4 hover:decoration-primary"
                href={profile.phoneHref}
                data-testid="contact-phone-link"
              >
                {profile.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="underline decoration-border underline-offset-4 hover:decoration-primary"
                href={profile.linkedin}
                data-testid="contact-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.linkedinLabel}
              </a>
            </li>
            <li className="text-muted-foreground">
              {profile.location}, {profile.region}
            </li>
          </ul>
        </div>

        {status === "success" ? (
          <div
            data-testid="contact-success"
            role="status"
            className="rounded-2xl border border-pass/40 bg-card p-6"
          >
            <p className="font-mono text-xs text-pass uppercase">Succès</p>
            <h3 className="mt-3 font-heading text-2xl">Message prêt.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              L&apos;envoi est simulé dans ce portfolio : aucun e-mail n&apos;est transmis. Le
              scénario existe pour que la suite Playwright puisse vérifier le succès.
            </p>
            <Button
              type="button"
              data-testid="contact-reset"
              variant="outline"
              className="mt-6 h-11 px-4"
              onClick={resetForm}
            >
              Écrire un autre message
            </Button>
          </div>
        ) : (
          <form
            data-testid="contact-form"
            data-hydrated={ready ? "true" : "false"}
            noValidate
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-5 md:p-6"
            aria-describedby={validationFailed || networkFailed ? "contact-status" : undefined}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor={`${formId}-name`}>Nom</Label>
                <Input
                  id={`${formId}-name`}
                  data-testid="contact-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={controlClass}
                  onChange={(event) => updateField("name", event.target.value)}
                />
                {errors.name ? (
                  <p id="contact-name-error" data-testid="contact-name-error" className="text-sm text-fail">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${formId}-email`}>E-mail</Label>
                <Input
                  id={`${formId}-email`}
                  data-testid="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={controlClass}
                  onChange={(event) => updateField("email", event.target.value)}
                />
                {errors.email ? (
                  <p id="contact-email-error" data-testid="contact-email-error" className="text-sm text-fail">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <Label htmlFor={`${formId}-subject`}>Sujet</Label>
              <select
                id={`${formId}-subject`}
                data-testid="contact-subject"
                name="subject"
                value={values.subject}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                onChange={(event) => updateField("subject", event.target.value)}
              >
                <option value="">Choisir un sujet</option>
                {contactSubjects.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
              {errors.subject ? (
                <p
                  id="contact-subject-error"
                  data-testid="contact-subject-error"
                  className="text-sm text-fail"
                >
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div className="mt-4 grid gap-2">
              <Label htmlFor={`${formId}-message`}>Message</Label>
              <Textarea
                id={`${formId}-message`}
                data-testid="contact-message"
                name="message"
                rows={6}
                value={values.message}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className="min-h-36 rounded-lg border-border bg-background px-3 py-3 text-sm md:text-sm dark:bg-background"
                onChange={(event) => updateField("message", event.target.value)}
              />
              {errors.message ? (
                <p
                  id="contact-message-error"
                  data-testid="contact-message-error"
                  className="text-sm text-fail"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            {validationFailed ? (
              <p id="contact-status" data-testid="contact-error" role="alert" className="mt-4 text-sm text-fail">
                Certains champs sont invalides. Corrigez-les avant d&apos;envoyer.
              </p>
            ) : null}

            {networkFailed ? (
              <p id="contact-status" data-testid="contact-error" role="alert" className="mt-4 text-sm text-fail">
                L&apos;envoi a échoué. Le message est resté dans le formulaire, vous pouvez
                réessayer. Le jeton {NETWORK_ERROR_TOKEN} sert uniquement à ce scénario de test.
              </p>
            ) : null}

            <Button
              type="submit"
              data-testid="contact-submit"
              className="mt-5 h-11 px-5"
              disabled={!ready || status === "submitting"}
              aria-busy={status === "submitting"}
            >
              {status === "submitting" ? "Envoi…" : "Envoyer le message"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
