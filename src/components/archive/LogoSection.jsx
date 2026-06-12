import React from 'react';

const LogoSection = () => (
  <div className="bg-light py-4">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-start">
          <img
            src="/images/PRIT.png"
            alt="Small Logo"
            style={{ maxWidth: "80px", height: "auto" }}
          />
        </div>

        <div className="col-12 col-md-auto d-none d-md-flex">
          <img
            src="/images/Logo-text.png"
            alt="Big Logo"
            style={{ maxWidth: "340px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default LogoSection;
