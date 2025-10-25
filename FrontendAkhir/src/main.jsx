// ================== IMPORT LIBRARY ==================
import { StrictMode } from 'react' 
// StrictMode adalah wrapper bawaan React yang membantu mendeteksi potensi bug di console
// Tidak memengaruhi tampilan UI, hanya untuk development

import { createRoot } from 'react-dom/client' 
// Fungsi createRoot dari React 18+ untuk merender aplikasi ke DOM

// import './app.css' 
// File CSS dihapus agar margin/padding default tidak mengganggu layout navbar

import App from './App.jsx' 
// Komponen utama aplikasi yang sudah membungkus semua halaman, Navbar, Footer, dan routing

// ================== RENDER KE DOM ==================
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Render komponen utama aplikasi di dalam StrictMode */}
  </StrictMode>,
)
