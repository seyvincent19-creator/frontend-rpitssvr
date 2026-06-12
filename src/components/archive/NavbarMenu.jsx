import React from "react";
import { NavLink, Link } from "react-router-dom"; // still need Link for dropdowns
import "./NavbarMenu.css";

const NavbarMenu = () => (
  <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(135deg, #1e40af, #0f766e)" }}>
    <div className="container py-2 px-3 border-top border-bottom rounded">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-0 menu-left">
          {/* align left */}
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              ទំព័រដើម
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/newspost" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              ព្រឹត្តិការណ៍ថ្មីៗ
            </NavLink>
          </li>

          {/* Dropdown for Department */}
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="departmentDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ដេប៉ាតឺម៉ង់
            </button>

            <ul className="dropdown-menu" aria-labelledby="departmentDropdown">
              <li><Link className="dropdown-item" to="/department/1">វិទ្យាសាស្រ្តកុំព្យូទ័រ</Link></li>
              <li><Link className="dropdown-item" to="/department/2">អគ្គិសនី</Link></li>
              <li><Link className="dropdown-item" to="/department/3">មេកាត្រូនិក</Link></li>
              <li><Link className="dropdown-item" to="/department/4">មេកានិកឧស្សាហកម្ម</Link></li>
              <li><Link className="dropdown-item" to="/department/5">អេឡិចត្រូនិច</Link></li>
              
              <li><Link className="dropdown-item" to="/department/6">មេកានិករថយន្ត</Link></li>
              <li><Link className="dropdown-item" to="/department/7">សំណង់ស៊ីវិល</Link></li>
              <li><Link className="dropdown-item" to="/department/8">បរិក្ខារត្រជាក់</Link></li>
              <li><Link className="dropdown-item" to="/department/9">អក្សរសាស្រ្តអង់គ្លេស</Link></li>
              <li><Link className="dropdown-item" to="/department/10">គណនេយ្យ ហិរញ្ញវត្ថុ</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink to="/communication" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              ទំនាក់ទំនង ឧស្សាហកម្ម
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/e-library" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              បណ្ណាល័យអេឡិចត្រូនិច (E-Library)
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/structure" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              រចនាសម្ព័ន្ធ
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/aboutus" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              អំពីយើង
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavbarMenu;
