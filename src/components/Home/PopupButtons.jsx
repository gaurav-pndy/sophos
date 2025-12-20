import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import FeedbackForm from "./FeedbackForm";
import ContactSection from "./ContactSection";

const PopupButtons = () => {
  const { t } = useTranslation();

  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  return (
    <section id="contact-and-feedback" className="w-full  pt-6 pb-12">
      <div className="max-w-[87rem] mx-auto px-4">
        {/* <h2 className="text-brand1 text-center heading1 leading-10 font-bold mb-8">
          {t("contactAndFeedback.text")}{" "}
        </h2> */}

        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <button
            className="bg-brand1 cursor-pointer border border-brand1 text-white font-semibold rounded-lg px-6 py-2.5 base-text shadow hover:bg-brand5/90 transition-all duration-300 w-full md:w-fit"
            onClick={() => setShowFeedbackPopup(true)}
          >
            {t("contactAndFeedback.btn1")}
          </button>
          <button
            className="bg-transparent cursor-pointer border border-brand1 w-full md:w-fit text-brand1 font-semibold rounded-lg px-6 py-2.5 base-text shadow hover:bg-brand1 hover:text-white transition-all duration-300"
            onClick={() => setShowContactPopup(true)}
          >
            {t("contactAndFeedback.btn2")}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFeedbackPopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              onClick={() => setShowFeedbackPopup(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-lg max-w-4xl w-full mx-4 p-4 md:p-6 pt-10 md:pt-12 relative  overflow-hidden "
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="absolute top-4 z-50 right-4 text-brand1 cursor-pointer text-2xl"
                  onClick={() => setShowFeedbackPopup(false)}
                  aria-label="Close"
                >
                  <RxCross1 />
                </button>
                <div className="max-h-[80vh] overflow-y-scroll">
                  <FeedbackForm />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContactPopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              onClick={() => setShowContactPopup(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-lg max-w-[87rem] w-full mx-4 p-4 md:p-6 pt-10 md:pt-12 relative  overflow-hidden "
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="absolute top-4 z-50 right-4 text-brand1 cursor-pointer text-2xl"
                  onClick={() => setShowContactPopup(false)}
                  aria-label="Close"
                >
                  <RxCross1 />
                </button>
                <div className="max-h-[80vh] overflow-y-scroll">
                  <ContactSection />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PopupButtons;
