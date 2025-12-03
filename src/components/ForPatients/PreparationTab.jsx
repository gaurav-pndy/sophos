import React, { useEffect, useState } from "react";

import {
  FaFileAlt,
  FaXRay,
  FaMicroscope,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";

const PreparationTab = ({ t }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="heading1 font-bold text-brand1">
          Подготовка к исследованиям
        </h2>
      </div>

      {/* CT/MRI General Info */}
      <div className="rounded-2xl base-text p-6 border border-brand4">
        <div className="flex subheading items-center gap-3 mb-4">
          <div className="bg-brand3 p-3 rounded-xl">
            <FaXRay className="text-white " />
          </div>
          <h3 className="font-bold text-brand1">Подготовка к КТ и МРТ</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl">
            <h4 className="font-bold  text-brand1 mb-3 flex items-center gap-2">
              <FaClock className="text-brand3" />
              Общая информация
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-brand3 font-bold">•</span>
                <span>
                  За 15-20 минут до исследования необходимо подойти к
                  администратору клиники
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand3 font-bold">•</span>
                <span>
                  При наличии в анамнезе хирургических вмешательств с
                  установкой в организме медицинских изделий – ОБЯЗАТЕЛЬНО (!)
                  наличие медицинской документации/выписки с указанием названия
                  операции и наименования материала, из которых сделаны
                  медицинские изделия (возможно, паспорт изделия), либо наличие
                  в документации фразы «противопоказаний для МРТ - исследований
                  нет».
                </span>
              </li>
              <li>
                {" "}
                <p className=" text-amber-800 flex  gap-2">
                  <FaExclamationTriangle className="text-amber-600 mt-1" />В
                  противном случае Вам может быть отказано в проведении
                  исследования.
                </p>
              </li>
              <li className="flex gap-2">
                <span className="text-brand3 font-bold">•</span>
                <span>
                  Предоставить результаты, диски (или ссылки) с предыдущими
                  исследованиями КТ/МРТ/УЗИ (особенно, касающиеся исследуемой
                  области).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand3 font-bold">•</span>
                <div className="">
                  <h4 className="  mb-3">
                    Перед исследованием необходимо снять все металлические
                    предметы:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 small-text text-gray-700">
                    <div className="flex gap-2">
                      <span className="text-brand3">✓</span>
                      <span>
                        Украшения, часы, очки, ремни, пирсинг, заколки и прочее;
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-brand3">✓</span>
                      <span>Зубные протезы, слуховые аппараты;</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-brand3">✓</span>
                      <span>
                        Инъекционные устройства: инсулиновые помпы,
                        автоматические инъекторы;
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-brand3">✓</span>
                      <span>
                        {" "}
                        Одежду с металлическими вставками, молниями, крючками.
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-brand1/5 p-4 rounded-xl border-l-4 border-brand1">
            <h4 className="font-bold text-brand1 mb-3">
              АБСОЛЮТНЫЕ ПРОТИВОПОКАЗАНИЯ К ПРОВЕДЕНИЮ МРТ-ИССЛЕДОВАНИЯ:
            </h4>
            <ul className="space-y-1 small-text text-gray-700">
              <li>
                • Несовместимые с МРТ кардиостимулятор, ICD (имплантируемый
                кардиовертер- дефибриллятор), нейростимулятор
              </li>
              <li>• Ферромагнитные протезы клапанов сердца</li>
              <li>• Фиксирующие конструкции из медицинской стали</li>
              <li>• Ферромагнитные имплантаты внутреннего уха</li>
              <li>• Ферромагнитные клипсы на сосудах головного мозга</li>
              <li>• Инсулиновые помпы </li>
              <li>
                • Металлические осколки, попавшие в организм в результате травмы{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-3 base-text">
        {/* MRI Internal Organs */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("mri-organs")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <FaMicroscope className="text-brand1 " />
              </div>
              <span className="font-semibold text-brand1 text-left">
                МРТ внутренних органов (МРТ брюшной полости, МРТ забрюшинного
                пространства, МРТ малого таза) (комплексное обследование) /
                МР-урография (почки, мочеточники)
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "mri-organs" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "mri-organs" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <ul className="list-outside list-disc ml-4 space-y-1">
                  <li>
                    Строго натощак: за 6-8 часов перед исследованием не
                    принимать пищу, воздержаться от курения
                  </li>
                  <li>
                    За 24 – 48 часов до исследования легкая диета с исключением
                    продуктов, усиливающих перистальтику и газообразование
                    в кишечнике (черного хлеба, отрубей, бобовых, сырых фруктов
                    и овощей, молочных продуктов, сдобная выпевка, газированных
                    напитков)
                  </li>
                  <li>
                    Рекомендуется прием препаратов, снижающих газообразование.
                    Если возникнут трудности с выбором препарата, можно уточнить
                    информацию у любого врача-терапевта, гастроэнтеролога.{" "}
                  </li>
                  <li>
                    За 1 час до исследования принять 2 таблетки «Но-шпа» 40 мг{" "}
                  </li>
                  <li>
                    На исследование принести результаты УЗИ органов малого таза.{" "}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* CT Urinary */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("ct-urinary")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <FaXRay className="text-brand1 " />
              </div>
              <span className="font-semibold text-brand1  text-left">
                КТ мочевыводящих путей (почки, мочеточники, мочевой пузырь)
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "ct-urinary" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "ct-urinary" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <ul className="list-outside list-disc ml-4 space-y-1">
                  <li>
                    Строго натощак: за 6-8 часов перед исследованием не
                    принимать пищу, воздержаться от курения пищу
                  </li>
                  <li>
                    За 24 – 48 часов до исследования легкая диета с исключением
                    продуктов, усиливающих перистальтику и газообразование
                    в кишечнике (черного хлеба, отрубей, бобовых, сырых фруктов
                    и овощей, молочных продуктов, сдобная выпечка, газированных
                    напитков)
                  </li>
                  <li>
                    Рекомендуется прием препаратов, снижающих газообразование.
                    Если возникнут трудности с выбором препарата, можно уточнить
                    информацию у любого врача-терапевта, гастроэнтеролога.
                  </li>
                  <li>
                    Наполненный мочевой пузырь: не мочиться за 2 часа
                    до проведения исследования
                  </li>{" "}
                </ul>{" "}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("abdominal")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <MdHealthAndSafety className="text-brand1 " />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                МРТ и КТ органов брюшной полости и забрюшинного пространства
                (печень, селезенка, поджелудочная железа, почки, надпочечники)
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "abdominal" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "abdominal" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">МРТ:</p>
                <ul className="list-disc list-outside space-y-1 ml-4">
                  <li>
                    Строго натощак: за 6-8 часов перед исследованием не
                    принимать пищу, воздержаться от курения
                  </li>
                  <li>
                    За 24 – 48 часов до исследования легкая диета с исключением
                    продуктов, усиливающих перистальтику и газообразование
                    в кишечнике (черного хлеба, отрубей, бобовых, сырых фруктов
                    и овощей, молочных продуктов, сдобная выпечка, газированных
                    напитков)
                  </li>
                </ul>
              </div>
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">КТ:</p>
                <ul className="list-disc list-outside space-y-1 ml-4">
                  <li>
                    Строго натощак: за 6-8 часов перед исследованием не
                    принимать пищу, воздержаться от курения{" "}
                  </li>
                  <li>
                    Перед исследованием выпить 1 л воды в два приема: первую
                    половину – за 2 часа до исследования, вторую –
                    непосредственно перед исследованием
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("pelvic")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <MdHealthAndSafety className="text-brand1 " />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                МРТ и КТ органов малого таза
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "pelvic" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "pelvic" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">МРТ:</p>
                <ul className="list-disc ml-4 list-outside space-y-1">
                  <li>
                    За 24 – 48 часов до исследования легкая диета с исключением
                    продуктов, усиливающих перистальтику и газообразование
                    в кишечнике (черного хлеба, отрубей, бобовых, сырых фруктов
                    и овощей, молочных продуктов, сдобная выпечка, газированных
                    напитков)
                  </li>
                  <li>
                    Натощак: за 3-4 часа перед исследованием не принимать пищу,
                    воздержаться от курения
                  </li>
                  <li>
                    За час до исследования помочиться и больше не ходить
                    в туалет.{" "}
                  </li>
                  <li>
                    За 1 час до исследования принять 2 таблетки «Но-шпа» 40 мг
                    За 30 мину до исследования принять 1 таблетку «Бускопан» 10
                    мг{" "}
                  </li>
                  <li>
                    {" "}
                    Опорожнение прямой кишки перед исследованием: При отсутствии
                    самостоятельного стула – применение микроклизмы «Микролакс»
                    за 1–2 часа до исследования.
                  </li>
                  <li>
                    Если выполнялось диагностическое выскабливание полости
                    матки, исследование стоит выполнять не ранее, чем через 1.5
                    месяца.{" "}
                  </li>
                  <li>
                    Для женщин репродуктивного возраста рекомендовано
                    исследование на 5-12 день цикла{" "}
                  </li>
                  <li>Если есть, мужчинам надо предоставить анализ на ПСА</li>
                  <li>
                    Исследование не рекомендовано проводить, если за последние
                    24-36 часов проводилась гастро- и/или колоноскопия{" "}
                  </li>
                </ul>
              </div>

              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">
                  При прицельном исследовании мочевого пузыря:
                </p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>
                    За час до исследования выпить 500-1000 мл негазированной
                    воды.{" "}
                  </li>
                  <li>
                    Наполненный мочевой пузырь: не мочиться за 2 часа
                    до проведения исследования
                  </li>
                  <li>
                    Если проводилась цистоскопия, то исследование выполняется не
                    ранее, чем через 6–7 дней.{" "}
                  </li>
                </ul>
              </div>
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">КТ:</p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>Опорожненный кишечник</li>
                  <li>Исключить газообразующие продукты</li>
                  <li>
                    Наполненный мочевой пузырь: не мочиться за 2 часа
                    до проведения исследования
                  </li>
                  <li>
                    {" "}
                    Для женщин исследование проводится на 5-12 день
                    менструального цикла
                  </li>
                  <li>Не мочиться за 2 часа до проведения исследования</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("kidneys")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <MdHealthAndSafety className="text-brand1 " />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                МРТ и КТ почек и надпочечников, КТ забрюшинного пространства
                с внутривенным болюсным контрастированием
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "kidneys" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "kidneys" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>
                    Натощак: за 6-8 часов перед исследованием не принимать пищу,
                    воздержаться от курения{" "}
                  </li>
                  <li>
                    {" "}
                    Наполненный мочевой пузырь: не мочиться за 2 часа
                    до проведения исследования
                  </li>
                  <li>
                    {" "}
                    Рекомендуется прием препаратов, снижающих газообразование.
                    Если возникнут трудности с выбором препарата, можно уточнить
                    информацию у любого врача-терапевта, гастроэнтеролога.{" "}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("heart")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <MdHealthAndSafety className="text-brand1" />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                МРТ сердца
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "heart" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "heart" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <ul className="list-outside ml-4 list-disc space-y-1">
                  <li>
                    До проведения МРТ сердца необходимо иметь данные ЭКГ, ЭХО-КГ
                    и направление с указанием цели исследования
                  </li>
                  <li>
                    Перед исследованием не нужно прекращать прием лекарственных
                    препаратов
                  </li>
                  <li>
                    Натощак: за 3-4 часа перед исследованием не принимать пищу,
                    воздержаться от курения, питьевой режим обычный •Для мужчин:
                    побрить грудь{" "}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("intestine")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <MdHealthAndSafety className="text-brand1" />
              </div>
              <span className="font-semibold text-brand1 text-left">
                МРТ тонкой кишки, КТ тонкой кишки с двойным контрастированием
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "intestine" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "intestine" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>
                    За 24 – 48 часов до исследования легкая диета с исключением
                    продуктов, усиливающих перистальтику и газообразование
                    в кишечнике (черного хлеба, отрубей, бобовых, сырых фруктов
                    и овощей, молочных продуктов, сдобная выпечка, газированных
                    напитков)
                  </li>
                  <li>
                    Пациент может принимать лекарственные препараты, которые ему
                    назначены
                  </li>
                  <li>
                    В процессе подготовки пациент будет принимать осмотическое
                    слабительное, поэтому через 2 часа после исследования
                    (среднее значение) у него возможен жидкий стул
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("mr")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <MdHealthAndSafety className="text-brand1 " />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                МР-холангиопанкреатография
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "mr" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "mr" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>
                    Натощак: за 6-8 часов перед исследованием не принимать пищу,
                    воздержаться от курения{" "}
                  </li>
                  <li>
                    {" "}
                    Рекомендуется прием препаратов, снижающих газообразование.
                    Если возникнут трудности с выбором препарата, можно уточнить
                    информацию у любого врача-терапевта, гастроэнтеролога.
                  </li>
                  <li>
                    {" "}
                    На исследование принести результаты УЗИ органов брюшной
                    полости!
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Ultrasound */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("ultrasound")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <FaFileAlt className="text-brand1 " />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                Ультразвуковое исследование
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "ultrasound" ? "rotate-180" : ""
              }`}
            >
              ↓
            </BiChevronDown>
          </button>
          {openSection === "ultrasound" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">
                  УЗИ брюшной полости, забрюшинного пространства:
                </p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li> Исследование проводится натощак</li>
                  <li>Исследование проводится натощак.</li>
                  <li>
                    Если исследование выполняется утром, то рекомендуется легкий
                    ужин до 20.00, а с утра нельзя есть и пить.
                  </li>
                  <li>
                    Если исследование выполняется утром, то рекомендуется легкий
                    ужин до 20.00, а с утра нельзя есть и пить.
                  </li>
                  <li>
                    За трое суток до исследования необходимо соблюдение диеты:
                    исключить мучное, бобовые, сырые фрукты и овощи,
                    газированные напитки и алкоголь.
                  </li>
                  <li>
                    На ночь перед обследованием необходимо принять любой
                    адсорбент – активированный уголь, «Смекта» или «Полисорб».
                  </li>
                </ul>
              </div>
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">
                  УЗИ органов малого таза трансабдоминально:
                </p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>Исследование должно проводиться натощак.</li>

                  <li>
                    Если исследование проводится утром, то рекомендуется легкий
                    ужин до 20.00, а с утра есть нельзя.
                  </li>

                  <li>
                    Если исследование назначено на вечернее время, утром
                    разрешен легкий завтрак, но последний прием пищи должен быть
                    за 6-8 часов до исследования.
                  </li>

                  <li>
                    За трое суток до исследования необходимо соблюдение диеты:
                    исключить мучное, бобовые, сырые фрукты и овощи,
                    газированные напитки и алкоголь.
                  </li>

                  <li>
                    Перед проведением обследования нужно выпить около литра воды
                    и не ходить в туалет, так как ультразвуковые волны не
                    проходят через участки, наполненные воздухом, что затрудняет
                    диагностику, поэтому мочевой пузырь должен быть полный, а в
                    кишечнике - отсутствовать газы.
                  </li>
                </ul>
              </div>
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">
                  УЗИ органов малого таза трансвагинально:
                </p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>Исследование должно проводиться натощак.</li>

                  <li>
                    Если исследование проводится утром, то рекомендуется легкий
                    ужин до 20.00, а с утра есть нельзя.
                  </li>

                  <li>
                    Если исследование назначено на вечернее время, утром
                    разрешен легкий завтрак, но последний прием пищи должен быть
                    не менее, чем за 6-8 часов до исследования.
                  </li>

                  <li>
                    Накануне диагностики лучше воздержаться от полового акта,
                    так как остатки семенной жидкости, смазки презервативов
                    могут негативно повлиять на результаты исследования. Если в
                    этот же день женщина сдает мазки, результаты анализов также
                    могут исказиться.
                  </li>
                </ul>
              </div>
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p className="font-bold text-brand1 mb-2">
                  УЗИ органов малого таза трансректально:
                </p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>
                    В течение трех дней перед исследованием нужно соблюдать
                    диету: ограничить потребление жирной и способствующей
                    газообразованию пищи.
                  </li>

                  <li>
                    Обследование проводится натощак с наполненным мочевым
                    пузырем.
                  </li>

                  <li>
                    Накануне трансректального исследования нужно принять
                    препараты, очищающие кишечник, а за 2-3 часа до процедуры
                    сделать клизму.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Endoscopy */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("endoscopy1")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <FaMicroscope className="text-brand1 " />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                Эзофагогастродуоденоскопия:
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "endoscopy1" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "endoscopy1" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>
                    Если проведение эзофагогастродуоденоскопия (ЭГДС)
                    запланировано на утро, то с вечера следует отказаться от
                    приема пищи.
                  </li>
                  <li>
                    Если исследование назначается на вторую половину дня, то
                    допускается легкий завтрак (йогурт, творог, сок, чай без
                    сахара).
                  </li>
                  <li>
                    Важно отметить, что с момента приема пищи до проведения
                    исследования должно пройти не менее 8 часов.
                  </li>
                  <li>
                    Практически полностью исключается питье, разрешается выпить
                    не более 100 мл воды за 3 – 4 часа до проведения
                    обследования.
                  </li>
                  <li>
                    Требуется исключить курение в день исследования, так как
                    никотин влияет на секреторную функцию органов ЖКТ.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("endoscopy2")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <FaMicroscope className="text-brand1 " />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                Колоноскопия:{" "}
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "endoscopy2" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "endoscopy2" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <ul className="list-disc list-outside ml-4 space-y-1">
                  <li>
                    Самое важное условие качественной колоноскопии – полное
                    очищение кишечника, поэтому пациент должен заранее
                    подготовиться к исследованию.
                  </li>

                  <li>
                    За три дня до исследования желательно ограничить
                    употребление пищи, вызывающей в кишечнике брожение и
                    усиливающей перистальтику (хлеб грубого помола, орехи,
                    семечки, сухофрукты, сырые овощи и фрукты).
                  </li>

                  <li>
                    Накануне исследования следует принять специальный препарат
                    (лактулоза, фортранс, мовипреп), обеспечивающий полное
                    очищение кишечника.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("endoscopy3")}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex subheading items-center gap-3">
              <div className="bg-brand1/20 p-2 rounded-lg">
                <FaMicroscope className="text-brand1 " />
              </div>
              <span className="font-semibold  text-brand1 text-left">
                ПЭТ-КТ:
              </span>
            </div>
            <BiChevronDown
              className={`text-3xl text-brand3 transition-transform ${
                openSection === "endoscopy3" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "endoscopy3" && (
            <div className="p-5 pt-0 space-y-4 text-brand1/90">
              <div className="bg-brand1/5 p-4 rounded-lg">
                <p class="font-semibold">
                  Заложите на процедуру не менее 2-3 часов.{" "}
                </p>{" "}
                <p class="font-semibold">
                  {" "}
                  До проведения исследования ОБЯЗАТЕЛЬНО сообщите об имеющихся у
                  Вас аллергических реакциях.{" "}
                </p>
                <p class="font-semibold"> 1 этап – занимает 70 минут.</p> Перед
                осмотром пациенту необходимо переодеться в сменную одежду и
                снять все металлические изделия. После осмотра врач вводит в
                вену радиофармпрепарат. Это комфортный и быстрый процесс. Затем
                пациента просят выпить как можно больше воды и провожают в
                комнату релаксации для отдыха. За час РФП распределяется по
                организму, и накапливается в опухолевых очагах. Важно соблюдать
                покой в течение указанного времени: избегать движений и
                разговоров. <br /> <br />{" "}
                <p class="font-semibold"> 2 этап – занимает 40 минут.</p>{" "}
                Сначала пациенту проводят компьютерную томографию (КТ), затем
                позитронно-эмиссионную томографию (ПЭТ). Первая часть
                сканирования длится несколько минут, ПЭТ занимает до получаса.
                Обе процедуры проходят в одном томографе. Пациент не испытывает
                дискомфортных ощущений. В отдельных случаях врач может ввести
                дополнительное контрастное вещество для улучшения визуализации
                результатов сканирования.{" "}
                <ul class="list-disc list-outside ml-4 mt-2">
                  {" "}
                  <li>
                    {" "}
                    В зависимости от вида радиофармпрепарата варьируются условия
                    предварительной подготовки пациента. После консультации с
                    лечащим врачом вы получите более подробные рекомендации
                  </li>{" "}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      {/* <div className="bg-gradient-to-r from-brand1 to-brand3 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
            <FaPhone className="text-white text-2xl" />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Нужна консультация?</h4>
            <p className="text-white/90 mb-3">
              Если у вас возникли вопросы по подготовке к исследованиям,
              свяжитесь с нами:
            </p>
            <a
              href="tel:+74996853000"
              className="inline-block bg-white text-brand1 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              +7 (499) 685 3000
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PreparationTab;
