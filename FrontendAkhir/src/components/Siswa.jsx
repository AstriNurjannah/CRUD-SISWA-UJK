// ================== IMPORT LIBRARY ==================
import { useState, useEffect } from "react"; // useState untuk state, useEffect untuk efek samping
import axios from "axios"; // library untuk HTTP request (GET, POST, PUT, DELETE)
import "bootstrap/dist/css/bootstrap.min.css"; // import CSS Bootstrap
import { useParams, useNavigate } from "react-router-dom"; // useParams ambil parameter URL, useNavigate untuk pindah halaman

// ================== KOMPONEN UTAMA ==================
export default function SiswaForm() {
  // ================== STATE ==================
  const [loading, setLoading] = useState(false); // state loading saat fetch data
  const [siswa, setSiswa] = useState([]); // state untuk menyimpan data siswa, jika diperlukan

  // State untuk form input
  const [kode_siswa, setKodeSiswa] = useState(""); // state untuk kode siswa
  const [nama_siswa, setNamaSiswa] = useState(""); // state untuk nama siswa
  const [alamat_siswa, setAlamatSiswa] = useState(""); // state untuk alamat siswa
  const [tanggal_siswa, setTanggalSiswa] = useState(""); // state untuk tanggal siswa
  const [jurusan_siswa, setJurusanSiswa] = useState(""); // state untuk jurusan siswa

  const { kode_siswa: kodeUrl } = useParams(); // ambil kode_siswa dari URL (untuk edit)
  const navigate = useNavigate(); // fungsi untuk navigasi halaman

  // ================== FUNGSI FORMAT TANGGAL ==================
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''; // jika tidak ada tanggal, return string kosong
    
    console.log("Original date from API:", dateString); // debug tanggal asli
    
    try {
      const date = new Date(dateString); // coba parsing tanggal

      if (isNaN(date.getTime())) {
        // jika parsing gagal, coba format Indonesia DD-MM-YYYY
        if (dateString.includes('-')) {
          const parts = dateString.split('-');
          if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            const newDate = new Date(year, month - 1, day);
            if (!isNaN(newDate.getTime())) {
              const formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
              console.log("Formatted from DD-MM-YYYY:", formatted);
              return formatted; // return format YYYY-MM-DD
            }
          }
        }
        return ''; // jika gagal parsing, return string kosong
      }

      // format standar ke YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const formatted = `${year}-${month}-${day}`;
      console.log("Formatted date:", formatted);
      
      return formatted;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // ================== USE EFFECT ==================
  useEffect(() => {
    console.log("kodeUrl:", kodeUrl); // debug kode siswa dari URL
    if (kodeUrl) {
      fetchSiswaByKode(); // jika edit, fetch data siswa
    }
  }, [kodeUrl]); // jalankan efek saat kodeUrl berubah

  // ================== FETCH SISWA BY KODE ==================
  const fetchSiswaByKode = async () => {
    try {
      setLoading(true); // set loading true saat fetch
      console.log("Fetching data for:", kodeUrl);

      const res = await axios.get(`http://localhost:3333/api/siswa/${kodeUrl}`); // GET data siswa dari API
      const data = res.data;

      console.log("Data received from API:", data);

      // format tanggal sebelum set ke state
      const formattedDate = formatDateForInput(data.tanggal_siswa);
      console.log("Tanggal setelah format:", formattedDate);

      // set state form dengan data dari API
      setKodeSiswa(data.kode_siswa || "");
      setNamaSiswa(data.nama_siswa || "");
      setAlamatSiswa(data.alamat_siswa || "");
      setTanggalSiswa(formattedDate);
      setJurusanSiswa(data.jurusan_siswa || "");

      setLoading(false); // set loading false setelah selesai
    } catch (err) {
      console.error("Gagal fetch siswa by kode:", err);
      setLoading(false);
      alert("Gagal memuat data siswa"); // tampilkan alert jika error
    }
  };

  // ================== HANDLE SUBMIT ==================
  const handleSubmit = async (e) => {
    e.preventDefault(); // cegah reload halaman

    const payload = {
      kode_siswa,
      nama_siswa,
      alamat_siswa,
      tanggal_siswa, // tetap dalam format YYYY-MM-DD
      jurusan_siswa,
    };

    console.log("Payload yang dikirim:", payload);

    try {
      if (kodeUrl) {
        // jika edit, pakai PUT
        await axios.put(`http://localhost:3333/api/siswa/${kodeUrl}`, payload);
        alert("✅ Data siswa berhasil diubah");
      } else {
        // jika tambah baru, pakai POST
        await axios.post("http://localhost:3333/api/siswa", payload);
        alert("✅ Data siswa berhasil ditambahkan");

        // reset form setelah tambah
        setKodeSiswa("");
        setNamaSiswa("");
        setAlamatSiswa("");
        setTanggalSiswa("");
        setJurusanSiswa("");
      }
      navigate("/DataSiswa"); // pindah ke halaman DataSiswa
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("❌ Gagal menyimpan data"); // tampilkan alert jika gagal
    }
  };

  // ================== RENDER UI ==================
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            {kodeUrl ? "✏️ Edit Data Siswa" : "➕ Tambah Data Siswa"} {/* judul dinamis */}
          </h4>
        </div>

        <div className="card-body">
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
                  value={kode_siswa} // dikontrol oleh state
                  onChange={(e) => setKodeSiswa(e.target.value)}
                  required
                  disabled={!!kodeUrl} // jika edit, kode tidak bisa diubah
                />
              </div>

              {/* Input: Nama Siswa */}
              <div className="mb-3">
                <label className="form-label">Nama Siswa *</label>
                <input
                  type="text"
                  className="form-control"
                  value={nama_siswa}
                  onChange={(e) => setNamaSiswa(e.target.value)}
                  required
                />
              </div>

              {/* Input: Alamat */}
              <div className="mb-3">
                <label className="form-label">Alamat</label>
                <textarea
