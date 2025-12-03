import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaFileMedicalAlt,
  FaCheckCircle,
  FaCertificate,
  FaShieldAlt,
} from "react-icons/fa";

const AboutLicenses = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Licenses & Certificates Header */}
      <div className="bg-white rounded-2xl border border-[#63cacc]/20 shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center bg-gradient-to-br from-[#125e84] to-[#33babd] rounded-xl shrink-0 shadow-md">
            <FaFileMedicalAlt className="text-white text-3xl" />
          </div>
          <div className="flex-1">
            <h3 className="heading1 font-bold text-[#125e84] ">
              {t("about.licenses.title")}
            </h3>
            <p className="text-[#125e84]/70 base-text">
              {t("about.licenses.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid of Licenses and Certificates */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Medical License */}
        <div className="bg-white rounded-2xl border border-[#63cacc]/20 shadow-sm p-6 hover:border-[#63cacc]/40 transition-colors">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/10 rounded-lg shrink-0">
              <FaCertificate className="text-[#63cacc] text-lg" />
            </div>
            <div className="font-bold subheading text-[#125e84]">
              {t("about.licenses.medLicense")}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex flex-col text-[#125e84]/80 ">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.number")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                {t("about.licenses.numberDesc")}
              </span>
            </div>

            <div className="flex flex-col text-[#125e84]/80 ">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.issueDate")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                15.01.2020
              </span>
            </div>

            <div className="flex flex-col text-[#125e84]/80 ">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.issuedBy")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                {t("about.licenses.issuedByDesc")}
              </span>
            </div>
          </div>

          <div className="text-[#125e84]/70 small-text leading-relaxed pt-3 border-t border-[#63cacc]/10">
            {t("about.licenses.medLicenseDesc")}
          </div>
        </div>

        {/* ISO Certificate */}
        <div className="bg-white rounded-2xl border border-[#63cacc]/20 shadow-sm p-6 hover:border-[#63cacc]/40 transition-colors">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/10 rounded-lg shrink-0">
              <FaShieldAlt className="text-[#63cacc] text-lg" />
            </div>
            <div className="font-bold subheading text-[#125e84]">
              {t("about.licenses.isoTitle")}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex flex-col text-[#125e84]/80 ">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.number")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                ISO-2020-RU-7890
              </span>
            </div>

            <div className="flex flex-col text-[#125e84]/80 text-sm">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.issueDate")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                20.03.2021
              </span>
            </div>

            <div className="flex flex-col text-[#125e84]/80 text-sm">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.validUntil")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                20.03.2026
              </span>
            </div>
          </div>

          <div className="text-[#125e84]/70 small-text leading-relaxed pt-3 border-t border-[#63cacc]/10">
            {t("about.licenses.isoDesc")}
          </div>
        </div>

        {/* Ministry Accreditation */}
        <div className="bg-white rounded-2xl border border-[#63cacc]/20 shadow-sm p-6 hover:border-[#63cacc]/40 transition-colors">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/10 rounded-lg shrink-0">
              <FaCertificate className="text-[#63cacc] text-lg" />
            </div>
            <div className="font-bold subheading text-[#125e84]">
              {t("about.licenses.ministryAccr")}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex flex-col text-[#125e84]/80 text-sm">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.number")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                AK-77-2022-456
              </span>
            </div>

            <div className="flex flex-col text-[#125e84]/80 text-sm">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.category")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                Высшая
              </span>
            </div>

            <div className="flex flex-col text-[#125e84]/80 text-sm">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.validUntil")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                15.12.2027
              </span>
            </div>
          </div>

          <div className="text-[#125e84]/70 small-text leading-relaxed pt-3 border-t border-[#63cacc]/10">
            {t("about.licenses.ministryAccrDesc")}
          </div>
        </div>

        {/* JCI International Accreditation */}
        <div className="bg-white rounded-2xl border border-[#63cacc]/20 shadow-sm p-6 hover:border-[#63cacc]/40 transition-colors">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/10 rounded-lg shrink-0">
              <FaShieldAlt className="text-[#63cacc] text-lg" />
            </div>
            <div className="font-bold subheading text-[#125e84]">
              {t("about.licenses.jciTitle")}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex flex-col text-[#125e84]/80 text-sm">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.number")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                JCI-2023-RU-001
              </span>
            </div>

            <div className="flex flex-col text-[#125e84]/80 text-sm">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.issueDate")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                10.06.2023
              </span>
            </div>

            <div className="flex flex-col text-[#125e84]/80 text-sm">
              <span className="text-[#125e84]/60 small-text uppercase tracking-wide mb-1">
                {t("about.licenses.validUntil")}
              </span>
              <span className="font-semibold base-text text-[#125e84]">
                10.06.2026
              </span>
            </div>
          </div>

          <div className="text-[#125e84]/70 small-text leading-relaxed pt-3 border-t border-[#63cacc]/10">
            {t("about.licenses.jciDesc")}
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-[#63cacc]/10 rounded-2xl p-6 flex items-start gap-4 border border-[#63cacc]/30">
        <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/20 rounded-full shrink-0">
          <FaCheckCircle className="text-[#63cacc] text-xl" />
        </div>
        <div className="flex-1">
          <div className="font-semibold subheading text-[#125e84] mb-1">
            {t("about.licenses.documentsAvailable")}
          </div>
          <p className="text-[#125e84]/70 base-text leading-relaxed">
            {t("about.licenses.copyInfo")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutLicenses;
