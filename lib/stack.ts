import {
  Accessibility,
  Braces,
  Bug,
  Cable,
  ChartNoAxesColumn,
  ClipboardCheck,
  Container,
  Database,
  FileCode,
  GitBranch,
  MousePointerClick,
  Send,
  SquareStack,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type StackItem = {
  name: string;
  detail: string;
  icon: LucideIcon;
};

export type StackCategory = {
  id: "automation" | "cicd" | "test-management" | "api";
  testId: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: StackItem[];
};

export const stackCategories: StackCategory[] = [
  {
    id: "automation",
    testId: "stack-category-automation",
    title: "Automation",
    description: "Parcours critiques exercés dans le navigateur, de façon répétable.",
    icon: MousePointerClick,
    items: [
      {
        name: "Playwright",
        detail: "Suites E2E, traces, assertions sur data-testid.",
        icon: MousePointerClick,
      },
      {
        name: "Cypress",
        detail: "Parcours métier et stabilisation des tests flaky.",
        icon: SquareStack,
      },
      {
        name: "JavaScript",
        detail: "Fixtures, helpers et pages objects lisibles.",
        icon: FileCode,
      },
    ],
  },
  {
    id: "cicd",
    testId: "stack-category-cicd",
    title: "CI/CD",
    description: "La suite tourne à chaque push, pas seulement en local.",
    icon: Workflow,
    items: [
      {
        name: "GitHub Actions",
        detail: "Workflow Playwright sur main et les pull requests.",
        icon: Workflow,
      },
      {
        name: "Git",
        detail: "Historique propre, revue, branches courtes.",
        icon: GitBranch,
      },
      {
        name: "Docker",
        detail: "Environnements de recette reproductibles.",
        icon: Container,
      },
    ],
  },
  {
    id: "test-management",
    testId: "stack-category-test-management",
    title: "Gestion de test",
    description: "Du cas de test au rapport, sans perdre le fil des anomalies.",
    icon: ClipboardCheck,
    items: [
      {
        name: "Recette fonctionnelle",
        detail: "Campagnes, critères d'acceptation, go / no-go.",
        icon: ClipboardCheck,
      },
      {
        name: "Analyse d'anomalies",
        detail: "Sévérité, étapes, attendu / obtenu, retest.",
        icon: Bug,
      },
      {
        name: "Reporting",
        detail: "Durée, stabilité, couverture des parcours.",
        icon: ChartNoAxesColumn,
      },
      {
        name: "RGAA",
        detail: "Contrastes, clavier, noms accessibles, états.",
        icon: Accessibility,
      },
    ],
  },
  {
    id: "api",
    testId: "stack-category-api",
    title: "API",
    description: "Contrats, statuts HTTP et données, avant même l'interface.",
    icon: Cable,
    items: [
      {
        name: "Postman",
        detail: "Collections, environnements, contrôles de réponse.",
        icon: Send,
      },
      {
        name: "JSON & Fetch",
        detail: "Échanges front / back et formats de payload.",
        icon: Braces,
      },
      {
        name: "SQL",
        detail: "Vérifier la donnée persistée, pas seulement l'écran.",
        icon: Database,
      },
    ],
  },
];

export const adjacentTools = [
  "Figma",
  "Draw.io",
  "Articulate Storyline 360",
  "Rise 360",
  "LMS Talentsoft",
  "Cursor",
] as const;
