function TeamSection() {
  const TEAM = [
    {
      name: "Patrick BIZOZA",
      role: "Directeur Exécutif",
      image: "/images/1.jpg",
      bio: "Expert senior en économie du développement et statistiques. Patrick pilote la vision stratégique d'IRICA et les relations avec les partenaires académiques régionaux.",
    },
    {
      name: "Jean-Claude NDUWIMANA",
      role: "Spécialiste Suivi-Évaluation",
      image: "/images/2.jpg",
      bio: "Fort de plus de 8 ans d'expérience dans les ONG, Jean-Claude dirige les évaluations d'impact de projets et forme la jeune génération aux outils de collecte comme KoBoToolbox.",
    },
    {
      name: "Aline NIYOMWUNGERE",
      role: "Responsable Recherche & Statistique",
      image: "/images/3.jpg",
      bio: "Analyste de données spécialisée sur Stata et R. Aline supervise le contrôle qualité des bases de données et anime les cours d'économétrie appliquée au sein d'IRICA.",
    },
  ];

  return (
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
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-sm mx-auto">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
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
  );
}

export default TeamSection;
