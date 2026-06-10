// src/components/ElectricSidebar.jsx
import React from "react";
// Importing CSS for styling
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported for styling
import "./DepartmentSidebar.css";

const DepartmentSidebar = () => {
  const bannerImages = [
    "/images/b1.jpg",
    "/images/b2.jpg",
    "/images/b3.jpg",
  ];

  return (
    <div className="electric-sidebar bg-light p-3 rounded shadow-sm">
      <h5 className="text-center mb-3" style={{ fontFamily: "'Siemreap', sans-serif" , fontSize: "1.5rem" , color: "rgba(255, 51, 177, 1)"}}>បណ្តុះបណ្តាលលើជំនាញបច្ចេកទេស</h5>
      {bannerImages.map((src, index) => (
        <div key={index} className="mb-3">
          <img src={src} alt={`Banner ${index + 1}`} className="img-fluid rounded" />
        </div>
      ))}
    </div>
  );
};

export default DepartmentSidebar;
