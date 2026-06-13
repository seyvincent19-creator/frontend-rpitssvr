// src/components/ElectricSidebar.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DepartmentSidebar.css";
import { useLanguage } from "../../context/LanguageContext";

const DepartmentSidebar = () => {
  const { t, lang } = useLanguage();
  const bannerImages = [
    "/images/b1.jpg",
    "/images/b2.jpg",
    "/images/b3.jpg",
  ];

  return (
    <div className="electric-sidebar bg-light p-3 rounded shadow-sm d-none d-md-block">
      <h5 className="text-center mb-3" style={{ fontFamily: lang === 'kh' ? "'Siemreap', sans-serif" : "inherit", fontSize: "1.5rem", color: "rgba(255, 51, 177, 1)" }}>{t('dept_sidebar_title')}</h5>
      {bannerImages.map((src, index) => (
        <div key={index} className="mb-3">
          <img src={src} alt={`Banner ${index + 1}`} className="img-fluid rounded" />
        </div>
      ))}
    </div>
  );
};

export default DepartmentSidebar;
