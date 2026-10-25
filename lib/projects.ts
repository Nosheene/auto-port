export type RoutesArtifact = {
  kind: "routes";
  note: string;
  routes: { method: string; path: string; detail: string }[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  sector: string;
  summary: string;
  context: string;
  approach: string;
  tools: string[];
  stackGroups?: {
    title: string;
    items: { name: string; detail?: string }[];
  }[];
  metrics: { value: string; label: string }[];
  artifact?: RoutesArtifact;
  repoUrl?: string;
  demoUrl?: string;
  demoCta?: {
    href: string;
    label: string;
  };
  sourceLabel?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  video?: {
    src: string;
    label: string;
  };
};

export const projects: Project[] = [
  {
    slug: "scrum-flow",
    index: "01",
    title: "Scrum Flow IA",
    sector: "Projet · Scrum et intelligence artificielle",
    summary: "Application pour accompagner un flux Scrum avec l’intelligence artificielle.",
    context:
      "Projet réalisé par Nosheene Mohammad. Scrum Flow IA relie la démarche Scrum et une aide par intelligence artificielle.",
    approach: "Il n’y a pas d’adresse publique. La démonstration se fait sur demande.",
    tools: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui et Radix UI",
      "Lucide",
      "Geist et Fraunces",
      "Zustand",
      "@hello-pangea/dnd",
      "Recharts",
      "Zod",
      "Sonner",
      "Node.js",
      "API compatible OpenAI",
      "Webhook Slack ou Discord",
      "Vitest",
      "Oxlint",
      "GitHub Actions",
    ],
    stackGroups: [
      {
        title: "Interface",
        items: [
          { name: "React 19" },
          { name: "TypeScript" },
          { name: "Vite" },
          { name: "Tailwind CSS" },
          { name: "shadcn/ui et Radix UI" },
          { name: "Lucide", detail: "pour les icônes" },
          { name: "Geist et Fraunces", detail: "pour les polices" },
        ],
      },
      {
        title: "Fonctionnement de l’application",
        items: [
          {
            name: "Zustand",
            detail: "pour l’état du tableau, enregistré dans le navigateur",
          },
          { name: "@hello-pangea/dnd", detail: "pour le glisser-déposer" },
          { name: "Recharts", detail: "pour le burndown" },
          { name: "Zod", detail: "pour contrôler les textes renvoyés par un modèle" },
          { name: "Sonner", detail: "pour les notifications à l’écran" },
        ],
      },
      {
        title: "Serveur léger, optionnel",
        items: [
          { name: "Node.js", detail: "branché dans Vite" },
          {
            name: "API compatible OpenAI",
            detail: "seulement si une clé est ajoutée",
          },
          {
            name: "Webhook Slack ou Discord",
            detail: "seulement si une adresse est ajoutée",
          },
        ],
      },
      {
        title: "Qualité",
        items: [
          { name: "Vitest", detail: "pour les tests" },
          { name: "Oxlint", detail: "pour le lint" },
          {
            name: "GitHub Actions",
            detail: "pour lancer tests, lint et build à chaque envoi",
          },
        ],
      },
    ],
    sourceLabel: "application",
    metrics: [
      { value: "Scrum", label: "flux de travail" },
      { value: "IA", label: "dans l’application" },
      { value: "Démo", label: "sur demande" },
    ],
    demoCta: {
      href: "#contact",
      label: "Démo sur demande : contactez-moi.",
    },
    video: {
      src: "/projects/scrum-flow-demo.mp4",
      label: "Démo de Scrum Flow IA : attribution, revue d’une story et rituels.",
    },
  },
  {
    slug: "releve",
    index: "02",
    title: "Relève",
    sector: "Projet · comptes rendus pour artisans",
    summary:
      "Comptes rendus avant/après pour artisans. Photos, signature du client et brouillon à partir des images.",
    context:
      "L’application prépare le compte rendu d’une intervention à partir des photos du chantier, de la signature du client et d’un brouillon issu des images.",
    approach: "Il n’y a pas d’adresse publique. La démonstration se fait sur demande.",
    tools: ["Next.js", "TypeScript"],
    sourceLabel: "application",
    metrics: [
      { value: "Photos", label: "avant et après" },
      { value: "Signature", label: "du client" },
      { value: "Brouillon", label: "à partir des images" },
    ],
    demoCta: {
      href: "#contact",
      label: "Démo sur demande : contactez-moi.",
    },
    image: {
      src: "/projects/releve.png",
      alt: "Page d’accueil de Relève : compte rendu d’intervention avec photos avant et après.",
      width: 1048,
      height: 760,
    },
  },
  {
    slug: "taskchef",
    index: "03",
    title: "TaskChef",
    sector: "Projet de formation · gestion de tâches",
    summary:
      "Application web pour créer, modifier, supprimer et suivre ses tâches, avec authentification et historique des actions.",
    context:
      "Projet réalisé par Nosheene Mohammad. Le front est une interface HTML, CSS et JavaScript. L’API REST est en Node.js et Express. Les comptes et les tâches sont dans MySQL, l’historique dans MongoDB.",
    approach:
      "Authentification JWT avec les rôles utilisateur et administrateur, CRUD des tâches, filtre par statut, et collection Postman pour tester l’API. L’environnement local se lance avec Docker Compose. Le front est en ligne sur Alwaysdata, l’API sur Render, MongoDB sur Atlas.",
    tools: ["JavaScript", "Node.js", "Express", "MySQL", "MongoDB", "Docker", "Postman"],
    metrics: [
      { value: "JWT", label: "authentification" },
      { value: "2", label: "bases de données" },
      { value: "REST", label: "API testée dans Postman" },
    ],
    repoUrl: "https://github.com/Nosheene/TaskChef",
    demoUrl: "https://taskchef.alwaysdata.net",
    image: {
      src: "/projects/taskchef.png",
      alt: "Tableau de bord de TaskChef : tâches, filtre par statut et historique.",
      width: 2560,
      height: 1386,
    },
    artifact: {
      kind: "routes",
      note: "Routes réelles du dépôt.",
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
    index: "04",
    title: "Restaurant",
    sector: "Projet · API Symfony",
    summary:
      "API REST pour gérer un restaurant et les comptes utilisateurs : création, lecture, modification et suppression.",
    context:
      "Les données sont des entités Doctrine : restaurant, utilisateur et photo. L’authentification se fait par jeton, documentée avec Swagger.",
    approach:
      "Contrôleurs Symfony pour l’inscription, la connexion et le profil. Collection Postman pour les routes, tests PHPUnit, et configuration de déploiement Upsun. Le code du dépôt est public.",
    tools: ["PHP", "Symfony", "MySQL", "Doctrine", "Postman", "PHPUnit"],
    metrics: [
      { value: "REST", label: "API Symfony" },
      { value: "Token", label: "authentification par jeton" },
      { value: "Swagger", label: "documentation OpenAPI" },
    ],
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
];
