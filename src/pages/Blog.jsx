import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "../components/Layout/Container";
import { EASE } from "../animations/variants";
import { getBlogs } from "../api/blogs";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { ArrowLeft, ArrowRight, FileText, Newspaper } from "lucide-react";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchAllBlogs() {
      setLoading(true);
      setError(null);
      try {
        let results = [];
        let url = "/blogs/";

        while (url) {
          const response = await getBlogs(url);
          const data = response.data;
          results = results.concat(data.results || data);
          url = data.next;
        }

        setBlogs(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllBlogs();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const pageSize = 6;
  const totalPages = Math.ceil(blogs.length / pageSize);
  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedBlogs = blogs.slice(start, end);

    if (loading) {
    return (
      <section className="bg-neutral-50 py-24 md:py-32">
        <Container className="text-center text-neutral-600">
          <Loader />
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-neutral-50 py-24 md:py-32">
        <Container className="text-center text-red-600">
          <ErrorMessage message={error.message || "Impossible de charger les billets."} />
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-neutral-50 py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="eyebrow text-primary-700">Blog</p>
          <h2 className="section-title mt-4">Blog &amp; actualités.</h2>
          <p className="mt-6 max-w-2xl">
            Découvrez nos derniers articles, analyses et retours d'expérience sur le conseil,
            la recherche et l'innovation en Afrique.
          </p>
        </motion.div>

        {blogs.length === 0 ? (
          <div className="text-center text-sm text-ink-soft py-10">Aucun billet pour le moment.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedBlogs.map((blog, index) => {
              const photo = blog.photo || null;

              return (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: EASE, delay: Math.min(index, 6) * 0.06 }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition"
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
                    <h3 className="line-clamp-2 text-base font-semibold text-ink">{blog.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">{blog.desc}</p>
                    <p className="mt-4 text-xs text-ink-soft">
                      {blog.created_at ? formatDate(blog.created_at) : ""}
                    </p>
                    {blog.file && (
                      <a
                        href={blog.file}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25"
                      >
                        <FileText className="h-4 w-4" />
                        Lire l'article
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </button>
            <span className="text-sm text-ink-soft">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Blog;
