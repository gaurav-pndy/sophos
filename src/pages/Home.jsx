import React, { useEffect, useState } from "react";
import HeroSection from "../components/Home/HeroSection";
import AboutSection from "../components/Home/AboutSection";
import DoctorsSection from "../components/Home/DoctorsSection";
import ServicesSection from "../components/Home/ServicesSection";
import PatientMap from "../components/Home/PatientMap";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import MembershipSection from "../components/Home/MembershipSection";
import BookingForm from "../components/Home/BookingForm";
import ContactSection from "../components/Home/ContactSection";
import AddressSection from "../components/Home/AddressSection";
import ActionButtons from "../components/Home/ActionButtons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import PartnerCarousel from "../components/Home/PartnerCarousel";
import FeedbackForm from "../components/Home/FeedbackForm";
import PopupButtons from "../components/Home/PopupButtons";
import CareSection from "../components/Home/CareSection";
import CareSection2 from "../components/Home/CareSection2";
import HeroMoscow from "../components/Home/HeroMoscow";

const Home = ({ city, setShowPopup }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;

      // Give the DOM some time to render the section
      setTimeout(() => {
        const target = document.querySelector(sectionId);
        if (target) {
          const topOffset =
            target.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      }, 400);
    }
  }, [location]);

  const [openIndex, setOpenIndex] = useState(null);

  const { t } = useTranslation();

  // FAQ
  const faq = [
    {
      question: t("membership.faq.faq1.question"),
      answer: t("membership.faq.faq1.answer"),
    },
    {
      question: t("membership.faq.faq2.question"),
      answer: t("membership.faq.faq2.answer"),
    },
    {
      question: t("membership.faq.faq3.question"),
      answer: t("membership.faq.faq3.answer"),
    },
  ];

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };
  return (
    <div>
      {city === "Moscow" ? (
        <HeroMoscow setShowPopup={setShowPopup} />
      ) : (
        <HeroSection setShowPopup={setShowPopup} />
      )}

      <AboutSection city={city} />

      <DoctorsSection branch={city} setShowPopup={setShowPopup} />

      <div className="py-6">
        <MembershipSection />
        <div className="flex justify-center mt-10 ">
          <Link
            to={"/all-services/sophos-plus"}
            className="bg-brand1 text-white base-text font-semibold rounded-lg px-8 py-2.5 shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 block mx-auto"
          >
            {t("moreBtn")}
          </Link>
        </div>
      </div>
      {/* <CareSection /> */}
      {/* <CareSection2 /> */}
      {/* <ServicesSection /> */}

      {/* <PatientMap /> 
    
      */}
      {/* <TestimonialsSection branch={city} /> */}
      {/* <FeedbackForm /> */}

      {/* <BookingForm /> */}
      <AddressSection city={city} setShowPopup={setShowPopup} />
      {/* <ContactSection /> */}

      <PopupButtons />

      {/* <ActionButtons setShowPopup={setShowPopup} />
      <PartnerCarousel /> */}
    </div>
  );
};

export default Home;
