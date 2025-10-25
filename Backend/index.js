// ===== index.js =====

// Baris ini (dikomentari) digunakan untuk memuat variabel lingkungan dari file .env
// require('dotenv').config();

// Mengimpor framework Express untuk membuat server HTTP
const express = require("express");

// Membuat instance dari aplikasi Express
const app = express();

// Mengimpor modul CORS agar server bisa menerima permintaan dari domain berbeda (frontend)
const cors = require("cors");

// Mengimpor rute (endpoint) untuk fitur siswa dari folder routes
const siswaRoutes = require("./routes/siswaRoutes");

// Mengaktifkan middleware CORS agar API bisa diakses dari frontend (misalnya React)
app.use(cors());

// Middleware untuk parsing data JSON dari request body
app.use(express.json());

// Menggunakan router siswa, semua endpoint-nya diawali dengan "/api/siswa"
// Contoh: GET /api/siswa → ambil semua data
//         POST /api/siswa → tambah siswa baru
app.use("/api/siswa", siswaRoutes);

// ================= Jalankan server =================

// Mengambil nomor port dari variabel lingkungan (file .env)
// Contoh di .env: PORT=3333
const PORT = process.env.PORT;

// Menjalankan server pada port yang sudah ditentukan
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
