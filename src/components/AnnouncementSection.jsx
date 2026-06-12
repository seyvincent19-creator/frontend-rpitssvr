import React, { useState, useEffect, useCallback } from "react";
import { FaRocket, FaGraduationCap, FaBullhorn, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./AnnouncementSection.css";

const announcements = [
  {
    icon: <FaRocket />,
    color: "#2563eb",
    bg: "#eff6ff",
    label: "New Course",
    title: "កម្មវិធីបណ្តុះបណ្តាលជំនាញ ១.៥ លាននាក់",
    desc: "អាហារូបករណ៍ ១០០% សម្រាប់យុវជនមកពីគ្រួសារក្រីក្រ ឬងាយរងហានិភ័យ + ប្រាក់ឧបត្ថម្ភប ២៨ម៉ឺនរៀល/ខែ",
    leaflets: [
      "/images/img-leaflet1.5m/front.jpg",
      "/images/img-leaflet1.5m/back.jpg",
    ],
    slideLabels: ["ខាងមុខ", "ខាងក្រោយ"],
  },
  {
    icon: <FaGraduationCap />,
    color: "#0f766e",
    bg: "#f0fdfa",
    label: "Scholarship",
    title: "អាហារូបករណ៍ ១០០% សម្រាប់កម្រិតសសញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស ឬបរិញ្ញាបត្ររង",
    desc: "លក្ខខណ្ឌសិក្សា៖ សិស្សប្រឡងជាប់ ឬធ្លាក់សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ(បាក់ឌុប) ឬសញ្ញាបត្រសមមូល ឬសញ្ញាបត្របច្ចេកទេស និងវិជ្ជាជីវៈ​ ៣",
    leaflets: [
      "/images/img-leaflet-longcourse/long-course-front.jpg",
      "/images/img-leaflet-longcourse/long-course-back.jpg",
    ],
    slideLabels: ["ខាងមុខ", "ខាងក្រោយ"],
  },
];

const LeafletModal = ({ item, onClose }) => {
  const [current, setCurrent] = useState(0);
  const total = item.leaflets.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  // Close on Escape, lock scroll
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="leaflet-overlay" onClick={onClose}>
      <div className="leaflet-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="leaflet-modal-header" style={{ borderBottomColor: item.color }}>
          <div className="leaflet-modal-label" style={{ color: item.color, background: item.bg }}>
            <span className="leaflet-label-icon">{item.icon}</span>
            {item.label}
          </div>
          <div className="leaflet-header-right">
            <span className="leaflet-slide-label" style={{ color: item.color }}>
              {item.slideLabels?.[current] ?? `${current + 1} / ${total}`}
            </span>
            <button className="leaflet-close-btn" onClick={onClose} aria-label="Close">
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Slideshow */}
        <div className="leaflet-slideshow">
          {item.leaflets.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${item.label} ${i + 1}`}
              className={`leaflet-slide-img ${i === current ? "leaflet-slide-img--active" : ""}`}
            />
          ))}

          {/* Prev / Next arrows */}
          <button className="leaflet-arrow leaflet-arrow--left" onClick={prev} aria-label="Previous">
            <FaChevronLeft />
          </button>
          <button className="leaflet-arrow leaflet-arrow--right" onClick={next} aria-label="Next">
            <FaChevronRight />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="leaflet-dots">
          {item.leaflets.map((_, i) => (
            <button
              key={i}
              className={`leaflet-dot ${i === current ? "leaflet-dot--active" : ""}`}
              style={{ background: i === current ? item.color : undefined }}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Title */}
        <div className="leaflet-modal-footer">
          <p className="leaflet-footer-title">{item.title}</p>
        </div>

      </div>
    </div>
  );
};

const AnnouncementSection = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="announcement-section">
      <div className="container">
        <div className="announcement-header">
          <FaBullhorn className="announcement-icon-header" />
          <h2 className="announcement-title">ការប្រកាសសំខាន់ៗ</h2>
          <span className="announcement-badge">Latest News</span>
        </div>

        <div className="announcement-grid">
          {announcements.map((a, i) => (
            <div
              key={i}
              className="announcement-card announcement-card--clickable"
              onClick={() => setActiveItem(a)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setActiveItem(a)}
            >
              <div className="announcement-card-icon" style={{ background: a.bg, color: a.color }}>
                {a.icon}
              </div>
              <div className="announcement-card-body">
                <span className="announcement-card-label" style={{ color: a.color }}>{a.label}</span>
                <h5 className="announcement-card-title">{a.title}</h5>
                <p className="announcement-card-desc">{a.desc}</p>
                <span className="announcement-card-hint" style={{ color: a.color }}>
                  មើល Leaflet →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeItem && (
        <LeafletModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  );
};

export default AnnouncementSection;
