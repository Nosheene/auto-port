import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Parcours et projets de formation.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            data-testid="footer-email"
            className="underline decoration-border underline-offset-4 hover:text-foreground"
          >
            E-mail
          </a>
          <a
            href={profile.linkedin}
            data-testid="footer-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="#hero"
            data-testid="footer-top"
            className="underline decoration-border underline-offset-4 hover:text-foreground"
          >
            Haut de page
          </a>
        </div>
      </div>
    </footer>
  );
}
