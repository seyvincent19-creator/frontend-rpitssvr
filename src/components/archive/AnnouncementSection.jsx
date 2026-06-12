import React from 'react';
import 'aos/dist/aos.css';

const AnnouncementSection = () => {
  return (
    <div 
      className="w-100 text-white py-5" 
      style={{ background: "linear-gradient(135deg, #1e40af, #0f766e)" }} // Blue → Teal gradient
      data-aos="fade-up"
    >
      <div className="container">
        <h2 className="mb-4 text-center fw-bold" data-aos="fade-up">
          📢 Latest Announcements
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="bg-white text-dark p-4 rounded shadow">
              <ul className="list-unstyled mb-0">

                <li className="mb-3">
                  <strong className="text-primary">🚀 New Course:</strong>{" "}
                  <span 
                    style={{ fontFamily: "Koulen", color: "#e85d04" }} // Friendly orange
                  >
                    កម្មវិធីបណ្តុះបណ្តាលជំនាញវិជ្ជាជីវៈ និងបច្ចេកទេស ១.៥លាននាក់
                  </span>
                </li>

                <li className="mb-3">
                  <strong className="text-success">🎤 Scholarship:</strong>{" "}
                  <span 
                    style={{ fontFamily: "Siemreap", color: "#0f766e" }} // Teal green
                  >
                    អាហារូបករណ៍ ១០០% ព្រមទាំងទទួលបានប្រាក់ឧបត្ថម្ភ ២៨ម៉ឺនរៀល/ខែ 
                    ដល់យុវជនមកពីគ្រួសារមានប័ណ្ណក្រីក្រ ឬគ្រួសារងាយរងហានិភ័យ
                  </span>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSection;
