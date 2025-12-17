import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import WaveBackground from "../WaveBackground";
import ReactCountryFlag from "react-country-flag";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";

const DoctorsSection = ({ setShowPopup }) => {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState("All");
  const [specialization, setSpecialization] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [branch, setBranch] = useState(
    () => localStorage.getItem("city") || "" // read once on mount
  );

  // Format specializations list (same as DoctorsPage)
  const formatSpecializationsList = (specString = "") => {
    const formatted = specString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        return s
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      })
      .filter((s, i, arr) => arr.indexOf(s) === i);

    return formatted;
  };

  // Fetch doctors data from backend WITH FILTERS
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (type !== "All") params.append("type", type);
      if (specialization !== "All") {
        params.append("specialization", specialization);
      }
      if (searchTerm) params.append("search", searchTerm);
      params.append("language", i18n.language);
      params.append("page", "1");
      params.append("limit", "12");
      params.append("expert", true);
      if (branch) params.append("branch", branch);

      const response = await fetch(`${API_BASE}/api/website/doctors?${params}`);
      if (!response.ok) throw new Error("Failed to fetch doctors");

      const result = await response.json();

      if (result.success) {
        setDoctors(result.data || []);
        console.log("DoctorsSection", result.data);
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
        `${API_BASE}/api/website/doctors/specializations?language=${i18n.language}`
      );
      if (!response.ok) throw new Error("Failed to fetch specializations");

      const result = await response.json();

      if (result.success) {
        // Use the same formatting logic as DoctorsPage
        const labelMap = new Map();

        result.data.forEach((item) => {
          const formattedLabels = formatSpecializationsList(item.label);

          formattedLabels.forEach((label) => {
            if (!labelMap.has(label)) {
              labelMap.set(label, {
                id: label,
                label: label,
                originalItems: [],
              });
            }
            labelMap.get(label).originalItems.push(item);
          });
        });

        const specializationsWithCount = await Promise.all(
          Array.from(labelMap.values()).map(async (spec) => {
            try {
              const params = new URLSearchParams();
              params.append("specialization", spec.id);
              params.append("language", i18n.language);
              params.append("page", "1");
              params.append("limit", "1");
              if (branch) params.append("branch", branch);

              const response = await fetch(
                `${API_BASE}/api/website/doctors?${params}`
              );
              if (response.ok) {
                const result = await response.json();
                return {
                  ...spec,
                  count: result.pagination?.totalDoctors || 0,
                  uniqueKey: `${spec.id.replace(/\s+/g, "-")}-${Date.now()}`,
                };
              }
            } catch (err) {
              console.error(`Error fetching count for ${spec.label}:`, err);
            }

            return {
              ...spec,
              count: 0,
              uniqueKey: `${spec.id.replace(/\s+/g, "-")}-${Date.now()}`,
            };
          })
        );

        setSpecializations(specializationsWithCount);
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
    console.log("API Response:", doctors);
    fetchSpecializations();
  }, [i18n.language, branch]);

  // Refetch when filters change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDoctors();
      console.log("API Response:", doctors);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [type, specialization, searchTerm, i18n.language, branch]);

  // Helper function to get localized field from backend data
  const getLocalizedField = (field, fallback = "") => {
    if (!field) return fallback;
    return field[i18n.language] || field.en || field.ru || fallback;
  };

  const formatExperience = (years) => {
    if (!years) return null;
    return years > 40 ? "Стаж работы более 40 лет" : `Стаж работы ${years} лет`;
  };

  // Prepare doctor cards for display from backend data
  const cards = doctors.map((doc) => {
    const fullName = `${getLocalizedField(doc.firstName)} ${getLocalizedField(
      doc.lastName
    )}`.trim();
    const specialty = getLocalizedField(doc.specialty);
    const location = getLocalizedField(doc.location);
    const about = getLocalizedField(doc.about);
    const description = getLocalizedField(doc.description);
    const position = getLocalizedField(doc.position);

    // Create tags from specialty
    const tags = [specialty];

    return {
      ...doc,
      id: doc.id || doc._id,
      name: fullName,
      firstName: doc.firstName,
      middleName: doc.middleName,
      lastName: doc.lastName,
      specialty,
      location: doc.location,
      about,
      description,
      position,
      tags: tags.filter((tag) => tag && tag.trim() !== ""),
      image: doc.imageUrl || "/default-doctor.jpg",
      experience: formatExperience(doc.yearOfExperience),
    };
  });

  const getCountryCodeFromLocation = (location) => {
    if (!location) return null;

    const loc = location.toLowerCase();

    if (loc.includes("russia") || loc.includes("россия")) return "RU";
    if (loc.includes("israel") || loc.includes("израиль")) return "IL";
    if (loc.includes("germany") || loc.includes("германия")) return "DE";
    if (loc.includes("usa") || loc.includes("united states")) return "US";

    return null; // fallback
  };

  // Loading state
  if (loading && doctors.length === 0) {
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
      className="w-full py-6 flex flex-col items-start max-w-[87rem] px-4 mx-auto"
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
              className=" w-full md:min-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t via-30% md:bg-gradient-to-l from-[#5279be] via-[#5279be]/40 to-transparent`}
            ></div>
          </div>
        </div>
        <div className=" w-full md:min-h-96 h-full p-6 pb-16 md:p-6  bg-gradient-to-t md:bg-gradient-to-l from-[#27407f] to-[#5279be]">
          <h2 className="text-white relative z-40 heading1 leading-10 font-bold mb-4">
            {t("doctors.title1")}
          </h2>
          <p
            className="base-text relative z-40 text-white"
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
              <label className="small-text font-medium text-brand1 block mb-2">
                {t("doctors.filter.consultType")}
              </label>
              <div className="flex small-text gap-3">
                {[
                  { label: t("doctors.filter.all"), value: "All" },
                  { label: t("doctors.filter.personal"), value: "Personal" },
                  { label: t("doctors.filter.remote"), value: "Remote" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setType(item.value)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-all ${
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
              <label className="small-text font-medium text-brand1 block mb-2">
                {t("doctors.filter.specialization")}
              </label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full border border-brand4/40 rounded-lg px-3 py-2.5 small-text text-brand1 outline-none focus:border-brand1 transition-all bg-white"
              >
                <option value="All">
                  {t("doctors.filter.all") || "All Specializations"}
                </option>
                {specializations.map((opt) => (
                  <option key={opt.uniqueKey} value={opt.id}>
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
      {cards.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 2 },
          }}
          className="w-full h-full overflow-visible mt-2"
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
        >
          {[...cards].reverse().map((doc) => (
            <SwiperSlide key={doc.id}>
              <div className="bg-white my-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col md:flex-row gap-4 items-start h-full">
                {/* LEFT COLUMN: IMAGE */}
                <div className="relative w-full md:w-68 lg:w-56 h-full md:h-68 lg:h-56 xl:h-68 xl:w-68 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={doc.imageUrl || "/doctors.png"}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Country Flag */}
                  {getCountryCodeFromLocation(
                    getLocalizedField(doc.location)
                  ) && (
                    <div className="absolute top-2 right-2 bg-white rounded-full shadow ">
                      <ReactCountryFlag
                        countryCode={getCountryCodeFromLocation(
                          getLocalizedField(doc.location)
                        )}
                        svg
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  )}

                  {/* Experience Badge */}
                  {doc.yearOfExperience && (
                    <div className="absolute bottom-2 right-2 font-semibold bg-white base-text px-2 py-1 rounded-md shadow">
                      Стаж {doc.yearOfExperience} лет
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col justify-between min-h-68 lg:min-h-auto xl:min-h-68 flex-1">
                  {/* NAME */}
                  <div>
                    <div className="font-bold text-black subheading  mb-1 leading-tight">
                      {getLocalizedField(doc.lastName).toUpperCase()}
                      <br />
                      {getLocalizedField(doc.firstName)}{" "}
                      {getLocalizedField(doc.middleName)}
                    </div>

                    <div className="flex flex-wrap gap-1 my-2">
                      {" "}
                      {doc.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full border border-brand4 text-black small-text truncate max-w-full"
                          title={tag}
                        >
                          {" "}
                          {tag}{" "}
                        </span>
                      ))}{" "}
                      {doc.tags.length > 3 && (
                        <span className="px-2 py-1 rounded-full border border-brand4 text-black small-text">
                          {" "}
                          +{doc.tags.length - 3}{" "}
                        </span>
                      )}{" "}
                    </div>

                    {doc.description && (
                      <p
                        className="text-brand1 small-text mb-2 min-h-[2.5rem] lg:line-clamp-2 leading-tight line-clamp-4 xl:line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: doc.description }}
                      ></p>
                    )}
                  </div>
                  <div className="mt-auto space-y-2">
                    {" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowPopup(true);
                      }}
                      className="w-full px-6 py-2.5 border text-sm border-brand1 bg-brand1 hover:bg-brand5/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand1/30 text-center cursor-pointer"
                    >
                      {" "}
                      {t("doctors.btn1")}{" "}
                    </button>{" "}
                    <Link
                      to={`/doctors/${doc.id}`}
                      className="w-full px-6 py-2.5 text-sm border bg-white border-brand1 hover:bg-brand1 text-brand1 hover:text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand1/30 text-center cursor-pointer block"
                    >
                      {" "}
                      {t("doctors.btn2")}{" "}
                    </Link>{" "}
                  </div>
                </div>
              </div>
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
                {t("doctors.notFound")}
              </h3>
              <button
                onClick={() => {
                  setType("All");
                  setSpecialization("All");
                  setSearchTerm("");
                }}
                className="px-6 py-2 bg-brand1 text-white rounded-lg hover:bg-brand5/90 transition-colors font-medium"
              >
                {t("doctors.resetFilters")}
              </button>
            </div>
          </div>
        )
      )}

      <div className="w-full mt-10 flex justify-center">
        <Link
          to={"/doctors"}
          className="bg-brand1 relative z-40 text-white font-semibold rounded-lg px-8 py-2.5 base-text shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 w-fit"
        >
          {t("moreBtn")}
        </Link>
      </div>
    </section>
  );
};

export default DoctorsSection;
