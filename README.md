# JourneyLog

Aplikasi web **mobile-first** untuk mencatat perjalanan, aktivitas harian, dan progres gym dalam satu platform.

## Fitur MVP

- Autentikasi: Register, Login, Logout, Forgot/Reset Password
- CRUD catatan dengan arsip
- Kategori default (Travel, Daily, Gym) + kategori kustom
- Tag pada catatan
- Pencarian instan (judul, isi, tag, kategori)
- Upload/hapus gambar via Supabase Storage
- Dashboard: total catatan, per kategori, recent notes

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn-style UI, TipTap
- **Backend:** Next.js Server Actions & Route Handlers
- **Database:** PostgreSQL + Prisma
- **Auth:** Auth.js (NextAuth v5)
- **Storage:** Supabase Storage
- **Deploy:** Vercel

## Setup Lokal

### 1. Clone & install

```bash
npm install
```

### 2. Environment

Salin `.env.example` ke `.env` dan isi:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."   # openssl rand -base64 32
AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="..."
NEXT_PUBLIC_SUPABASE_BUCKET="journeylog-images"
```

### 3. Database

```bash
npx prisma migrate dev --name init
# atau: npm run db:push
```

### 4. Supabase Storage

Buat bucket `journeylog-images` (public) di Supabase Dashboard.

### 5. Jalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Deploy ke Vercel

1. Push repo ke GitHub
2. Import project di Vercel
3. Set environment variables (sama seperti `.env`)
4. Gunakan PostgreSQL (Neon/Supabase) untuk `DATABASE_URL`
5. Deploy — `npm run build` menjalankan `prisma generate` otomatis

## Struktur Proyek

```
src/
  actions/     # Server Actions (auth, notes, tags, categories)
  app/         # App Router pages & API routes
  components/  # UI, layout, notes, editor
  lib/         # Prisma, auth, supabase, utils
prisma/
  schema.prisma
```

## Dokumen

- [prd.md](./prd.md) — Product Requirements
- [ROCTR.md](./ROCTR.md) — Project overview
- [ROCTR-Backend.md](./ROCTR-Backend.md) — Backend tasks
- [ROCTR-Frontend.md](./ROCTR-Frontend.md) — Frontend tasks
