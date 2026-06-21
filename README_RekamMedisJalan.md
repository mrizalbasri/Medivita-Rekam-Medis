# Rekam Medis Jalan

Platform rekam medis digital portable berbasis QR code, dibangun untuk kompetisi **PekanIT 2026** (subtema Kesehatan & Kesejahteraan Masyarakat). Memungkinkan data kesehatan esensial pasien — golongan darah, alergi, penyakit kronis, obat rutin — diakses cepat oleh fasilitas kesehatan manapun, dengan kontrol akses penuh di tangan pasien.

## Daftar Isi

- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Pembagian Peran Tim](#pembagian-peran-tim)
- [Setup Awal](#setup-awal)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Skema Database](#skema-database)
- [Environment Variables](#environment-variables)
- [Status Implementasi](#status-implementasi)
- [Skrip Tersedia](#skrip-tersedia)

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Basis Data | PostgreSQL (Supabase) via Prisma ORM |
| Enkripsi | AES-256-GCM (Node.js `crypto`, lihat `src/lib/encryption.ts`) |
| Autentikasi | JWT (`jsonwebtoken`) + `bcryptjs` untuk hashing password |
| QR Code | `qrcode` (generate) + `html5-qrcode` (scan di sisi klien) |
| Validasi | `zod` |

## Struktur Proyek

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── pasien/
│   │   ├── daftar/page.tsx       # Form registrasi pasien
│   │   └── dashboard/            # TODO: dashboard pasien (QR, riwayat, log akses)
│   ├── petugas/
│   │   ├── login/page.tsx        # Form login petugas faskes
│   │   ├── scan/                 # TODO: halaman scan QR pasien
│   │   └── dashboard/            # TODO: dashboard petugas (ringkasan pasien, tambah kunjungan)
│   └── api/
│       ├── pasien/daftar/route.ts    # POST — registrasi pasien
│       ├── pasien/[id]/               # TODO: GET detail pasien
│       ├── akses/mulai/route.ts       # POST — mulai sesi akses (scan QR)
│       ├── akses/cabut/route.ts       # POST — pasien cabut akses
│       ├── kunjungan/route.ts         # POST — tambah riwayat kunjungan
│       └── auth/login/                # TODO: POST login petugas
├── components/
│   ├── ui/                       # TODO: komponen Shadcn UI
│   ├── pasien/                   # TODO: komponen khusus halaman pasien
│   └── petugas/                  # TODO: komponen khusus halaman petugas
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── encryption.ts             # Helper AES-256-GCM
│   ├── qr.ts                     # Generate QR token & data URL
│   └── auth.ts                   # Hash password & JWT session
├── hooks/                        # TODO: custom React hooks
└── types/index.ts                # Tipe data bersama

prisma/
└── schema.prisma                 # Skema database (Pasien, PetugasFaskes, RiwayatKunjungan, TokenAkses, LogAkses)
```

Folder dan file bertanda `TODO` adalah bagian yang sengaja dikosongkan/disederhanakan sebagai titik awal pengembangan tim — lihat komentar `// TODO` di tiap file untuk detail apa yang perlu dilengkapi.

## Pembagian Peran Tim

Sesuai proposal, pembagian tanggung jawab per sprint:

| Anggota | Peran | Fokus area di kode |
|---|---|---|
| Ketua Tim | API & Security Lead | `src/lib/encryption.ts`, `src/lib/auth.ts`, `src/app/api/**`, `prisma/schema.prisma` |
| Anggota 1 | UI/UX & Frontend | `src/app/pasien/**`, `src/app/petugas/**`, `src/components/**`, prototipe Figma |
| Anggota 2 | Integrasi, QA & Dokumentasi | Integrasi scan QR (`html5-qrcode`), mode offline-first (PWA), testing, README |

## Setup Awal

### Prasyarat

- Node.js 20 atau lebih baru
- Akun [Supabase](https://supabase.com) (gratis) untuk database PostgreSQL
- Git

### Langkah Setup

1. **Clone repositori**
   ```bash
   git clone <url-repositori-tim>
   cd rekam-medis-jalan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Buat file environment**
   ```bash
   cp .env.example .env
   ```
   Lalu isi setiap variabel — lihat detail di [Environment Variables](#environment-variables).

4. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

5. **Buat tabel di database** (setelah `DATABASE_URL` diisi dengan koneksi Supabase)
   ```bash
   npm run db:migrate
   ```
   Perintah ini akan membuat migrasi pertama dan langsung menerapkannya ke database.

## Menjalankan Aplikasi

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Landing page menyediakan dua jalur: **Daftar sebagai Pasien** dan **Masuk sebagai Petugas Faskes**.

Untuk melihat isi database secara visual:
```bash
npm run db:studio
```

## Skema Database

Lihat `prisma/schema.prisma` untuk definisi lengkap. Ringkasan model:

- **Pasien** — identitas, data kesehatan esensial, `qrToken` unik, `kodeCadangan` (fallback 6 digit)
- **PetugasFaskes** — akun petugas fasilitas kesehatan
- **RiwayatKunjungan** — entri kunjungan/diagnosis yang ditambahkan petugas
- **TokenAkses** — token sementara yang dibuat saat QR pasien dipindai, kedaluwarsa otomatis (default 24 jam), bisa dicabut manual oleh pasien
- **LogAkses** — jejak setiap akses data pasien (transparansi ke pasien)

Setiap kali skema diubah, jalankan ulang:
```bash
npx prisma migrate dev --name <nama_perubahan>
```

## Environment Variables

| Variabel | Keterangan | Cara mendapatkan |
|---|---|---|
| `DATABASE_URL` | Connection string PostgreSQL | Supabase Dashboard → Project Settings → Database → Connection string (gunakan mode "Transaction" untuk Prisma) |
| `ENCRYPTION_KEY` | Kunci AES-256-GCM, 64 karakter hex | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `JWT_SECRET` | Secret untuk menandatangani session token | String acak yang panjang, mis. hasil `openssl rand -hex 32` |
| `NEXT_PUBLIC_APP_URL` | URL aplikasi (dipakai pada payload QR) | `http://localhost:3000` saat development, URL Vercel saat production |

**Penting:** jangan pernah commit file `.env` ke Git. File ini sudah masuk `.gitignore` bawaan Next.js.

## Status Implementasi

Checklist berikut mengikuti pembagian sprint di proposal — update sesuai progres tim:

- [x] Setup proyek Next.js + Tailwind + Prisma
- [x] Skema database awal
- [x] Helper enkripsi AES-256-GCM
- [x] Helper QR token & generate QR
- [x] Helper auth (hash password, JWT)
- [x] API stub: registrasi pasien, mulai akses, cabut akses, tambah kunjungan
- [x] Halaman landing & form registrasi pasien (UI dasar)
- [ ] Validasi input dengan `zod` di setiap API route
- [ ] Endpoint login petugas (`/api/auth/login`) + middleware proteksi route
- [ ] Halaman dashboard pasien (lihat QR, riwayat, log akses, cabut akses)
- [ ] Halaman scan QR + dashboard petugas (ringkasan pasien, tambah kunjungan)
- [ ] Integrasi `html5-qrcode` untuk scan dari kamera
- [ ] Mode offline-first (Service Worker, IndexedDB, sinkronisasi)
- [ ] Deployment ke Vercel
- [ ] Prototipe Figma final + tangkapan layar untuk proposal

## Skrip Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server development |
| `npm run build` | Build untuk production |
| `npm run start` | Menjalankan hasil build (production) |
| `npm run lint` | Menjalankan ESLint |
| `npm run db:generate` | Generate Prisma Client dari schema |
| `npm run db:migrate` | Membuat & menerapkan migrasi database |
| `npm run db:studio` | Membuka Prisma Studio (GUI database) |

---

Dikembangkan oleh tim untuk **PekanIT 2026** — President University Pekanbaru.
