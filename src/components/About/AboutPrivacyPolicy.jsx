import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaFileAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const AboutPrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#845007]/20 shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center bg-gradient-to-br from-[#3a4660] to-[#845007] rounded-xl shrink-0 shadow-md">
            <FaFileAlt className="text-white text-3xl" />
          </div>
          <div>
            <h3 className="heading1 font-bold text-[#3a4660] ">
              {t("about.privacy.title")}
            </h3>
            <p className="text-[#3a4660]/70 base-text">
              {t("about.privacy.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Policy Body */}
      <div className="bg-white rounded-2xl border border-[#845007]/20 shadow-sm p-4 md:p-6 space-y-8">
        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              1
            </span>
            {t("about.privacy.section1Title")}
          </h3>
          <ul className="ml-9  text-[#3a4660]/80 base-text space-y-2 marker:text-[#845007]">
            <li className="leading-relaxed">{t("about.privacy.point1")}</li>
            <li className="leading-relaxed">{t("about.privacy.point2")}</li>
            <li className="leading-relaxed">{t("about.privacy.point3")}</li>
            <li className="leading-relaxed">{t("about.privacy.point4")}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              2
            </span>
            {t("about.privacy.section2Title")}
          </h3>
          <p className="text-[#3a4660]/80  leading-relaxed ml-9 mb-3">
            {t("about.privacy.section2Subtitle")}
          </p>
          <ul className="ml-9 list-disc base-text list-inside text-[#3a4660]/80  space-y-2 marker:text-[#845007]">
            <li
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("about.privacy.point21") }}
            ></li>
            <li
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("about.privacy.point22") }}
            ></li>
            <li
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("about.privacy.point23") }}
            ></li>
            <li
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("about.privacy.point24") }}
            ></li>
            <li
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("about.privacy.point25") }}
            ></li>
            <li
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("about.privacy.point26") }}
            ></li>
            <li
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("about.privacy.point27") }}
            ></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              3
            </span>
            {t("about.privacy.section3Title")}
          </h3>
          <p className="text-[#3a4660]/80  leading-relaxed ml-9 mb-3">
            {t("about.privacy.section3Subtitle")}
          </p>
          <ul className="ml-9 list-disc list-inside base-text text-[#3a4660]/80 space-y-2 marker:text-[#845007]">
            <li className="leading-relaxed">{t("about.privacy.point31")}</li>
            <li className="leading-relaxed">{t("about.privacy.point32")}</li>
            <li className="leading-relaxed">{t("about.privacy.point33")}</li>
            <li className="leading-relaxed">{t("about.privacy.point34")}</li>
            <li className="leading-relaxed">{t("about.privacy.point35")}</li>
            <li className="leading-relaxed">{t("about.privacy.point36")}</li>
            <li className="leading-relaxed">{t("about.privacy.point37")}</li>
            <li className="leading-relaxed">{t("about.privacy.point38")}</li>
            <li className="leading-relaxed">{t("about.privacy.point39")}</li>
          </ul>
          <p className="text-[#3a4660]/80  leading-relaxed ml-9 mb-3">
            {t("about.privacy.section3Text")}
          </p>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              4
            </span>
            {t("about.privacy.section4Title")}
          </h3>
          <p
            className="text-[#3a4660]/80 base-text  leading-relaxed ml-9 "
            dangerouslySetInnerHTML={{
              __html: t("about.privacy.section4Desc"),
            }}
          ></p>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              5
            </span>
            {t("about.privacy.section5Title")}
          </h3>
          <p className="text-[#3a4660]/80 base-text leading-relaxed ml-9 mb-3">
            {t("about.privacy.section5Subtitle")}
          </p>
          <ul className="ml-9 list-disc base-text list-inside text-[#3a4660]/80 space-y-2 marker:text-[#845007]">
            <li className="leading-relaxed">{t("about.privacy.point51")}</li>
            <li className="leading-relaxed">{t("about.privacy.point52")}</li>
            <li className="leading-relaxed">{t("about.privacy.point53")}</li>
            <li className="leading-relaxed">{t("about.privacy.point54")}</li>
            <li className="leading-relaxed">{t("about.privacy.point55")}</li>
            <li className="leading-relaxed">{t("about.privacy.point56")}</li>
            <li className="leading-relaxed">{t("about.privacy.point57")}</li>
            <li className="leading-relaxed">{t("about.privacy.point58")}</li>
            <li className="leading-relaxed">{t("about.privacy.point59")}</li>
            <li className="leading-relaxed">{t("about.privacy.point510")}</li>
            <li className="leading-relaxed">{t("about.privacy.point511")}</li>
            <li className="leading-relaxed">{t("about.privacy.point512")}</li>
          </ul>

          <p className="text-[#3a4660]/80 base-text leading-relaxed ml-9 ">
            {t("about.privacy.section5Text")}
          </p>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              6
            </span>
            {t("about.privacy.section6Title")}
          </h3>
          <p className="text-[#3a4660]/80 base-text leading-relaxed ml-9 mb-3">
            {t("about.privacy.section6Subtitle")}
          </p>
          <ul className="ml-9 list-disc list-inside text-[#3a4660]/80 base-text space-y-2 marker:text-[#845007]">
            <li className="leading-relaxed">{t("about.privacy.point61")}</li>
            <li className="leading-relaxed">{t("about.privacy.point62")}</li>
            <li className="leading-relaxed">{t("about.privacy.point63")}</li>
            <li className="leading-relaxed">{t("about.privacy.point64")}</li>
            <li className="leading-relaxed">{t("about.privacy.point65")}</li>
            <li className="leading-relaxed">{t("about.privacy.point66")}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              7
            </span>
            {t("about.privacy.section7Title")}
          </h3>
          <p
            className="text-[#3a4660]/80 base-text leading-relaxed ml-9 mb-3"
            dangerouslySetInnerHTML={{
              __html: t("about.privacy.section7Text"),
            }}
          ></p>
          <h6 className="font-bold ml-9 base-text">
            {t("about.privacy.section7Heading")}
          </h6>
          <ul className="ml-9 list-disc text-[#3a4660]/80 list-inside base-text  space-y-2 marker:text-[#845007]">
            <li className="leading-relaxed">{t("about.privacy.point71")}</li>
            <li className="leading-relaxed">{t("about.privacy.point72")}</li>
            <li className="leading-relaxed">{t("about.privacy.point73")}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              8
            </span>
            {t("about.privacy.section8Title")}
          </h3>
          <p className="text-[#3a4660]/80 base-text leading-relaxed ml-9 mb-3">
            {t("about.privacy.section8Subtitle")}
          </p>

          <ul className="ml-9 list-disc text-[#3a4660]/80 base-text list-inside space-y-2 marker:text-[#845007]">
            <li className="leading-relaxed">{t("about.privacy.point81")}</li>
            <li className="leading-relaxed">{t("about.privacy.point82")}</li>
            <li className="leading-relaxed">{t("about.privacy.point83")}</li>
            <li className="leading-relaxed">{t("about.privacy.point84")}</li>
            <li className="leading-relaxed">{t("about.privacy.point85")}</li>
            <li className="leading-relaxed">{t("about.privacy.point86")}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              9
            </span>
            {t("about.privacy.section9Title")}
          </h3>
          <p className="text-[#3a4660]/80 base-text leading-relaxed ml-9 mb-3">
            {t("about.privacy.section9Subtitle")}
          </p>
          <h6 className="font-bold base-text">
            {t("about.privacy.section7Heading")}
          </h6>
          <ul className="ml-9 list-disc text-[#3a4660]/80 base-text list-inside space-y-2 marker:text-[#845007]">
            <li className="leading-relaxed">{t("about.privacy.point91")}</li>
            <li className="leading-relaxed">{t("about.privacy.point92")}</li>
            <li className="leading-relaxed">{t("about.privacy.point93")}</li>
            <li className="leading-relaxed">{t("about.privacy.point94")}</li>
            <li className="leading-relaxed">{t("about.privacy.point95")}</li>
            <li className="leading-relaxed">{t("about.privacy.point96")}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              10
            </span>
            {t("about.privacy.section10Title")}
          </h3>
          <p className="text-[#3a4660]/80 base-text leading-relaxed ml-9 mb-3">
            {t("about.privacy.section10Subtitle")}
          </p>

          <ul className="ml-9 list-disc text-[#3a4660]/80 base-text list-inside space-y-2 marker:text-[#845007]">
            <li className="leading-relaxed">{t("about.privacy.point101")}</li>
            <li className="leading-relaxed">{t("about.privacy.point102")}</li>
            <li className="leading-relaxed">{t("about.privacy.point103")}</li>
            <li className="leading-relaxed">{t("about.privacy.point104")}</li>
            <li className="leading-relaxed">{t("about.privacy.point105")}</li>
            <li className="leading-relaxed">{t("about.privacy.point106")}</li>
            <li className="leading-relaxed">{t("about.privacy.point107")}</li>
          </ul>
          <p className="text-[#3a4660]/80 base-text leading-relaxed ml-9 mb-3">
            {t("about.privacy.section10Text")}
          </p>
        </div>

        <div>
          <h3 className="font-bold subheading text-[#3a4660] mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#845007]/10 rounded-lg  font-bold text-[#845007] shrink-0">
              11
            </span>
            {t("about.privacy.section11Title")}
          </h3>
          <p
            className="text-[#3a4660]/80 base-text leading-relaxed ml-9 mb-3"
            dangerouslySetInnerHTML={{
              __html: t("about.privacy.section11Subtitle"),
            }}
          ></p>
        </div>
      </div>

      {/* Appeal Contacts */}
      {/* <div className="bg-[#845007]/10 rounded-2xl p-6 border border-[#845007]/30">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex h-10 w-10 items-center justify-center bg-[#845007]/20 rounded-full shrink-0">
            <FaInfoCircle className="text-[#845007] text-xl" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-[#3a4660] mb-1">
              {t("about.privacy.contactsTitle")}
            </div>
            <p className="text-[#3a4660]/70  leading-relaxed">
              {t("about.privacy.contactsInfo")}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 ml-14">
          <div className="flex items-center gap-2 ">
            <div className="flex h-8 w-8 items-center justify-center bg-[#845007]/20 rounded-lg shrink-0">
              <FaEnvelope className="text-[#845007] text-sm" />
            </div>
            <a
              href="mailto:privacy@healthdirect.ru"
              className="text-[#3a4660]/90 hover:text-[#845007] transition-colors font-medium"
            >
              privacy@healthdirect.ru
            </a>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="flex h-8 w-8 items-center justify-center bg-[#845007]/20 rounded-lg shrink-0">
              <FaPhoneAlt className="text-[#845007] text-sm" />
            </div>
            <span className="text-[#3a4660]/90 font-medium">
              +7 (495) 123-45-67, доб. 105
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#845007]/5 rounded-xl p-4 border border-[#845007]/20">
        <p className="text-[#3a4660]/70  italic leading-relaxed">
          {t("about.privacy.footer")}
        </p>
      </div> */}
    </div>
  );
};

export default AboutPrivacyPolicy;
