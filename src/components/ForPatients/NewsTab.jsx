import { Link } from "react-router-dom";
import { newsData } from "../../data/news";
import { useTranslation } from "react-i18next";

export default function NewsTab() {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className="text-3xl mb-10 md:text-4xl font-bold text-brand1">
        Запись на приём
      </h2>
      <div className="grid gap-10">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="flex flex-col md:flex-row items-start bg-white/10 rounded-xl overflow-hidden hover:bg-white/20 transition "
          >
            {/* Left: Image */}
            <div className="w-full md:w-1/3">
              <img
                src={news.image}
                alt={t(news.title)}
                className="max-w-96 w-full max-h-64 object-cover border border-brand3 rounded-xl"
              />
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-between w-full md:w-2/3 mt-4 md:mt-0 md:ml-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-brand1 mb-4">
                  {t(news.title)}
                </h3>
                <p className="text-brand2 md:text-lg ">
                  {t("news.published")}: {news.date}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  to={`/about-diseases/${news.id}`}
                  className="inline-block  text-lg font-medium hover:underline transition"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
