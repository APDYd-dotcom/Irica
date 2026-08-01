import { useRef } from "react";
import useFetch from "../hooks/useFetch";

function ProgramsSection() {
  const { data, loading, error } = useFetch("/programs/");
  const programs = data?.results || [];
  const rowRef = useRef(null);

  function scrollNext() {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: rowRef.current.clientWidth, behavior: "smooth" });
  }

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
        <div ref={rowRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hidden">
          {programs.map((prog) => {
            const title = prog.title || prog.name || prog.program_title || "Programme";
            const desc = prog.desc || prog.description || "";
            const photo = prog.photo || prog.image || "/images/1.jpg";
            const link = prog.link || `/programs/${prog.id}`;
            const status = prog.status || prog.state || "enrollment";
            const isFree = typeof prog.is_free !== "undefined" ? prog.is_free : prog.isFree || false;
            const price = prog.price || prog.cost || 0;
            const createdAt = prog.created_at || prog.createdAt || null;

            return (
              <div key={prog.id || title} className="w-[22rem] h-[32rem] flex-none bg-white rounded-3xl border border-forest-100 shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-lg duration-300 snap-start">
                <div className="h-44 overflow-hidden">
                  <img src={photo} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${statusStyles(status)}`}>
                      {status}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm text-ink-soft">
                    <div className="space-y-1">
                      <div className="font-semibold text-ink">Prix</div>
                      <div>{isFree ? "Gratuit" : `${price} FBU`}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-ink">Publié</div>
                      <div>{createdAt ? formatDate(createdAt) : ""}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.12em] text-forest-800">
                    {isFree ? (
                      <span className="bg-emerald-50 px-2 py-1 rounded-full">Free</span>
                    ) : (
                      <span className="bg-amber-50 px-2 py-1 rounded-full">Paid</span>
                    )}
                    <span className="bg-slate-50 px-2 py-1 rounded-full">Email + Code</span>
                  </div>
                  <a href={link} className="inline-flex items-center justify-center w-full rounded-2xl bg-forest-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-forest-900">
                    Voir le programme
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={scrollNext}
              className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-forest-900/20 transition hover:bg-forest-700"
            >
              <span>Voir autres</span>
              <span className="text-lg">→</span>
            </button>
            <div className="text-forest-800 text-sm font-medium">Faites défiler les programmes disponibles</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;
