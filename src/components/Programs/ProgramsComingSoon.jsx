import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

// TODO: remplacer par des photos dédiées pour chaque programme plus tard
const SLIDES = [
  {
    key: "certifying",
    titleKey: "programs.comingSoon.certifying",
    image: "/assets/activity.jpeg",
  },
  {
    key: "internship",
    titleKey: "programs.comingSoon.internship",
    image: "/images/5.jpg",
  },
  {
    key: "capstone",
    titleKey: "programs.comingSoon.capstone",
    image: "/assets/activity.jpeg", // TODO: photo dédiée à remplacer
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
            className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary-300/40 bg-primary-800/50 text-white transition hover:bg-primary-700 sm:flex"
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
              className="relative h-[40vh] md:h-[50vh]"
            >
              <img
                src={SLIDES[current].image}
                alt={t(SLIDES[current].titleKey)}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-center pb-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-2xl md:text-3xl font-bold text-white text-center"
                >
                  {t(SLIDES[current].titleKey)}
                </motion.h3>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label={t("common.next")}
            className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary-300/40 bg-primary-800/50 text-white transition hover:bg-primary-700 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.key}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Afficher ${t(slide.titleKey)}`}
                aria-current={index === current}
                className={`h-2 w-2 rounded-full transition hover:bg-white/70 ${
                  index === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
    </section>
  );
}

export default ProgramsComingSoon;