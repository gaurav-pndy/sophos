import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  FaCalendarCheck,
  FaTag,
  FaShieldAlt,
  FaBlog,
  FaDollarSign,
  FaFileAlt,
  FaXRay,
  FaMicroscope,
  FaIdCard,
  FaPhone,
  FaBuilding,
  FaGlobe,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import ContactViaPhonePopup from "../ContactViaPhonePopup";

const AppointmentTab = ({ t, city }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="heading1 font-bold text-brand1">Запись на приём</h2>
        <p className="base-text text-gray-700 leading-relaxed">
          Мы стараемся, чтобы каждый визит в нашу клинику проходил удобно и без
          лишних хлопот. Перед тем как прийти на консультацию, пожалуйста,
          ознакомьтесь с несколькими простыми правилами.
        </p>
      </div>

      {/* What to Bring Section */}
      <div className=" rounded-2xl base-text p-6 md:p-8 border border-brand4">
        <div className="flex subheading items-center gap-3 mb-6">
          <div className="bg-brand3 p-3 rounded-xl">
            <FaFileAlt className="text-white " />
          </div>
          <h3 className="text-2xl subheading font-bold text-brand1">
            Что взять с собой
          </h3>
        </div>

        <p className="text-gray-700 mb-6 base-text leading-relaxed">
          Чтобы врач смог полноценно оценить ситуацию и составить план
          обследования или лечения, возьмите на приём:
        </p>

        <div className="space-y-4 ">
          {/* Medical Documents */}
          <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-brand1/20 p-3 rounded-lg flex-shrink-0">
              <FaFileAlt className="text-brand1 text-xl" />
            </div>
            <div>
              <h4 className="font-semibold text-brand1 ">
                Медицинские документы
              </h4>
              <p className="text-gray-600">
                Все выписки, результаты анализов и обследований
              </p>
            </div>
          </div>

          {/* Imaging */}
          <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-brand1/20 p-3 rounded-lg flex-shrink-0">
              <FaXRay className="text-brand1 text-xl" />
            </div>
            <div>
              <h4 className="font-semibold text-brand1 ">Снимки</h4>
              <p className="text-gray-600">
                КТ, МРТ, ПЭТ-КТ, рентген — желательно на диске или флешке
              </p>
            </div>
          </div>

          {/* Histology */}
          <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-brand1/20 p-3 rounded-lg flex-shrink-0">
              <FaMicroscope className="text-brand1 text-xl" />
            </div>
            <div>
              <h4 className="font-semibold text-brand1 ">
                Цитологичекие и Гистологические материалы
              </h4>
              <p className="text-gray-600">
                При наличии — Цитологичекие и гистологические стекла и
                парафиновые блоки{" "}
              </p>
            </div>
          </div>

          {/* ID Documents */}
          <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-brand1/20 p-3 rounded-lg flex-shrink-0">
              <FaIdCard className="text-brand1 text-xl" />
            </div>
            <div>
              <h4 className="font-semibold text-brand1 ">Документы</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Паспорт — если оплачиваете услуги самостоятельно</li>
                <li>• Паспорт и полис ДМС — если приходите по страховке</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-brand1/10 p-4 rounded-xl border-l-4 border-brand1">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-brand1">На приёме:</span> врач
            внимательно изучит документы, проведёт осмотр и предложит
            оптимальный план дальнейших действий — будь то дообследование,
            лечение или госпитализация.
          </p>
        </div>
      </div>

      {/* How to Book Section */}
      <div className=" rounded-2xl p-6 base-text md:p-8 border border-brand4">
        <div className="flex subheading items-center gap-3 mb-6">
          <div className="bg-brand3 p-3 rounded-xl">
            <FaCalendarCheck className="text-white " />
          </div>
          <h3 className=" font-bold text-brand1">Как можно записаться</h3>
        </div>

        <p className="text-gray-700 mb-6 font-medium">
          Выберите удобный способ:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-brand1/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <FaPhone className="text-brand1 text-2xl" />
            </div>
            <h4 className="font-bold text-brand1 mb-3">По телефону</h4>
            <p className="text-gray-600 mb-3">Позвоните нам по номеру</p>
            {city === "Moscow" ? (
              <a
                href="tel:+74953241111"
                className="text-brand3 font-bold  hover:text-brand1 transition-colors block mb-3"
              >
                +7 (495) 324 1111
              </a>
            ) : (
              <a
                href="tel:+74996853000"
                className="text-brand3 font-bold  hover:text-brand1 transition-colors block mb-3"
              >
                +7 (499) 685 3000
              </a>
            )}

            {/* Callback Button */}
            <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-brand3 text-white px-6 py-2.5  rounded-lg font-semibold hover:bg-brand1 transition-colors w-full mt-2"
            >
              Заказать обратный звонок
            </button>

            <div className="flex items-center gap-2 mt-3 small-text text-gray-600">
              <FaClock className="text-brand3" />
              <span>8:00 до 23:00 без выходных</span>
            </div>
          </div>

          {/* In Person */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-brand1/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <FaBuilding className="text-brand1 text-2xl" />
            </div>
            <h4 className="font-bold  text-brand1 mb-3">В регистратуре</h4>
            <p className="text-gray-600 mb-3">Мы открыты ежедневно</p>
            <p className="text-brand3 font-bold  mb-3">8:00 до 23:00</p>
            <p className="small-text text-gray-600">
              Приходите — администратор поможет выбрать удобное время
            </p>
          </div>

          {/* Online */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-brand1/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <FaGlobe className="text-brand1 text-2xl" />
            </div>
            <h4 className="font-bold  text-brand1 mb-3">Через сайт</h4>
            <p className="text-gray-600 mb-3">
              <span className="font-bold">
                <a
                  href="/for-patients#appointment"
                  className="text-brand3 hover:text-brand1 transition-colors"
                >
                  Оставьте заявку
                </a>
              </span>{" "}
              в форме обратной связи, и мы свяжемся с вами.
            </p>
            <p className="small-text text-gray-600 mb-3">
              {" "}
              Заявки обрабатываются обычно в течение 1 часа.
            </p>
          </div>
        </div>
      </div>

      {/* If Plans Change */}
      <div className=" rounded-2xl p-6 md:p-8 border border-brand1">
        <div className="flex subheading items-center gap-3 mb-4">
          <div className="bg-brand3 p-3 rounded-xl">
            <FaExclamationTriangle className="text-white " />
          </div>
          <h3 className=" font-bold text-brand1">Если планы изменились</h3>
        </div>

        <div className="space-y-4 base-text text-gray-700">
          <p className="leading-relaxed">
            <span className="font-semibold text-brand1">
              Пожалуйста, постарайтесь прийти вовремя.
            </span>
          </p>
          <p className="leading-relaxed">
            Если вы не можете посетить врача — просто позвоните нам по телефону{" "}
            {city === "Moscow" ? (
              <a
                href="tel:+74953241111"
                className="text-brand3 font-bold hover:text-brand1 transition-colors"
              >
                +7 (495) 324 1111
              </a>
            ) : (
              <a
                href="tel:+74996853000"
                className="text-brand3 font-bold hover:text-brand1 transition-colors"
              >
                +7 (499) 685 3000
              </a>
            )}
            , чтобы отменить или перенести запись.
          </p>
          <div className="bg-white p-4 rounded-xl border-l-4 border-brand1">
            <p className="text-gray-700">
              <span className="font-semibold">⏰ Важно:</span> При опоздании
              более чем на 15 минут приём может быть перенесён, чтобы другие
              пациенты не ждали.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-brand1 to-brand3 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
            <MdHealthAndSafety className="text-white text-3xl" />
          </div>
          <div>
            <h4 className="subheading font-bold mb-2">
              Мы принимаем пациентов
            </h4>
            <p className="text-white/90 base-text leading-relaxed">
              На платной основе и по программам ДМС. Будем рады помочь вам
              получить точный диагноз и современное лечение в комфортных
              условиях.
            </p>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      {isPopupOpen && (
        <ContactViaPhonePopup onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};

export default AppointmentTab;
