import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SlBadge } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import WaveBackground from "../WaveBackground";
import { MdDiscount } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import FormPopup from "../OncologicalCare/FormPopup";
import BookingPopup from "../BookingPopup";

const HeroSection = ({ setShowPopup }) => {
  const { t } = useTranslation();
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);

  return (
    <div>
      <div className="relative w-full flex items-center justify-center overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="w-full"
        >
          <SwiperSlide>
            <div
              className={`mx-auto relative w-full overflow-hidden h-[45rem] lg:h-[28rem] xl:h-[30rem] grid lg:flex items-stretch`}
            >
              <WaveBackground
                stroke="rgba(100, 100, 100,"
                custStyle="lg:w-[40%] h-[60%] left-0 top-0"
              />
              <div className="flex flex-col h-full md:flex-row lg:col-span-2 px-4 lg:pr-0   w-full py-6 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#40260c] to-[#9c7e61] xl:justify-end">
                <div className="flex-1 w-full xl:max-w-[42.5rem] flex flex-col items-start">
                  <div className="mb-2 flex relative z-40 items-center">
                    <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                      <SlBadge className="text-2xl p-0 text-white " />
                    </div>
                    <div className="w-1 h-12 bg-white/40 rounded" />
                  </div>
                  <h1
                    className="text-white font-bold z-40 heading1 xl:leading-12 mb-4"
                    dangerouslySetInnerHTML={{ __html: t("hero.slide1.title") }}
                  ></h1>
                  <ul className="text-gray-200 list-disc ml-4 base-text z-40  mb-6">
                    <li>{t("hero.slide1.subtitle1")} </li>
                    <li>{t("hero.slide1.subtitle2")} </li>
                    <li>{t("hero.slide1.subtitle3")} </li>
                  </ul>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowFormPopup(true)}
                      className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-2.5 shadow hover:bg-gray-200 transition-all duration-300"
                    >
                      {t("hero.slide1.button")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-full lg:col-span-3 -z-10 flex items-center">
                <div className="relative w-full h-full -mt-px lg:-mt-0 lg:-ml-px">
                  <img
                    src="/hero1-mak.png"
                    alt="Hero illustration"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#9c7e61] via-[#9c7e61]/40 to-transparent via-40%`}
                  ></div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`mx-auto relative w-full overflow-hidden h-[45rem] lg:h-[28rem] xl:h-[30rem] grid lg:flex items-stretch`}
            >
              <WaveBackground
                stroke="rgba(100, 100, 100,"
                custStyle="lg:w-[40%] h-[60%] left-0 top-0"
              />
              <div className="flex flex-col h-full md:flex-row lg:col-span-2 px-4 lg:pr-0   w-full py-6 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#172242] to-[#8d8f9c] xl:justify-end">
                <div className="flex-1 w-full xl:max-w-[42.5rem] flex flex-col items-start">
                  <div className="mb-2 flex relative z-40 items-center">
                    <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                      <SlBadge className="text-2xl p-0 text-white " />
                    </div>
                    <div className="w-1 h-12 bg-white/40 rounded" />
                  </div>
                  <h1
                    className="text-white font-bold z-40 heading1 xl:leading-12 mb-4"
                    dangerouslySetInnerHTML={{ __html: t("hero.slide2.title") }}
                  ></h1>
                  <ul className="text-gray-200 list-disc ml-4 base-text z-40  mb-6">
                    <li>{t("hero.slide2.subtitle1")} </li>
                    <li>{t("hero.slide2.subtitle2")} </li>
                    <li>{t("hero.slide2.subtitle3")} </li>
                  </ul>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowFormPopup(true)}
                      className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-2.5 shadow hover:bg-gray-200 transition-all duration-300"
                    >
                      {t("hero.slide2.button")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-full lg:col-span-3 -z-10 flex items-center">
                <div className="relative w-full h-full -mt-px lg:-mt-0 lg:-ml-px">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://www.shutterstock.com/shutterstock/videos/3769370609/preview/stock-footage-meeting-between-doctor-and-patient-to-examine-mri-scan-showing-a-tumor-exploring-treatment-options.webm"
                    alt="Hero illustration"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#8d8f9c] via-[#8d8f9c]/40 to-transparent via-40%`}
                  ></div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`mx-auto relative w-full overflow-hidden h-[45rem] lg:h-[28rem] xl:h-[30rem] grid lg:flex items-stretch`}
            >
              <WaveBackground
                stroke="rgba(100, 100, 100,"
                custStyle="lg:w-[40%] h-[60%] left-0 top-0"
              />
              <div className="flex flex-col h-full md:flex-row lg:col-span-2 px-4 lg:pr-0   w-full py-6 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#231717] to-[#50565b] xl:justify-end">
                <div className="flex-1 w-full xl:max-w-[42.5rem] flex flex-col items-start">
                  <div className="mb-2 flex relative z-40 items-center">
                    <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                      <SlBadge className="text-2xl p-0 text-white " />
                    </div>
                    <div className="w-1 h-12 bg-white/40 rounded" />
                  </div>
                  <h1
                    className="text-white font-bold z-40 heading1 xl:leading-12 mb-4"
                    dangerouslySetInnerHTML={{ __html: t("hero.slide3.title") }}
                  ></h1>
                  <ul className="text-gray-200 list-disc ml-4 base-text z-40  mb-6">
                    <li>{t("hero.slide3.subtitle1")} </li>
                    <li>{t("hero.slide3.subtitle2")} </li>
                    <li>{t("hero.slide3.subtitle3")} </li>
                  </ul>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowFormPopup(true)}
                      className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-2.5 shadow hover:bg-gray-200 transition-all duration-300"
                    >
                      {t("hero.slide3.button")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-full lg:col-span-3 -z-10 flex items-center">
                <div className="relative w-full h-full -mt-px lg:-mt-0 lg:-ml-px">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://www.shutterstock.com/shutterstock/videos/3488994083/preview/stock-footage-video-conference-doctor-telemedicine-consult-call-or-webinar.webm"
                    alt="Hero illustration"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#50565b] via-[#50565b]/40 to-transparent via-40%`}
                  ></div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`mx-auto relative w-full overflow-hidden h-[45rem] lg:h-[28rem] xl:h-[30rem] grid lg:flex items-stretch`}
            >
              <WaveBackground
                stroke="rgba(100, 100, 100,"
                custStyle="lg:w-[40%] h-[60%] left-0 top-0"
              />
              <div className="flex flex-col h-full md:flex-row lg:col-span-2 px-4 lg:pr-0   w-full py-6 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#002b3e] to-[#016885] xl:justify-end">
                <div className="flex-1 w-full xl:max-w-[42.5rem] flex flex-col items-start">
                  <div className="mb-2 flex relative z-40 items-center">
                    <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                      <SlBadge className="text-2xl p-0 text-white " />
                    </div>
                    <div className="w-1 h-12 bg-white/40 rounded" />
                  </div>
                  <h1
                    className="text-white font-bold z-40 heading1 xl:leading-12 mb-4"
                    dangerouslySetInnerHTML={{ __html: t("hero.slide4.title") }}
                  ></h1>
                  <ul className="text-gray-200 list-disc ml-4 base-text z-40  mb-6">
                    <li>{t("hero.slide4.subtitle1")} </li>
                    <li>{t("hero.slide4.subtitle2")} </li>
                    <li>{t("hero.slide4.subtitle3")} </li>
                  </ul>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowFormPopup(true)}
                      className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-2.5 shadow hover:bg-gray-200 transition-all duration-300"
                    >
                      {t("hero.slide4.button")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-full lg:col-span-3 -z-10 flex items-center">
                <div className="relative w-full h-full -mt-px lg:-mt-0 lg:-ml-px">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://www.shutterstock.com/shutterstock/videos/1081006256/preview/stock-footage-teamwork-help-business-travel-silhouette-concept-group-team-of-tourists-lends-helping-hand-climb.webm"
                    alt="Hero illustration"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#016885] via-[#016885]/40 to-transparent via-40%`}
                  ></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {showFormPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFormPopup(false)}
          ></div>

          {/* Popup Container */}
          <div className="relative z-50 bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-xl">
            {/* Close Button */}
            <button
              className="absolute top-3 right-5 text-gray-500 hover:text-black text-3xl cursor-pointer"
              onClick={() => setShowFormPopup(false)}
            >
              ×
            </button>

            <FormPopup onClose={() => setShowFormPopup(false)} />
          </div>
        </div>
      )}

      {showBookingPopup && (
        <BookingPopup
          show={showBookingPopup}
          onClose={() => setShowBookingPopup(false)}
        />
      )}
    </div>
  );
};

export default HeroSection;
