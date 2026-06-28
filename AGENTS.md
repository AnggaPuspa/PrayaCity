d<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI agent context

> Single source of truth for any AI coding assistant working in this repo
> (Claude Code, Cursor, GitHub Copilot, etc.). Cursor/Copilot rule files point
> here. For the folder map and rationale, see [ARCHITECTURE.md](ARCHITECTURE.md).

## TL;DR

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict),
  Tailwind CSS v4, ESLint 9, zod.
- **Architecture:** hybrid **Atomic Design** (shared UI) + **Feature-Sliced**
  (business logic). Routing, UI, and logic are kept separate.
- **Golden rule:** logic is *separated from UI*. Presentational components only
  receive props and render — never fetch, validate, or mutate.
- **Alias:** `@/*` → `src/*`.
- Before finishing, code must pass `npm run lint` and `npm run build`.

## The three places code can live

| Put it in… | When it is… | Rules |
| ---------- | ----------- | ----- |
| `src/app/` | a route, layout, or route handler | **Thin.** No business logic, no validation, no data access. Compose features/components. |
| `src/components/` | **shared** UI used in 2+ places | Atomic Design layers; pure/presentational; no feature imports. |
| `src/features/<name>/` | logic/UI for one domain | Split into schemas/services/actions/controllers/components. |

"Shared" = imported in more than one place. Used once? Keep it inside the
feature (or the route's local scope), not in `components/`.

## Dependency direction (enforced by ESLint — do not fight it)

```
atoms → molecules → organisms → templates        (UI may only import downward)
components/  ✗ never imports features/
features/    ✗ never imports app/
```

Always import through the barrel `index.ts`:

```ts
import { Button, Input } from "@/components/atoms";   // ✅
import { ContactForm } from "@/features/contact";     // ✅
import { Button } from "@/components/atoms/button";    // ⚠️ avoid deep paths
```

## Server vs client

- **Server Component by default.** Add `"use client"` ONLY for interactivity
  (state, effects, event handlers, browser APIs).
- Keep the client boundary small: a feature's `controllers/` and the container
  that uses them are client; the presentational view can stay server-renderable.
- Secrets/data access go in `services/` with `import "server-only"` at the top.
- **Server Actions** (`"use server"`) are the API for first-party mutations.
  Use `app/api/*` route handlers only for webhooks / public / third-party APIs.

## Next.js 16 gotchas (differs from older training data)

- `params` and `searchParams` are **Promises** — always `await` them:
  ```ts
  export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
  }
  ```
- Every `page.tsx` should export `metadata` or `generateMetadata` for SEO.
- Parallel-fetch independent data with `Promise.all` (avoid waterfalls).
- Never put secrets in `NEXT_PUBLIC_*`; enforce the boundary with `server-only`.

## Naming conventions

- Files: **kebab-case** (`site-header.tsx`, `use-contact-form.ts`,
  `submit-contact.action.ts`, `contact.schema.ts`, `contact.service.ts`).
- React components: **PascalCase** export. Hooks: `useXxx`. Server actions end
  in `...Action`. Each layer has an `index.ts` barrel (its public API).

---

## Recipes

### Add a shared atom

1. Create `src/components/atoms/<name>.tsx` (use `cn()` from `@/lib/utils/cn`;
   use `cva` for variants — see `button.tsx`).
2. Export it from `src/components/atoms/index.ts`.
3. Atoms import nothing from higher layers.

### Add a feature (the layered split)

Create `src/features/<name>/` with only the layers you need:

```
features/<name>/
├── schemas/<name>.schema.ts      # zod validation (shared source of truth)
├── types/index.ts                # domain types (infer from schema)
├── services/<name>.service.ts    # data access — starts with: import "server-only"
├── actions/<verb>-<name>.action.ts  # "use server"; validate → service → return
├── controllers/use-<name>.ts     # "use client"; state/handlers/useActionState
├── components/<name>-*.tsx        # presentational UI (props in, JSX out)
└── index.ts                      # public API barrel
```

Flow for a mutation: **component → controller → action → (schema validate) →
service**. Copy `features/contact` as the canonical example. For pure client
state with no server, copy `features/counter` (controller + view split).

### Add a route / page

1. Put it under the right route group in `src/app/` (e.g. `(marketing)`,
   or add `(app)` / `(auth)` groups for authed/auth pages).
2. Keep `page.tsx` thin: import from `@/features/*` and `@/components/*`,
   export `metadata`, compose. No logic in the page.

### Decision: "where does this go?"

| Code | Location |
| ---- | -------- |
| Page-level composition | `app/.../page.tsx` |
| Reusable UI primitive | `components/atoms` (or molecules/organisms) |
| Feature-specific UI | `features/<name>/components` |
| Validation schema | `features/<name>/schemas` |
| DB / API / email access | `features/<name>/services` (`server-only`) |
| Mutation / orchestration | `features/<name>/actions` |
| Client state + handlers | `features/<name>/controllers` (or `hooks/` if app-wide) |
| Pure helper (e.g. `cn`) | `lib/utils` |
| Static config | `config/` |
| Cross-cutting types | `types/` (global) or feature `types/` |

## Definition of done

- [ ] No business logic in `app/`; pages are thin.
- [ ] Presentational components receive props only (no fetch/validate/mutate).
- [ ] Imports go through barrels and respect the dependency direction.
- [ ] `"use client"` only where needed; secrets behind `server-only`.
- [ ] `npm run lint` and `npm run build` both pass.
