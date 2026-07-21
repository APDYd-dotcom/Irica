function ProgramsSection() {
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

  return (
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
  );
}

export default ProgramsSection;
