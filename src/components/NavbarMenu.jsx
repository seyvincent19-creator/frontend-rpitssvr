import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavbarMenu.css";

const DEPARTMENTS = [
  { id: 1, name: "វិទ្យាសាស្រ្តកុំព្យូទ័រ" },
  { id: 2, name: "អគ្គិសនី" },
  { id: 3, name: "មេកាត្រូនិក" },
  { id: 4, name: "មេកានិកទំនាក់ទំនងឧស្សាហកម្ម" },
  { id: 5, name: "អេឡិចត្រូនិច" },
  { id: 6, name: "មេកានិករថយន្ត" },
  { id: 7, name: "សំណង់ស៊ីវិល" },
  { id: 8, name: "បរិក្ខារត្រជាក់" },
  { id: 9, name: "អក្សរសាស្រ្តអង់គ្លេស" },
  { id: 10, name: "គណនេយ្យ ហិរញ្ញវត្ថុ" },
];

const NavbarMenu = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`main-navbar ${scrolled ? "main-navbar--scrolled" : ""}`}>
      <div className="container main-navbar-inner">
        {/* Logo */}
        <Link to="/" className="main-navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src="/images/PRIT.png" alt="RPITSSVR Logo" className="navbar-logo-img" />
          <div className="navbar-logo-text">
            <span className="navbar-logo-kh">វិទ្យាស្ថានពហុបច្ចេកទេសភូមិភាគតេជោសែនស្វាយរៀង</span>
            <span className="navbar-logo-en">Regional Polytechnic Institute TechoSen Svay Rieng</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="main-nav-links d-none d-lg-flex">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>ទំព័រដើម</NavLink></li>
          <li><NavLink to="/newspost" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>ព្រឹត្តិការណ៍</NavLink></li>

          <li className="nav-dropdown-wrap">
            <button className="nav-item-link nav-dropdown-btn">
              ដេប៉ាតឺម៉ង់ <span className="nav-caret">▾</span>
            </button>
            <div className="nav-dropdown-menu">
              {DEPARTMENTS.map((d) => (
                <Link key={d.id} to={`/department/${d.id}`} className="nav-dropdown-item">{d.name}</Link>
              ))}
            </div>
          </li>

          <li><NavLink to="/communication" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>ទំនាក់ទំនងឧស្សាហកម្ម</NavLink></li>
          <li><NavLink to="/e-library" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>E-Library</NavLink></li>
          <li><NavLink to="/structure" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>រចនាសម្ព័ន្ធ</NavLink></li>
          <li><NavLink to="/aboutus" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>អំពីយើង</NavLink></li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="hamburger d-lg-none" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <NavLink to="/" end className="mobile-nav-link" onClick={() => setMenuOpen(false)}>ទំព័រដើម</NavLink>
        <NavLink to="/newspost" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>ព្រឹត្តិការណ៍</NavLink>
        <details className="mobile-dropdown">
          <summary className="mobile-nav-link">ដេប៉ាតឺម៉ង់ ▾</summary>
          {DEPARTMENTS.map((d) => (
            <Link key={d.id} to={`/department/${d.id}`} className="mobile-nav-sub" onClick={() => setMenuOpen(false)}>{d.name}</Link>
          ))}
        </details>
        <NavLink to="/communication" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>ទំនាក់ទំនងឧស្សាហកម្ម</NavLink>
        <NavLink to="/e-library" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>E-Library</NavLink>
        <NavLink to="/structure" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>រចនាសម្ព័ន្ធ</NavLink>
        <NavLink to="/aboutus" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>អំពីយើង</NavLink>
        <Link to="/enrollment" className="mobile-enroll-btn" onClick={() => setMenuOpen(false)}>ចុះឈ្មោះចូលរៀន</Link>
      </div>
    </nav>
  );
};

export default NavbarMenu;
