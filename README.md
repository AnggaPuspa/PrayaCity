<div align="center">

# 🏝️ Praya City

**Gerbang digital pariwisata Lombok Tengah — _The Soul of Central Lombok_.**

Informasi wisata terkurasi: acara budaya, destinasi alam, kuliner lokal, dan sejarah — dengan CMS admin bawaan.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![next-intl](https://img.shields.io/badge/i18n-next--intl-7C3AED)](https://next-intl.dev)

🌐 **Produksi:** [www.parayacity.id](https://www.parayacity.id) · 🌏 **Bahasa:** Indonesia & English

**[🇬🇧 Read in English](#-english)**

</div>

---

## 📖 Tentang

**Praya City** adalah situs pariwisata untuk **Lombok Tengah** — dari legenda Putri Mandalika & Festival Bau Nyale, kebangkitan kerajaan Sasak, hingga gemuruh MotoGP di Sirkuit Mandalika. Dibangun sebagai web modern yang **cepat, responsif, multi-bahasa, dan SEO-friendly**, dilengkapi **CMS admin** untuk pengelolaan konten.

> Proyek ini dikembangkan untuk keperluan **lomba/kompetisi pengembangan web**.

## ✨ Fitur Utama

### 🌐 Situs Publik
- 🌏 **Multi-bahasa (ID & EN)** dengan routing `/id` dan `/en` + pemindah bahasa
- 🏠 **Landing page** — Hero video, Latest Events, About, Discover, Must-Visit (carousel), CTA
- 📜 **Halaman Sejarah** — timeline interaktif + galeri masonry
- 🎭 **Halaman Budaya** — tradisi sticky-scroll + kuliner bento masonry
- 🏖️ **Halaman Destinasi** — grid responsif + halaman detail
- 📱 **Responsive penuh** — menu hamburger di mobile, tampilan desktop tetap utuh
- 🪄 **Smooth scroll** halus dengan **Lenis**
- ⚡ **Performa** — semua aset dikompres ke **WebP** + `next/image` (AVIF/WebP)
- 🔎 **SEO** — metadata per-locale, **hreflang**, `sitemap.xml`, `robots.txt`

### 🔒 CMS Admin (`/admin`)
- 🔐 **Autentikasi** — login JWT dengan session management
- 📊 **Dashboard** — statistik konten, chart (Recharts), media gallery
- 📰 **Event Management** — CRUD acara budaya dengan editor bilingual
- 🏖️ **Destination Management** — CRUD destinasi wisata
- 🏷️ **Category Management** — pengelolaan kategori konten
- 🖼️ **Media Management** — upload & kelola file via Supabase Storage
- ⚙️ **Settings** — pengaturan profil admin (email, password)
- 📋 **Audit Log** — riwayat perubahan lengkap (siapa, kapan, apa)
- 👥 **Role-based Access** — SUPER_ADMIN, ADMIN, EDITOR

## 🧱 Tech Stack

| Kategori | Teknologi |
| --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) |
| UI | **React 19**, **Tailwind CSS v4** |
| Bahasa | **TypeScript 5** (strict) |
| Database | **PostgreSQL** (Supabase) via **Prisma 7** |
| Storage | **Supabase Storage** (file uploads) |
| Auth | **JWT** (jose) + **bcryptjs** |
| i18n | **next-intl 4** |
| Charts | **Recharts** |
| Smooth scroll | **Lenis** |
| Validasi | **Zod 4** |
| Styling util | `clsx`, `tailwind-merge`, `class-variance-authority` |
| Kualitas | **ESLint 9** (+ aturan boundary arsitektur) |
| Deploy | **Vercel** (+ Cron keep-alive) |

## 🏗️ Arsitektur

Hybrid **Atomic Design** (UI) + **Feature-Sliced** (logika bisnis). Aturan emas: **routing, UI, dan logika dipisah**.

```
src/
├── app/
│   ├── [locale]/              # Routing publik (tipis)
│   │   ├── admin/             # CMS admin pages
│   │   │   ├── login/
│   │   │   └── (dashboard)/   # dashboard, events, destinations, categories,
│   │   │                      # media, settings, audit-log
│   │   ├── history/  culture/  destinations/
│   │   └── page.tsx           # Landing
│   └── api/cron/              # Vercel Cron (keep-alive)
├── components/                # UI shared (Atomic Design)
│   ├── atoms/  molecules/  organisms/  templates/
├── features/                  # Logika per-domain
│   ├── landing/  history/  culture/  destinations/
│   ├── auth/                  # login, settings, session
│   ├── dashboard/             # stats, charts, media gallery
│   ├── article/               # event CRUD, categories
│   └── audit/                 # audit log
├── lib/                       # Infra (prisma, supabase, auth helpers)
├── hooks/  config/  types/
└── proxy.ts                   # Negosiasi locale (middleware)
messages/                      # id.json · en.json
prisma/                        # schema, migrations, seed
```

📚 Detail lengkap: **[ARCHITECTURE.md](ARCHITECTURE.md)** · panduan kontributor/AI: **[AGENTS.md](AGENTS.md)**

## 🚀 Menjalankan Secara Lokal

**Prasyarat:** Node.js **≥ 20.9**, npm, dan akun [Supabase](https://supabase.com).

```bash
# 1. Clone
git clone https://github.com/AnggaPuspa/PrayaCity.git
cd PrayaCity

# 2. Install dependency (otomatis menjalankan prisma generate)
npm install

# 3. Siapkan environment variables
cp .env.example .env
# Isi DIRECT_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, dll.

# 4. Jalankan migrasi database
npx prisma migrate deploy

# 5. (Opsional) Seed data awal
npx prisma db seed

# 6. Jalankan dev server
npm run dev
```

Buka **[http://localhost:3000](http://localhost:3000)** → otomatis diarahkan ke `/id`.

### Environment Variables

| Variable | Keterangan |
| --- | --- |
| `DIRECT_URL` | Connection string PostgreSQL (Supabase) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side) |
| `JWT_SECRET` | Secret untuk JWT session |
| `CRON_SECRET` | Secret untuk autentikasi Vercel Cron |

## 📜 Script

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | ESLint (termasuk boundary arsitektur) |

## 🗺️ Halaman

### Publik

| Route | Halaman |
| --- | --- |
| `/id`, `/en` | Beranda (landing) |
| `/id/history`, `/en/history` | Sejarah Lombok Tengah |
| `/id/culture`, `/en/culture` | Budaya & Kuliner |
| `/id/destinations`, `/en/destinations` | Destinasi Wisata |

### Admin

| Route | Halaman |
| --- | --- |
| `/admin/login` | Login admin |
| `/admin` | Dashboard (statistik & chart) |
| `/admin/events` | Kelola acara budaya |
| `/admin/destinations` | Kelola destinasi |
| `/admin/categories` | Kelola kategori |
| `/admin/media` | Kelola media/file |
| `/admin/settings` | Pengaturan profil |
| `/admin/audit-log` | Riwayat aktivitas |

---

<div align="center">

## 🇬🇧 English

</div>

## 📖 About

**Praya City** is a tourism website for **Central Lombok** — from the legend of Putri Mandalika & Bau Nyale Festival, the rise of the Sasak kingdom, to the roar of MotoGP at Mandalika Circuit. Built as a modern web application that is **fast, responsive, multilingual, and SEO-friendly**, equipped with a built-in **admin CMS** for content management.

> This project was developed for a **web development competition**.

## ✨ Key Features

### 🌐 Public Site
- 🌏 **Bilingual (ID & EN)** with `/id` and `/en` routing + language switcher
- 🏠 **Landing page** — Hero video, Latest Events, About, Discover, Must-Visit (carousel), CTA
- 📜 **History page** — interactive timeline + masonry gallery
- 🎭 **Culture page** — traditions sticky-scroll + culinary bento masonry
- 🏖️ **Destinations page** — responsive grid + detail pages
- 📱 **Fully responsive** — hamburger menu on mobile, full desktop layout
- 🪄 **Smooth scrolling** with **Lenis**
- ⚡ **Performance** — all assets compressed to **WebP** + `next/image` (AVIF/WebP)
- 🔎 **SEO** — per-locale metadata, **hreflang**, `sitemap.xml`, `robots.txt`

### 🔒 Admin CMS (`/admin`)
- 🔐 **Authentication** — JWT login with session management
- 📊 **Dashboard** — content statistics, charts (Recharts), media gallery
- 📰 **Event Management** — CRUD cultural events with bilingual editor
- 🏖️ **Destination Management** — CRUD tourist destinations
- 🏷️ **Category Management** — content category management
- 🖼️ **Media Management** — upload & manage files via Supabase Storage
- ⚙️ **Settings** — admin profile settings (email, password)
- 📋 **Audit Log** — complete change history (who, when, what)
- 👥 **Role-based Access** — SUPER_ADMIN, ADMIN, EDITOR

## 🧱 Tech Stack

| Category | Technology |
| --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) |
| UI | **React 19**, **Tailwind CSS v4** |
| Language | **TypeScript 5** (strict) |
| Database | **PostgreSQL** (Supabase) via **Prisma 7** |
| Storage | **Supabase Storage** (file uploads) |
| Auth | **JWT** (jose) + **bcryptjs** |
| i18n | **next-intl 4** |
| Charts | **Recharts** |
| Smooth scroll | **Lenis** |
| Validation | **Zod 4** |
| Styling utils | `clsx`, `tailwind-merge`, `class-variance-authority` |
| Code quality | **ESLint 9** (+ architecture boundary rules) |
| Deploy | **Vercel** (+ Cron keep-alive) |

## 🏗️ Architecture

Hybrid **Atomic Design** (UI) + **Feature-Sliced** (business logic). Golden rule: **routing, UI, and logic are separated**.

```
src/
├── app/
│   ├── [locale]/              # Thin routing pages
│   │   ├── admin/             # CMS admin pages
│   │   │   ├── login/
│   │   │   └── (dashboard)/   # dashboard, events, destinations, categories,
│   │   │                      # media, settings, audit-log
│   │   ├── history/  culture/  destinations/
│   │   └── page.tsx           # Landing
│   └── api/cron/              # Vercel Cron (keep-alive)
├── components/                # Shared UI (Atomic Design)
│   ├── atoms/  molecules/  organisms/  templates/
├── features/                  # Domain-sliced logic
│   ├── landing/  history/  culture/  destinations/
│   ├── auth/                  # login, settings, session
│   ├── dashboard/             # stats, charts, media gallery
│   ├── article/               # event CRUD, categories
│   └── audit/                 # audit log
├── lib/                       # Infra (prisma, supabase, auth helpers)
├── hooks/  config/  types/
└── proxy.ts                   # Locale negotiation (middleware)
messages/                      # id.json · en.json
prisma/                        # schema, migrations, seed
```

📚 Full details: **[ARCHITECTURE.md](ARCHITECTURE.md)** · contributor/AI guide: **[AGENTS.md](AGENTS.md)**

## 🚀 Running Locally

**Prerequisites:** Node.js **≥ 20.9**, npm, and a [Supabase](https://supabase.com) account.

```bash
# 1. Clone
git clone https://github.com/AnggaPuspa/PrayaCity.git
cd PrayaCity

# 2. Install dependencies (automatically runs prisma generate)
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in DIRECT_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, etc.

# 4. Run database migrations
npx prisma migrate deploy

# 5. (Optional) Seed initial data
npx prisma db seed

# 6. Start dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** → automatically redirects to `/id`.

### Environment Variables

| Variable | Description |
| --- | --- |
| `DIRECT_URL` | PostgreSQL connection string (Supabase) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side) |
| `JWT_SECRET` | Secret for JWT sessions |
| `CRON_SECRET` | Secret for Vercel Cron authentication |

## 📜 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (includes architecture boundaries) |

## 🗺️ Pages

### Public

| Route | Page |
| --- | --- |
| `/id`, `/en` | Home (landing) |
| `/id/history`, `/en/history` | Central Lombok History |
| `/id/culture`, `/en/culture` | Culture & Culinary |
| `/id/destinations`, `/en/destinations` | Tourist Destinations |

### Admin

| Route | Page |
| --- | --- |
| `/admin/login` | Admin login |
| `/admin` | Dashboard (stats & charts) |
| `/admin/events` | Manage cultural events |
| `/admin/destinations` | Manage destinations |
| `/admin/categories` | Manage categories |
| `/admin/media` | Manage media/files |
| `/admin/settings` | Profile settings |
| `/admin/audit-log` | Activity history |

---

<div align="center">

_Built with ❤️ for Central Lombok._

</div>
