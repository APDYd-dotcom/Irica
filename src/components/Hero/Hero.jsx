import { ArrowRight, CalendarCheck } from "lucide-react";
import videoBg from "../../assets/background.mp4";
import Container from "../Layout/Container";

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
        <div className="max-w-5xl animate-fade-in">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
            <CalendarCheck className="h-4 w-4" />
            Institut de Recherche et d'Innovation
          </div>

          <h1 className="text-white">
            Conseil, recherche et innovation pour un
            <span className="block text-primary-100">impact durable en Afrique.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white/88">
            IRICA accompagne les institutions, organisations et entreprises avec des analyses
            rigoureuses, des formations pratiques et un conseil orienté résultats.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-primary-900/25 hover:-translate-y-0.5 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto"
            >
              Consultation gratuite
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/18 focus:outline-none focus:ring-4 focus:ring-white/25 sm:w-auto"
            >
              Découvrir nos services
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
