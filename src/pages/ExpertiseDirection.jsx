import React from "react";
import { useParams } from "react-router-dom";
import { DOCTOR_LIST, SUBSECTIONS } from "../data/expertise";
import { useTranslation } from "react-i18next";

const ExpertiseDirection = () => {
  const { t } = useTranslation();
  const { direction } = useParams();
  const doctors = DOCTOR_LIST[direction] || [];
  const sections = SUBSECTIONS[direction] || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="w-full flex flex-col  items-center  relative py-12 px-4 bg-gradient-to-br from-brand5 to-brand1 overflow-hidden">
        <h1 className="text-white  text-2xl md:text-3xl xl:text-5xl font-bold ">
          {t(`expertise.${direction}.title`)}
        </h1>
      </section>

      {/* Featured doctor */}
      <div className="max-w-[87rem] mx-auto px-4 py-8">
        {/* <h2 className="text-brand1 text-xl md:text-2xl xl:text-4xl font-semibold mb-6">
          {t("expertise.oncology")}
        </h2> */}

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col md:flex-row gap-8">
          {/* Left info */}
          <div className="flex-1">
            <div className="mb-4">
              <div className="font-bold text-2xl text-gray-800 mb-1">
                {t(doctors[0].name)}{" "}
                {doctors[0].location && (
                  <span className="text-gray-600 font-normal base-text">
                    ({t(doctors[0].location)})
                  </span>
                )}
              </div>
              <div className=" text-gray-600">{t(doctors[0].position)}</div>
            </div>

            <div className="grid grid-cols-2  gap-4  mb-4">
              <div className="">
                <div className="text-3xl font-bold text-brand3">
                  {t(doctors[0].years)}
                </div>
                <div className="small-text text-gray-600">
                  {t("expertise.experience")}
                </div>
              </div>
              <div className="">
                <div className="text-brand3 text-3xl font-bold">
                  {t("expertise.since")} {t(doctors[0].memberSince)}
                </div>
                <div className="small-text text-gray-600">
                  {t("expertise.workAtHDMC")}
                </div>
              </div>
            </div>

            <div className=" text-gray-700 mb-6">
              <ul className="list-disc pl-5 space-y-1">
                {doctors[0].shortInfo &&
                  doctors[0].shortInfo.map((info, i) => (
                    <li key={i}>{t(info)}</li>
                  ))}
              </ul>
            </div>

            <button className="bg-brand3 hover:bg-brand1 text-white px-6 py-2 rounded-lg  font-medium transition-all duration-300 cursor-pointer">
              {t("expertise.btn")}
            </button>
          </div>

          {/* Right image */}
          <div className="flex-shrink-0">
            <img
              src={doctors[0].img}
              alt={t(doctors[0].name)}
              className="max-w-lg w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>

      {/* Doctors row */}
      <div className="max-w-[87rem] mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.slice(1).map((doc, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <img
                src={doc.img}
                alt={t(doc.name)}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <div className="font-semibold text-lg text-gray-800 mb-1">
                  {t(doc.name)}
                </div>
                <div className="small-text line-clamp-2 text-ellipsis text-gray-500 mb-2">
                  {t(doc.position)}
                </div>
                <div className="text-xs text-brand3">
                  {t("expertise.experience")}: {t(doc.experience)}{" "}
                  {t("expertise.years")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-sections grid */}
      <div className="bg-white py-12">
        <div className="max-w-[87rem] mx-auto px-4">
          <h2 className="text-brand1 text-xl md:text-2xl xl:text-4xl font-semibold mb-6">
            {t("expertise.directions")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((sec, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#E6F7F8] rounded-full flex items-center justify-center">
                    <sec.icon className="text-[#3FBCC4] text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {t(sec.label)}
                    </h3>
                    <p className="small-text text-gray-600 leading-relaxed">
                      {t(sec.desc)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseDirection;
