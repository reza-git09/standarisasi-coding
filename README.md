# Standarisasi Coding — Tugas Pengujian & Integrasi

## 📋 Deskripsi

Project latihan penerapan standar pengujian (AAA, FIRST) dan integrasi kode
(GitHub Actions CI) pada modul `ShoppingCart` dan `User`.

## 🛠️ Teknologi

- Node.js v20
- Jest (testing)
- ESLint (linting)
- Prettier (formatting)
- GitHub Actions (CI)

## 🚀 Cara Menjalankan

```bash
npm install
npm test
npm run test:coverage
npm run lint
npm run format:check
```

## 📊 Coverage

![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

## 📁 Struktur

```text
src/        → source code (ShoppingCart.js, User.js)
tests/      → unit test (ShoppingCart.test.js, User.test.js)
.github/    → CI workflow (ci.yml)
```

## 👤 Author

- Nama: [Reza Dwi Pratama]
- NIM: [E41250053]

## 📝 Catatan

- Semua test mengikuti struktur AAA (Arrange, Act, Assert)
- Penamaan test: `should [behavior] when [condition]`
- Coverage target: 80%+ (tercapai: 100%)
