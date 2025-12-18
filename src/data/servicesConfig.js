import {
  FaFileMedical,
  FaFlask,
  FaHandshake,
  FaHospital,
  FaMicroscope,
  FaPlus,
  FaSyringe,
  FaUserMd,
  FaXRay,
} from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";

// servicesConfig.js
export const servicesConfig = [
  {
    slug: "consultation",
    title: "services.consultation.title",
    subtitle: "services.consultation.subtitle",
    icon: FaUserMd,
    video:
      "https://www.shutterstock.com/shutterstock/videos/3653239365/preview/stock-footage-female-doctor-or-nurse-holds-a-medical-appointment-with-a-patient-in-a-hospital-office-visit-the.webm",
    color1: "#4c5165",
    color2: "#c1c7db",
    stroke: "rgba(51, 186, 189,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.consultation.introTitle",
          textKey: "services.consultation.introText",
        },
      },
      {
        type: "statsStrip",
        title: "",
        props: {
          itemsKey: "services.consultation.stats",
        },
      },
      {
        // "What does consultation include?"
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.consultation.includesTitle",
          itemsKey: "services.consultation.includes",
        },
      },
      {
        // "When to see a doctor?"
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.consultation.whenTitle",
          itemsKey: "services.consultation.when",
        },
      },
      {
        // "Why a qualified specialist?"
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.consultation.whyTitle",
          itemsKey: "services.consultation.whyItems",
        },
      },
      {
        // Common bottom text box (#f7eede) – you said same for all, so just content
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.consultation.bottomNote",
        },
      },
    ],
  },

  {
    slug: "lab-tests",
    title: "services.labTests.title",
    subtitle: "services.labTests.subtitle",
    icon: FaFlask,
    video:
      "https://www.shutterstock.com/shutterstock/videos/3769370609/preview/stock-footage-meeting-between-doctor-and-patient-to-examine-mri-scan-showing-a-tumor-exploring-treatment-options.webm",
    color1: "#304f62",
    color2: "#3c7795",
    stroke: "rgba(51, 186, 189,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.labTests.introTitle",
          textKey: "services.labTests.introText",
        },
      },
      {
        type: "statsStrip",
        title: "",
        props: {
          itemsKey: "services.labTests.stats",
        },
      },
      {
        // "Наши преимущества"
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.labTests.advantagesTitle",
          itemsKey: "services.labTests.advantages",
        },
      },
      {
        // "Как это работает"
        type: "stepsStrip",
        title: "",
        props: {
          titleKey: "services.labTests.stepsTitle",
          stepsKey: "services.labTests.steps",
        },
      },
      {
        // "Для кого предназначены наши услуги"
        type: "whoIsItForStrip",
        title: "",
        props: {
          titleKey: "services.labTests.whoTitle",
          itemsKey: "services.labTests.whoItems",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.labTests.bottomNote",
        },
      },
    ],
  },

  {
    slug: "early-diagnostics",
    title: "services.earlyDiagnostics.title",
    subtitle: "services.earlyDiagnostics.subtitle",
    icon: FaMicroscope,
    video: "/imetc.mp4",
    color1: "#816861",
    color2: "#e2dad4",
    stroke: "rgba(116, 143, 122,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.earlyDiagnostics.introTitle",
          textKey: "services.earlyDiagnostics.introText",
        },
      },
      {
        type: "statsStrip",
        title: "",
        props: {
          itemsKey: "services.earlyDiagnostics.stats",
        },
      },
      {
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.earlyDiagnostics.advantagesTitle",
          itemsKey: "services.earlyDiagnostics.advantages",
        },
      },
      {
        // "Что входит в программу"
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.earlyDiagnostics.programTitle",
          itemsKey: "services.earlyDiagnostics.programItems",
        },
      },
      {
        // Dark block "Кому особенно важна эта услуга?"
        type: "whoIsItForStrip",
        title: "",
        props: {
          titleKey: "services.earlyDiagnostics.whoTitle",
          itemsKey: "services.earlyDiagnostics.whoItems",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.earlyDiagnostics.bottomNote",
        },
      },
    ],
  },

  {
    slug: "day-hospital",
    title: "services.dayHospital.title",
    subtitle: "services.dayHospital.subtitle",
    icon: FaHospital,
    video: "/chemo.mp4",
    color1: "#698bff",
    color2: "#000039",
    stroke: "rgba(51, 186, 189,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.dayHospital.introTitle",
          textKey: "services.dayHospital.introText",
        },
      },
      {
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.dayHospital.advantagesTitle",
          itemsKey: "services.dayHospital.advantages",
        },
      },
      {
        // Какие процедуры проводятся
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.dayHospital.proceduresTitle",
          itemsKey: "services.dayHospital.procedures",
        },
      },
      {
        // Показания для дневного стационара
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.dayHospital.indicationsTitle",
          itemsKey: "services.dayHospital.indications",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.dayHospital.bottomNote",
        },
      },
    ],
  },

  {
    slug: "treatment-room",
    title: "services.treatmentRoom.title",
    subtitle: "services.treatmentRoom.subtitle",
    icon: FaSyringe,
    video:
      "https://www.shutterstock.com/shutterstock/videos/1057599388/preview/stock-footage-close-up-shot-of-unrecognizable-man-holding-hand-of-sick-woman-lying-in-hospital-bed.webm",
    color1: "#674c40",
    color2: "#d1bcb3",
    stroke: "rgba(45, 115, 64,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.treatmentRoom.introTitle",
          textKey: "services.treatmentRoom.introText",
        },
      },
      {
        // Забор биологических материалов
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.treatmentRoom.biomatTitle",
          itemsKey: "services.treatmentRoom.biomatItems",
        },
      },
      {
        // Введение лекарственных препаратов
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.treatmentRoom.drugsTitle",
          itemsKey: "services.treatmentRoom.drugsItems",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.treatmentRoom.bottomNote",
        },
      },
    ],
  },

  {
    slug: "medical-certificates",
    title: "services.medCertificates.title",
    subtitle: "services.medCertificates.subtitle",
    icon: FaFileMedical,
    video:
      "https://www.shutterstock.com/shutterstock/videos/3823541937/preview/stock-footage-doctor-explaining-ct-scan-results-to-patient-in-hospital-setting.webm",
    color1: "#4784b1",
    color2: "#93d1f3",
    stroke: "rgba(51, 186, 189,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.medCertificates.introTitle",
          textKey: "services.medCertificates.introText",
        },
      },
      {
        // Виды справок, которые мы оформляем
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.medCertificates.typesTitle",
          itemsKey: "services.medCertificates.types",
        },
      },
      {
        // Преимущества оформления у нас
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.medCertificates.advantagesTitle",
          itemsKey: "services.medCertificates.advantages",
        },
      },
      {
        // Порядок получения справки
        type: "stepsStrip",
        title: "",
        props: {
          titleKey: "services.medCertificates.stepsTitle",
          stepsKey: "services.medCertificates.steps",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.medCertificates.bottomNote",
        },
      },
    ],
  },

  {
    slug: "telemedicine",
    title: "services.telemedicine.title",
    subtitle: "services.telemedicine.subtitle",
    icon: GiMedicines,
    video:
      "https://www.shutterstock.com/shutterstock/videos/3788749615/preview/stock-footage-close-up-of-biologist-gloved-hands-using-microscope-in-sterile-laboratory-vibrant-blue-gloves.webm",
    color1: "#7c8c89",
    color2: "#bdceca",
    stroke: "rgba(89, 107, 94,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.telemedicine.introTitle",
          textKey: "services.telemedicine.introText",
        },
      },
      {
        // Что вы можете получить
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.telemedicine.canGetTitle",
          itemsKey: "services.telemedicine.canGet",
        },
      },
      {
        // Преимущества телемедицины
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.telemedicine.advantagesTitle",
          itemsKey: "services.telemedicine.advantages",
        },
      },
      {
        // Как это работает
        type: "stepsStrip",
        title: "",
        props: {
          titleKey: "services.telemedicine.stepsTitle",
          stepsKey: "services.telemedicine.steps",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.telemedicine.bottomNote",
        },
      },
    ],
  },

  {
    slug: "expert-imaging-review",
    title: "services.expertImaging.title",
    subtitle: "services.expertImaging.subtitle",
    icon: FaXRay,
    video:
      "https://www.shutterstock.com/shutterstock/videos/3733950387/preview/stock-footage-closeup-doctor-examines-neoplasms-or-moles-on-the-woman-hand-patient-s-skin-using-special.webm",
    color2: "#d4c3ae",
    color1: "#75523b",
    stroke: "rgba(51, 186, 189,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.expertImaging.introTitle",
          textKey: "services.expertImaging.introText",
        },
      },
      {
        // Что такое экспертная оценка
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.expertImaging.whatTitle",
          itemsKey: "services.expertImaging.whatItems",
        },
      },
      {
        // Когда нужна экспертная оценка
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.expertImaging.whenTitle",
          itemsKey: "services.expertImaging.whenItems",
        },
      },
      {
        // Преимущества экспертной оценки
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.expertImaging.advantagesTitle",
          itemsKey: "services.expertImaging.advantages",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.expertImaging.bottomNote",
        },
      },
    ],
  },

  {
    slug: "partnership-programs",
    title: "services.partnership.title",
    subtitle: "services.partnership.subtitle",
    icon: FaHandshake,
    video:
      "https://www.shutterstock.com/shutterstock/videos/3735515239/preview/stock-footage-medical-consultation-professional-young-female-doctors-in-surgical-suits-discussing-research-and.webm",
    color1: "#355159",
    color2: "#9bc2d0",
    stroke: "rgba(51, 186, 189,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.partnership.introTitle",
          textKey: "services.partnership.introText",
        },
      },
      {
        // Направления сотрудничества
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.partnership.directionsTitle",
          itemsKey: "services.partnership.directions",
        },
      },
      {
        // Преимущества для пациентов
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.partnership.benefitsTitle",
          itemsKey: "services.partnership.benefits",
        },
      },
      {
        // Как воспользоваться партнерскими программами
        type: "stepsStrip",
        title: "",
        props: {
          titleKey: "services.partnership.stepsTitle",
          stepsKey: "services.partnership.steps",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.partnership.bottomNote",
        },
      },
    ],
  },

  {
    slug: "sophos-plus",
    title: "services.sophosPlus.title",
    subtitle: "services.sophosPlus.subtitle",
    icon: FaPlus,
    video:
      "https://www.shutterstock.com/shutterstock/videos/3751868441/preview/stock-footage-a-patient-mri-scan-is-reviewed-by-doctors-and-the-patient-to-assess-brain-health-and-determine-the.webm",
    color1: "#7e4a37",
    color2: "#1f1612",
    stroke: "rgba(51, 186, 189,",
    blocks: [
      {
        type: "introStrip",
        title: "",
        props: {
          titleKey: "services.sophosPlus.introTitle",
          textKey: "services.sophosPlus.introText",
        },
      },
      {
        type: "statsStrip",
        title: "",
        props: {
          itemsKey: "services.sophosPlus.stats",
        },
      },
      {
        // Что входит в программу
        type: "advantagesGrid",
        title: "",
        props: {
          titleKey: "services.sophosPlus.programTitle",
          itemsKey: "services.sophosPlus.programItems",
        },
      },
      {
        // Преимущества программы
        type: "proceduresGrid",
        title: "",
        props: {
          titleKey: "services.sophosPlus.benefitsTitle",
          itemsKey: "services.sophosPlus.benefits",
        },
      },
      {
        // Как стать участником
        type: "stepsStrip",
        title: "",
        props: {
          titleKey: "services.sophosPlus.stepsTitle",
          stepsKey: "services.sophosPlus.steps",
        },
      },
      {
        // Кому особенно важна эта услуга
        type: "whoIsItForStrip",
        title: "",
        props: {
          titleKey: "services.sophosPlus.whoTitle",
          itemsKey: "services.sophosPlus.whoItems",
        },
      },
      {
        type: "bottomNote",
        title: "",
        props: {
          textKey: "services.sophosPlus.bottomNote",
        },
      },
    ],
  },
];
