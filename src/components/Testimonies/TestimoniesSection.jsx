import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getTestimonies } from "../../api/testimonies";

function TestimoniesSection() {
  const { t } = useLanguage();
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

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

  const showArrows = testimonies.length > 1;

  return (
    <section className="w-full bg-neutral-900 py-20 md:py-24">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
          {t("testimonies.title")}
        </h2>

        <div className="relative mt-12 w-full">
          {showArrows && (
            <button
              type="button"
              aria-label={t("common.previous")}
              onClick={() => scrollBy("prev")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hidden px-6 sm:px-10"
          >
            {testimonies.map((testimonial) => (
              <div
                key={testimonial.id}
                className="snap-center shrink-0 w-full flex flex-col items-center text-center px-4"
              >
                {testimonial.photo ? (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500/20 text-primary-300">
                    <User className="h-10 w-10" />
                  </span>
                )}
                <p className="mt-4 text-lg font-semibold text-white">
                  {testimonial.name}
                </p>
                {testimonial.position && (
                  <p className="mt-1 text-sm text-primary-400">
                    {testimonial.position}
                  </p>
                )}
                <p className="mt-4 max-w-2xl whitespace-pre-line text-base leading-relaxed text-neutral-300 italic">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>

          {showArrows && (
            <button
              type="button"
              aria-label={t("common.next")}
              onClick={() => scrollBy("next")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
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