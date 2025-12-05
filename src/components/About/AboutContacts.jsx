import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegBuilding,
  FaCheckCircle,
  FaGlobe,
} from "react-icons/fa";

const contacts = [
  {
    title: "about.contacts.heading1",
    // subtitle: "about.contacts.roszdravnadzorDesc",
    address: "about.contacts.address1",
    phone: "8 (800) 555-49-43",
    email: "uprav@77.rospotrebnadzor.ru",
    website: "http://77.rospotrebnadzor.ru",
  },
  {
    title: "about.contacts.heading2",
    // subtitle: "about.contacts.",
    address: "about.contacts.address2",
    phone: "8 (495) 777-77-77",
    email: "zdrav@mos.ru",
    website: "https://mosgorzdrav.ru/ru-RU/index.html",
  },
  {
    title: "about.contacts.heading3",
    // subtitle: "about.contacts.address3",
    address: "about.contacts.address3",
    phone: "8 (916) 256-76-76",
    email: "office@reg77.roszdravnadzor.gov.ru",
    website: "https://77reg.roszdravnadzor.gov.ru/",
  },
  {
    title: "about.contacts.heading4",
    // subtitle: "about.contacts.address3",
    address: "about.contacts.address4",
    phone: "8 (499) 578-02-20",
    email: "info@roszdravnadzor.gov.ru",
    website: "https://roszdravnadzor.gov.ru/spec",
  },
  {
    title: "about.contacts.heading5",
    // subtitle: "about.contacts.address3",
    address: "about.contacts.address5",
    email: "info@minzdrav.gov.ru",
    website: "https://minzdrav.gov.ru/",
    helpdesk: "8 (495) 627-29-44",
    multichannel: "8 (495) 627-24-00",
    desc1: "about.contacts.desc1",
    desc2: "about.contacts.desc2",
  },
];

const AboutContacts = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#63cacc]/20 shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row lg:items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center bg-gradient-to-br from-[#125e84] to-[#33babd] rounded-xl shrink-0 shadow-md">
            <FaRegBuilding className="text-white text-3xl" />
          </div>
          <div>
            <h3 className="heading1 font-bold text-[#125e84] ">
              {t("about.contacts.title")}
            </h3>
            <p className="text-[#125e84]/70 base-text">
              {t("about.contacts.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Agency cards */}
      <div className="space-y-6">
        {contacts.map((org, idx) => (
          <div
            key={org.title}
            className="bg-white rounded-2xl border border-[#63cacc]/20 shadow-sm p-6 hover:border-[#63cacc]/40 transition-colors"
          >
            <div className="mb-4">
              <h3 className="font-bold subheading text-[#125e84] mb-2">
                {t(org.title)}
              </h3>
              {/* <p className="text-[#63cacc] text-sm font-medium">
                {t(org.subtitle)}
              </p> */}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/20 rounded-lg shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-[#63cacc] text-xl" />
                </div>
                <div className="flex-1">
                  <div className="text-[#125e84]/60 small-text uppercase tracking-wide ">
                    {t("about.contacts.address")}
                  </div>
                  <p className="text-[#125e84]/90 font-medium base-text leading-relaxed">
                    {t(org.address)}
                  </p>
                </div>
              </div>

              {org.phone && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/20 rounded-lg shrink-0 mt-0.5">
                    <FaPhoneAlt className="text-[#63cacc] text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#125e84]/60 small-text uppercase tracking-wide ">
                      {t("about.contacts.phone")}
                    </div>
                    <p className="text-[#125e84]/90 base-text font-medium">
                      {org.phone}
                    </p>
                  </div>
                </div>
              )}
              {org.helpdesk && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/20 rounded-lg shrink-0 mt-0.5">
                    <FaPhoneAlt className="text-[#63cacc] text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#125e84]/60 small-text uppercase tracking-wide">
                      {t("about.contacts.helpdesk")}
                    </div>
                    <p className="text-[#125e84]/90 base-text font-medium">
                      {org.helpdesk}
                    </p>
                  </div>
                </div>
              )}
              {org.multichannel && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/20 rounded-lg shrink-0 mt-0.5">
                    <FaPhoneAlt className="text-[#63cacc] text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#125e84]/60 small-text uppercase tracking-wide ">
                      {t("about.contacts.multichannel")}
                    </div>
                    <p className="text-[#125e84]/90 base-text font-medium">
                      {org.multichannel}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/20 rounded-lg shrink-0 mt-0.5">
                  <FaEnvelope className="text-[#63cacc] text-xl" />
                </div>
                <div className="flex-1">
                  <div className="text-[#125e84]/60 small-text uppercase tracking-wide ">
                    {t("about.contacts.email")}
                  </div>
                  <a
                    href={`mailto:${org.email}`}
                    className="text-[#125e84]/90 base-text font-medium hover:text-[#63cacc] transition-colors hover:underline"
                  >
                    {org.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/20 rounded-lg shrink-0 mt-0.5">
                  <FaGlobe className="text-[#63cacc] text-xl" />
                </div>
                <div className="flex-1">
                  <div className="text-[#125e84]/60 small-text uppercase tracking-wide ">
                    {t("about.contacts.website")}
                  </div>
                  <a
                    href={org.website}
                    className="text-[#125e84]/90 base-text font-medium hover:text-[#63cacc] transition-colors hover:underline"
                  >
                    {org.website}
                  </a>
                </div>
              </div>
              {org.desc1 && (
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-[#125e84]/90 small-text font-medium">
                      {t(org.desc1)}
                    </p>
                  </div>
                </div>
              )}
              {org.desc2 && (
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-[#125e84]/90 small-text font-medium">
                      {t(org.desc2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order of appeal notice */}
      <div className="bg-[#63cacc]/10 rounded-2xl p-6 flex items-start gap-4 border border-[#63cacc]/30">
        <div className="flex h-10 w-10 items-center justify-center bg-[#63cacc]/20 rounded-full shrink-0">
          <FaCheckCircle className="text-[#63cacc] text-xl" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#125e84] subheading mb-1">
            {t("about.contacts.appealOrderTitle")}
          </div>
          <p className="text-[#125e84]/70 base-text leading-relaxed">
            {t("about.contacts.appealOrderText")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContacts;
