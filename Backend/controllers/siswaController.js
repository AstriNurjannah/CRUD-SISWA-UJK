// Mengimpor koneksi database dari folder config
const pool = require("../config/db");

// Mengekspor semua fungsi CRUD (Create, Read, Update, Delete)
module.exports = {
  // ================= GET ALL SISWA =================
  getAllSiswa: async (req, res, next) => {
    try {
      // Mengambil semua data siswa dari tabel data_siswa
      const [rows] = await pool.execute("SELECT * FROM data_siswa");

      // Mengirim hasil query dalam bentuk JSON ke client
      res.json(rows);
    } catch (err) {
      // Jika terjadi error pada database, tampilkan di console dan teruskan ke middleware error
      console.error("Database error:", err);
      next(err);
    }
  },

  // ================= GET SISWA BY KODE =================
  getByKode: async (req, res, next) => {
    try {
      // Mengambil parameter kode_siswa dari URL
      const kode = req.params.kode_siswa;

      // Mencari siswa berdasarkan kode_siswa
      const [rows] = await pool.execute(
        "SELECT * FROM data_siswa WHERE kode_siswa = ?",
        [kode]
      );

      // Jika tidak ditemukan, kirim status 404 (Not Found)
      if (rows.length === 0)
        return res.status(404).json({ message: "Siswa tidak ditemukan" });

      // Mengirim data siswa pertama (karena hasilnya array)
      res.json(rows[0]);
    } catch (err) {
      // Jika ada error, teruskan ke middleware error handler
      next(err);
    }
  },

  // ================= CREATE SISWA =================
  createSiswa: async (req, res, next) => {
    try {
      // Mengambil data dari body request
      const { kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;

      // Validasi input wajib: kode_siswa dan nama_siswa tidak boleh kosong
      if (!kode_siswa || !nama_siswa) {
        return res.status(400).json({
          error: "kode_siswa dan nama_siswa wajib diisi",
        });
      }

      // Menyimpan data siswa baru ke tabel data_siswa
      const [result] = await pool.execute(
        "INSERT INTO data_siswa (kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa) VALUES (?, ?, ?, ?, ?)",
        [kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa]
      );

      // Mengirim respons sukses beserta data yang dimasukkan
      res.status(201).json({
        message: "Data siswa berhasil ditambahkan",
        data: {
          kode_siswa,
          nama_siswa,
          alamat_siswa,
          tanggal_siswa,
          jurusan_siswa,
        },
      });
    } catch (err) {
      // Teruskan error ke middleware berikutnya
      next(err);
    }
  },

  // ================= UPDATE SISWA =================
  updateSiswa: async (req, res, next) => {
    try {
      // Mengambil kode_siswa dari parameter URL
      const kode = req.params.kode_siswa;

      // Mengambil data yang ingin diupdate dari body
      const { nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;

      // Menampung daftar kolom yang ingin diupdate dan nilainya
      const fields = [];
      const values = [];

      // Mengecek tiap field yang dikirim agar tidak update data kosong
      if (nama_siswa !== undefined) {
        fields.push("nama_siswa = ?");
        values.push(nama_siswa);
      }
      if (alamat_siswa !== undefined) {
        fields.push("alamat_siswa = ?");
        values.push(alamat_siswa);
      }
      if (tanggal_siswa !== undefined) {
        fields.push("tanggal_siswa = ?");
        values.push(tanggal_siswa);
      }
      if (jurusan_siswa !== undefined) {
        fields.push("jurusan_siswa = ?");
        values.push(jurusan_siswa);
      }

      // Jika tidak ada data yang dikirim untuk diupdate
      if (fields.length === 0)
        return res.status(400).json({ message: "Tidak ada data untuk diupdate" });

      // Menambahkan kode_siswa sebagai parameter terakhir untuk klausa WHERE
      values.push(kode);

      // Menyusun query update secara dinamis
      const sql = `UPDATE data_siswa SET ${fields.join(", ")} WHERE kode_siswa = ?`;

      // Eksekusi query update
      const [result] = await pool.execute(sql, values);

      // Jika tidak ada baris yang terpengaruh, artinya data tidak ditemukan
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Siswa tidak ditemukan" });

      // Respons jika update berhasil
      res.json({ message: "Data siswa berhasil diupdate" });
    } catch (err) {
      // Tangani error
      next(err);
    }
  },

  // ================= DELETE SISWA =================
  deleteSiswa: async (req, res, next) => {
    try {
      // Mengambil kode_siswa dari parameter URL
      const kode = req.params.kode_siswa;

      // Menghapus data berdasarkan kode_siswa
      const [result] = await pool.execute(
        "DELETE FROM data_siswa WHERE kode_siswa = ?",
        [kode]
      );

      // Jika data tidak ditemukan
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Siswa tidak ditemukan" });

      // Respons sukses setelah penghapusan
      res.json({ message: "Data siswa berhasil dihapus" });
    } catch (err) {
      // Tangani error database
      next(err);
    }
  },
};
