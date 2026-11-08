# Analisis Kasus: Tim dengan 15 Developer

## 1. Identifikasi Masalah

Berdasarkan skenario:

- 15 developer, semua commit langsung ke `main`
- Tidak ada CI/CD
- Test coverage hanya 25%
- Bug production muncul setiap minggu

### Masalah Utama

| #   | Masalah                   | Dampak                                          |
| --- | ------------------------- | ----------------------------------------------- |
| 1   | Tidak ada branch strategy | Konflik merge, `main` sering rusak              |
| 2   | Tidak ada code review     | Kode berkualitas rendah masuk ke `main`         |
| 3   | Tidak ada CI/CD           | Bug tidak terdeteksi sebelum sampai production  |
| 4   | Coverage hanya 25%        | Regresi (bug lama muncul lagi) tidak terdeteksi |
| 5   | Tidak ada quality gate    | Tidak ada standar minimum kualitas kode         |

### Akar Masalah

**Kurangnya standarisasi proses integrasi kode.** Semua developer bekerja
tanpa kontrak yang jelas tentang bagaimana kode harus diuji, direview, dan
digabungkan. Akibatnya kualitas bergantung pada kebiasaan masing-masing
orang, bukan pada sistem. Bug production tiap minggu adalah gejala dari
masalah proses ini, bukan semata-mata karena developer kurang terampil.

## 2. Standar yang Harus Diterapkan Pertama

### Prioritas 1 (Minggu 1-2): Branch Protection + Code Review

- **Alasan:** Menghentikan pendarahan (_stop the bleeding_). Tanpa ini,
  perbaikan lain sia-sia karena `main` tetap bisa dirusak oleh siapa saja
  kapan saja.
- **Aksi:** Aktifkan branch protection di `main`, larang push langsung,
  wajibkan Pull Request dengan minimal 1 reviewer.

### Prioritas 2 (Minggu 3-4): CI Sederhana

- **Alasan:** Mendeteksi build dan test yang rusak secara otomatis sebelum
  kode digabung, sehingga reviewer tidak perlu mengecek hal dasar secara
  manual.
- **Aksi:** GitHub Actions minimal: lint dan test. Jadikan status check
  wajib lulus sebelum PR bisa di-merge.

### Prioritas 3 (Minggu 5-8): Naikkan Coverage Bertahap

- **Alasan:** Tidak realistis melompat dari 25% ke 80% sekaligus. Target
  yang terlalu besar membuat tim menulis test asal-asalan demi angka.
- **Aksi:** Naikkan sekitar 10% setiap 2 minggu. Wajibkan unit test untuk
  setiap fitur baru dan perbaikan bug, serta prioritaskan modul yang paling
  kritis.

### Prioritas 4 (Minggu 9-12): Quality Gate + CD

- **Alasan:** Setelah budaya review dan testing terbentuk, otomasi penuh
  bisa dipasang tanpa menimbulkan penolakan dari tim.
- **Aksi:** Coverage threshold di CI (build gagal jika coverage turun), lalu
  auto-deploy ke staging.

### Justifikasi Urutan

Urutan ini mengikuti prinsip "proses dulu, otomasi kemudian". Branch
protection dan code review murah, cepat dipasang, dan langsung memotong
risiko terbesar. CI baru bernilai setelah ada jalur PR yang wajib dilewati.
Quality gate baru efektif setelah coverage cukup tinggi, jika dipasang
terlalu awal, CI akan selalu merah dan diabaikan tim.

## 3. Roadmap 3 Bulan

### Bulan 1: Fondasi

- [ ] Aktifkan branch protection di `main`
- [ ] Terapkan conventional commits
- [ ] Wajib PR dan 1 reviewer
- [ ] Setup CI dasar (lint dan test)
- [ ] Sosialisasi standar ke seluruh tim

### Bulan 2: Peningkatan

- [ ] Coverage naik ke 50%
- [ ] Wajib unit test untuk fitur baru
- [ ] Setup coverage reporting (Codecov)
- [ ] Mulai memakai code review checklist
- [ ] Refactor 5 modul paling kritis dan lengkapi dengan test

### Bulan 3: Otomasi Penuh

- [ ] Coverage naik ke 70%
- [ ] Quality gate aktif (CI gagal jika coverage turun)
- [ ] CD ke staging otomatis
- [ ] Dokumentasi standar lengkap
- [ ] Retrospective dan ukur bug production

## 4. Metrik Keberhasilan

| Metrik                | Baseline | Target 3 Bulan |
| --------------------- | -------- | -------------- |
| Test coverage         | 25%      | >= 70%         |
| Bug production/minggu | ~5       | <= 1           |
| Waktu merge PR        | ?        | < 1 hari       |
| Broken `main`/bulan   | ?        | 0              |
| Waktu code review     | ?        | < 4 jam        |

Catatan: tanda `?` berarti belum pernah diukur. Langkah pertama di Bulan 1
adalah mengumpulkan data baseline tersebut agar perbaikan bisa dibuktikan
dengan angka.
