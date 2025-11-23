import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaHeart,
  FaBrain,
  FaEye,
  FaBone,
  FaHandHoldingMedical,
  FaHeartbeat,
  FaStar,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";
import { doctorsData } from "../../data/doctors.js";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const specialties = [
  {
    id: "cardiology",
    icon: FaHeart,
    title: "telemedicine.specialties.cardiology",
    subtitle: "telemedicine.specialties.cardiologyDesc",
  },
  {
    id: "neurology",
    icon: FaBrain,
    title: "telemedicine.specialties.neurology",
    subtitle: "telemedicine.specialties.neurologyDesc",
  },
  {
    id: "ophthalmology",
    icon: FaEye,
    title: "telemedicine.specialties.ophthalmology",
    subtitle: "telemedicine.specialties.ophthalmologyDesc",
  },
  {
    id: "orthopedics",
    icon: FaBone,
    title: "telemedicine.specialties.orthopedics",
    subtitle: "telemedicine.specialties.orthopedicsDesc",
  },
  {
    id: "therapy",
    icon: FaHandHoldingMedical,
    title: "telemedicine.specialties.therapy",
    subtitle: "telemedicine.specialties.therapyDesc",
  },
  {
    id: "oncology",
    icon: FaHeartbeat,
    title: "telemedicine.specialties.oncology",
    subtitle: "telemedicine.specialties.oncologyDesc",
  },
];

const TelemedicineExperts = () => {
  const { t } = useTranslation();
  const [selectedSpecialty, setSelectedSpecialty] = useState("cardiology");

  // Filter doctors by selected specialty
  const filteredDoctors = selectedSpecialty
    ? doctorsData.filter((doc) => doc.specialty === selectedSpecialty)
    : [];

  return (
    <div className="py-10">
      <div className="max-w-[87rem] mx-auto px-4">
        {/* Specialties Section */}
        <div className="text-center mb-12">
          <h2 className="text-brand1 mx-auto text-4xl md:text-5xl font-bold mb-6">
            {t("telemedicine.specialties.header")}
          </h2>
          <p className="md:text-lg text-brand1/80 mb-8 max-w-3xl mx-auto">
            {t("telemedicine.specialties.subtitle")}
          </p>
        </div>

        {/* Styled Tabs */}
        <div className="grid md:flex flex-wrap justify-between  gap-2 mb-16">
          {specialties.map((specialty) => {
            const Icon = specialty.icon;
            const isSelected = selectedSpecialty === specialty.id;

            return (
              <div
                key={specialty.id}
                onClick={() =>
                  setSelectedSpecialty(isSelected ? null : specialty.id)
                }
                className={`flex items-center gap-3 px-4 py-3 font-semibold rounded-xl cursor-pointer transition-all 
              ${
                isSelected
                  ? "bg-brand1 text-white"
                  : "text-brand1/70 bg-brand4/20 hover:text-brand1"
              }
            `}
              >
                <Icon
                  className={`text-2xl lg:text-3xl ${
                    isSelected ? "text-white" : "text-[#63cacc]"
                  }`}
                />
                <div>
                  <h5>{t(specialty.title)}</h5>
                  <p className="text-xs font-normal">{t(specialty.subtitle)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Doctors Section - Shows when specialty is selected */}
        {selectedSpecialty && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-brand1 mx-auto text-4xl md:text-5xl font-bold mb-6">
                {t("telemedicine.doctors.header")}
              </h2>
              <p className="md:text-lg text-brand1/80 mb-8 max-w-3xl mx-auto">
                {t("telemedicine.doctors.subtitle")}
              </p>
            </div>

            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                {filteredDoctors.map((doc) => (
                  <Link
                    key={doc.id}
                    to={`/doctors/${doc.id}`}
                    className="bg-white my-4 rounded-xl hover:scale-105 hover:bg-brand4/20 hover:shadow-lg cursor-pointer shadow-md transition-all duration-300 p-4 flex flex-col justify-between min-h-[34rem]"
                  >
                    <div className="flex-1 flex flex-col">
                      {/* Add avatar or doctor photo here if you have */}
                      <img
                        src={doc.image}
                        alt={t(doc.name)}
                        className="w-full h-52 object-cover rounded-lg"
                      />
                      <div className="font-bold text-black text-xl mt-4 mb-3">
                        {t(doc.name)}
                      </div>
                      {/* <div className="flex flex-wrap gap-1 mb-3">
                       {doc.tags.map((tag, i) => (
                         <span
                           key={i}
                           className="px-2 py-1 rounded-full border border-brand4 text-black text-xs"
                         >
                           {tag}
                         </span>
                       ))}
                     </div> */}
                      <div className="text-brand1 text-sm mb-3 line-clamp-2">
                        {t(doc.desc)}
                      </div>
                      <div className="flex flex-row gap-4 items-center mb-3 text-brand1/90 text-xs">
                        <span className="flex items-center">
                          <FaLocationDot className="mr-1" /> {t(doc.location)}
                        </span>
                      </div>
                      <div className="text-brand1/60 text-xs">
                        {t("doctors.languages")}:
                      </div>
                      <div className="text-brand1 text-sm font-medium">
                        {t(doc.langs)}
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-2.5 w-full bg-brand1 hover:bg-brand5/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand1/30 text-center">
                      {t("doctors.viewProfile")}
                    </button>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#63cacc]/20">
                <p className="text-[#125e84]/60">
                  {t("telemedicine.doctors.noDoctors")}
                </p>
              </div>
            )}

            <div className="text-center mt-8">
              <Link
                to={"/doctors"}
                className="px-6 py-3 border-2 border-brand1 w-fit text-brand1 rounded-lg font-medium hover:bg-brand1 hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                {t("telemedicine.doctors.viewAll")}

                <FaArrowRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelemedicineExperts;
