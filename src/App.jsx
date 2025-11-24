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
import { useState } from "react";
import Reviews from "./pages/Reviews";
import AboutDiseases from "./pages/AboutDiseases";
import CareersPage from "./pages/CareersPage";
import BlogDetails from "./pages/BlogDetails";
import CookiPolicy from "./pages/CookiPolicy";
import OncologicalCare from "./pages/OncologicalCare";
import Blogs from "./pages/Blogs";

function App() {
  const [city, setCity] = useState("Moscow");
  const [showPopup, setShowPopup] = useState(false);
  const router = createBrowserRouter([
    {
      element: (
        <AppLayout
          city={city}
          setCity={setCity}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      ),
      children: [
        {
          path: "/",
          element: <Home city={city} setShowPopup={setShowPopup} />,
        },
        {
          path: "/doctors",
          element: <DoctorsPage setShowPopup={setShowPopup} />,
        },
        {
          path: "/doctors/:doctorId",
          element: <DoctorDetails setShowPopup={setShowPopup} />,
        },
        {
          path: "/for-patients",
          element: <ForPatients />,
        },
        {
          path: "/about",
          element: <AboutPage city={city} />,
        },
        {
          path: "/reviews",
          element: <Reviews />,
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
          path: "/early-detection-program",
          element: <EarlyDetection setShowPopup={setShowPopup} />,
        },
        {
          path: "/about-diseases/:newsId",
          element: <AboutDiseases />,
        },
        {
          path: "/vacancies",
          element: <CareersPage setShowPopup={setShowPopup} />,
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
          element: <Blogs />,
        },
        {
          path: "/blog/:blogId",
          element: <BlogDetails />,
        },
        {
          path: "/cookie-policy",
          element: <CookiPolicy />,
        },
        {
          path: "/oncological-care",
          element: <OncologicalCare />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
