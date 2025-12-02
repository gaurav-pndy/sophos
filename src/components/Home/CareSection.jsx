import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaStethoscope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd,
  FaClinicMedical,
  FaRegCalendarCheck,
  FaHeartbeat,
  FaClipboardList,
  FaVials,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CareSection = () => {
  const { t } = useTranslation();

  const stepsData = {
    tab1: {
      number: 1,
      title: t("care.tab1"),
    },
    tab2: {
      number: 2,
      title: t("care.tab2"),
    },
    tab3: {
      number: 3,
      title: t("care.tab3"),
    },
    tab4: {
      number: 4,
      title: t("care.tab4"),
    },
    tab5: {
      number: 5,
      title: t("care.tab5"),
    },
    tab6: {
      number: 6,
      title: t("care.tab6"),
    },
    tab7: {
      number: 7,
      title: t("care.tab7"),
    },
  };

  const icons = {
    tab1: <FaClinicMedical className="text-2xl " />,
    tab2: <FaUserMd className="text-2xl" />,
    tab3: <FaRegCalendarCheck className="text-2xl" />,
    tab4: <FaHeartbeat className="text-2xl" />,
    tab5: <FaClipboardList className="text-2xl" />,
    tab6: <FaVials className="text-2xl" />,
    tab7: <FaBriefcaseMedical className="text-2xl" />,
  };

  return (
    <section className="w-full  pt-3 pb-6">
      <div className="max-w-[87rem] text-center mx-auto px-4">
        <h2 className="text-brand1 text-center text-[2rem] leading-10 font-bold mb-8">
          Экспертная онкологическая помощь
        </h2>
        <div className="grid   mx-auto md:grid-cols-2 gap-6 md:gap-10 bg-brand1/10 p-4 md:p-8 xl:p-12 rounded-2xl">
          {/* Left Column - Tabs */}
          <div className="flex flex-col gap-2">
            {Object.keys(stepsData).map((tabKey) => (
              <button
                key={tabKey}
                className={`
      flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left text-[1rem] cursor-pointer
      shadow transition-all duration-300
      hover:-translate-y-[2px] hover:shadow-lg
     bg-white text-brand1
    `}
              >
                <p className="flex items-center ">
                  {icons[tabKey] /* icon */}
                  <span className=" ml-3 mr-2">
                    {stepsData[tabKey].number}.
                  </span>
                  {stepsData[tabKey].title}
                </p>
              </button>
            ))}
            <Link
              to="/complicated-cases"
              className={`
      flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left text-[1rem] cursor-pointer
      shadow transition-all duration-300
      hover:-translate-y-[2px] hover:shadow-lg
      bg-white text-brand1
    `}
            >
              <p className="flex items-center ">
                <FaStethoscope className="text-2xl" />
                <span className=" ml-3 mr-2">8.</span>
                {t("care.tab8")}
              </p>
            </Link>
          </div>

          {/* Right Column - Content with slide-from-bottom animation */}
          <div className="bg-brand1/10  rounded-2xl shadow-md p-8 text-left">
            <h3 className="text-2xl text-center font-bold text-brand1 mb-6">
              {t("care.block1.title")}
            </h3>
            <ul className="space-y-4 text-lg text-brand1/90">
              <li>• {t("care.block1.point1")}</li>
              <li>• {t("care.block1.point2")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareSection;
