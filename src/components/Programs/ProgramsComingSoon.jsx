import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="w-full bg-primary-900 py-20 md:py-24">
      <div className="flex flex-col items-center text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
          {t("programs.comingSoon.title")}
        </h2>
        <p className="mt-4 max-w-2xl text-primary-100/80">
          {t("programs.comingSoon.subtitle")}
        </p>

        <div className="relative mt-12 w-full max-w-4xl overflow-hidden rounded-2xl">
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
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
      </div>
    </section>
  );
}

export default ProgramsComingSoon;