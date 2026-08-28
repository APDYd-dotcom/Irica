import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import activityImg from "../assets/activity.jpeg";
import useFetch from "../hooks/useFetch";

function ActivitiesSection() {
    const { data, loading, error } = useFetch("/activities/");
    const activity = data?.results?.[0] || null;

    const bgSrc = activity?.image || activity?.photo || activityImg;
    const title = activity?.title || activity?.name || "Initiatives Actives & Projets en cours";
    const desc = activity?.description || activity?.desc || "Découvrez comment IRICA concrétise le lien entre théorie académique et employabilité en Afrique de l'Est par des projets innovants et des partenariats stratégiques.";
    const link = activity?.url || activity?.link || "#publications";

    return (
        <section id="activities" className="py-0 px-0">
            <div className="relative w-full h-80 md:h-96 lg:h-[32rem] overflow-hidden">
                {/* Background Image */}
                <img
                    src={bgSrc}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay - Stronger on left, fades to right */}
                <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-transparent" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-14 lg:px-16 max-w-6xl mx-auto">
                    <div className="text-white space-y-5 max-w-2xl">
                        <p className="text-primary-100 uppercase text-xs md:text-sm tracking-widest font-bold">Nos Activités</p>
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                            {loading ? "Chargement..." : title}
                        </h2>
                        <p className="text-white/95 text-base md:text-lg font-light leading-relaxed max-w-xl drop-shadow-md">
                            {error ? "Impossible de charger les activités." : desc}
                        </p>
                        <a href={link} className="inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-white transition duration-300 px-8 py-3.5 rounded-lg font-semibold shadow-md text-center mt-4">
                            Voir nos rapports
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ActivitiesSection;
