import { MessageCircle, UserRoundPlus } from "lucide-react";

function TeamCard({ member, featured = false }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[0_20px_50px_-20px_rgba(0,90,40,0.25)] hover:shadow-primary-900/10 ${
        featured ? "lg:scale-[1.03]" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,122,51,0.06) 0%, rgba(0,122,51,0) 60%)",
        }}
      />

      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-neutral-900/85 via-neutral-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs leading-relaxed text-neutral-100/95 line-clamp-4">
            {member.bio}
          </p>
        </div>

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary-700 ring-1 ring-primary-200/70 backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-primary-500" />
            {member.role}
          </span>
        </div>
      </div>

      <div className="relative border-t border-neutral-200/70 px-5 pt-4 pb-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-neutral-900">
              {member.name}
            </h3>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
              {member.role}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 border-l border-neutral-200 pl-3">
            <a
              href={member.linkedin}
              aria-label={`Profil professionnel de ${member.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
            >
              <UserRoundPlus className="h-3.5 w-3.5" />
            </a>
            <a
              href={member.twitter}
              aria-label={`Contacter ${member.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </article>
  );
}

export default TeamCard;