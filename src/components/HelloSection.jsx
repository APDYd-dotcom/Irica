import videoBg from "../assets/background.mp4";
import { useState, useEffect } from "react";

const heroImages = [
  { url: "/images/partnership.png", caption: "Partenariats Stratégiques & Académiques" },
  { url: "/images/conference.png", caption: "Conférence « La Statistique après le Cursus Académique »" },
  { url: "/images/training.png", caption: "Formations Professionnelles Pratiques" },
];

function HeroHome() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveSlide((prev) => (prev + 1) % heroImages.length), 4500);
    return () => clearInterval(interval);
  }, []);

    return(
        <>
              {/* HERO VIDEO SECTION */}
            <section className="relative h-auto md:h-screen flex items-center justify-center overflow-hidden">
                {/* VIDEO */}
                <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                >
                <source src={videoBg} type="video/mp4" />
                </video>

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90" />

                {/* CONTENT */}
                <div className="relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 animate-fade py-20 md:py-0">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                    IRICA : recherche, formation et analyse au service de l'impact
                </h1>
                <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-10 max-w-2xl mx-auto px-4">
                    Un cabinet burundais spécialisé en recherche appliquée, suivi-évaluation et renforcement des capacités pour les projets de développement durable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                    <a href="#services" className="bg-green-600 hover:bg-green-700 px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-lg text-white font-semibold transition shadow-lg">
                    Découvrir nos services
                    </a>
                    <a href="mailto:info.irica@gmail.com" className="border-2 border-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-lg text-white hover:bg-white hover:text-black font-semibold transition">
                    Contactez-nous
                    </a>
                </div>
                </div>

            </section>

            {/* INTRO WITH SLIDESHOW SECTION */}
            <section id="hello" className="relative bg-transparent text-white py-20 md:py-28 px-6 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[4rem_4rem]" />
              <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/90 uppercase">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                    Cabinet de Conseil, Recherche & Développement
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
                    De la rigueur analytique à <span className="text-green-400">l'impact durable</span>.
                  </h1>
                  <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                    L'<strong>Institute of Research and Immersive Career Advancement (IRICA)</strong> est un cabinet d'experts basé à Bujumbura, au Burundi. Nous accompagnons les organisations et développons le capital humain d'Afrique de l'Est.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="#services" className="bg-green-600 hover:bg-green-700 text-white transition duration-300 px-8 py-3.5 rounded-lg font-semibold shadow-md text-center">
                      Découvrir nos Services
                    </a>
                    <a href="mailto:info.irica@gmail.com" className="bg-white/20 text-white hover:bg-white/30 border border-white/50 transition duration-300 px-8 py-3.5 rounded-lg font-semibold text-center">
                      Contactez-nous
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 w-full">
                  <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-white/10">
                    {heroImages.map((image, index) => (
                      <div
                        key={image.url}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                          index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <img src={image.url} alt={image.caption} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                          <p className="text-[10px] font-mono tracking-widest uppercase text-green-300/90 mb-1.5">Activité Réalisée</p>
                          <h4 className="text-base md:text-lg font-serif font-semibold leading-snug drop-shadow-md">{image.caption}</h4>
                        </div>
                      </div>
                    ))}
                    <div className="absolute bottom-5 right-5 flex gap-2 z-20">
                      {heroImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeSlide ? "bg-green-400 w-5" : "bg-white/40 hover:bg-white/65"
                          }`}
                          aria-label={`Slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
      </>
    )
}

export default HeroHome;
