# Portfolio — Nosheene Mohammad, développeur web fullstack

Vitrine d'une pratique d'automatisation des tests : un site Next.js couvert par sa propre suite Playwright, avec des sélecteurs stables et une exécution dans GitHub Actions.

Le parcours professionnel affiché est réel (intégration e-learning, recette, LMS). Les projets TaskChef et Restaurant viennent des dépôts publics de formation. Le badge « Conception ISTQB » désigne des techniques de conception de cas (partitions d'équivalence, valeurs limites, transitions d'état), pas un certificat nominatif.

## Stack

- Next.js (App Router) et React
- TypeScript
- Tailwind CSS et shadcn/ui
- Lucide React
- Playwright
- GitHub Actions

## Pourquoi des `data-testid`

Les tests de bout en bout ne doivent pas casser parce qu'un libellé a été reformulé ou qu'une classe CSS a changé. Chaque élément interactif expose un `data-testid` unique, stable et sémantique :

| Zone | Exemples |
| --- | --- |
| Navigation | `nav-home`, `nav-stack`, `nav-projects`, `nav-contact`, `nav-menu-toggle` |
| Actions | `cta-projects`, `cta-contact`, `cta-linkedin`, `theme-toggle` |
| Projets | `project-card-taskchef`, `project-repo-taskchef`, `project-card-restaurant` |
| Contact | `contact-name`, `contact-email`, `contact-subject`, `contact-message`, `contact-submit` |
| Retours | `contact-success`, `contact-error`, `contact-name-error` |

Le formulaire envoie un vrai e-mail à mohammadnosheene@gmail.com. `POST /api/contact` valide les champs, puis [Resend](https://resend.com) dépose le message dans cette boîte. L'adresse de la personne est en réponse, pour pouvoir lui écrire directement. Le téléphone reste un lien `tel:` (`06 84 47 71 19`).

La clé `RESEND_API_KEY` est lue côté serveur. En local, placez-la dans `.env.local`. Sur Vercel : **Settings → Environment Variables**, puis **Redeploy**. Le compte Resend doit être créé avec mohammadnosheene@gmail.com. Tant que le domaine n'est pas vérifié, l'expéditeur par défaut est `Portfolio <onboarding@resend.dev>`, qui n'écrit qu'à l'adresse du compte. `RESEND_FROM` permet de le remplacer après vérification d'un domaine.

## Arborescence

```text
app/                  pages et layout (App Router)
components/           Hero, Stack, Projects, Contact, ThemeToggle
components/projects/  rapports de test et d'anomalie
lib/                  données, validation du formulaire
tests/                suite Playwright
.github/workflows/    exécution CI
```

## Lancer le site en local

Prérequis : Node.js 22.

```bash
npm install
npm run dev
```

Le site est servi sur [http://127.0.0.1:43123](http://127.0.0.1:43123). Le mode sombre est le thème par défaut.

Pour vérifier la qualité du code :

```bash
npm run lint
npm run build
```

## Exécuter Playwright

Chromium est installé une fois :

```bash
npx playwright install chromium
npm run test:e2e
```

La commande démarre le site si besoin, puis joue `tests/portfolio.spec.ts` : chargement, bascule de thème, projets réels, validation du formulaire, envoi et échec. Les tests interceptent `/api/contact` pour ne pas envoyer de vrai e-mail.

Le rapport HTML est généré dans `playwright-report/`.

```bash
npx playwright show-report
```

## Intégration continue

`.github/workflows/playwright.yml` lance la suite à chaque `push` et `pull_request` vers `main` : installation, build de production, tests Playwright, archive du rapport.

## Contact

Nosheene Mohammad — Ozoir-la-Ferrière  
[mohammadnosheene@gmail.com](mailto:mohammadnosheene@gmail.com)  
[06 84 47 71 19](tel:+33684477119)  
[LinkedIn](https://www.linkedin.com/in/nosheene-mohammad-498980160)
