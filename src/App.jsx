// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PopupImage from "./components/PopupImage";

import Home from "./pages/Home";
import NewsPost from "./pages/NewsPost";
import DepartmentPage from "./pages/departments/DepartmentPage";
import ArticleDetail from "./pages/ArticleDetail";
import Structure from "./pages/Structure";
import AboutUs from "./pages/AboutUs";
import ComMou from "./pages/ComMou";
import ELibraryUI from "./e-library/ELibraryUI";

// Import new page showing full lists by category
import SeeAllItems from "./e-library/SeeAllItems";
import DetailItem from "./e-library/DetailItem";
import StudentRegistration from "./pages/StudentRegistration";  
import AOS from "aos";
import "aos/dist/aos.css";




// 🔥 Layout wrapper
function Layout({ children }) {
  const location = useLocation();

  // Hide Navbar only for /e-library
  const hideNavbar = location.pathname.startsWith("/e-library");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {/* <PopupImage /> */}
      {children}
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NewsPost" element={<NewsPost />} />
          <Route path="/department/:id" element={<DepartmentPage />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/Structure" element={<Structure />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/communication" element={<ComMou />} />
          <Route path="/e-library" element={<ELibraryUI />} />
          <Route path="/enrollment" element={<StudentRegistration />} />
          {/* New route for see all page with category param */}
          <Route path="/e-library/see-all/:category" element={<SeeAllItems />} />
          <Route path="/e-library/detail/:category/:id" element={<DetailItem />} />
          
        </Routes>
      </Layout>
      
    </Router>
  );
}

export default App;
