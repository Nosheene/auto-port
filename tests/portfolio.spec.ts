import { expect, test } from "@playwright/test";

test.describe("Portfolio QA Automation", () => {
  test("charge la page et les repères principaux", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Nosheene Mohammad/);
    await expect(page.getByTestId("hero")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("automatisation");
    await expect(page.getByTestId("nav-main")).toBeVisible();
    await expect(page.getByTestId("badge-istqb")).toBeVisible();
    await expect(page.getByTestId("badge-playwright")).toBeVisible();
    await expect(page.getByTestId("hero-suite")).toContainText("portfolio.spec.ts");
    await expect(page.getByTestId("project-card-taskchef")).toBeVisible();
    await expect(page.getByTestId("project-repo-taskchef")).toHaveAttribute(
      "href",
      "https://github.com/Nosheene/TaskChef",
    );
    await expect(page.getByTestId("project-demo-taskchef")).toHaveAttribute(
      "href",
      "https://taskchef.alwaysdata.net",
    );
    await expect(page.getByTestId("project-card-restaurant")).toBeVisible();
    await expect(page.getByTestId("project-repo-restaurant")).toHaveAttribute(
      "href",
      "https://github.com/Nosheene/Restaurant",
    );
    await expect(page.getByTestId("project-card-fintech-scaleup")).toHaveCount(0);
    await expect(page.getByTestId("contact-email-link")).toHaveAttribute(
      "href",
      "mailto:mohammadnosheene@gmail.com",
    );
    await expect(page.getByTestId("contact-phone-link")).toHaveAttribute("href", "tel:+33684477119");
    await expect(page.getByTestId("footer-phone")).toHaveAttribute("href", "tel:+33684477119");
  });

  test("bascule le thème sombre et clair", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toBeEnabled();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/\bdark\b/);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  test("affiche les deux projets de formation", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("project-card-taskchef")).toBeVisible();
    await expect(page.getByTestId("project-card-restaurant")).toBeVisible();
    await expect(page.getByTestId("project-artifact-taskchef")).toContainText("/tasks");
    await expect(page.getByTestId("project-artifact-restaurant")).toContainText("/api/restaurant");
    await expect(page.getByTestId("project-card-fintech-scaleup")).toHaveCount(0);
    await expect(page.getByTestId("project-card-ecommerce-saas")).toHaveCount(0);
    await expect(page.getByTestId("project-card-medtech-mobile")).toHaveCount(0);
  });

  test("signale les champs invalides du formulaire", async ({ page }) => {
    await page.goto("/#contact");

    await expect(page.getByTestId("contact-submit")).toBeEnabled();
    await page.getByTestId("contact-submit").click();

    await expect(page.getByTestId("contact-error")).toBeVisible();
    await expect(page.getByTestId("contact-name-error")).toBeVisible();
    await expect(page.getByTestId("contact-email-error")).toBeVisible();
    await expect(page.getByTestId("contact-subject-error")).toBeVisible();
    await expect(page.getByTestId("contact-message-error")).toBeVisible();
    await expect(page.getByTestId("contact-success")).toHaveCount(0);
  });

  test("envoie le formulaire de contact par e-mail", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      const body = route.request().postDataJSON() as {
        email?: string;
        message?: string;
        subject?: string;
      };
      expect(body.email).toBe("camille.martin@example.com");
      expect(body.subject).toBe("mission");
      expect(body.message).toContain("automatisation");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/");
    await page.getByTestId("nav-contact").click();

    await expect(page.getByTestId("contact-form")).toBeVisible();
    await expect(page.getByTestId("contact-call")).toHaveAttribute("href", "tel:+33684477119");
    await page.getByTestId("contact-name").fill("Camille Martin");
    await page.getByTestId("contact-email").fill("camille.martin@example.com");
    await page.getByTestId("contact-subject").selectOption("mission");
    await page.getByTestId("contact-message").fill(
      "Bonjour, je souhaite échanger sur une mission d'automatisation Playwright.",
    );
    await page.getByTestId("contact-submit").click();

    await expect(page.getByTestId("contact-success")).toBeVisible();
    await expect(page.getByTestId("contact-success")).toContainText("mohammadnosheene@gmail.com");
    await expect(page.getByTestId("contact-success")).toContainText("envoyé");
    await expect(page.getByTestId("contact-success-call")).toHaveAttribute("href", "tel:+33684477119");
    await expect(page.getByTestId("contact-form")).toBeHidden();

    await page.getByTestId("contact-reset").click();
    await expect(page.getByTestId("contact-form")).toBeVisible();
    await expect(page.getByTestId("contact-name")).toHaveValue("");
  });

  test("signale un échec d'envoi et garde le message", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false }),
      });
    });

    await page.goto("/");

    await page.getByTestId("contact-name").fill("Camille Martin");
    await page.getByTestId("contact-email").fill("camille.martin@example.com");
    await page.getByTestId("contact-subject").selectOption("echange");
    await page.getByTestId("contact-message").fill(
      "Bonjour, je souhaite échanger sur une mission d'automatisation Playwright.",
    );
    await page.getByTestId("contact-submit").click();

    await expect(page.getByTestId("contact-error")).toContainText("n'a pas abouti");
    await expect(page.getByTestId("contact-mailto-fallback")).toHaveAttribute(
      "href",
      /^mailto:mohammadnosheene@gmail.com\?/,
    );
    await expect(page.getByTestId("contact-success")).toHaveCount(0);
    await expect(page.getByTestId("contact-message")).toHaveValue(/automatisation/);
  });

  test("ouvre la navigation sur un écran étroit", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByTestId("nav-stack")).toBeHidden();
    await page.getByTestId("nav-menu-toggle").click();
    await expect(page.getByTestId("nav-stack")).toBeVisible();
    await page.getByTestId("nav-projects").click();
    await expect(page.getByTestId("projects")).toBeInViewport();
  });
});
