import { ArrowRight } from "lucide-react";

function ServiceCard({ icon: Icon, title, description, points = [] }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-neutral-900/10">
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary-500 to-primary-300 transition-transform duration-300 group-hover:scale-x-100" />

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:scale-105">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="text-xl font-bold leading-snug text-neutral-900">{title}</h3>
      <p className="mt-4 text-base leading-7 text-neutral-600">{description}</p>

      <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral-600">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary-500" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:gap-3 hover:text-primary-800"
      >
        En savoir plus
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

export default ServiceCard;
