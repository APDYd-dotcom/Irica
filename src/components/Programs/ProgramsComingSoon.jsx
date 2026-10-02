import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

// TODO: remplacer par des photos dédiées pour chaque programme plus tard
const SLIDES = [
  {
    key: "certifying",
    titleKey: "programs.comingSoon.certifying",
    image: "/images/train4.jpeg",
  },
  {
    key: "internship",
    titleKey: "programs.comingSoon.internship",
    image: "/images/traincover.jpeg",
  },
  {
    key: "capstone",
    titleKey: "programs.comingSoon.capstone",
    image: "/images/train2cover.jpeg",
  },
];

function ProgramsComingSoon() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const goTo = (index) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative w-full pt-20 md:pt-24 pb-0">
      <div className="absolute inset-0 bg-primary-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,122,51,0.18),transparent_60%)]" />
      <div className="relative flex flex-col items-center text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
          {t("programs.comingSoon.title")}
        </h2>
        <p className="mt-4 max-w-2xl text-primary-100/80">
          {t("programs.comingSoon.subtitle")}
        </p>
      </div>

      <div className="relative mt-12 w-full overflow-hidden">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label={t("common.previous")}
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:left-6 lg:h-12 lg:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={SLIDES[current].key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative h-[220px] w-full sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[380px]"
            >
              <img
                src={SLIDES[current].image}
                alt={t(SLIDES[current].titleKey)}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-3 lg:pb-4">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-center text-2xl font-bold tracking-tight text-white drop-shadow-lg md:text-3xl lg:text-4xl"
                >
                  {t(SLIDES[current].titleKey)}
                </motion.h3>

                <div className="mt-3 flex items-center gap-2 lg:mt-4">
                  {SLIDES.map((slide, index) => (
                    <button
                      key={slide.key}
                      type="button"
                      onClick={() => setCurrent(index)}
                      aria-label={`Afficher ${t(slide.titleKey)}`}
                      aria-current={index === current}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        index === current
                          ? "w-6 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label={t("common.next")}
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:right-6 lg:h-12 lg:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
    </section>
  );
}

export default ProgramsComingSoon;