# ROCTR - Frontend Development (JourneyLog)

## 1. Role (Peran)
* **Frontend Developer / UI Engineer**

## 2. Objective (Tujuan)
Membangun antarmuka pengguna (*user interface*) yang *mobile-first*, bersih, interaktif, dan responsif (mendukung Mobile, Tablet, Desktop) menggunakan Next.js, Tailwind CSS, dan komponen shadcn/ui dengan *initial page load* < 3 detik.

## 3. Context (Konteks)
Frontend akan mengonsumsi data dari Next.js Server Actions dan Route Handlers. Fokus utama adalah pada kemudahan input catatan oleh pengguna yang sedang bergerak (di tempat gym atau saat traveling).

## 4. Tasks (Daftar Tugas Frontend)

### Sprint 1: Setup & UI Fondasi
* [ ] **Setup Project:** Inisialisasi Next.js dengan TypeScript, Tailwind CSS, dan konfigurasi path alias.
* [ ] **Design System:** Install dan setup `shadcn/ui`. Atur tema warna utama aplikasi.
* [ ] **Halaman Autentikasi:** Buat UI untuk halaman Register, Login, dan Forgot Password (form validation menggunakan Zod/React Hook Form).

### Sprint 2: Dashboard & Layouting
* [ ] **Global Layout:** Buat *sidebar/bottom navigation* khusus mobile yang intuitif.
* [ ] **UI Dashboard Utama:** Implementasikan komponen kartu (*cards*) untuk menampilkan:
  * Total Catatan Global
  * Total Catatan per Kategori (Travel, Daily, Gym)
  * Daftar Catatan Terbaru (*Recent Notes*)

### Sprint 3: Manajemen Catatan (Notes UI)
* [ ] **Rich Text Editor:** Implementasikan text editor (misal menggunakan TipTap / Editor.js) untuk mendukung pembuatan daftar *checklist* atau tabel latihan gym dasar.
* [ ] **Form Input Catatan:** Buat modal/halaman untuk memilih Kategori, menambah Judul, menginput Tag, dan tombol unggah Gambar.
* [ ] **Komponen Search & Filter:** Buat bar pencarian instan pada bagian atas halaman yang memiliki filter berdasarkan Tag dan Kategori.

### Sprint 4: Finishing UI
* [ ] **Uji Responsivitas:** Pastikan semua komponen tidak patah/berantakan saat dibuka di layar smartphone berukuran kecil.
* [ ] **State Handling:** Tambahkan efek *loading skeletons* untuk transisi halaman dan notifikasi *toast* sukses/gagal saat CRUD data.

## 5. Result (Hasil yang Diharapkan)
Seluruh halaman web (Auth, Dashboard, Editor Catatan) selesai dibuat dengan performa yang cepat dan siap dihubungkan dengan fungsi backend.