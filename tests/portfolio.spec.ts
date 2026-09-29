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
    await expect(page.getByTestId("project-card-fintech-scaleup")).toBeVisible();
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

  test("filtre les études de cas", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("filter-cypress").click();
    await expect(page.getByTestId("project-card-ecommerce-saas")).toBeVisible();
    await expect(page.getByTestId("project-card-fintech-scaleup")).toBeHidden();
    await expect(page.getByTestId("project-card-medtech-mobile")).toBeHidden();
    await expect(page.getByTestId("project-artifact-ecommerce-saas")).toContainText("BUG-1842");

    await page.getByTestId("filter-all").click();
    await expect(page.getByTestId("project-card-fintech-scaleup")).toBeVisible();
    await expect(page.getByTestId("project-card-fintech-scaleup")).toContainText("-50 %");
    await expect(page.getByTestId("project-artifact-medtech-mobile")).toContainText("95 %");
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

  test("soumet le formulaire de contact", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("nav-contact").click();

    await expect(page.getByTestId("contact-form")).toBeVisible();
    await page.getByTestId("contact-name").fill("Camille Martin");
    await page.getByTestId("contact-email").fill("camille.martin@example.com");
    await page.getByTestId("contact-subject").selectOption("mission");
    await page.getByTestId("contact-message").fill(
      "Bonjour, je souhaite échanger sur une mission d'automatisation Playwright.",
    );
    await page.getByTestId("contact-submit").click();

    await expect(page.getByTestId("contact-success")).toBeVisible();
    await expect(page.getByTestId("contact-success")).toContainText("simulé");
    await expect(page.getByTestId("contact-form")).toBeHidden();

    await page.getByTestId("contact-reset").click();
    await expect(page.getByTestId("contact-form")).toBeVisible();
    await expect(page.getByTestId("contact-name")).toHaveValue("");
  });

  test("couvre l'échec d'envoi simulé", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("contact-name").fill("Camille Martin");
    await page.getByTestId("contact-email").fill("camille.martin@example.com");
    await page.getByTestId("contact-subject").selectOption("echange");
    await page.getByTestId("contact-message").fill(
      "Message de test avec le jeton ERREUR_RESEAU pour le scénario d'échec.",
    );
    await page.getByTestId("contact-submit").click();

    await expect(page.getByTestId("contact-error")).toContainText("échoué");
    await expect(page.getByTestId("contact-success")).toHaveCount(0);
    await expect(page.getByTestId("contact-message")).toHaveValue(/ERREUR_RESEAU/);
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
