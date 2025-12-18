import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDove } from "react-icons/fa";

const initialForm = {
  donorLast: "",
  donorName: "",
  donorPatronymic: "",
  donorEmail: "",
  donorPhone: "",
  fundPurpose: "",
  facilityName: "",
  amount: "",
  message: "",
  agree: false,
};

const ThankYou = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "ru" ? "ru" : "en";
  const [form, setForm] = useState(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      lang === "ru" ? "Спасибо за отправку!" : "Thank you for your submission!"
    );
    setForm(initialForm);
  };

  return (
    <section className="bg-brand4/5 w-full min-h-screen py-12">
      <div className="max-w-[87rem] mx-auto px-4 flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-brand4/10 rounded-full blur-3xl"></div>
            <FaDove className="relative text-brand4 text-8xl md:text-9xl drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand1 text-center mb-4">
            {t("thankyou.title")}!»
          </h1>
          <p className="text-brand1/60 text-lg mb-6 text-center max-w-2xl">
            {t("thankyou.title")}, HDMC!»
          </p>
          <button className="bg-brand1 text-white font-semibold rounded-lg px-8 py-3 hover:bg-brand5 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            {t("thankyou.transferBtn")}
          </button>
        </div>

        {/* Description Section */}
        <div className=" mb-12 text-brand1/70 base-text leading-relaxed space-y-4 bg-white/60 backdrop-blur rounded-2xl p-8 shadow-md">
          <p className="text-center font-semibold text-brand1 text-lg">
            {t("thankyou.para1")}
          </p>
          <p>{t("thankyou.para2")}</p>
          <p>{t("thankyou.para3")}</p>
          <p>{t("thankyou.para4")}</p>
          <p className="border-l-4 border-brand4 pl-4 italic">
            {t("thankyou.para5")}
          </p>
        </div>

        {/* Transfer Funds Form */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 w-full  mb-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-5">
            <FaDove className="text-brand4 text-[200px]" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-brand1 to-brand4 rounded-full"></div>
              <h2 className="font-bold text-2xl text-brand1">
                {t("thankyou.formHeading")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="small-text font-semibold text-brand1">
                  {t("thankyou.lastName")} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("thankyou.lastName")}
                  value={form.donorLast}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, donorLast: e.target.value }))
                  }
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="small-text font-semibold text-brand1">
                  {t("thankyou.firstName")} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("thankyou.firstName")}
                  value={form.donorName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, donorName: e.target.value }))
                  }
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="small-text font-semibold text-brand1">
                  {t("thankyou.patronymic")}
                </label>
                <input
                  type="text"
                  placeholder={t("thankyou.patronymic")}
                  value={form.donorPatronymic}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, donorPatronymic: e.target.value }))
                  }
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="small-text font-semibold text-brand1">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@mail.com"
                  value={form.donorEmail}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, donorEmail: e.target.value }))
                  }
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="small-text font-semibold text-brand1">
                  {t("thankyou.phone")}
                </label>
                <input
                  type="text"
                  placeholder="+7 (999) 999-99-99"
                  value={form.donorPhone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, donorPhone: e.target.value }))
                  }
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="small-text font-semibold text-brand1">
                  {t("thankyou.amount")} *
                </label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="small-text font-semibold text-brand1">
                  {t("thankyou.fundPurpose")} *
                </label>
                <select
                  required
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none bg-white w-full overflow-hidden text-ellipsis whitespace-nowrap"
                  value={form.fundPurpose}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fundPurpose: e.target.value }))
                  }
                >
                  <option value="">{t("thankyou.fundPurpose")}</option>
                  <option value="development">
                    {t("thankyou.developmentGoals")}
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="small-text font-semibold text-brand1">
                  {t("thankyou.facility")}
                </label>
                <input
                  type="text"
                  placeholder={t("thankyou.facility")}
                  value={form.facilityName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, facilityName: e.target.value }))
                  }
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="small-text font-semibold text-brand1">
                  {t("thankyou.message")}
                </label>
                <textarea
                  placeholder={t("thankyou.message")}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  rows={4}
                  className="border-2 border-brand1/20 rounded-lg p-3 focus:border-brand4 focus:ring-2 focus:ring-brand4/20 transition-all outline-none resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-start gap-3 text-xs text-brand1/70 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.agree}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, agree: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 accent-brand4"
                  />
                  <span className="leading-relaxed">{t("thankyou.agree")}</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-brand1 rounded-lg text-white py-4 px-8 font-bold w-full hover:bg-brand5 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {t("thankyou.transferBtn")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className=" text-center bg-white/60 backdrop-blur rounded-xl p-6 shadow-md">
          <p className="small-text text-brand1/70 mb-2">
            <a
              href="#"
              className="text-brand4 font-semibold hover:text-brand5 underline transition-colors"
            >
              {t("thankyou.downloadGifts")}:{" "}
            </a>
          </p>
          <p className="small-text text-brand1/70">
            {t("thankyou.supportNote")}:{" "}
            <a
              href="mailto:donate@medsi.ru"
              className="text-brand4 font-semibold hover:text-brand5 underline transition-colors"
            >
              donate@hdmc.ru
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
