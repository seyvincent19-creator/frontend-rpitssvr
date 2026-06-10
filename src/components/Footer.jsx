import React from "react";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 text-white"
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #0f766e)", // blue → teal gradient
        fontFamily: "Siemreap, sans-serif",
      }}
    >
      <div className="container">
        <div className="row">
          {/* About Us */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-warning">អំពីយើង</h5>
            <p>
              យើងតាំងចិត្តផ្តល់នូវឱកាសអប់រំ និងអាជីពល្អបំផុត ដើម្បីបង្កើន
              និងផ្ដល់អំណាចដល់អ្នកសិក្សាទូទាំងពិភពលោក។
            </p>
          </div>

          {/* Map */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-warning">ទីតាំងរបស់យើង</h5>
            <div className="map-responsive rounded shadow-sm">
              <iframe
                title="company-location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11674.854486027714!2d105.80110900000001!3d11.082811!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b07ebc203cfc9%3A0x439588dc46bc22c4!2z4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6f4Z-S4Z6Q4Z624Z6T4Z6W4Z6g4Z674Z6U4Z6F4Z-S4Z6F4Z-B4Z6A4Z6R4Z-B4Z6f4Z6X4Z684Z6Y4Z634Z6X4Z624Z6C4Z6P4Z-B4Z6H4Z-E4Z6f4Z-C4Z6T4Z6f4Z-S4Z6c4Z624Z6Z4Z6a4Z-A4Z6EIFJlZ2lvbmFsIFBvbHl0ZWNobmljIEluc3RpdHV0ZSBURUNITyBTRU4gU3ZheSBSaWVuZw!5e1!3m2!1sen!2skh!4v1756369130313!5m2!1sen!2skh"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11674.854486027714!2d105.80110900000001!3d11.082811!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b07ebc203cfc9%3A0x439588dc46bc22c4!2z4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6f4Z-S4Z6Q4Z624Z6T4Z6W4Z6g4Z674Z6U4Z6F4Z-S4Z6F4Z-B4Z6A4Z6R4Z-B4Z6f4Z6X4Z684Z6Y4Z634Z6X4Z624Z6C4Z6P4Z-B4Z6H4Z-E4Z6f4Z-C4Z6T4Z6f4Z-S4Z6c4Z624Z6Z4Z6a4Z-A4Z6EIFJlZ2lvbmFsIFBvbHl0ZWNobmljIEluc3RpdHV0ZSBURUNITyBTRU4gU3ZheSBSaWVuZw!5e1!3m2!1sen!2skh!4v1756369130313!5m2!1sen!2skh" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
          </div>

          {/* Contact Us */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-warning">ទំនាក់ទំនង</h5>
            <p>
              Email: info@rpisvr.edu.kh
              <br />
              Phone: +855 953 2333
              <br />
              Address: ភូមិមេភ្លើង សង្កាត់ស្វាយរៀង ក្រុងស្វាយរៀង ខេត្តស្វាយរៀង
              <br />
              ( ខាងលិចឈៀងខាងត្បូងស្រះវង់ចម្ងាយ ២០ម៉ែត្រ )
            </p>

            <div className="d-flex gap-3 mt-3">
              <a
                href="https://web.facebook.com/R.P.I.T.S.S.R"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4 text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://t.me/+x8upPsGtNvsyZDQ1"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4 text-white"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://www.youtube.com/@RPITSSR"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4 text-white"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.tiktok.com/@rpisvr"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4 text-white"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <div className="text-center">
          &copy; {new Date().getFullYear()} វិទ្យាស្ថានពហុបច្ចេកទេស ភូមិភាគតេជោសែន
          ស្វាយរៀង. រក្សាសិទ្ធិគ្រប់យ៉ាង។
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .map-responsive {
          overflow: hidden;
          padding-bottom: 56.25%;
          position: relative;
          height: 0;
          border-radius: 12px;
        }
        .map-responsive iframe {
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          position: absolute;
          border-radius: 12px;
        }
        a {
          transition: color 0.3s ease;
        }
        a:hover {
          color: #ffd700; /* gold hover effect */
        }
      `}</style>
    </footer>
  );
};

export default Footer;
