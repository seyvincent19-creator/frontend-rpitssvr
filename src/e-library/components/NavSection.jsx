import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../ELibraryUI.css";

const categories = [
  { id: 1, slug: "e-book",  label: "E-Book",  icon: "📚", cls: "elib-cat-chip--ebook",  href: null },
  { id: 2, slug: "thesis",  label: "Thesis",  icon: "🎓", cls: "elib-cat-chip--thesis", href: null },
  { id: 3, slug: "videos",  label: "Videos",  icon: "🎥", cls: "elib-cat-chip--video",  href: "https://www.youtube.com/@RPITSSR/videos" },
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

const NavSection = ({ selectedMajor, onMajorChange, searchText, onSearchTextChange }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle("dark-theme", next);
  };

  return (
    <>
      {/* ── Hero ── */}
      <div className="elib-hero">
        <div className="elib-hero-overlay" />

        {/* Top row: logo + nav */}
        <div className="elib-hero-top container">
          <div className="elib-hero-brand">
            <img src="/images/PRIT.png" alt="RPITSSR Logo" className="elib-hero-logo" />
            <div>
              <h1 className="elib-hero-title">បណ្ណាល័យអេឡិចត្រូនិក</h1>
              <p className="elib-hero-subtitle">RPITSSVR Digital Library</p>
            </div>
          </div>

          <nav className="elib-hero-nav">
            <Link className="elib-nav-link" to="/">Home</Link>
            <Link className="elib-nav-link" to="/e-library/see-all/e-book">E-Book</Link>
            <Link className="elib-nav-link" to="/e-library/see-all/thesis">Thesis</Link>
            <button
              className="elib-nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>
        </div>

        {/* Bottom: search */}
        <div className="elib-hero-bottom container">
          <div className="elib-search-bar">
            <div className="elib-search-wrap">
              <FaSearch className="elib-search-icon" />
              <input
                type="text"
                className="elib-search-input"
                placeholder="ស្វែងរកឈ្មោះសៀវភៅ ឬអ្នកនិពន្ធ..."
                value={searchText}
                onChange={(e) => onSearchTextChange(e.target.value)}
              />
            </div>
            <select
              className="elib-search-select"
              value={selectedMajor}
              onChange={(e) => onMajorChange(e.target.value)}
            >
              <option value="">ជំនាញទាំងអស់</option>
              {majors.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Category Chips ── */}
      <div className="elib-categories">
        <div className="container">
          <div className="elib-cat-list">
            {categories.map((cat) =>
              cat.href ? (
                <a
                  key={cat.id}
                  href={cat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`elib-cat-chip ${cat.cls}`}
                >
                  <span className="elib-cat-icon">{cat.icon}</span>
                  {cat.label}
                </a>
              ) : (
                <Link
                  key={cat.id}
                  to={`/e-library/see-all/${cat.slug}`}
                  className={`elib-cat-chip ${cat.cls}`}
                >
                  <span className="elib-cat-icon">{cat.icon}</span>
                  {cat.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavSection;
