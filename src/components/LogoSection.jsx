import React from 'react';

const img = [
  img_logo => "images/PRIT.png",
  img_logo_big => "images/Logo-text.png",

]
const LogoSection = () => (
  <div className="bg-light py-4">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-start">
          <img
            src= {img[0]()}
            alt="Small Logo"
            style={{ maxWidth: "80px", height: "auto" }}
          />
        </div>

        <div className="col-12 col-md-auto d-none d-md-flex">
          <img
            src=  {img[1]()}
            alt="Big Logo"
            style={{ maxWidth: "340px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default LogoSection;
