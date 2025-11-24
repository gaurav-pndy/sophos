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

      {/* <PatientMap /> */}
      <MembershipSection />
      <TestimonialsSection />
      <FeedbackForm />

      {/* <BookingForm /> */}
      <AddressSection city={city} setShowPopup={setShowPopup} />
      <ContactSection />
      {/* <div className="pb-16">
        <div className="text-center text-brand1 font-bold text-2xl md:text-4xl mb-16 ">
          {t("membership.faq.title")}{" "}
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-7">
          {faq.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleFAQ(idx)}
              className="rounded-lg bg-white border border-brand4/20 px-6 py-4 cursor-pointer transition shadow-md"
            >
              <div className="flex justify-between items-center font-medium text-black text-lg">
                <span>{item.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-brand1" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 text-brand1 text-left">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div> */}

      <ActionButtons setShowPopup={setShowPopup} />
      <PartnerCarousel />
    </div>
  );
};

export default Home;
