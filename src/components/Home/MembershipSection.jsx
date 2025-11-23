import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { IoDocumentTextOutline, IoShieldOutline } from "react-icons/io5";
import { LuCrown, LuUsers } from "react-icons/lu";
import { RiStethoscopeFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import WaveBackground from "../WaveBackground";
import { Link } from "react-router-dom";

const MembershipSection = () => {
  // Which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);

  const { t } = useTranslation();

  // FEATURES
  const features = [
    {
      icon: <CiCalendar className="text-white text-4xl" />,
      title: t("membership.features.feature1.title"),
      text: t("membership.features.feature1.desc"),
    },
    {
      icon: <IoShieldOutline className="text-white text-4xl" />,
      title: t("membership.features.feature2.title"),
      text: t("membership.features.feature2.desc"),
    },
    {
      icon: <LuUsers className="text-white text-4xl" />,
      title: t("membership.features.feature3.title"),
      text: t("membership.features.feature3.desc"),
    },
    {
      icon: <RiStethoscopeFill className="text-white text-4xl" />,
      title: t("membership.features.feature4.title"),
      text: t("membership.features.feature4.desc"),
    },
    {
      icon: <IoDocumentTextOutline className="text-white text-4xl" />,
      title: t("membership.features.feature5.title"),
      text: t("membership.features.feature5.desc"),
    },
    {
      icon: <FiCheckCircle className="text-white text-4xl" />,
      title: t("membership.features.feature6.title"),
      text: t("membership.features.feature6.desc"),
    },
  ];

  return (
    <section className="w-full bg-[#fbfbfb] py-10">
      <div className="max-w-[87rem] text-center mx-auto px-4 ">
        <section className="relative rounded-xl  mx-auto  items-center overflow-hidden ">
          {/* <WaveBackground
            stroke="rgba(151, 186, 189,"
            custStyle="md:w-1/2 h-1/2 right-0 bottom-0"
          /> */}
          {/* <div className="w-full   h-full z-30 -mb-[1px] md:-mb-0">
            <div className="relative w-full  h-full">
              {" "}
              <img
                src="https://www.shutterstock.com/shutterstock/photos/2554915839/display_1500/stock-photo-healthcare-professional-holds-a-health-card-symbolizing-modern-patient-identification-efficient-2554915839.jpg"
                alt="Membership illustration"
                className="max-w-2xl w-full md:min-h-80 max-h-46 md:max-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
              />
              <div
                className={`absolute   inset-0 bg-gradient-to-t via-30%  md:bg-gradient-to-l from-[#708b9c] via-[#708b9c]/40 to-transparent  `}
              ></div>
            </div>
          </div> */}
          <div className="text-center w-full  h-full   ">
            <div className="flex justify-center z-40">
              <span className="bg-brand3 px-4 py-2 text-white  rounded-full font-medium mb-4 flex items-center gap-2">
                <LuCrown className="text-lg" /> {t("membership.badge")}
              </span>
            </div>
            <h2 className="text-brand1 mx-auto z-40 text-4xl md:text-5xl font-bold mb-6">
              {" "}
              {t("membership.title")}
            </h2>
            <p className="md:text-lg z-40  text-brand1/80  max-w-3xl mx-auto ">
              {t("membership.subtitle")}
            </p>
          </div>
        </section>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mt-10 md:mt-14 mb-14">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl px-8 py-7 flex flex-col items-center text-center hover:scale-105 hover:bg-brand4/20 hover:shadow-lg cursor-pointer shadow-md transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#125e84] to-[#33babd] group-hover:from-brand2 group-hover:to-brand1 group-hover:rotate-15 group-hover:scale-110 flex items-center justify-center shrink-0   transition-all duration-300 mb-1">
                {f.icon}
              </div>
              <div className="text-black group-hover:text-brand2 transition-all duration-300 font-medium text-xl mb-2">
                {f.title}
              </div>
              <div className="text-brand1 group-hover:text-brand2 transition-all duration-300 text-base">
                {f.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 mb-2">
          <Link
            to={"/hdmc-plus"}
            className="bg-brand1 text-white font-semibold rounded-lg px-8 py-3 shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 block mx-auto"
          >
            {t("moreBtn")}
          </Link>
        </div>

        {/* FAQ Accordion */}
      </div>
    </section>
  );
};

export default MembershipSection;
