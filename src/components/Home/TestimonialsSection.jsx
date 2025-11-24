import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CiPlay1 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation();
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [readMoreIdx, setReadMoreIdx] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLocalizedValue = (value, currentLanguage = i18n.language) => {
    if (!value) return "";

    if (typeof value === "object" && value !== null) {
      return (
        value[currentLanguage] ||
        value.en ||
        value.ru ||
        Object.values(value)[0] ||
        ""
      );
    }

    return value.toString();
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3003/api/reviews/public"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success && data.reviews) {
          const transformedTestimonials = data.reviews.map((review, index) => {
            const patientName = getLocalizedValue(review.patientName);

            const description = getLocalizedValue(review.description);

            let doctorName = "Doctor";
            if (review.doctorId) {
              if (typeof review.doctorId === "object") {
                const firstName = getLocalizedValue(review.doctorId.firstName);
                const lastName = getLocalizedValue(review.doctorId.lastName);
                doctorName = `${firstName} ${lastName}`.trim();
              } else {
                doctorName = "Doctor";
              }
            }

            return {
              id: review._id || `review-${index}`,
              name: patientName || "Anonymous Patient",
              text: description || "No review text available",
              rating: review.rating || 5,
              doctorName: doctorName,
              doctorId:
                typeof review.doctorId === "object"
                  ? review.doctorId._id
                  : review.doctorId,
              date: review.date || review.postedAt || new Date().toISOString(),
              status: review.status || "Approved",
              originalData: review,
            };
          });

          console.log("Transformed testimonials:", transformedTestimonials);
          setTestimonials(transformedTestimonials);
        } else {
          console.warn("No reviews found in response");
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError(error.message);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [i18n.language]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const updatedTestimonials = testimonials.map((testimonial) => {
        const originalData = testimonial.originalData;
        if (originalData) {
          return {
            ...testimonial,
            name: getLocalizedValue(originalData.patientName),
            text: getLocalizedValue(originalData.description),
            doctorName: originalData.doctorId
              ? `${getLocalizedValue(
                  originalData.doctorId.firstName
                )} ${getLocalizedValue(originalData.doctorId.lastName)}`
              : "Doctor",
          };
        }
        return testimonial;
      });
      setTestimonials(updatedTestimonials);
    }
  }, [i18n.language]);


  const handleAddReview= async() =>{
    console.log("add review clicked")
    try {
      
    } catch (error) {
      
    }
  }

  const handleOpen = (idx) => setSelectedIdx(idx);
  const handleReadMore = (idx) => setReadMoreIdx(idx);

  const prevRef = useRef();
  const nextRef = useRef();

  if (loading) {
    return (
      <section id="reviews" className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="w-full py-12 bg-white">
      <div className="max-w-7xl relative mx-auto px-4">
        <h2 className="text-brand1 text-center text-4xl md:text-5xl font-bold mb-10">
          {t("testimonials.title")}
        </h2>

        {/* Custom arrows */}
        <div className="absolute top-1/2 left-0 xl:-left-5 transform -translate-y-1/2 z-20 flex">
          <button
            ref={prevRef}
            className="cursor-pointer text-brand1 transition"
          >
            <FaChevronLeft size={32} />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 xl:-right-5 transform -translate-y-1/2 z-20 flex">
          <button
            ref={nextRef}
            className="cursor-pointer text-brand1 transition"
          >
            <FaChevronRight size={32} />
          </button>
        </div>

        {/* Swiper carousel */}
        <div className="mb-7">
          {testimonials.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              loop={testimonials.length > 1}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  if (prevRef.current && nextRef.current) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                });
              }}
              breakpoints={{
                768: { slidesPerView: Math.min(2, testimonials.length) },
                1024: { slidesPerView: Math.min(3, testimonials.length) },
              }}
              className="custom-swiper"
            >
              {testimonials.map((test, idx) => (
                <SwiperSlide key={test.id} className="py-10">
                  <TestimonialCard
                    test={test}
                    idx={idx}
                    handleOpen={handleOpen}
                    handleReadMore={handleReadMore}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center text-gray-500 py-10">
              No testimonials available
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-5">
          <Link to="/reviews">
            <button className="bg-brand1 text-white font-semibold rounded-lg px-8 py-3 shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 text-lg">
              {t("testimonials.allBtn")}
            </button>
          </Link>
          <button onClick={()=> (handleAddReview())} className="bg-brand1 text-white font-semibold rounded-lg px-8 py-3 shadow hover:bg-brand5/90 cursor-pointer transition-all duration-300 text-lg">
            {t("testimonials.addReview")}
          </button>
        </div>
      </div>

      {/* Read More modal */}
      {readMoreIdx !== null && testimonials[readMoreIdx] && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 pt-14 relative">
            <button
              className="absolute top-4 right-4 text-2xl text-brand1 hover:text-brand5"
              onClick={() => setReadMoreIdx(null)}
              aria-label="Close"
            >
              <IoClose />
            </button>

            {/* Header with avatar and info */}
            <div className="flex gap-4 mb-6 pb-4 border-b border-brand4/20">
              <img
                src="/nopic.jpg"
                alt={testimonials[readMoreIdx].name}
                className="w-24 h-24 rounded-full object-cover border-4 border-brand4/40"
              />
              <div className="flex-1">
                <div className="font-bold text-xl text-brand1 mb-1">
                  {testimonials[readMoreIdx].name}
                </div>
                <div className="flex items-center gap-2 text-brand1/70">
                  <img
                    src="https://flagcdn.com/24x18/ru.png"
                    alt="Russia"
                    className="w-6 h-4 object-cover rounded-sm"
                  />
                  Patient
                </div>
                <div className="flex items-center gap-1 mt-1 text-brand1 font-semibold">
                  {testimonials[readMoreIdx].rating}{" "}
                  <FaStar className="text-yellow-400" />
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {testimonials[readMoreIdx].date &&
                    new Date(
                      testimonials[readMoreIdx].date
                    ).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Doctor info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Review for:</div>
              <div className="font-semibold text-brand1">
                {testimonials[readMoreIdx].doctorName}
              </div>
            </div>

            {/* Full review text */}
            <div className="text-brand1 text-base leading-relaxed">
              "{testimonials[readMoreIdx].text}"
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const TestimonialCard = ({ test, idx, handleOpen, handleReadMore }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [test.text]);

  const hasVideo = !!test.videoId;
  const { t } = useTranslation();

  return (
    <div
      className={`rounded-lg shadow-md h-80 p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${
        hasVideo
          ? "bg-gradient-to-br from-brand2 to-brand1 text-white"
          : "bg-white text-brand1"
      } cursor-pointer relative`}
    >
      {/* Avatar + name */}
      <div className="flex gap-3 mb-4">
        <img
          src="/nopic.jpg"
          alt={test.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-brand4/40"
        />
        <div className="flex-1 flex items-start justify-between">
          <div>
            <div className="font-semibold text-lg md:text-xl">{test.name}</div>
            <div className="text-sm md:text-base flex items-center gap-2">
              <img
                src="https://flagcdn.com/24x18/ru.png"
                alt="Russia"
                className="w-6 h-4 object-cover rounded-sm"
              />
              Patient
            </div>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            {test.rating} <FaStar className="text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className={`flex-1 border-t border-brand4 pt-4 relative`}>
        <div
          ref={textRef}
          className="line-clamp-5"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          "{test.text}"
        </div>

        {isOverflowing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReadMore(idx);
            }}
            className={`mt-2 text-sm cursor-pointer font-semibold underline ${
              hasVideo
                ? "text-white hover:text-brand4"
                : "text-black hover:text-brand1"
            }`}
          >
            {t("readMore")}
          </button>
        )}
      </div>

      {/* Play overlay if video */}
      {hasVideo && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition bg-black/40 rounded-lg"
          onClick={() => handleOpen(idx)}
        >
          <button
            className="bg-white text-brand1 rounded-full p-4 shadow-lg"
            aria-label="Play video"
          >
            <CiPlay1 size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsSection;
