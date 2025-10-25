// ================== IMPORT LIBRARY ==================
import React, { useEffect, useState } from "react"; // Hook bawaan React untuk state dan efek samping
import axios from "axios"; // Digunakan untuk melakukan HTTP request ke backend (GET, POST, PUT, DELETE)
import { Link } from "react-router-dom"; // Untuk navigasi antar halaman tanpa reload
import "bootstrap/dist/css/bootstrap.min.css"; // Menggunakan CSS dari Bootstrap untuk tampilan

// ================== KOMPONEN UTAMA ==================
function DataSiswa() {

  // ================== STATE ==================
  const [loading, setLoading] = useState(false);
  // ⤷ Menyimpan status apakah sedang mengambil data dari server (true/false)

  const [siswa, setSiswa] = useState([]);
  // ⤷ Menyimpan data semua siswa yang didapat dari backend

  const [searchQuery, setSearchQuery] = useState("");
  // ⤷ Menyimpan kata kunci pencarian dari input user

  // ================== USE EFFECT ==================
  // useEffect dipanggil sekali saat komponen pertama kali ditampilkan
  useEffect(() => {
    fetchSiswa(); // Panggil fungsi ambil data siswa
  }, []);

  // ================== FETCH DATA SISWA ==================
  // Fungsi ini mengambil semua data siswa dari API backend
  const fetchSiswa = async () => {
    try {
      setLoading(true); // Tampilkan status loading
      const res = await axios.get("http://localhost:3333/api/siswa"); // Request GET ke server Express
      setSiswa(res.data); // Simpan data hasil response ke state siswa
      setLoading(false); // Matikan status loading
    } catch (err) {
      console.error("Gagal fetch data siswa:", err); // Tampilkan error di console jika gagal
      setLoading(false);
    }
  };

  // ================== HAPUS DATA SISWA ==================
  const handleHapus = async (kode_siswa) => {
    // Tampilkan konfirmasi sebelum hapus data
    if (!window.confirm("Yakin ingin menghapus data siswa ini?")) return;

    try {
      // Request DELETE ke server untuk hapus data berdasarkan kode_siswa
      await axios.delete(`http://localhost:3333/api/siswa/${kode_siswa}`);
      alert("Data siswa berhasil dihapus");
      fetchSiswa(); // Refresh data setelah penghapusan berhasil
    } catch (err) {
      alert("Gagal menghapus data siswa");
      console.error(err);
    }
  };

  // ================== FILTER PENCARIAN ==================
  // Melakukan filter data siswa berdasarkan nama yang cocok dengan searchQuery
  const filteredSiswa = siswa.filter((m) =>
    m.nama_siswa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ================== BAGIAN RENDER (TAMPILAN) ==================
  return (
    <div className="card" style={{ backgroundColor: "pink" }}>
      {/* ================== HEADER ================== */}
      <div className="card-header text-white" style={{ backgroundColor: "purple" }}>
        <h5 className="mb-0">Data Siswa</h5>
      </div>

      {/* ================== KONTROL TAMBAH & SEARCH ================== */}
      <div className="container text-center">
        <div className="row">
          {/* Tombol Tambah Data */}
          <div className="col d-flex">
            <button type="button" className="btn btn-primary mt-3">
              <Link className="nav-link text-white" to="/siswa">
                Tambah Data
              </Link>
            </button>
          </div>

          {/* Input Search */}
          <div className="col">
            <input
              className="form-control mt-3"
              type="search"
              placeholder="Cari nama siswa..."
              aria-label="Search"
              value={searchQuery} // nilai input dikontrol oleh state searchQuery
              onChange={(e) => setSearchQuery(e.target.value)} // setiap perubahan input disimpan ke state
            />
          </div>
        </div>
      </div>

      {/* ================== TABEL DATA SISWA ================== */}
      <div className="card-body">
        {/* Menampilkan pesan loading saat data masih diambil */}
        {loading && <p>Loading data siswa...</p>}

        <table className="table table-bordered table-striped mt-3">
          <thead className="table-light text-center">
            <tr>
              <th>Kode Siswa</th>
              <th>Nama Siswa</th>
              <th>Alamat</th>
              <th>Tanggal</th>
              <th>Jurusan</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {/* Jika ada data siswa yang cocok dengan pencarian */}
            {filteredSiswa.length > 0 ? (
              filteredSiswa.map((m) => (
                <tr key={m.kode_siswa}>
                  <td>{m.kode_siswa}</td>
                  <td>{m.nama_siswa}</td>
                  <td>{m.alamat_siswa}</td>
                  <td>{m.tanggal_siswa}</td>
                  <td>{m.jurusan_siswa}</td>
                  <td className="text-center">
                    {/* Tombol Edit */}
                    <button className="btn btn-primary btn-sm me-2">
                      <Link
                        className="nav-link text-white"
                        to={`/siswa/${m.kode_siswa}`} // arahkan ke halaman edit berdasarkan kode siswa
                      >
                        Edit
                      </Link>
                    </button>

                    {/* Tombol Hapus */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleHapus(m.kode_siswa)} // panggil fungsi hapus
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // Jika tidak ada data siswa yang cocok dengan pencarian
              <tr>
                <td colSpan="6" className="text-center">
                  Tidak ditemukan data siswa yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ================== EXPORT KOMPONEN ==================
// Mengekspor komponen agar bisa digunakan di AppRoutes.jsx
export default DataSiswa;
