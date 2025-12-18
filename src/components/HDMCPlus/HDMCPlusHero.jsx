import React from "react";
import { FaCrown, FaPhoneAlt } from "react-icons/fa";
import WaveBackground from "../WaveBackground";

const HDMCPlusHero = () => (
  <section className="max-w-[87rem] mt-20 lg:mt-52 text-center mx-auto px-4 ">
    <div className="relative rounded-xl  mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
      <WaveBackground
        stroke="rgba(151, 186, 189,"
        custStyle="md:w-1/2 h-1/2 right-0 bottom-0"
      />
      <div className="w-full   h-full z-30 -mb-[1px] md:-mb-0">
        <div className="relative w-full  h-full">
          {" "}
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2554915839/display_1500/stock-photo-healthcare-professional-holds-a-health-card-symbolizing-modern-patient-identification-efficient-2554915839.jpg"
            alt="Membership illustration"
            className="max-w-2xl w-full md:min-h-80 max-h-48 md:max-h-full h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
          />
          <div
            className={`absolute   inset-0 bg-gradient-to-t via-30%  md:bg-gradient-to-l from-[#708b9c] via-[#708b9c]/40 to-transparent  `}
          ></div>
        </div>
      </div>
      <div className="text-left md:text-right w-full md:min-h-96  h-full  p-6  md:p-6 lg:pr-10 xl:pr-12 bg-gradient-to-t md:bg-gradient-to-l from-[#b2c3d2] flex flex-col justify-center to-[#708b9c]">
        <div className="flex justify-center md:justify-end z-40 mb-2 small-text lg:base-text">
          <span className="flex items-center gap-2 px-7 py-2.5  font-semibold rounded-full bg-brand1/60 text-white ">
            <FaCrown className="  " />
            HDMC+ Премиум Членство
          </span>
        </div>
        <h1 className="text-white relative z-40 text-center md:text-right text-4xl lg:text-[3.5rem]  font-bold mb-4 ">
          Медицина будущего уже сегодня
        </h1>
        <div className="text-gray-100 relative z-40 text-center md:text-right lg:text-xl  max-w-4xl mb-4 lg:mb-10">
          Присоединяйтесь к эксклюзивной программе членства и получите доступ к
          премиальным медицинским услугам мирового уровня
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 justify-end">
          <button className="bg-brand1 relative z-40 text-white font-semibold px-8 py-3 lg:text-lg rounded-lg hover:bg-[#0e4967] transition-all duration-300  cursor-pointer ">
            Присоединиться к HDMC+
          </button>
          <button className="flex items-center gap-3 bg-white px-8 py-3 lg:text-lg rounded-lg font-semibold relative z-40 text-brand1 hover:bg-gray-200 transition-all duration-300 cursor-pointer  ">
            <FaPhoneAlt className="text-brand4 text-xl" />
            Консультация
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default HDMCPlusHero;
