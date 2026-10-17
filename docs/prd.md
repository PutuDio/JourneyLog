# Product Requirement Document (PRD) – JourneyLog

* **Nama Produk:** JourneyLog
* **Versi:** 1.1 (Production-Ready)
* **Status:** Active / Implemented
* **Product Owner:** Putu Dio

---

## 1. Ringkasan Eksekutif (Product Overview)

**JourneyLog** adalah aplikasi web *mobile-first* serbaguna yang dirancang untuk membantu pengguna mencatat dan mengorganisasi perjalanan (*Travel*), aktivitas harian (*Daily*), progres latihan kebugaran (*Gym*), serta perencanaan jadwal dan kegiatan (*Calendar & Tasks*) dalam satu platform terpadu.

Aplikasi ini mengatasi masalah fragmentasi catatan, di mana pengguna sebelumnya harus membuka banyak aplikasi berbeda (aplikasi to-do, travel journal, fitness tracker, dan galeri foto). Melalui JourneyLog, seluruh kenangan dan agenda tersimpan rapi, mudah dicari kembali dalam hitungan milidetik, didukung dokumentasi foto di Supabase Storage, serta pelacakan lokasi berbasis GPS.

---

## 2. Tujuan & Metrik Keberhasilan (Goals & Metrics)

### Tujuan Produk
1. **Pusat Kenangan & Kegiatan Terpadu:** Menggabungkan catatan perjalanan, aktivitas harian, fitness log, dan kalender kegiatan dalam satu wadah.
2. **Pengalaman Mobile-First Nyaman:** Antarmuka responsif dan ramah sentuhan dengan sistem navigasi *bottom bar* pada layar ponsel dan *sidebar* pada desktop.
3. **Pencarian Cepat:** Memungkinkan pencarian instan (< 500ms) berdasarkan kata kunci judul, isi catatan, kategori, maupun tag.

### Metrik Keberhasilan yang Telah Dicapai
- [x] Sistem autentikasi pengguna lengkap (Register, Login, Logout, Forgot/Reset Password via token).
- [x] Manajemen catatan (CRUD) lengkap dengan status arsip.
- [x] Unggah dan hapus banyak gambar per catatan terintegrasi Supabase Storage.
- [x] Pelacakan lokasi (nama tempat, alamat, koordinat GPS) dengan integrasi Google Maps.
- [x] Kalender interaktif dan pelacakan kegiatan (*Tasks & TaskLists*) dengan 4 tampilan: Kalender Bulanan, Today, Upcoming, dan Sticky Wall.
- [x] Kustomisasi kategori dan tag melalui menu Pengaturan (*Settings*).
- [x] Penerapan identitas visual resmi (Logo JourneyLog, favicon, palet warna teal *soft modernism*).

---

## 3. Persona Pengguna (Target Users)

### 1. Traveler
* **Karakteristik:** Gemar bepergian, menjelajah tempat baru, dan mencatat *itinerary* serta memori perjalanan.
* **Kebutuhan:** Jurnal perjalanan, dokumentasi foto beresolusi baik, pelacakan koordinat lokasi/GPS, dan tautan peta.

### 2. Daily Activity User
* **Karakteristik:** Memiliki rutinitas padat, suka membuat *to-do list*, catatan harian pribadi, dan jadwal harian.
* **Kebutuhan:** Editor teks fleksibel dengan *checklist*, pencatatan cepat, agenda hari ini (*Today view*), dan dinding catatan tempel (*Sticky Wall*).

### 3. Gym Enthusiast
* **Karakteristik:** Rutin berolahraga dan ingin melacak jenis latihan, target repetisi/beban, serta progres fisik.
* **Kebutuhan:** Kategori khusus *Gym*, pencatatan rutinitas *workout*, dan penandaan tag spesifik.

---

## 4. Cakupan Fitur Sistem Saat Ini (Implemented Scope)

### A. Identitas Brand & Visual
- **Logo Resmi:** Terintegrasi di seluruh aplikasi (`/public/logo.png`, `src/app/icon.png`, AppShell Desktop & Mobile, Landing Page Header & Footer, Auth Form).
- **Desain Responsif:** Layout AppShell dengan bottom nav di mobile, sidebar di desktop, dan Floating Action Button (FAB).

### B. Autentikasi & Keamanan (Authentication & Security)
- Register akun dengan enkripsi password (bcrypt).
- Login berbasis kredensial aman (Auth.js v5 / NextAuth).
- Logout session.
- Forgot & Reset Password menggunakan token bertenggat waktu (`PasswordResetToken`).
- Proteksi rute via `middleware.ts` untuk memastikan dashboard dan data pengguna aman dari akses ilegal.

### C. Manajemen Catatan (Notes CRUD & Archiving)
- **Create / Edit Note:** Editor teks kaya (*Rich Text Editor*) bertenaga TipTap yang mendukung checklist, formatting tebal/miring, dan heading.
- **Geolocation / Lokasi:** Deteksi koordinat GPS otomatis via browser, input nama tempat dan alamat, serta tombol *Buka di Maps*.
- **Upload Gambar:** Integrasi Supabase Storage Bucket (`journeylog-images`) untuk unggah gambar ganda per catatan dan penghapusan otomatis.
- **Arsip Catatan:** Memindahkan catatan yang sudah selesai ke halaman Arsip (`/notes/archived`) tanpa menghapus datanya secara permanen.
- **Pencarian & Filter Instan:** Filter berdasarkan kategori, tag, dan pencarian teks judul/konten *real-time*.

### D. Pengorganisasian (Categories & Tags)
- **Kategori Bawaan:** `Travel`, `Daily`, dan `Gym`.
- **Kategori Kustom:** Penambahan kategori mandiri melalui halaman Pengaturan (`/settings`).
- **Tag Fleksibel:** Pembuatan dan penyematan tag dinamis pada setiap catatan maupun kegiatan.

### E. Kalender & Manajemen Kegiatan (Calendar & Tasks)
- **Kalender Bulanan:** Tampilan jadwal berbasis `react-big-calendar` untuk memvisualisasikan kegiatan.
- **Tampilan Hari Ini (*Today*):** Fokus pada agenda dan tugas yang jatuh tempo hari ini.
- **Tampilan Mendatang (*Upcoming*):** Daftar tugas terjadwal berikutnya.
- **Sticky Wall:** Papan kartu catatan visual untuk tugas dan pengingat cepat.
- **Task Lists & Event Dialog:** Pembuatan daftar tugas khusus dan penambahan kegiatan dengan opsi tanggal mulai, tanggal selesai, dan *all-day event*.

### F. Dashboard Analitik
- Kartu total catatan keseluruhan.
- Distribusi jumlah catatan aktif per kategori (`Travel`, `Daily`, `Gym`, serta kategori kustom).
- Ringkasan catatan terbaru (*Recent Notes*) dengan akses langsung untuk membaca atau mengedit.

---

## 5. Arsitektur Basis Data (Database Design)

Sistem menggunakan database PostgreSQL yang dikelola melalui Prisma ORM dengan relasi berikut:

```
users
 ├── id (PK, Cuid)
 ├── name
 ├── email (Unique)
 ├── password (Hashed)
 └── created_at

categories
 ├── id (PK, Cuid)
 ├── user_id (FK -> users.id, Cascade)
 └── name (Unique per user)

tags
 ├── id (PK, Cuid)
 ├── user_id (FK -> users.id, Cascade)
 └── name (Unique per user)

notes
 ├── id (PK, Cuid)
 ├── user_id (FK -> users.id, Cascade)
 ├── category_id (FK -> categories.id, Cascade)
 ├── title
 ├── content (Text / Rich HTML)
 ├── location_name (String?)
 ├── location_address (String?)
 ├── latitude (Float?)
 ├── longitude (Float?)
 ├── is_archived (Boolean, default false)
 ├── created_at
 └── updated_at

note_tags (Relasi Many-to-Many Note & Tag)
 ├── note_id (FK -> notes.id, Cascade)
 └── tag_id (FK -> tags.id, Cascade)

note_images
 ├── id (PK, Cuid)
 ├── note_id (FK -> notes.id, Cascade)
 └── image_url (Supabase Storage URL)

task_lists
 ├── id (PK, Cuid)
 ├── user_id (FK -> users.id, Cascade)
 ├── name
 ├── color (String?)
 ├── created_at
 └── updated_at

tasks
 ├── id (PK, Cuid)
 ├── user_id (FK -> users.id, Cascade)
 ├── list_id (FK -> task_lists.id, SetNull)
 ├── title
 ├── description (Text?)
 ├── is_completed (Boolean, default false)
 ├── due_date (DateTime?)
 ├── start_date (DateTime?)
 ├── end_date (DateTime?)
 ├── all_day (Boolean, default false)
 ├── created_at
 └── updated_at

task_tags (Relasi Many-to-Many Task & Tag)
 ├── task_id (FK -> tasks.id, Cascade)
 └── tag_id (FK -> tags.id, Cascade)

password_reset_tokens
 ├── id (PK, Cuid)
 ├── email (Indexed)
 ├── token (Unique)
 ├── expires (DateTime)
 └── created_at
```

---

## 6. Tumpukan Teknologi (Tech Stack)

| Lapisan | Teknologi |
|---|---|
| **Framework Frontend** | Next.js 15 (App Router, Turbopack), React 19, TypeScript |
| **Styling & UI** | Tailwind CSS v4, Radix UI Primitives, Lucide React, Sonner Toast |
| **Rich Text** | TipTap StarterKit, TaskList, TaskItem |
| **Kalender** | React Big Calendar, Date-fns |
| **Backend & API** | Next.js Server Actions & Route Handlers |
| **Database & ORM** | PostgreSQL (Supabase / Neon), Prisma ORM v6 |
| **Autentikasi** | Auth.js (NextAuth v5), bcryptjs |
| **Penyimpanan Berkas** | Supabase Storage (Bucket: `journeylog-images`) |
| **Deployment** | Vercel Platform |

---

## 7. Peta Jalan Pengembangan (Future Roadmap - v1.2+)

- [ ] **AI Assistant Integration:** Ringkasan catatan otomatis (*AI Note Summary*) dan rekomendasi rencana perjalanan (*AI Travel Itinerary*).
- [ ] **Mood & Habit Tracker:** Pelacakan suasana hati harian serta kebiasaan positif dengan grafik statistik mingguan/bulanan.
- [ ] **Ekspor Data:** Fitur ekspor catatan ke format PDF atau Markdown portabel.
- [ ] **Mode Kolaborasi / Berbagi:** Opsi membuat tautan baca publik (*shareable public link*) untuk catatan perjalanan tertentu.
