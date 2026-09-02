import { ArrowRight, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import videoBg from "../../assets/background.mp4";
import Container from "../Layout/Container";
import { EASE } from "../../animations/variants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-neutral-900 pt-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/55 to-primary-500/35" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-50 to-transparent" />

      <Container className="relative z-10 flex min-h-[calc(92vh-5rem)] items-center justify-center py-24 text-center">
        <motion.div
          className="max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md"
          >
            <CalendarCheck className="h-4 w-4" />
            Institut de Recherche et d'Innovation
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-white">
            Conseil, recherche et innovation pour un
            <span className="block text-primary-100">impact durable en Afrique.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white/88"
          >
            IRICA accompagne les institutions, organisations et entreprises avec des analyses
            rigoureuses, des formations pratiques et un conseil orienté résultats.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: EASE }}
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-primary-900/25 hover:-translate-y-0.5 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto"
            >
              Consultation gratuite
              <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: EASE }}
              href="#services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/18 focus:outline-none focus:ring-4 focus:ring-white/25 sm:w-auto"
            >
              Découvrir nos services
            </motion.a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
