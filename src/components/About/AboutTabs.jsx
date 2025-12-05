import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  FaHospital,
  FaPhoneAlt,
  FaLock,
  FaUserFriends,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { TbLicense } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { LuShield } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";

// Components
import AboutInfo from "./AboutInfo";
import AboutContacts from "./AboutContacts";
import AboutLicenses from "./AboutLicenses";
import AboutPrivacyPolicy from "./AboutPrivacyPolicy";
import AboutOfferContract from "./AboutOfferContract";
import ForPatients from "../../pages/ForPatients";

import PatientsInfo from "../ForPatients/PatientsInfo";
import PatientsAccordion from "../ForPatients/PatientsAccordion";
import AboutVacancies from "./AboutVacancies";
import AboutPartners from "./AboutPartners";
import { BiSolidContact } from "react-icons/bi";
import CareersPage from "../../pages/CareersPage";

const TABS = [
  {
    key: "info",
    labelKey: "about.tabs.info",
    icon: <FaHospital />,
    component: AboutInfo,
  },
  {
    key: "licenses",
    labelKey: "about.tabs.licenses",
    icon: <TbLicense />,
    component: AboutLicenses,
  },
  {
    key: "contacts",
    labelKey: "about.tabs.contacts",
    icon: <BiSolidContact />,
    component: AboutContacts,
  },
  {
    key: "patients",
    labelKey: "about.tabs.patients",
    icon: <FaUserFriends />,
    component: ForPatients,
  },

  {
    key: "privacy",
    labelKey: "about.tabs.privacy",
    icon: <LuShield />,
    component: AboutPrivacyPolicy,
  },
  {
    key: "offer",
    labelKey: "about.tabs.offer",
    icon: <MdOutlineLocalOffer />,
    component: AboutOfferContract,
  },
  {
    key: "vacancies",
    labelKey: "about.tabs.vacancies",
    icon: <FaUserPlus />,
    component: CareersPage,
  },
  {
    key: "partners",
    labelKey: "about.tabs.partners",
    icon: <FaUsers />,
    component: AboutPartners,
  },
];

const AboutTabs = ({ city }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  // Detect active tab from URL hash (#patients or #doctors)
  useEffect(() => {
    if (location.hash) {
      const hashKey = location.hash.replace("#", "");
      const tabExists = TABS.some((tab) => tab.key === hashKey);
      if (tabExists) setActiveTab(hashKey);
    }
  }, [location.hash]);

  return (
    <section id="about-tabs" className="max-w-[87rem] mx-auto  py-12">
      {/* Tabs header */}
      <nav className="mb-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold rounded-xl cursor-pointer transition-all 
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
              } lg:text-xl`}
            >
              {tab.icon}
            </span>
            <span className="base-text text-left line-clamp-1 text-ellipsis lg:line-clamp-none">
              {t(tab.labelKey)}
            </span>
          </button>
        ))}
      </nav>

      {/* Tabs content */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-brand4/10">
        {TABS.map((tab) =>
          tab.key === activeTab ? (
            <div key={tab.key}>
              {tab.key === "patients" ? (
                <>
                  <PatientsInfo />
                  <PatientsAccordion />
                </>
              ) : (
                <tab.component city={city} />
              )}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default AboutTabs;
