"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useHydrated } from "@/lib/use-hydrated";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();
  const isDark = (mounted ? resolvedTheme : "dark") !== "light";

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      data-hydrated={mounted ? "true" : "false"}
      aria-pressed={isDark}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-2 text-sm text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-70"
    >
      <span
        className={`flex size-7 items-center justify-center rounded-full transition-colors ${
          isDark ? "bg-primary text-primary-foreground" : "text-muted-foreground"
        }`}
        aria-hidden
      >
        <Moon className="size-3.5" />
      </span>
      <span
        className={`flex size-7 items-center justify-center rounded-full transition-colors ${
          isDark ? "text-muted-foreground" : "bg-primary text-primary-foreground"
        }`}
        aria-hidden
      >
        <Sun className="size-3.5" />
      </span>
      <span className="sr-only">{isDark ? "Mode sombre actif" : "Mode clair actif"}</span>
    </button>
  );
}
