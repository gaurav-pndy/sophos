import FloatingButton from "../components/FloatingButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import BookingPopup from "../components/BookingPopup";
import { useState } from "react";
import ConsentBanner from "../components/ConsentBanner";
import UserAccountPopup from "../components/UserAccountPopup";

const AppLayout = ({ city, setCity, showPopup, setShowPopup }) => {
  const [showUserAccount, setShowUserAccount] = useState(false);

  return (
    <div>
      <ScrollToTop />
      <Header
        city={city}
        setCity={setCity}
        setShowPopup={setShowPopup}
        setShowUserAccount={setShowUserAccount}
      />
      <div className="mt-20 md:mt-24 lg:mt-42 xl:mt-43">
        <Outlet />
        <FloatingButton onClick={() => setShowPopup(true)} />
        <BookingPopup show={showPopup} onClose={() => setShowPopup(false)} />
        <UserAccountPopup
          show={showUserAccount}
          onClose={() => setShowUserAccount(false)}
        />
        <Footer city={city} />
      </div>
      <ConsentBanner />
    </div>
  );
};

export default AppLayout;
