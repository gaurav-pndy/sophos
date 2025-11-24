import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaLocationDot, FaSpinner } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { FiFilter, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import WaveBackground from "../WaveBackground";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://apimanager.health-direct.ru/api";

const DoctorsSection = ({ setShowPopup }) => {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState("All");
  const [specialization, setSpecialization] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors data from backend
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (type !== "All") params.append("type", type);
      if (specialization !== "All")
        params.append("specialization", specialization);
      if (searchTerm) params.append("search", searchTerm);
      params.append("language", i18n.language);
      params.append("page", "1");
      params.append("limit", "12"); // Limit for homepage section

      const response = await fetch(`${API_BASE}/website/doctors?${params}`);
      if (!response.ok) throw new Error("Failed to fetch doctors");

      const result = await response.json();

      if (result.success) {
        setDoctors(result.data || []);
        console.log("doc", result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch specializations data from backend
  const fetchSpecializations = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/website/doctors/specializations?language=${i18n.language}`
      );
      if (!response.ok) throw new Error("Failed to fetch specializations");

      const result = await response.json();

      if (result.success) {
        setSpecializations(result.data || []);
        console.log("spec", result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error("Error fetching specializations:", err);
      setSpecializations([]);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDoctors();
    fetchSpecializations();
  }, [i18n.language]);

  // Refetch when filters change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDoctors();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [type, specialization, searchTerm, i18n.language]);

  // Helper function to get localized field from backend data
  const getLocalizedField = (field, fallback = "") => {
    if (!field) return fallback;
    return field[i18n.language] || field.en || field.ru || fallback;
  };

  // Prepare doctor cards for display from backend data
  const cards = doctors.map((doc) => {
    const fullName = `${getLocalizedField(doc.firstName)} ${getLocalizedField(
      doc.lastName
    )}`.trim();
    const specialty = getLocalizedField(doc.specialty);
    const location = getLocalizedField(doc.location);
    const about = getLocalizedField(doc.about);
    const position = getLocalizedField(doc.position);

    // Create tags from specialty and subSpecialties
    const tags = [specialty];
    if (doc.subSpecialties && doc.subSpecialties.length > 0) {
      tags.push(
        ...doc.subSpecialties
          .map((sub) => getLocalizedField(sub))
          .filter(Boolean)
      );
    }

    // Format languages
    const languages = doc.languages
      ? doc.languages
          .map((lang) => getLocalizedField(lang))
          .filter(Boolean)
          .join(", ")
      : "";

    return {
      ...doc,
      id: doc.id || doc._id,
      name: fullName,
      firstName: doc.firstName,
      middleName: doc.middleName,
      lastName: doc.lastName,
      specialty,
      location,
      about,
      position,
      tags: tags.filter((tag) => tag && tag.trim() !== ""),
      languages,
      image: doc.imageUrl || "/default-doctor.jpg",
      type: doc.services?.online ? "remote" : "personal", // Determine type based on services
      fees: doc.feesAmount ? `${doc.feesAmount} ${doc.currency || ""}` : "",
    };
  });

  // Filter doctors based on type
  const filteredDoctors = cards.filter((doc) => {
    const matchesType =
      type === "All" ||
      (type === "Personal" && doc.type === "personal") ||
      (type === "Remote" && doc.type === "remote");

    const matchesSpecialization =
      specialization === "All" ||
      (doc.tags &&
        doc.tags.some((tag) =>
          specializations.some(
            (spec) => spec.label === tag && spec.id === specialization
          )
        ));

    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.about.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesType && matchesSpecialization && matchesSearch;
  });

  console.log("filt", filteredDoctors);

  // Loading state
  if (loading && doctors.length === 0 && filteredDoctors.length === 0) {
    return (
      <section className="w-full py-10 flex justify-center items-center min-h-96">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-brand1 mx-auto mb-4" />
          <p className="text-brand1 text-lg">
            {t("loading") || "Loading doctors..."}
          </p>
        </div>
      </section>
    );
  }

  // Error state
  if (error && doctors.length === 0) {
    return (
      <section className="w-full py-10 flex justify-center items-center min-h-96">
        <div className="text-center text-red-600">
          <p className="mb-4">
            {t("error") || "Error"}: {error}
          </p>
          <button
            onClick={fetchDoctors}
            className="px-6 py-2 bg-brand1 text-white rounded-lg hover:bg-brand5/90 transition-colors"
          >
            {t("tryAgain") || "Try Again"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="doctors"
      className="w-full py-10 flex flex-col items-start max-w-[87rem] px-4 mx-auto"
    >
      {/* --- Header --- */}
      <section className="relative rounded-xl mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
        <WaveBackground
          stroke="rgba(51, 186, 189,"
          custStyle="md:w-1/2 h-[65%] right-0 bottom-0"
        />

        <div className="w-full h-full z-30 -mb-[1px] md:-mb-0">
          <div className="relative w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://www.shutterstock.com/shutterstock/videos/3441635569/preview/stock-footage-multi-cultural-medical-team-wearing-scrubs-with-digital-tablet-walking-along-corridor-in-modern.webm"
              alt="Doctors video"
              className="max-w-2xl w-full md:min-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t via-30% md:bg-gradient-to-l from-[#5279be] via-[#5279be]/40 to-transparent`}
            ></div>
          </div>
        </div>
        <div className="text-left md:text-right w-full md:min-h-96 h-full p-6 pb-16 md:p-6 lg:pr-10 xl:pr-12 bg-gradient-to-t md:bg-gradient-to-l from-[#27407f] to-[#5279be]">
          <h2 className="text-white relative z-40 text-[2rem] leading-10 font-bold mb-6">
            {t("doctors.title1")}
          </h2>
          <p
            className="md:text-lg relative z-40 text-white"
            dangerouslySetInnerHTML={{ __html: t("doctors.subtitle") }}
          ></p>
        </div>
      </section>

      {/* --- Filter Bar --- */}
      <div className="w-full bg-white border border-brand4/30 rounded-xl shadow-sm mt-10 md:mt-12">
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
              <div className="flex gap-3">
                {[
                  { label: t("doctors.filter.all"), value: "All" },
                  { label: t("doctors.filter.personal"), value: "Personal" },
                  { label: t("doctors.filter.remote"), value: "Remote" },
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
                <option value="All">
                  {t("doctors.filter.all") || "All Specializations"}
                </option>
                {specializations.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label} {opt.count && `(${opt.count})`}
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

      {/* Loading state for filtered results */}
      {loading && doctors.length > 0 && (
        <div className="w-full flex justify-center py-8">
          <FaSpinner className="animate-spin text-brand1 text-xl" />
        </div>
      )}

      {/* --- Swiper with Filtered Results --- */}
      {filteredDoctors.length > 0 ? (
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
          {[...filteredDoctors]
            .reverse()
            .slice(0, 5)
            .map((doc) => (
              <SwiperSlide key={doc.id}>
                <Link
                  to={`/doctors/${doc.id}`}
                  className="bg-white my-4 rounded-xl hover:scale-105 hover:bg-brand4/20 hover:shadow-lg cursor-pointer shadow-md transition-all duration-300 p-4 flex flex-col justify-between min-h-132"
                >
                  <div className="flex-1 flex flex-col">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-64 object-cover object-top rounded-lg bg-gray-100"
                      onError={(e) => {
                        e.target.src = "/doctors.png";
                      }}
                    />
                    <div className="font-bold text-black text-xl mt-4 mb-3">
                      <span className="uppercase">
                        {" "}
                        {doc.lastName[i18n.language]}
                      </span>{" "}
                      {doc.firstName[i18n.language]}{" "}
                      {doc.middleName[i18n.language]}
                    </div>
                    {doc.position && (
                      <p className="text-brand1 text-sm font-medium mb-3">
                        {doc.position}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full border border-brand4 text-black text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className="px-2 py-1 rounded-full border border-brand4 text-black text-xs">
                          +{doc.tags.length - 3}
                        </span>
                      )}
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
      ) : (
        !loading && (
          <div className="w-full text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="w-24 h-24 text-brand4/40 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                />
              </svg>
              <h3 className="text-brand1 text-xl font-semibold mb-2">
                No doctors found
              </h3>
              <p className="text-brand1/70 mb-6">
                No doctors match your current filters. Try adjusting your search
                criteria.
              </p>
              <button
                onClick={() => {
                  setType("All");
                  setSpecialization("All");
                  setSearchTerm("");
                }}
                className="px-6 py-2 bg-brand1 text-white rounded-lg hover:bg-brand5/90 transition-colors font-medium"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )
      )}

      <div className="w-full mt-10 flex justify-center">
        <Link
          to={"/doctors"}
          className="bg-brand1 relative z-40 text-white font-semibold rounded-lg px-8 py-3 shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 w-fit"
        >
          {t("moreBtn")}
        </Link>
      </div>
    </section>
  );
};

export default DoctorsSection;
