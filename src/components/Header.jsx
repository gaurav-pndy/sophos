import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaGlobe,
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronDown,
  FaCalendarCheck,
  FaUser,
  FaSearch,
  FaHospital,
  FaUsers,
  FaHandshake,
  FaArrowRight,
  FaUserPlus,
  FaUserFriends,
  FaClipboardList,
  FaTag,
  FaMoneyBillAlt,
  FaFemale,
  FaDna,
  FaUserMd,
  FaHeartbeat,
  FaBrain,
  FaEye,
  FaUserNurse,
  FaUserTie,
  FaBone,
  FaStethoscope,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaFlask,
  FaMicroscope,
  FaSyringe,
  FaFileMedical,
  FaVideo,
  FaXRay,
  FaPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import i18n from "../utils/i18n";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { TbLicense } from "react-icons/tb";
import { BiSolidContact } from "react-icons/bi";
import { IoDocumentText, IoInformation } from "react-icons/io5";
import { LuShield } from "react-icons/lu";
import {
  MdFamilyRestroom,
  MdMedicalServices,
  MdOutlineLocalOffer,
  MdPsychology,
} from "react-icons/md";
import { ImUsers } from "react-icons/im";
import {
  GiBrain,
  GiHeartOrgan,
  GiKidneys,
  GiMedicines,
  GiNoseFront,
  GiPsychicWaves,
  GiScalpel,
  GiStomach,
} from "react-icons/gi";
import { BsThermometerHalf } from "react-icons/bs";
import { AiOutlineUserSwitch } from "react-icons/ai";

const Header = ({ city, setCity, setShowPopup, setShowUserAccount }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // mobile dropdown
  const [isAboutOpen, setIsAboutOpen] = useState(false); // mobile dropdown
  const [isPatientsOpen, setIsPatientsOpen] = useState(false); // mobile dropdown
  const [isDoctorsOpen, setIsDoctorsOpen] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(null);

  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const [showCityInit, setShowCityInit] = useState(false);
  const [showCitySelect, setShowCitySelect] = useState(false);

  const [showServices, setShowServices] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showPatientsDropdown, setShowPatientsDropdown] = useState(false);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [activeSub, setActiveSub] = useState();

  useEffect(() => {
    const cityConfirmed = localStorage.getItem("cityConfirmed");
    if (!cityConfirmed) {
      // Show initial confirm popup only if not already confirmed
      setShowCityInit(true);
    }
  }, []);
  const handleCityConfirm = (confirmedCity) => {
    setCity(confirmedCity);
    setShowCityInit(false);
    localStorage.setItem("cityConfirmed", "true");
  };

  const handleShowCitySelect = () => {
    setShowCityInit(false);
    setShowCitySelect(true);
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setShowCitySelect(false);
    localStorage.setItem("cityConfirmed", "true");
  };

  // Handle language toggle
  const languages = [
    { code: "en", name: "English", flag: "/flags/us_flag.png" },
    { code: "ru", name: "Русский", flag: "/flags/russia_flag.png" },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
    setDropdownOpen(false);
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeIn" } },
  };

  // Services list
  const services = [
    {
      path: "/all-services/consultation",
      id: 1,
      label: t("header.servicesDrop.s1.title"),
      icon: <FaUserMd />, // Specialist Appointment
      subItems: [
        {
          path: "/all-services/consultation",
          label: t("header.servicesDrop.s1.subitems.sub1"),
        },
        {
          path: "/all-services/consultation",
          label: t("header.servicesDrop.s1.subitems.sub2"),
        },
        {
          path: "/all-services/consultation",
          label: t("header.servicesDrop.s1.subitems.sub3"),
        },
        {
          path: "/all-services/consultation",
          label: t("header.servicesDrop.s1.subitems.sub4"),
        },
        {
          path: "/all-services/consultation",
          label: t("header.servicesDrop.s1.subitems.sub5"),
        },
        {
          path: "/all-services/consultation",
          label: t("header.servicesDrop.s1.subitems.sub6"),
        },
        {
          path: "/all-services/consultation",
          label: t("header.servicesDrop.s1.subitems.sub7"),
        },
        {
          path: "/all-services/consultation",
          label: t("header.servicesDrop.s1.subitems.sub8"),
        },
      ],
    },

    {
      id: 2,
      path: "/all-services/lab-tests",
      label: t("header.servicesDrop.s2.title"),
      icon: <FaFlask />, // Tests & Diagnostics
      subItems: {
        tests: [
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub1"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub2"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub3"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub4"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub5"),
          },
        ],
        diagnostics: [
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub6"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub7"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub8"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub9"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub10"),
          },
          {
            path: "/all-services/lab-tests",
            label: t("header.servicesDrop.s2.subitems.sub11"),
          },
        ],
      },
    },

    {
      id: 3,
      path: "/all-services/early-diagnostics",
      label: t("header.servicesDrop.s3.title"),
      icon: <FaMicroscope />, // Individual Early Diagnostics
    },

    {
      id: 4,
      path: "/all-services/day-hospital",
      label: t("header.servicesDrop.s4.title"),
      icon: <FaHospital />, // Day Hospital
    },

    {
      id: 5,
      path: "/all-services/treatment-room",

      label: t("header.servicesDrop.s5.title"),
      icon: <FaSyringe />, // Procedure Room
      subItems: [
        {
          path: "/all-services/treatment-room",
          label: t("header.servicesDrop.s5.subitems.sub1"),
        },
        {
          path: "/all-services/treatment-room",
          label: t("header.servicesDrop.s5.subitems.sub2"),
        },
      ],
    },

    {
      id: 6,
      path: "/all-services/medical-certificates",

      label: t("header.servicesDrop.s6.title"),
      icon: <FaFileMedical />, // Medical Certificates
      subItems: [
        {
          path: "/all-services/medical-certificates",
          label: t("header.servicesDrop.s6.subitems.sub1"),
        },
        {
          path: "/all-services/medical-certificates",
          label: t("header.servicesDrop.s6.subitems.sub2"),
        },
        {
          path: "/all-services/service1",
          label: t("header.servicesDrop.s6.subitems.sub3"),
        },
      ],
    },

    {
      id: 7,
      path: "/all-services/telemedicine",
      label: t("header.servicesDrop.s7.title"),
      icon: <GiMedicines />, // Telemedicine
    },

    {
      id: 8,
      path: "/all-services/expert-imaging-review",
      label: t("header.servicesDrop.s8.title"),
      icon: <FaXRay />, // CT / MRI / PET-CT
    },

    {
      id: 9,
      path: "/all-services/partnership-programs",

      label: t("header.servicesDrop.s9.title"),
      icon: <FaHandshake />, // Partner Projects
      subItems: [
        {
          path: "/all-services/partnership-programs",
          label: t("header.servicesDrop.s9.subitems.sub1"),
        },
        {
          path: "/all-services/partnership-programs",
          label: t("header.servicesDrop.s9.subitems.sub2"),
        },
        {
          path: "/all-services/partnership-programs",
          label: t("header.servicesDrop.s9.subitems.sub3"),
        },
      ],
    },

    {
      id: 10,
      path: "/all-services/sophos-plus",
      label: t("header.servicesDrop.s10.title"),
      icon: <FaPlus />, // CT / MRI / PET-CT
    },
  ];

  const aboutItems = [
    {
      path: "/about#licenses",
      label: t("header.about2"),
      icon: <TbLicense className="" />,
    },

    {
      path: "/about#privacy",
      label: t("header.about5"),
      icon: <LuShield className="" />,
    },

    {
      path: "/about#offer",
      label: t("header.about6"),
      icon: <MdOutlineLocalOffer className="" />,
    },
    {
      path: "/about#vacancies",
      label: t("header.about7"),
      icon: <FaUserPlus className="" />,
    },
  ];

  const patientItems = [
    {
      path: "/for-patients#appointment",
      label: t("header.patient1"),
      icon: <ImUsers />,
    },
    {
      path: "/for-patients#preparation",
      label: t("header.patient2"),
      icon: <FaClipboardList />,
    },
    {
      path: "/for-patients#offers",
      label: t("header.patient3"),
      icon: <FaTag />,
    },
    {
      path: "/for-patients#insurance",
      label: t("header.patient4"),
      icon: <MdMedicalServices />,
    },
    {
      path: "/for-patients#blog",
      label: t("header.patient5"),
      icon: <IoDocumentText />,
    },
    {
      path: "/for-patients#documents",
      label: t("header.patient6"),
      icon: <FaFileAlt />,
    },
    {
      path: "/for-patients#price-list",
      label: t("header.patient7"),
      icon: <FaMoneyBillAlt />,
    },
  ];

  const doctorsItems = [
    {
      path: "/doctors#specialization15",
      label: t("header.doctorsDrop.d1"),
      icon: <FaFemale />,
    },
    {
      path: "/doctors#specialization16",
      label: t("header.doctorsDrop.d2"),
      icon: <GiStomach />,
    },
    {
      path: "/doctors#specialization17",
      label: t("header.doctorsDrop.d3"),
      icon: <FaDna />,
    },
    {
      path: "/doctors#specialization18",
      label: t("header.doctorsDrop.d4"),
      icon: <GiMedicines />,
    },
    {
      path: "/doctors#specialization19",
      label: t("header.doctorsDrop.d5"),
      icon: <FaUserMd />,
    },
    {
      path: "/doctors#specialization19",
      label: t("header.doctorsDrop.d6"),
      icon: <FaUserMd />,
    },
    {
      path: "/doctors#specialization20",
      label: t("header.doctorsDrop.d7"),
      icon: <FaBrain />,
    },
    {
      path: "/doctors#specialization21",
      label: t("header.doctorsDrop.d8"),
      icon: <GiBrain />,
    },
  ];

  const scrollToSection = (sectionId) => {
    const target = document.querySelector(sectionId);
    if (target) {
      const topOffset =
        target.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollToPatientsSection = (sectionId) => {
    if (isOpen) setIsOpen(false);
    if (location.pathname === "/for-patients") {
      // Already on homepage → just scroll
      scrollToSection(sectionId);
    } else {
      // Go to homepage first, then scroll
      navigate("/for-patients", { state: { scrollTo: sectionId } });
    }
  };

  const handleScrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      // Already on homepage → just scroll
      scrollToSection(sectionId);
    } else {
      // Go to homepage first, then scroll
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <header className="w-full border-b border-brand4 text-brand1 fixed top-0 z-50 bg-white">
      {/* Top Bar */}
      <div className="flex w-full bg-gradient-to-r from-white from-20% xl:from-25% to-40% xl:to-45% to-[#f3f5f7]">
        <motion.div
          className="flex max-w-[90rem] w-full mx-auto flex-col lg:flex-row items-center justify-between lg:justify-end  px-4 lg:py-3 small-text xl:base-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="hidden lg:flex flex-col">
            <label htmlFor="city" className="small-text mb-1">
              {t("header.selectCity")}
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded px-2 py-0.5"
            >
              <option value="Moscow">{t("moscow")}</option>
              <option value="Makhachkala">{t("makhachkala")}</option>
            </select>
          </div>

          {/* City Confirmation Popup */}
          {showCityInit && (
            <div className="absolute z-50 top-20 left-1/2 translate-x-[-50%]  bg-white border border-brand4 shadow-black/70 shadow-2xl rounded-lg px-6 py-5 w-[95%] max-w-xs text-center flex flex-col items-center">
              <div className="text-lg md:text-xl font-semibold text-brand1 mb-3">
                {t("header.cityConfirm.question")}
              </div>
              <div className="flex gap-5 w-full justify-center">
                <button
                  className="bg-brand1 text-white font-semibold rounded-lg px-6 py-2 hover:bg-brand5 transition-all duration-300 cursor-pointer"
                  onClick={() => handleCityConfirm("Moscow")}
                >
                  {t("header.cityConfirm.yes")}
                </button>
                <button
                  className="bg-gray-200 text-brand1 font-semibold rounded-lg px-6 py-2 hover:bg-brand4/30 transition-all duration-300 cursor-pointer"
                  onClick={handleShowCitySelect}
                >
                  {t("header.cityConfirm.no")}
                </button>
              </div>
            </div>
          )}

          {/* City Selection Popup */}
          {showCitySelect && (
            <div className="absolute z-50 top-20 left-1/2 translate-x-[-50%]   bg-white border border-brand4 shadow-black/70 shadow-2xl rounded-lg px-6 py-5 w-[95%] max-w-xs text-center flex flex-col items-center">
              <div className="text-lg md:text-xl font-semibold text-brand1 mb-5">
                {t("header.citySelect")}
              </div>
              <div className="flex gap-5 justify-center">
                <button
                  className={`${
                    city === "Moscow"
                      ? "bg-brand1 text-white"
                      : "bg-gray-100 text-brand1"
                  } font-semibold rounded-lg px-6 py-2 hover:bg-brand5/80 transition-all duration-300 cursor-pointer`}
                  onClick={() => handleCitySelect("Moscow")}
                >
                  {t("header.moscow")}
                </button>
                <button
                  className={`${
                    city === "Makhachkala"
                      ? "bg-brand1 text-white"
                      : "bg-gray-100 text-brand1"
                  } font-semibold rounded-lg px-6 py-2 hover:bg-brand5/80 transition-all duration-300 cursor-pointer`}
                  onClick={() => handleCitySelect("Makhachkala")}
                >
                  {t("header.makhachkala")}
                </button>
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="hidden lg:flex mx-4 xl:mx-8 items-center gap-3 xl:gap-5  w-fit justify-center lg:justify-end">
            <div className="flex flex-col  small-text">
              <span className="whitespace-nowrap flex items-center gap-1  mb-1">
                <FaPhoneAlt />{" "}
                {city === "Makhachkala"
                  ? "+7 (495) 123-45-67"
                  : "+7 (495) 324-11-11"}
              </span>
              <a
                href="mailto:info@hdmc.info"
                className="underline  flex items-center gap-1 whitespace-nowrap"
              >
                <FaEnvelope />
                info@hdmc.info
              </a>
            </div>
            {city === "Moscow" ? (
              <div className=" items-center gap-1   whitespace-nowrap">
                <h6 className="font-semibold small-text">
                  {" "}
                  {t("header.moscow")}{" "}
                </h6>
                <p
                  className="small-text text-brand1 leading-4"
                  dangerouslySetInnerHTML={{
                    __html: t("header.moscowAddress"),
                  }}
                ></p>
              </div>
            ) : (
              <div className=" items-center gap-1  whitespace-nowrap">
                <h6 className="font-semibold small-text">
                  {" "}
                  {t("header.makhachkala")}{" "}
                </h6>
                <p
                  className="small-text text-brand1 leading-4"
                  dangerouslySetInnerHTML={{
                    __html: t("header.makhachkalaAddress"),
                  }}
                ></p>
              </div>
            )}
          </div>

          {/* Socials & Language Switch */}
          <div className="hidden lg:flex items-center gap-2 justify-end min-w-0">
            <a
              href="https://wa.me/74951234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 text-lg xl:text-2xl hover:scale-125 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://t.me/medclinic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 text-lg xl:text-2xl hover:scale-125 transition-all duration-300"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 text-lg xl:text-2xl hover:scale-125 transition-all duration-300"
              aria-label="Max"
            >
              <img src="/max.png" alt="" className="w-6" />
            </a>
            <div
              className="relative md:ml-2 flex gap-1 md:gap-2 items-center"
              ref={dropdownRef}
            >
              <FaGlobe className="text-lg xl:text-2xl text-brand1" />
              <div className="relative">
                <button
                  className="cursor-pointer border font-semibold   base-text px-2 hover:bg-brand1/10 transition-all duration-300 py-1 rounded-lg  flex items-center gap-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={
                      languages.find((lang) => lang.code === selectedLang)?.flag
                    }
                    alt="Flag"
                    className="w-3 xl:w-4 h-3 xl:h-4"
                  />
                  {languages.find((lang) => lang.code === selectedLang)?.name}
                  <IoIosArrowDown className=" small-text " />
                </button>

                {dropdownOpen && (
                  <ul className="absolute md:top-9 w-full bg-white border border-[#002379] rounded-lg shadow-md mt-1 right-0 z-10 overflow-hidden">
                    {languages.map((lang) => (
                      <li
                        key={lang.code}
                        className="flex items-center gap-2 px-2 md:px-3 py-1 hover:bg-gray-200 cursor-pointer base-text  xl:base-text"
                        onClick={() => changeLanguage(lang.code)}
                      >
                        <img
                          src={lang.flag}
                          className="w-3 md:w-4 h-3 md:h-4"
                          alt={`${lang.name} Flag`}
                        />
                        {lang.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <button
              className="border hidden md:flex border-brand1 text-brand1 px-4 py-1.5 rounded-lg font-medium hover:bg-brand1/10 cursor-pointer transition-all duration-300 gap-2 items-center  whitespace-nowrap base-text"
              onClick={() => {
                setShowUserAccount(true);
                setIsOpen(false);
              }}
            >
              <FaUser className="" />
              {t("header.personalAccount")}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Desktop Nav Bar with Logo */}
      <motion.nav
        className="flex max-w-[90rem] relative  w-full mx-auto items-center justify-between px-4 py-2"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Logo now here */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex lg:absolute items-center gap-2 mr-2"
        >
          {i18n.language === "en" ? (
            <img
              src="/logo_en.png"
              alt="Logo"
              className="h-16 md:h-20 xl:h-24 object-contain"
            />
          ) : (
            <img
              src="/logo_ru.png"
              alt="Logo"
              className="h-16 md:h-20 xl:h-24 object-contain"
            />
          )}
        </Link>

        <div className="flex justify-end  w-full  gap-3">
          <div className="hidden lg:flex items-center ">
            <input
              type="text"
              className="border w-48 xl:min-w-110 border-brand1 text-brand1 px-4 h-full small-text rounded-l-lg font-medium hover:bg-brand1/10 transition-all duration-300"
              placeholder={t("header.search")}
            />
            <button
              type="button"
              className="h-full px-4 small-text rounded-r-lg bg-brand1 text-white font-medium hover:bg-brand1/90 transition-all duration-300"
            >
              {/* <FaSearch className="small-text" /> */}
              {t("header.searchBtn")}
            </button>
          </div>

          <button
            onClick={() => setShowPopup(true)}
            className=" min-w-48 xl:min-w-56 bg-brand1 text-white px-4 py-2 rounded-lg font-normal hover:bg-brand5/90 cursor-pointer transition-all duration-300 whitespace-nowrap hidden lg:flex justify-center items-center gap-2"
          >
            <FaCalendarCheck className="text-lg" />

            {t("header.bookAppointment")}
          </button>
          <button
            className="lg:hidden text-2xl text-gray-700"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      <nav className="hidden lg:flex z-100 py-3 w-full bg-gradient-to-r from-white from-20% xl:from-25% to-40% xl:to-45% to-brand1/10 justify-end ">
        <div className="hidden max-w-[90rem] mx-auto lg:flex justify-end gap-3  xl:gap-6 px-4  items-center flex-1 base-text font-semibold">
          {" "}
          <div
            onMouseEnter={() => setShowAboutDropdown(true)}
            onMouseLeave={() => setShowAboutDropdown(false)}
            className="relative   whitespace-nowrap cursor-pointer"
          >
            <button
              onClick={() => handleScrollToSection("#about")}
              className="flex items-center cursor-pointer gap-1 hover:text-brand2 transition-all duration-300"
            >
              {t("header.about")} <FaChevronDown className="small-text mt-1" />
            </button>

            {/* Animated dropdown */}
            <AnimatePresence>
              {showAboutDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 mt-4 grid grid-cols-2 gap-6 xl:gap-10 bg-white  shadow-lg shadow-black/40 rounded-xl p-6 z-40 w-xl xl:w-2xl"
                >
                  {aboutItems.map((a, idx) => (
                    <Link
                      key={idx}
                      to={a.path}
                      className="flex items-center gap-2 group-hover:text-brand2 base-text font-medium transition-all duration-300"
                    >
                      <span className=" rounded-full text-xl   group-hover:rotate-12 group-hover:scale-110 items-center justify-center shrink-0 transition-all duration-300 mr-1 text-[#e9865f]">
                        {a.icon}
                      </span>
                      <p className="group-hover:text-brand2 text-wrap base-text font-normal">
                        {a.label}
                      </p>
                      <div className="absolute right-2 top-3 overflow-hidden w-6">
                        <FaArrowRight className="text-lg text-brand2 transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => {
              setShowServices(false);
              setActiveSub(null);
            }}
            className="relative whitespace-nowrap cursor-pointer"
          >
            <Link
              to="/services"
              className="flex  items-center gap-1 hover:text-brand2 transition-all duration-300 cursor-pointer"
            >
              {t("header.services")}{" "}
              <FaChevronDown className="small-text mt-1" />
            </Link>

            <AnimatePresence>
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-2/3 mt-4 grid grid-rows-4  grid-flow-col gap-6 xl:gap-10  bg-white shadow-lg shadow-black/40 rounded-xl p-6  z-50 w-3xl xl:w-4xl font-normal"
                >
                  {services.map((s, idx) => (
                    <div
                      key={idx}
                      className={`${!s.subItems && "group"} relative`}
                      onMouseEnter={() => s.subItems && setActiveSub(s.label)}
                      onMouseLeave={() => s.subItems && setActiveSub(null)}
                    >
                      <Link
                        to={s.path || "#"}
                        className="flex items-center gap-2 group-hover:text-brand2 base-text font-medium transition-all duration-300"
                      >
                        <span className=" rounded-full text-xl   group-hover:rotate-12 group-hover:scale-110 items-center justify-center shrink-0 transition-all duration-300 mr-1 text-[#e9865f]">
                          {s.icon}
                        </span>
                        <p
                          className={`${
                            s.subItems && "text-[#0a3449]"
                          } group-hover:text-brand2 pr-8 base-text text-wrap font-normal`}
                          dangerouslySetInnerHTML={{ __html: s.label }}
                        ></p>
                        {s.subItems ? (
                          <FaChevronDown className="small-text mt-1 " />
                        ) : (
                          <div className="absolute right-0 top-2 overflow-hidden w-6">
                            <FaArrowRight className="text-lg text-brand2 transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                          </div>
                        )}
                      </Link>

                      <AnimatePresence>
                        {activeSub === s.label && s.subItems && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute left-0   top-[120%]  bg-[#f3f5f7] border border-gray-400 rounded-xl shadow-lg shadow-black/30 p-4 ${
                              s.subItems.length < 4 ? "w-sm" : "w-xl"
                            } z-50 flex flex-col gap-4 justify-between`}
                          >
                            {s.id === 2 ? (
                              <>
                                <div className="mb-2">
                                  <div className="grid grid-cols-2 gap-4">
                                    <ul className="space-y-4">
                                      {s.subItems.tests.map((item, j) => (
                                        <li key={j}>
                                          <Link
                                            to={item.path}
                                            className="block group text-wrap base-text text-gray-700 hover:text-brand2 transition-all relative pr-8"
                                          >
                                            {item.label}
                                            <div className="absolute right-2 top-2 overflow-hidden w-6">
                                              <FaArrowRight className="text-lg text-brand2 transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                                            </div>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                    <ul className="space-y-4">
                                      {s.subItems.diagnostics.map((item, j) => (
                                        <li key={j}>
                                          <Link
                                            to={item.path}
                                            className="block group text-wrap text-[#e9865f] base-text hover:text-brand2 transition-all relative pr-8"
                                          >
                                            {item.label}
                                            <div className="absolute right-2 top-2 overflow-hidden w-6">
                                              <FaArrowRight className="text-lg text-brand2 transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                                            </div>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <ul
                                className={`grid ${
                                  s.subItems.length < 4
                                    ? "grid-cols-1"
                                    : "grid-cols-2 "
                                }   gap-4`}
                              >
                                {s.subItems.map((item, i) => (
                                  <li key={i}>
                                    <Link
                                      to={item.path}
                                      className="block group text-wrap base-text text-gray-700 hover:text-brand2 transition-all relative pr-8"
                                    >
                                      {item.label}
                                      <div className="absolute right-2 top-2 overflow-hidden w-6">
                                        <FaArrowRight className="text-lg text-brand2 transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            onMouseEnter={() => setShowDoctorsDropdown(true)}
            onMouseLeave={() => {
              setShowDoctorsDropdown(false);
              setActiveSub(null);
            }}
            className="relative whitespace-nowrap cursor-pointer"
          >
            <button
              onClick={() => handleScrollToSection("#doctors")}
              className="flex items-center gap-1 hover:text-brand2 transition-all duration-300 cursor-pointer"
            >
              {t("header.doctors")}{" "}
              <FaChevronDown className="small-text mt-1" />
            </button>

            <AnimatePresence>
              {showDoctorsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-2/3 mt-4 grid grid-rows-2  grid-flow-col gap-6 xl:gap-10  bg-white shadow-lg shadow-black/40 rounded-xl p-6  z-50 w-2xl xl:w-4xl font-normal"
                >
                  {doctorsItems.map((d, idx) => (
                    <div
                      key={idx}
                      className={`${!d.subItems && "group"} relative`}
                      onMouseEnter={() => d.subItems && setActiveSub(d.label)}
                      onMouseLeave={() => d.subItems && setActiveSub(null)}
                    >
                      <Link
                        to={d.path || "#"}
                        className="flex items-center gap-2 group-hover:text-brand2 base-text font-medium transition-all duration-300"
                      >
                        <span className=" rounded-full text-xl   group-hover:rotate-12 group-hover:scale-110 items-center justify-center shrink-0 transition-all duration-300 mr-1 text-[#e9865f]">
                          {d.icon}
                        </span>
                        <p
                          className={`${
                            d.subItems && "text-[#0a3449]"
                          } group-hover:text-brand2 pr-8 base-text text-wrap font-normal`}
                        >
                          {d.label}
                        </p>
                        {d.subItems ? (
                          <FaChevronRight className="small-text mt-1 " />
                        ) : (
                          <div className="absolute right-0 top-2 overflow-hidden w-6">
                            <FaArrowRight className="text-lg text-brand2 transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                          </div>
                        )}
                      </Link>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            onMouseEnter={() => setShowPatientsDropdown(true)}
            onMouseLeave={() => setShowPatientsDropdown(false)}
            className="relative   whitespace-nowrap cursor-pointer"
          >
            <Link
              to="/for-patients"
              className="flex items-center cursor-pointer gap-1 hover:text-brand2 transition-all duration-300"
            >
              {t("header.forPatients")}{" "}
              <FaChevronDown className="small-text mt-1" />
            </Link>

            {/* Animated dropdown */}
            <AnimatePresence>
              {showPatientsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-2/3 mt-4 grid grid-cols-3 gap-6 xl:gap-10 bg-white shadow-lg shadow-black/40 rounded-xl p-6 z-40 w-xl xl:w-3xl"
                >
                  {patientItems.map((p, idx) => (
                    <Link
                      to={p.path}
                      key={idx}
                      className="flex items-center gap-2 group-hover:text-brand2 small-text xl:base-text font-medium transition-all duration-300"
                    >
                      <span className=" rounded-full text-xl   group-hover:rotate-12 group-hover:scale-110 items-center justify-center shrink-0 transition-all duration-300 mr-1 text-[#e9865f]">
                        {p.icon}
                      </span>
                      <p className="group-hover:text-brand2 base-text text-left text-wrap font-normal">
                        {p.label}
                      </p>
                      <div className="absolute right-2 top-3 overflow-hidden w-6">
                        <FaArrowRight className="text-lg text-brand2 transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => handleScrollToSection("#contact-and-feedback")}
            className=" whitespace-nowrap hover:text-brand2 transition-all duration-300 cursor-pointer"
          >
            {" "}
            {t("header.reviews")}{" "}
          </button>{" "}
          <Link
            to="/blogs"
            className=" whitespace-nowrap hover:text-brand2 transition-all duration-300 cursor-pointer"
          >
            {" "}
            {t("header.blog")}
          </Link>{" "}
          <button
            onClick={() => handleScrollToSection("#contact")}
            className=" whitespace-nowrap hover:text-brand2 transition-all duration-300 cursor-pointer"
          >
            {" "}
            {t("header.contact")}
          </button>{" "}
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {" "}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              ref={sidebarRef}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-[90vw] sm:w-1/2 bg-white shadow-lg z-50 flex flex-col p-6 overflow-y-auto"
            >
              {/* Close Button */}
              <button
                className="self-end text-2xl mb-4"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>

              <div className="flex  md:hidden items-center gap-2 justify-between mb-2 w-full">
                <div
                  className="relative md:ml-2 flex gap-2 items-center"
                  ref={dropdownRef}
                >
                  <FaGlobe className="text-2xl text-brand1" />
                  <div className="relative">
                    <button
                      className="cursor-pointer border font-semibold   base-text px-2 hover:bg-brand1/10 transition-all duration-300 py-1 rounded-lg  flex items-center gap-2"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <img
                        src={
                          languages.find((lang) => lang.code === selectedLang)
                            ?.flag
                        }
                        alt="Flag"
                        className="w-4 h-4"
                      />
                      {
                        languages.find((lang) => lang.code === selectedLang)
                          ?.name
                      }
                      <IoIosArrowDown className=" small-text " />
                    </button>

                    {dropdownOpen && (
                      <ul className="absolute md:top-9 w-full bg-white border border-[#002379] rounded-lg shadow-md mt-1 right-0 z-10 overflow-hidden">
                        {languages.map((lang) => (
                          <li
                            key={lang.code}
                            className="flex items-center gap-2 px-2 md:px-3 py-1 hover:bg-gray-200 cursor-pointer base-text"
                            onClick={() => changeLanguage(lang.code)}
                          >
                            <img
                              src={lang.flag}
                              className="w-3 md:w-4 h-3 md:h-4"
                              alt={`${lang.name} Flag`}
                            />
                            {lang.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 text-lg xl:text-2xl hover:scale-125 transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <img src="/max.png" alt="" className="w-7" />
                  </a>
                  <a
                    href="https://wa.me/74951234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 text-3xl hover:scale-125 transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="https://t.me/medclinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 text-3xl hover:scale-125 transition-all duration-300"
                    aria-label="Telegram"
                  >
                    <FaTelegramPlane />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2 base-text mb-4">
                <button
                  className="bg-brand1 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-sky-600 transition flex items-center gap-2 mt-4"
                  onClick={() => {
                    setShowUserAccount(true);
                    setIsOpen(false);
                  }}
                >
                  <FaUser className="text-lg" />
                  {t("header.personalAccount")}
                </button>
                <button
                  onClick={() => setShowPopup(true)}
                  className="border border-brand1 text-brand1 px-6 py-2.5 rounded-lg font-medium flex gap-2 items-center hover:bg-brand1/10 cursor-pointer transition whitespace-nowrap"
                >
                  <FaCalendarCheck className="text-lg" />

                  {t("header.bookAppointment")}
                </button>
              </div>

              <div className="flex flex-col m-6">
                <label htmlFor="city" className="text-xs mb-1">
                  {t("header.selectCity")}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border rounded-lg px-2 py-1"
                >
                  <option value="Moscow">{t("header.moscow")}</option>
                  <option value="Makhachkala">{t("header.makhachkala")}</option>
                </select>
              </div>

              <nav className="flex flex-col gap-4 base-text">
                <div>
                  <button
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    className="flex items-center justify-between w-full"
                  >
                    {t("header.about")}
                    <FaChevronDown
                      className={`ml-2 transform transition ${
                        isAboutOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isAboutOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 mt-2 max-h-80 py-2  overflow-y-auto small-text font-normal flex flex-col gap-4"
                      >
                        {aboutItems.map((a, idx) => (
                          <Link
                            key={idx}
                            to={a.path}
                            onClick={() => setIsOpen(false)}
                            className="block"
                          >
                            {a.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center justify-between w-full"
                  >
                    {t("header.services")}
                    <FaChevronDown
                      className={`ml-2 transform transition ${
                        isServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expandable Section */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 mt-2 max-h-80 py-2  overflow-y-auto small-text font-normal flex flex-col gap-4"
                      >
                        {services.map((item, idx) =>
                          item.subItems ? (
                            <div key={idx}>
                              <button
                                onClick={() =>
                                  setOpenSubCategory(
                                    openSubCategory === item.label
                                      ? null
                                      : item.label
                                  )
                                }
                                className="flex items-center justify-between w-full"
                              >
                                <div className="">
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: item.label,
                                    }}
                                  ></span>
                                </div>
                                <FaChevronDown
                                  className={`ml-2 transform transition ${
                                    openSubCategory === item.label
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>

                              <AnimatePresence>
                                {openSubCategory === item.label && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="ml-4 mt-2 flex flex-col gap-3"
                                  >
                                    {item.id === 2 ? (
                                      <div className="flex ml-2 flex-col gap-2 ">
                                        {item.subItems.tests.map((sub, i) => (
                                          <Link
                                            key={i}
                                            to={sub.path}
                                            onClick={() => setIsOpen(false)}
                                            className="block hover:underline"
                                          >
                                            {sub.label}
                                          </Link>
                                        ))}
                                        {item.subItems.diagnostics.map(
                                          (sub, i) => (
                                            <Link
                                              key={i}
                                              to={sub.path}
                                              onClick={() => setIsOpen(false)}
                                              className="block text-[#e9865f] hover:underline"
                                            >
                                              {sub.label}
                                            </Link>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <div className="flex ml-2 flex-col gap-2 ">
                                        {item.subItems.map((sub, i) => (
                                          <Link
                                            key={i}
                                            to={sub.path}
                                            onClick={() => setIsOpen(false)}
                                            className="block hover:underline"
                                          >
                                            {sub.label}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              key={idx}
                              to={item.path}
                              onClick={() => setIsOpen(false)}
                              className=""
                            >
                              {item.label}
                            </Link>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  {/* Button to toggle main Doctors section */}
                  <button
                    onClick={() => setIsDoctorsOpen(!isDoctorsOpen)}
                    className="flex items-center justify-between w-full"
                  >
                    {t("header.doctors")}
                    <FaChevronDown
                      className={`ml-2 transform transition ${
                        isDoctorsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expandable Section */}
                  <AnimatePresence>
                    {isDoctorsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 mt-2 max-h-80 py-2  overflow-y-auto small-text font-normal flex flex-col gap-4"
                      >
                        {doctorsItems.map((item, idx) =>
                          item.subItems ? (
                            <div key={idx}>
                              <button
                                onClick={() =>
                                  setOpenSubCategory(
                                    openSubCategory === item.label
                                      ? null
                                      : item.label
                                  )
                                }
                                className="flex items-center justify-between w-full"
                              >
                                <div className="">
                                  <span>{item.label}</span>
                                </div>
                                <FaChevronDown
                                  className={`ml-2 transform transition ${
                                    openSubCategory === item.label
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>

                              <AnimatePresence>
                                {openSubCategory === item.label && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="ml-4 mt-2 flex flex-col gap-3"
                                  >
                                    {item.subItems.map((sub, i) => (
                                      <div key={i}>
                                        <p className="font-semibold  mb-1">
                                          {sub.category}
                                        </p>
                                        <div className="flex ml-2 flex-col gap-2 ">
                                          {sub.items.map((doctor, j) => (
                                            <Link
                                              key={j}
                                              to={doctor.path}
                                              onClick={() => setIsOpen(false)}
                                              className="block hover:underline"
                                            >
                                              {doctor.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              key={idx}
                              to={item.path}
                              onClick={() => setIsOpen(false)}
                              className=""
                            >
                              {item.label}
                            </Link>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <button
                    onClick={() => setIsPatientsOpen(!isPatientsOpen)}
                    className="flex items-center justify-between w-full"
                  >
                    {t("header.forPatients")}
                    <FaChevronDown
                      className={`ml-2 transform transition ${
                        isPatientsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isPatientsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 mt-2 max-h-80 py-2  overflow-y-auto small-text font-normal flex flex-col gap-4"
                      >
                        {patientItems.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleScrollToPatientsSection(p.path);
                              setIsOpen(false);
                            }}
                            className="block text-left"
                          >
                            {p.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => {
                    handleScrollToSection("#contact-and-feedback");
                    setIsOpen(false);
                  }}
                  className="text-left  whitespace-nowrap"
                >
                  {" "}
                  {t("header.reviews")}
                </button>{" "}
                <Link
                  to="/blogs"
                  onClick={() => setIsOpen(false)}
                  className="  hover:underline whitespace-nowrap"
                >
                  {" "}
                  {t("header.blog")}
                </Link>{" "}
                <button
                  onClick={() => {
                    handleScrollToSection("#contact");
                    setIsOpen(false);
                  }}
                  className="text-left   hover:underline whitespace-nowrap"
                >
                  {" "}
                  {t("header.contact")}
                </button>{" "}
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/services/service1"
                  className="  hover:underline whitespace-nowrap"
                >
                  {" "}
                  {t("header.servicesDrop.s1.title")}
                </Link>{" "}
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/early-detection-program"
                  className="  hover:underline whitespace-nowrap"
                >
                  {" "}
                  {t("header.earlyDiagnosis")}
                </Link>{" "}
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/oncological-care"
                  className="  hover:underline whitespace-nowrap"
                >
                  {" "}
                  {t("header.oncologicalCare")}
                </Link>{" "}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
