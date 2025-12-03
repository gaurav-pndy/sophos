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

const Steps = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("tab1");

  const stepsData = {
    tab1: {
      number: 1,
      title: t("care.tab1"),
      image:
        "https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    tab2: {
      number: 2,
      title: t("care.tab2"),
      image:
        "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    tab3: {
      number: 3,
      title: t("care.tab3"),
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    tab4: {
      number: 4,
      title: t("care.tab4"),
      image:
        "https://images.unsplash.com/photo-1757833155170-211a15494193?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    tab5: {
      number: 5,
      title: t("care.tab5"),
      image:
        "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?q=80&w=1191&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    tab6: {
      number: 6,
      title: t("care.tab6"),
      image:
        "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    tab7: {
      number: 7,
      title: t("care.tab7"),
      image:
        "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    <section className="grid max-w-7xl mt-12 mx-auto md:grid-cols-2 gap-6 md:gap-10 bg-brand1/10 p-4 md:p-8 xl:p-12 rounded-2xl">
      {/* Left Column - Tabs */}
      <div className="flex flex-col gap-2">
        {Object.keys(stepsData).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`
      flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left text-[1rem] cursor-pointer
      shadow transition-all duration-300
      hover:-translate-y-[2px] hover:shadow-lg
      ${
        activeTab === tabKey
          ? "bg-brand1 text-white shadow-md"
          : "bg-white text-brand1"
      }
    `}
          >
            <p className="flex items-center ">
              {icons[tabKey] /* icon */}
              <span className=" ml-3 mr-2">{stepsData[tabKey].number}.</span>
              {stepsData[tabKey].title}
            </p>
            {activeTab === tabKey && <FaArrowRight />}
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
          <p className="flex items-center">
            <FaStethoscope className="text-2xl" />
            <span className="ml-3 mr-2">8.</span>
            <span dangerouslySetInnerHTML={{ __html: t("care.tab8") }} />
          </p>
        </Link>
      </div>

      {/* Right Column - Content with slide-from-bottom animation */}
      <div className="relative flex justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow flex flex-col max-w-lg w-full"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-brand1 mb-8">
              {stepsData[activeTab].title}
            </h3>
            <img
              src={stepsData[activeTab].image}
              alt={stepsData[activeTab].title}
              className="w-full max-w-lg rounded-xl shadow border border-brand4 mb-4 object-cover"
              style={{ maxHeight: "320px" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Steps;
