import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaArrowRight,
  FaSpinner,
  FaExclamationTriangle,
  FaFilter,
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
  FaEye,
  FaHeadset,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaChevronDown,
  FaInfoCircle,
} from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://apimanager.health-direct.ru/api";

// Basic HTML sanitization function
const sanitizeHTML = (html) => {
  if (typeof html !== "string") return html || "";

  // Remove potentially dangerous tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/ on\w+="[^"]*"/g, "")
    .replace(/ on\w+='[^']*'/g, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/expression\(/gi, "")
    .trim();
};

const createMarkup = (html) => {
  return { __html: sanitizeHTML(html) };
};

// Update the getLocalizedText function in CareersPage component
// Helper function to get localized text (handles both strings and objects)
const getLocalizedText = (data) => {
  if (!data) return "";

  // If it's already a string (localized data from API)
  if (typeof data === "string") return data;

  // If it's a multilingual object (like otherEmploymentType)
  if (typeof data === "object") {
    // Get the value for the current language
    const value = data[i18n.language] || data.en || data.ru || "";
    return typeof value === "string" ? value : String(value);
  }

  return "";
};

const CareersPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationLoading, setApplicationLoading] = useState(false);
  const [applicationError, setApplicationError] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [filters, setFilters] = useState({
    department: "",
    employmentType: "",
  });
  const [showVacancyDetails, setShowVacancyDetails] = useState(false);
  const [selectedVacancyForDetails, setSelectedVacancyForDetails] =
    useState(null);

  const { t, i18n } = useTranslation();

  // Check URL hash on component mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#vacancy-")) {
      const vacancyId = hash.replace("#vacancy-", "");
      // You might want to fetch the specific vacancy here
      console.log("Should show vacancy with ID:", vacancyId);
    }
  }, []);

  // Update URL hash when showing vacancy details
  useEffect(() => {
    if (showVacancyDetails && selectedVacancyForDetails) {
      window.location.hash = `#vacancy-${selectedVacancyForDetails._id}`;
    } else if (!showVacancyDetails) {
      // Clear vacancy hash but keep #vacancies
      if (window.location.hash.includes("vacancy-")) {
        window.location.hash = "#vacancies";
      }
    }
  }, [showVacancyDetails, selectedVacancyForDetails]);

  // Handle browser back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#vacancies") {
        setShowVacancyDetails(false);
        setSelectedVacancyForDetails(null);
      } else if (hash.startsWith("#vacancy-")) {
        const vacancyId = hash.replace("#vacancy-", "");
        // Find and show the vacancy if we have it in state
        const vacancy = vacancies.find((v) => v._id === vacancyId);
        if (vacancy) {
          handleViewVacancyDetails(vacancy);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [vacancies]);

  // Auto-close success popup after 5 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  // Fetch published vacancies
  const fetchVacancies = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        status: "published",
        lang: i18n.language, // Pass current language to API
        ...filters,
      });

      const response = await fetch(`${API_BASE}/vacancies?${queryParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result.data);

      if (result.success) {
        setVacancies(result.data || []);
      } else {
        throw new Error(result.message || "Failed to fetch vacancies");
      }
    } catch (err) {
      console.error("Error fetching vacancies:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, [filters, i18n.language]); // Refetch when language changes

  // Check if vacancy is open for applications
  const isVacancyOpen = (vacancy) => {
    if (vacancy.status !== "published") return false;

    const isDeadlineValid =
      !vacancy.applicationDeadline ||
      new Date(vacancy.applicationDeadline) > new Date();
    return isDeadlineValid;
  };

  // Submit application with file upload
  const submitApplication = async (formData) => {
    try {
      setApplicationLoading(true);
      setApplicationError(null);
      setApplicationSuccess(false);

      // Create FormData object for file upload
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phoneNumber", formData.phoneNumber);
      submitData.append("agreedToTerms", formData.agreedToTerms.toString());

      // Add middle name if provided
      if (formData.middleName) {
        submitData.append("middleName", formData.middleName);
      }

      // Add resume file
      if (formData.resume) {
        submitData.append("resume", formData.resume);
      }

      const response = await fetch(
        `${API_BASE}/vacancies/${selectedVacancy._id}/apply`,
        {
          method: "POST",
          // Don't set Content-Type header - let browser set it with boundary
          body: submitData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      if (result.success) {
        setApplicationSuccess(true);
        setShowApplicationForm(false);
        setShowSuccessPopup(true);
        // Refresh vacancies to update application count
        fetchVacancies();
      } else {
        throw new Error(result.message || "Application submission failed");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      setApplicationError(err.message);
    } finally {
      setApplicationLoading(false);
    }
  };

  // Filter handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      department: "",
      employmentType: "",
    });
  };

  // View vacancy details
  const handleViewVacancyDetails = (vacancy) => {
    setSelectedVacancyForDetails(vacancy);
    setShowVacancyDetails(true);
    window.scrollTo(0, 0); // Scroll to top
  };

  // Close vacancy details
  const handleCloseVacancyDetails = () => {
    setShowVacancyDetails(false);
    setSelectedVacancyForDetails(null);
    window.location.hash = "#vacancies";
  };

  // Helper function to get localized text (handles both strings and objects)
  const getLocalizedText = (data) => {
    if (!data) return "";

    // If it's already a string (localized data from API)
    if (typeof data === "string") return data;

    // If it's a multilingual object
    if (typeof data === "object") {
      return data[i18n.language] || data.en || "";
    }

    return "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-brand1 mx-auto mb-4" />
            <p className="text-lg text-gray-600">
              {t("careersPage.loading", "Loading career opportunities...")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show vacancy details if selected
  if (showVacancyDetails && selectedVacancyForDetails) {
    return (
      <VacancyDetails
        vacancy={selectedVacancyForDetails}
        onClose={handleCloseVacancyDetails}
        onApply={(vacancy) => {
          setSelectedVacancy(vacancy);
          setShowApplicationForm(true);
        }}
        getLocalizedText={getLocalizedText}
        t={t}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t("careersPage.successTitle", "Application Submitted!")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t(
                "careersPage.successMessage",
                "Thank you for your application. We will review it and contact you soon."
              )}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-5000 ease-linear"
                style={{ width: "100%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {t(
                "careersPage.autoClose",
                "Closing automatically in 5 seconds..."
              )}
            </p>
          </div>
        </div>
      )}

      {/* Main Content - Vacancy Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <span className="font-semibold text-gray-700">
                {t("careersPage.filters", "Filters")}:
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={filters.department}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand1 focus:border-transparent"
              >
                <option value="">
                  {t("careersPage.allDepartments", "All Departments")}
                </option>
                <option value="medical">
                  {t("careersPage.medical", "Medical")}
                </option>
                <option value="nursing">
                  {t("careersPage.nursing", "Nursing")}
                </option>
                <option value="administrative">
                  {t("careersPage.administrative", "Administrative")}
                </option>
                <option value="technical">
                  {t("careersPage.technical", "Technical")}
                </option>
                <option value="support">
                  {t("careersPage.support", "Support")}
                </option>
              </select>

              <select
                value={filters.employmentType}
                onChange={(e) =>
                  handleFilterChange("employmentType", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand1 focus:border-transparent"
              >
                <option value="">
                  {t("careersPage.allTypes", "All Types")}
                </option>
                <option value="full-time">
                  {t("careersPage.fullTime", "Full Time")}
                </option>
                <option value="part-time">
                  {t("careersPage.partTime", "Part Time")}
                </option>
                <option value="contract">
                  {t("careersPage.contract", "Contract")}
                </option>
                <option value="internship">
                  {t("careersPage.internship", "Internship")}
                </option>
                <option value="remote">
                  {t("careersPage.remote", "Remote")}
                </option>
              </select>

              {(filters.department || filters.employmentType) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t("careersPage.clearFilters", "Clear Filters")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-red-500 text-xl" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-1">
                  {t("careersPage.errors.loading", "Error Loading Vacancies")}
                </h3>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchVacancies}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t("careersPage.tryAgain", "Try Again")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Vacancies Grid */}
        {vacancies.length > 0 ? (
          <div className="grid gap-6">
            {vacancies.map((vacancy) => (
              <VacancyCard
                key={vacancy._id}
                vacancy={vacancy}
                isOpen={isVacancyOpen(vacancy)}
                onApply={() => {
                  setSelectedVacancy(vacancy);
                  setShowApplicationForm(true);
                }}
                onViewDetails={() => handleViewVacancyDetails(vacancy)}
                getLocalizedText={getLocalizedText}
                t={t}
              />
            ))}
          </div>
        ) : (
          // No vacancies available
          <div className="text-center py-10">
            <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaBriefcase className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t("careersPage.noVacancies.title", "No Open Positions")}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {t(
                "careersPage.noVacancies.description",
                "There are no current job openings. Please check back later for new opportunities."
              )}
            </p>
            <button
              onClick={fetchVacancies}
              className="px-6 py-3 bg-brand1 text-white rounded-lg hover:bg-brand3 transition-colors"
            >
              {t("careersPage.refresh", "Refresh")}
            </button>
          </div>
        )}
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedVacancy && (
        <ApplicationForm
          vacancy={selectedVacancy}
          onSubmit={submitApplication}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedVacancy(null);
            setApplicationError(null);
            setApplicationSuccess(false);
          }}
          loading={applicationLoading}
          error={applicationError}
          success={applicationSuccess}
          t={t}
        />
      )}
    </div>
  );
};

// Update VacancyCard component to accept onViewDetails prop
const VacancyCard = ({
  vacancy,
  isOpen,
  onApply,
  onViewDetails,
  getLocalizedText,
  t,
}) => {
  // Get localized text from your data structure
  const getLocalizedValue = (field) => {
    if (!vacancy || !vacancy[field]) return "";

    if (typeof vacancy[field] === "string") {
      return vacancy[field];
    }

    if (typeof vacancy[field] === "object") {
      if (typeof getLocalizedText === "function") {
        return getLocalizedText(vacancy[field]);
      }
      return vacancy[field].en || vacancy[field].ru || "";
    }

    return String(vacancy[field] || "");
  };



  // Handle card click
  const handleCardClick = (e) => {
    // Don't trigger card click if clicking on apply button
    if (e.target.closest("button")) return;
    if (onViewDetails) onViewDetails(vacancy);
  };

  const isUrgent =
    vacancy.applicationDeadline &&
    new Date(vacancy.applicationDeadline) - new Date() <
      7 * 24 * 60 * 60 * 1000;

  const getStatusBadge = () => {
    if (!isOpen) {
      return (
        <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
          {t("careersPage.closed", "Closed")}
        </span>
      );
    }

    if (isUrgent) {
      return (
        <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
          {t("careersPage.urgent", "Urgent")}
        </span>
      );
    }

    return (
      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
        {t("careersPage.active", "Active")}
      </span>
    );
  };

  const getButtonText = () => {
    if (!isOpen) {
      return t("careersPage.closed", "Closed");
    }
    return t("careersPage.applyNow", "Apply Now");
  };

  const getButtonStyle = () => {
    if (!isOpen) {
      return "bg-gray-300 text-gray-500 cursor-not-allowed";
    }
    return "bg-brand1 text-white hover:bg-brand3 hover:shadow-lg transform hover:-translate-y-0.5";
  };

  // Check if position is open
  const checkIfOpen = () => {
    if (vacancy.status !== "published") return false;

    // Check deadline
    if (vacancy.applicationDeadline) {
      const deadline = new Date(vacancy.applicationDeadline);
      const now = new Date();
      return deadline > now;
    }

    return true;
  };

  const handleLearnMore = (e) => {
    e.stopPropagation();

    // Option 1: Use the provided onViewDetails callback
    if (onViewDetails) {
      onViewDetails(vacancy);
      return;
    }
  };

  const positionIsOpen = checkIfOpen();

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="subheading font-bold text-gray-900 mb-2 hover:text-brand1 transition-colors">
                  {getLocalizedValue("title")}
                </h3>
                <p className="flex items-center text-black-800 font-semibold mb-2">
  {vacancy.salary && typeof vacancy.salary === "object"
    ? vacancy.salary[i18n.language] || vacancy.salary.en || vacancy.salary.ru || ""
    : vacancy.salary || ""}
</p>
                <div className="flex flex-wrap gap-2 small-text text-gray-600">
                  <span className="flex items-center gap-1 bg-blue-100 text-black-800 px-3 py-1 rounded-full small-text font-semibold">
                    <FaMapMarkerAlt className="text-gray-400" />
                    {getLocalizedValue("location")}
                  </span>
                  <span className="flex items-center gap-1 bg-blue-100 text-black-800 px-3 py-1 rounded-full small-text font-semibold">
                    <FaClock className="text-gray-400" />
                    {vacancy.employmentType === "other"
                      ? getLocalizedValue("otherEmploymentType") ||
                        t("careersPage.other", "Other")
                      : vacancy.employmentType === "labor_agreement"
                      ? t("careersPage.laborAgreement", "Labor Agreement")
                      : vacancy.employmentType === "self_employment"
                      ? t("careersPage.selfEmployment", "Self Employment")
                      : vacancy.employmentType
                      ? t(
                          `careersPage.employmentTypes.${vacancy.employmentType}`,
                          vacancy.employmentType
                        )
                      : t("careersPage.fullTime", "Full-time")}
                  </span>
                  {vacancy.experienceLevel && (
                    <span className="flex items-center gap-1 bg-blue-100 text-black-800 px-3 py-1 rounded-full small-text font-semibold">
                      {vacancy.experienceLevel}
                    </span>
                  )}

                  {vacancy.department && (
                    <span className="flex items-center gap-1 bg-blue-100 text-black-800 px-3 py-1 rounded-full small-text font-semibold">
                      {vacancy.department}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 small-text text-gray-500">
                <span>
                  {t("careersPage.views", "Views")}: {vacancy.viewCount || 0}
                </span>
                <span>
                  {t("careersPage.applications", "Applications")}:{" "}
                  {vacancy.applicationCount || 0}
                </span>
                
              </div>

              <div className="flex items-center gap-3">
                {/* Apply button - only show if enabled AND position is open */}
                {vacancy.showApplyButton !== false && positionIsOpen && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApply();
                    }}
                    className={`px-6 py-2.5 base-text rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${getButtonStyle()}`}
                  >
                    {getButtonText()}
                    {positionIsOpen && <FaArrowRight className="text-sm" />}
                  </button>
                )}

                {/* Learn More button - shows when position is open but apply might not be available */}
                {positionIsOpen && (
                  <button
                    onClick={handleLearnMore}
                    className="px-5 py-2.5 base-text rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                  >
                    {t("careersPage.learnMore", "Learn More")}
                    <FaInfoCircle className="text-sm" />
                  </button>
                )}

                {/* If position is closed but showApplyButton is true, show disabled button */}
                {vacancy.showApplyButton !== false && !positionIsOpen && (
                  <button
                    disabled
                    onClick={(e) => e.stopPropagation()}
                    className="px-6 py-2.5 base-text rounded-lg font-semibold bg-gray-200 text-gray-500 cursor-not-allowed"
                  >
                    {t("careersPage.positionClosed", "Position Closed")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create VacancyDetails component with language change fix
const VacancyDetails = ({
  vacancy: initialVacancy,
  onClose,
  getLocalizedText,
  onApply,
  t,
}) => {
  // Add application form state within VacancyDetails
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationLoading, setApplicationLoading] = useState(false);
  const [applicationError, setApplicationError] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Add state for phone number input
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(null);
  const [phoneSuccess, setPhoneSuccess] = useState(false);

  // Track current vacancy data that updates with language
  const [currentVacancy, setCurrentVacancy] = useState(initialVacancy);

  // Get i18n instance to listen for language changes
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // FAQ section state
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // FAQ data
  const faqItems = [
    {
      question: t(
        "careersPage.faq.applicationProcess",
        "What is the application process?"
      ),
      answer: t(
        "careersPage.faq.applicationProcessAnswer",
        "Submit your application through our portal. Our HR team will review it within 5-7 business days and contact shortlisted candidates."
      ),
    },
    {
      question: t(
        "careersPage.faq.responseTime",
        "How long does it take to get a response?"
      ),
      answer: t(
        "careersPage.faq.responseTimeAnswer",
        "We aim to respond to all applications within 7-10 business days. For urgent inquiries, you can call us directly."
      ),
    },
    {
      question: t(
        "careersPage.faq.documents",
        "What documents do I need to prepare?"
      ),
      answer: t(
        "careersPage.faq.documentsAnswer",
        "Please have your resume/CV ready. Additional documents like cover letters, portfolios, or certifications are optional but recommended."
      ),
    },
    {
      question: t(
        "careersPage.faq.interview",
        "What is the interview process like?"
      ),
      answer: t(
        "careersPage.faq.interviewAnswer",
        "Our process typically includes a phone screening, technical assessment, and 2-3 interview rounds with team members and leadership."
      ),
    },
  ];

  // Create a ref for the phone input section
  const phoneInputRef = useRef(null);

  // Function to handle FAQ click and scroll to phone input
  const handleFaqClick = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);

    // If clicking the last FAQ item, scroll to phone input
    if (index === faqItems.length - 1) {
      setTimeout(() => {
        phoneInputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  };

  // Fetch updated vacancy data when language changes
  useEffect(() => {
    const fetchUpdatedVacancy = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/vacancies/${initialVacancy._id}?lang=${i18n.language}&status=published`
        );

        if (response.ok) {
          const result = await response.json();

          console.log(result.data)
          if (result.success && result.data) {
            setCurrentVacancy(result.data);
          }
        }
      } catch (err) {
        console.error("Error fetching updated vacancy:", err);
        // Keep using existing data if fetch fails
      }
    };

    if (initialVacancy && initialVacancy._id) {
      fetchUpdatedVacancy();
    }
  }, [i18n.language, initialVacancy._id]);

  // Also listen for language changes to trigger re-render
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  // Enhanced getLocalizedValue function
  const getLocalizedValue = useCallback(
    (field) => {
      if (!currentVacancy || !currentVacancy[field]) {
        return "";
      }

      const value = currentVacancy[field];

      // If it's already a string, return it
      if (typeof value === "string") {
        return value;
      }

      // If it's a multilingual object
      if (value && typeof value === "object") {
        // Check if it has en/ru properties (multilingual structure)
        if (value.en !== undefined || value.ru !== undefined) {
          // Get value for current language
          return value[currentLanguage] || value.en || value.ru || "";
        }

        // If it doesn't have en/ru, it might be a different object structure
        // Try to use getLocalizedText if provided
        if (typeof getLocalizedText === "function") {
          const localized = getLocalizedText(value);
          return typeof localized === "string" ? localized : "";
        }

        // Fallback: return empty string or stringify
        return "";
      }

      // For any other type, convert to string
      return String(value || "");
    },
    [currentVacancy, getLocalizedText, currentLanguage]
  );

  // Check if position is open
  const isPositionOpen = () => {
    if (currentVacancy.status !== "published") return false;
    if (currentVacancy.applicationDeadline) {
      const deadline = new Date(currentVacancy.applicationDeadline);
      const now = new Date();
      return deadline > now;
    }
    return true;
  };

  // Submit application from within VacancyDetails
  const submitApplication = async (formData) => {
    try {
      setApplicationLoading(true);
      setApplicationError(null);
      setApplicationSuccess(false);

      // Create FormData object for file upload
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phoneNumber", formData.phoneNumber);
      submitData.append("agreedToTerms", formData.agreedToTerms.toString());

      // Add middle name if provided
      if (formData.middleName) {
        submitData.append("middleName", formData.middleName);
      }

      // Add resume file
      if (formData.resume) {
        submitData.append("resume", formData.resume);
      }

      const response = await fetch(
        `${API_BASE}/vacancies/${currentVacancy._id}/apply`,
        {
          method: "POST",
          body: submitData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      if (result.success) {
        setApplicationSuccess(true);
        setShowApplicationForm(false);
        setShowSuccessPopup(true);
      } else {
        throw new Error(result.message || "Application submission failed");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      setApplicationError(err.message);
    } finally {
      setApplicationLoading(false);
    }
  };

  // Handle phone number submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setPhoneError(t("careersPage.phoneRequired", "Phone number is required"));
      return;
    }

    // Basic phone validation (you can enhance this)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ""))) {
      setPhoneError(
        t("careersPage.phoneInvalid", "Please enter a valid phone number")
      );
      return;
    }

    try {
      setPhoneLoading(true);
      setPhoneError(null);

      // Call your API to submit phone number
      const response = await fetch(
        `${API_BASE}/vacancies/${currentVacancy._id}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            vacancyId: currentVacancy._id,
            vacancyTitle: getLocalizedValue("title"),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit phone number");
      }

      if (result.success) {
        setPhoneSuccess(true);
        setPhoneNumber("");

        // Reset success message after 3 seconds
        setTimeout(() => {
          setPhoneSuccess(false);
        }, 3000);
      } else {
        throw new Error(result.message || "Phone submission failed");
      }
    } catch (err) {
      console.error("Error submitting phone number:", err);
      setPhoneError(err.message);
    } finally {
      setPhoneLoading(false);
    }
  };

  const positionIsOpen = isPositionOpen();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t("careersPage.successTitle", "Application Submitted!")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t(
                "careersPage.successMessage",
                "Thank you for your application. We will review it and contact you soon."
              )}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-5000 ease-linear"
                style={{ width: "100%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {t(
                "careersPage.autoClose",
                "Closing automatically in 5 seconds..."
              )}
            </p>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FaArrowRight className="text-sm rotate-180" />
          {t("careersPage.backToCareers", "Back to Careers")}
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vacancy Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {getLocalizedValue("title")}
              </h1>

              {/* Salary and Location Badges - FIXED */}
              <div className="flex flex-wrap gap-4 mb-8">
                {currentVacancy.salary && (
                  <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-3 rounded-full font-semibold text-lg">
                    {getLocalizedValue("salary")}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-3 rounded-full font-semibold">
                  <FaMapMarkerAlt className="text-lg" />
                  {getLocalizedValue("location")}
                </span>
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-3 rounded-full font-semibold">
                  <FaBriefcase className="text-lg" />
                  {getLocalizedValue("department")}
                </span>
              </div>

              {/* Job Details Section */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Work Experience - FIXED */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400 text-lg" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {t("careersPage.workExperience", "Work Experience")}
                      </span>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {getLocalizedValue("experienceLevel")}
                    </p>
                  </div>

                  {/* Location - FIXED */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400 text-lg" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {t("careersPage.location", "Location")}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      {getLocalizedValue("location")}
                    </p>
                  </div>

                  {/* Employment Type */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-gray-400 text-lg" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {t("careersPage.employmentType", "Employment Type")}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-900 bg-white py-1 px-3 rounded-lg inline-block border border-gray-200">
                      {currentVacancy.employmentType === "other"
                        ? getLocalizedValue("otherEmploymentType") ||
                          t("careersPage.other", "Other")
                        : currentVacancy.employmentType === "labor_agreement"
                        ? t("careersPage.laborAgreement", "Labor Agreement")
                        : currentVacancy.employmentType === "self_employment"
                        ? t("careersPage.selfEmployment", "Self Employment")
                        : currentVacancy.employmentType
                        ? t(
                            `careersPage.employmentTypes.${currentVacancy.employmentType}`,
                            currentVacancy.employmentType
                          )
                        : t("careersPage.fullTime", "Full-time")}
                    </p>
                  </div>

                  {/* Application Deadline (if exists) */}
                  {currentVacancy.applicationDeadline && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400 text-lg" />
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          {t("careersPage.deadline", "Application Deadline")}
                        </span>
                      </div>
                      <p
                        className={`text-lg font-medium ${
                          new Date(currentVacancy.applicationDeadline) <
                          new Date()
                            ? "text-red-600"
                            : "text-gray-900"
                        }`}
                      >
                        {new Date(
                          currentVacancy.applicationDeadline
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Status */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-gray-400 text-lg" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {t("careersPage.status", "Status")}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                        positionIsOpen
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {positionIsOpen
                        ? t("careersPage.active", "Active")
                        : t("careersPage.closed", "Closed")}
                    </span>
                  </div>

                  {/* Views */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaEye className="text-gray-400 text-lg" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {t("careersPage.views", "Views")}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      {currentVacancy.viewCount || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              {getLocalizedValue("description") && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-8 bg-brand1 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("careersPage.jobDescription", "Job Description")}
                    </h2>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div
                      className="text-gray-700 prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: getLocalizedValue("description"),
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Requirements */}
              {getLocalizedValue("requirements") && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("careersPage.requirements", "Requirements")}
                    </h2>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                    <div
                      className="text-gray-700 prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: getLocalizedValue("requirements"),
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Responsibilities */}
              {getLocalizedValue("responsibilities") && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("careersPage.responsibilities", "Responsibilities")}
                    </h2>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                    <div
                      className="text-gray-700 prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: getLocalizedValue("responsibilities"),
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Possibilities */}
              {getLocalizedValue("possibilities") && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t(
                        "careersPage.possibilities",
                        "Possibilities & Prospects"
                      )}
                    </h2>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                    <div
                      className="text-gray-700 prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: getLocalizedValue("possibilities"),
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-r from-brand1 to-brand3 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("careersPage.faq.title", "Frequently Asked Questions")}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {faqItems.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border border-orange-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                      onClick={() => {
                        // Scroll to phone input section when any FAQ box is clicked
                        phoneInputRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Question number/icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-brand1 to-brand3 text-white rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                          <span className="text-white font-bold text-lg">
                            {index + 1}
                          </span>
                        </div>

                        {/* Question content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:transition-colors">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Us Phone Input Section */}
              <div ref={phoneInputRef} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 bg-gradient-to-r from-brand1 to-brand3 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("careersPage.needHelp", "Need Help? Contact Us")}
                  </h2>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t("careersPage.callbackTitle", "Request a Call Back")}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {t(
                          "careersPage.callbackDesc",
                          "Have questions about this position? Leave your phone number and we'll call you back within 24 hours."
                        )}
                      </p>

                      {/* Contact Details */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-brand1 to-brand3 rounded-lg flex items-center justify-center">
                            <FaPhone className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {t("careersPage.phoneLabel", "Phone Number")}
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                              +1 (555) 123-4567
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-brand1 to-brand3 rounded-lg flex items-center justify-center">
                            <FaEnvelope className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {t("careersPage.emailLabel", "Email Address")}
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                              careers@company.com
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone Input Form */}
                    <div className="lg:w-96 w-full">
                      <form onSubmit={handlePhoneSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("careersPage.yourPhone", "Your Phone Number")}
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                setPhoneError(null);
                              }}
                              placeholder={t(
                                "careersPage.phonePlaceholder",
                                "Enter your phone number"
                              )}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-brand1 to-brand3 focus:border-transparent pr-12"
                              disabled={phoneLoading}
                            />
                            <button
                              type="submit"
                              disabled={phoneLoading}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-brand1 to-brand3 text-white hover:bg-gradient-to-r from-brand1 to-brand3 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {phoneLoading ? (
                                <FaSpinner className="animate-spin" />
                              ) : (
                                <FaPaperPlane />
                              )}
                            </button>
                          </div>

                          {phoneError && (
                            <p className="mt-2 text-sm text-red-600">
                              {phoneError}
                            </p>
                          )}

                          {phoneSuccess && (
                            <p className="mt-2 text-sm text-green-600">
                              {t(
                                "careersPage.phoneSuccess",
                                "Thank you! We'll call you back soon."
                              )}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-gray-500">
                          {t(
                            "careersPage.privacyNotice",
                            "By submitting your phone number, you agree to our Privacy Policy. We won't share your information with third parties."
                          )}
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Apply Button and Contact Box */}
            <div className="lg:self-start lg:sticky lg:top-24 space-y-6">
              {/* Apply Button Box */}
              {positionIsOpen && currentVacancy.showApplyButton !== false && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {t(
                      "careersPage.interested",
                      "Interested in this position?"
                    )}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t(
                      "careersPage.applyPrompt",
                      "Submit your application and join our team"
                    )}
                  </p>
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="w-full px-8 py-4 bg-gradient-to-r from-brand1 to-brand3 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02]"
                  >
                    {t("careersPage.applyNow", "Apply Now")}
                    <FaArrowRight className="text-xl animate-pulse" />
                  </button>

                  {/* Quick info */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendarAlt />
                      <span>
                        {t("careersPage.deadline", "Deadline")}:{" "}
                        {currentVacancy.applicationDeadline
                          ? new Date(
                              currentVacancy.applicationDeadline
                            ).toLocaleDateString()
                          : t("careersPage.noDeadline", "No deadline")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaUsers />
                      <span>
                        {t("careersPage.applicants", "Applicants")}:{" "}
                        {currentVacancy.applicationCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Closed Position Box */}
              {!positionIsOpen && (
                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaTimes className="text-2xl text-gray-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">
                      {t("careersPage.positionClosedTitle", "Position Closed")}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t(
                        "careersPage.positionClosedDesc",
                        "This position is no longer accepting applications"
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showApplicationForm && currentVacancy && (
        <ApplicationForm
          vacancy={currentVacancy}
          onSubmit={submitApplication}
          onClose={() => {
            setShowApplicationForm(false);
            setApplicationError(null);
            setApplicationSuccess(false);
          }}
          loading={applicationLoading}
          error={applicationError}
          success={applicationSuccess}
          t={t}
        />
      )}
    </div>
  );
};

// Application Form Component
const ApplicationForm = ({
  vacancy,
  onSubmit,
  onClose,
  loading,
  error,
  success,
  t,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    resume: null,
    agreedToTerms: false,
    agree2: false,
  });
  const [formErrors, setFormErrors] = useState({});

  const handlePhoneChange = (phone) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: phone,
    }));

    // Clear error when user starts typing
    if (formErrors.phoneNumber) {
      setFormErrors((prev) => ({
        ...prev,
        phoneNumber: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim())
      errors.firstName = t(
        "careersPage.validation.firstNameRequired",
        "First name is required"
      );
    if (!formData.lastName.trim())
      errors.lastName = t(
        "careersPage.validation.lastNameRequired",
        "Last name is required"
      );
    if (!formData.email.trim())
      errors.email = t(
        "careersPage.validation.emailRequired",
        "Email is required"
      );
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = t(
        "careersPage.validation.emailInvalid",
        "Email is invalid"
      );
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = t(
        "careersPage.validation.phoneRequired",
        "Phone number is required"
      );
    if (!formData.resume)
      errors.resume = t(
        "careersPage.validation.resumeRequired",
        "Resume is required"
      );
    if (!formData.agreedToTerms)
      errors.agreedToTerms = t(
        "careersPage.validation.agreeTerms",
        "You must agree to the terms"
      );

    if (!formData.agree2)
      errors.agree2 = t("contact.checkbox2Error", "This field is required");

    // File validation
    if (formData.resume) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(formData.resume.type)) {
        errors.resume = t(
          "careersPage.validation.invalidFileType",
          "Invalid file type. Please upload PDF, DOC, or DOCX files."
        );
      } else if (formData.resume.size > maxSize) {
        errors.resume = t(
          "careersPage.validation.fileTooLarge",
          "File too large. Maximum size is 5MB."
        );
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await onSubmit(formData);
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-600 text-2xl" />
          </div>
          <h3 className="subheading font-bold text-gray-900 mb-2">
            {t(
              "careersPage.applicationSuccess.title",
              "Application Submitted!"
            )}
          </h3>
          <p className="text-gray-600 base-text mb-6">
            {t(
              "careersPage.applicationSuccess.message",
              "Thank you for applying. We will review your application and contact you soon."
            )}
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-brand1 text-white rounded-lg hover:bg-brand3 transition-colors"
          >
            {t("careersPage.close", "Close")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="subheading font-bold text-gray-900">
                {t("careersPage.applyFor", "Apply for")}: {vacancy.title}
              </h2>
              <p className="text-gray-600 base-text">
                {vacancy.department} • {vacancy.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-red-700">
                <FaExclamationTriangle />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6 base-text">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block  font-medium text-gray-700 mb-2">
                  {t("careersPage.lastName", "Last Name")}{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand1 focus:border-transparent ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 small-text mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className="block  font-medium text-gray-700 mb-2">
                  {t("careersPage.firstName", "First Name")}{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand1 focus:border-transparent ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 small-text mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block  font-medium text-gray-700 mb-2">
                  {t("careersPage.middleName", "Middle Name")}
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand1 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block  font-medium text-gray-700 mb-2">
                  {t("careersPage.email", "Email")}{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand1 focus:border-transparent ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 small-text mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t("careersPage.phone", "Phone Number")}
                  <span className="text-red-500 ml-1">*</span>
                </label>

                {/* Wrapper with border */}
                <div
                  className={`flex items-center rounded-lg border px-0 py-0 ${
                    formErrors.phoneNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <PhoneInput
                    defaultCountry="ru"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    className="w-full"
                    inputClassName="!bg-transparent !border-none !w-full !px-0 py-2 focus:!outline-none"
                  />
                </div>

                {formErrors.phoneNumber && (
                  <p className="text-red-500 small-text mt-1">
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block  font-medium text-gray-700 mb-2">
                {t("careersPage.resume", "Resume/CV")}
              </label>

              <div className="relative">
                <input
                  id="resumeInput"
                  type="file"
                  name="resume"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div
                  className={`w-full px-3 py-2 border rounded-lg bg-white flex items-center justify-between 
        ${formErrors.resume ? "border-red-500" : "border-gray-300"}`}
                >
                  <span className="text-gray-700 small-text">
                    {formData.resume
                      ? formData.resume.name
                      : t("careersPage.noFileChosen", "No file chosen")}
                  </span>

                  <button
                    type="button"
                    className="px-3 py-1 bg-brand1 text-white rounded-md small-text pointer-events-none"
                  >
                    {t("careersPage.chooseFile", "Choose File")}
                  </button>
                </div>
              </div>

              {formErrors.resume && (
                <p className="text-red-500 small-text mt-1">
                  {formErrors.resume}
                </p>
              )}

              {formData.resume && (
                <p className=" text-green-600 mt-1">
                  {t("careersPage.fileSelected", "File selected")}:{" "}
                  {formData.resume.name} (
                  {(formData.resume.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}

              <p className="small-text text-gray-500 mt-1">
                {t(
                  "careersPage.acceptedFormats",
                  "Accepted formats: PDF, DOC, DOCX (Max 5MB)"
                )}
              </p>
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-gray-300 text-brand1 focus:ring-brand1"
                />
                <span
                  className="small-text text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: t("careersPage.agreeTerms"),
                  }}
                ></span>
                <span className="text-red-500 ml-1">*</span>
              </label>

              {formErrors.agreedToTerms && (
                <p className="text-red-500 small-text mt-1">
                  {formErrors.agreedToTerms}
                </p>
              )}
            </div>

            {/* Second Checkbox */}
            <div className="mt-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agree2"
                  checked={formData.agree2}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-gray-300 text-brand1 focus:ring-brand1"
                />
                <span
                  className="small-text text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: t("contact.checkbox2"),
                  }}
                ></span>
                <span className="text-red-500 ml-1">*</span>
              </label>

              {formErrors.agree2 && (
                <p className="text-red-500 small-text mt-1">
                  {formErrors.agree2}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 base-text px-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                {t("careersPage.cancel", "Cancel")}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 base-text px-4 bg-brand1 text-white rounded-lg font-semibold hover:bg-brand3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    {t("careersPage.submitting", "Submitting...")}
                  </>
                ) : (
                  t("careersPage.submitApplication", "Submit Application")
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
