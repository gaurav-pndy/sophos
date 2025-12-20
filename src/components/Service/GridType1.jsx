// GridType1.jsx
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInUpStagger,
  hoverFloat,
} from "../../lib/motionVariants";
import { useTranslation } from "react-i18next";
import { LuTarget } from "react-icons/lu";
import {
  FaShieldAlt,
  FaClock,
  FaRegClock,
  FaRegStar,
  FaRegHeart,
} from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { RiFlashlightLine } from "react-icons/ri";
import { IoShieldOutline } from "react-icons/io5";
import { IoIosCheckmarkCircle, IoIosMedkit, IoIosPulse } from "react-icons/io";

const ICONS = [
  LuTarget,
  IoShieldOutline,
  FaRegClock,
  SlBadge,
  FaRegHeart,
  RiFlashlightLine,
  IoIosMedkit,
  IoIosPulse,
  IoIosCheckmarkCircle,
];

const GridType1 = ({ titleKey, itemsKey }) => {
  const { t } = useTranslation();
  const items = t(itemsKey, { returnObjects: true }) || [];

  return (
    <section className="w-full">
      <motion.h2
        className="subheading leading-0 font-semibold text-center mb-12"
        style={{ color: "var(--color-brand1)" }}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {t(titleKey)}
      </motion.h2>

      <motion.div
        className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={fadeInUpStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {items.map((item, idx) => {
          const Icon = ICONS[idx] || ICONS[ICONS.length - 1];

          return (
            <motion.article
              key={idx}
              className="bg-white rounded-2xl border border-[#f0ede8] shadow-sm p-5 md:p-6 flex flex-col"
              variants={fadeInUp}
              whileHover="hover"
              initial="rest"
              animate="rest"
              transition={{ duration: 0.25, ease: "easeOut" }}
              {...{ variants: hoverFloat }}
            >
              <div className="flex flex-col items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-brand3/20">
                  <Icon
                    className="text-xl"
                    style={{ color: "var(--color-brand3)" }}
                  />
                </div>

                <h3
                  className="base-text font-semibold"
                  style={{ color: "var(--color-brand1)" }}
                >
                  {item.title}
                </h3>
              </div>

              <p
                className="small-text leading-relaxed"
                style={{ color: "#4b5563" }}
              >
                {item.text}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default GridType1;
