import React, { useState } from "react";
import { FaRegUser, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { IoCalendarClearOutline, IoLocationOutline } from "react-icons/io5";

// Placeholder data for options and doctors/services
const cities = ["Москва", "Махачкала"];
const services = [
  "Ранняя диагностика заболеваний",
  "Противоопухолевая лекарственная терапия",
  "Экспертная консультация",
  "КТ диагностика 24/7",
  "Добровольное наблюдение",
  "IMETC - Международные консультации",
];
const doctors = [
  {
    name: "Любой доступный врач",
    desc: "Мы подберем лучшего специалиста для вашего случая",
  },
  { name: "Петров Андрей Викторович", desc: "Онкология", exp: "18 лет опыта" },
  {
    name: "Иванова Елена Сергеевна",
    desc: "Лучевая диагностика",
    exp: "12 лет опыта",
  },
  {
    name: "Федорова Наталья Викторовна",
    desc: "Хирургия",
    exp: "16 лет опыта",
  },
  { name: "Волков Дмитрий Сергеевич", desc: "Неврология", exp: "14 лет опыта" },
];
const times = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
];

// Steps
const stepLabels = [
  { label: "Выберите город", icon: <IoLocationOutline className="text-lg" /> },
  { label: "Выберите услугу", icon: <FaRegUser className="text-lg" /> },
  { label: "Выберите врача", icon: <FaRegUser className="text-lg" /> },
  {
    label: "Выберите дату и время",
    icon: <IoCalendarClearOutline className="text-lg" />,
  },
  { label: "Данные пациента", icon: <FiCheckCircle className="text-lg" /> },
];

const BookingForm = () => {
  const [step, setStep] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientData, setPatientData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    agreePersonal: false,
    agreeOffer: false,
  });

  // Logic to enable "Next" at each step
  const canProceed = [
    !!selectedCity,
    !!selectedService,
    !!selectedDoctor,
    !!selectedDate && !!selectedTime,
    patientData.name &&
      patientData.phone &&
      patientData.email &&
      patientData.agreePersonal &&
      patientData.agreeOffer,
  ];

  // Step indicator rendering
  const StepIndicator = () => (
    <div className="flex md:gap-2 items-center justify-between mb-8 mt-6">
      {stepLabels.map((stepItem, idx) => (
        <React.Fragment key={idx}>
          <button
            className={`px-3 py-2.5 text-left rounded-lg font-medium text-brand1 text-sm flex items-center md:gap-2 transition ${
              step === idx
                ? "bg-brand1 text-white"
                : idx < step
                ? "bg-brand4 text-black"
                : "bg-brand4/10 text-black"
            }`}
            disabled={step !== idx}
          >
            {stepItem.icon}{" "}
            <span className="hidden md:block">{stepItem.label}</span>
          </button>
          {idx < stepLabels.length - 1 && (
            <span className="text-brand4/60 font-bold ">—</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step rendering
  return (
    <section className="w-full bg-[#fafbfc] py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-brand1 text-center  text-4xl font-bold mb-6">
          Запись на прием
        </h2>
        <p className="text-lg text-center text-brand1/80 mb-8 max-w-3xl mx-auto">
          Запишитесь на прием к нашим экспертам в несколько простых шагов
        </p>

        <StepIndicator />

        <form className="bg-white rounded-xl shadow p-8">
          {/* Step 1: Select City */}
          {step === 0 && (
            <>
              <div className="font-medium text-xl md:text-2xl mb-7 flex items-center">
                <IoLocationOutline className=" mr-2" /> Выберите город
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-md flex flex-col items-center  rounded-lg p-6 font-semibold  ${
                      selectedCity === city
                        ? "border-brand1 bg-brand4/20"
                        : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setSelectedCity(city)}
                  >
                    <IoLocationOutline className="text-4xl mb-2" /> {city}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-5 py-2 cursor-pointer rounded-lg bg-gray-100"
                  disabled
                >
                  Назад
                </button>
                <button
                  type="button"
                  className={`px-5 py-2  rounded-lg bg-brand1 text-white ${
                    canProceed[0]
                      ? "cursor-pointer "
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!canProceed[0]}
                  onClick={() => setStep(1)}
                >
                  Далее
                </button>
              </div>
            </>
          )}

          {/* Step 2: Select Service */}
          {step === 1 && (
            <>
              <div className="font-medium text-xl md:text-2xl mb-7 flex items-center">
                <FaRegUser className=" mr-2" />
                Выберите услугу
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-md text-left  rounded-lg p-6 font-semibold ${
                      selectedService === service
                        ? "border-brand1 bg-brand4/20"
                        : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg cursor-pointer bg-gray-100"
                  onClick={() => setStep(0)}
                >
                  Назад
                </button>
                <button
                  type="button"
                  className={`px-5 py-2 rounded-lg bg-brand1 text-white ${
                    canProceed[1]
                      ? "cursor-pointer "
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!canProceed[1]}
                  onClick={() => setStep(2)}
                >
                  Далее
                </button>
              </div>
            </>
          )}

          {/* Step 3: Select Doctor */}
          {step === 2 && (
            <>
              <div className="font-medium text-xl md:text-2xl mb-7 flex items-center">
                <FaRegUser className=" mr-2" />
                Выберите врача
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {doctors.map((doc) => (
                  <button
                    key={doc.name}
                    type="button"
                    className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-md text-left  rounded-lg p-6 font-semibold ${
                      doctors.indexOf(doc) === 0 && "md:col-span-2"
                    } text-left ${
                      selectedDoctor === doc.name
                        ? "border-brand1 bg-brand4/10"
                        : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setSelectedDoctor(doc.name)}
                  >
                    <div>{doc.name}</div>
                    {doc.desc && (
                      <div className="text-brand1 font-normal text-sm">
                        {doc.desc}
                      </div>
                    )}
                    {doc.exp && (
                      <div className="mt-2 inline-block px-3 py-0.5 rounded-full border border-brand4 text-black text-xs">
                        {doc.exp}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg cursor-pointer bg-gray-100"
                  onClick={() => setStep(1)}
                >
                  Назад
                </button>
                <button
                  type="button"
                  className={`px-5 py-2 rounded-lg  bg-brand1 text-white ${
                    canProceed[2]
                      ? "cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!canProceed[2]}
                  onClick={() => setStep(3)}
                >
                  Далее
                </button>
              </div>
            </>
          )}

          {/* Step 4: Select Date and Time */}
          {step === 3 && (
            <>
              <div className="font-medium text-xl md:text-2xl mb-7 flex items-center">
                <IoCalendarClearOutline className=" mr-2" />
                Выберите дату и время
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-6">
                  <label className="block mb-3 font-semibold">
                    Выберите дату
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border text-sm rounded-md px-3 py-2 w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block mb-3 font-semibold">
                    Выберите время
                  </label>
                  <div className="grid text-sm grid-cols-3  gap-4">
                    {times.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`border hover:shadow-md transition-all duration-300 cursor-pointer rounded-lg px-4 py-2 font-medium ${
                          selectedTime === time
                            ? "border-brand1 bg-brand4/20"
                            : "border-gray-200 bg-white"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg cursor-pointer bg-gray-100"
                  onClick={() => setStep(2)}
                >
                  Назад
                </button>
                <button
                  type="button"
                  className={`px-5 py-2 rounded-lg bg-brand1 text-white ${
                    canProceed[3]
                      ? "cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!canProceed[3]}
                  onClick={() => setStep(4)}
                >
                  Далее
                </button>
              </div>
            </>
          )}

          {/* Step 5: Patient Data */}
          {step === 4 && (
            <>
              <div className="font-medium text-xl md:text-2xl mb-7 flex items-center">
                <FiCheckCircle className=" mr-2" />
                Данные пациента
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-semibold mb-1">ФИО</label>
                  <input
                    type="text"
                    className="border border-gray-200 text-sm rounded-lg px-3 py-2 w-full"
                    placeholder="Иванов Иван Иванович"
                    value={patientData.name}
                    onChange={(e) =>
                      setPatientData({ ...patientData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Телефон</label>
                  <input
                    type="text"
                    className="border border-gray-200 text-sm rounded-lg px-3 py-2 w-full"
                    placeholder="+7 (999) 123-45-67"
                    value={patientData.phone}
                    onChange={(e) =>
                      setPatientData({ ...patientData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  className="border border-gray-200 text-sm rounded-lg px-3 py-2 w-full"
                  placeholder="ivan@example.com"
                  value={patientData.email}
                  onChange={(e) =>
                    setPatientData({ ...patientData, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-1">Сообщение</label>
                <textarea
                  className="border border-gray-200 text-sm rounded-lg px-3 py-2 w-full"
                  rows={3}
                  placeholder="Дополнительная информация (необязательно)"
                  value={patientData.message}
                  onChange={(e) =>
                    setPatientData({ ...patientData, message: e.target.value })
                  }
                />
              </div>
              <div className="mb-5 flex flex-col text-sm font-medium gap-2">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={patientData.agreePersonal}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        agreePersonal: e.target.checked,
                      })
                    }
                  />
                  Я согласен на обработку персональных данных
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={patientData.agreeOffer}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        agreeOffer: e.target.checked,
                      })
                    }
                  />
                  Я принимаю условия оферты
                </label>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg cursor-pointer bg-gray-100"
                  onClick={() => setStep(3)}
                >
                  Назад
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg bg-brand1 text-white font-semibold ${
                    canProceed[4]
                      ? " cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!canProceed[4]}
                >
                  Записаться
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
