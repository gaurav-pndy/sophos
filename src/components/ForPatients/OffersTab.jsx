import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaTag,
  FaArrowRight,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
  FaUsers,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

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

const OffersTab = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const { t, i18n } = useTranslation();

  // Description component with "See More" functionality - MOVED INSIDE OffersTab
  const DescriptionWithToggle = ({ description, maxLines = 2 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!description) return null;

    return (
      <div className="mb-4">
        <div
          className={`text-gray-600 base-text leading-relaxed ${
            isExpanded ? "" : "line-clamp-2"
          }`}
          dangerouslySetInnerHTML={createMarkup(description)}
        />
        {/* Always show See More if there's content */}
        {description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-brand1 hover:text-brand3 text-sm font-medium flex items-center gap-1 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                {t("forPatientsPage.offers.seeLess")}
                <FaChevronUp className="text-xs" />
              </>
            ) : (
              <>
                {t("forPatientsPage.offers.seeMore")}
                <FaChevronDown className="text-xs" />
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  // Fetch active promos from backend
  const fetchActivePromos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE}/promos/active?lang=${i18n.language}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("API Response:", result); // Debug log

      // Handle both response formats
      if (result.promos !== undefined) {
        setOffers(result.promos || []);
      } else if (result.success && result.data) {
        setOffers(result.data || []);
      } else {
        throw new Error(result.message || "Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching offers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePromos();
  }, [i18n.language]);

  // Helper function to get localized field
  const getLocalizedField = (field, fallback = "") => {
    if (!field) return fallback;
    return field[i18n.language] || field.en || field.ru || fallback;
  };

  // Helper function to get localized category
  const getLocalizedCategory = (category) => {
    const categoryMap = {
      consultation: t("forPatientsPage.offers.categories.consultation"),
      package: t("forPatientsPage.offers.categories.package"),
      seasonal: t("forPatientsPage.offers.categories.seasonal"),
      special: t("forPatientsPage.offers.categories.specialOffer"),
    };
    return (
      categoryMap[category] ||
      t("forPatientsPage.offers.categories.specialOffer")
    );
  };

  // Toggle description expansion
  const toggleDescription = (offerId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [offerId]: !prev[offerId],
    }));
  };

  // Format promo data for display
  const formatPromoData = (promos) => {
    return promos.map((promo) => ({
      id: promo._id || promo.id,
      title: promo.title,
      description: promo.description,
      discount:
        promo.discount || t("forPatientsPage.offers.categories.specialOffer"),
      validity: promo.validUntil
        ? `${t("forPatientsPage.offers.validUntil")} ${new Date(
            promo.validUntil
          ).toLocaleDateString(i18n.language)}`
        : promo.endDate
        ? `${t("forPatientsPage.offers.validUntil")} ${new Date(
            promo.endDate
          ).toLocaleDateString(i18n.language)}`
        : t("forPatientsPage.offers.limitedTime"),
      daysLeft: promo.validUntil
        ? Math.ceil(
            (new Date(promo.validUntil) - new Date()) / (1000 * 60 * 60 * 24)
          )
        : promo.endDate
        ? Math.ceil(
            (new Date(promo.endDate) - new Date()) / (1000 * 60 * 60 * 24)
          )
        : null,
      features: [
        promo.isActive && t("forPatientsPage.offers.activePromotion"),
        promo.fileType &&
          `${promo.fileType?.toUpperCase()} ${t(
            "forPatientsPage.offers.content"
          )}`,
        promo.targetAudience &&
          `${t("forPatientsPage.offers.for")}: ${promo.targetAudience}`,
      ].filter(Boolean),
      buttonText: t("forPatientsPage.offers.viewDetails"),
      mediaType: promo.fileType,
      mediaData: promo.fileData,
      targetUrl: promo.targetUrl,
      category: getLocalizedCategory(promo.category),
      popularity: Math.floor(Math.random() * 100) + 50, // Mock data for demo
      // Fallback for different field names
      currentTitle: promo.currentTitle || promo.title,
      currentDescription: promo.currentDescription || promo.description,
    }));
  };

  const formattedOffers = formatPromoData(offers);

  // Loading state with modern skeleton
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand1">
                {t("forPatientsPage.heading3")}
              </h2>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t("forPatientsPage.text3")}
          </p>
        </div>

        {/* Skeleton Loader */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state with modern design
  if (error) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-brand1 to-brand3 rounded-2xl flex items-center justify-center">
              <FaTag className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("forPatientsPage.heading3")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand1 to-brand3 rounded-full mt-1"></div>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t("forPatientsPage.text3")}
          </p>
        </div>

        <div className="flex justify-center items-center py-10">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t("forPatientsPage.offers.errors.loading")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("forPatientsPage.offers.errors.description")}
            </p>
            <button
              onClick={fetchActivePromos}
              className="px-8 py-3 bg-gradient-to-r from-brand1 to-brand3 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {t("forPatientsPage.offers.errors.tryAgain")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div>
            <h2 className="heading1 font-bold text-brand1">
              {t("forPatientsPage.heading3")}
            </h2>
          </div>
        </div>
        <p className="text-gray-600 base-text leading-relaxed">
          {t("forPatientsPage.text3")}
        </p>
      </div>

      {/* Offers Grid */}
      {formattedOffers.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedOffers.map((offer) => (
              <div
                key={offer.id}
                className="group relative bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Popularity Badge */}
                {offer.popularity > 80 && (
                  <div className="absolute top-4 left-4 z-10 bg-yellow-500 text-white px-3 py-1 rounded-full small-text font-semibold flex items-center gap-1 shadow-lg">
                    <FaStar className="" />
                    {t("forPatientsPage.offers.popular")}
                  </div>
                )}

                {/* Days Left Badge */}
                {offer.daysLeft !== null && offer.daysLeft <= 7 && (
                  <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full small-text font-semibold flex items-center gap-1 shadow-lg">
                    <FaClock className="small-text" />
                    {t("forPatientsPage.offers.daysLeft", {
                      count: offer.daysLeft,
                    })}
                  </div>
                )}

                {/* Media Preview */}
                {offer.mediaData && (
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {offer.mediaType === "image" ||
                    offer.mediaType === "gif" ? (
                      <img
                        src={`data:${
                          offer.mediaType === "gif" ? "image/gif" : "image/jpeg"
                        };base64,${offer.mediaData}`}
                        alt={offer.title.replace(/<[^>]*>/g, "")} // Strip HTML for alt text
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : offer.mediaType === "video" ? (
                      <video
                        src={`data:video/mp4;base64,${offer.mediaData}`}
                        muted
                        className="w-full h-full object-cover"
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                    ) : null}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                {/* Content - flex-grow to push button to bottom */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category and Discount */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block bg-brand4/20 text-brand1 px-3 py-1 rounded-full small-text font-medium">
                      {offer.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="subheading font-bold text-gray-900 mb-2 line-clamp-2 leading-tight"
                    dangerouslySetInnerHTML={createMarkup(offer.title)}
                  />

                  {/* Description with See More functionality */}
                  <DescriptionWithToggle
                    description={offer.description}
                    maxLines={2}
                  />

                  {/* Validity - Only show if available */}
                  {offer.validity && (
                    <div className="flex items-center gap-2 small-text text-gray-500 mb-4">
                      <FaClock className="text-gray-400" />
                      <span>{offer.validity}</span>
                    </div>
                  )}

                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>

                  {/* Action Button - Always at bottom */}
                  <button
                    onClick={() => {
                      if (offer.targetUrl) {
                        window.open(offer.targetUrl, "_blank");
                      } else {
                        setSelectedOffer(offer);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-brand1 to-brand3 text-white py-2.5 base-text px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-4"
                  >
                    {offer.buttonText}
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Terms & Conditions */}
        </>
      ) : (
        // No offers available
        <div className="text-center py-10">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FaTag className="text-gray-400 text-3xl" />
          </div>
          <h3 className="subheading font-bold text-gray-900 mb-3">
            {t("forPatientsPage.offers.noOffers.title")}
          </h3>
          <p className="text-gray-600 mb-8 base-text max-w-md mx-auto">
            {t("forPatientsPage.offers.noOffers.description")}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={fetchActivePromos}
              className="px-8 py-2.5 base-text bg-gradient-to-r from-brand1 to-brand3 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              {t("forPatientsPage.offers.noOffers.refresh")}
            </button>
            <button className="px-8 py-2.5 base-text border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
              {t("forPatientsPage.offers.noOffers.contact")}
            </button>
          </div>
        </div>
      )}

      {/* Offer Detail Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3
                className="subheading font-bold text-gray-900 mb-4"
                dangerouslySetInnerHTML={createMarkup(selectedOffer.title)}
              />
              <p
                className="text-gray-600 base-text mb-6"
                dangerouslySetInnerHTML={createMarkup(
                  selectedOffer.description
                )}
              />
              <button
                onClick={() => setSelectedOffer(null)}
                className="w-full py-2.5 base-text bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersTab;
