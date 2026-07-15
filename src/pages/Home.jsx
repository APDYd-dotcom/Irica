import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const heroImages = [
    {
      url: "/images/partnership.png",
      caption: "Partenariats Stratégiques & Académiques"
    },
    {
      url: "/images/conference.png",
      caption: "Conférence « La Statistique après le Cursus Académique »"
    },
    {
      url: "/images/training.png",
      caption: "Formations Professionnelles Pratiques"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const PILLARS = [
    {
      title: "Services, Conseil & Audit",
      subtitle: "Pôle Conseil & Audit — Stratégie & Performance",
      icon: (
        <svg className="w-8 h-8 text-forest-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      items: [
        "Audit organisationnel et financier pour les structures associatives et PME.",
        "Conseil stratégique pour une gestion financière optimisée.",
        "Consultance spécialisée : suivi-évaluation, gestion et création de proposals."
      ]
    },
    {
      title: "Programmes & Formations",
      subtitle: "Pôle Formation & Langues — Capacité & Carrière",
      icon: (
        <svg className="w-8 h-8 text-forest-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      items: [
        "Capstone Program & Internship Program : transition concrète du monde académique vers le milieu professionnel.",
        "Formations certifiantes : gestion de projets, suivi-évaluation, et outils d'analyse de données.",
        "Communication internationale : apprentissage et maîtrise des langues de travail, cours de traduction et d'interprétation."
      ]
    },
    {
      title: "Recherche & Publications",
      subtitle: "Pôle Recherche — Données & Connaissances",
      icon: (
        <svg className="w-8 h-8 text-forest-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      items: [
        "Études approfondies sur les défis socio-économiques du développement en Afrique de l'Est.",
        "Organisation de conférences thématiques sur le Leadership & l'Entrepreneuriat.",
        "Services linguistiques de haute précision : traduction et interprétation de documents techniques et scientifiques."
      ]
    }
  ];

  const VALUES = [
    { title: "Rigueur", desc: "Chaque donnée, chaque analyse et chaque recommandation repose sur une méthodologie vérifiable et documentée.", icon: "🎯" },
    { title: "Intégrité", desc: "Indépendance, impartialité et objectivité guident l'ensemble de nos missions, sans compromis.", icon: "⚖️" },
    { title: "Impact", desc: "Nous mesurons la valeur de notre travail à sa capacité à produire un changement concret, mesurable et durable.", icon: "⚡" },
    { title: "Proximité", desc: "Une connaissance fine du contexte burundais et est-africain, au service de recommandations réellement applicables.", icon: "🤝" }
  ];

  const METHODOLOGY = [
    { num: "01", step: "Cadrage & Diagnostic", desc: "Analyse approfondie du contexte, des besoins et des attentes ; définition conjointe des objectifs et indicateurs de succès." },
    { num: "02", step: "Conception & Planification", desc: "Élaboration du plan de travail, sélection de la méthodologie adaptée et constitution de l'équipe d'experts." },
    { num: "03", step: "Collecte & Analyse", desc: "Déploiement sur le terrain, collecte rigoureuse des données (quantitatives et qualitatives) et contrôle qualité en temps réel." },
    { num: "04", step: "Restitution & Livrables", desc: "Production de rapports analytiques de haute qualité et présentation des résultats aux parties prenantes." },
    { num: "05", step: "Suivi & Capitalisation", desc: "Documentation des leçons apprises et accompagnement dans la mise en œuvre des recommandations opérationnelles." }
  ];

  const REALIZATIONS = [
    {
      title: "Partenariats Stratégiques Académiques",
      desc: "Signature officielle de conventions de collaboration (comme avec le Club Statistique de l'Université du Lac Tanganyika) et avec des acteurs privés. Nous bâtissons des ponts solides reliant les étudiants, les chercheurs et le marché du travail.",
      image: "/images/partnership.png",
      alt: "Signature de partenariat"
    },
    {
      title: "Conférence « La Statistique après le Cursus Académique »",
      desc: "Des panels et conférences d'envergure réunissant plus d'une centaine d'étudiants, de diplômés et de professionnels pour discuter des enjeux d'orientation, d'intégration et d'évolution professionnelle en Afrique de l'Est.",
      image: "/images/conference.png",
      alt: "Conférence statistique IRICA"
    },
    {
      title: "Formations Professionnelles & Pratiques",
      desc: "Sessions intensives organisées dans nos locaux à Bujumbura. Nous renforçons les capacités des professionnels et des jeunes diplômés sur des cas réels en utilisant les outils de pointe (SPSS, Stata, R, Power BI, Excel avancé, MS Project).",
      image: "/images/training.png",
      alt: "Formation pratique IRICA"
    }
  ];

  return (
    <div className="bg-white text-ink overflow-x-hidden">
      {/* HERO SECTION / HELLO SECTION */}
      <section className="relative bg-white text-ink py-20 md:py-28 px-6 overflow-hidden border-b border-forest-100">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#007A33_1px,transparent_1px),linear-gradient(to_bottom,#007A33_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-forest-50 border border-forest-100 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-forest-800 uppercase">
              <span className="w-2 h-2 rounded-full bg-forest-800 animate-ping" />
              Cabinet de Conseil, Recherche & Développement
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-ink">
              De la rigueur analytique à <span className="text-forest-800">l'impact durable</span>.
            </h1>
            
            <p className="text-ink-soft text-lg md:text-xl font-light leading-relaxed">
              L'<strong>Institute of Research and Immersive Career Advancement (IRICA)</strong> est un cabinet d'experts basé à Bujumbura, au Burundi. Nous accompagnons les organisations et développons le capital humain d'Afrique de l'Est.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#qui-sommes-nous"
                className="bg-forest-800 hover:bg-forest-700 text-white transition duration-300 px-8 py-3.5 rounded-lg font-semibold shadow-md text-center"
              >
                Découvrir l'Institut
              </a>
              <Link
                to="/materials"
                className="bg-white text-forest-850 hover:bg-forest-50 border border-forest-800/30 transition duration-300 px-8 py-3.5 rounded-lg font-semibold text-center"
              >
                Accéder aux Ressources
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            {/* Smooth Fading Image Slideshow Frame */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-forest-100/60 bg-forest-50">
              {heroImages.map((image, index) => (
                <div
                  key={image.url}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  
                  {/* Slide details */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-[10px] font-mono tracking-widest uppercase text-forest-100/90 mb-1.5">
                      Activité Réalisée
                    </p>
                    <h4 className="text-base md:text-lg font-serif font-semibold leading-snug drop-shadow-md">
                      {image.caption}
                    </h4>
                  </div>
                </div>
              ))}

              {/* Dot Indicators */}
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

      {/* QUI SOMMES-NOUS & HISTOIRE */}
      <section id="qui-sommes-nous" className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">
            ▪ Qui sommes-nous
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink leading-tight">
            Un positionnement hybride unique en Afrique de l'Est.
          </h2>
          <p className="text-ink-soft leading-relaxed text-lg">
            IRICA se distingue par une double exigence : la rigueur méthodologique héritée du monde académique et la réactivité qu’exige le terrain. 
          </p>
          <div className="p-6 bg-forest-50 border-l-4 border-forest-800 rounded-r-xl">
            <p className="italic text-ink font-serif text-lg leading-relaxed">
              « IRICA est né d'une conviction simple : l'Afrique de l'Est ne manque ni de talents ni d'ambition, elle a besoin de structures capables de transformer la donnée en décision et la formation en carrière. »
            </p>
            <p className="mt-4 font-semibold text-sm text-forest-800 font-mono">
              — Patrick BIZOZA, Directeur Exécutif
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-ink-soft leading-relaxed">
          <h3 className="font-serif text-2xl font-bold text-ink">Notre Histoire</h3>
          <p>
            IRICA est né de la rencontre entre des professionnels burundais formés aux exigences de la statistique, de l'audit et de la gestion de projets, et d'une observation partagée : trop de jeunes diplômés talentueux peinent à transformer leur formation académique en carrière, faute de passerelles concrètes vers le monde professionnel.
          </p>
          <p>
            Depuis sa création, nous avons construit un réseau solide en priorité auprès du monde universitaire burundais, avant d'élargir nos activités vers les organisations non gouvernementales, les institutions publiques et les entreprises privées. 
          </p>
          <p>
            Chaque mission est pensée comme une occasion de renforcer durablement les capacités locales de nos partenaires, et non comme une prestation isolée. Aujourd’hui, l'institut oriente son action autour de trois pôles complémentaires :
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="border-t border-forest-800/20 pt-4">
              <span className="block font-mono text-3xl font-bold text-forest-800">100%</span>
              <span className="text-xs font-mono uppercase text-ink-soft">Engagement Qualité</span>
            </div>
            <div className="border-t border-forest-800/20 pt-4">
              <span className="block font-mono text-3xl font-bold text-forest-800">Burundi</span>
              <span className="text-xs font-mono uppercase text-ink-soft">Ancrage régional</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE EXPERTISE PILLARS */}
      <section className="bg-forest-50 py-20 px-6 border-y border-forest-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">
              ▪ Domaines d'Expertise
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
              Nos Trois Piliers d'Intervention
            </h2>
            <p className="text-ink-soft max-w-xl mx-auto">
              Une structure intégrée pour couvrir l'intégralité de vos besoins : de la donnée à la formation, de la stratégie à l'impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white p-8 rounded-2xl border border-forest-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-forest-50 flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-ink mb-1">{pillar.title}</h3>
                <p className="text-xs font-mono text-forest-700 mb-6 uppercase">{pillar.subtitle}</p>
                
                <ul className="space-y-4 text-sm text-ink-soft flex-grow">
                  {pillar.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-forest-800 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION, VISION & ACTIONS (HUMANIZING ELEMENTS LIKE CDE GREAT LAKES) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mb-20">
          <div className="bg-forest-50 border border-forest-100 p-10 md:p-12 rounded-3xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-forest-800">▪ Notre Mission</span>
              <h3 className="font-serif text-3xl font-bold text-ink leading-tight">
                Accompagner les organisations et former les leaders de demain.
              </h3>
              <p className="text-ink-soft leading-relaxed">
                Nous aidons les professionnels et les organisations à générer des connaissances rigoureuses, à renforcer leurs compétences techniques et à mettre en œuvre des systèmes de pilotage hautement performants pour un impact sociétal réel.
              </p>
            </div>
            <div className="pt-8 font-mono text-xs text-forest-800 font-semibold">
              Cabinet IRICA — Bujumbura
            </div>
          </div>

          <div className="bg-white border border-forest-100 p-10 md:p-12 rounded-3xl flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-forest-800">▪ Notre Vision</span>
              <h3 className="font-serif text-3xl font-bold text-ink leading-tight">
                Devenir le partenaire de référence en Afrique de l'Est.
              </h3>
              <p className="text-ink-soft leading-relaxed">
                Notre ambition est de s'imposer comme le partenaire technique de référence pour la recherche appliquée, l'évaluation indépendante de programmes et le développement intensif du capital humain en alignant les exigences locales avec les plus hauts standards.
              </p>
            </div>
            <div className="pt-8 font-mono text-xs text-ink-soft/60">
              Rigueur · Indépendance · Impact
            </div>
          </div>
        </div>

        {/* HUMANIZING ACTION BLOCKS (Inspired by CDE Great Lakes Ateliers, Recherches, Echanges, Reseautage) */}
        <div className="border-t border-forest-100 pt-16">
          <div className="text-center space-y-4 mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
              Engager le Changement par des Actions Concrètes
            </h3>
            <p className="text-ink-soft max-w-xl mx-auto text-sm">
              Comment nous traduisons nos valeurs d'Intégrité et d'Impact sur le terrain au Burundi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-sm space-y-4 hover:border-forest-800/40 transition duration-300">
              <div className="text-2xl">📚</div>
              <h4 className="font-serif text-lg font-bold text-ink">Ateliers & Formations</h4>
              <p className="text-xs text-ink-soft leading-relaxed">
                Transfert intensif de compétences sur SPSS, Stata, R, Power BI et la gestion de projets (PMD Pro, référentiel Sphère).
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-sm space-y-4 hover:border-forest-800/40 transition duration-300">
              <div className="text-2xl">🔬</div>
              <h4 className="font-serif text-lg font-bold text-ink">Recherches Appliquées</h4>
              <p className="text-xs text-ink-soft leading-relaxed">
                Enquêtes de terrain quantitatives et qualitatives, modélisations économétriques et analyses d'impact socio-économiques.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-sm space-y-4 hover:border-forest-800/40 transition duration-300">
              <div className="text-2xl">🗣️</div>
              <h4 className="font-serif text-lg font-bold text-ink">Échanges & Débats</h4>
              <p className="text-xs text-ink-soft leading-relaxed">
                Tables rondes, forums d'orientation académique et panels reliant jeunes statisticiens et recruteurs du secteur privé.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-sm space-y-4 hover:border-forest-800/40 transition duration-300">
              <div className="text-2xl">🤝</div>
              <h4 className="font-serif text-lg font-bold text-ink">Réseautage Stratégique</h4>
              <p className="text-xs text-ink-soft leading-relaxed">
                Partenariats actifs avec des institutions d'enseignement supérieur comme le Club Statistique de l'Université du Lac Tanganyika.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOS PROJETS EN COURS (Humanizing project showcase) */}
      <section className="bg-forest-50 py-20 px-6 border-y border-forest-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">
              ▪ Impact Régional
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
              Nos Activités & Projets en cours
            </h2>
            <p className="text-ink-soft max-w-xl mx-auto text-sm">
              Découvrez nos initiatives actives concrétisant le lien entre théorie académique et employabilité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REALIZATIONS.map((real, idx) => (
              <div key={real.title} className="bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-forest-100">
                    <img src={real.image} alt={real.alt} className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 bg-forest-800 text-white font-mono text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      Actif
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-ink leading-snug">{real.title}</h3>
                    <p className="text-xs text-ink-soft leading-relaxed">{real.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link to="/materials" className="inline-flex items-center gap-1 text-xs font-semibold text-forest-800 hover:text-forest-750 transition">
                    Voir les rapports associés <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYSES & REFLEXIONS (OP-ED STYLE) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">
            ▪ Études de Recherche & Op-Ed
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
            Analyses & Réflexions Récentes
          </h2>
          <p className="text-ink-soft max-w-xl mx-auto text-sm">
            Les points de vue et contributions techniques de nos chercheurs et consultants sur les défis socio-économiques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="p-6 rounded-2xl border border-forest-100 hover:border-forest-800/30 transition duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-ink-soft">
                <span>Juillet 2026</span>
                <span className="text-forest-800 uppercase font-semibold">Employabilité</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-ink leading-snug hover:text-forest-800 transition">
                <a href="#qui-sommes-nous">Quand la statistique devient un levier d'employabilité pour la jeunesse burundaise</a>
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Dans un marché du travail régional concurrentiel, la maîtrise pratique de logiciels comme Stata, SPSS et R n'est plus un simple atout, mais un prérequis absolu pour l'insertion des jeunes cadres.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-forest-50">
              <div className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center font-mono text-xs font-bold">
                PB
              </div>
              <div>
                <h5 className="text-xs font-bold text-ink">Patrick BIZOZA</h5>
                <p className="text-[10px] text-ink-soft font-mono">Directeur Exécutif</p>
              </div>
            </div>
          </article>

          <article className="p-6 rounded-2xl border border-forest-100 hover:border-forest-800/30 transition duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-ink-soft">
                <span>Juin 2026</span>
                <span className="text-forest-800 uppercase font-semibold">Suivi-Évaluation</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-ink leading-snug hover:text-forest-800 transition">
                <a href="#qui-sommes-nous">Pourquoi le suivi-évaluation conditionne la réussite des projets de développement</a>
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Les organisations non gouvernementales doivent adopter des standards d'évaluation indépendants et rigoureux (OECD-DAC) pour mesurer objectivement l'impact de leurs programmes de terrain.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-forest-50">
              <div className="w-8 h-8 rounded-full bg-forest-900 text-white flex items-center justify-center font-mono text-xs font-bold">
                JN
              </div>
              <div>
                <h5 className="text-xs font-bold text-ink">Jean-Claude NDUWIMANA</h5>
                <p className="text-[10px] text-ink-soft font-mono">Spécialiste Suivi-Éval</p>
              </div>
            </div>
          </article>

          <article className="p-6 rounded-2xl border border-forest-100 hover:border-forest-800/30 transition duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-ink-soft">
                <span>Mai 2026</span>
                <span className="text-forest-800 uppercase font-semibold">Audit & PME</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-ink leading-snug hover:text-forest-800 transition">
                <a href="#qui-sommes-nous">PME à Bujumbura : les clés d'une gestion financière saine et d'un audit transparent</a>
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                L'audit organisationnel et financier n'est pas uniquement un exercice réglementaire, c'est un puissant outil de pilotage interne et un gage de confiance pour attirer les bailleurs internationaux.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-forest-50">
              <div className="w-8 h-8 rounded-full bg-forest-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                AN
              </div>
              <div>
                <h5 className="text-xs font-bold text-ink">Aline NIYOMWUNGERE</h5>
                <p className="text-[10px] text-ink-soft font-mono">Responsable Recherche</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* NOTRE EQUIPE (HUMANIZING TEAM) */}
      <section className="bg-forest-50 py-20 px-6 border-y border-forest-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">
              ▪ L'Équipe d'Experts
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
              Qui se cache derrière IRICA ?
            </h2>
            <p className="text-ink-soft max-w-xl mx-auto text-sm">
              Une équipe pluridisciplinaire unie par une vision commune du renforcement des capacités et du développement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-forest-100 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-forest-800 text-white font-mono text-2xl font-bold flex items-center justify-center mx-auto shadow-sm">
                PB
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-ink">Patrick BIZOZA</h4>
                <p className="text-xs font-mono text-forest-800 uppercase font-semibold">Directeur Exécutif</p>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed">
                Expert senior en économie du développement et statistiques. Patrick pilote la vision stratégique d'IRICA et les relations avec les partenaires académiques régionaux.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-forest-100 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-forest-900 text-white font-mono text-2xl font-bold flex items-center justify-center mx-auto shadow-sm">
                JN
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-ink">Jean-Claude NDUWIMANA</h4>
                <p className="text-xs font-mono text-forest-800 uppercase font-semibold">Spécialiste Suivi-Évaluation</p>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed">
                Fort de plus de 8 ans d'expérience dans les ONG, Jean-Claude dirige les évaluations d'impact de projets et forme la jeune génération aux outils de collecte comme KoBoToolbox.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-forest-100 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-forest-600 text-white font-mono text-2xl font-bold flex items-center justify-center mx-auto shadow-sm">
                AN
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-ink">Aline NIYOMWUNGERE</h4>
                <p className="text-xs font-mono text-forest-800 uppercase font-semibold">Responsable Recherche & Statistique</p>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed">
                Analyste de données spécialisée sur Stata et R. Aline supervise le contrôle qualité des bases de données et anime les cours d'économétrie appliquée au sein d'IRICA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION (TIMELINE IN LIGHT THEME) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-forest-800 font-mono text-xs font-semibold tracking-widest uppercase">▪ Rigueur Méthodologique</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">Notre Cycle d'Intervention en 5 Étapes</h2>
          <p className="text-ink-soft max-w-xl mx-auto text-sm">
            Chaque mission fait l'objet d'un suivi méthodique rigoureux pour garantir l'excellence et la reproductibilité des résultats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {METHODOLOGY.map((step, idx) => (
            <div key={step.num} className="bg-white border border-forest-100/60 p-6 rounded-2xl relative shadow-sm hover:border-forest-800/30 transition duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-3xl font-bold text-forest-800">{step.num}</span>
                {idx < 4 && <span className="hidden md:inline text-forest-100 text-lg">➔</span>}
              </div>
              <h4 className="font-serif text-base font-bold text-ink mb-2">{step.step}</h4>
              <p className="text-xs text-ink-soft leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US (LIGHT THEME) */}
      <section className="bg-forest-50 py-20 px-6 border-t border-forest-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">
              ▪ Excellence technique
            </span>
            <h2 className="font-serif text-3xl font-bold text-ink">
              Pourquoi faire confiance à IRICA ?
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed">
              Nous allions des experts pluridisciplinaires burundais chevronnés avec une maîtrise parfaite des outils analytiques et logiciels de pointe pour garantir des résultats à fort impact.
            </p>

            {/* List of tools */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="bg-forest-100 text-forest-800 p-1.5 rounded-lg text-xs font-mono">Logiciels</span>
                <p className="text-sm text-ink-soft">
                  Maîtrise d'outils professionnels : <strong>SPSS</strong>, <strong>Stata</strong>, <strong>R / RStudio</strong>, <strong>Power BI</strong>, <strong>Excel avancé</strong>, <strong>KoBoToolbox</strong>.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-forest-100 text-forest-800 p-1.5 rounded-lg text-xs font-mono">Méthodes</span>
                <p className="text-sm text-ink-soft">
                  Analyses quantitatives, modélisations économétriques, focus groups qualitatifs, théories du changement, et évaluations de performance.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-forest-100 text-forest-800 p-1.5 rounded-lg text-xs font-mono">Normes</span>
                <p className="text-sm text-ink-soft">
                  Alignement strict avec les référentiels internationaux reconnus : <strong>OECD-DAC</strong>, <strong>PMD Pro</strong>, et standards humanitaires <strong>Sphère</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-forest-100 space-y-2">
              <span className="text-2xl font-mono font-bold text-forest-800">100%</span>
              <h5 className="font-bold text-xs text-ink uppercase">Confidentialité</h5>
              <p className="text-xs text-ink-soft">Discrétion absolue et protocoles de protection stricts.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-forest-100 space-y-2">
              <span className="text-2xl font-mono font-bold text-forest-800">≥ 95%</span>
              <h5 className="font-bold text-xs text-ink uppercase">Satisfaction</h5>
              <p className="text-xs text-ink-soft">Taux d'approbation et recommandation de nos partenaires.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-forest-100 space-y-2">
              <span className="text-2xl font-mono font-bold text-forest-800">&lt; 72h</span>
              <h5 className="font-bold text-xs text-ink uppercase">Réactivité</h5>
              <p className="text-xs text-ink-soft">Délai maximal de réponse à toutes les requêtes.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-forest-100 space-y-2">
              <span className="text-2xl font-mono font-bold text-forest-800">Certifié</span>
              <h5 className="font-bold text-xs text-ink uppercase">Formations</h5>
              <p className="text-xs text-ink-soft">Attestations officielles remises après chaque programme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION (LIGHT & WARM BRAND GRADIENT) */}
      <section className="bg-gradient-to-br from-forest-50 to-white text-ink py-20 px-6 text-center relative overflow-hidden border-t border-forest-100">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,#007A33_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-forest-800 font-semibold">▪ Rejoignez-nous</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-ink">
            Prêt à collaborer pour un impact durable ?
          </h2>
          <p className="text-ink-soft text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Que vous représentiez une ONG, une université, une entreprise privée ou une institution publique, nous concevons des solutions sur mesure adaptées à vos défis régionaux.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/checkout"
              className="bg-forest-800 text-white hover:bg-forest-750 transition duration-300 px-8 py-4 rounded-lg font-bold shadow-md"
            >
              Souscrire à nos Publications
            </Link>
            <a
              href="mailto:info.irica@gmail.com"
              className="bg-white text-forest-850 hover:bg-forest-50 border border-forest-800/30 transition duration-300 px-8 py-4 rounded-lg font-bold"
            >
              Devenir Partenaire
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
