import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useTranslation } from "react-i18next";
import { RxCross1 } from "react-icons/rx";

function ContactViaPhonePopup({ onClose }) {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
  });
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";

  const isValidPhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/[^\d+]/g, "");
    return cleanPhone.replace(/\D/g, "").length >= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber.trim()) {
      setError(t("contactViaPhone.validation.required"));
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setError(t("contactViaPhone.validation.invalid"));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${API_BASE}/api/website/contact-via-phone`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: phoneNumber, fullName }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 5000);
      } else {
        console.error("Error:", response.status);
        setError(t("contactViaPhone.errors.submission"));
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError(t("contactViaPhone.errors.network"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (phone) => {
    setPhoneNumber(phone);
    if (error) {
      setError("");
    }
  };

  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  const canSubmit =
    phoneNumber.trim() && isValidPhoneNumber(phoneNumber) && !isSubmitting;

  // Success state popup (also closes on outside click)
  if (isSuccess) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg max-w-xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("contactViaPhone.success.title")}
            </h3>
            <p className="text-gray-600">
              {t("contactViaPhone.success.message")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-xl relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross1
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        />
        <h2 className="text-xl font-bold mb-4">{t("contactViaPhone.title")}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 small-text">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-2 mb-4">
            <div>
              <label className="block small-text font-medium mb-2">
                {t("contact.lastName")} <RequiredAsterisk />
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#947d76] border-gray-300"
                value={fullName.lastName}
                onChange={(e) =>
                  setFullName({ ...fullName, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block small-text font-medium mb-2">
                {t("contact.firstName")} <RequiredAsterisk />
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#947d76] border-gray-300"
                value={fullName.firstName}
                onChange={(e) =>
                  setFullName({ ...fullName, firstName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block small-text font-medium mb-2">
                {t("contact.middleName")}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#947d76] border-gray-300"
                value={fullName.middleName}
                onChange={(e) =>
                  setFullName({ ...fullName, middleName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block small-text font-medium mb-2">
              {t("contactViaPhone.phoneLabel")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              defaultCountry="ru"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="react-international-phone-input"
              inputClassName={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#947d76] ${
                error ? "border-red-300" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex items-start mt-2 text-brand1">
            <input
              type="checkbox"
              required
              checked={checkbox1}
              onChange={(e) => setCheckbox1(e.target.checked)}
              className="mr-2 mt-1"
              id="form-agree1"
            />
            <label
              htmlFor="form-agree1"
              className="small-text "
              dangerouslySetInnerHTML={{
                __html: t("contact.checkbox1"),
              }}
            ></label>
          </div>
          <div className="flex items-start mt-2 text-brand1">
            <input
              type="checkbox"
              required
              checked={checkbox2}
              onChange={(e) => setCheckbox2(e.target.checked)}
              className="mr-2 mt-1"
              id="form-agree2"
            />
            <label
              htmlFor="form-agree2"
              className="small-text "
              dangerouslySetInnerHTML={{
                __html: t("contact.checkbox2"),
              }}
            ></label>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`flex-1 py-2 rounded-md transition-colors ${
                canSubmit
                  ? "bg-[#947d76] text-white hover:bg-[#836c65]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting
                ? t("contactViaPhone.submitting")
                : t("contactViaPhone.submit")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t("contactViaPhone.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactViaPhonePopup;
