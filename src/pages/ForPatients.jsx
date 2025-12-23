import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import WaveBackground from "../components/WaveBackground";
import {
  FaCalendarCheck,
  FaTag,
  FaShieldAlt,
  FaBlog,
  FaFileAlt,
} from "react-icons/fa";
import AppointmentTab from "../components/ForPatients/AppointmentTab";
import PreparationTab from "../components/ForPatients/PreparationTab";
import NewsTab from "../components/ForPatients/NewsTab";
import OffersTab from "../components/ForPatients/OffersTab";
import InsuranceTab from "../components/ForPatients/InsuranceTab";
import DocumentsTab from "../components/ForPatients/DocumentsTab";
import { IoDocumentText } from "react-icons/io5";

const ForPatients = ({ city }) => {
  const PATIENT_TABS = React.useMemo(() => {
    if (city === "Moscow") {
      return [
        {
          key: "appointment",
          labelKey: "forPatientsPage.heading1",
          icon: <FaCalendarCheck />,
          component: AppointmentTab,
        },
        {
          key: "preparation",
          labelKey: "forPatientsPage.heading2",
          icon: <FaFileAlt />,
          component: PreparationTab,
        },
        {
          key: "blog",
          labelKey: "header.patient5",
          icon: <IoDocumentText />,
          component: NewsTab,
        },
      ];
    }

    return [
      {
        key: "appointment",
        labelKey: "forPatientsPage.heading1",
        icon: <FaCalendarCheck />,
        component: AppointmentTab,
      },
      {
        key: "preparation",
        labelKey: "forPatientsPage.heading2",
        icon: <FaFileAlt />,
        component: PreparationTab,
      },
      {
        key: "offers",
        labelKey: "forPatientsPage.heading3",
        icon: <FaTag />,
        component: OffersTab,
      },
      {
        key: "insurance",
        labelKey: "forPatientsPage.heading4",
        icon: <FaShieldAlt />,
        component: InsuranceTab,
      },
      {
        key: "blog",
        labelKey: "header.patient5",
        icon: <IoDocumentText />,
        component: NewsTab,
      },
      {
        key: "documents",
        labelKey: "forPatientsPage.heading6",
        icon: <FaFileAlt />,
        component: DocumentsTab,
      },
    ];
  }, [city]);
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(PATIENT_TABS[0].key);

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const hashKey = location.hash.replace("#", "");
      const tabExists = PATIENT_TABS.some((tab) => tab.key === hashKey);
      if (tabExists) setActiveTab(hashKey);
    }
  }, [location.hash]);

  // Handle scroll to section from navigation state
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo.replace("#", "");
      const tabExists = PATIENT_TABS.some((tab) => tab.key === sectionId);
      if (tabExists) {
        setActiveTab(sectionId);
        // Scroll to top of tabs section
        setTimeout(() => {
          const tabsSection = document.querySelector("#patient-tabs");
          if (tabsSection) {
            const topOffset =
              tabsSection.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
          }
        }, 400);
      }
    }
  }, [location]);

  return (
    <div className="bg-[#f6fcfd] min-h-screen">
      {/* Hero Section */}
      <section className="relative max-w-[87rem] rounded-xl mx-auto grid md:grid-cols-2 items-center mt-20 lg:mt-52 overflow-hidden md:min-h-80">
        <WaveBackground
          stroke="rgb(70, 70, 70,"
          custStyle="md:w-1/2 h-1/2 left-0 top-0"
        />

        <div className="w-full md:min-h-80 flex flex-col justify-center h-full p-6 pb-16 md:p-6 lg:p-10 xl:p-12 bg-gradient-to-b md:bg-gradient-to-r from-[#6f452f] to-[#242a2d]">
          <h1 className="text-white relative z-40 heading1 font-bold mb-4">
            {t("forPatientsPage.title")}
          </h1>
          <p className="text-white relative z-40 base-text font-medium drop-shadow">
            {t("forPatientsPage.subtitle")}
          </p>
        </div>

        <div className="w-full h-full z-30 -mt-[3px] md:-mt-0 -ml-[1px]">
          <div className="relative w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://www.shutterstock.com/shutterstock/videos/3761850711/preview/stock-footage-question-hand-and-therapist-with-patient-office-and-counselling-for-mental-health-talking-and.webm"
              alt="Services illustration"
              className="w-full md:min-h-80 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b via-30% md:bg-gradient-to-r from-[#242a2d] via-[#242a2d]/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section id="patient-tabs" className="max-w-[87rem] mx-auto px-5 py-12">
        {/* Tabs Navigation */}
        <nav className="mb-6 grid grid-cols-2  lg:grid-cols-3 gap-4">
          {PATIENT_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold rounded-xl base-text cursor-pointer transition-all 
                ${
                  activeTab === tab.key
                    ? "bg-brand1 text-white"
                    : "text-brand1/70 bg-brand4/20 hover:text-brand1"
                }
              `}
            >
              <span
                className={`${
                  activeTab === tab.key ? "text-white" : "text-brand4"
                } text-xl`}
              >
                {tab.icon}
              </span>
              <span className="">{t(tab.labelKey)}</span>
            </button>
          ))}
        </nav>

        {/* Tabs Content */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 border border-brand4/10">
          {PATIENT_TABS.map((tab) =>
            tab.key === activeTab ? (
              <tab.component city={city} key={tab.key} t={t} />
            ) : null
          )}
        </div>
      </section>
    </div>
  );
};

export default ForPatients;
