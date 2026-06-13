import React from "react";
import DepartmentSidebar from "./departments/DepartmentSidebar";
import SectionMOU from "../components/SectionMOU";
import { useLanguage } from "../context/LanguageContext";

const img_gallery = [
  { id: 1, path: "/images/img-idustry/1.jpg" },
  { id: 2, path: "/images/img-idustry/2.jpg" },
  { id: 3, path: "/images/img-idustry/3.jpg" },
  { id: 4, path: "/images/img-aboutus/s4.JPG" },
  { id: 5, path: "/images/img-aboutus/s5.jpg" },
  { id: 6, path: "/images/img-aboutus/s6.JPG" },
  { id: 7, path: "/images/img-aboutus/s7.jpg" },
  { id: 8, path: "/images/img-idustry/4.jpg" },
  { id: 9, path: "/images/img-idustry/5.jpg" },
];

const ComMou = () => {
  const { t, lang } = useLanguage();
  const kh = lang === 'kh' ? { fontFamily: "Siemreap" } : {};

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <h1 className="khmer-title mb-3" style={kh}>{t('commou_title')}</h1>

          <p className="lead" style={{ color: "#2980b9", ...kh }}>
            {t('commou_intro')}
          </p>

          <h5 className="mb-2 khmer-title" style={kh}>{t('commou_roles_title')}</h5>
          <ul className="mb-3">
            {t('commou_roles').map((role, i) => (
              <li key={i} style={kh}><span dangerouslySetInnerHTML={{ __html: role }} /></li>
            ))}
          </ul>

          <h5 className="mb-2 khmer-title" style={kh}>{t('commou_activities_title')}</h5>
          <ul className="mb-3">
            {t('commou_activities').map((act, i) => (
              <li key={i} style={kh}>{act}</li>
            ))}
          </ul>

          <h5 className="mb-2 khmer-title" style={kh}>{t('commou_objectives_title')}</h5>
          <ul className="mb-3">
            {t('commou_objectives').map((obj, i) => (
              <li key={i} style={kh}>{obj}</li>
            ))}
          </ul>

          <h5 className="mb-3" style={kh}>{t('commou_gallery_title')}</h5>
          <div className="row g-3">
            {img_gallery.map((image) => (
              <div className="col-6 col-md-4" key={image.id}>
                <img src={image.path} alt={`Industry ${image.id}`} className="img-fluid rounded shadow-sm" />
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

export default ComMou;
