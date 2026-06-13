# ROCTR - Backend & Database Development (JourneyLog)

## 1. Role (Peran)
* **Backend Developer / Database Administrator**

## 2. Objective (Tujuan)
Merancang arsitektur database PostgreSQL yang andal, mengonfigurasi autentikasi aman, membuat fungsi CRUD via Next.js Server Actions, serta menangani logika penyimpanan gambar dengan performa *search response* < 500ms.

## 3. Context (Konteks)
Backend memanfaatkan fitur modern Next.js (Server Actions & Route Handlers) dikombinasikan dengan Prisma ORM untuk komunikasi ke database PostgreSQL. Keamanan data pengguna (password hashing dan protected routes) menjadi prioritas utama.

## 4. Tasks (Daftar Tugas Backend)

### Sprint 1: Database & Autentikasi
* [ ] **Prisma Setup:** Inisialisasi Prisma ORM dan hubungkan ke database PostgreSQL (Supabase/Neon).
* [ ] **Database Migration:** Tulis dan migrasikan skema database (Tabel `users`, `notes`, `categories`, `tags`, `note_tags`, `note_images`).
* [ ] **Auth.js Integration:** Setup autentikasi aman (Register dengan password hashing bcrypt/argon2, Login session, Logout).
* [ ] **Middleware Security:** Buat middleware untuk memproteksi rute (*protected routes*) agar halaman dashboard hanya bisa diakses user yang sudah login.

### Sprint 2: Logika Bisnis & CRUD (Server Actions)
* [ ] **Category & Tag Actions:** Buat fungsi untuk otomatis membuat kategori bawaan (`Travel`, `Daily`, `Gym`) saat user mendaftar, serta CRUD untuk *custom tags*.
* [ ] **Notes CRUD Actions:** Buat Server Actions untuk:
  * `createNote` (menyimpan catatan ke DB beserta relasi tag)
  * `readNotes` (mengambil catatan berdasarkan user_id)
  * `updateNote` (mengedit isi catatan/mengarsipkan)
  * `deleteNote` (menghapus catatan)

### Sprint 3: Media & Optimasi Pencarian
* [ ] **Supabase Storage Integration:** Buat API Route Handler untuk menangani proses unggah (*upload*) file gambar dari frontend ke Supabase Storage Bucket, lalu simpan URL-nya ke tabel `note_images`.
* [ ] **Search Engine Query:** Tulis query Prisma yang dioptimasi untuk mencari teks (judul/konten) dan memfilter berdasarkan kategori/tag dengan waktu respon di bawah 500ms.
* [ ] **Security Hardening:** Implementasikan pembatasan laju permintaan (*rate limiting*) pada endpoint krusial dan proteksi CSRF.

## 5. Result (Hasil yang Diharapkan)
Database dan seluruh API/Server Actions berfungsi penuh dan aman, siap menerima data masukan dari bagian Frontend secara *real-time*.