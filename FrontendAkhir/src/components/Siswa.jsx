// ================== IMPORT LIBRARY ==================
import { useState, useEffect } from "react"; // Hook bawaan React untuk state dan efek samping
import axios from "axios"; // Library untuk melakukan HTTP request (GET, POST, PUT, DELETE)
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS Bootstrap agar tampilan lebih rapi
import { useParams, useNavigate } from "react-router-dom"; // Hook dari React Router untuk akses parameter URL dan navigasi halaman

// ================== KOMPONEN UTAMA ==================
export default function SiswaForm() {
  // ================== STATE ==================
  const [loading, setLoading] = useState(false); // Menandakan proses loading data dari server
  const [siswa, setSiswa] = useState([]); // Menyimpan data siswa (tidak digunakan langsung di form, tapi bisa untuk referensi)

  // State untuk menampung input dari form
  const [kode_siswa, setKodeSiswa] = useState(""); // Input kode siswa
  const [nama_siswa, setNamaSiswa] = useState(""); // Input nama siswa
  const [alamat_siswa, setAlamatSiswa] = useState(""); // Input alamat siswa
  const [tanggal_siswa, setTanggalSiswa] = useState(""); // Input tanggal siswa
  const [jurusan_siswa, setJurusanSiswa] = useState(""); // Input jurusan siswa

  const { kode_siswa: kodeUrl } = useParams(); // Ambil parameter kode_siswa dari URL (misal /siswa/123)
  const navigate = useNavigate(); // Untuk berpindah halaman (navigasi programatik)

  // ================== USE EFFECT ==================
  useEffect(() => {
    if (kodeUrl) {
      // Jika ada kode di URL → berarti mode EDIT
      fetchSiswaByKode(); // Ambil data siswa dari server berdasarkan kode
    }
    // Tidak perlu ambil semua siswa di sini
  }, [kodeUrl]); // Efek dijalankan ulang setiap kali kodeUrl berubah

  // ================== FETCH SISWA BY KODE ==================
  const fetchSiswaByKode = async () => {
    try {
      setLoading(true); // Aktifkan indikator loading
      const res = await axios.get(
        `http://localhost:3333/api/siswa/${kodeUrl}`
      ); // Ambil data siswa tertentu dari backend
      const data = res.data;

      // Isi form dengan data lama (untuk proses edit)
      setKodeSiswa(data.kode_siswa);
      setNamaSiswa(data.nama_siswa);
      setAlamatSiswa(data.alamat_siswa);
      setTanggalSiswa(data.tanggal_siswa);
      setJurusanSiswa(data.jurusan_siswa);
      setLoading(false);
    } catch (err) {
      console.error("Gagal fetch siswa by kode:", err);
      setLoading(false);
      alert("Gagal memuat data siswa");
    }
  };

  // ================== HANDLE SUBMIT ==================
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman bawaan form

    // Kumpulkan semua data form ke dalam objek payload
    const payload = {
      kode_siswa,
      nama_siswa,
      alamat_siswa,
      tanggal_siswa,
      jurusan_siswa,
    };

    try {
      if (kodeUrl) {
        // MODE EDIT → kirim PUT request
        await axios.put(
          `http://localhost:3333/api/siswa/${kodeUrl}`,
          payload
        );
        alert("✅ Data siswa berhasil diubah");
      } else {
        // MODE TAMBAH → kirim POST request
        await axios.post("http://localhost:3333/api/siswa", payload);
        alert("✅ Data siswa berhasil ditambahkan");

        // Reset form agar kosong lagi setelah data ditambah
        setKodeSiswa("");
        setNamaSiswa("");
        setAlamatSiswa("");
        setTanggalSiswa("");
        setJurusanSiswa("");
      }

      navigate("/DataSiswa"); // Arahkan ke halaman daftar siswa setelah submit
    } catch (err) {
      console.error("Gagal menyimpan data siswa:", err);
      alert("❌ Gagal menyimpan data");
    }
  };

  // ================== RENDER UI ==================
  return (
    <div className="container mt-4">
      <div className="card shadow">
        {/* HEADER - tampilkan judul berbeda tergantung mode */}
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            {kodeUrl ? "✏️ Edit Data Siswa" : "➕ Tambah Data Siswa"}
          </h4>
        </div>

        <div className="card-body">
          {/* Jika loading tampilkan spinner, jika tidak tampilkan form */}
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Memuat data siswa...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Input: Kode Siswa */}
              <div className="mb-3">
                <label className="form-label">Kode Siswa *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan kode siswa"
                  value={kode_siswa}
                  onChange={(e) => setKodeSiswa(e.target.value)}
                  required
                  disabled={!!kodeUrl} // Saat edit, input kode dinonaktifkan
                />
                <div className="form-text">
                  {kodeUrl ? "Kode siswa tidak dapat diubah" : "Kode unik untuk siswa"}
                </div>
              </div>

              {/* Input: Nama Siswa */}
              <div className="mb-3">
                <label className="form-label">Nama Siswa *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama lengkap siswa"
                  value={nama_siswa}
                  onChange={(e) => setNamaSiswa(e.target.value)}
                  required
                />
              </div>

              {/* Input: Alamat */}
              <div className="mb-3">
                <label className="form-label">Alamat</label>
                <textarea
                  className="form-control"
                  placeholder="Masukkan alamat siswa"
                  rows="3"
                  value={alamat_siswa}
                  onChange={(e) => setAlamatSiswa(e.target.value)}
                ></textarea>
              </div>

              {/* Input: Tanggal */}
              <div className="mb-3">
                <label className="form-label">Tanggal *</label>
                <input
                  type="date"
                  className="form-control"
                  value={tanggal_siswa}
                  onChange={(e) => setTanggalSiswa(e.target.value)}
                  required
                />
              </div>

              {/* Input: Jurusan */}
              <div className="mb-3">
                <label className="form-label">Jurusan *</label>
                <select
                  className="form-select"
                  value={jurusan_siswa}
                  onChange={(e) => setJurusanSiswa(e.target.value)}
                  required
                >
                  <option value="">Pilih Jurusan</option>
                  <option value="RPL">RPL (Rekayasa Perangkat Lunak)</option>
                  <option value="TKJ">TKJ (Teknik Komputer dan Jaringan)</option>
                  <option value="AKL">AKL (Akuntansi dan Keuangan Lembaga)</option>
                  <option value="OTKP">OTKP (Otomatisasi dan Tata Kelola Perkantoran)</option>
                </select>
              </div>

              {/* Tombol Aksi */}
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {kodeUrl ? "💾 Update Data" : "➕ Tambah Data"}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => navigate("/DataSiswa")} // Tombol kembali ke halaman daftar siswa
                >
                  ↩️ Kembali
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
