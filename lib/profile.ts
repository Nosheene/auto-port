export const profile = {
  name: "Nosheene Mohammad",
  role: "Développeur web fullstack",
  location: "Ozoir-la-Ferrière",
  region: "Île-de-France",
  english: "Anglais B2",
  email: "mohammadnosheene@gmail.com",
  phoneDisplay: "06 84 47 71 19",
  phoneHref: "tel:+33684477119",
  linkedin: "https://www.linkedin.com/in/nosheene-mohammad-498980160",
  linkedinLabel: "linkedin.com/in/nosheene-mohammad",
} as const;

export const practiceBadges = [
  {
    id: "istqb",
    testId: "badge-istqb",
    label: "Conception ISTQB",
  },
  {
    id: "playwright",
    testId: "badge-playwright",
    label: "Playwright",
  },
  {
    id: "cypress",
    testId: "badge-cypress",
    label: "Cypress",
  },
  {
    id: "postman",
    testId: "badge-postman",
    label: "Postman",
  },
  {
    id: "github-actions",
    testId: "badge-github-actions",
    label: "GitHub Actions",
  },
  {
    id: "rgaa",
    testId: "badge-rgaa",
    label: "RGAA",
  },
] as const;

export const experiences = [
  {
    period: "En cours",
    title: "Intégratrice e-learning",
    organization: "Formalearning",
    points: [
      "Intégration de modules dans Storyline 360 et Rise 360.",
      "Support client LMS, recette des parcours et résolution de bugs.",
    ],
  },
  {
    period: "2019 — 2023",
    title: "Conceptrice pédagogique digitale",
    organization: "Sonepar France Interservices",
    points: [
      "Conception et intégration e-learning (Storyline, LCMS Talentsoft, Rise 360), puis recette.",
      "Gestion du LMS Talentsoft et de LinkedIn Learning pour 5 600 collaborateurs.",
      "Reporting mensuel, annuel et spécifique, catalogue et communications de formation.",
    ],
  },
  {
    period: "2016 — 2019",
    title: "Formatrice et conceptrice pédagogique",
    organization: "AFPS, Le Panse Academy, Tuto's Me Pro",
    points: [
      "Note de cadrage et storyboard d'une formation multimodale « Formateur professionnel ».",
      "Animation de formations pour adultes et suivi tutoral.",
      "Gestion des plateformes Foromes et Chronos.",
    ],
  },
] as const;

export const trainings = [
  "Développeur web full stack — Studi, 2026",
  "Jeux, sound design, droits d'auteur, JavaScript — 2023-2025",
  "UX design — 2021",
  "Concepteur de contenus digitaux de formation — Evocime, 2019",
  "Titre de formateur professionnel pour adultes — AFPA, 2017",
] as const;
