// Mengimpor komponen BrowserRouter untuk routing SPA
import { BrowserRouter } from 'react-router-dom'

// Mengimpor komponen Navbar, AppRoutes (halaman konten), dan Footer
import Navbar from './components/Navbar'
import AppRoutes from './components/AppRoutes'
import Footer from './components/Footer'

// Mengimpor file CSS utama (di sini cuma untuk reset margin/padding agar layout full screen)
import './App.css'

// ================== KOMPONEN UTAMA ==================
function App() {
  return (
    // BrowserRouter membungkus seluruh aplikasi agar bisa menggunakan routing
    <BrowserRouter basename='/'>
      {/* Wrapper flexbox dengan tinggi minimum 100vh agar footer selalu di bawah */}
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar di bagian atas */}
        <Navbar />

        {/* Konten utama, flex-grow agar mengisi ruang kosong di antara Navbar dan Footer */}
        <div className="flex-grow-1">
          <AppRoutes /> {/* Semua rute halaman (Login, Register, DataSiswa, Siswa, dll) */}
        </div>

        {/* Footer di bagian bawah */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

// Mengekspor komponen App agar bisa dirender di index.js
export default App;
