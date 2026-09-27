import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import Container from "../components/Layout/Container";
import { useLanguage } from "../i18n/LanguageContext";
import { getBlog } from "../api/blogs";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { linkifyParagraphs } from "../utils/linkify";

function BlogDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      setError(null);
      try {
        const response = await getBlog(id);
        setBlog(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(language === "en" ? "en-US" : "fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <section className="bg-neutral-50 py-24 md:py-32">
        <Container className="text-center text-neutral-600">
          <Loader />
        </Container>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="bg-neutral-50 py-24 md:py-32">
        <Container className="text-center text-red-600">
          <ErrorMessage message={error?.message || t("blog.error")} />
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-neutral-50 py-24 md:py-32">
      <Container className="max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("blog.backToArticles")}
        </Link>

        {blog.photo && (
          <div className="mt-8 overflow-hidden rounded-2xl">
            <img
              src={blog.photo}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <h1 className="mt-8 text-3xl md:text-4xl font-bold text-neutral-900 text-center">
          {blog.title}
        </h1>

        {blog.created_at && (
          <p className="mt-4 text-center text-sm text-neutral-500">
            {formatDate(blog.created_at)}
          </p>
        )}

        <div className="mt-8">
          {linkifyParagraphs(blog.desc)}
        </div>

        {blog.file && (
          <div className="mt-10 flex justify-center">
            <a
              href={blog.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25"
            >
              <FileText className="h-4 w-4" />
              {t("blog.downloadPdf")}
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

export default BlogDetail;