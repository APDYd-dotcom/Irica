import videoBg from "../assets/background.mp4";
import { useState, useEffect } from "react";

const heroImages = [
  { url: "/images/1.jpg", caption: "" },
  { url: "/images/2.jpg", caption: "" },
  { url: "/images/3.jpg", caption: ""},
  { url: "/images/4.jpg", caption: "" },
  { url: "/images/5.jpg", caption: "Conférence « La Statistique après le Cursus Académique »" },
  { url: "/images/6.jpg", caption: "Formations Professionnelles Pratiques" },
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
            <section className="relative h-[60vh] md:h-[75vh] lg:h-[65vh] flex items-center justify-center overflow-hidden">
                {/* VIDEO */}
                <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ objectPosition: 'top center' }}
                >
                <source src={videoBg} type="video/mp4" />
                </video>

                {/* GRADIENT OVERLAY */}
                 
                {/* <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90" /> */}

                {/* CONTENT */}
                {/* <div className="relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 animate-fade py-20 md:py-0">
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
                </div> */}

            </section>

              {/* INTRO WITH SLIDESHOW SECTION */}
            <section id="hello" className="relative bg-white text-ink py-20 md:py-28 px-6 overflow-hidden border-b border-forest-100">
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#007A33_1px,transparent_1px),linear-gradient(to_bottom,#007A33_1px,transparent_1px)] bg-size-[4rem_4rem]" />
              <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-forest-50 border border-forest-100 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-forest-800 uppercase">
                    <span className="w-2 h-2 rounded-full bg-forest-800 animate-ping" />
                    IRICA-Institute of Research and Immersive Career Advancement
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-ink">
                    De la rigueur analytique à <span className="text-forest-800">l'impact durable</span>.
                  </h1>
                  <p className="text-ink-soft text-lg md:text-xl font-light leading-relaxed">
                    <strong>IRICA</strong> est un cabinet spécialisé dans la recherche appliquée, les statistiques et l'analyse de données, la gestion de projets et le suivi-évaluation, le développement des capacités, ainsi que l'audit et la consultance institutionnelle.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="#services" className="bg-forest-800 hover:bg-forest-700 text-white transition duration-300 px-8 py-3.5 rounded-lg font-semibold shadow-md text-center">
                      Découvrir nos Services
                    </a>
                    <a href="#Contact" className="bg-white text-forest-850 hover:bg-forest-50 border border-forest-800/30 transition duration-300 px-8 py-3.5 rounded-lg font-semibold text-center">
                      Contactez-nous
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 w-full">
                  <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-xl border border-forest-100/60 bg-forest-50">
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
                          <p className="text-[10px] font-mono tracking-widest uppercase text-forest-100/90 mb-1.5">Activité Réalisée</p>
                          <h4 className="text-base md:text-lg font-serif font-semibold leading-snug drop-shadow-md"></h4>
                        </div>
                      </div>
                    ))}
                    <div className="absolute bottom-5 right-5 flex gap-2 z-20">
                      {heroImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeSlide ? "bg-white w-5" : "bg-white/40 hover:bg-white/65"
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
