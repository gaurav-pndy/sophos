import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Official TopoJSON file
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const PatientMap = () => {
  const { t } = useTranslation();

  const [hovered, setHovered] = useState(null);

  const locations = [
    {
      country: t("patientMap.russia"),
      code: "ru",
      patients: 156,
      color: "#DDA0DD",
      coords: [37.6, 55.75],
    },
    {
      country: t("patientMap.india"),
      code: "in",
      patients: 91,
      color: "#FFD93D",
      coords: [78, 20],
    },
    {
      country: t("patientMap.usa"),
      code: "us",
      patients: 145,
      color: "#FF6B6B",
      coords: [-95, 37],
    },
    {
      country: t("patientMap.poland"),
      code: "pl",
      patients: 89,
      color: "#4ECDC4",
      coords: [19, 52],
    },
    {
      country: t("patientMap.hungary"),
      code: "hu",
      patients: 67,
      color: "#45B7D1",
      coords: [19, 47],
    },
    {
      country: t("patientMap.uk"),
      code: "gb",
      patients: 112,
      color: "#96CEB4",
      coords: [-3, 54],
    },
    {
      country: t("patientMap.switzerland"),
      code: "ch",
      patients: 78,
      color: "#FFEAA7",
      coords: [8, 47],
    },
  ];

  const totalPatients = locations.reduce((sum, loc) => sum + loc.patients, 0);

  return (
    <div className="w-full py-10">
      <div className="max-w-[87rem] w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-brand1 mx-auto px-4 text-center text-4xl md:text-5xl font-bold mb-6">
            {t("patientMap.title")}
          </h2>
          <p className="md:text-lg px-4 text-center text-brand1/90  max-w-3xl mx-auto mb-10">
            {t("patientMap.subtitle")}
          </p>
        </div>

        {/* Map */}
        <div className="bg-[#fbfbfb] rounded-xl border border-brand4 p-4 md:p-6">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140 }}
            width={1200}
            height={350}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup
              zoom={0.6}
              minZoom={0.5}
              maxZoom={8}
              center={[20, 50]}
              zoomOnScroll={false}
            >
              {/* Draw countries */}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#E3F2FD"
                      stroke="#90CAF9"
                      strokeWidth={0.3}
                      style={{
                        default: { fill: "#125e84", outline: "none" },
                        hover: { fill: "#af6ca5", outline: "none" },
                        pressed: { fill: "#64B5F6", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Add patient markers */}
              {locations.map((loc, idx) => (
                <Marker
                  key={idx}
                  coordinates={loc.coords}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <FaMapMarkerAlt
                    x={-8}
                    y={-12}
                    size={hovered === idx ? 24 : 20}
                    color={loc.color}
                    className="cursor-pointer"
                  />

                  {hovered === idx && (
                    <foreignObject x={-50} y={-60} width={100} height={40}>
                      <div className="bg-white border border-gray-200 shadow-md rounded-md text-xs px-2 py-1 text-center">
                        <span className="font-medium">{loc.country}</span>{" "}
                        <br />
                        <span className="text-brand1">
                          {loc.patients} {t("patientMap.patients")}
                        </span>
                      </div>
                    </foreignObject>
                  )}
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Statistics Grid */}
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="mt-8"
          >
            {locations.map((loc, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`border border-brand4/30 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    hovered === idx ? "shadow-lg scale-105" : ""
                  }`}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex flex-col items-center text-center space-y-1">
                    {/* Flag */}
                    <img
                      src={`https://flagcdn.com/w40/${loc.code}.png`}
                      alt={`${loc.country} flag`}
                      className="w-8 h-6 object-cover rounded shadow-lg"
                    />

                    {/* Country + Patients */}
                    <div className="font-medium text-black">{loc.country}</div>
                    <div className="text-brand1 text-xs">
                      {loc.patients} {t("patientMap.patients")}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PatientMap;
