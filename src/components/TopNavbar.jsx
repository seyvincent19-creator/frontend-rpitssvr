import React from 'react';
import { FaFacebookF, FaTelegramPlane, FaInstagram, FaEnvelope, FaYoutube } from 'react-icons/fa';
import "./NavbarMenu.css"; // import custom styles


const TopNavbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark d-none d-md-flex" style={{ background: "linear-gradient(135deg, #1e40af, #0f766e)" }}>
    <div className="container">
      <a className="navbar-brand" href="#" style={{ fontSize:'12px'}}>ច័ន្ទ-សុក្រ ០៧ ព្រឹក - ០៥ រសៀល, សៅរ៍-អាទិត្យ ០៧ ព្រឹក - ០៥ រសៀល</a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
        <div className="d-flex align-items-center gap-3 w-100 justify-content-end">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          <a href="https://web.facebook.com/R.P.I.T.S.S.R" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaFacebookF />
          </a>
          <a href="https://t.me/+x8upPsGtNvsyZDQ1" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaTelegramPlane />
          </a>
          <a href="https://www.youtube.com/@RPITSSR" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaYoutube />
          </a>
          <a href="mailto:info@rpisvr.edu.kh" className="text-white">
            <FaEnvelope />
          </a>

          <button className="btn btn-outline-light ms-2" type="button">Login</button>
        </div>
      </div>
    </div>
  </nav>
);

export default TopNavbar;
