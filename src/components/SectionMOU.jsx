import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./SectionMOU.css";

const mouPartners = [
  {
    id: 1,
    name: "DGTVET",
    logo: "/images/logo-mou/DGTVET.jpg",
  },
  {
    id: 2,
    name: "NPIC",
    logo: "/images/logo-mou/NPIC.png",
  },
  { id: 3, name: "NIB", logo: "/images/logo-mou/NIB.jpg" },
  { id: 4, name: "SAILUN", logo: "/images/logo-mou/sailun.jpg" },
  { id: 5, name: "JVC", logo: "/images/logo-mou/JVC.jpg" },
  { id: 6, name: "Chipmong", logo: "/images/logo-mou/chipmong.png" },
  { id: 7, name: "Elite", logo: "/images/logo-mou/elite.png" },
  { id: 8, name: "Minebea", logo: "/images/logo-mou/minebea.jpg" },
  { id: 9, name: "UtiLight", logo: "/images/logo-mou/utLight.jpg" },
  { id: 10, name: "Print Consulting", logo: "/images/logo-mou/pri_consulting.png" },
  
];

const SectionMOU = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container-fluid bg-secondary py-5" data-aos="fade-up">
      <div className="container">
        <div className="row align-items-center">
          {/* MOU Logos */}
          <div className="col-12 col-md-9 mb-4 mb-md-0">
            <h3 className="mb-4 text-center text-md-start text-white">🤝 Our MOU Partners</h3>
            <div className="row g-3 justify-content-center justify-content-md-start">
              {mouPartners.map((partner) => (
                <div className="col-4 col-sm-3 col-md-3 col-lg-2 text-center" key={partner.id}>
                  <div className="mou-logo-card p-2 border rounded bg-white shadow-sm h-100 d-flex align-items-center justify-content-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="img-fluid rounded-circle"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner Promotion */}
          <div className="col-12 col-md-3 text-center">
            <img
              src="https://images.pexels.com/photos/2528695/pexels-photo-2528695.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Promotion"
              className="img-fluid rounded shadow w-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionMOU;
