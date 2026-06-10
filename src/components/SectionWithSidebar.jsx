import React from "react";
import ContentSection from "./ContentSection";
import Sidebar from "./Sidebar";

const SectionWithSidebar = () => {
  return (
    <div className="container">
      <div className="row g-4 align-items-start">
        {/* Main Content Area */}
        <div className="col-lg-9">
          <ContentSection />
        </div>

        {/* Sidebar Area */}
        <div className="col-lg-3">
          <div
            className="position-sticky bg-light p-3 rounded shadow-sm"
            style={{ top: "80px" }}
          >
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWithSidebar;
