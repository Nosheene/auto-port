export const projectFilters = [
  { id: "all", label: "Tout", testId: "filter-all" },
  { id: "playwright", label: "Playwright", testId: "filter-playwright" },
  { id: "cypress", label: "Cypress", testId: "filter-cypress" },
  { id: "api", label: "API", testId: "filter-api" },
  { id: "cicd", label: "CI/CD", testId: "filter-cicd" },
] as const;

export type ProjectFilter = (typeof projectFilters)[number]["id"];

export type RunArtifact = {
  kind: "run";
  suite: string;
  browser: string;
  passed: number;
  failed: number;
  skipped: number;
  duration: string;
  cases: { name: string; status: "passed" | "failed" | "skipped"; time: string }[];
};

export type BugArtifact = {
  kind: "bug";
  id: string;
  severity: string;
  title: string;
  environment: string;
  steps: string[];
  expected: string;
  actual: string;
  status: string;
};

export type CoverageArtifact = {
  kind: "coverage";
  release: string;
  headline: string;
  areas: { name: string; value: number }[];
  note: string;
};

export type RoutesArtifact = {
  kind: "routes";
  note: string;
  routes: { method: string; path: string; detail: string }[];
};

export type ProjectArtifact = RunArtifact | BugArtifact | CoverageArtifact | RoutesArtifact;

export type Project = {
  slug: string;
  index: string;
  title: string;
  sector: string;
  summary: string;
  context: string;
  approach: string;
  tools: string[];
  filters: Exclude<ProjectFilter, "all">[];
  metrics: { value: string; label: string }[];
  artifact: ProjectArtifact;
  fictional: boolean;
  repoUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "taskchef",
    index: "01",
    title: "TaskChef",
    sector: "Projet de formation · gestion de tâches",
    summary:
      "Application web pour créer, modifier, supprimer et suivre ses tâches, avec authentification et historique des actions.",
    context:
      "Projet réalisé par Nosheene Mohammad. Le front est une interface HTML, CSS et JavaScript. L’API REST est en Node.js et Express. Les comptes et les tâches sont dans MySQL, l’historique dans MongoDB.",
    approach:
      "Authentification JWT avec les rôles utilisateur et administrateur, CRUD des tâches, filtre par statut, et collection Postman pour tester l’API. L’environnement local se lance avec Docker Compose. Le front est en ligne sur Alwaysdata, l’API sur Render, MongoDB sur Atlas.",
    tools: ["JavaScript", "Node.js", "Express", "MySQL", "MongoDB", "Docker", "Postman"],
    filters: ["api"],
    metrics: [
      { value: "JWT", label: "authentification" },
      { value: "2", label: "bases de données" },
      { value: "REST", label: "API testée dans Postman" },
    ],
    fictional: false,
    repoUrl: "https://github.com/Nosheene/TaskChef",
    demoUrl: "https://taskchef.alwaysdata.net",
    artifact: {
      kind: "routes",
      note: "Routes réelles du dépôt, pas un jeu de données fictif.",
      routes: [
        { method: "POST", path: "/auth/login", detail: "Connexion, jeton JWT" },
        { method: "GET", path: "/tasks", detail: "Liste des tâches" },
        { method: "POST", path: "/tasks", detail: "Création d’une tâche" },
        { method: "GET", path: "/activity-logs", detail: "Historique MongoDB" },
      ],
    },
  },
  {
    slug: "restaurant",
    index: "02",
    title: "Restaurant",
    sector: "Projet de formation · API Symfony",
    summary:
      "API REST pour gérer un restaurant et les comptes utilisateurs : création, lecture, modification et suppression.",
    context:
      "Fil rouge de la formation Développeur backend Studi. Les données sont des entités Doctrine : restaurant, utilisateur et photo. L’authentification se fait par jeton, documentée avec Swagger.",
    approach:
      "Contrôleurs Symfony pour l’inscription, la connexion et le profil. Collection Postman pour les routes, tests PHPUnit, et configuration de déploiement Upsun. Le code du dépôt est public.",
    tools: ["PHP", "Symfony", "MySQL", "Doctrine", "Postman", "PHPUnit"],
    filters: ["api"],
    metrics: [
      { value: "REST", label: "API Symfony" },
      { value: "Token", label: "authentification par jeton" },
      { value: "Swagger", label: "documentation OpenAPI" },
    ],
    fictional: false,
    repoUrl: "https://github.com/Nosheene/Restaurant",
    artifact: {
      kind: "routes",
      note: "Routes présentes dans le dépôt. L’adresse de production Upsun répond actuellement en erreur 502.",
      routes: [
        { method: "POST", path: "/api/registration", detail: "Inscription" },
        { method: "POST", path: "/api/login", detail: "Connexion, jeton d’API" },
        { method: "GET", path: "/api/account/me", detail: "Profil authentifié" },
        { method: "POST", path: "/api/restaurant", detail: "Créer un restaurant" },
      ],
    },
  },
  {
    slug: "fintech-scaleup",
    fictional: true,
    index: "01",
    title: "Scale-up FinTech",
    sector: "Souscription de crédit",
    summary:
      "Une campagne manuelle de six heures bloquait chaque mise en production du parcours de financement.",
    context:
      "Parcours de demande de crédit en plusieurs étapes, trois environnements, pièces justificatives et décision de scoring. Les régressions n'apparaissaient qu'en fin de sprint.",
    approach:
      "Modélisation des cas par partitions et valeurs limites, puis automatisation du parcours nominal, des rejets et des pièces expirées. La suite Playwright est déclenchée sur chaque pull request, avec une collection Postman sur l'API de décision.",
    tools: ["Playwright", "Postman", "GitHub Actions"],
    filters: ["playwright", "api", "cicd"],
    metrics: [
      { value: "-50 %", label: "temps d'exécution" },
      { value: "118", label: "scénarios automatisés" },
      { value: "12 min", label: "pipeline CI" },
    ],
    artifact: {
      kind: "run",
      suite: "souscription.credit.spec.ts",
      browser: "chromium",
      passed: 118,
      failed: 2,
      skipped: 4,
      duration: "11 min 40 s",
      cases: [
        { name: "souscription nominale", status: "passed", time: "18,4 s" },
        { name: "rejet de scoring", status: "passed", time: "9,1 s" },
        { name: "pièce justificative expirée", status: "failed", time: "12,6 s" },
        { name: "virement SEPA différé", status: "skipped", time: "—" },
      ],
    },
  },
  {
    slug: "ecommerce-saas",
    fictional: true,
    index: "02",
    title: "Plateforme e-commerce SaaS",
    sector: "Tunnel d'achat",
    summary:
      "Le tunnel de paiement passait en recette manuelle, et les tests d'interface tombaient sans raison claire.",
    context:
      "Catalogue, panier et paiement 3-D Secure sur quatre navigateurs. Les échecs intermittents masquaient les vrais défauts de commande.",
    approach:
      "Isolation des attentes réseau, données de test dédiées et retrait des attentes fixes. Chaque anomalie corrigée devient un cas Cypress rejoué dans la CI avant la mise en ligne.",
    tools: ["Cypress", "GitHub Actions"],
    filters: ["cypress", "cicd"],
    metrics: [
      { value: "95 %", label: "stabilité de la suite" },
      { value: "-40 %", label: "anomalies en production" },
      { value: "4", label: "navigateurs couverts" },
    ],
    artifact: {
      kind: "bug",
      id: "BUG-1842",
      severity: "Majeur",
      title: "Paiement refusé après une autorisation 3-D Secure valide",
      environment: "Safari 17 · largeur 1440 · préproduction",
      steps: [
        "Ajouter un article au panier et choisir la livraison standard.",
        "Payer avec une carte de test dont l'authentification 3-D Secure réussit.",
        "Revenir sur la confirmation de commande.",
      ],
      expected: "La commande passe au statut payée et le stock est décrémenté.",
      actual: "L'écran affiche un refus, alors que l'API paiement renvoie 200.",
      status: "Corrigé · cas ajouté à la suite Cypress",
    },
  },
  {
    slug: "medtech-mobile",
    fictional: true,
    index: "03",
    title: "App mobile MedTech",
    sector: "Suivi patient",
    summary:
      "Les parcours de prise de rendez-vous et de consentement ne pouvaient pas régresser entre deux releases.",
    context:
      "Application de suivi, utilisée en mobilité, avec synchronisation de dossier et mode dégradé. La criticité impose de connaître la couverture des parcours, pas seulement le nombre de tests.",
    approach:
      "Parcours critiques exercés avec Playwright sur le viewport mobile, contrats d'API vérifiés dans Postman, et seuil de couverture affiché dans le rapport de release.",
    tools: ["Playwright", "Postman"],
    filters: ["playwright", "api"],
    metrics: [
      { value: "95 %", label: "parcours critiques" },
      { value: "0", label: "incident bloquant / 3 releases" },
      { value: "91 %", label: "contrats d'API" },
    ],
    artifact: {
      kind: "coverage",
      release: "Release 3.4 · rapport de campagne",
      headline: "95 %",
      areas: [
        { name: "Prise de rendez-vous", value: 98 },
        { name: "Consentement", value: 96 },
        { name: "Synchronisation du dossier", value: 91 },
        { name: "Mode hors-ligne", value: 88 },
      ],
      note: "Seuil de mise en production : 90 % sur les parcours critiques.",
    },
  },
];

export function filterProjects(filter: ProjectFilter): Project[] {
  if (filter === "all") return projects;
  return projects.filter((project) => project.filters.includes(filter));
}
