import React, { useState } from "react";
import { SlBadge } from "react-icons/sl";
import WaveBackground from "../components/WaveBackground";
import { MdManageAccounts } from "react-icons/md";
import { RiPsychotherapyFill } from "react-icons/ri";
import { FaHandHoldingHeart, FaLaptopMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GrOrganization } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import DocsForm from "../components/Complicated/DocsForm";

const ComplicatedCases = () => {
  const content = [
    {
      id: 1,
      icon: <MdManageAccounts className="text-white text-3xl" />,
      heading: "Ведение сложных клинических случаев",
      desc: [
        "В клинике мы уверены, что каждый пациент заслуживает индивидуального подхода, особенно в случаях, когда стандартные методы лечения не дают желаемого результата. Эксперты обладают глубокими знаниями и опытом в диагностике редких заболеваний, а также в создании индивидуальных планов диагностики и лечения для таких случаев. Мы активно используем молекулярную диагностику, генетическое профилирование и другие высокоточные методы для того, чтобы поставить правильный диагноз и выбрать наилучший, эффективный и безопасный подход к лечению.",
      ],
    },
    {
      id: 2,
      icon: <RiPsychotherapyFill className="text-white text-3xl" />,
      heading: "Множественные линии терапии и рецидивы",
      desc: [
        "Для некоторых пациентов стандартная терапия может оказаться недостаточной. В таких случаях мы разрабатываем несколько терапевтических стратегий и готовим план перехода от одной линии лечения к другой, в зависимости от реакции опухоли на препараты. Это позволяет повысить шансы на успех лечения, если первоначальные методы не дают результата. ",
        "Рецидивы — это ещё одна сложная ситуация, с которой сталкиваются наши пациенты. Мы понимаем, что каждый рецидив требует особого внимания, и поэтому наши специалисты тщательно разрабатывают стратегии лечения, использования новых препаратов и современных методов, таких как таргетная и иммунотерапия.",
      ],
    },
    {
      id: 3,
      icon: <FaLaptopMedical className="text-white text-3xl" />,
      heading: "Метастатические процессы",
      desc: [
        "Метастазы — это одна из самых трудных задач в онкологии, когда болезнь распространяется на другие органы. Здесь важен каждый этап лечения, от выявления и подтверждения метастазов до выбора метода, который способен замедлить или остановить прогрессирование болезни. В таких случаях мы проводим все современные методы лечения с учетом индивидуальных особенностей пациента, чтобы лечение было максимально комфортно переносимо для пациента, а также сохранялось качество жизни. ",
      ],
    },
    {
      id: 4,
      icon: <FaUserDoctor className="text-white text-3xl" />,
      heading: "Междисциплинарные консилиумы с внешними экспертами",
      desc: [
        "Каждый сложный случай требует внимания не только одного специалиста, но и целой команды врачей разных специальностей. Мы регулярно проводим междисциплинарные консилиумы, где наши эксперты, а также привлечённые ведущие специалисты из федеральных медицинских центров и зарубежных клиник, разрабатывают единую стратегию лечения. Это позволяет применять самые современные подходы и минимизировать риски.",
      ],
    },
    {
      id: 5,
      icon: <GrOrganization className="text-white text-3xl" />,
      heading:
        "Синхронизация с федеральными центрами и международные рекомендации",
      desc: [
        "Для нас крайне важно, чтобы лечение было основано на лучших мировых практиках. Мы тесно сотрудничаем с федеральными онкологическими центрами и активно следим за последними достижениями в мировой медицинской практике. Все наши рекомендации и стратегии лечения соответствуют международным стандартам, таким как NCCN, ESMO и другие признанные мировым медицинским сообществом организации. Это гарантирует, что каждый пациент получит самые актуальные и высококачественные методы лечения.",
      ],
    },
    {
      id: 6,
      icon: <FaHandHoldingHeart className="text-white text-3xl" />,
      heading: "Прозрачность",
      desc: [
        "Мы не даём ложных надежд, но всегда предлагаем пациенту и его близким реальную картину текущего состояния и возможных перспектив лечения. Ваша уверенность в нас — наша главная ценность, и мы приложим все усилия  и ресурсы, чтобы предложить наилучший подход и обеспечить максимальную поддержку на каждом этапе.",
      ],
    },
  ];

  const [showPopup, setShowPopup] = useState(false);

  const scrollToSection = (sectionId) => {
    const target = document.querySelector(sectionId);
    if (target) {
      const topOffset =
        target.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      // Already on homepage → just scroll
      scrollToSection(sectionId);
    } else {
      // Go to homepage first, then scroll
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <div>
      <section>
        <div
          className={`mx-auto relative w-full overflow-hidden h-[45rem] lg:h-[28rem] xl:h-[30rem] grid lg:flex items-stretch`}
        >
          <WaveBackground
            stroke="rgba(100, 100, 100,"
            custStyle="lg:w-[40%] h-[60%] left-0 top-0"
          />
          <div
            className="max-w-7xl mx-auto w-full flex flex-col h-full md:flex-row lg:col-span-2 
px-4 md:px-6 lg:px-12 py-6 items-center gap-10 
bg-gradient-to-b lg:bg-gradient-to-r from-[#131e23] to-[#253133]"
          >
            <div className="flex-1 flex flex-col items-start">
              <div className="mb-2 flex relative z-40 items-center">
                <div className="bg-white/[0.13] flex justify-center items-center rounded-full p-3 mr-4">
                  <SlBadge className="text-2xl p-0 text-white " />
                </div>
                <div className="w-1 h-12 bg-white/40 rounded" />
              </div>
              <h1 className="text-white font-bold z-40 text-2xl xl:text-4xl xl:leading-12 mb-4">
                Сложные случаи
              </h1>

              {/* <Link
                              to="/oncological-care"
                              className="bg-white relative z-40 text-teal-900 font-semibold rounded-lg px-8 py-3 shadow hover:bg-gray-200 transition-all duration-300"
                            >
                              {t("moreBtn")}
                            </Link> */}
            </div>
          </div>
          <div className="w-full h-full lg:col-span-3 -z-10 flex items-center">
            <div className="relative w-full h-full -mt-px lg:-mt-0 lg:-ml-px">
              <img
                src="/complicated.avif"
                alt="Hero illustration"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#253133] via-[#253133]/40 to-transparent via-40%`}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {content.map((item) => (
          <div
            id={item.id}
            className="bg-white rounded-2xl border border-[#63cacc]/20 shadow-sm p-6 "
          >
            {/* Header Section */}
            <div className="flex lg:items-center gap-4 mb-8">
              <div className="flex h-14 w-14 items-center justify-center bg-gradient-to-br from-[#125e84] to-[#33babd] rounded-xl shrink-0 shadow-md mt-2 lg:mt-0">
                {item.icon}{" "}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#125e84] mb-1">
                  {item.heading}
                </h3>
              </div>
            </div>

            <ul className="text-[#125e84]/80 leading-relaxed space-y-4 list-disc list-inside text-lg">
              {item.desc.map((list, idx) => (
                <li id={idx}> {list} </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <div className="flex flex-col pb-12 items-center gap-4">
        <button
          className="bg-brand1 cursor-pointer border border-brand1 text-white font-semibold rounded-lg px-6 py-3 shadow hover:bg-brand5/90 transition-all duration-300"
          onClick={() => setShowPopup(true)}
        >
          Отправить документы
        </button>
      </div>

      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 p-6 pt-10 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="absolute top-4 z-50 right-4 text-brand1 cursor-pointer text-2xl"
                  onClick={() => setShowPopup(false)}
                  aria-label="Close"
                >
                  <RxCross1 />
                </button>
                <DocsForm />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComplicatedCases;
