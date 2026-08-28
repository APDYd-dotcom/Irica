import { useRef } from "react";
import { CalendarDays, ChevronRight, CreditCard, LockKeyhole } from "lucide-react";
import useFetch from "../hooks/useFetch";
import Container from "./Layout/Container";

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
                return "bg-primary-50 text-primary-700";
            case "inprogress":
            case "paid":
                return "bg-neutral-100 text-neutral-700";
            case "completed":
                return "bg-neutral-100 text-neutral-700";
            default:
                return "bg-neutral-100 text-neutral-700";
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
            <section id="programs" className="bg-neutral-50 py-24 md:py-32">
                <Container className="text-center text-neutral-600">
                    Chargement des programmes...
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section id="programs" className="bg-neutral-50 py-24 md:py-32">
                <Container className="text-center text-red-600">
                    Erreur : {error.message || "Impossible de charger les programmes."}
                </Container>
            </section>
        );
    }

    return (
        <section id="programs" className="bg-neutral-50 py-24 md:py-32">
            <Container>
                <div className="fade-in mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <p className="eyebrow text-primary-700">Programmes</p>
                        <h2 className="section-title mt-4">Programmes IRICA.</h2>
                        <p className="mt-6">
                        Accès aux programmes gratuits ou payants. Inscription via Google
                        Form avec email et code d'accès.
                        </p>
                    </div>
                    <button
                        onClick={scrollNext}
                        className="inline-flex w-max items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 shadow-sm hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
                    >
                        Voir autres
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                <div
                    ref={rowRef}
                    className="scrollbar-hidden flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
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
                                className="fade-in flex w-[21rem] flex-none snap-start flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10 sm:w-[24rem]"
                            >
                                <div
                                    className="relative flex h-52 flex-shrink-0 flex-col justify-end bg-primary-700 px-6 pb-5"
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
                                        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${statusStyles(status)}`}
                                    >
                                        {statusLabel(status)}
                                    </span>
                                    <h3 className="text-2xl font-bold leading-tight text-white">
                                        {title}
                                    </h3>
                                    {hasSubtitle && (
                                        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-white/75">
                                            {subtitle || "INTERNSHIP PROGRAM"}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
                                        {desc}
                                    </p>

                                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-600">
                                        <div className="rounded-2xl bg-neutral-50 p-4">
                                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                                                <CreditCard className="h-3.5 w-3.5" />
                                                Prix
                                            </div>
                                            <div className="font-semibold text-neutral-900">
                                                {isFree ? "Gratuit" : `${Number(price).toLocaleString()} FBU`}
                                            </div>
                                        </div>
                                        <div className="rounded-2xl bg-neutral-50 p-4">
                                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                                                <CalendarDays className="h-3.5 w-3.5" />
                                                Publié
                                            </div>
                                            <div className="font-semibold text-neutral-900">
                                                {createdAt ? formatDate(createdAt) : "A venir"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.08em]">
                                        <span
                                            className={`rounded-full px-3 py-1 ${isFree
                                                    ? "bg-primary-50 text-primary-700"
                                                    : "bg-neutral-100 text-neutral-700"
                                                }`}
                                        >
                                            {isFree ? "FREE" : "PAID"}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                                            <LockKeyhole className="h-3.5 w-3.5" />
                                            EMAIL + CODE
                                        </span>
                                    </div>

                                    <div className="mt-auto pt-6">
                                        <a
                                            href={link}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-4 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25"
                                        >
                                            Voir le programme
                                            <ChevronRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </Container>
        </section>
    );
}

export default ProgramsSection;
