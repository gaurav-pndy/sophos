import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiUsers } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { FaRegClock, FaStethoscope, FaUser } from "react-icons/fa";
import WaveBackground from "../WaveBackground";
import { Link } from "react-router-dom";
import { FaUserDoctor, FaUsersLine } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { RiPsychotherapyLine } from "react-icons/ri";
import BookingPopup from "../BookingPopup";

const features = [
  {
    icon: <LuBuilding2 className="text-white text-lg" />,
    title: "aboutClinic.feature1.title",
    desc: "aboutClinic.feature1.desc",
  },
  {
    icon: <RiPsychotherapyLine className="text-white text-lg" />,
    title: "aboutClinic.feature2.title",
    desc: "aboutClinic.feature2.desc",
  },
  {
    icon: <FaUserDoctor className="text-white text-lg" />,
    title: "aboutClinic.feature3.title",
    desc: "aboutClinic.feature3.desc",
  },
  {
    icon: <FaStethoscope className="text-white text-lg" />,
    title: "aboutClinic.feature4.title",
    desc: "aboutClinic.feature4.desc",
  },
  // {
  //   icon: <FaUser className="text-white text-lg" />,
  //   title: "aboutClinic.feature5.title",
  //   desc: "aboutClinic.feature5.desc",
  // },
];

const stats = [
  { value: "aboutClinic.stat1.value", label: "aboutClinic.stat1.label" },
  { value: "aboutClinic.stat2.value", label: "aboutClinic.stat2.label" },
  {
    label: "aboutClinic.stat3.label",
    icon: <FaUsersLine className="text-4xl text-brand1 mb-1" />,
  },
  {
    label: "aboutClinic.stat4.label",
    icon: <GiMedicines className="text-4xl text-brand1 mb-1" />,
  },
];

const AboutSection = () => {
  const { t } = useTranslation();
  const [showBookingPopup, setShowBookingPopup] = useState(false);

  return (
    <section id="about" className="w-full py-6 mt-6 ">
      <div className="max-w-[87rem] mx-auto px-4">
        <div
          className="relative mx-auto p-4 md:p-6 rounded-xl w-full h-full
  bg-gradient-to-r from-[#eae9e3] via-[#f5f5f2] to-[#ffffff]"
        >
          <WaveBackground
            stroke="rgba(340, 340, 340,"
            custStyle="md:w-2/3 h-1/2 left-0 top-0"
          />

          {/* Top Section - Text + Image */}
          <div className="flex flex-col lg:flex-row gap-6 xl:gap-10 items-center">
            {/* Left - Text & Features */}
            <div className="flex flex-col gap-4">
              <h2
                className="text-black heading1 leading-10 font-bold relative z-40 "
                dangerouslySetInnerHTML={{ __html: t("aboutClinic.title") }}
              ></h2>

              <div
                className="text-black base-text"
                dangerouslySetInnerHTML={{ __html: t("aboutClinic.desc") }}
              ></div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-2 ">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-2 xl:items-center xl:gap-4">
                    <div className="flex h-8 w-8 items-center justify-center bg-gradient-to-br z-40 from-[#125e84] to-[#33babd] rounded-lg shrink-0 mt-1 xl:mt-0">
                      {f.icon}
                    </div>
                    <div>
                      <div className="text-black z-40 base-text leading-tight font-semibold">
                        {t(f.desc)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-bold text-black base-text ">
                {t("aboutClinic.footnote")}
              </p>

              {/* Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={"/about"}
                  className="bg-brand1 relative z-40 text-white font-semibold rounded-lg px-8 py-2.5 base-text shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 w-fit text-center"
                >
                  {t("moreBtn")}
                </Link>
                <button
                  onClick={() => setShowBookingPopup(true)}
                  className="bg-brand1 relative z-40 text-white font-semibold rounded-lg px-8 py-2.5 base-text shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 w-fit text-center"
                >
                  {t("aboutClinic.bookBtn")}
                </button>
              </div>
            </div>

            {/* Right - Image with background blending */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative max-w-3xl lg:w-sm xl:w-md">
                {/* Background color overlay to blend with the main background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#e6e4db] via-[#e6e4db] to-[#f6f4ec] mix-blend-multiply rounded-xl"></div>

                {/* Image with gradient mask for smooth blending */}
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e6e4db] via-transparent to-[#f6f4ec] opacity-70 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#e6e4db] via-transparent to-transparent opacity-50 z-10"></div>
                  <img
                    src="/about-hosp.jpg"
                    alt="About Clinic"
                    className="w-full h-full object-cover relative z-0"
                    style={{
                      maskImage:
                        "linear-gradient(to right, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingPopup && (
        <BookingPopup
          show={showBookingPopup}
          onClose={() => setShowBookingPopup(false)}
        />
      )}
    </section>
  );
};

export default AboutSection;
