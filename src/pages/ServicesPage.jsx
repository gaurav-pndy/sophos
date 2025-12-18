import React from "react";
import WaveBackground from "../components/WaveBackground";
import { useTranslation } from "react-i18next";
import {
  FaFileMedical,
  FaFlask,
  FaHandshake,
  FaHospital,
  FaMicroscope,
  FaPlus,
  FaSyringe,
  FaUserMd,
  FaXRay,
} from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { Link } from "react-router-dom";
import servicesConfig from "../config/servicesConfig";

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = servicesConfig;

  return (
    <div className="w-full bg-[#fbfbfc] py-12 max-w-[87rem] text-center mx-auto px-4">
      <section className="relative rounded-xl  mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
        <WaveBackground
          stroke="rgba(251, 186, 189,"
          custStyle="md:w-1/2 h-[65%] left-0 top-0"
        />
        <div className="text-left  w-full md:min-h-96  h-full  p-6 pb-16 md:p-6 flex flex-col justify-center bg-gradient-to-b md:bg-gradient-to-r from-[#012135] to-[#4378a0]">
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

      <div className="grid mt-10 md:mt-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-10">
        {services.map((service, index) => (
          <Link
            to={`/all-services/${service.slug}`}
            key={service.slug}
            className="flex items-center  group gap-6 cursor-pointer bg-white rounded-2xl border border-[#845007]/10 shadow-sm p-4 "
          >
            <span className=" rounded-full text-2xl xl:text-3xl   group-hover:rotate-12 group-hover:scale-110 items-center justify-center shrink-0 transition-all duration-300  text-[#e9865f] mt-1">
              <service.icon />
            </span>

            <div>
              <h3 className="text-left group-hover:text-brand3 group-hover:scale-105 font-semibold transition-all duration-300 cursor-pointer text-brand1 mb-1 base-text leading-snug">
                {t(service.title)}
              </h3>
              <p className="text-left group-hover:text-brand3 group-hover:scale-105 transition-all duration-300 cursor-pointer text-brand4  small-text leading-snug">
                {t(service.subtitle)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
