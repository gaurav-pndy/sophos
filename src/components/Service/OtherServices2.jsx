import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { servicesConfig } from "../../data/servicesConfig";

const OtherServices2 = () => {
  const { t } = useTranslation();
  const services = servicesConfig;

  const { serviceId } = useParams();
  const currentService = servicesConfig.find((s) => s.slug === serviceId);
  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-10">
        {services.map((service, index) => (
          <Link
            to={`/all-services/${service.slug}`}
            key={service.slug}
            style={
              service.slug === currentService.slug
                ? {
                    background: `linear-gradient(to right, ${service.color1}, ${service.color2})`,
                  }
                : undefined
            }
            className="flex items-center  group gap-6 cursor-pointer bg-white rounded-2xl  shadow-sm p-4 "
          >
            <span className=" rounded-full text-2xl xl:text-3xl   shake-once group-hover:scale-110 items-center justify-center shrink-0 transition-all duration-300  text-[#e9865f] mt-1">
              <service.icon />
            </span>

            <div>
              <h3
                className={`text-left group-hover:text-brand3 group-hover:scale-105 font-semibold transition-all duration-300 cursor-pointer ${
                  service.slug === currentService.slug
                    ? "text-white"
                    : "text-brand1"
                } mb-1 base-text leading-snug`}
              >
                {t(service.title)}
              </h3>
              <p
                className={`text-left group-hover:text-brand3 group-hover:scale-105 transition-all duration-300 cursor-pointer ${
                  service.slug === currentService.slug
                    ? "text-white"
                    : "text-brand4"
                }  small-text leading-snug`}
              >
                {t(service.subtitle)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherServices2;
