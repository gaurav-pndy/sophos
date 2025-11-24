import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CiPlay1 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { doctorsData } from "../data/doctors";

const Reviews = () => {
  const { t } = useTranslation();
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [readMoreIdx, setReadMoreIdx] = useState(null);
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3003/api" || "https://apimanager.health-direct.ru/api";

  useEffect(() =>{
    const fetchReviews = async() =>{
      try {
        const response = await fetch("http://localhost:3003/api/reviews/public")
        console.log(response.data)
        
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchReviews()
  }, [])

  // Collect all reviews from doctors data
  const testimonials = [];

  doctorsData.forEach((doctor) => {
    // Check if reviews exist and is a translation key
    if (doctor.reviews && typeof doctor.reviews === "string") {
      const reviewsArray = t(doctor.reviews, { returnObjects: true });

      if (Array.isArray(reviewsArray)) {
        reviewsArray.forEach((review) => {
          testimonials.push({
            ...review,
            doctorName: t(doctor.name),
            doctorId: doctor.id,
            // If review has videoUrl or videoId, include it
            videoId: review.videoId || review.videoUrl,
          });
        });
      }
    }
  });

  const handleOpen = (idx) => setSelectedIdx(idx);
  const handleReadMore = (idx) => setReadMoreIdx(idx);

  return (
    <section id="reviews" className="w-full py-12 bg-white ">
      <div className="max-w-[87rem] relative mx-auto px-4">
        <h2 className="text-brand1 text-center text-4xl md:text-5xl font-bold mb-10">
          {t("testimonials.title")}
        </h2>

        <div className="mb-7 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
          {testimonials.map((test, idx) => (
            <div key={idx} className="py-10">
              <TestimonialCard
                test={test}
                idx={idx}
                handleOpen={handleOpen}
                handleReadMore={handleReadMore}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {selectedIdx !== null && testimonials[selectedIdx].videoId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 p-6 pt-14 relative flex flex-col">
            <button
              className="absolute top-4 right-4 text-2xl text-brand1 hover:text-brand5"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close"
            >
              <IoClose />
            </button>
            <div className="w-full aspect-video mb-6 rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${testimonials[selectedIdx].videoId}?autoplay=1`}
                title="Patient testimonial video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="rounded-xl w-full h-full"
              />
            </div>
            <div className="font-bold text-lg text-brand1 mb-2">
              {testimonials[selectedIdx].name}
            </div>
            <div className="text-brand1 text-base leading-snug">
              {testimonials[selectedIdx].text}
            </div>
          </div>
        </div>
      )}

      {/* Read More modal */}
      {readMoreIdx !== null && (
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
                  {testimonials[readMoreIdx].name?.match(
                    /^(.+?)\s*\((.+?)\)$/
                  )?.[1] || testimonials[readMoreIdx].name}
                </div>
                <div className="flex items-center gap-2 text-brand1/70">
                  <img
                    src="https://flagcdn.com/24x18/ru.png"
                    alt="Russia"
                    className="w-6 h-4 object-cover rounded-sm"
                  />
                  {
                    testimonials[readMoreIdx].name?.match(
                      /^(.+?)\s*\((.+?)\)$/
                    )?.[2]
                  }
                </div>
                <div className="flex items-center gap-1 mt-1 text-brand1 font-semibold">
                  5 <FaStar className="text-yellow-400" />
                </div>
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

  // Extract name and city from format "Name (City)"
  const nameMatch = test.name?.match(/^(.+?)\s*\((.+?)\)$/);
  const displayName = nameMatch ? nameMatch[1].trim() : test.name;
  const city = nameMatch ? nameMatch[2].trim() : "";

  // All reviews are from Russia, all get 5 stars
  const isoCode = "ru";
  const stars = 5;

  // Generate a consistent placeholder image based on index
  const placeholderImage = `https://i.pravatar.cc/150?img=${(idx % 70) + 1}`;

  return (
    <div
      className={`rounded-lg shadow-md h-80 p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${
        hasVideo
          ? "bg-gradient-to-br from-brand2 to-brand1 text-white "
          : "bg-white text-brand1 "
      } cursor-pointer relative`}
    >
      {/* Avatar + name */}
      <div className="flex gap-3 mb-4">
        <img
          src="/nopic.jpg"
          alt={displayName}
          className="w-20  h-20  rounded-full object-cover border-4 border-brand4/40"
        />
        <div className="flex-1 flex items-start justify-between">
          <div>
            <div className="font-semibold text-lg md:text-xl">
              {displayName}
            </div>
            {city && (
              <div className="text-sm md:text-base flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/24x18/${isoCode}.png`}
                  alt="Russia"
                  className="w-6 h-4 object-cover rounded-sm"
                />
                {city}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 font-semibold">
            {stars} <FaStar className="text-yellow-300" />
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

export default Reviews;
