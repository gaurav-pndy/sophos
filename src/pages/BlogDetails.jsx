import React from "react";
import { useMediaQuery } from "react-responsive";
import WaveBackground from "../components/WaveBackground";
import { BiChevronRight } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://apimanager.health-direct.ru/api";

const BlogDetails = ({ branch }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { t, i18n } = useTranslation();
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentLanguage = i18n.language;

  // Default colors for the blog
  const defaultColors = {
    color1: "#3B82F6", // blue-500
    color2: "#8B5CF6", // violet-500
  };

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ lang: currentLanguage });

      if (branch) params.append("branch", branch);
      const response = await fetch(
        `${API_BASE}/blogs/public/${blogId}?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      const data = await response.json();

      if (data.success) {
        setBlog(data.blog);
      } else {
        throw new Error(data.message || "Failed to fetch blog");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  }, [blogId, branch, currentLanguage]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const formatDate = (dateString) => {
    if (!dateString) return t("blogDetails.noDate") || "No date";

    try {
      return new Date(dateString).toLocaleDateString(currentLanguage, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-blue-600 text-lg">
          {t("blogDetails.loading") || "Loading blog..."}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-500 text-lg">
          {t("blogDetails.error") || "Error"}: {error}
        </div>
        <Link to="/news" className="ml-4 text-blue-600 hover:underline">
          {t("blogDetails.backToNews") || "Back to News"}
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="text-gray-600 text-lg mb-4">
          {t("blogDetails.blogNotFound") || "Blog not found"}
        </div>
        <Link to="/for-patients#blog" className="text-blue-600 hover:underline">
          {t("blogDetails.backToNews") || "Back to News"}
        </Link>
      </div>
    );
  }

  // Use blog colors or default colors
  const colors = blog.colors || defaultColors;

  return (
    <div
      className="min-h-screen pb-16 pt-10 mx-auto px-4"
      style={{
        background: `linear-gradient(to right, ${colors.color1}10, ${colors.color2}10)`,
      }}
    >
      {/* Breadcrumb */}
      <div className="mb-6 max-w-7xl small-text mx-auto text-gray-700 flex gap-2 font-semibold items-center">
        <Link
          to="/for-patients#blog"
          className="text-blue-500 hover:underline font-normal cursor-pointer flex items-center"
        >
          {t("news-key") || "News"}
        </Link>
        <BiChevronRight className="text-xl text-gray-400" />
        <span className="truncate text-gray-900">{blog.title}</span>
      </div>

      {/* HERO SECTION */}
      <section className="relative rounded-2xl max-w-7xl max-h-96 mx-auto grid md:grid-cols-2 items-center overflow-hidden md:min-h-96 shadow-lg">
        <WaveBackground
          stroke="rgb(300, 300, 300,"
          custStyle="md:w-1/2 h-1/2 left-0 top-0"
        />

        {/* Left: Title Section */}
        <div
          className="w-full flex items-center h-full p-6 pb-16 md:p-8 lg:p-12 xl:p-16"
          style={{
            background: `linear-gradient(${
              isMobile ? "to bottom" : "to right"
            }, ${colors.color1}, ${colors.color2})`,
          }}
        >
          <div className="text-white z-40">
            <h1 className="heading1 font-bold mb-4 leading-tight">
              {blog.title || t("noTitle") || "Untitled"}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <span className="base-text">
                {t("blogDetails.published") || "Published"}:{" "}
                {formatDate(blog.showAt || blog.createdAt)}
              </span>
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.categories.slice(0, 2).map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 rounded-full  font-medium backdrop-blur-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="w-full h-full z-30 -mt-[1px] md:-mt-0">
          <div className="relative w-full h-full">
            {blog.image ? (
              <img
                src={`${blog.image}`}
                alt={blog.title}
                className="w-full max-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}

            {/* Fallback for broken/missing images */}
            <div
              className={`w-full max-h-96 h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center md:rounded-tr-2xl md:rounded-br-2xl ${
                blog.image ? "hidden" : "flex"
              }`}
            >
              <span className="text-gray-500 text-lg">
                {t("blogDetails.noImage") || "No Image Available"}
              </span>
            </div>

            <div
              className="absolute md:rounded-tr-2xl md:rounded-br-2xl inset-0"
              style={{
                background: `linear-gradient(${
                  isMobile ? "to bottom" : "to right"
                }, ${colors.color2}, ${colors.color2}66 30%, transparent 100%)`,
              }}
            ></div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto mt-10">
        {/* TAGS SECTION */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full small-text font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: `${colors.color1}15`,
                  color: colors.color1,
                  border: `1px solid ${colors.color1}30`,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* BLOG CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Description */}
              {blog.description && (
                <div className="mb-8">
                  <p
                    className="base-text leading-relaxed text-gray-700"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  ></p>
                </div>
              )}

              {/* Full Content - if you have HTML content */}
              {blog.content ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              ) : (
                /* If no content, show description as main content */
                blog.description && (
                  <div className="prose prose-lg max-w-none">
                    <p
                      className="text-gray-700 leading-relaxed base-text"
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                    ></p>
                  </div>
                )
              )}

              {!blog.content && !blog.description && (
                <p className="text-gray-500 italic text-lg">
                  {t("blogDetails.noDescription") || "No description available"}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div
                className="bg-white rounded-2xl shadow-lg p-6"
                style={{
                  borderLeft: `4px solid ${colors.color1}`,
                }}
              >
                <h3
                  className="font-semibold text-lg mb-4"
                  style={{ color: colors.color1 }}
                >
                  {t("blogDetails.categories") || "Categories"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${colors.color1}10`,
                        color: colors.color1,
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meta Information */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6"
              style={{
                borderLeft: `4px solid ${colors.color2}`,
              }}
            >
              <h3
                className="font-semibold text-lg mb-4"
                style={{ color: colors.color2 }}
              >
                {t("blogDetails.blogInfo") || "Blog Information"}
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600 block mb-1">
                    {t("blogDetails.published") || "Published"}:
                  </span>
                  <p className="text-gray-800 font-semibold">
                    {formatDate(blog.showAt || blog.createdAt)}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 block mb-1">
                    {t("blogDetails.lastUpdated") || "Last Updated"}:
                  </span>
                  <p className="text-gray-800 font-semibold">
                    {formatDate(blog.updatedAt)}
                  </p>
                </div>
                {blog.tags && blog.tags.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-600 block mb-2">
                      {t("blogDetails.tags") || "Tags"}:
                    </span>
                    <p className="text-gray-800">{blog.tags.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
