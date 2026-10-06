"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/lib/profile";

const links = [
  { href: "#stack", label: "Stack", testId: "nav-stack" },
  { href: "#parcours", label: "Parcours", testId: "nav-experience" },
  { href: "#projets", label: "Projets", testId: "nav-projects" },
  { href: "#contact", label: "Contact", testId: "nav-contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#hero"
          data-testid="nav-home"
          className="group flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary font-mono text-xs font-semibold text-primary-foreground">
            NM
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-medium">{profile.name}</span>
            <span className="block text-xs text-muted-foreground">{profile.role}</span>
          </span>
        </a>

        <nav
          id="nav-menu"
          data-testid="nav-main"
          aria-label="Sections"
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-0 top-16 z-30 flex-col gap-1 border-b border-border bg-background p-4 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={link.testId}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            data-testid="nav-menu-toggle"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border md:hidden"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
