//parse DB_URL

// Memuat variabel lingkungan dari file .env ke dalam process.env
require('dotenv').config(); // load env

// Mengimpor library mysql2 (versi promise) untuk koneksi database MySQL
const mysql2 = require('mysql2/promise');

// Mengambil URL koneksi database dari variabel lingkungan .env
const dbURL = process.env.DATABASE_URL;

// Mengecek apakah DATABASE_URL sudah diatur di file .env
if(!dbURL) {
    // Jika belum di-set, lempar error agar program berhenti
    throw new Error("DATABASE_URL belum di set di .env");   
} 

// Membuat objek URL dari string DATABASE_URL
// Contoh DATABASE_URL: mysql://user:password@localhost:3306/nama_database
const url = new URL(dbURL);

// Membuat pool koneksi (kumpulan koneksi) ke database MySQL
// Pool ini akan mengatur beberapa koneksi sekaligus agar performa lebih baik
const pool = mysql2.createPool({
    host : url.hostname, // alamat server database (misal: localhost)
    user : url.username, // username MySQL
    password : url.password, // password MySQL
    database : url.pathname.replace(/^\//,''), // nama database (hapus tanda / di awal)
    port : url.port ? Number(url.port) : 3306, // port MySQL (default: 3306)
    waitForConnections : true, // menunggu koneksi jika semua sedang dipakai
    connectionLimit : 10, // maksimal koneksi aktif sekaligus
    queueLimit : 0 // tidak membatasi jumlah antrian koneksi
});

// Mengekspor pool agar bisa digunakan di file lain (misalnya controller)
module.exports = pool;
