import React from "react";
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

const slides = [
  {
    icon: <SlBadge className="text-3xl text-white " />,
    titleKey: "hero.slide1.title",
    subtitleKey: "hero.slide1.subtitle",
    buttonKey: "hero.slide1.button",
    gradient: "bg-gradient-to-r from-brand1 to-brand5",
    image: "/hero1.png",
  },
  {
    icon: <LuUsers className="text-3xl text-white " />,
    titleKey: "hero.slide2.title",
    subtitleKey: "hero.slide2.subtitle",
    buttonKey: "hero.slide2.button",
    gradient: "bg-gradient-to-r from-brand5 to-brand1",
    video:
      "https://www.shutterstock.com/shutterstock/videos/1111753583/preview/stock-footage-videoconference-event-of-group-multinational-physicians-cardiologists-having-medical-council-using.webm",
  },
];

const HeroSection = ({ setShowPopup }) => {
  const { t } = useTranslation();

  return (
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
            className={`mx-auto relative w-full  grid lg:grid-cols-5 items-stretch`}
          >
            <WaveBackground
              stroke="rgba(100, 100, 100,"
              custStyle="lg:w-[40%] h-[60%] left-0 top-0"
            />
            <div className="flex flex-col  md:flex-row lg:col-span-2 px-6 lg:px-0 md:pl-12 lg:pl-6 xl:pl-20 w-full py-6 min-h-[30rem] md:min-h-auto xl:py-4 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#002b3e] to-[#016885]">
              <div className="flex-1 flex flex-col items-start">
                <div className="mb-2 flex z-40 items-center">
                  <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                    <SlBadge className="text-2xl p-0 text-white " />
                  </div>
                  <div className="w-1 h-12 bg-white/40 rounded" />
                </div>
                <h1
                  className="text-white font-bold z-40 text-3xl lg:text-2xl xl:text-4xl xl:leading-12 mb-2"
                  dangerouslySetInnerHTML={{ __html: t("hero.slide1.title") }}
                ></h1>
                <ul className="text-gray-200 list-disc ml-4 mt-4 text-lg z-40 xl:text-xl mb-4">
                  <li>{t("hero.slide1.subtitle1")} </li>
                  <li>{t("hero.slide1.subtitle2")} </li>
                </ul>
                <Link
                  to="/oncological-care"
                  className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-3 shadow hover:bg-gray-200 transition-all duration-300"
                >
                  {t("moreBtn")}
                </Link>
              </div>
            </div>
            <div className="w-full lg:col-span-3 -mt-[2px] lg:-mt-0 lg:-ml-[1px] -z-10 flex items-center">
              <div className="relative w-full">
                <img
                  src="/hero1.avif"
                  alt="Hero illustration"
                  className="w-full md:max-h-[28rem]  xl:h-[34rem] h-auto object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#016885] via-[#016885]/40 to-transparent via-40%`}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={`mx-auto relative w-full grid lg:flex  items-stretch`}
          >
            <WaveBackground
              stroke="rgba(200, 200, 200,"
              custStyle="lg:w-[40%] h-[60%] left-0 top-0"
            />
            <div className="flex flex-col md:flex-row lg:w-[60%] px-6 lg:px-0 md:pl-12 lg:pl-6 xl:pl-20 w-full py-6  xl:py-4 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#989996] to-[#cbd0ce]">
              <div className="flex-1 flex flex-col items-start">
                <div className="mb-2 flex z-40 items-center">
                  <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                    <LuUsers className="text-2xl text-white " />
                  </div>
                  <div className="w-1 h-12 bg-white/40 rounded" />
                </div>
                <h1 className="text-white font-bold z-40 text-3xl lg:text-2xl xl:text-4xl xl:leading-12 mb-2">
                  {t("hero.slide2.title")}
                </h1>
                <ul className="text-gray-200 list-disc ml-4 mt-2 md:mt-4 text-sm z-40 xl:text-xl mb-4">
                  <li>{t("hero.slide2.subtitle1")} </li>
                  <li>{t("hero.slide2.subtitle2")} </li>
                  <li>{t("hero.slide2.subtitle3")} </li>
                  <li>{t("hero.slide2.subtitle4")} </li>
                  <li>{t("hero.slide2.subtitle5")} </li>
                </ul>
                <div className="flex text-sm md:text-base gap-2 md:gap-4">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-4 md:px-8 py-3 shadow hover:bg-gray-200 transition-all duration-300"
                  >
                    {t("hero.slide2.button1")}
                  </button>
                  <Link
                    to="/doctors/691873789569e6f27ac8f6ef"
                    className="bg-white flex justify-center relative z-40 text-teal-900 font-semibold rounded-lg px-4 md:px-8 py-3 shadow hover:bg-gray-200 transition-all duration-300"
                  >
                    {t("hero.slide2.button2")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[40%] -z-10 flex items-center">
              <div className="relative w-full">
                <img
                  src="/hero2.jpg"
                  className="w-full max-h-80 md:max-h-[31rem] h-auto object-cover object-top"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#cbd0ce] via-[#cbd0ce]/30 to-transparent via-20%`}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={`mx-auto relative w-full min-h-[84vh] md:min-h-auto h-full grid lg:flex  items-stretch`}
          >
            <WaveBackground
              stroke="rgba(200, 200, 200,"
              custStyle="lg:w-[40%] h-[60%] left-0 top-0"
            />
            <div className="flex lg:w-[48%]  flex-col md:flex-row md:min-h-[17.5rem] lg:min-h-auto px-6 md:pl-12 xl:pl-20 w-full py-6 md:py-10 xl:py-0 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#52656c] to-[#cececc]">
              <div className="flex-1 flex flex-col items-start">
                <div className="mb-2 flex z-40 items-center">
                  <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                    <MdDiscount className="text-2xl text-white " />
                  </div>
                  <div className="w-1 h-12 bg-white/40 rounded" />
                </div>
                <h1
                  className="text-white font-bold z-40 text-3xl lg:text-2xl xl:text-4xl xl:leading-12 mb-2"
                  dangerouslySetInnerHTML={{ __html: t("hero.slide3.title") }}
                ></h1>
                <ul className="text-gray-200 list-disc ml-4 mt-4 text-lg z-40 xl:text-xl mb-4">
                  <li>{t("hero.slide3.subtitle1")} </li>
                  <li>{t("hero.slide3.subtitle2")} </li>
                  <li>{t("hero.slide3.subtitle3")} </li>
                  <li>{t("hero.slide3.subtitle4")} </li>
                </ul>
                <Link
                  to="/oncological-care"
                  className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-3 shadow hover:bg-gray-200 transition-all duration-300"
                >
                  {t("moreBtn")}
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-[52%] h-full -mt-[2px] lg:-mt-0 lg:-ml-[1px] -z-10 flex items-center">
              <div className="relative w-full h-full">
                <img
                  src="/hero3.avif"
                  className="w-full h-full md:h-auto lg:min-h-120  object-cover xl:h-[34rem] 2xl:max-h-[31rem]"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#cececc] via-[#cececc]/30 to-transparent via-20%`}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={`mx-auto relative w-full min-h-[84vh] md:min-h-auto grid lg:flex items-stretch`}
          >
            <WaveBackground
              stroke="rgba(100, 100, 100,"
              custStyle="lg:w-[40%] h-[60%] left-0 top-0"
            />
            <div className="flex flex-col lg:w-[48%] md:flex-row md:min-h-[17.5rem] lg:min-h-auto  px-6 md:pl-12 xl:pl-20 w-full py-6 md:py-10 xl:py-4 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#3a183e] to-[#888291]">
              <div className="flex-1 flex flex-col items-start">
                <div className="mb-2 flex z-40 items-center">
                  <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                    <FaHandHoldingHeart className="text-2xl text-white " />
                  </div>
                  <div className="w-1 h-12 bg-white/40 rounded" />
                </div>
                <h1 className="text-white font-bold z-40 text-3xl lg:text-2xl xl:text-4xl xl:leading-12 mb-4">
                  {t("hero.slide4.title")}
                </h1>
                <Link
                  to="/"
                  className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-3 shadow hover:bg-gray-200 transition-all duration-300"
                >
                  {t("moreBtn")}
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-[52%] h-full -mt-[2px] lg:-mt-0 lg:-ml-[1px]  -z-10 flex items-center">
              <div className="relative w-full h-full">
                <img
                  src="/hero4.avif"
                  className="w-full h-full max-h-[31rem] md:h-auto object-cover "
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#888291] via-[#888291]/30 to-transparent via-20%`}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={`mx-auto relative w-full min-h-[84vh] md:min-h-auto grid lg:flex items-stretch`}
          >
            <WaveBackground
              stroke="rgba(100, 100, 100,"
              custStyle="lg:w-[40%] h-[60%] left-0 top-0"
            />
            <div className="flex flex-col lg:w-[48%] md:flex-row md:min-h-[17.5rem] lg:min-h-auto  px-6 md:pl-12 xl:pl-20 w-full py-6 md:py-10 xl:py-4 mx-auto items-center gap-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#164a3d] to-[#3e7963]">
              <div className="flex-1 flex flex-col items-start">
                <div className="mb-2 flex z-40 items-center">
                  <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                    <FaHandHoldingHeart className="text-2xl text-white " />
                  </div>
                  <div className="w-1 h-12 bg-white/40 rounded" />
                </div>
                <h1
                  className="text-white font-bold z-40 text-3xl lg:text-2xl xl:text-4xl xl:leading-12 mb-4"
                  dangerouslySetInnerHTML={{ __html: t("hero.slide5.title") }}
                ></h1>
                <Link
                  to="/oncological-care"
                  className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-3 shadow hover:bg-gray-200 transition-all duration-300"
                >
                  {t("moreBtn")}
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-[52%] h-full -mt-[2px] lg:-mt-0 lg:-ml-[1px]  -z-10 flex items-center">
              <div className="relative w-full h-full">
                <img
                  src="/hero5.avif"
                  className="w-full h-full md:h-auto object-cover max-h-[31rem]"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#3e7963] via-[#3e7963]/30 to-transparent via-20%`}
                ></div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
