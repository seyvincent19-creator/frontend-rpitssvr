// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PopupImage from "./PopupImage"; // 🔥 global popup

const Layout = () => {
  return (
    <>
      <Navbar />
      <PopupImage />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
