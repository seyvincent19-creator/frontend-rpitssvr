import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTelegramPlane, FaYoutube, FaTiktok, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-main">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <img src="/images/PRIT.png" alt="Logo" className="footer-logo" />
            <h4 className="footer-brand-name">វិទ្យាស្ថានពហុបច្ចេកទេស<br />ភូមិភាគតេជោសែនស្វាយរៀង</h4>
            <p className="footer-brand-en">Regional Polytechnic Institute Techo Sen Svay Rieng</p>
            <div className="footer-socials">
              <a href="https://web.facebook.com/RPITSSVR.Official" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://t.me/+x8upPsGtNvsyZDQ1" target="_blank" rel="noreferrer" aria-label="Telegram"><FaTelegramPlane /></a>
              <a href="https://www.youtube.com/@RPITSSR" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://www.tiktok.com/@rpisvr" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5 className="footer-col-title">តំណភ្ជាប់រហ័ស</h5>
            <ul className="footer-links">
              <li><Link to="/">ទំព័រដើម</Link></li>
              <li><Link to="/newspost">ព្រឹត្តិការណ៍</Link></li>
              <li><Link to="/aboutus">អំពីយើង</Link></li>
              <li><Link to="/structure">រចនាសម្ព័ន្ធ</Link></li>
              <li><Link to="/communication">ឧស្សាហកម្ម</Link></li>
              <li><Link to="/e-library">E-Library</Link></li>
              <li><Link to="/enrollment">ចុះឈ្មោះចូលរៀន</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5 className="footer-col-title">ទំនាក់ទំនង</h5>
            <ul className="footer-contact-list">
              <li><FaEnvelope /><a href="mailto:info@rpisvr.edu.kh">info@rpisvr.edu.kh</a></li>
              <li><FaPhone /><a href="tel:+855953233">+855 953 2333</a></li>
              <li><FaMapMarkerAlt /><span>ភូមិមេភ្លើង សង្កាត់ស្វាយរៀង ក្រុងស្វាយរៀង ខេត្តស្វាយរៀង</span></li>
            </ul>
          </div>

          {/* Map */}
          <div className="footer-col">
            <h5 className="footer-col-title">ទីតាំងរបស់យើង</h5>
            <div className="footer-map">
              <iframe
                title="RPITSSVR Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11674.854486027714!2d105.80110900000001!3d11.082811!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b07ebc203cfc9%3A0x439588dc46bc22c4!2z4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6f4Z-S4Z6Q4Z624Z6T4Z6W4Z6g4Z674Z6U4Z6F4Z-S4Z6F4Z-B4Z6A4Z6R4Z-B4Z6f4Z6X4Z684Z6Y4Z634Z6X4Z624Z6C4Z6P4Z-B4Z6H4Z-E4Z6f4Z-C4Z6T4Z6f4Z-S4Z6c4Z624Z6Z4Z6a4Z-A4Z6EIFJlZ2lvbmFsIFBvbHl0ZWNobmljIEluc3RpdHV0ZSBURUNITyBTRU4gU3ZheSBSaWVuZw!5e1!3m2!1sen!2skh!4v1756369130313!5m2!1sen!2skh"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="container">
        <span>&copy; {new Date().getFullYear()} វិទ្យាស្ថានពហុបច្ចេកទេសភូមិភាគតេជោសែនស្វាយរៀង។ រក្សាសិទ្ធិគ្រប់យ៉ាង។</span>
        <span>Designed with ♥ for RPITSSVR</span>
      </div>
    </div>
  </footer>
);

export default Footer;
