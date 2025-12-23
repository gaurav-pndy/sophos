// pages/ExpertConsultations.jsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";
const Specialists = ({ branch, setShowPopup }) => {
  const { t, i18n } = useTranslation(); // Use existing services namespace
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [type, setType] = useState("All");
  const [specialization, setSpecialization] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [specializations, setSpecializations] = useState([]);

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

  const fetchExperts = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();

      if (type !== "All") params.append("type", type);
      if (specialization !== "All") {
        params.append("specialization", specialization);
      }
      if (searchTerm) params.append("search", searchTerm);

      params.append("language", i18n.language);
      params.append("page", "1");
      params.append("limit", "50");

      if (branch) params.append("branch", branch);
      const response = await fetch(`${API_BASE}/api/website/doctors?${params}`);
      if (!response.ok) throw new Error("Failed to fetch doctors");

      const result = await response.json();
      console.log(result);

      setExperts(result.data || []);
      console.log("experts", result);
    } catch (err) {
      console.error(err);
      setError("Failed to load experts.");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchExperts();
    fetchSpecializations();
  }, [i18n.language]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchExperts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [type, specialization, searchTerm, i18n.language]);

  const getLocalizedField = (field, fallback = "") => {
    if (!field) return fallback;
    return field[i18n.language] || field.en || field.ru || fallback;
  };

  // Prepare doctor cards for display from backend data
  const cards = experts.map((doc) => {
    const fullName = `${getLocalizedField(doc.firstName)} ${getLocalizedField(
      doc.lastName
    )}`.trim();
    const specialty = getLocalizedField(doc.specialty);
    const location = getLocalizedField(doc.location);
    const about = getLocalizedField(doc.about);
    const position = getLocalizedField(doc.position);

    // Create tags from specialty and subSpecialties
    const tags = [specialty];

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

  return (
    <section className="">
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
                  {
                    label: t("doctors.filter.personal"),
                    value: "Personal",
                  },
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
      {loading && (
        <div className="w-full flex justify-center py-8">
          <FaSpinner className="animate-spin text-brand1 text-xl" />
        </div>
      )}
      {error && !loading && <p className="small-text text-red-600">{error}</p>}
      {!loading && !error && experts.length === 0 && (
        <p className="small-text text-gray-500">
          {t("expertConsult.expertsEmpty")}
        </p>
      )}

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
              {t("doctors.notFound")}
            </h3>
            <p className="text-brand1/70 mb-6">{t("doctors.notFoundDesc")}</p>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {[...cards].reverse().map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl shadow-2xl hover:scale-105 hover:bg-brand4/20 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] cursor-pointer transition-all duration-300 p-6 flex flex-col justify-between group mt-4"
            >
              {" "}
              <Link to={`/doctors/${doc.id}`} className="flex-1 flex flex-col">
                {/* Doctor Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/doctors.png";
                      e.target.className =
                        "w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300 bg-gray-200";
                    }}
                  />
                </div>

                {/* Doctor Information */}
                <div className="flex-1">
                  <h3 className="font-bold text-black subheading mb-2 line-clamp-2 leading-tight">
                    <span className="uppercase">
                      {" "}
                      {doc.lastName[i18n.language]}
                    </span>{" "}
                    {doc.firstName[i18n.language]}{" "}
                    {doc.middleName[i18n.language]}
                  </h3>

                  {/* Position */}
                  {doc.position && (
                    <p className="text-brand1 small-text font-medium mb-3">
                      {doc.position}
                    </p>
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
              </Link>
              {/* View Profile Button */}
              <button
                onClick={(e) => {
                  setShowPopup(true);
                }}
                className="mt-4 px-6 py-2.5 w-full border border-brand1 bg-brand1 hover:bg-brand5/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand1/30 text-center cursor-pointer base-text"
              >
                {t("doctors.btn1")}
              </button>
              <Link
                to={`/doctors/${doc.id}`}
                className="mt-2 px-6 py-2.5 w-full border bg-white border-brand1 hover:bg-brand1 text-brand1 hover:text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand1/30 text-center cursor-pointer base-text"
              >
                {t("doctors.btn2")}
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Specialists;
