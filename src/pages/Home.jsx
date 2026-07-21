import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroHome from "../components/HelloSection";
export default function Home() {
  /* ──── Hero slideshow state ──── */
  const heroImages = [
    { url: "/images/partnership.png", caption: "Partenariats Stratégiques & Académiques" },
    { url: "/images/conference.png", caption: "Conférence « La Statistique après le Cursus Académique »" },
    { url: "/images/training.png", caption: "Formations Professionnelles Pratiques" },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveSlide((p) => (p + 1) % heroImages.length), 4500);
    return () => clearInterval(interval);
  }, []);

  /* ──── Services data ──── */
  const SERVICES = [
    {
      title: "Recherche Appliquée, Statistiques & Analyse de Données",
      icon: (
        <svg className="w-8 h-8 text-forest-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      items: [
        "Études de terrain quantitatives et qualitatives, enquêtes et collecte de données.",
        "Modélisations économétriques et analyses statistiques avancées (SPSS, Stata, R, Power BI).",
        "Publication de rapports de recherche et contributions scientifiques.",
      ],
    },
    {
      title: "Gestion de Projets & Suivi-Évaluation",
      icon: (
        <svg className="w-8 h-8 text-forest-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      items: [
        "Conception, planification et pilotage de projets de développement.",
        "Évaluations indépendantes d'impact selon les critères OECD-DAC.",
        "Suivi en temps réel, contrôle qualité et capitalisation des leçons apprises.",
      ],
    },
    {
      title: "Audit & Consultance Institutionnelle",
      icon: (
        <svg className="w-8 h-8 text-forest-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      items: [
        "Audit organisationnel et financier pour associations, PME et institutions.",
        "Conseil stratégique pour une gestion financière optimisée.",
        "Consultance spécialisée : création de proposals et accompagnement des bailleurs.",
      ],
    },
  ];

  /* ──── Programs data ──── */
  const PROGRAMS = [
    {
      title: "Capstone Program",
      desc: "Un programme intensif de recherche appliquée qui permet aux étudiants de travailler sur des projets concrets avec des données réelles, encadrés par des experts IRICA.",
      icon: "🎓",
    },
    {
      title: "Internship Program",
      desc: "Passerelle académique vers le monde professionnel : stages encadrés au sein du cabinet pour développer des compétences directement employables.",
      icon: "💼",
    },
    {
      title: "Formations Certifiantes",
      desc: "Sessions intensives sur SPSS, Stata, R, Power BI, Excel avancé, MS Project — management de projets, suivi-évaluation et analyse de données.",
      icon: "📊",
    },
    {
      title: "Conférences & Ateliers d'Orientation",
      desc: "Panels et conférences d'envergure réunissant étudiants, diplômés et professionnels pour discuter des enjeux d'intégration et d'évolution professionnelle.",
      icon: "🗣️",
    },
  ];

  /* ──── Publications data ──── */
  const PUBLICATIONS = [
    {
      date: "Juillet 2026",
      tag: "Employabilité",
      title: "Quand la statistique devient un levier d'employabilité pour la jeunesse burundaise",
      excerpt: "Dans un marché du travail régional concurrentiel, la maîtrise pratique de logiciels comme Stata, SPSS et R n'est plus un simple atout, mais un prérequis absolu pour l'insertion des jeunes cadres.",
      author: "Patrick BIZOZA",
      role: "Directeur Exécutif",
      initials: "PB",
      color: "bg-forest-800",
    },
    {
      date: "Juin 2026",
      tag: "Suivi-Évaluation",
      title: "Pourquoi le suivi-évaluation conditionne la réussite des projets de développement",
      excerpt: "Les organisations non gouvernementales doivent adopter des standards d'évaluation indépendants et rigoureux (OECD-DAC) pour mesurer objectivement l'impact de leurs programmes de terrain.",
      author: "Jean-Claude NDUWIMANA",
      role: "Spécialiste Suivi-Éval",
      initials: "JN",
      color: "bg-forest-900",
    },
    {
      date: "Mai 2026",
      tag: "Audit & PME",
      title: "PME à Bujumbura : les clés d'une gestion financière saine et d'un audit transparent",
      excerpt: "L'audit organisationnel et financier n'est pas uniquement un exercice réglementaire, c'est un puissant outil de pilotage interne et un gage de confiance pour attirer les bailleurs internationaux.",
      author: "Aline NIYOMWUNGERE",
      role: "Responsable Recherche",
      initials: "AN",
      color: "bg-forest-600",
    },
  ];

  /* ──── Activities data ──── */
  const ACTIVITIES = [
    {
      title: "Partenariats Stratégiques Académiques",
      desc: "Signature officielle de conventions de collaboration (comme avec le Club Statistique de l'Université du Lac Tanganyika) et avec des acteurs privés. Nous bâtissons des ponts solides reliant les étudiants, les chercheurs et le marché du travail.",
      image: "/images/partnership.png",
      alt: "Signature de partenariat",
    },
    {
      title: "Conférence « La Statistique après le Cursus Académique »",
      desc: "Des panels et conférences d'envergure réunissant plus d'une centaine d'étudiants, de diplômés et de professionnels pour discuter des enjeux d'orientation, d'intégration et d'évolution professionnelle en Afrique de l'Est.",
      image: "/images/conference.png",
      alt: "Conférence statistique IRICA",
    },
    {
      title: "Formations Professionnelles & Pratiques",
      desc: "Sessions intensives organisées dans nos locaux à Bujumbura. Nous renforçons les capacités des professionnels et des jeunes diplômés sur des cas réels en utilisant les outils de pointe (SPSS, Stata, R, Power BI, Excel avancé, MS Project).",
      image: "/images/training.png",
      alt: "Formation pratique IRICA",
    },
  ];

  /* ──── Team data ──── */
  const TEAM = [
    {
      name: "Patrick BIZOZA",
      role: "Directeur Exécutif",
      initials: "PB",
      color: "bg-forest-800",
      bio: "Expert senior en économie du développement et statistiques. Patrick pilote la vision stratégique d'IRICA et les relations avec les partenaires académiques régionaux.",
    },
    {
      name: "Jean-Claude NDUWIMANA",
      role: "Spécialiste Suivi-Évaluation",
      initials: "JN",
      color: "bg-forest-900",
      bio: "Fort de plus de 8 ans d'expérience dans les ONG, Jean-Claude dirige les évaluations d'impact de projets et forme la jeune génération aux outils de collecte comme KoBoToolbox.",
    },
    {
      name: "Aline NIYOMWUNGERE",
      role: "Responsable Recherche & Statistique",
      initials: "AN",
      color: "bg-forest-600",
      bio: "Analyste de données spécialisée sur Stata et R. Aline supervise le contrôle qualité des bases de données et anime les cours d'économétrie appliquée au sein d'IRICA.",
    },
  ];

  return (

    <div className="bg-white text-ink overflow-x-hidden">
      
      <HeroHome/> 
       
      {/* ═══════════════════════════════════════════════════
          1. HELLO SECTION (HERO)
         ═══════════════════════════════════════════════════ */}
      <section id="hello" className="relative bg-white text-ink py-20 md:py-28 px-6 overflow-hidden border-b border-forest-100">
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
              <a href="#services" className="bg-forest-800 hover:bg-forest-700 text-white transition duration-300 px-8 py-3.5 rounded-lg font-semibold shadow-md text-center">
                Découvrir nos Services
              </a>
              <Link to="/materials" className="bg-white text-forest-850 hover:bg-forest-50 border border-forest-800/30 transition duration-300 px-8 py-3.5 rounded-lg font-semibold text-center">
                Accéder aux Ressources
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-forest-100/60 bg-forest-50">
              {heroImages.map((image, index) => (
                <div
                  key={image.url}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img src={image.url} alt={image.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-[10px] font-mono tracking-widest uppercase text-forest-100/90 mb-1.5">Activité Réalisée</p>
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

      

      {/* ═══════════════════════════════════════════════════
          2. SERVICES
         ═══════════════════════════════════════════════════ */}
      <section id="services" className="bg-forest-50 py-20 px-6 border-y border-forest-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">▪ Services</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">Nos Domaines d'Intervention</h2>
            <p className="text-ink-soft max-w-xl mx-auto">
              Une structure intégrée pour couvrir l'intégralité de vos besoins : de la recherche à la formation, de l'audit à l'impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="bg-white p-8 rounded-2xl border border-forest-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
                <div className="w-14 h-14 rounded-xl bg-forest-50 flex items-center justify-center mb-6">{svc.icon}</div>
                <h3 className="font-serif text-lg font-bold text-ink mb-4 leading-snug">{svc.title}</h3>
                <ul className="space-y-4 text-sm text-ink-soft flex-grow">
                  {svc.items.map((item, idx) => (
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

      {/* ═══════════════════════════════════════════════════
          3. PROGRAMS
         ═══════════════════════════════════════════════════ */}
      <section id="programs" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">▪ Programmes</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">Renforcement des Capacités & Formation</h2>
            <p className="text-ink-soft max-w-xl mx-auto">
              Nos programmes phares qui connectent le monde académique au marché de l'emploi en Afrique de l'Est.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((prog) => (
              <div key={prog.title} className="bg-white p-6 rounded-2xl border border-forest-100 shadow-sm space-y-4 hover:border-forest-800/40 transition duration-300">
                <div className="text-3xl">{prog.icon}</div>
                <h3 className="font-serif text-lg font-bold text-ink">{prog.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. PUBLICATIONS
         ═══════════════════════════════════════════════════ */}
      <section id="publications" className="bg-forest-50 py-20 px-6 border-y border-forest-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">▪ Publications</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">Analyses & Réflexions Récentes</h2>
            <p className="text-ink-soft max-w-xl mx-auto text-sm">
              Les points de vue et contributions techniques de nos chercheurs et consultants sur les défis socio-économiques.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PUBLICATIONS.map((pub) => (
              <article key={pub.title} className="bg-white p-6 rounded-2xl border border-forest-100 hover:border-forest-800/30 transition duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-ink-soft">
                    <span>{pub.date}</span>
                    <span className="text-forest-800 uppercase font-semibold">{pub.tag}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink leading-snug hover:text-forest-800 transition">
                    <a href="#publications">{pub.title}</a>
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">{pub.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-forest-50">
                  <div className={`w-8 h-8 rounded-full ${pub.color} text-white flex items-center justify-center font-mono text-xs font-bold`}>
                    {pub.initials}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-ink">{pub.author}</h5>
                    <p className="text-[10px] text-ink-soft font-mono">{pub.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. ACTIVITIES
         ═══════════════════════════════════════════════════ */}
      <section id="activities" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">▪ Activités</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">Nos Activités & Projets en cours</h2>
            <p className="text-ink-soft max-w-xl mx-auto text-sm">
              Découvrez nos initiatives actives concrétisant le lien entre théorie académique et employabilité.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACTIVITIES.map((act) => (
              <div key={act.title} className="bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-forest-100">
                    <img src={act.image} alt={act.alt} className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 bg-forest-800 text-white font-mono text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Actif</span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-ink leading-snug">{act.title}</h3>
                    <p className="text-xs text-ink-soft leading-relaxed">{act.desc}</p>
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

      {/* ═══════════════════════════════════════════════════
          6. TEAM
         ═══════════════════════════════════════════════════ */}
      <section id="team" className="bg-forest-50 py-20 px-6 border-y border-forest-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">▪ L'Équipe d'Experts</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">Qui se cache derrière IRICA ?</h2>
            <p className="text-ink-soft max-w-xl mx-auto text-sm">
              Une équipe pluridisciplinaire unie par une vision commune du renforcement des capacités et du développement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white p-8 rounded-2xl border border-forest-100 text-center space-y-4">
                <div className={`w-20 h-20 rounded-full ${member.color} text-white font-mono text-2xl font-bold flex items-center justify-center mx-auto shadow-sm`}>
                  {member.initials}
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-ink">{member.name}</h4>
                  <p className="text-xs font-mono text-forest-800 uppercase font-semibold">{member.role}</p>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
