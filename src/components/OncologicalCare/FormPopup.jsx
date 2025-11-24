import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { PhoneInput } from "react-international-phone";
import { toast } from "react-toastify";

const FormPopup = () => {
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

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation - email is required based on your schema
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
        email: form.email,
      };

      console.log("Sending patient coordination data:", formData);

      const response = await fetch(`${API_BASE}/api/patient-coordination-forms`, {
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

      toast.success("Form submitted successfully!");
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
    <form onSubmit={handleSubmit}>
      <div className="relative z-40 p-4 md:p-8">
        {/* Name + Phone + Email + City */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          {/* Last Name */}
          <div>
            <label className="block text-brand1 font-semibold mb-1">
              {t("contact.lastName")} <RequiredAsterisk/>
            </label>
            <input
              type="text"
              required
              className=" bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          {/* First Name */}
          <div>
            <label className="block text-brand1 font-semibold mb-1">
              {t("contact.firstName")} <RequiredAsterisk/>
            </label>
            <input
              type="text"
              required
              className=" bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>

          {/* Middle Name */}
          <div>
            <label className="block text-brand1 font-semibold mb-1">
              {t("contact.middleName")}
            </label>
            <input
              type="text"
              className=" bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
              value={form.middleName}
              onChange={(e) => setForm({ ...form, middleName: e.target.value })}
            />
          </div>

          {/* Phone with country code (react-international-phone) */}
          <div>
            <label className="block text-brand1 font-semibold mb-1">
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
            <div className="">
              <div className="flex flex-wrap gap-4 text-brand1 text-sm mt-2">
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

          {/* Email */}
          <div>
            <label className="block text-brand1 font-semibold mb-1">
              {t("contact.email")} <RequiredAsterisk/>
            </label>
            <input
              type="email"
              required
              className=" bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-brand1 font-semibold mb-1">
              {t("contact.city")} <RequiredAsterisk/>
            </label>
            <select
              required
              className=" bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            >
              <option value="">{t("contact.chooseCity")}</option>
              <option value="Moscow">{t("contact.moscow")}</option>
              <option value="Makhachkala">{t("contact.makhachkala")}</option>
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
            className=" bg-white/90 text-sm rounded-lg px-3 py-2 w-full backdrop-blur-sm"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            required
            checked={form.agree1}
            onChange={(e) => setForm({ ...form, agree1: e.target.checked })}
            className="mr-2 mt-1"
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
            className="mr-2 mt-1"
            id="form-agree2"
          />
          <label
            htmlFor="form-agree2"
            className="text-sm font-medium text-brand1"
            dangerouslySetInnerHTML={{ __html: t("contact.checkbox2") }}
          ></label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand1 rounded-lg cursor-pointer flex items-center justify-center gap-2 mt-2 px-2 py-3 text-white font-semibold text-base shadow hover:bg-brand2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default FormPopup;