import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CiPlay1 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { FaStar, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Reviews = () => {
  const { t, i18n } = useTranslation();
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [readMoreIdx, setReadMoreIdx] = useState(null);
  const [videoModalIdx, setVideoModalIdx] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";

  // Helper function to get localized value from nested structure
  const getLocalizedValue = (obj, currentLanguage = i18n.language) => {
    if (!obj) return "";

    if (typeof obj === "string") return obj;

    if (obj[currentLanguage] !== undefined) {
      return obj[currentLanguage];
    }

    if (obj.en !== undefined) return obj.en;
    if (obj.ru !== undefined) return obj.ru;

    if (obj.firstName || obj.middleName || obj.lastName) {
      const firstName = getLocalizedValue(obj.firstName, currentLanguage);
      const middleName = getLocalizedValue(obj.middleName, currentLanguage);
      const lastName = getLocalizedValue(obj.lastName, currentLanguage);
      return `${firstName} ${middleName} ${lastName}`
        .trim()
        .replace(/\s+/g, " ");
    }

    return "";
  };

  // Helper to get full name from patientName object
  const getPatientName = (patientName, currentLanguage = i18n.language) => {
    if (!patientName) return "Anonymous Patient";

    if (typeof patientName === "string") return patientName;

    if (patientName[currentLanguage]) {
      const nameObj = patientName[currentLanguage];
      const firstName = nameObj.firstName || "";
      const middleName = nameObj.middleName || "";
      const lastName = nameObj.lastName || "";
      return `${firstName} ${middleName} ${lastName}`
        .trim()
        .replace(/\s+/g, " ");
    }

    if (patientName.en) {
      const nameObj = patientName.en;
      const firstName = nameObj.firstName || "";
      const middleName = nameObj.middleName || "";
      const lastName = nameObj.lastName || "";
      return `${firstName} ${middleName} ${lastName}`
        .trim()
        .replace(/\s+/g, " ");
    }

    return "Anonymous Patient";
  };

  // Helper to get description text
  const getDescription = (description, currentLanguage = i18n.language) => {
    if (!description) return "No review text available";

    if (typeof description === "string") return description;

    return (
      description[currentLanguage] ||
      description.en ||
      description.ru ||
      "No review text available"
    );
  };

  // Helper to get file URL
  const getFileUrl = (fileId) => {
    if (!fileId) return null;
    return `${API_BASE}/api/reviews/file/${fileId}`;
  };

  // Helper to get profile image URL
  const getProfileImageUrl = (userProfileId) => {
    if (!userProfileId) return "/nopic.jpg";
    return `${API_BASE}/api/reviews/file/${userProfileId}`;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/reviews/public`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success && data.reviews) {
          const transformedTestimonials = data.reviews.map((review, index) => {
            const patientName = getPatientName(review.patientName);
            const description = getDescription(review.description);

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

            // Check if there are video files
            const hasVideo =
              review.reviewFileIds && review.reviewFileIds.length > 0;
            const videoId = hasVideo ? review.reviewFileIds[0] : null;

            return {
              id: review._id || `review-${index}`,
              name: patientName,
              text: description,
              rating: review.rating || 5,
              doctorName: doctorName,
              doctorId:
                typeof review.doctorId === "object"
                  ? review.doctorId._id
                  : review.doctorId,
              date: review.postedAt || new Date().toISOString(),
              status: review.status || "Approved",
              hasVideo: hasVideo,
              videoId: videoId,
              userProfileId: review.userProfileId,
              reviewFileIds: review.reviewFileIds || [],
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

  const handleOpenVideo = (idx) => setVideoModalIdx(idx);
  const handleCloseVideo = () => setVideoModalIdx(null);
  const handleReadMore = (idx) => setReadMoreIdx(idx);

  if (loading) {
    return (
      <section id="reviews" className="w-full py-12 bg-white">
        <div className="max-w-[87rem] mx-auto px-4">
          <div className="text-center">Loading reviews...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="w-full py-12 bg-white">
        <div className="max-w-[87rem] mx-auto px-4">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="w-full py-12 bg-white">
      <div className="max-w-[87rem] relative mx-auto px-4">
        <h2 className="text-brand1 text-center text-4xl md:text-5xl font-bold mb-10">
          {t("testimonials.title")}
        </h2>

        <div className="mb-7 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
          {testimonials.length > 0 ? (
            testimonials.map((test, idx) => (
              <div key={test.id} className="py-10">
                <TestimonialCard
                  test={test}
                  idx={idx}
                  handleOpenVideo={handleOpenVideo}
                  handleReadMore={handleReadMore}
                  getProfileImageUrl={getProfileImageUrl}
                  getFileUrl={getFileUrl}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-10">
              No reviews available yet.
            </div>
          )}
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
                src={getProfileImageUrl(
                  testimonials[readMoreIdx].userProfileId
                )}
                alt={testimonials[readMoreIdx].name}
                className="w-24 h-24 rounded-full object-cover border-4 border-brand4/40"
                onError={(e) => {
                  e.target.src = "/nopic.jpg";
                }}
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

            {/* Video files if any */}
            {testimonials[readMoreIdx].reviewFileIds &&
              testimonials[readMoreIdx].reviewFileIds.length > 0 && (
                <div className="mt-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Attached videos:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {testimonials[readMoreIdx].reviewFileIds.map(
                      (fileId, index) => (
                        <div key={fileId} className="relative">
                          <video
                            controls
                            className="w-full h-32 object-cover rounded-lg"
                            src={getFileUrl(fileId)}
                          >
                            Your browser does not support the video tag.
                          </video>
                          <div className="text-xs text-center mt-1">
                            Video {index + 1}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModalIdx !== null && testimonials[videoModalIdx] && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              className="absolute -top-12 right-0 text-2xl text-white hover:text-gray-300 z-10"
              onClick={handleCloseVideo}
              aria-label="Close"
            >
              <IoClose size={32} />
            </button>

            <div className="bg-black rounded-lg overflow-hidden">
              <video
                controls
                autoPlay
                className="w-full h-full max-h-[80vh]"
                src={getFileUrl(testimonials[videoModalIdx].videoId)}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video info */}
            <div className="mt-4 text-white">
              <div className="font-semibold text-lg">
                {testimonials[videoModalIdx].name}
              </div>
              <div className="text-sm text-gray-300">
                Review for {testimonials[videoModalIdx].doctorName}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {testimonials[videoModalIdx].rating}{" "}
                <FaStar className="text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const TestimonialCard = ({
  test,
  idx,
  handleOpenVideo,
  handleReadMore,
  getProfileImageUrl,
  getFileUrl,
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [test.text]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    handleOpenVideo(idx);
  };

  const { t } = useTranslation();

  return (
    <div
      className={`rounded-lg shadow-md h-80 p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${
        test.hasVideo
          ? "bg-gradient-to-br from-brand2 to-brand1 text-white"
          : "bg-white text-brand1"
      } cursor-pointer relative overflow-hidden`}
    >
      {/* Avatar + name */}
      <div className="flex gap-3 mb-4">
        <img
          src={getProfileImageUrl(test.userProfileId)}
          alt={test.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-brand4/40"
          onError={(e) => {
            e.target.src = "/nopic.jpg";
          }}
        />
        <div className="flex-1 flex items-start justify-between">
          <div>
            <div className="font-semibold text-lg md:text-xl">{test.name}</div>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            {test.rating} <FaStar className="text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Video player for video testimonials */}
      {test.hasVideo && (
        <div className="mb-4 relative">
          <div className="relative rounded-lg overflow-hidden bg-black">
            <video
              ref={videoRef}
              muted={isMuted}
              className="w-full h-32 object-cover"
              onClick={handleVideoClick}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              poster="/video-poster.jpg"
            >
              <source src={getFileUrl(test.videoId)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video controls overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="bg-white/90 text-brand1 rounded-full p-3 shadow-lg hover:bg-white transition"
                >
                  {isPlaying ? <FaPause size={16} /> : <CiPlay1 size={20} />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="bg-white/90 text-brand1 rounded-full p-3 shadow-lg hover:bg-white transition"
                >
                  {isMuted ? (
                    <FaVolumeMute size={16} />
                  ) : (
                    <FaVolumeUp size={16} />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick();
                  }}
                  className="bg-white/90 text-brand1 rounded-full p-3 shadow-lg hover:bg-white transition"
                >
                  <CiPlay1 size={20} />
                </button>
              </div>
            </div>

            {/* Play button for initial state */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="bg-white/90 text-brand1 rounded-full p-4 shadow-lg hover:bg-white transition"
                >
                  <CiPlay1 size={24} />
                </button>
              </div>
            )}
          </div>

          {/* Video label */}
          <div className="text-xs text-center mt-1 opacity-80">
            Click to play full screen
          </div>
        </div>
      )}

      {/* Text - Show less text if there's a video */}
      <div
        className={`${
          test.hasVideo ? "flex-1" : "flex-1 border-t border-brand4 pt-4"
        } relative`}
      >
        <div
          ref={textRef}
          className={test.hasVideo ? "line-clamp-3" : "line-clamp-5"}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: test.hasVideo ? 3 : 5,
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
              test.hasVideo
                ? "text-white hover:text-brand4"
                : "text-black hover:text-brand1"
            }`}
          >
            {t("readMore")}
          </button>
        )}
      </div>

      {/* Full screen play button overlay for video testimonials */}
      {test.hasVideo && (
        <div
          className="absolute inset-0 flex items-end justify-end p-4 opacity-0 hover:opacity-100 transition-opacity"
          onClick={handleVideoClick}
        >
          <button
            className="bg-white text-brand1 rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
            aria-label="Play video full screen"
          >
            <CiPlay1 size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
