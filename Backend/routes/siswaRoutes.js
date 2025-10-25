// Mengimpor library Express
const express = require("express");

// Membuat instance router dari Express
const router = express.Router();

// Mengimpor controller yang berisi fungsi-fungsi untuk mengelola data siswa
const siswaController = require("../controllers/siswaController");

// ==================== ROUTES (rute untuk endpoint siswa) ====================

// GET /api/siswa
// Mengambil semua data siswa
router.get("/", siswaController.getAllSiswa);

// GET /api/siswa/:kode_siswa
// Mengambil data siswa berdasarkan kode_siswa tertentu
router.get("/:kode_siswa", siswaController.getByKode);

// POST /api/siswa
// Menambahkan data siswa baru ke database
router.post("/", siswaController.createSiswa);

// PUT /api/siswa/:kode_siswa
// Mengupdate data siswa berdasarkan kode_siswa
router.put("/:kode_siswa", siswaController.updateSiswa);

// DELETE /api/siswa/:kode_siswa
// Menghapus data siswa berdasarkan kode_siswa
router.delete("/:kode_siswa", siswaController.deleteSiswa);

// Mengekspor router agar bisa digunakan di file utama (misal: app.js / index.js)
module.exports = router;
