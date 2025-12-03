import React from "react";
import { useMediaQuery } from "react-responsive";
import WaveBackground from "../components/WaveBackground";
import { BiChevronRight } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { newsData } from "../data/news";

const AboutDiseases = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { t } = useTranslation();
  const { newsId } = useParams();
  const news = newsData.find((s) => s.id === newsId);

  return (
    <div
      className=" min-h-screen pb-16 pt-10  mx-auto px-4"
      style={{
        background: `linear-gradient(to right, ${news.color1}20, ${news.color2}20)`,
      }}
    >
      {/* <div className="mb-4 max-w-[87rem] mx-auto text-brand1 flex gap-2 font-semibold items-center">
        {" "}
        <button className="text-brand3 hover:underline font-normal cursor-pointer">
          {t("services.services")}
        </button>
        <BiChevronRight className="text-xl" />
        {t(news.title)}
      </div> */}
      {/* HERO */}
      <section className="relative rounded-xl max-w-[87rem] max-h-96 mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
        <WaveBackground
          stroke="rgb(200, 200, 200,"
          custStyle="md:w-1/2 h-1/2 left-0 top-0"
        />

        {/* Rest of your content */}
        <div
          className="w-full flex items-center h-full p-6 pb-16 md:p-6 lg:p-10 xl:p-12"
          style={{
            background: `linear-gradient(${
              isMobile ? "to bottom" : "to right"
            }, ${news.color1}, ${news.color2})`,
          }}
        >
          <h1 className="text-white z-40 heading1 font-bold ">
            {t(news.title)}
          </h1>
        </div>

        <div className="w-full   h-full z-30 -mt-[1px] md:-mt-0">
          <div className="relative w-full  h-full">
            <img
              src={news.image}
              className=" w-full max-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
            ></img>

            <div
              className="absolute md:rounded-tr-2xl md:rounded-br-2xl inset-0"
              style={{
                background: `linear-gradient(${
                  isMobile ? "to bottom" : "to right"
                }, ${news.color2}, ${news.color2}66 30%, transparent 100%)`,
              }}
            ></div>
          </div>
        </div>
      </section>

      <div className="max-w-[87rem] mx-auto  mt-10">
        {/* О УСЛУГЕ */}

        <div
          className="bg-white rounded-2xl shadow p-8 base-text "
          style={{
            color: news.color1,
          }}
          dangerouslySetInnerHTML={{ __html: t(news.text) }}
        ></div>
      </div>
    </div>
  );
};

export default AboutDiseases;
