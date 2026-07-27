function PublicationsSection() {
  const PUBLICATIONS = [
    {
      date: "Juillet 2026",
      tag: "Employabilité",
      title: "Quand la statistique devient un levier d'employabilité pour la jeunesse burundaise",
      excerpt: "Dans un marché du travail régional concurrentiel, la maîtrise pratique de logiciels comme Stata, SPSS et R n'est plus un simple atout, mais un prérequis absolu pour l'insertion des jeunes cadres.",
    },
    {
      date: "Juin 2026",
      tag: "Suivi-Évaluation",
      title: "Pourquoi le suivi-évaluation conditionne la réussite des projets de développement",
      excerpt: "Les organisations non gouvernementales doivent adopter des standards d'évaluation indépendants et rigoureux (OECD-DAC) pour mesurer objectivement l'impact de leurs programmes de terrain.",
    },
    {
      date: "Mai 2026",
      tag: "Audit & PME",
      title: "PME à Bujumbura : les clés d'une gestion financière saine et d'un audit transparent",
      excerpt: "L'audit organisationnel et financier n'est pas uniquement un exercice réglementaire, c'est un puissant outil de pilotage interne et un gage de confiance pour attirer les bailleurs internationaux.",
    },
  ];

  return (
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PublicationsSection;
