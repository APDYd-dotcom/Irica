import { Link } from "react-router-dom";
import activityImg from "../assets/activity.jpeg";

function ActivitiesSection() {
  return (
    <section id="activities" className="py-0 px-0">
      <div className="relative w-full h-80 md:h-96 lg:h-[32rem] overflow-hidden">
        {/* Background Image */}
        <img 
          src={activityImg} 
          alt="IRICA Activities" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlay - Stronger on left, fades to right */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-14 lg:px-16 max-w-6xl mx-auto">
          <div className="text-white space-y-5 max-w-2xl">
            <p className="text-green-400 uppercase text-xs md:text-sm tracking-widest font-bold">▪ Nos Activités</p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              Initiatives Actives & Projets en cours
            </h2>
            <p className="text-white/95 text-base md:text-lg font-light leading-relaxed max-w-xl drop-shadow-md">
              Découvrez comment IRICA concrétise le lien entre théorie académique et employabilité en Afrique de l'Est par des projets innovants et des partenariats stratégiques.
            </p>
            <Link to="/materials" className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition duration-300 shadow-lg">
              Voir nos rapports <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActivitiesSection;
