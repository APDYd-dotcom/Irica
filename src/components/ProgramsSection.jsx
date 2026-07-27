function ProgramsSection() {
  const PROGRAMS = [
    {
      title: "Capstone Program",
      desc: "Un programme intensif de recherche appliquée avec projets concrets, encadré par des experts IRICA.",
      photo: "/images/1.jpg",
      link: "/programs/capstone",
      status: "enrollment",
      isFree: false,
      price: 60.000,
      createdAt: "2026-03-18",
    },
    {
      title: "Internship Program",
      desc: "Stages pratiques en entreprise pour développer des compétences directement employables.",
      photo: "/images/2.jpg",
      link: "/programs/internship",
      status: "inprogress",
      isFree: false,
      price: 80.000,
      createdAt: "2026-04-02",
    },
    {
      title: "Formations Certifiantes",
      desc: "Sessions intensives sur SPSS, R, Power BI, Excel avancé et suivi-évaluation.",
      photo: "/images/4.jpg",
      link: "/programs/certification",
      status: "enrollment",
      isFree: true,
      price: 0,
      createdAt: "2026-05-10",
    },
    {
      title: "Ateliers d'Orientation",
      desc: "Conférences et ateliers pour aider à l'orientation académique et professionnelle.",
      photo: "/images/3.jpg",
      link: "/programs/workshops",
      status: "completed",
      isFree: true,
      price: 0,
      createdAt: "2026-02-25",
    },
  ];

  const statusStyles = (status) => {
    switch (status) {
      case "enrollment":
        return "bg-emerald-100 text-emerald-800";
      case "inprogress":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section id="programs" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">▪ Programmes</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">Programmes IRICA</h2>
          <p className="text-ink-soft max-w-xl mx-auto">
            Accès aux programmes gratuits ou payants. Inscription via Google Form avec email et code d'accès.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((prog) => (
            <div key={prog.title} className="bg-white rounded-3xl border border-forest-100 shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-lg duration-300">
              <div className="h-44 overflow-hidden">
                <img src={prog.photo} alt={prog.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-xl font-semibold text-ink">{prog.title}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${statusStyles(prog.status)}`}>
                    {prog.status}
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">{prog.desc}</p>
                <div className="grid grid-cols-2 gap-3 text-sm text-ink-soft">
                  <div className="space-y-1">
                    <div className="font-semibold text-ink">Prix</div>
                    <div>{prog.isFree ? "Gratuit" : `${prog.price} FBU`}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-ink">Publié</div>
                    <div>{formatDate(prog.createdAt)}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.12em] text-forest-800">
                  {prog.isFree ? (
                    <span className="bg-emerald-50 px-2 py-1 rounded-full">Free</span>
                  ) : (
                    <span className="bg-amber-50 px-2 py-1 rounded-full">Paid</span>
                  )}
                  <span className="bg-slate-50 px-2 py-1 rounded-full">Email + Code</span>
                </div>
                <a href={prog.link} className="inline-flex items-center justify-center w-full rounded-2xl bg-forest-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-forest-900">
                  Voir le programme
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;
