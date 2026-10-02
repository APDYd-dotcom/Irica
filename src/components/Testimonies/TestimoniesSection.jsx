import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getTestimonies } from "../../api/testimonies";

function TestimoniesSection() {
  const { t } = useLanguage();
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const scrollContainerRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const touchResumeTimerRef = useRef(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    async function fetchAllTestimonies() {
      setLoading(true);
      setError(null);
      try {
        let results = [];
        let url = "/testimonies/";

        while (url) {
          const response = await getTestimonies(url);
          const data = response.data;
          results = results.concat(data.results || data);
          url = data.next;
        }

        setTestimonies(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllTestimonies();
  }, []);

  useEffect(() => {
    if (testimonies.length <= 1) return;

    const startAutoPlay = () => {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = setInterval(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 2;
        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }, 5000);
    };

    if (!paused) {
      startAutoPlay();
    }

    return () => {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    };
  }, [testimonies.length, paused]);

  if (loading || error || testimonies.length === 0) {
    return null;
  }

  const scrollBy = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const amount = container.clientWidth;
    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  // Any slide change (manual scroll, arrows, or auto-scroll) collapses the
  // expanded testimonial so a new one never appears already opened.
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || !container.clientWidth) return;

    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      setExpandedId(null);
    }
  };

  const handleTouchStart = () => {
    setPaused(true);
    clearTimeout(touchResumeTimerRef.current);
    touchResumeTimerRef.current = setTimeout(() => {
      setPaused(false);
    }, 5000);
  };

  const showArrows = testimonies.length > 1;

  return (
    <section className="relative w-full pt-20 pb-10 md:pt-24 md:pb-12">
      <div className="absolute inset-0 bg-primary-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,122,51,0.18),transparent_60%)]" />
      <div className="relative flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
          {t("testimonies.title")}
        </h2>

        <div className="relative mt-12 w-full">
          {showArrows && (
            <button
              type="button"
              aria-label={t("common.previous")}
              onClick={() => scrollBy("prev")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-primary-300/40 bg-primary-800/50 text-white hover:bg-primary-700 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hidden px-6 sm:px-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onScroll={handleScroll}
          >
            {testimonies.map((testimonial) => {
              const content = testimonial.content || "";
              const isExpanded = expandedId === testimonial.id;
              // Rough heuristic: only offer "read more" for genuinely long texts.
              const canExpand = content.length > 400;

              return (
                <div
                  key={testimonial.id}
                  className="snap-center shrink-0 w-full flex flex-col items-center text-center px-4 sm:px-8 lg:px-16"
                >
                {testimonial.photo ? (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="h-20 w-20 rounded-full object-cover ring-4 ring-primary-400/40"
                  />
                ) : (
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500/20 text-primary-300 ring-4 ring-primary-400/40">
                    <User className="h-10 w-10" />
                  </span>
                )}
                <p className="mt-4 text-lg font-semibold text-white">
                  {testimonial.name}
                </p>
                {testimonial.position && (
                  <p className="mt-1 text-sm text-primary-200">
                    {testimonial.position}
                  </p>
                )}
                <p
                  className={`mt-4 max-w-4xl whitespace-pre-line text-sm sm:text-base leading-relaxed text-primary-50/90 italic ${
                    isExpanded ? "" : "line-clamp-6"
                  }`}
                >
                  {testimonial.content}
                </p>
                {canExpand && (
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : testimonial.id)}
                    aria-expanded={isExpanded}
                    className="mt-3 text-sm font-semibold text-primary-200 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200/60"
                  >
                    {isExpanded ? t("testimonies.readLess") : t("testimonies.readMore")}
                  </button>
                )}
                </div>
              );
            })}
          </div>

          {showArrows && (
            <button
              type="button"
              aria-label={t("common.next")}
              onClick={() => scrollBy("next")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-primary-300/40 bg-primary-800/50 text-white hover:bg-primary-700 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default TestimoniesSection;