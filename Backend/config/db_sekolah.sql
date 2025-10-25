-- Membuat database
CREATE DATABASE db_sekolah;

-- Menggunakan database
USE db_sekolah;

-- Membuat tabel data_siswa
CREATE TABLE data_siswa (
    kode_siswa VARCHAR(10) PRIMARY KEY,
    nama_siswa VARCHAR(100) NOT NULL,
    alamat_siswa TEXT,
    tanggal_siswa DATE,
    jurusan_siswa VARCHAR(50)
);
