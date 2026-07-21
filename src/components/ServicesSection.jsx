function ServicesSection() {
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

  return (
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
  );
}

export default ServicesSection;
