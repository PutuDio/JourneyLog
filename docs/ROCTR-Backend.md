# ROCTR - Backend & Database Development (JourneyLog)

## 1. Role (Peran)
* **Backend Developer / Database Administrator**

---

## 2. Objective (Tujuan)
Merancang dan mengimplementasikan arsitektur database PostgreSQL yang tangguh via Prisma ORM, menyediakan logika bisnis yang aman melalui Next.js Server Actions, mengintegrasikan sistem autentikasi dan otorisasi yang kokoh (Auth.js v5), serta mengelola unggah dan hapus media di Supabase Storage.

---

## 3. Context (Konteks)
Backend berjalan sepenuhnya dalam arsitektur modern Next.js 15 (Server Actions & Route Handlers) tanpa memerlukan server Express terpisah. Akses database dikelola oleh Prisma ORM dengan koneksi pooling ke PostgreSQL (Supabase/Neon), dilengkapi proteksi akses rute melalui Next.js Edge Middleware.

---

## 4. Tasks & Sprint Completion (Status Pengerjaan Backend)

### Sprint 1: Database & Autentikasi
* [x] **Prisma Setup:** Inisialisasi Prisma ORM dengan konfigurasi datasource PostgreSQL dan URL koneksi pooling/direct.
* [x] **Skema Basis Data Lengkap:**
  - Tabel `users`, `accounts`, `sessions`, `verification_tokens` (Auth.js adapter).
  - Tabel `categories` & `tags` dengan relasi user-scoped (unique per user).
  - Tabel `notes`, `note_tags`, dan `note_images`.
  - Kolom Geolokasi pada `notes`: `location_name`, `location_address`, `latitude`, `longitude`.
  - Tabel `task_lists`, `tasks`, dan `task_tags` untuk manajemen kegiatan kalender.
  - Tabel `password_reset_tokens` untuk alur reset kata sandi mandiri.
* [x] **Integrasi Auth.js (NextAuth v5):**
  - Registrasi user baru dengan *hashing* password menggunakan `bcryptjs`.
  - Login berbasis kredensial (email & password).
  - Alur lupa kata sandi (*forgot password*) dengan pembuatan token bertenggat waktu.
* [x] **Middleware Security:** Rute terproteksi (`/dashboard/*`, `/notes/*`, `/calendar/*`, `/settings/*`) via `middleware.ts` dengan pengalihan otomatis ke `/login` bila belum terautentikasi.

### Sprint 2: Logika Bisnis & Server Actions
* [x] **Categories & Tags Actions (`actions/categories.ts`, `actions/tags.ts`):**
  - Pembuatan kategori otomatis bawaan (`Travel`, `Daily`, `Gym`) atau kategori kustom.
  - Pengambilan data kategori dan tag terisolasi per user.
* [x] **Notes CRUD Actions (`actions/notes.ts`):**
  - `createNote`: Menyimpan judul, konten kaya, kategori, tag relasi, lokasi (nama, alamat, koordinat), dan gambar.
  - `getNotes`: Mengambil daftar catatan aktif dengan filter kategori, tag, dan query pencarian judul/konten.
  - `getArchivedNotes`: Mengambil catatan yang diarsipkan.
  - `getNoteById`: Mengambil satu catatan lengkap beserta relasi tags dan images.
  - `updateNote`: Memperbarui data catatan atau mengubah status arsip.
  - `deleteNote`: Menghapus catatan beserta berkas gambar terkait di storage.
  - `getDashboardStats`: Agregasi jumlah total catatan, catatan per kategori, dan catatan terbaru.
* [x] **Tasks & Activities Actions (`actions/tasks.ts`):**
  - `getTasks` & `getTaskLists`: Mengambil daftar tugas dan daftar kategori kegiatan.
  - `createTask`: Menambahkan kegiatan dengan tanggal mulai, tanggal selesai, due date, flag all-day, dan list id.
  - `toggleTask`: Menandai tugas selesai/belum selesai.
  - `deleteTask`: Menghapus tugas dari basis data.
  - `createTaskList`: Membuat grup daftar kegiatan baru.

### Sprint 3: Media Storage & Optimasi Pencarian
* [x] **Supabase Storage Integration (`lib/supabase.ts`, Route Handler):**
  - Konfigurasi Supabase Client dengan Service Role Key dan bucket `journeylog-images`.
  - Fungsi upload dan penghapusan berkas gambar aman dengan validasi tipe berkas.
* [x] **Optimasi Query & Relasi:**
  - Penggunaan indeks database pada kolom `[userId, isArchived, updatedAt]`, `[userId, title]`, dan `[userId, isCompleted, dueDate]`.
  - Penanganan cascade delete sehingga penghapusan catatan otomatis membersihkan relasi tag dan referensi gambar.

---

## 5. Result (Hasil yang Dicapai)
Database PostgreSQL dan seluruh Next.js Server Actions telah berfungsi 100% secara stabil, aman, dan efisien untuk mendukung semua fitur frontend JourneyLog.
