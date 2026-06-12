import React, { useState, useEffect } from "react";
import { FaRocket, FaGraduationCap, FaBullhorn, FaTimes, FaSearchPlus } from "react-icons/fa";
import "./AnnouncementSection.css";

const announcements = [
  {
    icon: <FaRocket />,
    color: "#2563eb",
    bg: "#eff6ff",
    label: "New Course",
    title: "កម្មវិធីបណ្តុះបណ្តាលជំនាញ ១.៥ លាននាក់",
    desc: "វិទ្យាស្ថានបានបើកការចុះឈ្មោះសិក្សាសម្រាប់កម្មវិធីបណ្តុះបណ្តាលជំនាញវិជ្ជាជីវៈ និងបច្ចេកទេស ១.៥ លាននាក់ ក្នុងគ្រប់ជំនាញឯកទេស",
    leaflet: "/images/leaflet-course.jpg",
  },
  {
    icon: <FaGraduationCap />,
    color: "#0f766e",
    bg: "#f0fdfa",
    label: "Scholarship",
    title: "អាហារូបករណ៍ ១០០% + ប្រាក់ឧបត្ថម្ភ ២៨ម៉ឺនរៀល/ខែ",
    desc: "យុវជនពីគ្រួសារក្រីក្រ ឬងាយរងហានិភ័យ អាចទទួលបានអាហារូបករណ៍ ១០០% ព្រមទាំងប្រាក់ ២៨ម៉ឺនរៀលក្នុងមួយខែ",
    leaflet: "/images/leaflet-scholarship.jpg",
  },
];

const LeafletModal = ({ item, onClose }) => {
  // Close on Escape key
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
        <div className="leaflet-modal-header" style={{ borderColor: item.color }}>
          <div className="leaflet-modal-label" style={{ color: item.color, background: item.bg }}>
            <span style={{ marginRight: 6 }}>{item.icon}</span>
            {item.label}
          </div>
          <button className="leaflet-close-btn" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>

        {/* Image */}
        <div className="leaflet-img-wrap">
          <img
            src={item.leaflet}
            alt={item.label}
            className="leaflet-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
          <div className="leaflet-img-fallback" style={{ display: "none" }}>
            <FaSearchPlus size={40} color="#cbd5e1" />
            <p style={{ fontFamily: "Siemreap, sans-serif", color: "#94a3b8", marginTop: 12 }}>
              រូបភាព Leaflet មិនទាន់មានទេ
            </p>
            <small style={{ color: "#cbd5e1" }}>{item.leaflet}</small>
          </div>
        </div>

        {/* Title */}
        <div className="leaflet-modal-footer">
          <p style={{ fontFamily: "Siemreap, sans-serif", fontSize: 14, color: "#334155", margin: 0 }}>
            {item.title}
          </p>
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
