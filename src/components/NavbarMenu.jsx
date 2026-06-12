import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./NavbarMenu.css";

const DEPARTMENTS = [
  { id: 1, name_kh: "វិទ្យាសាស្រ្តកុំព្យូទ័រ",    name_en: "Computer Science" },
  { id: 2, name_kh: "អគ្គិសនី",                  name_en: "Electrical" },
  { id: 3, name_kh: "មេកាត្រូនិក",               name_en: "Mechatronics" },
  { id: 4, name_kh: "មេកានិកឧស្សាហកម្ម",         name_en: "Industrial Mechanics" },
  { id: 5, name_kh: "អេឡិចត្រូនិច",               name_en: "Electronics" },
  { id: 6, name_kh: "មេកានិករថយន្ត",              name_en: "Automotive" },
  { id: 7, name_kh: "សំណង់ស៊ីវិល",               name_en: "Civil Engineering" },
  { id: 8, name_kh: "បរិក្ខារត្រជាក់",             name_en: "Refrigeration" },
  { id: 9, name_kh: "អក្សរសាស្រ្តអង់គ្លេស",       name_en: "English" },
  { id: 10, name_kh: "គណនេយ្យ ហិរញ្ញវត្ថុ",       name_en: "Accounting & Finance" },
];

const NavbarMenu = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const deptName = (d) => lang === 'en' ? d.name_en : d.name_kh;

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
          <li><NavLink to="/" end className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>{t('nav_home')}</NavLink></li>
          <li><NavLink to="/newspost" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>{t('nav_news')}</NavLink></li>

          <li className="nav-dropdown-wrap">
            <button className="nav-item-link nav-dropdown-btn">
              {t('nav_departments')} <span className="nav-caret">▾</span>
            </button>
            <div className="nav-dropdown-menu">
              {DEPARTMENTS.map((d) => (
                <Link key={d.id} to={`/department/${d.id}`} className="nav-dropdown-item">{deptName(d)}</Link>
              ))}
            </div>
          </li>

          <li><NavLink to="/communication" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>{t('nav_industry')}</NavLink></li>
          <li><NavLink to="/e-library" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>{t('nav_elibrary')}</NavLink></li>
          <li><NavLink to="/structure" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>{t('nav_structure')}</NavLink></li>
          <li><NavLink to="/aboutus" className={({ isActive }) => isActive ? "nav-item-link active" : "nav-item-link"}>{t('nav_about')}</NavLink></li>

          {/* Language Toggle */}
          <li>
            <button className="lang-toggle-btn" onClick={toggle} aria-label="Switch language">
              {t('lang_label')}
            </button>
          </li>
        </ul>

        {/* Mobile: hamburger + lang toggle */}
        <div className="d-flex d-lg-none align-items-center gap-2">
          <button className="lang-toggle-btn" onClick={toggle} aria-label="Switch language">
            {t('lang_label')}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
            <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
            <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <NavLink to="/" end className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav_home')}</NavLink>
        <NavLink to="/newspost" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav_news')}</NavLink>
        <details className="mobile-dropdown">
          <summary className="mobile-nav-link">{t('nav_departments')} ▾</summary>
          {DEPARTMENTS.map((d) => (
            <Link key={d.id} to={`/department/${d.id}`} className="mobile-nav-sub" onClick={() => setMenuOpen(false)}>{deptName(d)}</Link>
          ))}
        </details>
        <NavLink to="/communication" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav_industry')}</NavLink>
        <NavLink to="/e-library" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav_elibrary')}</NavLink>
        <NavLink to="/structure" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav_structure')}</NavLink>
        <NavLink to="/aboutus" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav_about')}</NavLink>
        <Link to="/enrollment" className="mobile-enroll-btn" onClick={() => setMenuOpen(false)}>{t('enroll_btn')}</Link>
      </div>
    </nav>
  );
};

export default NavbarMenu;
