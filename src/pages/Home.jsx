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
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import PartnerCarousel from "../components/Home/PartnerCarousel";
import FeedbackForm from "../components/Home/FeedbackForm";
import PopupButtons from "../components/Home/PopupButtons";

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
      <HeroSection setShowPopup={setShowPopup} />
      <AboutSection />

      <DoctorsSection setShowPopup={setShowPopup} />
      <ServicesSection />

      {/* <PatientMap /> 
      <MembershipSection />
      */}
      <TestimonialsSection />
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
