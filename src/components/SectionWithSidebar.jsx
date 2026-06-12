import React from "react";
import ContentSection from "./ContentSection";
import Sidebar from "./Sidebar";

const SectionWithSidebar = () => {
  return (
    <div className="container" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
      <div className="row g-4 align-items-start">
        {/* Main Content Area */}
        <div className="col-lg-9">
          <ContentSection />
        </div>

        {/* Sidebar Area */}
        <div className="col-lg-3">
          <div className="position-sticky" style={{ top: "80px" }}>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWithSidebar;
