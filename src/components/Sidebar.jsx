import React, { useEffect } from "react";
import "./Sidebar.css";
import { FaFacebookF } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const Sidebar = () => {
  const { t } = useLanguage();
  useEffect(() => {
    if (!window.FB || !window.FB.XFBML || !window.FB.XFBML.parse) {
      ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/km_KH/sdk.js#xfbml=1&version=v17.0";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    } else {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="sidebar-card">
      {/* Header */}
      <div className="sidebar-header">
        <FaFacebookF className="sidebar-fb-icon" />
        <span>{t('sidebar_fb')}</span>
      </div>

      {/* Facebook Plugin */}
      <div className="sidebar-fb-wrapper">
        <div id="fb-root"></div>
        <div
          className="fb-page"
          data-href="https://web.facebook.com/RPITSSVR.Official"
          data-tabs="timeline"
          data-width="320"
          data-height="400"
          data-small-header="true"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="false"
        >
          <blockquote
            cite="https://web.facebook.com/RPITSSVR.Official"
            className="fb-xfbml-parse-ignore"
          >
            <a href="https://web.facebook.com/RPITSSVR.Official">
              RPITSSVR Official
            </a>
          </blockquote>
        </div>
      </div>

      {/* Follow Button */}
      <a
        href="https://web.facebook.com/RPITSSVR.Official"
        target="_blank"
        rel="noreferrer"
        className="sidebar-follow-btn"
      >
        <FaFacebookF style={{ marginRight: "8px" }} />
        {t('sidebar_follow')}
      </a>
    </div>
  );
};

export default Sidebar;
