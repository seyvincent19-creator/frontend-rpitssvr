import React, { useState, useEffect, useCallback } from "react";
import { FaRocket, FaGraduationCap, FaBullhorn, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import "./AnnouncementSection.css";

const CARD_CONFIGS = [
  {
    icon: <FaRocket />,
    color: "#2563eb",
    bg: "#eff6ff",
    labelKey: 'announce_card1_label',
    titleKey: 'announce_card1_title',
    descKey: 'announce_card1_desc',
    leaflets: [
      "/images/img-leaflet1.5m/front.jpg",
      "/images/img-leaflet1.5m/back.jpg",
    ],
  },
  {
    icon: <FaGraduationCap />,
    color: "#0f766e",
    bg: "#f0fdfa",
    labelKey: 'announce_card2_label',
    titleKey: 'announce_card2_title',
    descKey: 'announce_card2_desc',
    leaflets: [
      "/images/img-leaflet-longcourse/long-course-front.jpg",
      "/images/img-leaflet-longcourse/long-course-back.jpg",
    ],
  },
];

const LeafletModal = ({ item, onClose, t }) => {
  const [current, setCurrent] = useState(0);
  const total = item.leaflets.length;
  const slideLabels = [t('slide_front'), t('slide_back')];

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

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

        <div className="leaflet-modal-header" style={{ borderBottomColor: item.color }}>
          <div className="leaflet-modal-label" style={{ color: item.color, background: item.bg }}>
            <span className="leaflet-label-icon">{item.icon}</span>
            {t(item.labelKey)}
          </div>
          <div className="leaflet-header-right">
            <span className="leaflet-slide-label" style={{ color: item.color }}>
              {slideLabels[current] ?? `${current + 1} / ${total}`}
            </span>
            <button className="leaflet-close-btn" onClick={onClose} aria-label="Close">
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="leaflet-slideshow">
          {item.leaflets.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${t(item.labelKey)} ${i + 1}`}
              className={`leaflet-slide-img ${i === current ? "leaflet-slide-img--active" : ""}`}
            />
          ))}
          <button className="leaflet-arrow leaflet-arrow--left" onClick={prev} aria-label="Previous">
            <FaChevronLeft />
          </button>
          <button className="leaflet-arrow leaflet-arrow--right" onClick={next} aria-label="Next">
            <FaChevronRight />
          </button>
        </div>

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

        <div className="leaflet-modal-footer">
          <p className="leaflet-footer-title">{t(item.titleKey)}</p>
        </div>

      </div>
    </div>
  );
};

const AnnouncementSection = () => {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="announcement-section">
      <div className="container">
        <div className="announcement-header">
          <FaBullhorn className="announcement-icon-header" />
          <h2 className="announcement-title">{t('announce_section_title')}</h2>
          <span className="announcement-badge">{t('announce_badge')}</span>
        </div>

        <div className="announcement-grid">
          {CARD_CONFIGS.map((a, i) => (
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
                <span className="announcement-card-label" style={{ color: a.color }}>{t(a.labelKey)}</span>
                <h5 className="announcement-card-title">{t(a.titleKey)}</h5>
                <p className="announcement-card-desc">{t(a.descKey)}</p>
                <span className="announcement-card-hint" style={{ color: a.color }}>
                  {t('announce_hint')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeItem && (
        <LeafletModal item={activeItem} onClose={() => setActiveItem(null)} t={t} />
      )}
    </section>
  );
};

export default AnnouncementSection;
