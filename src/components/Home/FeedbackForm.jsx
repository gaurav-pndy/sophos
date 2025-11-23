import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FeedbackForm = () => {
  const { t } = useTranslation();
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission logic here e.g. API call
    alert(t("testimonials.submitted") || "Review submitted");
    setReviewName("");
    setReviewText("");
    setVideoFile(null);
  };

  return (
    <section id="reviews" className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-brand1 text-center text-3xl md:text-4xl font-bold mb-10">
          {t("testimonials.title")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md border border-brand4 max-w-3xl mx-auto"
        >
          <label
            className="block text-brand1 font-semibold mb-2"
            htmlFor="review-text"
          >
            {t("testimonials.yourName") || "[translate:Ваш отзыв]"}
          </label>
          <input
            id="review-name"
            className="w-full border border-brand4 rounded-lg p-3 mb-6 text-brand1 focus:outline-none focus:ring-2 focus:ring-brand1"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
          ></input>
          <label
            className="block text-brand1 font-semibold mb-2"
            htmlFor="review-text"
          >
            {t("testimonials.yourReview") || "[translate:Ваш отзыв]"}
          </label>
          <textarea
            id="review-text"
            className="w-full border border-brand4 rounded-lg p-3 mb-6 text-brand1 focus:outline-none focus:ring-2 focus:ring-brand1"
            rows={5}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>

          {/* Upload Video */}
          <label
            className="block text-brand1 font-semibold mb-2"
            htmlFor="video-upload"
          >
            {t("testimonials.uploadVideo") || "[translate:Загрузить видео]"}
          </label>

          <div
            className="
    border border-brand4 rounded-lg p-4 mb-6 
    flex flex-col items-center justify-center
    cursor-pointer transition-all duration-300
    hover:border-brand1 hover:bg-brand1/5
  "
            onClick={() => document.getElementById("video-upload").click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-brand1 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>

            <p className="text-brand1  text-center">
              {videoFile
                ? t("testimonials.videoSelected") + videoFile.name
                : t("testimonials.clickOrDrag")}
            </p>

            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files[0] || null)}
            />
          </div>

          <button
            type="submit"
            className="bg-brand1 cursor-pointer text-white font-semibold rounded-lg px-8 py-3 shadow hover:bg-brand5/90 w-full transition-all duration-300"
          >
            {t("testimonials.btn") || "[translate:Оставить отзыв]"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;
