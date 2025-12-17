import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://apimanager.health-direct.ru/api";

export default function Blogs() {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentLanguage = i18n.language;

  const [branch] = useState(() => localStorage.getItem("city") || "");

  useEffect(() => {
    fetchBlogs();
  }, [currentLanguage, branch]); // Refetch when language changes

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (branch) params.append("branch", branch);
      const response = await fetch(
        `${API_BASE}/blogs/public?lang=${currentLanguage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();

      if (data.success) {
        setBlogs(data.blogs || []);
        console.log("blogb", data.blogs);
      } else {
        throw new Error(data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(currentLanguage, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to truncate description to 2-3 lines (approx 150 characters)
  const truncateDescription = (description, maxLength = 150) => {
    if (!description) return "";

    if (description.length <= maxLength) {
      return description;
    }

    // Truncate to the last space before maxLength to avoid cutting words
    const truncated = description.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  if (loading) {
    return (
      <section>
        <div className="flex justify-center items-center py-10">
          <div className="text-brand1 text-lg">
            {t("loading") || "Loading blogs..."}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="flex justify-center items-center py-10">
          <div className="text-red-500 text-lg">
            {t("error") || "Error"}: {error}
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section>
        <div className="flex justify-center items-center py-10">
          <div className="text-brand2 text-lg">
            {t("noBlogs") || "No blogs available"}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl  mx-auto px-4 py-10">
      <div className="grid gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col md:flex-row items-start bg-white/10 rounded-xl overflow-hidden hover:bg-white/20 transition p-6"
          >
            {/* Left: Image */}
            <div className="w-full md:w-2/5 lg:w-1/3 mb-4 md:mb-0">
              {blog.image ? (
                <img
                  src={`${blog.image}`}
                  alt={blog.title}
                  className="w-full h-48 md:h-56 object-cover border border-brand3 rounded-xl"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : (
                <div className="w-full h-48 md:h-56 bg-gray-300 flex items-center justify-center border border-brand3 rounded-xl">
                  <span className="text-gray-500">
                    {t("noImage") || "No Image"}
                  </span>
                </div>
              )}
              {/* Fallback for broken images */}
              <div
                className="w-full h-48 md:h-56 bg-gray-300 hidden items-center justify-center border border-brand3 rounded-xl"
                style={{ display: blog.image ? "none" : "flex" }}
              >
                <span className="text-gray-500">
                  {t("noImage") || "No Image"}
                </span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col w-full md:w-3/5 lg:w-2/3 md:ml-6">
              {/* Title */}
              <h3 className="subheading font-semibold text-brand1 mb-3">
                {blog.title || t("noTitle") || "Untitled"}
              </h3>

              {/* Published Date */}
              <p className="text-brand2 small-text mb-4">
                {t("published") || "Published"}: {formatDate(blog.showAt)}
              </p>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-brand1/20 text-brand1 rounded-full small-text font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs md:text-sm">
                      +{blog.tags.length - 3} {t("more") || "more"}
                    </span>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <span className="px-3 py-1 bg-white/10 text-white/50 rounded-full small-text">
                    {t("noTags") || "No tags"}
                  </span>
                </div>
              )}

              {blog.description ? (
                <p
                  className="base-text leading-relaxed mb-6 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: truncateDescription(blog.description),
                  }}
                ></p>
              ) : (
                <p className="text-white/50 base-text leading-relaxed mb-6 italic">
                  {t("noDescription") || "No description available"}
                </p>
              )}

              {/* Read More Link */}
              <div className="mt-auto">
                <Link
                  to={`/blog/${blog._id}?lang=${currentLanguage}`}
                  className="inline-flex items-center base-text font-medium text-brand1 hover:text-brand2 transition-colors group"
                >
                  {t("readMore") || "Read more"}
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
