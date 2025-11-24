import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { servicesData } from "../data/services";
import { BiChevronRight } from "react-icons/bi";
import WaveBackground from "../components/WaveBackground";
import { useMediaQuery } from "react-responsive";
import OtherServices from "../components/ServiceDetails/OtherServices";
import { doctorsData } from "../data/doctors";
import { FaLocationDot } from "react-icons/fa6";
import { specializationsData } from "../data/specializations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { FiFilter, FiSearch } from "react-icons/fi";

const ServiceDetails = ({ setShowPopup }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("about");

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { serviceId } = useParams();
  const service = servicesData.find((s) => s.id === serviceId);

  const baseTabs = [
    { key: "about", label: t("services.tab1") },
    // Conditionally include "Diseases" tab
    ...(service?.diseases
      ? [{ key: "diseases", label: t("services.tab6") }]
      : []),
    { key: "doctors", label: t("services.tab2") },
    { key: "reviews", label: t("services.tab3") },
    { key: "prices", label: t("services.tab4") },
    { key: "other", label: t("services.tab5") },
  ];

  const TABS = baseTabs;

  const navigate = useNavigate();

  let doctors = [];
  let tags = [];
  if (service.doctors) {
    doctors = doctorsData.filter((doc) => service.doctors?.includes(doc.id));
  }

  const [type, setType] = useState("All");
  const [specialization, setSpecialization] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Helper to get a translated value (array or string)
  const getT = (key) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? value : String(value).split("<br/>");
  };

  // Prepare doctor list with translations
  const cards = doctorsData.map((doc) => ({
    ...doc,
    name: t(doc.name),
    location: t(doc.location),
    tags: getT(doc.tags),
    langs: t(doc.langs),
    desc: getT(doc.desc).join(" "),
  }));

  // Filtering logic

  const specializations = [
    {
      label: t("header.doctorsDrop.d1"),
      subItems: [
        {
          category: t("header.doctorsDrop.subItems.h1"),
          items: [
            {
              label: t("header.doctorsDrop.subItems.s1"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s2"),
              path: "/doctors/radiotherapist",
            },
          ],
        },
        {
          category: t("header.doctorsDrop.subItems.h2"),
          items: [
            {
              label: t("header.doctorsDrop.subItems.s3"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s4"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s5"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s6"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s7"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s8"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s9"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s10"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s11"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s12"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s13"),
              path: "/doctors",
            },
            {
              label: t("header.doctorsDrop.subItems.s14"),
              path: "/doctors",
            },
            { label: t("header.doctorsDrop.subItems.s15"), path: "/doctors" },
          ],
        },
      ],
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d2"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d3"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d4"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d5"),
    },

    {
      path: "/doctors",
      label: t("header.doctorsDrop.d7"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d8"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d9"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d10"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d11"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d12"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d13"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d14"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d15"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d16"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d17"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d18"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d19"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d20"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d21"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d22"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d23"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d24"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d25"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d26"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d27"),
    },
    {
      path: "/doctors",
      label: t("header.doctorsDrop.d28"),
    },
  ];

  // Helper to flatten nested specialization structure and return all unique labels
  const getAllSpecializationObjects = (specializations) => {
    const result = [];

    const traverse = (node) => {
      if (!node) return;
      if (node.label && !node.subItems && !node.items) result.push(node.label);
      if (node.items && Array.isArray(node.items)) node.items.forEach(traverse);
      if (node.subItems && Array.isArray(node.subItems))
        node.subItems.forEach(traverse);
    };

    // Start from subItems of the first, skipping root heading, and also add others as before
    if (specializations[0]?.subItems) {
      specializations[0].subItems.forEach(traverse);
    }
    specializations.slice(1).forEach(traverse);

    // Remove duplicates, then create objects with sequential ID and label
    const uniqueLabels = Array.from(new Set(result));
    return uniqueLabels.map((label, idx) => ({
      id: `specialization${idx + 1}`,
      label,
    }));
  };

  const specializationOptions = getAllSpecializationObjects(specializations);

  const idToLabelMap = Object.fromEntries(
    specializationOptions.map((opt) => [opt.id, opt.label])
  );

  const filteredDoctors = cards.filter((doc) => {
    const matchesType =
      type === "All" ||
      (type === "Personal" && doc.type === "personal") ||
      (type === "Remote" && doc.type === "remote");

    const matchesSpecialization =
      !specialization || // initial state, possibly undefined
      specialization === "All" ||
      (doc.tags && doc.tags.includes(idToLabelMap[specialization]));

    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.desc.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSpecialization && matchesSearch;
  });

  const scrollToServices = () => {
    navigate("/"); // go to home
    setTimeout(() => {
      const el = document.querySelector("#services");
      if (el) {
        const yOffset = -100; // offset for top margin (adjust as needed)
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100); // delay to ensure home page has rendered
  };

  return (
    <div
      className=" min-h-screen pb-16 pt-10  mx-auto px-4"
      style={{
        background: `linear-gradient(to right, ${service.color1}20, ${service.color2}20)`,
      }}
    >
      <div className="mb-4 max-w-[87rem] mx-auto text-brand1 flex gap-2 font-semibold items-center">
        {" "}
        <button
          onClick={scrollToServices}
          className="text-brand3 hover:underline font-normal cursor-pointer"
        >
          {t("services.services")}
        </button>
        <BiChevronRight className="text-xl" />
        {t(service.title)}
      </div>
      {/* HERO */}
      <section className="relative rounded-xl max-w-[87rem] mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
        <WaveBackground
          stroke={service.stroke}
          custStyle="md:w-1/2 h-1/2 left-0 top-0"
        />

        {/* Rest of your content */}
        <div
          className="w-full md:min-h-96 flex flex-col justify-center h-full p-6 pb-16 md:p-6 lg:p-10 xl:p-12"
          style={{
            background: `linear-gradient(${
              isMobile ? "to bottom" : "to right"
            }, ${service.color1}, ${service.color2})`,
          }}
        >
          <h1 className="text-white z-40 text-3xl md:text-[2.5rem] font-bold mb-8">
            {t(service.title)}
          </h1>
          {/* <p className="text-white text-lg md:text-2xl mb-6 drop-shadow">
            {service.subtitle && t(service.subtitle)}
          </p> */}
          <button
            onClick={() => setShowPopup(true)}
            className="flex relative z-40 items-center justify-center gap-2 w-full md:w-fit px-6 py-3 rounded-lg bg-white text-brand1 text-lg font-medium hover:text-white hover:bg-transparent cursor-pointer transition-all duration-300 border border-white "
          >
            {service.btn ? t(service.btn) : t("services.s1.btn")}
          </button>
        </div>

        <div className="w-full   h-full z-30 -mt-[1px] md:-mt-0">
          <div className="relative w-full  h-full">
            {service.video && (
              <video
                autoPlay
                loop
                muted
                playsInline
                src={service.video}
                className=" w-full md:min-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
              ></video>
            )}
            <div
              className="absolute md:rounded-tr-2xl md:rounded-br-2xl inset-0"
              style={{
                background: `linear-gradient(${
                  isMobile ? "to bottom" : "to right"
                }, ${service.color2}, ${
                  service.color2
                }66 30%, transparent 100%)`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <nav
        className="max-w-[87rem] mx-auto flex gap-2 bg-[#e9f6f] rounded-xl  p-2 my-10"
        style={{
          background: `linear-gradient(to right, ${service.color1}, ${service.color2})`,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 cursor-pointer text-lg py-3 rounded-lg font-semibold transition ${
              activeTab === tab.key
                ? "bg-white shadow"
                : "text-white hover:bg-white/20"
            }`}
            style={{
              color: activeTab === tab.key ? service.color1 : "white",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB PANES */}
      <div className="max-w-[87rem] mx-auto ">
        {/* О УСЛУГЕ */}
        {activeTab === "about" && (
          <div
            className="bg-white rounded-2xl shadow p-8 text-lg "
            style={{
              color: service.color1,
            }}
            dangerouslySetInnerHTML={{ __html: t(service.about) }}
          ></div>
        )}
        {activeTab === "diseases" && (
          <div
            className="bg-white rounded-2xl shadow p-8 text-lg "
            style={{
              color: service.color1,
            }}
            dangerouslySetInnerHTML={{ __html: t(service.diseases) }}
          ></div>
        )}
        {/* ВРАЧИ */}
        {activeTab === "doctors" && (
          <div className="bg-white rounded-2xl shadow p-8">
            {/* Place your doctors grid or reusable doctors component here. */}
            {service.id === "service1" ? (
              <div className="w-full  flex flex-col items-start max-w-[87rem] px-4 mx-auto">
                <div className="w-full bg-white border border-brand4/30 rounded-xl shadow-sm ">
                  {/* Expandable Filters */}
                  <AnimatePresence>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 py-4 grid md:grid-cols-2 gap-6 bg-brand4/10"
                    >
                      {/* Type of Consultation */}
                      <div>
                        <label className="text-sm font-medium text-brand1 block mb-2">
                          {t("doctors.filter.consultType")}
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { label: t("doctors.filter.all"), value: "All" },
                            {
                              label: t("doctors.filter.personal"),
                              value: "Personal",
                            },
                            {
                              label: t("doctors.filter.remote"),
                              value: "Remote",
                            },
                          ].map((item) => (
                            <button
                              key={item.value}
                              onClick={() => setType(item.value)}
                              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                                type === item.value
                                  ? "bg-brand1 text-white border-brand1"
                                  : "bg-white border-brand4 text-brand1 hover:bg-brand4/20"
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Specialization */}
                      <div>
                        <label className="text-sm font-medium text-brand1 block mb-2">
                          {t("doctors.filter.specialization")}
                        </label>
                        <select
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                          className="w-full border border-brand4/40 rounded-lg px-3 py-2.5 text-sm text-brand1 outline-none focus:border-brand1 transition-all bg-white"
                        >
                          <option value="All">{t("doctors.filter.all")}</option>
                          {specializationOptions.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* --- Navigation Buttons --- */}
                <div className="flex items-center justify-end w-full mt-6 gap-2">
                  <button className="prev-btn bg-white rounded px-3 py-2 border border-brand4 text-brand1 transition hover:bg-brand4/10">
                    &lt;
                  </button>
                  <button className="next-btn bg-white rounded px-3 py-2 border border-brand4 text-brand1 transition hover:bg-brand4/10">
                    &gt;
                  </button>
                </div>

                {/* --- Swiper with Filtered Results --- */}
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    768: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 },
                    1380: { slidesPerView: 4 },
                  }}
                  className="w-full h-full overflow-visible mt-2"
                  navigation={{
                    prevEl: ".prev-btn",
                    nextEl: ".next-btn",
                  }}
                >
                  {filteredDoctors.map((doc) => (
                    <SwiperSlide key={doc.id}>
                      <Link
                        to={`/doctors/${doc.id}`}
                        className="bg-white my-4 rounded-xl hover:scale-105 hover:bg-brand4/20 hover:shadow-lg cursor-pointer shadow-md transition-all duration-300 p-4 flex flex-col justify-between md:min-h-[30rem]"
                      >
                        <div className="flex-1 flex flex-col">
                          {/* Add avatar or doctor photo here if you have */}
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-full h-64 object-cover object-top rounded-lg"
                          />
                          <div className="font-bold text-black text-xl mt-4 mb-3">
                            {doc.name}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {doc.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 rounded-full border border-brand4 text-black text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => setShowPopup(true)}
                          className="mt-4 px-6 py-2.5 w-full border border-brand1 bg-brand1 hover:bg-brand5/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand1/30 text-center cursor-pointer"
                        >
                          {t("doctors.btn1")}
                        </button>
                        <Link
                          to={`/doctors/${doc.id}`}
                          className="mt-2 px-6 py-2.5 w-full border bg-white border-brand1 hover:bg-brand1 text-brand1 hover:text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand1/30 text-center cursor-pointer"
                        >
                          {t("doctors.btn2")}
                        </Link>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="w-full mt-10 flex justify-center">
                  <Link
                    to={"/doctors"}
                    className="bg-brand1 relative z-40 text-white font-semibold rounded-lg px-8 py-3 shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 w-fit"
                  >
                    {t("moreBtn")}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                {doctors.length > 0 &&
                  doctors.map((doc) => (
                    <Link
                      key={doc.id}
                      to={`/doctors/${doc.id}`}
                      className="bg-white my-4 rounded-xl hover:scale-105 hover:bg-brand4/20 hover:shadow-lg cursor-pointer shadow-md transition-all duration-300 p-4 flex flex-col justify-between min-h-[34rem]"
                    >
                      <div className="flex-1 flex flex-col">
                        {/* Add avatar or doctor photo here if you have */}
                        <img
                          src={t(doc.image)}
                          alt={t(doc.name)}
                          className="w-full h-60 object-top object-cover rounded-lg"
                        />
                        <div className="font-bold text-black text-xl mt-4 mb-3">
                          {t(doc.name)}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {t(doc.tags, { returnObjects: true }).map(
                            (tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 rounded-full border border-brand4 text-black text-xs"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                        <div className="text-brand1 text-sm mb-3 line-clamp-2">
                          {t(doc.desc)}
                        </div>
                        <div className="flex flex-row gap-4 items-center mb-3 text-brand1/90 text-xs">
                          <span className="flex items-center">
                            <FaLocationDot className="mr-1" /> {t(doc.location)}
                          </span>
                        </div>
                        <div className="text-brand1/60 text-xs">
                          {t("doctors.languages")}:
                        </div>
                        <div className="text-brand1 text-sm font-medium">
                          {t(doc.langs)}
                        </div>
                      </div>
                      <button className="mt-4 px-6 py-2.5 w-full bg-brand1 hover:bg-brand5/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand1/30 text-center">
                        {t("doctors.viewProfile")}
                      </button>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}
        {/* ОТЗЫВЫ */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-brand1/70">
              Отзывов еще нет, либо они не добавлены.
            </div>
          </div>
        )}
        {/* ЦЕНЫ */}
        {activeTab === "prices" && (
          <div className="bg-white rounded-2xl shadow p-8">
            {/* Insert your pricing table here */}
            <div className="text-brand1 font-bold text-xl mb-3">
              Стоимость консультации
            </div>
          </div>
        )}

        {activeTab === "other" && <OtherServices />}
      </div>
    </div>
  );
};

export default ServiceDetails;
