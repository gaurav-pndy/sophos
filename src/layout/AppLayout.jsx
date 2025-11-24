import FloatingButton from "../components/FloatingButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import BookingPopup from "../components/BookingPopup";
import { useState } from "react";
import ConsentBanner from "../components/ConsentBanner";

const AppLayout = ({ city, setCity, showPopup, setShowPopup }) => {
  return (
    <div>
      <ScrollToTop />
      <Header city={city} setCity={setCity} setShowPopup={setShowPopup} />
      <div className="mt-14 lg:mt-42 xl:mt-44">
        <Outlet />
        <FloatingButton onClick={() => setShowPopup(true)} />
        <BookingPopup show={showPopup} onClose={() => setShowPopup(false)} />
        <Footer city={city} />
      </div>
      <ConsentBanner />
    </div>
  );
};

export default AppLayout;
