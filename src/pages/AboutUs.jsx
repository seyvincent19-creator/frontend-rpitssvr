import React from "react";
import DepartmentSidebar from "./departments/DepartmentSidebar";
import SectionMOU from "../components/SectionMOU";
import { useLanguage } from "../context/LanguageContext";

const img_about1 = [
  { id: 1, path: "/images/img-aboutus/s1.jpg" },
  { id: 2, path: "/images/img-aboutus/s2.JPG" },
  { id: 3, path: "/images/img-aboutus/s3.JPG" },
  { id: 4, path: "/images/img-aboutus/s4.JPG" },
  { id: 5, path: "/images/img-aboutus/s5.jpg" },
  { id: 6, path: "/images/img-aboutus/s6.JPG" },
  { id: 7, path: "/images/img-aboutus/s7.jpg" },
  { id: 8, path: "/images/img-aboutus/s8.jpg" },
  { id: 9, path: "/images/img-aboutus/s9.jpg" },
  { id: 10, path: "/images/img-aboutus/s10.jpg" },
];

const About = () => {
  const { t, lang } = useLanguage();
  const kh = lang === 'kh' ? { fontFamily: "Siemreap" } : {};

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <h1 className="khmer-title mb-3" style={kh}>{t('about_title')}</h1>

          <p className="lead" style={{ color: "#2980b9", ...kh }}>
            {t('about_history')}
          </p>

          <h5 className="mb-2 khmer-title" style={kh}>{t('about_vision_title')}</h5>
          <p className="mb-3" style={kh}>{t('about_vision')}</p>

          <h5 className="mb-2 khmer-title" style={kh}>{t('about_mission_title')}</h5>
          <p className="mb-3" style={kh}>{t('about_mission')}</p>

          <h5 className="mb-2 khmer-title" style={kh}>{t('about_roles_title')}</h5>
          <ul className="mb-3">
            {t('about_roles').map((role, i) => (
              <li key={i} style={kh}>{role}</li>
            ))}
          </ul>

          <h5 className="mb-2 khmer-title" style={kh}>{t('about_fields_title')}</h5>
          <ul className="mb-3">
            {t('about_fields').map((field, i) => (
              <li key={i} style={kh}>{field}</li>
            ))}
          </ul>

          <h5 className="mb-3" style={kh}>{t('about_gallery_title')}</h5>
          <div className="row g-3">
            {img_about1.map((image) => (
              <div className="col-6 col-md-4" key={image.id}>
                <img src={image.path} alt={`Campus ${image.id}`} className="img-fluid rounded shadow-sm" />
              </div>
            ))}
          </div>

          <div className="mt-2">
            <SectionMOU />
          </div>
        </div>

        <div className="col-md-4">
          <DepartmentSidebar />
        </div>
      </div>
    </div>
  );
};

export default About;
