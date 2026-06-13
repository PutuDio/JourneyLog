Berikut adalah dokumen **Product Requirement Document (PRD) JourneyLog** versi final yang sudah rapi.

---

# Product Requirement Document (PRD) – JourneyLog

* **Nama Produk:** JourneyLog


* **Versi:** 1.0 (Draft)


* **Status:** Draft


* **Product Owner:** Putu Dio



---

## 1. Ringkasan Eksekutif (Product Overview)

**JourneyLog** adalah aplikasi web yang membantu pengguna mencatat aktivitas perjalanan, aktivitas harian, dan progres olahraga dalam satu platform yang sederhana dan mudah digunakan. Aplikasi ini dirancang dengan fokus pada pengalaman *mobile-first* sehingga dapat digunakan dengan nyaman saat bepergian, bekerja, maupun berolahraga.

### Masalah yang Diselesaikan (Problem Statement)

Pengguna saat ini sering menggunakan banyak aplikasi berbeda untuk:

* Menulis catatan harian.


* Menyimpan pengalaman perjalanan.


* Melacak aktivitas gym.


* Menyimpan foto aktivitas.



Hal ini membuat informasi menjadi tersebar dan sulit dicari kembali ketika dibutuhkan. JourneyLog bertujuan menggabungkan semua kebutuhan tersebut ke dalam satu aplikasi yang terorganisir.

---

## 2. Tujuan & Metrik Keberhasilan (Goals & Metrics)

### Tujuan Bisnis (Business Goals)

* Membangun aplikasi portofolio *full-stack* modern.


* Menunjukkan kemampuan berpikir produk (*product thinking*).


* Menjadi proyek nyata yang dapat digunakan oleh pengguna asli.



### Tujuan Pengguna (User Goals)

* Menyimpan catatan dengan cepat.


* Mengelompokkan aktivitas berdasarkan kategori.


* Melihat histori aktivitas.


* Menemukan kembali informasi dengan mudah.



### Metrik Keberhasilan MVP (Success Metrics)

Aplikasi dinilai sukses di fase MVP jika pengguna dapat melakukan fungsi inti berikut dengan lancar:

* Membuat akun.


* Membuat, mengedit, menghapus, dan mencari catatan.


* Mengunggah gambar ke dalam catatan.



---

## 3. Persona Pengguna (Target Users)

### 1. Traveler

* **Karakteristik:** Sering bepergian, menyimpan *itinerary*, dan suka menulis pengalaman perjalanan.


* **Kebutuhan:** Jurnal perjalanan (*travel journal*), penyimpanan lokasi, dan dokumentasi foto.



### 2. Daily Activity User

* **Karakteristik:** Memiliki aktivitas rutin, menulis catatan pribadi, dan membuat daftar tugas (*to-do*).


* **Kebutuhan:** Catatan harian (*daily notes*), jurnal harian, dan pencatatan aktivitas rutin.



### 3. Gym Enthusiast

* **Karakteristik:** Rutin berolahraga dan ingin melacak progres latihan mereka.


* **Kebutuhan:** Pelacakan latihan (*workout tracking*), riwayat latihan, dan pelacakan perkembangan tubuh (*body progress*).



---

## 4. Cakupan Fitur (Product Scope)

### Termasuk dalam MVP (In Scope)

#### A. Autentikasi (Authentication)

* Register (Pendaftaran akun baru).


* Login (Masuk akun).


* Logout (Keluar akun).


* Forgot Password (Lupa kata sandi).



#### B. Manajemen Catatan (Notes CRUD)

* Create Note (Membuat catatan baru).


* Read Note (Melihat isi catatan).


* Update Note (Mengubah/mengedit catatan).


* Delete Note (Menghapus catatan).


* Archive Note (Mengarsipkan catatan agar dashboard tetap bersih).



#### C. Pengorganisasian (Categories & Tags)

* **Kategori Default Sistem:** `Travel`, `Daily`, dan `Gym`.


* **Kategori Kustom:** Pengguna dapat mendefinisikan/membuat kategori sendiri.


* **Sistem Tag:** Pengguna dapat membuat, menghapus, dan menyematkan tag pada catatan.



#### D. Pencarian & Filter (Search)

* Pencarian teks instan berdasarkan: Judul, Isi catatan, Tag, dan Kategori.



#### E. Unggah Gambar (Image Upload)

* Mengunggah dan menghapus gambar di dalam catatan untuk dokumentasi visual.



#### F. Dashboard Utama

* Menampilkan ringkasan berupa: Total seluruh catatan, total catatan per kategori (`Travel`, `Daily`, `Gym`), serta daftar catatan terbaru (*Recent Notes*).



---

### Tidak Termasuk dalam MVP (Out of Scope)

Fitur-fitur berikut ditunda dan **tidak akan dibuat** pada fase pertama:

* Fitur Sosial & Chat (Berbagi catatan, *follow* pengguna lain).


* Asisten AI (*AI Summary*, *AI Travel Generator*).


* Mode Offline (*Offline Mode*).


* Ekspor catatan ke PDF.


* Tampilan Kalender (*Calendar View*).


* Fitur Pelacak Kebiasaan & Suasana Hati (*Habit & Mood Tracker*).



---

## 5. Kebutuhan Fungsional (Functional Requirements)

### Struktur Data Entitas (Fields)

#### 1. Autentikasi

* **Register:** Nama, Email, Password.


* **Login:** Email, Password.



#### 2. Catatan (Notes)

Setiap catatan wajib memiliki struktur data sebagai berikut:

* Judul (*Title*)


* Isi (*Content*)


* Kategori (*Category*)


* Tag (*Tags*)


* Gambar (*Images*)


* Waktu Dibuat (*Created At*)


* Waktu Diperbarui (*Updated At*)



---

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)

* **Performa (Performance):**
* Waktu muat halaman pertama (*initial page load*) harus di bawah 3 detik.


* Respon pencarian (*search response*) harus di bawah 500 milidetik.




* **Keamanan (Security):**
* Keamanan kata sandi menggunakan metode *hashing*.


* Pembatasan akses halaman (*protected routes*) untuk pengguna yang belum login.


* Proteksi dari serangan CSRF dan pembatasan laju *request* (*rate limiting*).




* **Ketersediaan (Availability):** Sistem menjamin tingkat *uptime* hingga 99%.


* **Responsivitas (Responsive):** Tampilan web wajib mendukung penuh perangkat *Mobile*, *Tablet*, hingga *Desktop* (diutamakan optimasi *mobile-first*).



---

## 7. Desain Database (Database Design)

Berikut adalah relasi antar tabel database (PostgreSQL) yang dirancang untuk mendukung sistem MVP:

```
users
 ├── id (PK)
 ├── name
 ├── email
 ├── password
 └── created_at

categories
 ├── id (PK)
 ├── user_id (FK -> users.id)
 └── name

tags
 ├── id (PK)
 ├── user_id (FK -> users.id)
 └── name

notes
 ├── id (PK)
 ├── user_id (FK -> users.id)
 ├── category_id (FK -> categories.id)
 ├── title
 ├── content
 ├── is_archived
 ├── created_at
 └── updated_at

note_tags (Tabel Relasi Many-to-Many)
 ├── note_id (FK -> notes.id)
 └── tag_id (FK -> tags.id)

note_images
 ├── id (PK)
 ├── note_id (FK -> notes.id)
 └── image_url

```

---

## 8. Tumpukan Teknologi (Tech Stack)

* **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui.


* **Backend:** Next.js Server Actions & Route Handlers.


* **Database:** PostgreSQL.


* **ORM:** Prisma.


* **Authentication:** Auth.js.


* **Storage (Gambar):** Supabase Storage.


* **Hosting/Deployment:** Vercel.



---

## 9. Peta Jalan Masa Depan (Future Roadmap)

### Versi 1.1

* Fitur log latihan olahraga yang terstruktur (*Workout Log*).


* Template jurnal khusus untuk perjalanan (*Travel Journal Template*).


* Halaman statistik catatan (*Notes Statistics*).



### Versi 1.2

* Tampilan berbasis Kalender (*Calendar View*).


* Fitur pelacak kebiasaan (*Habit Tracker*).


* Fitur pelacak suasana hati (*Mood Tracker*).



### Versi 2.0 (AI Integration)

* Ringkasan catatan otomatis bertenaga AI (*AI Summary*).


* Pencarian pintar menggunakan pemrosesan bahasa alami (*AI Search*).


* Pembuat catatan rencana perjalanan otomatis (*AI Travel Notes Generator*).



---

## 10. Kriteria Rilis MVP (Release Criteria)

Produk dinyatakan siap untuk diluncurkan ke tahap produksi apabila:

1. Sistem Autentikasi berjalan dengan baik dan aman.


2. Fungsi utama CRUD Catatan beroperasi tanpa *bug*.


3. Fitur pencarian berfungsi cepat sesuai batas performa yang ditentukan.


4. Proses unggah dan hapus gambar di Supabase Storage berhasil.


5. Layout responsif saat diuji di handphone maupun komputer.


6. Aplikasi sukses di-deploy dan dapat diakses publik melalui Vercel.