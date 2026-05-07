# Arena Vilnius Suites — Base44 Project

Premium hospitality portal for Arena Vilnius — featuring VIP suites, upcoming events, and a sales inquiry system.

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend / DB:** Base44 (entities, auth, integrations)
- **Fonts:** Nunito (headings), Inter (body) via Google Fonts
- **Icons:** Lucide React
- **Routing:** React Router v6

---

## Project Structure

```
src/
├── pages/              # Route-level page components
│   ├── Home.jsx
│   ├── Suites.jsx
│   ├── SuiteDetail.jsx
│   ├── Events.jsx
│   └── Contact.jsx
├── components/
│   ├── home/           # Homepage sections (Hero, Events, Suites, CTA…)
│   ├── layout/         # Navbar, Footer, PageLayout
│   ├── suites/         # SuiteCard
│   └── ui/             # shadcn/ui primitives + custom SectionHeading
├── lib/
│   ├── images.js       # Centralised image URL map
│   ├── mockData.js     # Static fallback data
│   ├── AuthContext.jsx
│   ├── query-client.js
│   └── utils.js
├── api/
│   └── base44Client.js # Pre-initialised Base44 SDK client
├── App.jsx             # Router + auth wrapper
├── main.jsx            # React entry point
├── index.css           # Tailwind + design tokens (CSS variables)
└── index.html          # HTML shell
tailwind.config.js      # Tailwind theme (maps CSS vars → classes)
```

---

## Entities (Base44 Database)

| Entity | Description |
|--------|-------------|
| `Suite` | VIP suite definitions — name, description, pricing, images, features |
| `Event` | Upcoming events — title, date, category, available suites |
| `Inquiry` | Contact/booking requests submitted by visitors |

All entity schemas live in `entities/` as JSON Schema files.

---

## Local Development

### Prerequisites
- Node.js 18+
- A Base44 account with the project imported

### Setup

```bash
git clone <your-repo-url>
cd arena-vilnius-suites
npm install
```

Copy the environment example file:

```bash
cp .env.example .env.local
```

Fill in your Base44 app credentials (see `.env.example`), then:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## How to Import This Project Into Another Base44 Account

### Option A — GitHub Import (Recommended)

1. Push this repository to GitHub (or fork it).
2. Log in to your **new Base44 account**.
3. Create a **new app** in the Base44 dashboard.
4. In the app editor go to **Dashboard → GitHub icon → Connect to GitHub**.
5. Authorise Base44 and select the repository.
6. Base44 will pull all source files automatically.
7. Re-create the three entities (`Suite`, `Event`, `Inquiry`) using the JSON schemas in `entities/` — paste each schema in the Base44 entity editor.
8. Click **Publish**.

> ⚠️ The default branch **must be named `main`** for Base44 sync to work.

### Option B — Manual Import (ZIP)

1. Export this project as a ZIP from the original account:
   - App editor → ⋯ More Actions → **Export project as ZIP**
2. In the new Base44 account create a new app.
3. Upload / paste each file via the code editor.
4. Re-create entities from the schemas in `entities/`.

### After Import — Environment Setup

Set the following in the new app's Base44 dashboard under **Settings → Environment Variables** if you use any backend functions:

```
# No secrets required for the base app.
# Add here if you extend with external API keys:
# OPENAI_API_KEY=...
# STRIPE_SECRET_KEY=...
```

The `VITE_BASE44_APP_ID` is injected automatically by Base44 at build time.

---

## Deploying Independently (Outside Base44)

If you want to self-host without Base44:

1. Replace `src/api/base44Client.js` with your own backend API client.
2. Swap `base44.entities.*` calls with your own REST/GraphQL calls.
3. Replace `base44.auth.*` with your own auth provider (e.g. Supabase, Auth0).
4. Build: `npm run build` → deploy `dist/` to Vercel, Netlify, or any static host.

---

## Design System

CSS variables are defined in `index.css` and mapped to Tailwind utility classes in `tailwind.config.js`.

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `0 0% 4%` | Page background (`bg-background`) |
| `--foreground` | `0 0% 95%` | Default text |
| `--primary` | `236 52% 16%` | Deep navy accent |
| `--border` | `0 0% 11%` | Subtle borders |
| `--font-heading` | Nunito | `font-heading` |
| `--font-body` | Inter | `font-body` |

---

## Content Management

All content (suites, events) is managed through the **Base44 dashboard** under the **Data** tab — no separate admin UI is needed.

Inquiries submitted via the Contact page are visible under **Data → Inquiry**.

---

## License

Private — Arena Vilnius. All rights reserved.