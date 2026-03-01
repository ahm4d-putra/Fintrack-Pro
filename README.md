```markdown
# FinTrack Pro

Personal finance tracker untuk mengelola keuangan dengan lebih mudah. Proyek ini berawal dari kebutuhan pencatatan sederhana, kemudian berkembang menjadi aplikasi web dengan database.

## Deskripsi

FinTrack Pro dibangun menggunakan vanilla JavaScript dan Supabase. Fitur utama yang tersedia:

- Dashboard Visual - Menampilkan ringkasan pemasukan, pengeluaran, dan saldo dalam bentuk chart
- Manajemen Transaksi - Menambah, mengedit, dan menghapus transaksi dengan kategori
- Filter & Pencarian - Mencari transaksi berdasarkan tanggal, kategori, atau nama
- Peringatan Budget - Notifikasi saat pengeluaran mendekati batas yang ditentukan
- Dark Mode - Tampilan nyaman untuk penggunaan di malam hari
- Export CSV - Mengunduh data untuk keperluan laporan atau backup

## Teknologi

- Frontend: HTML, CSS, Vanilla JavaScript
- Database: Supabase (PostgreSQL)
- Charting: Chart.js
- Icons: Phosphor Icons

## Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/username/fintrack-pro.git
cd fintrack-pro
```

### 2. Konfigurasi Supabase
- Buat project baru di [supabase.com](https://supabase.com)
- Jalankan SQL berikut di SQL Editor:

```sql
create table transactions (
  id bigint generated always as identity primary key,
  user_id uuid default '00000000-0000-0000-0000-000000000001',
  name text not null,
  amount decimal not null,
  type text check (type in ('income', 'expense')) not null,
  category text not null,
  date date not null,
  created_at timestamp with time zone default now()
);

alter table transactions disable row level security;
```

### 3. Konfigurasi Environment
Edit file `assets/js/config/supabase.js`:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

### 4. Menjalankan Aplikasi
Buka file `index.html` di browser, atau gunakan live server:
```bash
npx live-server
```

## Fitur Tersedia

- [x] CRUD transaksi dengan sinkronisasi real-time
- [x] Pie chart untuk distribusi pengeluaran
- [x] Bar chart untuk trend bulanan
- [x] Filter berdasarkan tanggal, kategori, dan tipe
- [x] Pencarian transaksi
- [x] Toggle dark mode
- [x] Export data ke CSV
- [x] Peringatan budget

## Roadmap

- [ ] Implementasi autentikasi pengguna
- [ ] Dukungan multi-currency
- [ ] Transaksi berulang
- [ ] Progressive Web App

## Tentang Proyek

Proyek ini dikembangkan sebagai portfolio sekaligus untuk memperdalam pemahaman vanilla JavaScript. Tanpa menggunakan framework, sehingga fundamental JavaScript dapat dipelajari dengan lebih baik.

## Kontribusi

Kontribusi terbuka untuk fitur baru atau perbaikan bug. Pull request dapat diajukan melalui GitHub.

## Lisensi

MIT License
