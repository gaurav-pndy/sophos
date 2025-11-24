import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaMapMarkerAlt,
  FaLanguage,
  FaStar,
  FaUserTie,
  FaAward,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaSpinner,
  FaVideo,
  FaUser,
  FaClinicMedical,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { GiDiploma } from "react-icons/gi";

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";


const DoctorDetails = ({ setShowPopup }) => {
  const { doctorId } = useParams();
  const { t, i18n } = useTranslation();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState();

  // Fetch doctor data from backend
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/website/doctors/${doctorId}`);

        if (!response.ok) throw new Error("Failed to fetch doctor");

        const result = await response.json();

        if (result.success) {
          setDoctor(result.data);
          console.log(result.data);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  // Helper function to get localized field from backend data
  const getLocalizedField = (field, fallback = "") => {
    if (!field) return fallback;
    return field[i18n.language] || field.en || field.ru || fallback;
  };

  // Format doctor data for display
  const formatDoctorData = (doc) => {
    if (!doc) return null;

    const fullName = `${getLocalizedField(doc.firstName)} ${getLocalizedField(
      doc.lastName
    )} ${getLocalizedField(
      doc.middleName
    )}`.trim();
    const specialty = getLocalizedField(doc.specialty);
    const location = getLocalizedField(doc.location);
    const about = getLocalizedField(doc.about);
    const position = getLocalizedField(doc.position);
    const workExperience = getLocalizedField(doc.workExperience);
    const education = getLocalizedField(doc.education);
    const advancedTraining = getLocalizedField(doc.advancedTraining);
    const scientificActivities = getLocalizedField(doc.scientificActivities);
    const internationalMemberships = getLocalizedField(
      doc.internationalMemberships
    );
    const russianMemberships = getLocalizedField(doc.russianMemberships);
    const professionalDevelopments= getLocalizedField(doc.professionalDevelopments);
    const awards = getLocalizedField(doc.awards);
    const regalia = getLocalizedField(doc.regalia);

    // Get branches
    const branches = doc.branches
      ? doc.branches
          .map((branch) => getLocalizedField(branch))
          .filter(Boolean)
          .join(", ")
      : "";

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
      id: doc.id || doc._id,
      name: fullName,
      firstName: doc.firstName,
      lastName: doc.lastName,
      middleName: doc.middleName,
      specialty,
      location,
      branches,
      about,
      position,
      workExperience,
      education,
      advancedTraining,
      scientificActivities,
      internationalMemberships,
      russianMemberships,
      professionalDevelopments,
      awards,
      regalia,
      tags: tags.filter((tag) => tag && tag.trim() !== ""),
      languages,
      image: doc.imageUrl || doc.photo || "/default-doctor.jpg",
      profilePicture: doc.profilePicture,
      reviewStats: doc.reviewStats,
      fees: `${doc.feesAmount} ${doc.currency}`,
      services: doc.services,
      reviews: doc.reviews || [],
      videoUrl: doc.videoUrl || [],
    };
  };

  const formattedDoctor = doctor ? formatDoctorData(doctor) : null;

  console.log(formattedDoctor);

  const TAB_LIST = [
    { key: "about", labelKey: "doctors.tabs.tab1" },
    { key: "experience", labelKey: "doctors.tabs.tab2" },
    { key: "activities", labelKey: "doctors.tabs.tab3" },
    { key: "reviews", labelKey: "doctors.tabs.tab4" },
    { key: "video", labelKey: "doctors.tabs.tab5" },
  ];

  const sectionRefs = {
    about: useRef(null),
    experience: useRef(null),
    activities: useRef(null),
    reviews: useRef(null),
    video: useRef(null),
  };

  // Scroll to section
  const handleTabClick = (key) => {
    const target = sectionRefs[key]?.current;
    if (target) {
      const topOffset =
        target.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  // Custom CSS for rich text content
  const richTextStyles = `
    .prose ul { 
      list-style-type: disc; 
      margin-left: 1.5rem; 
      margin-bottom: 1rem;
    }
    .prose ol { 
      list-style-type: decimal; 
      margin-left: 1.5rem; 
      margin-bottom: 1rem;
    }
    .prose li { 
      margin-bottom: 0.5rem; 
      line-height: 1.6;
    }
    .prose strong { 
      font-weight: 600; 
      color: #125e84;
    }
    .prose em { 
      font-style: italic; 
      color: #666;
    }
    .prose h2 { 
      font-size: 1.5rem; 
      font-weight: 600; 
      color: #125e84; 
      margin-top: 1.5rem; 
      margin-bottom: 1rem;
    }
    .prose h3 { 
      font-size: 1.25rem; 
      font-weight: 600; 
      color: #33babd; 
      margin-top: 1.25rem; 
      margin-bottom: 0.75rem;
    }
    .prose p { 
      margin-bottom: 1rem; 
      line-height: 1.6;
    }
    .prose a { 
      color: #33babd; 
      text-decoration: underline;
    }
    .prose blockquote {
      border-left: 4px solid #33babd;
      padding-left: 1rem;
      margin-left: 0;
      font-style: italic;
      color: #666;
    }
  `;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-brand4/10 py-12 flex justify-center items-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-brand1 mx-auto mb-4" />
          <p className="text-brand1 text-lg">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !formattedDoctor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-brand4/10 py-12 flex justify-center items-center">
        <div className="text-center text-red-600">
          <p className="mb-4">Error loading doctor profile: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-brand1 text-white rounded-lg hover:bg-brand5/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand4/10 py-12">
      {/* Inject custom styles for rich text content */}
      <style dangerouslySetInnerHTML={{ __html: richTextStyles }} />

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Sticky/fixed doctor card */}
        <aside className="md:w-80 flex-shrink-0 mb-8 md:mb-0">
          <div className="md:sticky md:top-48 flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-xl border border-brand4/10 overflow-hidden mb-6 w-full relative">
              <img
                src={formattedDoctor.image}
                alt={formattedDoctor.name}
                className="w-full h-full object-cover aspect-square rounded-2xl"
                onError={(e) => {
                  e.target.src = "/doctors.png";
                  e.target.className =
                    "w-full h-full object-cover aspect-square rounded-2xl bg-gray-200";
                }}
              />
            </div>

            {/* Rating */}
            {formattedDoctor.reviewStats &&
              formattedDoctor.reviewStats.averageRating > 0 && (
                <div className="flex items-center justify-center mb-4 w-full bg-white rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {"★".repeat(
                        Math.floor(formattedDoctor.reviewStats.averageRating)
                      )}
                      {"☆".repeat(
                        5 -
                          Math.floor(formattedDoctor.reviewStats.averageRating)
                      )}
                    </div>
                    <span className="text-brand1 font-semibold">
                      {formattedDoctor.reviewStats.averageRating.toFixed(1)}
                    </span>
                    <span className="text-brand1/70 text-sm">
                      ({formattedDoctor.reviewStats.totalReviews} review
                      {formattedDoctor.reviewStats.totalReviews !== 1
                        ? "s"
                        : ""}
                      )
                    </span>
                  </div>
                </div>
              )}

            <button
              onClick={() => setShowPopup(true)}
              className="w-full bg-brand1 text-white rounded-2xl py-3 font-semibold text-lg mb-2 hover:bg-brand5 transition-all shadow"
            >
              {t("doctors.bookAppt")}
            </button>
            <button className="w-full border-2 border-brand1 text-brand1 rounded-2xl py-3 font-semibold text-lg bg-white hover:bg-brand4/10 transition-all shadow">
              {t("doctors.onlineConsult")}
            </button>
          </div>
        </aside>

        {/* Scrollable doctor details */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-3xl shadow-xl border border-brand4/10 px-6 md:px-10 py-8">
            <div className="flex">
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-brand1 mb-4">
                <span className="uppercase">
                  {" "}
                  {formattedDoctor.lastName[i18n.language]}
                </span>{" "}
                {formattedDoctor.firstName[i18n.language]}{" "}
                {formattedDoctor.middleName[i18n.language]}
              </h1>
              <p className="flex-1 text-right whitespace-nowrap text-brand1/80 text-lg font-semibold">
                {formattedDoctor.reviews.length} {t("doctors.reviews")}
              </p>
            </div>

            {/* Position */}
            {formattedDoctor.position && (
              <p className="text-brand1 text-xl font-medium mb-4">
                {formattedDoctor.position}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {formattedDoctor.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-brand4/20 text-brand1 rounded-full text-base font-semibold border border-brand4/30"
                >
                  {tag}
                </span>
              ))}
              <span className="px-4 py-1.5 bg-brand4/20 text-brand1 rounded-full text-base font-semibold border border-brand4/30">
                {t("doctors.experience")} :{" "}
                {doctor.yearOfExperience ? doctor.yearOfExperience : "N/A"}
              </span>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-3xl shadow-xl border border-brand4/10 px-6 md:px-10 py-8">
            {/* Tab navigation */}
            <nav className="flex gap-6 mb-5 overflow-x-auto scrollbar-none px-2">
              {TAB_LIST.map((tab) => (
                <button
                  key={tab.key}
                  className="font-semibold text-brand1 px-1 pb-2 border-b-2 border-transparent hover:border-brand1 transition whitespace-nowrap hover:text-brand1 focus:outline-none uppercase text-sm cursor-pointer"
                  onClick={() => handleTabClick(tab.key)}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </nav>

            {/* About Section */}
            <section ref={sectionRefs.about} className="pt-2 pb-6 scroll-mt-28">
              <h2 className="text-xl border-b pb-2 border-brand5 md:text-4xl font-semibold text-brand1 mb-10">
                {t("doctors.tabs.tab1")}
              </h2>
              <div className="text-gray-700">
                {formattedDoctor.about && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: formattedDoctor.about }}
                  />
                )}

                {/* Professional Memberships */}
                {(formattedDoctor.internationalMemberships ||
                  formattedDoctor.russianMemberships) && (
                  <div className="mt-8">
                    <h2 className="font-semibold flex items-center gap-2 md:gap-4 text-[1.6rem] mb-5 text-brand1">
                      <span className="bg-brand3 p-2.5 rounded-lg">
                        <FaUserTie className="shrink-0 text-2xl text-white" />
                      </span>{" "}
                      {t("doctors.membershipsTitle")}
                    </h2>

                    {formattedDoctor.internationalMemberships && (
                      <>
                        <h3 className="text-lg text-black font-semibold mb-2">
                          {t("doctors.international")}
                        </h3>
                        <div
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: formattedDoctor.internationalMemberships,
                          }}
                        />
                      </>
                    )}

                    {formattedDoctor.russianMemberships && (
                      <>
                        <h3 className="text-lg text-black font-semibold mb-2 mt-6">
                          {t("doctors.russian")}
                        </h3>
                        <div
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: formattedDoctor.russianMemberships,
                          }}
                        />
                      </>
                    )}
                  </div>
                )}

                {/* Awards */}
                {formattedDoctor.awards && (
                  <div className="mt-8">
                    <h2 className="font-semibold flex items-center gap-2 md:gap-4 text-[1.6rem] mb-5 text-brand1">
                      <span className="bg-brand3 p-2.5 rounded-lg">
                        <FaAward className="shrink-0 text-2xl text-white" />
                      </span>{" "}
                      {t("doctors.awardsTitle")}
                    </h2>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: formattedDoctor.awards,
                      }}
                    />
                  </div>
                )}

                {/* Regalia */}
                {formattedDoctor.regalia && (
                  <div className="mt-8">
                    <h2 className="font-semibold flex items-center gap-2 md:gap-4 text-[1.6rem] mb-5 text-brand1">
                      <span className="bg-brand3 p-2.5 rounded-lg">
                        <GiDiploma className="shrink-0 text-2xl text-white" />
                      </span>{" "}
                      {t("doctors.regaliaTitle")}
                    </h2>
                    <p>{formattedDoctor.regalia}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Experience & Education Section */}
            <section
              ref={sectionRefs.experience}
              className="pt-2 pb-6 scroll-mt-28 mt-16"
            >
              <h2 className="text-xl border-b pb-2 border-brand5 md:text-4xl font-semibold text-brand1 mb-10">
                {t("doctors.tabs.tab2")}
              </h2>
              <div className="text-gray-700">
                {formattedDoctor.workExperience && (
                  <div className="mb-8">
                    <h2 className="font-semibold flex items-center gap-2 md:gap-4 text-[1.6rem] mb-5 text-brand1">
                      <span className="bg-brand3 p-2.5 rounded-lg">
                        <MdWork className="shrink-0 text-2xl text-white" />
                      </span>{" "}
                      {t("doctors.expTitle")}
                    </h2>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: formattedDoctor.workExperience,
                      }}
                    />
                  </div>
                )}

                {formattedDoctor.education && (
                  <div className="mb-8">
                    <h2 className="font-semibold flex items-center gap-2 md:gap-4 text-[1.6rem] mb-5 text-brand1">
                      <span className="bg-brand3 p-2.5 rounded-lg">
                        <FaGraduationCap className="shrink-0 text-2xl text-white" />
                      </span>{" "}
                      {t("doctors.eduTitle")}
                    </h2>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: formattedDoctor.education,
                      }}
                    />
                  </div>
                )}

                {formattedDoctor.advancedTraining && (
                  <div className="mb-8">
                    <h2 className="font-semibold flex items-center gap-2 md:gap-4 text-[1.6rem] mb-5 text-brand1">
                      <span className="bg-brand3 p-2.5 rounded-lg">
                        <FaChalkboardTeacher className="shrink-0 text-2xl text-white" />
                      </span>{" "}
                      {t("doctors.advancedTrainingTitle")}
                    </h2>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: formattedDoctor.advancedTraining,
                      }}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Scientific Activities Section */}
            <section
              ref={sectionRefs.activities}
              className="pt-2 pb-6 scroll-mt-28 mt-16"
            >
              <h2 className="text-xl border-b pb-2 border-brand5 md:text-4xl font-semibold text-brand1 mb-10">
                {t("doctors.tabs.tab3")}
              </h2>
              {formattedDoctor.scientificActivities && (
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: formattedDoctor.scientificActivities,
                  }}
                />
              )}
            </section>


            {/*Professional Development Section */}
            <section
              ref={sectionRefs.professionalDevelopments}
              className="pt-2 pb-6 scroll-mt-28 mt-16"
            >
              <h2 className="text-xl border-b pb-2 border-brand5 md:text-4xl font-semibold text-brand1 mb-10">
                {t("doctors.tabs.tab6")}
              </h2>
              {formattedDoctor.professionalDevelopments && (
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: formattedDoctor.professionalDevelopments,
                  }}
                />
              )}
            </section>

            {/* Reviews Section 
            <section
              ref={sectionRefs.reviews}
              className="pt-2 pb-6 scroll-mt-28 mt-16"
            >
              <h2 className="text-xl border-b pb-2 border-brand5 md:text-4xl font-semibold text-brand1 mb-10">
                {t("doctors.tabs.tab4")}
              </h2>
              {formattedDoctor.reviews.length > 0 ? (
                <div className="space-y-6 mt-6">
                  {formattedDoctor.reviews.map((review, i) => {
                    const isExpanded = expanded === i;
                    return (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-brand1">
                            {review.patientName}
                          </h3>
                          {review.date && (
                            <p className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          {Array(5)
                            .fill(0)
                            .map((_, index) => (
                              <FaStar
                                key={index}
                                className={`text-lg ${
                                  index < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                        </div>

                        <p
                          className={`text-gray-700 leading-relaxed transition-all duration-300 ${
                            isExpanded ? "line-clamp-none" : "line-clamp-4"
                          }`}
                        >
                          {review.description}
                        </p>

                        {review.description &&
                          review.description.length > 200 && (
                            <button
                              onClick={() => setExpanded(isExpanded ? null : i)}
                              className="mt-2 cursor-pointer font-medium hover:underline focus:outline-none"
                            >
                              {isExpanded ? t("showLess") : t("readMore")}
                            </button>
                          )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {t("doctors.noReviews")}
                </p>
              )}
            </section>
            */}

            {/* Video Section */}
            <section
              ref={sectionRefs.video}
              className="pt-2 pb-2 scroll-mt-28 mt-16"
            >
              <h2 className="text-xl border-b pb-2 border-brand5 md:text-4xl font-semibold text-brand1 mb-10">
                {t("doctors.tabs.tab5")}
              </h2>
              {formattedDoctor.videoUrl &&
              formattedDoctor.videoUrl.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {formattedDoctor.videoUrl.map((video, i) => (
                    <div
                      key={i}
                      className="aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <iframe
                        src={video}
                        title={`Video ${i + 1}`}
                        allowFullScreen
                        className="w-full h-full border-none"
                      ></iframe>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {t("doctors.noVideos")}
                </p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDetails;
