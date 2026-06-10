import React from 'react';
import TopNavbar from './TopNavbar';
import LogoSection from './LogoSection';
import NavbarMenu from './NavbarMenu';
import ImageSlider from './ImageSlider'; // ← new import
const Navbar = () => (
  <>
    <TopNavbar />
    <div className="sticky-top bg-white shadow-sm z-3">
      <LogoSection />
      <NavbarMenu />
    </div>
    <ImageSlider /> 
  </>
);

export default Navbar;
