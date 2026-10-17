# ROCTR - JourneyLog Project Overview

## 1. Role (Peran)
* **Product Owner / Fullstack Developer:** Putu Dio & Collaborator
* **Tanggung Jawab:** Merancang arsitektur database, membangun Server Actions & API backend, mengimplementasikan antarmuka *mobile-first* yang responsif dengan identitas visual resmi (Logo & Soft Modernism design system), serta deployment ke Vercel.

---

## 2. Objective (Tujuan)
Membangun dan mengembangkan aplikasi web **JourneyLog** (saat ini v1.1) yang stabil, aman, cepat, dan responsif. Aplikasi menggabungkan kebutuhan pencatatan perjalanan (*Travel*), aktivitas harian (*Daily*), progres kebugaran (*Gym*), serta manajemen waktu & agenda kegiatan (*Calendar & Tasks*) dalam satu ekosistem terpadu.

---

## 3. Context (Konteks)
* **Masalah:** Catatan pengguna sebelumnya terfragmentasi di berbagai aplikasi terpisah (jurnal travel, to-do list, calendar, dan catatan gym).
* **Solusi:** JourneyLog menyatukannya ke dalam satu aplikasi berbasis kategori terstruktur dengan fitur pencarian instan (< 500ms), dokumentasi gambar Supabase Storage, deteksi koordinat lokasi GPS, kalender kegiatan visual, dan sistem brand yang konsisten.
* **Tech Stack:** Next.js 15 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, shadcn/ui & Radix UI, Prisma ORM v6, PostgreSQL (Supabase/Neon), Auth.js (NextAuth v5), Supabase Storage, Vercel.

---

## 4. Tasks & Progress (Status Siklus Pengembangan)

* [x] **Fase 1: Inisialisasi & Setup Lingkungan Kerja**
  - [x] Inisialisasi repositori Next.js 15 dengan TypeScript dan Tailwind CSS.
  - [x] Konfigurasi Prisma ORM dan koneksi ke PostgreSQL.
  - [x] Setup autentikasi dasar dengan Auth.js v5 (NextAuth) dan skema `User`, `Account`, `Session`.

* [x] **Fase 2: Pengembangan Backend, Relasi & Storage API**
  - [x] Pembuatan skema tabel: `notes`, `categories`, `tags`, `note_tags`, `note_images`, `password_reset_tokens`.
  - [x] Penambahan fitur kegiatan & jadwal: `task_lists`, `tasks`, `task_tags`.
  - [x] Server Actions untuk autentikasi, manajemen catatan, kategori, tag, dan tugas/kegiatan.
  - [x] Integrasi Supabase Storage untuk unggah dan hapus berkas gambar catatan.
  - [x] Integrasi kolom lokasi (nama lokasi, alamat, latitude, longitude) pada model catatan.

* [x] **Fase 3: Pengembangan Frontend & UI/UX**
  - [x] Implementasi sistem desain "Soft Modernism" dengan palet warna Teal (`#00687b`), card rounded, dan elevasi halus.
  - [x] Integrasi Logo resmi JourneyLog di Favicon/Metadata, AppShell (Desktop Sidebar & Mobile Header), Landing Page, dan Form Autentikasi.
  - [x] Rich Text Editor terintegrasi TipTap untuk catatan teks dan checklist.
  - [x] Dashboard analitik dengan kartu metrik total catatan, distribusi per kategori, dan recent notes.
  - [x] Halaman Pengaturan (*Settings*) untuk kelola kategori kustom dan tag.
  - [x] Modul Kalender & Kegiatan (`/calendar`) dengan tampilan Bulanan, Today, Upcoming, dan Sticky Wall.

* [x] **Fase 4: Integrasi, Pengujian & Finishing**
  - [x] Koneksi end-to-end Server Actions dengan validasi form dan notifikasi toast (*sonner*).
  - [x] Pengujian responsivitas layar (Mobile phone, Tablet, Desktop).
  - [x] Penanganan state loading, proteksi route melalui middleware, dan penanganan error.

* [x] **Fase 5: Deployment & Pemeliharaan**
  - [x] Konfigurasi environment variables di production.
  - [x] Build otomatis (`prisma generate && prisma db push && next build`).
  - [x] Deployment live di Vercel Platform.

---

## 5. Result / Resources (Hasil Akhir & Sumber Daya)
* **Hasil Akhir:** Aplikasi web JourneyLog v1.1 live, seluruh fitur inti (Notes CRUD, Supabase Upload, Geolocation, Multi-view Calendar, Tasks, Custom Categories, Logo & Responsive Branding) beroperasi 100%.
* **Dokumentasi Terkait:**
  - [Product Requirements Document (PRD)](./prd.md)
  - [Design System & Logo Specification](./DESIGN.md)
  - [ROCTR Frontend Development](./ROCTR-Frontend.md)
  - [ROCTR Backend Development](./ROCTR-Backend.md)
