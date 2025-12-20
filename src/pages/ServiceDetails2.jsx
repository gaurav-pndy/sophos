import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import WaveBackground from "../components/WaveBackground";
import BookingPopup from "../components/BookingPopup";
import ContactViaPhonePopup from "../components/ContactViaPhonePopup";
import { servicesConfig } from "../data/servicesConfig";

// block components
import IntroStrip from "../components/Service/IntroStrip";
import StatsStrip from "../components/Service/StatsStrip";
import GridType1 from "../components/Service/GridType1";
import GridType2 from "../components/Service/GridType2";
import GridType3 from "../components/Service/GridType3";
import GridType4 from "../components/Service/GridType4";
import OtherServices2 from "../components/Service/OtherServices2";
import { FiPhone } from "react-icons/fi";
import ConsultationGridType2 from "../components/Service/ConsultationGridType2";

const ServiceDetails2 = ({ setShowPopup }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  const { serviceId } = useParams();
  const service = servicesConfig.find((s) => s.slug === serviceId);

  const [activeTab, setActiveTab] = useState("about");
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  useEffect(() => {
    setActiveTab("about");
  }, [serviceId]);

  if (!service) {
    // fallback if wrong slug
    navigate("/services");
    return null;
  }

  const defaultTabs = [
    { key: "about", labelKey: "services.tab1" },
    { key: "diseases", labelKey: "services.tab6" },
    { key: "doctors", labelKey: "services.tab2" },
    { key: "reviews", labelKey: "services.tab3" },
    { key: "prices", labelKey: "services.tab4" },
    { key: "other", labelKey: "services.tab5" },
  ];

  const TABS = (service.tabs || defaultTabs).map((tab) => ({
    ...tab,
    label: t(tab.labelKey),
  }));

  const renderBlock = (block, index) => {
    const p = block.props || {};

    switch (block.type) {
      case "introStrip":
        return (
          <IntroStrip key={index} titleKey={p.titleKey} textKey={p.textKey} />
        );
      case "statsStrip":
        return <StatsStrip key={index} itemsKey={p.itemsKey} />;
      case "advantagesGrid":
        return (
          <GridType1 key={index} titleKey={p.titleKey} itemsKey={p.itemsKey} />
        );
      case "proceduresGrid":
        return (
          <GridType2 key={index} titleKey={p.titleKey} itemsKey={p.itemsKey} />
        );
      case "consultationProceduresGrid":
        return (
          <ConsultationGridType2
            key={index}
            titleKey={p.titleKey}
            itemsKey={p.itemsKey}
            imageSrc={p.imageSrc}
            imageAltKey={p.imageAltKey}
            imageLeft={p.imageLeft}
          />
        );
      case "stepsStrip":
        return (
          <GridType3 key={index} titleKey={p.titleKey} stepsKey={p.stepsKey} />
        );
      case "whoIsItForStrip":
        return (
          <GridType4 key={index} titleKey={p.titleKey} itemsKey={p.itemsKey} />
        );
      case "bottomNote":
        return (
          <section
            key={index}
            className="w-full border border-brand4/50 rounded-2xl px-4 py-4 md:px-8 md:py-5 mt-4 bg-brand4/20 "
          >
            {p.titleKey && (
              <h3
                className="base-text mb-2 text-center"
                style={{ color: "var(--color-brand1)" }}
              >
                {t(p.titleKey)}
              </h3>
            )}
            <p className="base-text text-center text-[var(--color-brand1)]">
              {t(p.textKey)}
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen pb-16 pt-10 mx-auto px-4"
      style={{
        background: `linear-gradient(to right, ${service.color1}20, ${service.color2}20)`,
      }}
    >
      {/* Breadcrumb */}
      <div className="mb-4 max-w-[87rem] mx-auto text-brand1 flex gap-2 font-semibold items-center small-text">
        <Link
          to="/services"
          className="text-brand3 hover:underline font-normal cursor-pointer"
        >
          {t("services.services")}
        </Link>
        <BiChevronRight className="text-xl" />
        {t(service.title)}
      </div>

      {/* HERO */}
      <section className="relative rounded-xl max-w-[87rem] mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96">
        <WaveBackground
          stroke={service.stroke}
          custStyle="md:w-1/2 h-1/2 left-0 top-0"
        />

        <div
          className="w-full md:min-h-96 flex flex-col justify-center h-full p-6 pb-16 md:p-6 lg:p-10 xl:p-12"
          style={{
            background: `linear-gradient(${
              isMobile ? "to bottom" : "to right"
            }, ${service.color1}, ${service.color2})`,
          }}
        >
          <h2 className="text-white z-40 heading1 font-bold  leading-10">
            {t(service.title)}
          </h2>
          {service.slogan && (
            <p className="base-text mt-4 z-40 text-white">
              {" "}
              {t(service.slogan)}
            </p>
          )}

          <div className="flex gap-4 flex-col sm:flex-row mt-8">
            <button
              onClick={() => setShowPopup(true)}
              className="flex relative z-40 items-center justify-center gap-2 w-full sm:w-fit px-6 py-2.5 rounded-lg bg-white text-brand1 base-text font-medium hover:text-white hover:bg-transparent cursor-pointer transition-all duration-300 border border-white"
            >
              {service.btn ? t(service.btn) : t("services.btn1")}
            </button>
            <button
              onClick={() => setIsContactPopupOpen(true)}
              className="flex relative z-40 items-center justify-center gap-2 w-full sm:w-fit px-6 py-2.5 rounded-lg bg-transparent text-white base-text font-medium hover:text-brand1 hover:bg-white cursor-pointer transition-all duration-300 border border-white"
            >
              <FiPhone /> {t("services.contactPopup")}
            </button>
          </div>
        </div>

        <div className="w-full h-full z-30 -mt-[1px] md:-mt-0">
          <div className="relative w-full h-full">
            {service.video && (
              <video
                autoPlay
                loop
                muted
                playsInline
                src={service.video}
                className="w-full md:min-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
              />
            )}
            <div
              className="absolute md:rounded-tr-2xl md:rounded-br-2xl inset-0"
              style={{
                background: `linear-gradient(${
                  isMobile ? "to bottom" : "to right"
                }, ${service.color2}, ${
                  service.color2
                }66 30%, transparent 100%)`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <nav
        className="max-w-[87rem] mx-auto grid grid-cols-2 md:flex gap-2 rounded-xl p-2 my-10"
        style={{
          background: `linear-gradient(to right, ${service.color1}, ${service.color2})`,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 cursor-pointer base-text py-3 rounded-lg font-semibold transition ${
              activeTab === tab.key
                ? "bg-white shadow"
                : "text-white hover:bg-white/20"
            }`}
            style={{
              color: activeTab === tab.key ? service.color1 : "white",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB PANES */}
      <div className="max-w-[87rem] mx-auto">
        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div className="space-y-12 bg-white rounded-2xl shadow p-8 base-text ">
            {service.blocks && service.blocks.map(renderBlock)}
            <div className="flex justify-center gap-4 flex-col sm:flex-row ">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-brand1 cursor-pointer border border-brand1 text-white font-semibold rounded-lg px-6 py-2.5 base-text shadow hover:bg-brand5/90 transition-all duration-300 w-full md:w-fit"
              >
                {service.btn ? t(service.btn) : t("services.btn1")}
              </button>
              <button
                onClick={() => setIsContactPopupOpen(true)}
                className="bg-transparent cursor-pointer border border-brand1 w-full md:w-fit text-brand1 font-semibold rounded-lg px-6 py-2.5 base-text shadow hover:bg-brand1 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <FiPhone /> {t("services.contactPopup")}
              </button>
            </div>
          </div>
        )}

        {/* DISEASES TAB */}
        {activeTab === "diseases" && (
          <div className="bg-white rounded-2xl shadow p-8 base-text ">
            {/* TODO: fill later */}
          </div>
        )}

        {/* DOCTORS TAB */}
        {activeTab === "doctors" && (
          <div className="bg-white rounded-2xl shadow p-8 base-text ">
            {/* TODO: list doctors for this service */}
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-2xl shadow p-8 base-text ">
            {/* TODO: reviews content */}
          </div>
        )}

        {/* PRICES TAB */}
        {activeTab === "prices" && (
          <div className="bg-white rounded-2xl shadow p-8 base-text ">
            {/* TODO: prices table */}
          </div>
        )}

        {/* OTHER SERVICES TAB */}
        {activeTab === "other" && (
          <div className="bg-white rounded-2xl shadow p-8 base-text ">
            <OtherServices2 currentServiceId={serviceId} />
          </div>
        )}

        {isBookingPopupOpen && (
          <BookingPopup
            show={isBookingPopupOpen}
            onClose={() => setIsBookingPopupOpen(false)}
          />
        )}

        {isContactPopupOpen && (
          <ContactViaPhonePopup onClose={() => setIsContactPopupOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default ServiceDetails2;
