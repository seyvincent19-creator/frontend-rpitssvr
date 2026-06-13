import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ELibraryUI.css";
import { Link } from "react-router-dom";
import NavSection from "./components/NavSection";

const API_EBOOKS = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/ebooks";
const API_THESES = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/thesis";
const BASE_STORAGE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";

export default function ELibraryUI() {
  const [ebooks, setEbooks] = useState([]);
  const [thesis, setThesis] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (selectedMajor) params.append("category", selectedMajor);
    if (searchText.trim()) params.append("q", searchText.trim());
    const url = API_EBOOKS + (params.toString() ? `?${params.toString()}` : "");

    fetch(url, { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => setEbooks(d.data || d))
      .catch((e) => { if (e.name !== "AbortError") console.error(e); });

    return () => controller.abort();
  }, [selectedMajor, searchText]);

  useEffect(() => {
    fetch(API_THESES)
      .then((r) => r.json())
      .then((d) => setThesis(d.data || d))
      .catch(console.error);
  }, []);

  return (
    <div className="elib-page">
      <NavSection
        selectedMajor={selectedMajor}
        onMajorChange={setSelectedMajor}
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />

      <BookSection
        title="E-Book"
        icon="📚"
        badgeCls="elib-section-badge--ebook"
        items={ebooks}
        imageField="image"
        titleField="title"
        subTitleField="author"
        category="e-book"
      />

      <BookSection
        title="Thesis"
        icon="🎓"
        badgeCls="elib-section-badge--thesis"
        items={thesis}
        imageField="image"
        titleField="title"
        subTitleField="student"
        category="thesis"
      />
    </div>
  );
}

function BookSection({ title, icon, badgeCls, items, imageField, titleField, subTitleField, category }) {
  return (
    <section className="elib-section">
      <div className="container">
        <div className="elib-section-header">
          <div className="elib-section-left">
            <span className={`elib-section-badge ${badgeCls}`}>
              <span>{icon}</span> {title}
            </span>
            {items.length > 0 && (
              <span className="elib-section-count">{items.length} items</span>
            )}
          </div>
          <Link to={`/e-library/see-all/${category}`} className="elib-see-more">
            See All →
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="elib-empty">
            <span className="elib-empty-icon">📭</span>
            <p className="elib-empty-text">មិនមានទិន្នន័យសម្រាប់ប្រភេទនេះទេ</p>
          </div>
        ) : (
          <div className="elib-books-grid">
            {items.map((item, idx) => {
              const rawPath = item[imageField] || "";
              const normalized = rawPath.startsWith("/") ? rawPath.substring(1) : rawPath;
              const imgSrc = normalized
                ? BASE_STORAGE_URL + normalized
                : null;

              return (
                <BookCard
                  key={item.id}
                  item={item}
                  imgSrc={imgSrc}
                  titleField={titleField}
                  subTitleField={subTitleField}
                  category={category}
                  delay={idx * 40}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function BookCard({ item, imgSrc, titleField, subTitleField, category, delay }) {
  const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='240' viewBox='0 0 180 240'%3E%3Crect width='180' height='240' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%2394a3b8'%3ENo Cover%3C/text%3E%3C/svg%3E`;

  return (
    <div className="elib-book-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="elib-book-cover-wrap">
        <img
          src={imgSrc || PLACEHOLDER}
          alt={item[titleField]}
          className="elib-book-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
        />
        <div className="elib-book-cover-hover">
          <Link to={`/e-library/detail/${category}/${item.id}`} className="elib-hover-read-btn">
            ចូលអានឯកសារ
          </Link>
        </div>
      </div>

      <div className="elib-book-body">
        <p className="elib-book-title">{item[titleField]}</p>
        {item[subTitleField] && (
          <p className="elib-book-author">{item[subTitleField]}</p>
        )}
        <Link to={`/e-library/detail/${category}/${item.id}`} className="elib-read-link">
          ចូលអានឯកសារ
        </Link>
      </div>
    </div>
  );
}
