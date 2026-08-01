import { useRef } from "react";
import useFetch from "../hooks/useFetch";

function ProgramsSection() {
    const { data, loading, error } = useFetch("/programs/");
    const programs = data?.results || [];
    const rowRef = useRef(null);

    function scrollNext() {
        if (!rowRef.current) return;
        rowRef.current.scrollBy({
            left: rowRef.current.clientWidth,
            behavior: "smooth",
        });
    }

    const statusStyles = (status) => {
        const s = status?.toLowerCase() || "";
        switch (s) {
            case "enrollment":
            case "enroll":
                return "bg-emerald-100 text-emerald-800";
            case "inprogress":
            case "paid":
                return "bg-amber-100 text-amber-800";
            case "completed":
                return "bg-slate-100 text-slate-800";
            default:
                return "bg-slate-100 text-slate-800";
        }
    };

    const statusLabel = (status) => {
        const s = status?.toLowerCase() || "";
        switch (s) {
            case "enrollment":
            case "enroll":
                return "ENROLLMENT";
            case "inprogress":
            case "paid":
                return "PAID";
            case "completed":
                return "COMPLETED";
            default:
                return status?.toUpperCase() || "ENROLLMENT";
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    if (loading) {
        return (
            <section id="programs" className="py-20 px-6">
                <div className="max-w-6xl mx-auto text-center text-ink-soft">
                    Chargement des programmes…
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="programs" className="py-20 px-6">
                <div className="max-w-6xl mx-auto text-center text-red-500">
                    Erreur : {error.message || "Impossible de charger les programmes."}
                </div>
            </section>
        );
    }

    return (
        <section id="programs" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">
                        ▪ Programmes
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
                        Programmes IRICA
                    </h2>
                    <p className="text-ink-soft max-w-xl mx-auto">
                        Accès aux programmes gratuits ou payants. Inscription via Google
                        Form avec email et code d'accès.
                    </p>
                </div>

                {/* Cards row */}
                <div
                    ref={rowRef}
                    className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {programs.map((prog) => {
                        const title = prog.title || prog.name || prog.program_title || "Programme";
                        const desc =
                            prog.descr || prog.desc || prog.description || "";
                        const photo = prog.photo || prog.image || null;
                        const link = prog.link || `/programs/${prog.id}`;
                        const status = prog.status || prog.state || "enrollment";
                        const isFree =
                            typeof prog.is_free !== "undefined"
                                ? prog.is_free
                                : prog.isFree || false;
                        const price = prog.price || prog.cost || 0;
                        const createdAt = prog.created_at || prog.createdAt || null;
                        const subtitle = prog.subtitle || prog.sub_title || "";

                        const hasSubtitle = subtitle || (status?.toLowerCase() === "completed" && title === "COMPLETED");

                        return (
                            <div
                                key={prog.id || title}
                                className="w-[22rem] flex-none bg-white rounded-3xl border border-forest-100 shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-xl duration-300 snap-start flex flex-col"
                            >
                                {/* ─── Header with larger image area ─── */}
                                <div
                                    className="relative h-48 bg-forest-800 flex flex-col justify-end px-6 pb-4 flex-shrink-0"
                                    style={
                                        photo
                                            ? {
                                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${photo})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }
                                            : {}
                                    }
                                >
                                    <span
                                        className={`absolute top-3 right-3 rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-[0.14em] ${statusStyles(status)}`}
                                    >
                                        {statusLabel(status)}
                                    </span>
                                    <h3 className="font-serif text-xl font-bold text-white leading-tight">
                                        {title}
                                    </h3>
                                    {hasSubtitle && (
                                        <p className="text-white/70 text-sm font-medium tracking-wider uppercase mt-0.5">
                                            {subtitle || "INTERNSHIP PROGRAM"}
                                        </p>
                                    )}
                                </div>

                                {/* ─── Body (tight, no extra bottom space) ─── */}
                                <div className="p-5 space-y-3 flex flex-col flex-1">
                                    <p className="text-sm text-ink-soft leading-relaxed line-clamp-2">
                                        {desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 text-sm text-ink-soft">
                                        <div className="space-y-0">
                                            <div className="font-semibold text-ink text-xs uppercase tracking-wider">
                                                Prix
                                            </div>
                                            <div className="font-medium">
                                                {isFree ? "Gratuit" : `${Number(price).toLocaleString()} FBU`}
                                            </div>
                                        </div>
                                        <div className="space-y-0">
                                            <div className="font-semibold text-ink text-xs uppercase tracking-wider">
                                                Publié
                                            </div>
                                            <div className="font-medium">
                                                {createdAt ? formatDate(createdAt) : "—"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.10em]">
                                        <span
                                            className={`px-3 py-1 rounded-full ${isFree
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-amber-50 text-amber-700"
                                                }`}
                                        >
                                            {isFree ? "FREE" : "PAID"}
                                        </span>
                                        <span className="bg-slate-50 text-slate-700 px-3 py-1 rounded-full">
                                            EMAIL + CODE
                                        </span>
                                    </div>

                                    <div className="mt-auto pt-2">
                                        <a
                                            href={link}
                                            className="inline-flex items-center justify-center w-full rounded-2xl bg-forest-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-900"
                                        >
                                            Voir le programme
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Scroll CTA */}
                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={scrollNext}
                            className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-forest-900/20 transition hover:bg-forest-700"
                        >
                            <span>Voir autres</span>
                            <span className="text-lg">→</span>
                        </button>
                        <div className="text-forest-800 text-sm font-medium">
                            Faites défiler les programmes disponibles
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProgramsSection;