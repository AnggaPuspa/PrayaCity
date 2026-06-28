# Copilot instructions

This project uses **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind
v4** with a **hybrid Atomic Design + Feature-Sliced** architecture. The
authoritative guide is [AGENTS.md](../AGENTS.md) (+ [ARCHITECTURE.md](../ARCHITECTURE.md)).
Follow these rules when suggesting code:

- **Separate routing, UI, and logic.**
  - `src/app/` = routing only — thin pages/layouts, no business logic.
  - `src/components/{atoms,molecules,organisms,templates}` = shared, reusable UI.
  - `src/features/<name>/` = business logic, split into `schemas` (zod),
    `services` (`server-only` data access), `actions` (`"use server"`),
    `controllers` (client state/handlers), `components` (presentational UI).
- **Presentational components hold no logic** — props in, JSX out.
- **Dependency direction (ESLint-enforced):** atoms → molecules → organisms →
  templates; `components/` ✗ `features/`; `features/` ✗ `app/`. Import via the
  barrel `index.ts`, not deep paths. Alias `@/*` → `src/*`.
- **Server Components by default;** `"use client"` only for interactivity.
  Server Actions are the API for first-party mutations.
- **Next.js 16:** `await` `params`/`searchParams` (they are Promises); export
  `metadata`/`generateMetadata` from pages.
- Style with `cn()` (`@/lib/utils/cn`) and `cva` variants; files use kebab-case,
  components PascalCase.

When adding a feature, mirror `features/contact`; for shared UI, add to the
matching atomic layer and export it from that layer's `index.ts`.
