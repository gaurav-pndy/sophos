import React from "react";
import { useTranslation } from "react-i18next";
import { FaUserShield } from "react-icons/fa";
import WaveBackground from "../WaveBackground";

const OncoInsurance = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-[87rem] mt-6 text-center mx-auto px-4 ">
      <div className="relative rounded-xl  mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-80">
        <WaveBackground
          stroke="rgba(151, 186, 189,"
          custStyle="md:w-1/2 h-1/2 right-0 bottom-0"
        />
        <div className="w-full   h-full z-30 -mb-[1px] md:-mb-0">
          <div className="relative w-full  h-full">
            {" "}
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2549072741/display_1500/stock-photo-doctor-holding-a-holographic-shield-with-a-medical-cross-symbolizing-healthcare-protection-2549072741.jpg"
              alt="Membership illustration"
              className="max-w-2xl w-full md:min-h-80 max-h-48 md:max-h-auto h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
            />
            <div
              className={`absolute   inset-0 bg-gradient-to-t via-30%  md:bg-gradient-to-l from-[#a4b5bf] via-[#a4b5bf]/40 to-transparent  `}
            ></div>
          </div>
        </div>
        <div className="text-left md:text-right w-full md:min-h-80  h-full  p-6  md:p-6  bg-gradient-to-t md:bg-gradient-to-l from-[#303b4b] flex flex-col justify-center to-[#a4b5bf]">
          <div className="flex flex-col gap-4 items-start md:items-end text-white  w-full">
            <div className="flex items-center z-40 gap-3 ">
              <FaUserShield className="text-3xl" />
              <span className="heading1 leading-10 font-bold">
                {t("earlyDetection.insurance.title")}
              </span>
            </div>
            <div className="base-text relative z-40 font-normal mb-3">
              {t("earlyDetection.insurance.desc")}
            </div>
            <button className=" bg-white relative z-40 text-brand1 font-semibold base-text px-7 py-2.5 base-text rounded-lg shadow hover:bg-transparent border border-white transition-all duration-300 cursor-pointer hover:text-white">
              {t("earlyDetection.insurance.button")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OncoInsurance;
