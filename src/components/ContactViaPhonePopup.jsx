import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useTranslation } from "react-i18next";

function ContactViaPhonePopup({ onClose }) {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:3003/api/website/contact-via-phone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: phoneNumber }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setIsSuccess(true);
        
        // Auto close after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 5000);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('contactViaPhone.success.title')}
            </h3>
            <p className="text-gray-600">
              {t('contactViaPhone.success.message')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {t('contactViaPhone.title')}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {t('contactViaPhone.phoneLabel')}
            </label>
            <PhoneInput
              defaultCountry="ru"
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              className="react-international-phone-input"
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#947d76]"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#947d76] text-white py-2 rounded-md hover:bg-[#836c65] disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? t('contactViaPhone.submitting') : t('contactViaPhone.submit')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t('contactViaPhone.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactViaPhonePopup;