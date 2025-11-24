import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaSpinner,
  FaVideo,
  FaUser,
  FaMapMarkerAlt,
  FaUserMd,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import WaveBackground from "../components/WaveBackground";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";

const DoctorsPage = ({ setShowPopup }) => {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState("All");
  const [specialization, setSpecialization] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatSpecializationsList = (specString = "") => {
    const formatted = specString
      .split(",") // split by comma
      .map((s) => s.trim()) // remove spaces
      .filter(Boolean) // remove empty items
      .map((s) => {
        // Capitalize first letter of each word, but preserve existing capitalization for proper nouns
        return s
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      })
      .filter((s, i, arr) => arr.indexOf(s) === i); // remove duplicates

    return formatted;
  };

  // Fetch doctors data from backend
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (type !== "All") params.append("type", type);
      if (specialization !== "All") {
        // Pass the specialization label directly to backend
        params.append("specialization", specialization);
      }
      if (searchTerm) params.append("search", searchTerm);
      params.append("language", i18n.language);
      params.append("page", "1");
      params.append("limit", "50");

      const response = await fetch(`${API_BASE}/api/website/doctors?${params}`);
      if (!response.ok) throw new Error("Failed to fetch doctors");

      const result = await response.json();

      if (result.success) {
        setDoctors(result.data);
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
        // First, collect all unique labels and map them to their original data
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
            // Store the original item to calculate count later
            labelMap.get(label).originalItems.push(item);
          });
        });

        // Now fetch the actual count for each unique specialization
        const specializationsWithCount = await Promise.all(
          Array.from(labelMap.values()).map(async (spec) => {
            try {
              // Fetch doctors count for this specific specialization
              const params = new URLSearchParams();
              params.append("specialization", spec.id);
              params.append("language", i18n.language);
              params.append("page", "1");
              params.append("limit", "1"); // We only need the count

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
      lastName: doc.lastName,
      middleName: doc.middleName,
      specialty,
      location,
      about,
      position,
      tags: tags.filter((tag) => tag && tag.trim() !== ""),
      languages,
      // Use the imageUrl from backend which now contains base64 data from GridFS
      image: doc.imageUrl || "/default-doctor.jpg",
      profilePicture: doc.profilePicture, // Raw base64 data if needed
      reviewStats: doc.reviewStats,
      fees: `${doc.feesAmount} ${doc.currency}`,
      services: doc.services,
    };
  });

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const hashKey = location.hash.replace("#", "");
      // Check if hash matches any specialization label
      const specExists = specializations.some((s) => s.id === hashKey);
      if (specExists) setSpecialization(hashKey);
    }
  }, [location.hash, specializations]);

  // Loading state
  if (loading && doctors.length === 0) {
    return (
      <section className="w-full py-12 flex justify-center items-center min-h-96">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-brand1 mx-auto mb-4" />
          <p className="text-brand1 text-lg">Loading doctors...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error && doctors.length === 0) {
    return (
      <section className="w-full py-12 flex justify-center items-center min-h-96">
        <div className="text-center text-red-600">
          <p className="mb-4">Error loading doctors: {error}</p>
          <button
            onClick={fetchDoctors}
            className="px-6 py-2 bg-brand1 text-white rounded-lg hover:bg-brand5/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="doctors"
      className="w-full py-12 flex flex-col items-start max-w-[87rem] px-4 mx-auto"
    >
      {/* Header Section */}
      <section className="relative w-full rounded-xl mb-12 mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
        <WaveBackground
          stroke="rgba(150, 150, 150,"
          custStyle="md:w-1/2 h-1/2 left-0 top-0"
        />
        <div className="w-full md:min-h-80 flex flex-col justify-center h-full p-6 pb-16 md:p-6 lg:p-10 xl:p-12 bg-gradient-to-b md:bg-gradient-to-r from-[#362d29] to-[#6f6763]">
          {/* Fixed: Using FaUserMd instead of FaUserDoctor */}
          <FaUserMd className="text-white relative z-40 text-5xl mb-4 drop-shadow-lg" />
          <h1 className="text-white relative z-40 text-4xl md:text-5xl xl:text-6xl font-bold mb-4">
            {t("doctors.title") || "Our Doctors"}
          </h1>
          <p
            className="text-white/90 relative z-40 "
            dangerouslySetInnerHTML={{ __html: t("doctors.subtitle") }}
          ></p>
        </div>
        <div className="w-full h-full z-30 -mt-[1px] md:-mt-0">
          <div className="relative w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://www.shutterstock.com/shutterstock/videos/1072064371/preview/stock-footage-close-up-hands-of-therapist-gp-and-patient-doctor-strokes-arm-of-ill-woman-consoling-after-news.webm"
              alt="Services illustration"
              className="max-w-2xl w-full md:min-h-96 max-h-[31rem] h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b via-30% md:bg-gradient-to-r from-[#6f6763] via-[#6f6763]/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="w-full space-y-6 mb-8">
        {/* Search Bar */}
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder={
                t("doctors.searchPlaceholder") ||
                "Search doctors by name, specialty, or location..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-brand4/40 focus:border-brand1 focus:outline-none focus:ring-2 focus:ring-brand1/20 transition-all bg-white"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand4">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="w-full bg-white border border-brand4/30 rounded-xl shadow-sm">
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
                  {t("doctors.filter.consultType") || "Type of Consultation"}
                </label>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { label: t("doctors.filter.all") || "All", value: "All" },
                    {
                      label: t("doctors.filter.personal") || "In-Person",
                      value: "Personal",
                    },
                    {
                      label: t("doctors.filter.remote") || "Remote",
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
                  {t("doctors.filter.specialization") || "Specialization"}
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
                    <option key={opt.uniqueKey} value={opt.id}>
                      {opt.label} {opt.count && `(${opt.count})`}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Results Count and Loading */}
      <div className="w-full mb-6">
        {!loading && (
          <p className="text-brand1/70 text-sm">
            {cards.length === 0
              ? "No doctors found"
              : cards.length === 1
              ? "Found 1 doctor"
              : `Found ${cards.length} doctors`}
          </p>
        )}
        {loading && doctors.length > 0 && (
          <div className="flex items-center text-brand1 text-sm">
            <FaSpinner className="animate-spin mr-2" />
            <span>Updating results...</span>
          </div>
        )}
      </div>

      {/* Doctors Grid */}
      {cards.length === 0 && !loading ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {[...cards].reverse().map((doc) => (
            <Link
              key={doc.id}
              to={`/doctors/${doc.id}`}
              className="bg-white rounded-2xl shadow-2xl hover:scale-105 hover:bg-brand4/20 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] cursor-pointer transition-all duration-300 p-6 flex flex-col justify-between group mt-4"
            >
              {" "}
              <div className="flex-1 flex flex-col">
                {/* Doctor Image with GridFS data */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300 bg-gray-100"
                    onError={(e) => {
                      e.target.src = "/doctors.png";
                      e.target.className =
                        "w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300 bg-gray-200";
                    }}
                  />

                  {/* Service Type Badges - Glass Effect with React Icons 
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {doc.services?.online && (
                      <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md bg-black/20 border border-white/30 shadow-lg">
                        <FaVideo className="text-white text-xs" />
                        <span className="text-white text-xs font-semibold">
                          Remote
                        </span>
                      </div>
                    )}
                    {doc.services?.offline && (
                      <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md bg-black/20 border border-white/30 shadow-lg">
                        <FaUser className="text-white text-xs" />
                        <span className="text-white text-xs font-semibold">
                          In-Person
                        </span>
                      </div>
                    )}
                  </div>
                  */}
                </div>

                {/* Doctor Information */}
                <div className="flex-1">
                  <h3 className="font-bold text-black text-xl mb-2 line-clamp-2 leading-tight">
                    <span className="uppercase">
                      {" "}
                      {doc.lastName[i18n.language]}
                    </span>{" "}
                    {doc.firstName[i18n.language]}{" "}
                    {doc.middleName[i18n.language]}
                  </h3>

                  {/* Position */}
                  {doc.position && (
                    <p className="text-brand1 text-sm font-medium mb-3">
                      {doc.position}
                    </p>
                  )}

                  {/* Rating 
                  {doc.reviewStats && doc.reviewStats.averageRating > 0 && (
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {"★".repeat(Math.floor(doc.reviewStats.averageRating))}
                        {"☆".repeat(
                          5 - Math.floor(doc.reviewStats.averageRating)
                        )}
                      </div>
                      <span className="text-sm text-brand1/70">
                        ({doc.reviewStats.totalReviews} review
                        {doc.reviewStats.totalReviews !== 1 ? "s" : ""})
                      </span>
                    </div>
                  )}
                    

                  {/* Specialties  */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {doc.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full border border-brand4 text-black text-xs bg-brand4/10 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {doc.tags.length > 3 && (
                      <span className="px-2 py-1 rounded-full border border-brand4 text-black text-xs bg-brand4/10">
                        +{doc.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* View Profile Button */}
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
          ))}
        </div>
      )}

      {/* Load More Button (for future pagination) */}
      {cards.length > 0 && !loading && (
        <div className="w-full text-center mt-8">
          <button
            onClick={fetchDoctors}
            className="px-6 py-2 border border-brand1 text-brand1 rounded-lg hover:bg-brand1 hover:text-white transition-colors font-medium"
          >
            Load More Doctors
          </button>
        </div>
      )}
    </section>
  );
};

export default DoctorsPage;
