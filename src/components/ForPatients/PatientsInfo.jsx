import React from "react";
import { useTranslation } from "react-i18next";
import { LuShield } from "react-icons/lu";

const PatientsInfo = () => {
  const { t } = useTranslation();

  const patientRights = [
    "forPatients.info.rights.rti1",
    "forPatients.info.rights.rti2",
    "forPatients.info.rights.rti3",
    "forPatients.info.rights.rti4",
    "forPatients.info.rights.rti5",
    "forPatients.info.rights.rti6",
    "forPatients.info.rights.rti7",
    "forPatients.info.rights.rti8",
    "forPatients.info.rights.rti9",
    "forPatients.info.rights.rti10",
    "forPatients.info.rights.rtc1",
    "forPatients.info.rights.rtc3",
    "forPatients.info.rights.rtc3",
    "forPatients.info.rights.res1",
    "forPatients.info.rights.res2",
    "forPatients.info.rights.res3",
    "forPatients.info.rights.res4",
  ];

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-brand1 mx-auto  heading1 font-bold mb-4 text-center ">
        {t("forPatients.info.title")}
      </h2>
      <div className="base-text text-brand1/80 mb-8 max-w-3xl mx-auto text-center">
        {t("forPatients.info.subtitle")}
      </div>

      {/* Patient Rights */}
      <div className="bg-white border border-brand4/20 rounded-2xl p-6 mb-7 shadow-sm">
        <div className="flex items-center  gap-3 mb-6 text-brand1">
          <div className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-[#125e84] to-[#33babd] rounded-lg shrink-0 mt-1">
            <LuShield className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="subheading font-semibold ">
              {t("forPatients.info.rightsTitle")}
            </h3>
            <p className="text-brand1/80 base-text">
              {t("forPatients.info.rightsSubtitle")}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="base-text mb-2 ">
            {t("forPatients.info.rights.heading1")}
          </h4>

          <ul className="text-brand1/90 base-text list-disc list-inside space-y-1.5 ml-4">
            {patientRights.slice(0, 10).map((right, index) => (
              <li key={index}>{t(right)}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6 base-text">
          <h4 className=" mb-2 ">{t("forPatients.info.rights.heading2")}</h4>

          <ul className="text-brand1/90  list-disc list-inside space-y-1.5 ml-4">
            {patientRights.slice(10, 13).map((right, index) => (
              <li key={index}>{t(right)}</li>
            ))}
          </ul>
        </div>
        <div className="base-text">
          <h4 className=" mb-2 ">{t("forPatients.info.rights.heading3")}</h4>

          <ul className="text-brand1/90  list-disc list-inside space-y-1.5 ml-4">
            {patientRights.slice(13, 17).map((right, index) => (
              <li key={index}>{t(right)}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Types of Medical Care */}
    </section>
  );
};

export default PatientsInfo;
