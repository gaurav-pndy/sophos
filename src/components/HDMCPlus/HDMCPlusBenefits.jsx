import React from "react";
import {
  FaCalendarAlt,
  FaShieldAlt,
  FaUserFriends,
  FaGlobe,
  FaRegCalendar,
} from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { IoShieldOutline } from "react-icons/io5";
import { LuCircleCheckBig, LuUsers } from "react-icons/lu";

const benefits = [
  {
    icon: <FaRegCalendar className="text-brand1 text-2xl" />,
    title: "Приоритетный доступ",
    points: [
      "Запись к любому врачу без очереди",
      "Специальные временные слоты для членов HDMC+",
      "Экстренная запись в день обращения",
      "Приоритет при записи на диагностические процедуры",
    ],
  },
  {
    icon: <IoShieldOutline className="text-brand1 text-2xl" />,
    title: "Финансовые преимущества",
    points: [
      "Скидка до 30% на все медицинские услуги",
      "Фиксированная цена на весь срок членства",
      "Бесплатные повторные консультации в течение месяца",
      "Специальные тарифы на дополнительные услуги",
    ],
  },
  {
    icon: <LuUsers className="text-brand1 text-2xl" />,
    title: "Персональная поддержка",
    points: [
      "Выделенный персональный координатор",
      "Помощь в планировании лечения",
      "Координация между различными специалистами",
      "Поддержка в оформлении документов",
    ],
  },
  {
    icon: <FiGlobe className="text-brand1 text-2xl" />,
    title: "IMETC консультации",
    points: [
      "Безлимитные телемедицинские консультации",
      "Доступ к международным экспертам",
      "Второе мнение ведущих специалистов",
      "Консультации на русском и английском языках",
    ],
  },
];

const HDMCPlusBenefits = () => (
  <section className="w-full  py-10">
    <div className="max-w-[87rem] text-center mx-auto px-4">
      <h2 className="text-brand1 text-center  text-4xl font-bold mb-6">
        Детальные преимущества членства
      </h2>
      <p className="text-lg text-center text-brand1/80 mb-10 max-w-3xl mx-auto">
        Каждое преимущество разработано для обеспечения максимального комфорта и
        качества медицинского обслуживания
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-brand5/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-4 shadow md:p-8 flex flex-col mb-0 gap-3 "
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand4/20  rounded-lg p-3">
                {benefit.icon}
              </span>
              <span className="font-medium text-xl text-black">
                {benefit.title}
              </span>
            </div>
            <ul className="pl-0 mt-2 flex flex-col gap-3 text-brand1/80 text-base">
              {benefit.points.map((pt, i) => (
                <li key={i} className="flex gap-2">
                  <LuCircleCheckBig className="text-brand1 text-lg mt-1" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HDMCPlusBenefits;
