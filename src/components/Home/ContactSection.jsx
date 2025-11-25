import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import WaveBackground from "../WaveBackground";
import { toast } from "react-toastify";

const ContactSection = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    whatsapp: false,
    telegram: false,
    max: false,
    email: "",
    city: "",
    message: "",
    agree1: false,
    agree2: false,
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";

  // Auto-close success popup after 5 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update validation to include email
    if (!form.firstName || !form.lastName || !form.phone || !form.city || !form.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!form.agree1 || !form.agree2) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const formData = {
        firstName: form.firstName,
        lastName: form.lastName,
        middleName: form.middleName,
        phoneNumber: form.phone,
        whatsapp: form.whatsapp,
        telegram: form.telegram,
        max: form.max,
        city: form.city,
        message: form.message,
        email: form.email, // Make sure this is included
      };

      console.log("Sending data:", formData);

      const response = await fetch(`${API_BASE}/api/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success response:", data);

      // Show success popup instead of toast
      setShowSuccessPopup(true);

      // Reset form
      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        whatsapp: false,
        telegram: false,
        max: false,
        email: "",
        city: "",
        message: "",
        agree1: false,
        agree2: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <section className="w-full bg-[#fafbfc] pt-3 pb-6 mb-6">
      <div className="max-w-[87rem] mx-auto px-4">
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
                {t("contact.successTitle") || "Thank You!"}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("contact.successMessage") || "Your message has been sent successfully. We will contact you soon!"}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-5000 ease-linear"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t("contact.autoClose") || "Closing automatically in 5 seconds..."}
              </p>
            </div>
          </div>
        )}

        <div className="max-w-[87rem] text-center mx-auto px-4">
          <h2 className="text-brand1 text-center text-[2rem] leading-10 font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p 
            className="md:text-lg text-center text-brand1/80 mb-8 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: t("contact.subtitle") }}
          />
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <section className="relative rounded-xl mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
              <WaveBackground
                stroke="rgba(251, 186, 189,"
                custStyle="md:w-1/2 h-[65%] left-0 top-0"
              />

              <div className="relative bg-gradient-to-b md:bg-gradient-to-r from-[#816c65] to-[#c9a89d] z-40 p-4 md:p-10">
                <div className="font-medium text-2xl mb-6 md:mb-10 flex items-center gap-2 text-white">
                  <IoPaperPlaneOutline />
                  {t("contact.heading")}
                </div>

                {/* Name + Phone + Email + City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3">
                  {/* Last Name */}
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      {t("contact.lastName")} <RequiredAsterisk/>
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                  </div>
                  {/* First Name */}
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      {t("contact.firstName")} <RequiredAsterisk/>
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                  </div>

                  {/* Middle Name */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-1">
                      {t("contact.middleName")}
                    </label>
                    <input
                      type="text"
                      className="bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
                      value={form.middleName}
                      onChange={(e) =>
                        setForm({ ...form, middleName: e.target.value })
                      }
                    />
                  </div>

                  {/* Email - Full width on mobile */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-1">
                      {t("contact.email")} <RequiredAsterisk/>
                    </label>
                    <input
                      type="email"
                      required
                      className="bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  {/* Phone with country code (react-international-phone) - Full width on mobile */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-1">
                      {t("contact.phone")} <RequiredAsterisk/>
                    </label>
                    <PhoneInput
                      defaultCountry="ru"
                      value={form.phone}
                      onChange={(phone) => setForm({ ...form, phone })}
                      className="rounded-lg bg-white/90 text-sm w-full backdrop-blur-sm"
                      inputClassName="!bg-transparent !border-none !w-full !px-3 !py-2 focus:!outline-none"
                    />
                    {/* Messaging apps below phone */}
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-3 md:gap-4 text-white text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="accent-[#59302a]"
                            checked={form.whatsapp}
                            onChange={(e) =>
                              setForm({ ...form, whatsapp: e.target.checked })
                            }
                          />
                          <span>Whatsapp</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="accent-[#59302a]"
                            checked={form.telegram}
                            onChange={(e) =>
                              setForm({ ...form, telegram: e.target.checked })
                            }
                          />
                          <span>Telegram</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="accent-[#59302a]"
                            checked={form.max}
                            onChange={(e) =>
                              setForm({ ...form, max: e.target.checked })
                            }
                          />
                          <span>Max</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* City */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-1">
                      {t("contact.city")} <RequiredAsterisk/>
                    </label>
                    <select
                      required
                      className="bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                    >
                      <option value="">{t("contact.chooseCity")}</option>
                      <option value="Moscow">{t("contact.moscow")}</option>
                      <option value="Makhachkala">
                        {t("contact.makhachkala")}
                      </option>
                      <option value="another city">
                        {t("contact.another")}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-3">
                  <label className="block text-white font-semibold mb-1">
                    {t("contact.message")}
                  </label>
                  <textarea
                    className="bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex items-start mt-4">
                  <input
                    type="checkbox"
                    required
                    checked={form.agree1}
                    onChange={(e) =>
                      setForm({ ...form, agree1: e.target.checked })
                    }
                    className="mr-2 mt-1 flex-shrink-0"
                    id="form-agree1"
                  />
                  <label
                    htmlFor="form-agree1"
                    className="text-sm font-medium text-white"
                    dangerouslySetInnerHTML={{ __html: t("contact.checkbox1") }}
                  ></label>
                </div>

                <div className="flex items-start mt-2 mb-4">
                  <input
                    type="checkbox"
                    checked={form.agree2}
                    onChange={(e) =>
                      setForm({ ...form, agree2: e.target.checked })
                    }
                    className="mr-2 mt-1 flex-shrink-0"
                    id="form-agree2"
                  />
                  <label
                    htmlFor="form-agree2"
                    className="text-sm font-medium text-white"
                    dangerouslySetInnerHTML={{ __html: t("contact.checkbox2") }}
                  ></label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#59302a] rounded-lg cursor-pointer flex items-center justify-center gap-2 mt-2 px-2 py-3 text-white font-semibold text-base shadow hover:bg-[#69372c] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <IoPaperPlaneOutline />
                      {t("contact.button")}
                    </>
                  )}
                </button>
              </div>

              <div className="w-full h-full z-30 -mt-[2px] md:-mt-0">
                <div className="relative w-full h-full">
                  <img
                    src="https://www.shutterstock.com/shutterstock/photos/2560601181/display_1500/stock-photo-businessman-interacting-with-a-glowing-paper-plane-icon-on-a-virtual-interface-symbolizing-message-2560601181.jpg"
                    alt="Services illustration"
                    className="w-full md:min-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b via-30% md:bg-gradient-to-r from-[#c9a89d] via-[#c9a89d]/40 to-transparent" />
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;