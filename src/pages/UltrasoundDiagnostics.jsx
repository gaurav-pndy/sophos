// pages/UltrasoundDiagnostics.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import WaveBackground from "../components/WaveBackground";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const UltrasoundDiagnostics = ({ setShowPopup }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [openFaqs, setOpenFaqs] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
  });

  const toggleFaq = (faqKey) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [faqKey]: !prev[faqKey],
    }));
  };

  const faqs = [
    {
      key: "faq1",
      question: t("ultrasound.faq1Question"),
      answer: t("ultrasound.faq1Answer"),
    },
    {
      key: "faq2",
      question: t("ultrasound.faq2Question"),
      answer: t("ultrasound.faq2Answer"),
    },
    {
      key: "faq3",
      question: t("ultrasound.faq3Question"),
      answer: t("ultrasound.faq3Answer"),
    },
    {
      key: "faq4",
      question: t("ultrasound.faq4Question"),
      answer: t("ultrasound.faq4Answer"),
    },
  ];

  // Framer Motion variants for accordion
  const accordionVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const iconVariants = {
    closed: {
      rotate: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      rotate: 180,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen pb-16 pt-10 mx-auto px-4 bg-gradient-to-r from-[#392e28]/20 to-[#dfdddc]/20">
      {/* HERO SECTION */}
      <section className="relative rounded-xl max-w-[87rem] mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96 mb-10">
        <WaveBackground
          stroke="rgba(66, 32, 6,"
          custStyle="md:w-1/2 h-1/2 left-0 top-0"
        />

        <div
          className="w-full md:min-h-96 flex flex-col justify-center h-full p-6 pb-16 md:p-6 lg:p-10 xl:p-12"
          style={{
            background: `linear-gradient(${
              isMobile ? "to bottom" : "to right"
            }, #392e28, #dfdddc)`,
          }}
        >
          <h1 className="text-white z-40 heading1 leading-10 font-bold mb-8">
            {t("ultrasound.heroHeadline")}
          </h1>
        </div>

        <div className="w-full h-full z-30 -mt-[1px] md:-mt-0">
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1706065264583-55f1a8549769?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Ultrasound diagnostics"
              className="w-full md:min-h-96 lg:max-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
            />
            <div
              className="absolute md:rounded-tr-2xl md:rounded-br-2xl inset-0"
              style={{
                background: `linear-gradient(${
                  isMobile ? "to bottom" : "to right"
                }, #dfdddc, #dfdddc66 30%, transparent 100%)`,
              }}
            />
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <main className="max-w-[87rem] mx-auto mt-10">
        <div className="bg-white rounded-2xl shadow p-8 base-text space-y-12">
          {/* TEXT BLOCKS */}
          <div className="space-y-6">
            <section className="bg-white rounded-2xl border border-[#f3eee7] p-6 md:p-8 shadow-lg">
              <h2
                className="subheading font-semibold mb-6"
                style={{ color: "var(--color-brand1)" }}
              >
                {t("ultrasound.section1Title")}
              </h2>
              <p
                className="base-text text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: t("ultrasound.section1Text"),
                }}
              ></p>
            </section>
          </div>

          {/* PREPARATION SECTION */}
          <section className="bg-white rounded-2xl border border-[#f3eee7] p-6 md:p-8 shadow-lg">
            <h2
              className="subheading font-semibold mb-6"
              style={{ color: "var(--color-brand1)" }}
            >
              {t("ultrasound.prepTitle")}
            </h2>
            <p className="base-text text-gray-700 mb-6">
              {t("ultrasound.prepIntro")}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
                <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
                <p
                  className="base-text text-gray-700 flex-1"
                  dangerouslySetInnerHTML={{
                    __html: t("ultrasound.prepAbdominal"),
                  }}
                ></p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
                <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
                <p
                  className="base-text text-gray-700 flex-1"
                  dangerouslySetInnerHTML={{
                    __html: t("ultrasound.prepPelvis"),
                  }}
                ></p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
                <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
                <p
                  className="base-text text-gray-700 flex-1"
                  dangerouslySetInnerHTML={{
                    __html: t("ultrasound.prepBreast"),
                  }}
                ></p>
              </div>

              <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
                <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
                <p
                  className="base-text text-gray-700 flex-1"
                  dangerouslySetInnerHTML={{
                    __html: t("ultrasound.prepLymph"),
                  }}
                ></p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
                <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
                <p
                  className="base-text text-gray-700 flex-1"
                  dangerouslySetInnerHTML={{
                    __html: t("ultrasound.prepVessels"),
                  }}
                ></p>
              </div>
            </div>
          </section>

          {/* QUESTIONS & BOOK BUTTON */}
          <section className="w-full max-w-[87rem] mx-auto rounded-xl py-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-brand5 to-brand1">
            <h2 className="text-white heading1 leading-10 font-bold mb-4 drop-shadow">
              {t("ultrasound.questionsTitle")}
            </h2>
            <p className="text-white/90 base-text font-medium mb-9">
              {t("ultrasound.questionsText")}
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="flex items-center gap-3 px-6 py-2.5 base-text bg-white rounded-xl  text-brand1  font-semibold hover:bg-transparent border border-white transition-all  duration-300 cursor-pointer hover:text-white"
            >
              {t("ultrasound.bookButton")}
            </button>
          </section>

          {/* FAQ ACCORDION */}
          <section className="bg-white rounded-2xl border border-[#f3eee7] p-6 md:p-8 shadow-lg">
            <h2
              className="subheading font-semibold mb-8 text-center"
              style={{ color: "var(--color-brand1)" }}
            >
              {t("ultrasound.faqTitle")}
            </h2>

            <div className="space-y-3 max-w-6xl mx-auto">
              {faqs.map((faq) => (
                <div
                  key={faq.key}
                  className="border border-brand4/30 bg-brand2/5 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer p-6 "
                >
                  <motion.button
                    onClick={() => toggleFaq(faq.key)}
                    className="w-full  text-left   transition-colors cursor-pointer flex items-center justify-between group relative"
                  >
                    <span className="base-text font-medium text-brand1 group-hover:text-brand3 pr-8 ">
                      {faq.question}
                    </span>
                    <motion.div
                      className="text-brand1 ml-4  flex-shrink-0"
                      variants={iconVariants}
                      animate={openFaqs[faq.key] ? "open" : "closed"}
                      initial="closed"
                    >
                      <FaChevronDown />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openFaqs[faq.key] && (
                      <motion.div
                        key={`${faq.key}-content`}
                        variants={accordionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className=" pl-2 overflow-hidden "
                      >
                        <p className="small-text pt-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UltrasoundDiagnostics;
