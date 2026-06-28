# Architecture

This project uses a **hybrid Atomic Design + Feature-Sliced** architecture on
Next.js (App Router). The core rule: **routing, UI, and logic are separated.**

- `app/` = routing only (thin pages/layouts, no business logic)
- `components/` = shared, reusable UI built with Atomic Design
- `features/` = business logic, sliced by domain, with logic split from UI
- `lib/`, `config/`, `hooks/`, `types/` = cross-cutting building blocks

## Folder map

```
src/
├── app/                      # ROUTING ONLY — pages, layouts, route handlers
│   ├── (marketing)/          # route group (no URL segment)
│   │   ├── layout.tsx        # uses the PageShell template
│   │   └── page.tsx          # thin page: composes features + components
│   ├── layout.tsx            # root: <html>, fonts, metadata, <Providers>
│   ├── providers.tsx         # single client provider boundary
│   └── globals.css
│
├── components/               # SHARED, reusable UI (Atomic Design)
│   ├── atoms/                # Button, Input, Label, Textarea, Typography
│   ├── molecules/            # FormField (atoms only)
│   ├── organisms/            # SiteHeader, SiteFooter (atoms + molecules)
│   └── templates/            # PageShell (page skeletons)
│
├── features/                 # BUSINESS LOGIC, sliced by domain
│   ├── counter/              # client-state example
│   │   ├── components/       #   counter.tsx (container) + counter-view.tsx (pure UI)
│   │   ├── controllers/      #   use-counter-controller.ts (state + behaviour)
│   │   ├── types/
│   │   └── index.ts          #   public API (import from here only)
│   └── contact/              # full-stack example
│       ├── schemas/          #   zod validation (single source of truth)
│       ├── services/         #   data access ("server-only")
│       ├── actions/          #   server actions (orchestration)
│       ├── controllers/      #   use-contact-form.ts (client wiring)
│       ├── components/       #   contact-form.tsx (declarative UI)
│       ├── types/
│       └── index.ts
│
├── lib/                      # infra / pure helpers (cn, fetchers, clients)
├── config/                   # site.ts, env.ts
├── hooks/                    # app-wide shared hooks
└── types/                    # global shared types
```

## How logic is separated (the "logic dipisah" rule)

Within a feature, each responsibility lives in its own layer:

| Layer         | Responsibility                                  | Runtime |
| ------------- | ----------------------------------------------- | ------- |
| `schemas/`    | Input validation (zod). Reused everywhere.      | shared  |
| `services/`   | Talk to DB / APIs / providers. `server-only`.   | server  |
| `actions/`    | Orchestrate: validate → call service → return.  | server  |
| `controllers/`| State + handlers (hooks). The UI's only logic.  | client  |
| `components/` | Presentational. Receive props, render. No logic.| either  |
| `types/`      | Feature-local domain types.                     | shared  |

A presentational component should never call a service, run validation, or hold
fetching logic — it receives everything via props from a controller.

## Dependency rules (enforced by ESLint)

`eslint.config.mjs` enforces the dependency direction with
`no-restricted-imports`:

- **Atoms** import nothing from higher layers.
- **Molecules** import atoms only.
- **Organisms** import atoms + molecules only.
- **Shared components** never import from `features/`.
- **Features** never import from `app/`.

Always import a feature or component layer through its `index.ts` barrel
(`@/features/contact`), never a deep internal path.

## Conventions

- **Server Components by default.** Add `'use client'` only for interactivity
  (controllers and the containers that use them).
- **Pages are thin.** A `page.tsx` should be readable in ~30 seconds.
- **Server Actions are the API** for first-party mutations; reserve
  `app/api/*` route handlers for webhooks and public/third-party endpoints.
- **Path alias:** `@/*` → `src/*`.

## Commands

```bash
npm run dev     # start dev server (Turbopack)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (includes architecture boundaries)
```
