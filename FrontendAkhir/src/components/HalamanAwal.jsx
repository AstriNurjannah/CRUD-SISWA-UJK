import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function HalamanAwal() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="text-white text-center d-flex align-items-center"
        style={{
          height: "90vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581579185169-1b21dbb9b62d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="display-2 fw-bold text-dark">Selamat Datang di Laundry App</h1>
          <p className="lead mb-4 text-dark">
            Solusi cepat, bersih, dan terpercaya untuk semua kebutuhan laundry
            Anda. Cuci lebih mudah, hidup lebih nyaman.
          </p>
          <a href="/pemesanan" className="btn btn-success btn-lg ">
            Pesan Sekarang
          </a>
          <a href="/layanan" className="btn btn-outline-light btn-lg">
            Lihat Layanan
          </a>
        </div>
      </div>

      {/* Fitur Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Mengapa Memilih Kami?</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="Cepat"
              className="mb-3"
              width="80"
            />
            <h5>Proses Cepat</h5>
            <p>Jaminan laundry selesai tepat waktu dengan kualitas terbaik.</p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1684/1684429.png"
              alt="Bersih"
              className="mb-3"
              width="80"
            />
            <h5>Bersih & Harum</h5>
            <p>Pakaian dicuci dengan detergen berkualitas dan wangi tahan lama.</p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135679.png"
              alt="Pelayanan"
              className="mb-3"
              width="80"
            />
            <h5>Pelayanan Ramah</h5>
            <p>Tim kami siap memberikan pelayanan terbaik untuk pelanggan.</p>
          </div>
        </div>
      </div>


    </div>
  );
}

export default HalamanAwal;
