import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import WaveBackground from "../components/WaveBackground";
import HeroSection from "../components/OncologicalCare/HeroSection";
import Steps from "../components/OncologicalCare/Steps";
import FormPopup from "../components/OncologicalCare/FormPopup";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const OncologicalCare = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="px-4 mb-10">
      <HeroSection />
      <Steps />

      <section className="py-10 ">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Block 1 */}
            <div className="bg-brand1/10  rounded-2xl shadow-md p-8 text-left">
              <h3 className="subheading text-center font-bold text-brand1 mb-6">
                {t("care.block1.title")}
              </h3>
              <ul className="space-y-4 base-text text-brand1/90">
                <li>• {t("care.block1.point1")}</li>
                <li>• {t("care.block1.point2")}</li>
              </ul>
            </div>

            {/* Block 2 */}
            <div className="bg-brand1/10 rounded-2xl shadow-md p-8 text-left">
              <h3 className="subheading font-bold text-center text-brand1 mb-6">
                {t("care.block2.title")}
              </h3>
              <ul className="space-y-4 base-text text-brand1/90">
                <li>• {t("care.block2.point1")}</li>
                <li>• {t("care.block2.point2")}</li>
                <li>• {t("care.block2.point3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-4">
        <button
          className="bg-brand1 cursor-pointer border border-brand1 text-white font-semibold rounded-lg px-6 py-2.5 base-text shadow hover:bg-brand5/90 transition-all duration-300"
          onClick={() => setShowPopup(true)}
        >
          {t("care.btn1")}
        </button>
        <Link
          to="/services/service3"
          className="bg-white cursor-pointer text-center border border-brand1 text-brand1 font-semibold rounded-lg px-6 py-2.5 base-text shadow hover:bg-brand1 hover:text-white transition-all duration-300"
        >
          {t("care.btn2")}
        </Link>
      </div>

      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 p-6 pt-10 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="absolute top-4 z-50 right-4 text-brand1 cursor-pointer text-2xl"
                  onClick={() => setShowPopup(false)}
                  aria-label="Close"
                >
                  <RxCross1 />
                </button>
                <FormPopup />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OncologicalCare;
