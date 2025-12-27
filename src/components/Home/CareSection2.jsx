import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaArrowRight,
  FaHandHoldingMedical,
  FaStethoscope,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd,
  FaClinicMedical,
  FaRegCalendarCheck,
  FaHeartbeat,
  FaClipboardList,
  FaVials,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CareSection2 = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const stepsData = {
    tab1: {
      number: 1,
      title: t("care.tab1"),
    },
    tab2: {
      number: 2,
      title: t("care.tab2"),
    },
    tab3: {
      number: 3,
      title: t("care.tab3"),
    },
    tab4: {
      number: 4,
      title: t("care.tab4"),
    },
    tab5: {
      number: 5,
      title: t("care.tab5"),
    },
    tab6: {
      number: 6,
      title: t("care.tab6"),
    },
    tab7: {
      number: 7,
      title: t("care.tab7"),
    },
    tab8: {
      number: 8,
      title: t("care.tab8"),
    },
    tab9: {
      number: 9,
      title: t("care.tab9"),
    },
  };

  const icons = {
    tab1: <FaClinicMedical className="text-3xl  shrink-0" />,
    tab2: <FaUserMd className="text-3xl shrink-0" />,
    tab3: <FaRegCalendarCheck className="text-3xl shrink-0" />,
    tab4: <FaHeartbeat className="text-3xl shrink-0" />,
    tab5: <FaClipboardList className="text-3xl shrink-0" />,
    tab6: <FaVials className="text-3xl shrink-0" />,
    tab7: <FaBriefcaseMedical className="text-3xl shrink-0" />,
    tab8: <FaHandHoldingMedical className="text-3xl shrink-0" />,
    tab9: <FaStethoscope className="text-3xl shrink-0" />,
  };

  return (
    <section className="w-full  pt-3 pb-6">
      <div className="max-w-7xl text-center mx-auto px-4">
        <h2 className="text-brand1 text-center heading1 leading-10 font-bold mb-8">
          Экспертная онкологическая помощь
        </h2>

        {/* Flowchart */}
        <div className="mb-16">
          {/* Row 1 */}
          <div className="flex flex-col md:grid  md:grid-cols-[1fr_0.1fr_1fr_0.1fr_1fr] gap-4 md:gap-6 mb-4 md:mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-white text-brand1"
            >
              <div className="flex ">
                {icons.tab1}
                <span className="mt-px mx-2">{stepsData.tab1.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab1.title,
                  }}
                />
              </div>
            </motion.div>

            <div className="flex justify-center items-center">
              <FaArrowRight className=" text-2xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className=" flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-white text-brand1"
            >
              <div className="flex ">
                {icons.tab2}
                <span className="mt-px mx-2">{stepsData.tab2.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab2.title,
                  }}
                />
              </div>
            </motion.div>

            <div className="flex justify-center items-center">
              <FaArrowRight className=" text-2xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className=" flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-white text-brand1"
            >
              <div className="flex ">
                {icons.tab3}
                <span className="mt-px mx-2">{stepsData.tab3.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab3.title,
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Arrow down - positioned at the right end */}
          {/* <div className="flex justify-center md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 mb-4 md:mb-8">
            <div className="col-start-5 flex justify-center">
              <FaArrowRight className="text-4xl text-brand1 rotate-90" />
            </div>
          </div> */}

          {/* Row 2 - Reversed */}
          <div className="grid  md:grid-cols-[1fr_0.1fr_1fr_0.1fr_1fr] gap-4 md:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className=" flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-white text-brand1"
            >
              <div className="flex ">
                {icons.tab4}
                <span className="mt-px mx-2">{stepsData.tab4.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab4.title,
                  }}
                />
              </div>
            </motion.div>

            <div className="flex justify-center  items-center">
              <FaArrowRight className=" text-2xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className=" flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-white text-brand1"
            >
              <div className="flex ">
                {icons.tab5}
                <span className="mt-px mx-2">{stepsData.tab5.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab5.title,
                  }}
                />
              </div>
            </motion.div>

            <div className="flex justify-center  items-center">
              <FaArrowRight className=" text-2xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className=" flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-white text-brand1"
            >
              <div className="flex ">
                {icons.tab6}
                <span className="mt-px mx-2">{stepsData.tab6.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab6.title,
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Arrow down - positioned at the left end */}
          {/* <div className="flex justify-center md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 mb-4 md:mb-8">
            <div className=" flex justify-center">
              <FaArrowRight className="text-4xl text-brand1 rotate-90" />
            </div>
          </div> */}

          <div className="grid  md:grid-cols-[1fr_0.1fr_1fr_0.1fr_1fr] gap-4 md:gap-6 mb-4 md:mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className=" flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-white text-brand1"
            >
              <div className="flex ">
                {icons.tab7}
                <span className="mt-px mx-2">{stepsData.tab7.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab7.title,
                  }}
                />
              </div>
            </motion.div>

            <div className="flex justify-center items-center">
              <FaArrowRight className=" text-2xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className=" flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-white text-brand1"
            >
              <div className="flex ">
                {icons.tab8}
                <span className="mt-px mx-2">{stepsData.tab8.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab8.title,
                  }}
                />
              </div>
            </motion.div>

            <div className="flex justify-center invisible items-center">
              <FaArrowRight className=" text-2xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              onClick={() => navigate("/complicated-cases")}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className=" flex items-center justify-between gap-3 p-4 rounded-xl font-semibold text-left base-text cursor-pointer
        shadow transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-lg
        bg-brand1 text-white"
            >
              <div className="flex ">
                {icons.tab9}
                <span className="mt-px mx-2">{stepsData.tab9.number}.</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: stepsData.tab9.title,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Info Block Below Flowchart */}
        <div className="bg-brand1/10  rounded-2xl shadow-md p-8 text-left">
          <h3 className="subheading text-center font-bold text-brand1 mb-6">
            {t("care.block1.title")}
          </h3>
          <ul className="space-y-4 base-text text-brand1/90">
            <li>• {t("care.block1.point1")}</li>
            <li>• {t("care.block1.point2")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CareSection2;
