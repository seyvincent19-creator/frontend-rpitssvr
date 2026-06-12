import React from "react";
import { FaFacebookF, FaTelegramPlane, FaYoutube, FaEnvelope, FaClock } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import "./TopNavbar.css";

const TopNavbar = () => {
  const { t } = useLanguage();
  return (
    <div className="top-navbar">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="top-navbar-hours">
          <FaClock className="me-1" />
          <span>{t('hours')}</span>
        </div>
        <div className="top-navbar-right">
          <a href="https://web.facebook.com/RPITSSVR.Official" target="_blank" rel="noreferrer" title="Facebook"><FaFacebookF /></a>
          <a href="https://t.me/+x8upPsGtNvsyZDQ1" target="_blank" rel="noreferrer" title="Telegram"><FaTelegramPlane /></a>
          <a href="https://www.youtube.com/@RPITSSR" target="_blank" rel="noreferrer" title="YouTube"><FaYoutube /></a>
          <a href="mailto:info@rpisvr.edu.kh" title="Email"><FaEnvelope /></a>
          <span className="top-divider" />
          <a href="/enrollment" className="top-enroll-btn">{t('enroll_btn')}</a>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
