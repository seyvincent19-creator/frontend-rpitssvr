import React from "react";
import SectionWithSidebar from "../components/SectionWithSidebar";
import OtherNewsCardList from "./OtherNewsCardList";

const NewsPost = () => (
  <div className="container py-5">
    <h2 className="mb-4 text-center fw-bold" style={{ fontFamily: 'Khmer OS Battambang' }}>
      ព័ត៌មានថ្មីៗ
    </h2>

    <SectionWithSidebar />

    <h2 className="mt-5 mb-4 text-center fw-bold" style={{ fontFamily: 'Khmer OS Battambang' }}>
      ព័ត៌មានផ្សេងទៀត...
    </h2>

    <OtherNewsCardList />
  </div>
);

export default NewsPost;
