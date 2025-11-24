import React from "react";
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
  {
    icon: <FaUser className="text-white text-lg" />,
    title: "aboutClinic.feature5.title",
    desc: "aboutClinic.feature5.desc",
  },
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

  return (
    <section id="about" className="w-full py-6 mt-6 ">
      <div className="max-w-[87rem] mx-auto px-4">
        <div className=" relative bg-gradient-to-r from-gray-300  to-gray-100 mx-auto p-4 md:p-6 rounded-xl w-full h-full">
          <WaveBackground
            stroke="rgba(340, 340, 340,"
            custStyle="md:w-1/2 h-1/2 left-0 top-0"
          />
          {/* Top Section - Text + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left - Text & Features */}
            <div className="flex flex-col gap-4">
              <h2 className="text-brand1 text-[2rem] leading-10 font-bold relative z-40 ">
                {t("aboutClinic.title")}
              </h2>
              {/* <p className="text-lg text-brand1/80 mb-4 relative z-40 max-w-3xl">
              {t("aboutClinic.subtitle")}
            </p> */}

              <div className="text-brand1/90 ">
                Многопрофильная клиника экспертного уровня в Москве.
                Уникальность клиники заключается в объединении медицинских
                знаний и мудрости по отношению к каждому пациенту. Мы лечим не
                болезнь, а человека с его характером, физиологическими
                особенностями и потребностями. Каждый специалист клиники, помимо
                своей специализации, имеет опыт ведения онкологических пациентов
                и онкологическую настороженность. Таким образом, диагностика и
                лечение в клинике проходит на высшем уровне с учетом знаний о
                профилактике, раннем выявлении, лечении, ведении, дообследовании
                всех пациентов, в том числе и онкологических. Внимательное,
                выверенное многолетним опытом отношение к диагностике и лечению
                всех заболеваний - наш приоритет! Мы профессионально занимаемся
                всеми пациентами, без лишней тревоги, с уверенностью в каждом
                шаге.
              </div>

              {/* Features */}
              <div className="flex flex-col gap-2 ">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center bg-gradient-to-br z-40 from-[#125e84] to-[#33babd] rounded-lg shrink-0 ">
                      {f.icon}
                    </div>
                    <div>
                      <div className="text-brand1/90 z-40  leading-tight">
                        {t(f.desc)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-bold text-brand1/90 text-lg ">
                {t("aboutClinic.footnote")}
              </p>

              {/* Button */}
              <Link
                to={"/about"}
                className="bg-brand1  relative z-40 text-white font-semibold rounded-lg px-8 py-3 shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 w-fit"
              >
                {t("moreBtn")}
              </Link>
            </div>

            {/* Right - Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/about3.png" // Replace with your image
                alt="About Clinic"
                className="w-full max-w-2xl  object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
