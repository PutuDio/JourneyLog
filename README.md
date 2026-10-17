<p align="center">
  <img src="./public/logo.png" alt="JourneyLog Logo" width="100" height="100" style="border-radius: 20px;" />
</p>

<h1 align="center">JourneyLog</h1>

<p align="center">
  <strong>Aplikasi web mobile-first untuk mencatat perjalanan, aktivitas harian, progres gym, dan kalender kegiatan dalam satu platform terpadu.</strong>
</p>

<p align="center">
  <em>"Buat rumah untuk kenangan dan rencanamu."</em>
</p>

---

## 🌟 Fitur Utama

- 🔐 **Autentikasi Aman:** Registrasi, Login berbasis kredensial (Auth.js v5), Logout, dan alur Lupa & Reset Password bertenggat waktu.
- 📝 **Manajemen Catatan (Notes CRUD):**
  - Editor teks kaya (*Rich Text Editor*) bertenaga TipTap dengan dukungan formatting dan daftar centang (*checklist*).
  - Unggah dan kelola banyak foto per catatan via Supabase Storage.
  - Pelacakan lokasi (nama tempat, alamat, koordinat GPS otomatis, dan tautan langsung ke Google Maps).
  - Pengarsipan catatan (*Archive*) untuk menjaga dashboard tetap rapi.
- 🗂️ **Kategori & Tag Fleksibel:**
  - Kategori bawaan: **Travel** ✈️, **Daily** 📖, dan **Gym** 🏋️.
  - Kustomisasi kategori baru dan penambahan tag bebas melalui menu Pengaturan (*Settings*).
- 🔍 **Pencarian Instan:** Pencarian real-time (< 500ms) berdasarkan judul, isi catatan, tag, dan kategori.
- 📅 **Kalender & Manajemen Kegiatan (Tasks):**
  - **Kalender Bulanan:** Tampilan kalender interaktif (`react-big-calendar`) untuk memantau semua agenda.
  - **Today View:** Fokus pada tugas dan agenda yang harus diselesaikan hari ini.
  - **Upcoming View:** Jadwal kegiatan mendatang yang terorganisir.
  - **Sticky Wall:** Papan kartu catatan tempel visual untuk inspirasi dan pengingat cepat.
  - Pengelompokan daftar kegiatan (*Task Lists*) dan dialog penambahan kegiatan cepat.
- 📊 **Dashboard Analitik:** Ringkasan total catatan, statistik per kategori, dan akses cepat ke catatan terbaru.
- 📱 **Mobile-First & Responsif:** Desain modern dengan navigasi *bottom bar* pada perangkat mobile, *sidebar* pada desktop, dan floating action button (FAB).
- 🎨 **Identitas Visual Konsisten:** Palet warna Teal Soft Modernism (`#00687b`), favicon otomatis, dan logo resmi terintegrasi.

---

## 🛠️ Tech Stack

| Komponen | Teknologi |
|---|---|
| **Frontend Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/) |
| **Bahasa Pemrograman** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling & Komponen** | [Tailwind CSS v4](https://tailwindcss.com/), Radix UI, Lucide Icons, Sonner Toast |
| **Text Editor** | [TipTap](https://tiptap.dev/) (StarterKit, TaskList, TaskItem) |
| **Kalender** | [React Big Calendar](https://github.com/jquense/react-big-calendar), date-fns |
| **Backend & API** | Next.js Server Actions & Route Handlers |
| **Database & ORM** | PostgreSQL ([Supabase](https://supabase.com/) / [Neon](https://neon.tech/)) + [Prisma ORM v6](https://www.prisma.io/) |
| **Autentikasi** | [Auth.js](https://authjs.dev/) (NextAuth v5), bcryptjs |
| **Penyimpanan Berkas** | Supabase Storage (Bucket: `journeylog-images`) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Setup & Instalasi Lokal

### 1. Kloning Repositori & Pasang Dependensi

```bash
git clone https://github.com/PutuDio/JourneyLog.git
cd JourneyLog
npm install
```

### 2. Konfigurasi Environment Variables

Salin file `.env.example` ke `.env` lalu lengkapi isinya:

```bash
cp .env.example .env
```

Isi variabel environment berikut di file `.env`:

```env
# Database PostgreSQL (Supabase / Neon)
DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:port/database"

# Auth.js / NextAuth (generate via: openssl rand -base64 32)
AUTH_SECRET="your-auth-secret-key-here"
AUTH_URL="http://localhost:3000"

# Supabase Storage untuk Gambar Catatan
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
NEXT_PUBLIC_SUPABASE_BUCKET="journeylog-images"
```

### 3. Setup Skema Database (Prisma)

Jalankan perintah berikut untuk menyinkronkan skema database:

```bash
npm run db:push
# atau: npx prisma migrate dev --name init
```

### 4. Setup Supabase Storage

Pastikan Anda telah membuat bucket dengan nama `journeylog-images` di panel kontrol Supabase Storage dan mengaturnya ke **Public** agar gambar dapat dimuat di aplikasi.

### 5. Jalankan Server Pengembangan

```bash
npm run dev
```

Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

---

## 📂 Struktur Proyek

```
JourneyLog/
├── docs/                       # Dokumentasi lengkap proyek
│   ├── DESIGN.md               # Spesifikasi sistem desain & panduan logo
│   ├── prd.md                  # Product Requirement Document (PRD) v1.1
│   ├── ROCTR.md                # Project Overview & Tracker
│   ├── ROCTR-Frontend.md       # Detail pengerjaan frontend
│   └── ROCTR-Backend.md        # Detail pengerjaan backend
├── prisma/
│   └── schema.prisma           # Skema database Prisma (PostgreSQL)
├── public/
│   └── logo.png                # Aset logo resmi JourneyLog (512x512)
├── src/
│   ├── actions/                # Server Actions (auth, notes, tags, categories, tasks)
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/              # Rute terproteksi (dashboard, notes, calendar, settings)
│   │   ├── (auth)/             # Rute autentikasi (login, register, forgot/reset-password)
│   │   ├── icon.png            # Favicon & App Icon otomatis Next.js
│   │   ├── layout.tsx          # Root layout & metadata logo
│   │   └── page.tsx            # Landing page publik
│   ├── components/             # Komponen UI
│   │   ├── auth/               # Komponen form autentikasi
│   │   ├── calendar/           # Kalender, sidebar kegiatan, view harian/tempel
│   │   ├── editor/             # TipTap Rich Text Editor
│   │   ├── layout/             # AppShell (Sidebar & Mobile Header)
│   │   ├── notes/              # NoteForm, NoteCard, CategoryBadge
│   │   └── ui/                 # Komponen dasar (Button, Card, Input, Dialog, dsb.)
│   └── lib/                    # Utilitas, Prisma client, Auth.js config, Supabase client
└── README.md                   # Ringkasan utama proyek
```

---

## 📖 Dokumentasi Lengkap

Dokumentasi teknis dan perancangan tersimpan rapi di dalam folder [`docs/`](./docs):

- 🎨 [**Spesifikasi Desain & Logo**](./docs/DESIGN.md) — Panduan palet warna, tipografi, logo, dan komponen visual.
- 📋 [**Product Requirements Document (PRD)**](./docs/prd.md) — Spesifikasi kebutuhan fungsional dan non-fungsional v1.1.
- 📌 [**ROCTR Overview**](./docs/ROCTR.md) — Ikhtisar peran, objektif, dan progres keseluruhan proyek.
- 💻 [**ROCTR Frontend**](./docs/ROCTR-Frontend.md) — Rangkuman implementasi dan sprint frontend.
- ⚙️ [**ROCTR Backend**](./docs/ROCTR-Backend.md) — Rangkuman arsitektur database dan server actions backend.

---

## 📄 Lisensi

Dibuat oleh [Putu Dio](https://github.com/PutuDio). Hak Cipta © 2026 JourneyLog.
