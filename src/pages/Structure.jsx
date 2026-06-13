import React from "react";
import DepartmentSidebar from "./departments/DepartmentSidebar";
import "./Structure.css";
import SectionMOU from "../components/SectionMOU";
import { useLanguage } from "../context/LanguageContext";

const img_structure1 = [
  { id: 1, path: "/images/img-structure/1.jpg" },
  { id: 2, path: "/images/img-structure/2.jpg" },
  { id: 3, path: "/images/img-structure/3.jpg" },
  { id: 4, path: "/images/img-structure/4.jpg" },
  { id: 5, path: "/images/img-structure/5.jpg" },
];

const Structure = () => {
  const { t, lang } = useLanguage();
  const kh = lang === 'kh' ? { fontFamily: "Siemreap" } : {};

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h1 className="mb-4 khmer-title" style={kh}>{t('structure_title')}</h1>
          <div className="mt-3">
            <p style={kh}>{t('structure_p1')}</p>
            <p style={kh}>{t('structure_p2')}</p>
            <p style={kh}>{t('structure_p3')}</p>
          </div>
          <img
            src="/images/structure_image.jpg"
            alt="Structure of RPI"
            className="img-fluid rounded shadow"
          />
          <div className="row mt-4 g-3">
            {img_structure1.map((img) => (
              <div className="col-6" key={img.id}>
                <div className="structure-image-card">
                  <img
                    src={img.path}
                    alt={`Structure ${img.id}`}
                    className="img-fluid rounded shadow"
                  />
                </div>
              </div>
            ))}
          </div>
          <SectionMOU />
        </div>
        <div className="col-md-4">
          <DepartmentSidebar />
        </div>
      </div>
    </div>
  );
};

export default Structure;
