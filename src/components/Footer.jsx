import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = ({ city }) => {
  const { t } = useTranslation();

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

  const handleScrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      // Already on homepage → just scroll
      scrollToSection(sectionId);
    } else {
      // Go to homepage first, then scroll
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer id="footer" className="bg-brand1 text-white pt-8 pb-4 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr] gap-8">
        {/* Column 1: Logo and about */}
        <div className="flex-1">
          <img src="/hd-logo-white.svg" alt="Logo" className="h-10" />
        </div>

        {/* Column 2: Navigation links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">
            {t("footer.navigation")}
          </h3>
          <div className="flex md:grid md:grid-cols-1 flex-col gap-1">
            <button
              onClick={() => handleScrollToSection("#about")}
              className=" hover:text-brand2 text-left cursor-pointer"
            >
              {t("header.about")}{" "}
            </button>
            <button
              onClick={() => handleScrollToSection("#doctors")}
              className=" hover:text-brand2 text-left cursor-pointer"
            >
              {t("header.doctors")}{" "}
            </button>
            <Link to="/for-patients" className=" hover:text-brand2">
              {t("header.forPatients")}{" "}
            </Link>
            <button
              onClick={() => handleScrollToSection("#services")}
              className=" hover:text-brand2 text-left cursor-pointer"
            >
              {t("header.services")}{" "}
            </button>
            <a href="#" className=" hover:text-brand2">
              {t("header.priceList")}
            </a>

            <Link to="/about#vacancies" className=" hover:text-brand2">
              {t("header.vacancies")}
            </Link>
          </div>
        </div>

        {/* Column 3: Documents */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">
            {t("footer.documents")}
          </h3>
          <div className="flex flex-col gap-1 text-white/90">
            {/* <a href="#" className="hover:underline">
              {t("footer.priceList")}
            </a> */}

            <Link to="/about#licenses" className="hover:underline">
              {t("footer.licenses")}
            </Link>
            <Link to="#" className="hover:underline">
              {t("footer.documents")}
            </Link>
          </div>
        </div>

        {/* Column 4: Contact info */}
        <div className="flex-1 text-sm">
          <h3 className="text-lg font-semibold mb-4">
            {}
            {t("footer.contact")}
          </h3>
          <div className="flex items-start gap-2 mb-2">
            <FaMapMarkerAlt className="mt-1.5" />
            {city === "Makhachkala" ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: t("address.clinic2.address"),
                }}
              ></span>
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: t("address.clinic1.address"),
                }}
              ></span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FaClock />{" "}
            <span>
              {}
              {city === "Makhachkala"
                ? t("address.clinic2.schedule")
                : t("address.clinic1.schedule")}
            </span>
          </div>
          <a
            href="mailto:info@hdmc.info"
            target="_blank"
            className="flex items-center gap-2 mb-2"
          >
            <FaEnvelope /> <span>info@hdmc.info</span>
          </a>
          {city === "Makhachkala" ? (
            <a
              href="tel:+74951234567"
              target="_blank"
              className="flex items-center gap-2 mb-4"
            >
              <FaPhoneAlt /> <span>+7 (495) 123-45-67</span>
            </a>
          ) : (
            <a
              href="tel:+74996853000"
              target="_blank"
              className="flex items-center gap-2 mb-4"
            >
              <FaPhoneAlt /> <span>+7 (499) 685-30-00</span>
            </a>
          )}

          <div className="flex gap-4">
            {city === "Makhachkala" ? (
              <a
                href="https://wa.me/798820455775"
                target="_blank"
                className="bg-[#2aa81a] hover:scale-110 transition-all duration-300 cursor-pointer p-2 rounded-full"
              >
                <FaWhatsapp size={24} />
              </a>
            ) : (
              <a
                href="https://wa.me/74955142058"
                target="_blank"
                className="bg-[#2aa81a] hover:scale-110 transition-all duration-300 cursor-pointer p-2 rounded-full"
              >
                <FaWhatsapp size={24} />
              </a>
            )}
            <a
              href="https://t.me/medclinic"
              target="_blank"
              className="bg-[#039be5] hover:scale-110 transition-all duration-300 cursor-pointer p-2 rounded-full"
            >
              <FaTelegramPlane size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 bg-[#793be4] hover:scale-110 transition-all duration-300 cursor-pointer p-2  rounded-full text-lg xl:text-2xl  "
              aria-label="Max"
            >
              <img src="/max.png" alt="" className="w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white/60 text-sm mt-4">
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
