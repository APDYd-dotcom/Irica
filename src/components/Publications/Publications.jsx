import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, ChevronRight, FileText } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { getErrorMessage } from "../../utils/getErrorMessage";
import Container from "../Layout/Container";

function Publications() {
  const [publications, setPublications] = useState([]);
  const [nextUrl, setNextUrl] = useState("/publications/");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const rowRef = useRef(null);

  function scrollNext() {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: rowRef.current.clientWidth, behavior: "smooth" });
  }

  async function loadMore() {
    if (!nextUrl) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(nextUrl);
      const data = response.data;

      setPublications((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const nextItems = (data.results || []).filter((item) => !existingIds.has(item.id));
        return [...prev, ...nextItems];
      });
      setNextUrl(data.next ? data.next.replace(import.meta.env.VITE_API_URL, "/") : null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="publications" className="bg-white py-24 md:py-32">
      <Container>
        <div className="fade-in mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary-700">Publications</p>
            <h2 className="section-title mt-4">Analyses et réflexions récentes.</h2>
            <p className="mt-6">
              Les contributions de nos chercheurs et consultants sur les défis sociaux,
              économiques et institutionnels.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollNext}
            className="inline-flex w-max items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 shadow-sm hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
          >
            Voir autres
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <div
          ref={rowRef}
          className="scrollbar-hidden flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
        >
          {publications.map((pub) => {
            const tag = pub.program_title || pub.type || "Publication";
            const href = pub.file || pub.url || "#contact";

            return (
              <article
                key={pub.id}
                className="fade-in flex h-[26rem] w-[21rem] flex-none snap-start flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-neutral-900/10 sm:w-[24rem]"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <FileText className="h-6 w-6" />
                </div>

                <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em]">
                  <span className="inline-flex items-center gap-1.5 text-neutral-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {pub.created_at ? new Date(pub.created_at).toLocaleDateString("fr-FR") : "Date à venir"}
                  </span>
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700">{tag}</span>
                </div>

                <h3 className="text-xl font-bold leading-snug">
                  {pub.title}
                  {console.log(pub.title)}
                </h3>
                <p className="mt-4 line-clamp-5 text-sm leading-6 text-neutral-600">
                  {pub.description}
                </p>

                <a
                  href={href}
                  target={href === "#contact" ? undefined : "_blank"}
                  rel={href === "#contact" ? undefined : "noreferrer"}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:gap-3 hover:text-primary-800"
                >
                  Lire plus
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
          {loading ? (
            <button
              type="button"
              disabled
              className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white opacity-80"
            >
              Chargement...
            </button>
          ) : null}
          {!loading && nextUrl ? (
            <button
              type="button"
              onClick={loadMore}
              className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-900/15 focus:outline-none focus:ring-4 focus:ring-primary-500/25"
            >
              Charger plus
            </button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export default Publications;
