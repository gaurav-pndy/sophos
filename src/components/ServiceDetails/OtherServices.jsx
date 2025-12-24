import React from "react";
import { servicesData } from "../../data/services";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const OtherServices = () => {
  const { t } = useTranslation();
  const services = servicesData;

  const { serviceId } = useParams();
  const currentService = servicesData.find((s) => s.id === serviceId);
  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Link
            to={`/services/${service.id}`}
            key={index}
            className={`flex flex-col p-4 rounded-xl group gap-2 cursor-pointer transition-colors duration-300 `}
            style={
              service.id === currentService.id
                ? {
                    background: `linear-gradient(to right, ${service.color1}, ${service.color2})`,
                  }
                : undefined
            }
          >
            <div className="w-14 h-14 rounded-full from-brand1 to-brand4 flex items-center justify-center shrink-0 group-hover:rotate-15 bg-gradient-to-br group-hover:from-brand2 group-hover:to-brand1 transition-all duration-300 group-hover:scale-110">
              <img
                src={service.image}
                alt={t(service.title)}
                className="w-8 h-8 object-contain brightness-0 invert"
              />
            </div>

            <div>
              <h3
                className={`text-left base-text  group-hover:scale-105 transition-all duration-300 cursor-pointer ${
                  service.id === currentService.id
                    ? "text-white"
                    : "text-gray-900 group-hover:text-brand4"
                }  mb-1  leading-snug`}
              >
                {t(service.title)}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherServices;
