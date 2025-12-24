import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { servicesData } from "../../data/services";
import WaveBackground from "../WaveBackground";

const ServicesSection = () => {
  const { t } = useTranslation();
  const services = servicesData;

  return (
    <section id="services" className="w-full bg-[#fbfbfc] py-6">
      <div className="max-w-[87rem] text-center mx-auto px-4">
        <section className="relative rounded-xl  mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
          <WaveBackground
            stroke="rgba(251, 186, 189,"
            custStyle="md:w-1/2 h-[65%] left-0 top-0"
          />
          <div className="text-left  w-full md:min-h-96  h-full  p-6 pb-16 md:p-6 flex flex-col  bg-gradient-to-b md:bg-gradient-to-r from-[#012135] to-[#4378a0]">
            <h2 className="text-white z-40 heading1 leading-10 font-bold mb-4">
              {t("services.title")}
            </h2>
            <p
              className="base-text z-40 text-white"
              dangerouslySetInnerHTML={{ __html: t("services.subtitle") }}
            ></p>
          </div>
          <div className="w-full   h-full z-30 -mt-[2px] md:-mt-0">
            <div className="relative w-full  h-full">
              <img
                src="https://www.shutterstock.com/shutterstock/photos/2650049105/display_1500/stock-photo-health-care-insurance-medical-protection-online-system-patient-safety-hospital-services-claim-2650049105.jpg"
                alt="Services illustration"
                className=" w-full md:min-h-96 max-h-[28rem] h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
              />
              <div
                className={`absolute   inset-0 bg-gradient-to-b via-30%  md:bg-gradient-to-r from-[#4378a0] via-[#4378a0]/40 to-transparent  `}
              ></div>
            </div>
          </div>
        </section>

        {/* --- Services Grid --- */}
        <div className="grid mt-10 md:mt-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.id}`}
              key={index}
              className="flex  items-center group gap-4 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full from-brand1 to-brand4 flex items-center justify-center shrink-0 group-hover:rotate-15 bg-gradient-to-br group-hover:from-brand2 group-hover:to-brand1 transition-all duration-300 group-hover:scale-110">
                <img
                  src={service.image}
                  alt={t(service.title)}
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>

              <div>
                <h3 className="text-left group-hover:text-brand4 group-hover:scale-105 transition-all duration-300 cursor-pointer text-gray-900 mb-1 base-text leading-snug">
                  {t(service.title)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
