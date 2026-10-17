# ROCTR - Frontend Development (JourneyLog)

## 1. Role (Peran)
* **Frontend Developer / UI-UX Engineer**

---

## 2. Objective (Tujuan)
Membangun antarmuka pengguna (*user interface*) yang berfokus pada pengalaman *mobile-first*, bersih, interaktif, responsif lintas ukuran layar (Mobile, Tablet, Desktop), serta memancarkan identitas visual yang profesional melalui integrasi Logo resmi dan sistem desain *Soft Modernism*.

---

## 3. Context (Konteks)
Frontend dikembangkan menggunakan Next.js 15 (App Router), Tailwind CSS v4, dan komponen berbasis Radix UI / shadcn pattern. Frontend mengonsumsi data secara langsung dari Next.js Server Actions dengan performa transisi instan dan penanganan state yang mulus.

---

## 4. Tasks & Sprint Completion (Status Pengerjaan Frontend)

### Sprint 1: Setup, UI Fondasi & Identitas Brand
* [x] **Setup Project:** Inisialisasi Next.js 15 dengan TypeScript, Tailwind CSS v4, dan path alias `@/*`.
* [x] **Design System & Logo Branding:**
  - Setup palet warna bertema teal primary (`#00687b`), surface layers, dan typography Roboto.
  - Unduh dan integrasikan logo resmi JourneyLog ke `/public/logo.png` dan `/src/app/icon.png`.
  - Pasang logo di header & footer landing page, sidebar desktop, sticky header mobile, dan form autentikasi.
* [x] **Halaman Autentikasi:** Form terpadu untuk Login, Register, Forgot Password, dan Reset Password dengan validasi form serta notifikasi toast (*sonner*).

### Sprint 2: Dashboard & Tata Letak Global (Layouting)
* [x] **AppShell Navigation:**
  - Sidebar desktop dengan logo, salam personalisasi nama user, menu aktif, dan tombol logout.
  - Header sticky mobile dengan logo JourneyLog dan navigasi bottom bar yang ramah ibu jari (*one-thumb navigation*).
  - Floating Action Button (FAB) untuk pembuatan catatan cepat (`/notes/new`).
* [x] **UI Dashboard Utama:**
  - Kartu total catatan global.
  - Kartu catatan per kategori (Travel, Daily, Gym) dengan indikator warna dan ikon khusus.
  - Daftar catatan terbaru (*Recent Notes*) dengan tampilan kartu interaktif.

### Sprint 3: Manajemen Catatan & Editor Kaya (Notes UI)
* [x] **Rich Text Editor (TipTap):** Integrasi TipTap StarterKit dengan dukungan format teks (bold, italic, strike, bullet list, ordered list) dan daftar centang (*task item / checklist*).
* [x] **Geolocation & Lokasi:**
  - Tombol deteksi koordinat GPS otomatis pengguna (`navigator.geolocation`).
  - Input nama tempat dan alamat lokasi.
  - Tautan langsung "Buka di Maps" (*Google Maps link*).
* [x] **Upload Gambar (Supabase Storage):**
  - Preview instan gambar sebelum dan sesudah diunggah.
  - Tombol hapus gambar dengan feedback visual.
* [x] **Pencarian & Filter Instan:** Bar pencarian instan pada halaman catatan dengan penyaringan kategori dan tag.

### Sprint 4: Kalender, Manajemen Kegiatan & Pengaturan
* [x] **Modul Kalender (`/calendar`):**
  - Tampilan Kalender Bulanan interaktif berbasis `react-big-calendar`.
  - Tampilan Hari Ini (*Today View*) untuk fokus harian.
  - Tampilan Mendatang (*Upcoming View*) untuk agenda terjadwal.
  - Tampilan Dinding Catatan Tempel (*Sticky Wall View*) untuk visualisasi cepat.
* [x] **Sidebar Kegiatan & Dialog Kegiatan:**
  - Pembuatan TaskList dan kategori kegiatan.
  - Dialog tambah agenda (*Add Event Dialog*) dengan rentang tanggal dan status *all-day*.
* [x] **Halaman Pengaturan (`/settings`):** Form pembuatan kategori kustom dan tag baru.
* [x] **Responsivitas & State:** Desain bebas scroll horizontal liar, state pending via React `useTransition`, dan toast konfirmasi.

---

## 5. Result (Hasil yang Dicapai)
Seluruh halaman web (Landing Page, Autentikasi, Dashboard, Notes Editor, Kalender Kegiatan, Arsip, dan Pengaturan) selesai diimplementasikan secara komprehensif, responsif di semua perangkat, dan mengintegrasikan logo resmi JourneyLog secara konsisten.
