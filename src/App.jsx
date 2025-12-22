import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import HDMCPlus from "./pages/HDMCPlus";
import LeaveFeedback from "./pages/LeaveFeedback";
import ThankYou from "./pages/ThankYou";
import DoctorDetails from "./pages/DoctorDetails";
import EarlyDetection from "./pages/EarlyDetection";
import PriPolicy from "./pages/PriPolicy";
import DoctorsPage from "./pages/DoctorsPage";
import ForPatients from "./pages/ForPatients";
import AboutPage from "./pages/AboutPage";
import Telemedicine from "./pages/Telemedicine";
import ServiceDetails from "./pages/ServiceDetails";
import ExpertiseCenter from "./pages/ExpertiseCenter";
import ExpertiseDirection from "./pages/ExpertiseDirection";
import { useEffect, useState } from "react";
import Reviews from "./pages/Reviews";
import AboutDiseases from "./pages/AboutDiseases";
import CareersPage from "./pages/CareersPage";
import BlogDetails from "./pages/BlogDetails";
import CookiPolicy from "./pages/CookiPolicy";
import OncologicalCare from "./pages/OncologicalCare";
import Blogs from "./pages/Blogs";
import ComplicatedCases from "./pages/ComplicatedCases";
import UserAccountPopup from "./components/UserAccountPopup";
import i18n from "./utils/i18n";

import enDefault from "./locales/en.json";
import ruDefault from "./locales/ru.json";

import enMoscow from "./locales/enMoscow.json";
import ruMoscow from "./locales/ruMoscow.json";
import { changeCity } from "./utils/changeCity";
import { I18nextProvider } from "react-i18next";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetails2 from "./pages/ServiceDetails2";
import ExpertConsultations from "./pages/ExpertConsultations";
import SpecialistConsultations from "./pages/SpecialistConsultation";
import UltrasoundDiagnostics from "./pages/UltrasoundDiagnostics";

function App() {
  const [city, setCity] = useState(() => {
    return localStorage.getItem("city") || "Moscow";
  });

  useEffect(() => {
    changeCity(city);
    console.log("City changed to:", city);
  }, [city]);

  // useEffect(() => {
  //   if (city === "Moscow") {
  //     i18n.addResourceBundle("en", "translation", enMoscow, true, true);
  //     i18n.addResourceBundle("ru", "translation", ruMoscow, true, true);
  //   } else {
  //     i18n.addResourceBundle("en", "translation", enDefault, true, true);
  //     i18n.addResourceBundle("ru", "translation", ruDefault, true, true);
  //   }

  //   console.log("Current city:", city);

  //   i18n.reloadResources();
  // }, [city]);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("city-moscow");

    if (city === "Moscow") {
      root.classList.add("city-moscow");
    }
  }, [city]);

  const [showPopup, setShowPopup] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);
  const router = createBrowserRouter([
    {
      element: (
        <AppLayout
          city={city}
          setCity={setCity}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          setShowUserAccount={setShowUserAccount}
        />
      ),
      children: [
        {
          path: "/",
          element: <Home city={city} setShowPopup={setShowPopup} />,
        },
        {
          path: "/doctors",
          element: <DoctorsPage branch={city} setShowPopup={setShowPopup} />,
        },
        {
          path: "/services",
          element: <ServicesPage />,
        },
        {
          path: "/doctors/:doctorId",
          element: <DoctorDetails branch={city} setShowPopup={setShowPopup} />,
        },
        {
          path: "/for-patients",
          element: <ForPatients city={city} />,
        },
        {
          path: "/about",
          element: <AboutPage city={city} />,
        },
        {
          path: "/reviews",
          element: <Reviews branch={city} />,
        },
        {
          path: "/telemedicine-consultation",
          element: <Telemedicine setShowPopup={setShowPopup} />,
        },
        {
          path: "/center-of-expertise",
          element: <ExpertiseCenter setShowPopup={setShowPopup} />,
        },
        {
          path: "/center-of-expertise/:direction",
          element: <ExpertiseDirection />,
        },
        {
          path: "/hdmc-plus",
          element: <HDMCPlus />,
        },
        {
          path: "/services/:serviceId",
          element: <ServiceDetails setShowPopup={setShowPopup} />,
        },
        {
          path: "/all-services/:serviceId",
          element: (
            <ServiceDetails2 branch={city} setShowPopup={setShowPopup} />
          ),
        },
        {
          path: "/early-detection-program",
          element: <EarlyDetection setShowPopup={setShowPopup} />,
        },
        {
          path: "/about-diseases/:newsId",
          element: <AboutDiseases />,
        },
        {
          path: "/vacancies",
          element: <CareersPage branch={city} setShowPopup={setShowPopup} />,
        },
        {
          path: "/leave-a-feedback",
          element: <LeaveFeedback />,
        },
        {
          path: "/thank-you-hdmc",
          element: <ThankYou />,
        },
        {
          path: "/privacy-policy",
          element: <PriPolicy />,
        },

        {
          path: "/blogs",
          element: <Blogs branch={city} />,
        },
        {
          path: "/blog/:blogId",
          element: <BlogDetails branch={city} />,
        },
        {
          path: "/cookie-policy",
          element: <CookiPolicy />,
        },
        {
          path: "/oncological-care",
          element: <OncologicalCare />,
        },
        {
          path: "/complicated-cases",
          element: <ComplicatedCases />,
        },
        {
          path: "/expert-consultations",
          element: (
            <ExpertConsultations branch={city} setShowPopup={setShowPopup} />
          ),
        },
        {
          path: "/specialist-consultations",
          element: (
            <SpecialistConsultations
              branch={city}
              setShowPopup={setShowPopup}
            />
          ),
        },
        {
          path: "/ultrasound-diagnostics",
          element: (
            <UltrasoundDiagnostics branch={city} setShowPopup={setShowPopup} />
          ),
        },
      ],
    },
  ]);

  return (
    <I18nextProvider i18n={i18n} key={city}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
}

export default App;
