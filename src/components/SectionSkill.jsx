import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./SectionSkill.css";

const SectionSkill = () => {
  const { t, lang } = useLanguage();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          // local API
          //"https://phplaravel-1634699-6478817.cloudwaysapps.com/api/departments"
          // Server API
          "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/departments"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          setDepartments(data.data);
        } else if (Array.isArray(data)) {
          setDepartments(data);
        } else {
          setDepartments([]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching departments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">{t('dept_loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {t('dept_error')} {error}
        </div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-info" role="alert">
          {t('dept_empty')}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ fontFamily: "Siemreap", color: "#134EED" }}>
        {t('dept_heading')}
      </h2>
      <div className="row g-4">
        {departments.map((department) => {
          const firstImage =
            department.description_images &&
            department.description_images.length > 0
              ? department.description_images[0].path
              : department.image_description
              ? department.image_description
              : null;

          const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='180' viewBox='0 0 300 180'%3E%3Crect width='300' height='180' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%236c757d'%3ENo Image%3C/text%3E%3C/svg%3E`;

          const imageUrl = firstImage
            ? firstImage.startsWith("http")
              ? firstImage
              : `https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/${firstImage}`
            : PLACEHOLDER;

          return (
            <div className="col-md-6 col-lg-3" key={department.id}>
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <img
                  src={imageUrl}
                  className="card-img-top rounded-top"
                  alt={department.title_eng}
                  style={{ height: "180px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER;
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title"
                    style={{ color: "#0d6efd", fontWeight: "600", fontFamily: lang === 'kh' ? "Siemreap" : "Koulen" }}
                  >
                    {lang === 'kh' ? department.title_khmer : department.title_eng}
                  </h5>
                  <p
                    className="card-text small"
                    style={{ fontFamily: lang === 'kh' ? "inherit" : "Siemreap", color: "#03696dff" }}
                  >
                    {lang === 'kh' ? department.title_eng : department.title_khmer}
                  </p>
                  <p
                    className="card-text small text-truncate"
                    style={{ color: "#555" }}
                  >
                    {department.description?.substring(0, 80)}...
                  </p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Link
                      to={`/department/${department.id}`}
                      className="btn btn-outline-primary btn-sm rounded-pill"
                    >
                      {t('dept_read_more')}
                    </Link>
                    <Link
                      to={`/enrollment`}
                      className="btn btn-primary btn-sm rounded-pill"
                    >
                      {t('dept_enroll')}
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionSkill;
