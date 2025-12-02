import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaStethoscope } from "react-icons/fa";
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
  };

  const icons = {
    tab1: <FaClinicMedical className="text-3xl " />,
    tab2: <FaUserMd className="text-3xl" />,
    tab3: <FaRegCalendarCheck className="text-3xl" />,
    tab4: <FaHeartbeat className="text-3xl" />,
    tab5: <FaClipboardList className="text-3xl" />,
    tab6: <FaVials className="text-3xl" />,
    tab7: <FaBriefcaseMedical className="text-3xl" />,
    tab8: <FaStethoscope className="text-3xl" />,
  };

  return (
    <section className="w-full  pt-3 pb-6">
      <div className="max-w-7xl text-center mx-auto px-4">
        <h2 className="text-brand1 text-center text-[2rem] leading-10 font-bold mb-8">
          <FaStethoscope className="inline-block mr-3 text-teal-600" />
          Экспертная онкологическая помощь
        </h2>

        {/* Flowchart */}
        <div className="mb-16">
          {/* Row 1 */}
          <div className="flex flex-col md:grid  md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 mb-4 md:mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border-4 border-brand4 rounded-lg p-6 w-full text-center shadow-lg"
            >
              <div className="text-4xl text-brand1 mb-2 flex justify-center">
                {icons.tab1}
              </div>
              <p className="font-semibold xl:text-lg text-brand1/90">
                {stepsData.tab1.number}. {stepsData.tab1.title}
              </p>
            </motion.div>

            <div className="flex justify-center items-center">
              <FaArrowRight className=" text-4xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border-4 border-brand4 rounded-lg p-6 w-full text-center shadow-lg"
            >
              <div className="text-3xl text-brand1 mb-2 flex justify-center">
                {icons.tab2}
              </div>
              <p className="font-semibold xl:text-lg text-brand1/90">
                {stepsData.tab2.number}. {stepsData.tab2.title}
              </p>
            </motion.div>

            <div className="flex justify-center items-center">
              <FaArrowRight className=" text-4xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white border-4 border-brand4 rounded-lg p-6 w-full  text-center shadow-lg"
            >
              <div className="text-3xl text-brand1 mb-2 flex justify-center">
                {icons.tab3}
              </div>
              <p className="font-semibold xl:text-lg text-brand1/90">
                {stepsData.tab3.number}. {stepsData.tab3.title}
              </p>
            </motion.div>
          </div>

          {/* Arrow down - positioned at the right end */}
          <div className="flex justify-center md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 mb-4 md:mb-8">
            <div className="col-start-5 flex justify-center">
              <FaArrowRight className="text-4xl text-brand1 rotate-90" />
            </div>
          </div>

          {/* Row 2 - Reversed */}
          <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white border-4 border-brand4 rounded-lg p-6 w-full  text-center shadow-lg"
            >
              <div className="text-3xl text-brand1 mb-2 flex justify-center">
                {icons.tab4}
              </div>
              <p className="font-semibold xl:text-lg text-brand1/90">
                {stepsData.tab4.number}. {stepsData.tab4.title}
              </p>
            </motion.div>

            <div className="flex justify-center  items-center">
              <FaArrowRight className=" text-4xl text-brand1 flex-shrink-0 rotate-90 md:rotate-180" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white border-4 border-brand4 rounded-lg p-6 w-full  text-center shadow-lg"
            >
              <div className="text-3xl text-brand1 mb-2 flex justify-center">
                {icons.tab5}
              </div>
              <p className="font-semibold xl:text-lg text-brand1/90">
                {stepsData.tab5.number}. {stepsData.tab5.title}
              </p>
            </motion.div>

            <div className="flex justify-center  items-center">
              <FaArrowRight className=" text-4xl text-brand1 flex-shrink-0 rotate-90 md:rotate-180" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white border-4 border-brand4 rounded-lg p-6 w-full  text-center shadow-lg"
            >
              <div className="text-3xl text-brand1 mb-2 flex justify-center">
                {icons.tab6}
              </div>
              <p className="font-semibold xl:text-lg text-brand1/90">
                {stepsData.tab6.number}. {stepsData.tab6.title}
              </p>
            </motion.div>
          </div>

          {/* Arrow down - positioned at the left end */}
          <div className="flex justify-center md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 mb-4 md:mb-8">
            <div className=" flex justify-center">
              <FaArrowRight className="text-4xl text-brand1 rotate-90" />
            </div>
          </div>

          {/* Row 3 - Single centered item */}
          <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 mb-4 md:mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="bg-white border-4 border-brand4 rounded-lg p-6 w-full  text-center shadow-lg"
            >
              <div className="text-3xl text-brand1 mb-2 flex justify-center">
                {icons.tab7}
              </div>
              <p className="font-semibold xl:text-lg text-brand1/90">
                {stepsData.tab7.number}. {stepsData.tab7.title}
              </p>
            </motion.div>

            <div className="flex justify-center items-center">
              <FaArrowRight className=" text-4xl text-brand1 flex-shrink-0 rotate-90 md:rotate-0" />
            </div>

            <motion.div
              onClick={() => navigate("/complicated-cases")}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border-4 border-brand4 rounded-lg p-6 w-full text-center shadow-lg cursor-pointer"
            >
              <div className="text-3xl text-brand1 mb-2 flex justify-center">
                {icons.tab8}
              </div>
              <p className="font-semibold xl:text-lg text-brand1/90">
                {stepsData.tab8.number}. {stepsData.tab8.title}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Info Block Below Flowchart */}
        <div className="bg-brand1/10  rounded-2xl shadow-md p-8 text-left">
          <h3 className="text-2xl text-center font-bold text-brand1 mb-6">
            {t("care.block1.title")}
          </h3>
          <ul className="space-y-4 text-lg text-brand1/90">
            <li>• {t("care.block1.point1")}</li>
            <li>• {t("care.block1.point2")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CareSection2;
