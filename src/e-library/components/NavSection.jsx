import React, { useState } from "react";
import { Moon, Sun, Globe } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, title: "E-Book", icon: "📚" },
  { id: 2, title: "Thesis", icon: "🎓" },
  { id: 6, title: "Videos", icon: "🎥" },
];

const majors = [
  "វិទ្យាសាស្រ្តកុំព្យូទ័រ",
  "អគ្គិសនី",
  "មេកាត្រូនិក",
  "មេកានិកឧស្សាហកម្ម",
  "អេឡិចត្រូនិក",
  "មេកានិករថយន្ត",
  "សំណង់ស៊ីវិល",
  "ជំនាញបរិក្ខាត្រជាក់",
  "អក្សរសាស្រ្តអង់គ្លេស",
  "គណនេយ្យ និងហិរញ្ញវត្ថុ",
];

// Props: selectedMajor, onMajorChange, searchText, onSearchTextChange
const NavSection = ({
  selectedMajor,
  onMajorChange,
  searchText,
  onSearchTextChange,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-dark"
        style={{
          backgroundImage: "url('/images/banner-e-library.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "350px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
            zIndex: 1,
          }}
        ></div>
        <div
          className="container d-flex flex-column flex-lg-row justify-content-between pt-2"
          style={{ zIndex: 2 }}
        >
          <div className="d-flex align-items-center mb-2 mb-lg-0 text-white">
            <img
              src="/images/PRIT.png"
              alt="RPITSSR Logo"
              style={{ height: "80px" }}
              className="me-3"
            />
            <div>
              <h1
                style={{
                  fontFamily: "'Khmer OS Muol', sans-serif",
                  fontSize: "22px",
                  margin: 0,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                }}
              >
                បណ្ណាល័យអេឡិចត្រូនិក
              </h1>
              <h2
                style={{
                  fontSize: "15px",
                  margin: 0,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                }}
              >
                RPITSSR E-Library
              </h2>
            </div>
          </div>
          <ul className="navbar-nav flex-row ms-lg-auto align-items-center bg-transparent text-white">
            <li className="nav-item mx-2">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link text-white"
                to="/e-library/see-all/e-book"
              >
                E-book
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link text-white"
                to="/e-library/see-all/thesis"
              >
                Thesis
              </Link>
            </li>
            <li className="nav-item mx-2">
              <button
                className="btn btn-link nav-link text-white p-0"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center text-white"
                href="#"
                id="langDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Globe size={18} />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="langDropdown"
              >
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <span style={{ fontSize: 20, marginRight: 8 }}>🇰🇭</span>
                    Khmer
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <span style={{ fontSize: 20, marginRight: 8 }}>🇬🇧</span>
                    English
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Filter row: select + search input side by side */}
      <div
        className="py-3"
        style={{
          background: "linear-gradient(135deg, #1e40af, #0f766e)",
        }}
      >
        <div className="container">
          <div className="row g-2 align-items-center justify-content-center">
            <div className="col-12 col-md-auto">
              <select
                className="form-select w-100"
                value={selectedMajor}
                onChange={(e) => onMajorChange(e.target.value)}
              >
                <option value="">All skills</option>
                {majors.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md flex-grow-1">
              <input
                type="text"
                className="form-control w-100"
                placeholder="Search ebook title or author..."
                value={searchText}
                onChange={(e) => onSearchTextChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="container text-center py-4">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-6 g-3">
          {categories.map((cat) => {
            const slug = cat.title.toLowerCase().replace(/\s+/g, "-");

            if (cat.title === "Videos") {
              return (
                <div key={cat.id} className="col">
                  <div className="category-card h-100">
                    <a
                      href="https://www.youtube.com/@RPITSSR/videos"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="d-flex flex-column align-items-center"
                    >
                      <div style={{ fontSize: 24 }}>{cat.icon}</div>
                      <p className="mb-0 mt-2">{cat.title}</p>
                    </a>
                  </div>
                </div>
              );
            }

            return (
              <div key={cat.id} className="col">
                <div className="category-card h-100">
                  <Link
                    to={`/e-library/see-all/${slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    className="d-flex flex-column align-items-center"
                  >
                    <div style={{ fontSize: 24 }}>{cat.icon}</div>
                    <p className="mb-0 mt-2">{cat.title}</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavSection;
