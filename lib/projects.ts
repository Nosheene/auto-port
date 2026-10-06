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
  metrics: { value: string; label: string }[];
  artifact: RoutesArtifact;
  repoUrl: string;
  demoUrl?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
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
    index: "02",
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
