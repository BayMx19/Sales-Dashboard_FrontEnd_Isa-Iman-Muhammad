<p align="center"> <a href="https://vuejs.org" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width="400" alt="Vue.js Logo"> </a> </p> <p align="center"> <a href="https://github.com/vuejs/core/actions"> <img src="https://github.com/vuejs/core/workflows/CI/badge.svg" alt="Build Status"> </a> <a href="https://www.npmjs.com/package/vue"> <img src="https://img.shields.io/npm/dt/vue" alt="Total Downloads"> </a> <a href="https://www.npmjs.com/package/vue"> <img src="https://img.shields.io/npm/v/vue" alt="Latest Stable Version"> </a> <a href="https://opensource.org/licenses/MIT"> <img src="https://img.shields.io/badge/license-MIT-green" alt="License"> </a> </p>

---

# 📦 Sales Dashboard Frontend

Frontend ini dibangun menggunakan **Vue.js 3** dengan **Vite** sebagai bundler, dan **Attex Template** untuk UI/UX. Frontend ini terintegrasi langsung dengan backend Laravel untuk menampilkan **Dashboard Penjualan, Top Selling Products, CRUD transaksi, Polling update, dan upload CSV**.

---

## 🚀 Fitur Utama

- Dashboard Utama
  - KPI Cards: Total Product Sales & Unique Customer
  - Charts:
    - Revenue vs Sales (Combo Chart)
    - Total Sales by Channel (Donut Chart)
  - Top Selling Products (Table: Product Name, Qty Sold, Talent/Endorser)
- Dashboard Produk
  - Top Selling Products Table (Qty Sold, Talent/Endorser, Channel, Harga)
  - Channel Overview (Radar Chart)
  - Sessions Overview (Line Chart)
- CRUD Admin (Admin Only)
  - Tambah, Edit, Hapus transaksi produk
- Realtime Update
  - Polling setiap 10 detik untuk update Top Selling Products otomatis
- Upload CSV
  - Admin dapat meng-upload CSV untuk update transaksi
  - Validasi CSV otomatis (qty > 0, harga valid, dll.)

---

## ⚙️ Instalasi & Setup Project

### 1. Clone Repository

```bash
git clone https://github.com/BayMx19/Sales-Dashboard_FrontEnd_Isa-Iman-Muhammad.git
cd Sales-Dashboard_FrontEnd_Isa-Iman-Muhammad
```

### 2. Install Dependency

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file .env dari contoh .env.example:

```bash
cp .env.example .env
```

### 4. Sesuaikan URL backend Laravel:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 5. Jalankan Server Lokal (Vite default: http://127.0.0.1:5173)

```bash
npm run dev
```

---

## 🔗 Integrasi dengan Backend

- Endpoint backend Laravel: http://127.0.0.1:8000/api

- Semua request dikirim menggunakan axios dengan header Authorization: Bearer <token> setelah login.

- Realtime update diimplementasikan dengan polling setiap 10 detik menggunakan setInterval.

- Upload CSV melalui komponen TransactionsImport.vue dan dikirim ke endpoint /transactions/import.

---

## 🧑‍💻 Teknologi yang Digunakan

- Vue.js 3 (Composition API)
- Vite
- Pinia / Vuex (state management)
- Axios (HTTP client)
- ApexCharts (charts)
- Bootstrap 5 / Attex Template (UI/UX)
- CSV Parsing Library (PapaParse / custom)

---

## ✉️ Kontak

Untuk pertanyaan atau pengembangan lebih lanjut, hubungi:<br>
Isa Iman Muhammad<br>
📩 Email: isaimanmuhammad19@gmail.com<br>
🌐 Website: https://isaimanmuhammad.netlify.app/<br>
