# Medivita — Rekam Medis Jalan

Platform rekam medis digital portable berbasis QR code yang aman, terenkripsi, dan sepenuhnya dikendalikan oleh pasien. Memungkinkan data kesehatan esensial pasien — golongan darah, alergi, penyakit kronis, obat rutin — diakses secara instan oleh fasilitas kesehatan (faskes) mana pun secara real-time melalui pemindaian QR code yang aman.

## Daftar Isi
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Environment Variables](#environment-variables)
- [Setup Awal & Menjalankan Aplikasi](#setup-awal--menjalankan-aplikasi)
- [Keamanan & Enkripsi Data](#keamanan--enkripsi-data)

---

## Fitur Utama

### 1. Portal Pasien (Soft Blue Theme )
* **Pendaftaran Pasien Baru**: Registrasi akun terenkripsi dengan menyertakan kredensial akun dan data medis esensial (golongan darah, alergi, riwayat penyakit kronis, obat rutin).
* **QR Code Dinamis**: Pembuatan QR code pasien secara real-time berbasis JWT token bertanda tangan kriptografis.
* **Unduh QR Code**: Mengunduh file QR code sebagai berkas gambar PNG secara lokal untuk dicetak atau disimpan di galeri handphone.
* **Pengaturan Privasi**: Kontrol penuh pasien untuk membagikan data rekam medis, ekspor data pasien (PDF/JSON), atau menghapus data secara permanen.
* **Log Akses Transparan (Audit Trail)**: Riwayat lengkap siapa, kapan, dan dari instansi mana data rekam medis pasien diakses.
* **Riwayat Kunjungan**: Lini masa lengkap catatan pengobatan pasien di berbagai faskes.

### 2. Portal Petugas Medis / Tim Medis (Teal/Green Theme )
* **Pemindai QR Code**: Menggunakan kamera perangkat untuk memindai QR code pasien secara instan.
* **Lookup Pasien Manual**: Pencarian alternatif menggunakan nomor NIK dan PIN Cadangan 6-digit jika pasien tidak membawa QR code.
* **Tampilan Dekripsi Medis**: Informasi detail mengenai riwayat penyakit kronis, alergi obat, dan kontak darurat pasien.
* **Input Kunjungan Baru**: Pengisian data diagnosis klinis, catatan penanganan medis, dan resep obat yang langsung masuk ke lini masa rekam medis pasien.
* **Tutup Berkas (Session Lock)**: Tombol sekali klik untuk mengunci layar dan membersihkan berkas dekripsi medis dari layar komputer saat pasien selesai dilayani.
* **Tim Medis (Coworkers Directory)**: Daftar rekan sejawat sesama tenaga kesehatan terdaftar yang bertugas di fasilitas kesehatan yang sama.
* **Audit Log Nakes**: Pencatatan aktivitas pembacaan dan penulisan data medis demi kepatuhan hukum dan regulasi kesehatan.

---

## Tech Stack

| Komponen | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Styling** | Vanilla CSS + Tailwind CSS (Bekerja responsif di Mobile & Desktop) |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma ORM |
| **Kriptografi** | AES-256-GCM (Node.js `crypto` untuk data medis) |
| **Autentikasi** | JSON Web Token (JWT) + `bcryptjs` untuk hashing password |
| **QR Code** | `qrcode` (generate) + `html5-qrcode` (scan sisi client) |

---

## Struktur Proyek

```text
├── app/
│   ├── page.tsx                    # Landing page utama
│   ├── daftar/                     # Halaman registrasi pasien baru
│   ├── login/                      # Halaman login dual-role (Pasien & Petugas)
│   ├── pasien/                     # Halaman khusus portal pasien (Blue)
│   │   ├── dashboard/              # QR Code, unduh QR, dan rangkuman medis
│   │   ├── access-log/             # Audit log akses nakes ke data pasien
│   │   ├── pengaturan-privasi/     # Ekspor, hapus akun, dan kendali data
│   │   ├── pengaturan-profil/      # Ubah info profil pasien
│   │   ├── profil-medis/           # Detil rekam medis terenkripsi
│   │   └── riwayat-kunjungan/      # Lini masa kunjungan berobat
│   ├── petugas/                    # Halaman khusus portal petugas (Teal)
│   │   ├── dashboard/              # Lookup pasien, input kunjungan, tren penyakit
│   │   ├── history/                # Audit log aktivitas sesi petugas
│   │   ├── scan/                   # Scanner kamera QR Code
│   │   ├── settings/               # Ganti password & profil petugas
│   │   └── workers/                # Daftar rekan kerja ("Tim Medis")
│   └── api/                        # REST API endpoints (Auth, Pasien, Kunjungan, Log)
├── components/
│   ├── auth/                       # Formulir Login
│   ├── landing/                    # Komponen Landing Page (Hero, Features, CTA, Footer)
│   ├── pasien/                     # Navigasi & elemen portal pasien
│   ├── petugas/                    # Formulir, riwayat kunjungan, lookup nakes
│   └── ui/                         # Ikonografi terintegrasi
├── lib/
│   ├── encryption.ts               # Utilitas Enkripsi & Dekripsi AES-256-GCM
│   ├── qr.ts                       # Helper generator JWT token QR
│   ├── auth.ts                     # Helper verifikasi session
│   └── format.ts                   # Formatting teks (NIK, ID, dll.)
└── prisma/
    └── schema.prisma               # Skema Database PostgreSQL (Pasien, Petugas, Kunjungan, Log)
```

---

## Environment Variables

Salin `.env.example` menjadi `.env` dan isi nilai variabel berikut:

```env
# URL koneksi database PostgreSQL (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# Kunci rahasia enkripsi AES-256-GCM (64 karakter hex)
ENCRYPTION_KEY="kunci_rahasia_hex_anda"

# Secret token JWT untuk otentikasi sesi
JWT_SECRET="secret_jwt_anda"

# URL aplikasi (untuk data payload QR)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Setup Awal & Menjalankan Aplikasi

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npm run db:generate
```

### 3. Jalankan Migrasi Database
```bash
npm run db:migrate
```

### 4. Jalankan Server Development
```bash
npm run dev
```
Akses aplikasi melalui browser di [http://localhost:3000](http://localhost:3000).

### 5. Build untuk Production
```bash
npm run build
npm run start
```

---

## Keamanan & Enkripsi Data

Untuk menjamin privasi pasien secara maksimal, Medivita menggunakan pendekatan **Zero-Knowledge** untuk data kesehatan sensitif:
1. **AES-256-GCM**: Data medis (Alergi, Penyakit Kronis, Obat Rutin) dienkripsi sebelum masuk ke database menggunakan kunci rahasia unik (`ENCRYPTION_KEY`).
2. **Kriptografi QR Token**: QR Code pasien tidak berisi data rekam medis polos, melainkan sebuah token JWT bertanda tangan digital yang hanya dapat didekripsi oleh petugas medis yang terotentikasi di faskes resmi dalam masa berlaku yang singkat.
3. **Session State Cleaning**: Sesi pembacaan rekam medis dilindungi oleh tombol **"Tutup Berkas"** untuk memastikan tidak ada cache data pasien yang tertinggal di perangkat nakes setelah pelayanan selesai.
