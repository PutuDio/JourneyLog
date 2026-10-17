---
version: 1.1.0
name: JourneyLog Design System
description: >-
  JourneyLog adalah aplikasi web mobile-first untuk pencatatan jurnal, aktivitas perjalanan, progres gym,
  dan kalender kegiatan. Sistem desain mengadopsi prinsip "Soft Modernism"—menekankan kehangatan,
  aksesibilitas, kesederhanaan, dan visual yang rapi melalui estetika ramah dan palet warna teal khas.
logo:
  src: https://journey.cloud/_nuxt/icons/512x512.maskable.ba505b01.png
  local_path: /public/logo.png
  app_icon: /src/app/icon.png
  description: Ikon jurnal berlapis dengan aksen cyan/teal cerah dan buku kenangan putih.
  implementations:
    - target: src/app/layout.tsx
      usage: Metadata icons (favicon.ico / 512x512 png & apple-touch-icon)
    - target: src/components/layout/app-shell.tsx
      usage: Desktop sidebar branding (36x36px) dan mobile top navigation header (32x32px)
    - target: src/app/page.tsx
      usage: Landing page header branding (36x36px) dan footer branding (24x24px)
    - target: src/components/auth/auth-form.tsx
      usage: Formulir autentikasi login, register, forgot-password, reset-password (48x48px)
colors:
  surface: '#f5f7f8'
  surface-dim: '#e8ecef'
  surface-bright: '#ffffff'
  surface-container-lowest: '#f0f3f5'
  surface-container-low: '#eaeef2'
  surface-container: '#e5eaef'
  surface-container-high: '#dfe4e9'
  surface-container-highest: '#d9dee3'
  on-surface: '#171c1e'
  on-surface-variant: '#49454e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#f1f1f1'
  outline: '#79747e'
  outline-variant: '#c4c7c5'
  surface-tint: '#006b7b'
  primary: '#00687b'
  on-primary: '#ffffff'
  primary-container: '#b1e9ff'
  on-primary-container: '#001f2a'
  inverse-primary: '#5dd9ff'
  secondary: '#4a6278'
  on-secondary: '#ffffff'
  secondary-container: '#cce5ff'
  on-secondary-container: '#051f35'
  tertiary: '#d4a5d4'
  on-tertiary: '#3e2c3e'
  tertiary-container: '#f5d9f5'
  on-tertiary-container: '#160016'
  error: '#b3261e'
  on-error: '#ffffff'
  error-container: '#f9dedc'
  on-error-container: '#410e0b'
  primary-fixed: '#b1e9ff'
  primary-fixed-dim: '#7dd3f0'
  on-primary-fixed: '#001f2a'
  on-primary-fixed-variant: '#004d5c'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#b0ccf0'
  on-secondary-fixed: '#051f35'
  on-secondary-fixed-variant: '#334860'
  tertiary-fixed: '#f5d9f5'
  tertiary-fixed-dim: '#dab8db'
  on-tertiary-fixed: '#160016'
  on-tertiary-fixed-variant: '#5d4a5d'
  background: '#f5f7f8'
  on-background: '#171c1e'
  surface-variant: '#dfe4e9'
typography:
  display:
    fontFamily: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
    fontSize: 57px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: '-0.03em'
  headline-lg:
    fontFamily: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: '-0.02em'
  headline-md:
    fontFamily: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: '-0.01em'
  title-lg:
    fontFamily: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.02em
  body-md:
    fontFamily: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  container-max: 1280px
elevation:
  sm: 0 1px 3px rgba(0, 0, 0, 0.08)
  md: 0 3px 8px rgba(0, 0, 0, 0.15)
  lg: 0 8px 24px rgba(0, 0, 0, 0.12)
layout:
  containerMaxWidth: 1280px
  gridColumns: 12
---

# JourneyLog Design System Documentation

## 1. Overview & Brand Philosophy

**JourneyLog** mengusung filosofi desain *"Soft Modernism"*—perpaduan antara kesederhanaan fungsional minimalis modern dengan kehangatan visual yang ramah dan menenangkan. Desain ini bertujuan memberikan rasa aman, nyaman, dan teratur bagi pengguna dalam mencatat kenangan, perjalanan (*Travel*), aktivitas harian (*Daily*), latihan fisik (*Gym*), serta manajemen waktu & kegiatan (*Calendar & Tasks*).

### Brand Voice
- **Hangat & Bersahabat:** Ramah, mendukung, dan memotivasi tanpa berkesan kaku atau korporat.
- **Human-Centric:** Mengutamakan pengalaman pengguna bergerak (*mobile-first*), dengan tombol yang mudah ditekan (*touch-friendly*) dan navigasi yang intuitif.
- **Slogan:** *"Buat rumah untuk kenanganmu."*

---

## 2. Logo & Brand Asset

Logo resmi JourneyLog merepresentasikan buku harian dan dokumen berlapis dengan sudut melengkung ramah serta warna cyan/teal cerah yang dinamis.

| Properti | Detail |
|---|---|
| **File Sumber Asli** | `https://journey.cloud/_nuxt/icons/512x512.maskable.ba505b01.png` |
| **Penyimpanan Lokal** | `/public/logo.png` & `/src/app/icon.png` |
| **Format** | PNG (512x512, Maskable, Transparan/Background Sesuai) |
| **Titik Implementasi** | • App Shell Desktop Sidebar (`w-9 h-9`)<br>• App Shell Mobile Header (`w-8 h-8`)<br>• Landing Page Header (`w-9 h-9`) & Footer (`w-6 h-6`)<br>• Halaman Autentikasi (`w-12 h-12`)<br>• Favicon & Apple Touch Icon (`layout.tsx`) |

---

## 3. Palet Warna (Color System)

1. **Primary Teal (`#00687b` / computed `rgb(0, 104, 123)`):**
   - Warna tanda pengenal utama JourneyLog.
   - Digunakan pada elemen interaktif inti: Tombol utama, link aktif, FAB (Floating Action Button), tab aktif, dan status penting.
   - Hover state: `#004d5c`, Active state: `#003d47`.
2. **Primary Container (`#b1e9ff` / on-primary `#001f2a`):**
   - Digunakan untuk latar belakang badge, chip, dan indikator navigasi aktif.
3. **Surface & Background Stack:**
   - Background utama: `#f5f7f8`.
   - Card/Surface Bright: `#ffffff`.
   - Low surface / container: `#eaeef2` s.d. `#dfe4e9`.
4. **Kategori Khas:**
   - **Travel:** Biru lembut (`bg-[#e0f4ff] text-[#00687b]`) dengan ikon MapPin.
   - **Daily:** Hijau segar (`bg-[#d4f0d4] text-[#1b5e20]`) dengan ikon NotebookPen.
   - **Gym:** Oranye enerjik (`bg-[#ffe0cc] text-[#e65100]`) dengan ikon Dumbbell.

---

## 4. Tipografi (Typography)

Sistem menggunakan font **Roboto** dari `next/font/google` dengan integrasi CSS variable `--font-roboto` dan fallback sistem modern:
- **Display (Hero Headline):** 40px–57px, Bold (700), Line Height optimal.
- **Headlines (H1, H2, H3):** 24px–36px, Semi-Bold s.d. Bold.
- **Body Text:** 14px–16px, Regular (400) dengan kontras tinggi (`#171c1e` pada mode terang).
- **Label & Button:** 14px, Bold (700), Letter Spacing `0.02em`.

---

## 5. Komponen Utama & Pola Interaksi

### 5.1 AppShell Layout (Navigasi Responsif)
- **Desktop (md ke atas):** Sidebar kiri tetap (lebar 72 / 288px) berisi Logo JourneyLog, ucapan salam pengguna, daftar navigasi utama (Dashboard, Catatan, Kalender, Arsip, Pengaturan), dan tombol Keluar (Logout).
- **Mobile (layar < md):** 
  - Sticky Top Header dengan Logo + Judul + Nama User.
  - Bottom Bar navigasi dengan ikon ringkas untuk kemudahan navigasi satu jempol.
  - Floating Action Button (FAB) bulat di sudut kanan bawah untuk cepat membuat catatan baru (`/notes/new`).

### 5.2 Catatan (Notes & Rich Editor)
- Dilengkapi TipTap Rich Text Editor (formatting, task list / checklist).
- Geolocation bar untuk deteksi lokasi otomatis via GPS (`navigator.geolocation`), input nama tempat/alamat manual, dan tautan langsung ke Google Maps.
- Multi-image upload terintegrasi Supabase Storage dengan preview instan dan tombol hapus.

### 5.3 Kalender & Manajemen Aktivitas (Tasks)
- Tampilan multi-view: Kalender Bulanan (`react-big-calendar`), Tampilan Hari Ini (*Today*), Tampilan Mendatang (*Upcoming*), dan Dinding Catatan Tempel (*Sticky Wall*).
- Sidebar aktivitas untuk filter berdasarkan daftar kegiatan (*Task Lists*) dan label (*Tags*).
- Dialog pembuatan kegiatan cepat (*Add Event Dialog*) dengan pemilihan tanggal mulai, selesai, dan flag *all-day*.

### 5.4 Pengaturan Kustom (Settings)
- Pengelolaan kategori kustom dan tag pengguna dengan feedback visual toast (*sonner*).

---

## 6. Pedoman Desain (Do's and Don'ts)

### Do:
- Gunakan warna teal primary (`#00687b`) secara konsisten untuk aksi utama.
- Berikan radius melengkung ramah (`rounded-xl` atau `rounded-2xl` untuk cards, `rounded-full` untuk button utama dan pills).
- Tampilkan logo JourneyLog di setiap entry point utama (landing page, auth, dan app layout).
- Gunakan transisi halus (`transition-all duration-200`) dan elevasi bayangan lembut (`shadow-sm`, `shadow-md`, `shadow-lg`).

### Don't:
- Jangan gunakan sudut tajam kaku (`rounded-none`) pada tombol dan container interaktif.
- Jangan gunakan bayangan hitam pekat atau garis batas hitam gelap yang merusak nuansa *soft modernism*.
- Jangan hilangkan padding yang memadai pada tampilan mobile.
