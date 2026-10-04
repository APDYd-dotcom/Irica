import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { getBlogs } from "../../api/blogs";
import Container from "../Layout/Container";
import { useLanguage } from "../../i18n/LanguageContext";
import { EASE } from "../../animations/variants";

const MAX_POSTS = 5;

function LatestBlogSection() {
  const { t, language } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchLatest() {
      try {
        const response = await getBlogs();
        const data = response.data;
        const results = data?.results || data || [];

        // Fixed set of 5 — no pagination here.
        if (active) setBlogs(results.slice(0, MAX_POSTS));
      } catch {
        // Fail silently: a missing blog section must not break the homepage.
        if (active) setBlogs([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchLatest();
    return () => {
      active = false;
    };
  }, []);

  // Same short localised date format as Blog.jsx.
  const formatDate = (date) =>
    new Date(date).toLocaleDateString(language === "en" ? "en-US" : "fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // Nothing to show while loading, on error, or when there are no posts.
  if (loading || blogs.length === 0) return null;

  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="eyebrow text-primary-700">{t("blog.latestEyebrow")}</p>
            <h2 className="section-title mt-4">{t("blog.latestTitle")}</h2>
            <p className="mt-6 max-w-2xl">{t("blog.latestDescription")}</p>
          </div>
          <Link
            to="/blog"
            className="inline-flex w-max items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 shadow-sm hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
          >
            {t("publications.viewMore")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="scrollbar-hidden flex gap-6 overflow-x-auto pb-6">
          {blogs.map((blog, index) => {
            const photo = blog.photo || null;

            return (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: EASE, delay: Math.min(index, 6) * 0.06 }}
                className="flex w-72 flex-none flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md sm:w-80"
              >
                <div
                  className="relative flex h-48 flex-shrink-0 items-center justify-center bg-neutral-100"
                  style={
                    photo
                      ? {
                          backgroundImage: `url(${photo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                >
                  {!photo && <Newspaper className="h-10 w-10 text-neutral-400" />}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="line-clamp-2 text-base font-semibold text-primary-700">
                    {blog.title}
                  </h3>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900 hover:underline"
                  >
                    {t("blog.readArticle")}
                    <span aria-hidden="true">»</span>
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">
                    {blog.desc}
                  </p>
                  <p className="mt-auto pt-4 text-xs text-ink-soft">
                    {blog.created_at ? formatDate(blog.created_at) : ""}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default LatestBlogSection;