// pages/ExpertConsultations.jsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import WaveBackground from "../components/WaveBackground";
import { Link } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";
const ExpertConsultations = ({ branch, setShowPopup }) => {
  const { t, i18n } = useTranslation(); // Use existing services namespace
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchExperts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();

        params.append("language", i18n.language);
        params.append("page", "1");
        params.append("limit", "50");
        params.append("expert", "true");

        if (branch) params.append("branch", branch);
        const response = await fetch(
          `${API_BASE}/api/website/doctors?${params}`
        );
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

    fetchExperts();
  }, []);

  const getLocalizedField = (field, fallback = "") => {
    if (!field) return fallback;
    return field[i18n.language] || field.en || field.ru || fallback;
  };

  // Prepare doctor cards for display from backend data
  const cards = experts
    .filter((doc) => doc.expert === true) // Add this filter
    .map((doc) => {
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
    <div className=" min-h-screen pb-16 pt-10  mx-auto px-4 bg-gradient-to-r from-[#4c5165]/20 to-[#c1c7db/20 ">
      {/* HERO GRADIENT */}
      <section className="relative rounded-xl max-w-[87rem] mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
        <WaveBackground
          stroke="rgba(51, 186, 189,"
          custStyle="md:w-1/2 h-1/2 left-0 top-0"
        />

        {/* Rest of your content */}
        <div
          className="w-full md:min-h-96 flex flex-col justify-center h-full p-6 pb-16 md:p-6 lg:p-10 xl:p-12"
          style={{
            background: `linear-gradient(${
              isMobile ? "to bottom" : "to right"
            }, #4c5165, #c1c7db`,
          }}
        >
          <h1 className="text-white z-40 heading1 leading-10 font-bold mb-8">
            {t("expertConsult.hero.headline")}
          </h1>
          {/* <p className="text-white text-lg md:text-2xl mb-6 drop-shadow">
            {service.subtitle && t(service.subtitle)}
          </p> */}
        </div>

        <div className="w-full   h-full z-30 -mt-[1px] md:-mt-0">
          <div className="relative w-full  h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://www.shutterstock.com/shutterstock/videos/3653239365/preview/stock-footage-female-doctor-or-nurse-holds-a-medical-appointment-with-a-patient-in-a-hospital-office-visit-the.webm"
              className=" w-full md:min-h-96 lg:max-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
            ></video>
            <div
              className="absolute md:rounded-tr-2xl md:rounded-br-2xl inset-0"
              style={{
                background: `linear-gradient(${
                  isMobile ? "to bottom" : "to right"
                }, #c1c7db, 
                  #c1c7db66 30%, transparent 100%)`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* TEXT SECTIONS */}
      <main className="max-w-[87rem] mx-auto mt-10">
        <div className="bg-white rounded-2xl shadow p-8 base-text space-y-12">
          <section className="bg-white rounded-2xl border border-[#f3eee7] p-6 md:p-8 shadow-lg">
            <h2
              className="subheading font-semibold mb-4"
              style={{ color: "var(--color-brand1)" }}
            >
              {t("expertConsult.section1Title")}
            </h2>
            <p className="base-text text-gray-700">
              {t("expertConsult.section1Text")}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-[#f3eee7] p-6 md:p-8 shadow-lg">
            <h2
              className="subheading font-semibold mb-4"
              style={{ color: "var(--color-brand1)" }}
            >
              {t("expertConsult.section2Title")}
            </h2>
            <p className="base-text text-gray-700">
              {t("expertConsult.section2Text")}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-[#f3eee7] p-6 md:p-8 shadow-lg">
            <h2
              className="subheading font-semibold mb-4"
              style={{ color: "var(--color-brand1)" }}
            >
              {t("expertConsult.section3Title")}
            </h2>
            <p
              className="base-text text-gray-700"
              dangerouslySetInnerHTML={{
                __html: t("expertConsult.section3Text"),
              }}
            ></p>
          </section>

          {/* EXPERTS LIST */}
          <section className="">
            {loading && (
              <p className="small-text text-gray-500">Loading experts…</p>
            )}
            {error && !loading && (
              <p className="small-text text-red-600">{error}</p>
            )}
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
                    No doctors found
                  </h3>
                  <p className="text-brand1/70 mb-6">
                    No doctors match your current filters. Try adjusting your
                    search criteria.
                  </p>
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
                    <Link
                      to={`/doctors/${doc.id}`}
                      className="flex-1 flex flex-col"
                    >
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

                        {/* Rating 
                  {doc.reviewStats && doc.reviewStats.averageRating > 0 && (
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {"★".repeat(Math.floor(doc.reviewStats.averageRating))}
                        {"☆".repeat(
                          5 - Math.floor(doc.reviewStats.averageRating)
                        )}
                      </div>
                      <span className="small-text text-brand1/70">
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
        </div>
      </main>
    </div>
  );
};

export default ExpertConsultations;
