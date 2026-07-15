import { Link } from "react-router-dom";

export default function Home() {
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
      <section className="relative bg-forest-950 text-white py-24 md:py-32 px-6 overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#007A33_1px,transparent_1px),linear-gradient(to_bottom,#007A33_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-forest-800 rounded-full filter blur-[120px] opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-forest-900 border border-forest-800 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-forest-100 uppercase">
              <span className="w-2 h-2 rounded-full bg-forest-600 animate-ping" />
              Cabinet de Conseil, Recherche & Développement
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
              De la rigueur analytique à <span className="text-forest-600">l'impact durable</span>.
            </h1>
            
            <p className="text-forest-100/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              L'<strong>Institute of Research and Immersive Career Advancement (IRICA)</strong> est un cabinet d'experts basé à Bujumbura, au Burundi. Nous accompagnons les organisations et développons le capital humain d'Afrique de l'Est.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#qui-sommes-nous"
                className="bg-white text-forest-950 hover:bg-forest-100 transition px-8 py-3.5 rounded-lg font-semibold shadow-lg text-center w-full sm:w-auto"
              >
                Découvrir l'Institut
              </a>
              <Link
                to="/materials"
                className="bg-forest-800 hover:bg-forest-700 text-white border border-forest-700 transition px-8 py-3.5 rounded-lg font-semibold text-center w-full sm:w-auto"
              >
                Accéder aux Ressources
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            {/* Elegant Emblem card with Logo Theme */}
            <div className="bg-forest-900/40 border border-forest-800 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-forest-800 rounded-full filter blur-[40px] opacity-50" />
              
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-xl bg-forest-800 flex items-center justify-center font-serif text-3xl font-bold text-white shadow-md">
                  I
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-white">Notre Rôle</h3>
                  <p className="text-xs text-forest-100/70 leading-relaxed">
                    Transformer la donnée en décision et la formation en carrière, grâce à un positionnement unique mariant recherche scientifique et conseil opérationnel.
                  </p>
                </div>
                <div className="pt-4 border-t border-forest-800/80 flex items-center justify-between text-xs font-mono text-forest-100/60">
                  <span>📍 Bujumbura, Burundi</span>
                  <span>Est. 2026</span>
                </div>
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

      {/* CORE EXPERTISE PILLARS (THE SKETCH FROM HANDWRITTEN PHOTO) */}
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

      {/* MISSION, VISION & VALEURS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mb-16">
          <div className="bg-forest-950 text-white p-10 md:p-12 rounded-3xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-forest-800 rounded-full filter blur-[50px] opacity-40" />
            <div className="space-y-4 z-10">
              <span className="text-xs font-mono uppercase text-forest-100">▪ Notre Mission</span>
              <h3 className="font-serif text-3xl font-bold leading-tight">
                Accompagner les organisations et former les leaders de demain.
              </h3>
              <p className="text-forest-100/80 leading-relaxed font-light">
                Nous aidons les professionnels et les organisations à générer des connaissances rigoureuses, à renforcer leurs compétences techniques et à mettre en œuvre des systèmes de pilotage hautement performants.
              </p>
            </div>
            <div className="pt-8 font-mono text-xs text-forest-100/60 z-10">
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
                Notre ambition est de s'imposer comme le partenaire technique de référence pour la recherche, l'évaluation de programmes et le développement du capital humain, en alignant les exigences locales avec les plus hauts standards internationaux.
              </p>
            </div>
            <div className="pt-8 font-mono text-xs text-ink-soft/60">
              Rigueur · Indépendance · Impact
            </div>
          </div>
        </div>

        {/* Values Sub-grid */}
        <div className="border-t border-forest-100 pt-16">
          <h3 className="text-center font-serif text-2xl font-bold mb-10 text-ink">Nos Valeurs Fondamentales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val) => (
              <div key={val.title} className="space-y-3 p-4 rounded-xl hover:bg-forest-50 transition duration-300">
                <span className="text-3xl block">{val.icon}</span>
                <h4 className="font-serif text-lg font-bold text-ink">{val.title}</h4>
                <p className="text-sm text-ink-soft leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <section className="bg-forest-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono uppercase text-forest-100">▪ Rigueur Méthodologique</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Notre Cycle d'Intervention en 5 Étapes</h2>
            <p className="text-forest-100/70 max-w-xl mx-auto text-sm">
              Chaque projet fait l'objet d'un suivi méthodique rigoureux pour garantir l'excellence et la reproductibilité des résultats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-forest-800 rounded-2xl overflow-hidden shadow-2xl">
            {METHODOLOGY.map((step) => (
              <div key={step.num} className="bg-forest-900 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-mono text-4xl font-bold text-forest-800 block mb-4">{step.num}</span>
                  <h4 className="font-serif text-lg font-bold mb-2">{step.step}</h4>
                  <p className="text-xs text-forest-100/75 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REALIZATIONS & PHOTO GALLERY */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">
            ▪ Réalisations & Impact
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
            Notre Travail en Images
          </h2>
          <p className="text-ink-soft max-w-xl mx-auto">
            Découvrez nos actions concrètes reliant le monde académique, les acteurs étatiques et le secteur privé burundais.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-16">
          {REALIZATIONS.map((real, idx) => (
            <div
              key={real.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-forest-100 group">
                  <img
                    src={real.image}
                    alt={real.alt}
                    className="w-full object-cover aspect-[16/10] group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="font-mono text-forest-800 text-xs font-semibold">0{idx + 1}. ACCOMPAGNEMENT</span>
                <h3 className="font-serif text-2xl font-bold text-ink">{real.title}</h3>
                <p className="text-ink-soft leading-relaxed text-sm">{real.desc}</p>
                <div className="pt-2">
                  <Link
                    to="/materials"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-forest-800 hover:text-forest-700 transition"
                  >
                    Voir nos publications associées <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
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
              Nous allions des experts pluridisciplinaires chevronnés avec une maîtrise parfaite des outils analytiques et logiciels de pointe pour garantir des résultats à fort impact.
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

      {/* FINAL CALL TO ACTION */}
      <section className="bg-forest-950 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-forest-100">▪ Rejoignez-nous</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
            Prêt à collaborer pour un impact durable ?
          </h2>
          <p className="text-forest-100/80 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Que vous représentiez une ONG, une université, une entreprise privée ou une institution publique, nous concevons des solutions sur mesure adaptées à vos défis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/checkout"
              className="bg-white text-forest-950 hover:bg-forest-100 transition px-8 py-4 rounded-lg font-bold shadow-lg"
            >
              Souscrire à nos Publications
            </Link>
            <a
              href="mailto:info.irica@gmail.com"
              className="bg-transparent border border-white hover:bg-white/10 text-white transition px-8 py-4 rounded-lg font-bold"
            >
              Devenir Partenaire
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
