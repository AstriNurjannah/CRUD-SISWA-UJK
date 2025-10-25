// src/components/Navbar.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setUserName] = useState("");
  const navigate = useNavigate();

  // pake useCallback supaya fungsi tidak berubah tiap render
  const checkLogin = useCallback(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Date.now() / 1000;

        if (payload.exp && payload.exp < now) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          setIsLogin(false);
          setUserName("");
          return;
        }

        setIsLogin(true);
        setUserName(name || "User");

        if (payload.exp) {
          const remainingTime = payload.exp * 1000 - Date.now();
          setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            window.dispatchEvent(new Event("storage"));
            navigate("/login");
          }, remainingTime);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        setIsLogin(false);
        setUserName("");
      }
    } else {
      setIsLogin(false);
      setUserName("");
    }
  }, [navigate]); // dependency-nya cuma navigate

  useEffect(() => {
    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, [checkLogin]); // ✅ eslint happy

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg  mb-5 shadow-sm " data-bs-theme="light"
    style={{backgroundColor: "pink"}}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-success" to="/">WebTest</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/Siswa">Siswa</Link></li>
            {/* <li className="nav-item"><Link className="nav-link" to="/Pemesanan">Detail Pemesanan</Link></li> */}
            <li className="nav-item"><Link className="nav-link" to="/DataSiswa">Data Siswa</Link></li>
            {/* <li className="nav-item"><Link className="nav-link" to="/DataPemesanan">Data Pemesanan</Link></li> */}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
