<div align="center">

# 🏝️ Praya City

**Gerbang digital pariwisata Lombok Tengah — _The Soul of Central Lombok_.**

Informasi wisata terkurasi: acara budaya, destinasi alam, kuliner lokal, dan sejarah — dalam dua bahasa.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![next-intl](https://img.shields.io/badge/i18n-next--intl-7C3AED)](https://next-intl.dev)

🌐 **Produksi:** [www.parayacity.id](https://www.parayacity.id) · 🌏 **Bahasa:** Indonesia & English

</div>

---

## 📖 Tentang

**Praya City** adalah situs pariwisata untuk **Lombok Tengah** — dari legenda Putri Mandalika & Festival Bau Nyale, kebangkitan kerajaan Sasak, hingga gemuruh MotoGP di Sirkuit Mandalika. Dibangun sebagai web modern yang **cepat, responsif, multi-bahasa, dan SEO-friendly**.

> Proyek ini dikembangkan untuk keperluan **lomba/kompetisi pengembangan web**.

## ✨ Fitur Utama

- 🌏 **Multi-bahasa (ID & EN)** dengan routing `/id` dan `/en` + pemindah bahasa
- 🏠 **Landing page** — Hero video, Latest Events, About, Discover, Must-Visit (carousel), CTA
- 📜 **Halaman Sejarah** — timeline interaktif + galeri masonry
- 📱 **Responsive penuh** — menu hamburger di mobile, tampilan desktop tetap utuh
- 🪄 **Smooth scroll** halus dengan **Lenis**
- ⚡ **Performa** — semua aset dikompres ke **WebP** (29 MB → 1.2 MB) + `next/image` (AVIF/WebP)
- 🔎 **SEO** — metadata per-locale, **hreflang**, `sitemap.xml`, `robots.txt`
- 🧱 **Arsitektur bersih** — Atomic Design + Feature-Sliced, boundary dijaga ESLint

## 🧱 Tech Stack

| Kategori | Teknologi |
| --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) |
| UI | **React 19**, **Tailwind CSS v4** |
| Bahasa | **TypeScript 5** (strict) |
| i18n | **next-intl 4** |
| Smooth scroll | **Lenis** |
| Validasi | **Zod 4** |
| Styling util | `clsx`, `tailwind-merge`, `class-variance-authority` |
| Kualitas | **ESLint 9** (+ aturan boundary arsitektur) |

## 🏗️ Arsitektur

Hybrid **Atomic Design** (UI) + **Feature-Sliced** (logika bisnis). Aturan emas: **routing, UI, dan logika dipisah**.

```
src/
├── app/[locale]/          # Routing saja (tipis) — pages, layout, sitemap, robots
├── components/            # UI shared (Atomic Design)
│   ├── atoms/  molecules/  organisms/  templates/
├── features/              # Logika per-domain (UI + data dipisah)
│   ├── landing/  history/  coming-soon/  contact/  counter/
│   └── <name>/{components, controllers, data, schemas, services, types, index.ts}
├── i18n/                  # routing, navigation, request (next-intl)
├── config/  hooks/  lib/  types/
└── proxy.ts               # Negosiasi locale (Next.js 16 "proxy" = middleware)
messages/                  # id.json · en.json
```

📚 Detail lengkap: **[ARCHITECTURE.md](ARCHITECTURE.md)** · panduan kontributor/AI: **[AGENTS.md](AGENTS.md)**

## 🚀 Menjalankan Secara Lokal

**Prasyarat:** Node.js **≥ 20.9** dan npm.

```bash
# 1. Clone
git clone https://github.com/AnggaPuspa/PrayaCity.git
cd PrayaCity

# 2. Install dependency
npm install

# 3. Jalankan dev server
npm run dev
```

Buka **[http://localhost:3000](http://localhost:3000)** → otomatis diarahkan ke `/id`.

## 📜 Script

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | ESLint (termasuk boundary arsitektur) |

## 🗺️ Halaman

| Route | Halaman |
| --- | --- |
| `/id`, `/en` | Beranda (landing) |
| `/id/history`, `/en/history` | Sejarah Lombok Tengah |
| `/id/coming-soon`, `/en/coming-soon` | Placeholder halaman dalam pengembangan |

<div align="center">

_Built with ❤️ for Central Lombok._

</div>
