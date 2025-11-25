import React, { useState, useEffect } from "react";
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
  const { t, i18n } = useTranslation();

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
              {t("careersPage.successMessage", "Thank you for your application. We will review it and contact you soon.")}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-5000 ease-linear"
                style={{ width: '100%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {t("careersPage.autoClose", "Closing automatically in 5 seconds...")}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
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

// Vacancy Card Component
const VacancyCard = ({ vacancy, isOpen, onApply, getLocalizedText, t }) => {
  const formatSalary = (salary) => {
    if (!salary || !salary.min)
      return t("careersPage.salaryNotSpecified", "Salary not specified");

    const min = salary.min.toLocaleString();
    const max = salary.max ? ` - ${salary.max.toLocaleString()}` : "";
    const currency = salary.currency === "RUB" ? "₽" : salary.currency;

    return `${min}${max} ${currency}`;
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {getLocalizedText(vacancy.title)}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    {getLocalizedText(vacancy.location)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-gray-400" />
                    {vacancy.employmentType
                      ? t(
                          `careersPage.employmentTypes.${vacancy.employmentType}`,
                          vacancy.employmentType
                        )
                      : t("careersPage.fullTime", "Full-time")}
                  </span>
                  {vacancy.salaryRange && (
                    <span className="flex items-center gap-1">
                      {/* <FaDollarSign className="text-gray-400" /> */}
                      {formatSalary(vacancy.salaryRange)}
                    </span>
                  )}
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex gap-2">
                {getStatusBadge()}
                {vacancy.department && (
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {getLocalizedText(vacancy.department)}
                  </span>
                )}
              </div>
            </div>

            {/* Description with HTML support */}
            <div
              className="text-gray-600 mb-4 line-clamp-3"
              dangerouslySetInnerHTML={createMarkup(
                getLocalizedText(vacancy.description)
              )}
            />

            {/* Requirements (if available) */}
            {vacancy.requirements && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {t("careersPage.requirements", "Requirements")}:
                </h4>
                <div
                  className="text-gray-600 text-sm line-clamp-2"
                  dangerouslySetInnerHTML={createMarkup(
                    getLocalizedText(vacancy.requirements)
                  )}
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  {t("careersPage.views", "Views")}: {vacancy.viewCount || 0}
                </span>
                <span>
                  {t("careersPage.applications", "Applications")}:{" "}
                  {vacancy.applicationCount || 0}
                </span>
                {vacancy.applicationDeadline && (
                  <span
                    className={
                      isUrgent && isOpen ? "text-red-600 font-semibold" : ""
                    }
                  >
                    {t("careersPage.deadline", "Deadline")}:{" "}
                    {new Date(vacancy.applicationDeadline).toLocaleDateString()}
                  </span>
                )}
              </div>
              {vacancy.showApplyButton && (
                <button
                  onClick={onApply}
                  disabled={!isOpen}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${getButtonStyle()}`}
                >
                  {getButtonText()}
                  {isOpen && <FaArrowRight className="text-sm" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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
}) => {
  const { t } = useTranslation();
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
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t(
              "careersPage.applicationSuccess.title",
              "Application Submitted!"
            )}
          </h3>
          <p className="text-gray-600 mb-6">
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
              <h2 className="text-2xl font-bold text-gray-900">
                {t("careersPage.applyFor", "Apply for")}: {vacancy.title}
              </h2>
              <p className="text-gray-600">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {t("careersPage.phone", "Phone Number")}
    <span className="text-red-500 ml-1">*</span>
  </label>

  {/* Wrapper with border */}
  <div
    className={`flex items-center rounded-lg border px-0 py-0 ${
      formErrors.phoneNumber ? "border-red-500" : "border-gray-300"
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
    <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>
  )}
</div>

            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <span className="text-gray-700 text-sm">
                    {formData.resume
                      ? formData.resume.name
                      : t("careersPage.noFileChosen", "No file chosen")}
                  </span>

                  <button
                    type="button"
                    className="px-3 py-1 bg-brand1 text-white rounded-md text-sm pointer-events-none"
                  >
                    {t("careersPage.chooseFile", "Choose File")}
                  </button>
                </div>
              </div>

              {formErrors.resume && (
                <p className="text-red-500 text-sm mt-1">{formErrors.resume}</p>
              )}

              {formData.resume && (
                <p className="text-sm text-green-600 mt-1">
                  {t("careersPage.fileSelected", "File selected")}:{" "}
                  {formData.resume.name} (
                  {(formData.resume.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}

              <p className="text-sm text-gray-500 mt-1">
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
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: t("careersPage.agreeTerms"),
                  }}
                ></span>
                <span className="text-red-500 ml-1">*</span>
              </label>

              {formErrors.agreedToTerms && (
                <p className="text-red-500 text-sm mt-1">
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
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: t("contact.checkbox2"),
                  }}
                ></span>
                <span className="text-red-500 ml-1">*</span>
              </label>

              {formErrors.agree2 && (
                <p className="text-red-500 text-sm mt-1">{formErrors.agree2}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                {t("careersPage.cancel", "Cancel")}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-brand1 text-white rounded-lg font-semibold hover:bg-brand3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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