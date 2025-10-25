// Mengimpor komponen-komponen halaman yang akan digunakan pada routing
import HalamanAwal from "./HalamanAwal";
import { Routes, Route } from 'react-router-dom'; // Import komponen routing dari React Router
import DataSiswa from "./DataSiswa";
import Siswa from "./Siswa";

// Komponen AppRoutes digunakan untuk mengatur navigasi (routing) antar halaman
function AppRoutes() {
    return(
        <div className="container">
            {/* Routes berfungsi sebagai pembungkus untuk semua Route */}
            <Routes>

                {/* Route ke halaman utama (HalamanAwal) */}
                <Route path="/" element={<HalamanAwal/>}/>

                {/* Route ke halaman daftar data siswa */}
                <Route path="/datasiswa" element={<DataSiswa />} />

                {/* Route ke halaman form siswa untuk tambah data */}
                <Route path="/siswa" element={<Siswa/>} />

                {/* Route ke halaman form siswa untuk edit data berdasarkan kode_siswa */}
                {/* Parameter :kode_siswa akan diambil lewat useParams() di dalam komponen Siswa */}
                <Route path="/siswa/:kode_siswa" element={<Siswa/>} />
            </Routes>
        </div>
    )
}

// Mengekspor komponen AppRoutes agar bisa digunakan di App.jsx (komponen utama React)
export default AppRoutes;
