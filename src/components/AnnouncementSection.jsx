import React from "react";
import { FaRocket, FaGraduationCap, FaBullhorn } from "react-icons/fa";
import "./AnnouncementSection.css";

const announcements = [
  {
    icon: <FaRocket />,
    color: "#2563eb",
    bg: "#eff6ff",
    label: "New Course",
    title: "កម្មវិធីបណ្តុះបណ្តាលជំនាញ ១.៥ លាននាក់",
    desc: "វិទ្យាស្ថានបានបើកការចុះឈ្មោះសិក្សាសម្រាប់កម្មវិធីបណ្តុះបណ្តាលជំនាញវិជ្ជាជីវៈ និងបច្ចេកទេស ១.៥ លាននាក់ ក្នុងគ្រប់ជំនាញឯកទេស",
  },
  {
    icon: <FaGraduationCap />,
    color: "#0f766e",
    bg: "#f0fdfa",
    label: "Scholarship",
    title: "អាហារូបករណ៍ ១០០% + ប្រាក់ឧបត្ថម្ភ ២៨ម៉ឺនរៀល/ខែ",
    desc: "យុវជនពីគ្រួសារក្រីក្រ ឬងាយរងហានិភ័យ អាចទទួលបានអាហារូបករណ៍ ១០០% ព្រមទាំងប្រាក់ ២៨ម៉ឺនរៀលក្នុងមួយខែ",
  },
];

const AnnouncementSection = () => (
  <section className="announcement-section">
    <div className="container">
      <div className="announcement-header">
        <FaBullhorn className="announcement-icon-header" />
        <h2 className="announcement-title">ការប្រកាសសំខាន់ៗ</h2>
        <span className="announcement-badge">Latest News</span>
      </div>

      <div className="announcement-grid">
        {announcements.map((a, i) => (
          <div key={i} className="announcement-card">
            <div className="announcement-card-icon" style={{ background: a.bg, color: a.color }}>
              {a.icon}
            </div>
            <div className="announcement-card-body">
              <span className="announcement-card-label" style={{ color: a.color }}>{a.label}</span>
              <h5 className="announcement-card-title">{a.title}</h5>
              <p className="announcement-card-desc">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AnnouncementSection;
