import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { PhoneInput } from "react-international-phone";
import { toast } from "react-toastify";
import "react-international-phone/style.css";

const DocsForm = () => {
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
  const [docFiles, setDocFiles] = useState([]);

  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocFiles((prev) => [...prev, ...files]);
  };

  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="h-full flex flex-col">
      <form className="flex-1 flex flex-col">
        <div className="h-[70vh] flex flex-col overflow-auto">
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              {/* Last Name */}
              <div>
                <label className="block text-brand1 font-semibold mb-1">
                  {t("contact.lastName")} <RequiredAsterisk />
                </label>
                <input
                  type="text"
                  required
                  className="border border-gray-300 bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm focus:outline-none focus:border-brand1 focus:ring-1 focus:ring-brand1 transition-colors"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
              {/* First Name */}
              <div>
                <label className="block text-brand1 font-semibold mb-1">
                  {t("contact.firstName")} <RequiredAsterisk />
                </label>
                <input
                  type="text"
                  required
                  className="border border-gray-300 bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm focus:outline-none focus:border-brand1 focus:ring-1 focus:ring-brand1 transition-colors"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>

              {/* Middle Name */}
              <div className="">
                <label className="block text-brand1 font-semibold mb-1">
                  {t("contact.middleName")}
                </label>
                <input
                  type="text"
                  className="border border-gray-300 bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm focus:outline-none focus:border-brand1 focus:ring-1 focus:ring-brand1 transition-colors"
                  value={form.middleName}
                  onChange={(e) =>
                    setForm({ ...form, middleName: e.target.value })
                  }
                />
              </div>

              {/* Email - Full width on mobile */}
              <div className="">
                <label className="block text-brand1 font-semibold mb-1">
                  {t("contact.email")} <RequiredAsterisk />
                </label>
                <input
                  type="email"
                  required
                  className="border border-gray-300 bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm focus:outline-none focus:border-brand1 focus:ring-1 focus:ring-brand1 transition-colors"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Phone with country code (react-international-phone) - Full width on mobile */}
              <div className="">
                <label className="block text-brand1 font-semibold mb-1">
                  {t("contact.phone")} <RequiredAsterisk />
                </label>
                <div className="relative">
                  <PhoneInput
                    defaultCountry="ru"
                    value={form.phone}
                    onChange={(phone) => setForm({ ...form, phone })}
                    className="phone-input-custom"
                    inputClassName="!bg-white/90 !border !border-gray-300 !rounded-lg !text-sm !w-full !px-3 !py-2 focus:!outline-none focus:!border-brand1 focus:!ring-1 focus:!ring-brand1"
                    dropdownClassName="!z-50 !relative"
                  />
                </div>
                {/* Messaging apps below phone */}
                <div className="mt-2">
                  <div className="flex flex-wrap gap-4 text-brand1 text-sm">
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
              <div className="">
                <label className="block text-brand1 font-semibold mb-1">
                  {t("contact.city")} <RequiredAsterisk />
                </label>
                <select
                  required
                  className="border border-gray-300 bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm focus:outline-none focus:border-brand1 focus:ring-1 focus:ring-brand1 transition-colors"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                >
                  <option value="">{t("contact.chooseCity")}</option>
                  <option value="Moscow">{t("contact.moscow")}</option>
                  <option value="Makhachkala">
                    {t("contact.makhachkala")}
                  </option>
                  <option value="another city">{t("contact.another")}</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-brand1 font-semibold mb-1">
                {t("contact.message")}
              </label>
              <textarea
                className="border border-gray-300 bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm focus:outline-none focus:border-brand1 focus:ring-1 focus:ring-brand1 transition-colors"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div className="flex-1">
              <div
                className="border border-brand4 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-brand1 hover:bg-brand1/5 h-full"
                onClick={() => document.getElementById("docs-upload").click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-brand1 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="text-brand1 text-center">
                  {t("contact.dragAndDrop")}
                </p>
                <input
                  id="docs-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  multiple
                  className="hidden"
                  onChange={handleDocUpload}
                />
              </div>
            </div>
            {/* Checkboxes */}
            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                required
                checked={form.agree1}
                onChange={(e) => setForm({ ...form, agree1: e.target.checked })}
                className="mr-2 mt-1 flex-shrink-0"
                id="form-agree1"
              />
              <label
                htmlFor="form-agree1"
                className="text-sm font-medium text-brand1"
                dangerouslySetInnerHTML={{ __html: t("contact.checkbox1") }}
              ></label>
            </div>

            <div className="flex items-start mt-2 mb-4">
              <input
                type="checkbox"
                checked={form.agree2}
                onChange={(e) => setForm({ ...form, agree2: e.target.checked })}
                className="mr-2 mt-1 flex-shrink-0"
                id="form-agree2"
              />
              <label
                htmlFor="form-agree2"
                className="text-sm font-medium text-brand1"
                dangerouslySetInnerHTML={{ __html: t("contact.checkbox2") }}
              ></label>
            </div>
          </div>
        </div>

        {/* Fixed submit button at the bottom */}
        <div className="p-4 md:p-6 border-t border-gray-200 bg-white">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand1 rounded-lg cursor-pointer flex items-center justify-center gap-2 px-2 py-3 text-white font-semibold text-base shadow hover:bg-brand2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
      </form>

      <style jsx>{`
        :global(.phone-input-custom) {
          position: relative;
          z-index: 40;
        }
        :global(.react-international-phone-country-selector) {
          z-index: 50 !important;
        }
        :global(.react-international-phone-country-selector-dropdown) {
          z-index: 60 !important;
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          background: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          max-height: 200px !important;
          overflow-y: auto !important;
        }
        :global(.react-international-phone-country-selector-button) {
          z-index: 50 !important;
          position: relative !important;
          background: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
        }
      `}</style>
    </div>
  );
};

export default DocsForm;
