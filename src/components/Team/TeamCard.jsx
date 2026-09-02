function TeamCard({ member, index }) {
  return (
    <article
      style={{ animationDelay: `${index * 120}ms` }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/8"
    >
      {/* Image container - compact ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Subtle gradient always visible at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-900/40 to-transparent" />

        {/* Hover overlay with bio reveal */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-neutral-900/90 via-neutral-900/60 to-primary-900/10 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
            <p className="text-xs leading-relaxed text-white/90">{member.bio}</p>
          </div>
        </div>

        {/* Role badge - compact */}
        <div className="absolute left-3 top-3">
          <span className="inline-block rounded-full bg-primary-50/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-800 backdrop-blur-sm">
            {member.role}
          </span>
        </div>
      </div>

      {/* Content - compact padding */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold tracking-tight text-neutral-900">{member.name}</h3>

        {/* Divider accent - smaller */}
        <div className="mt-2 h-0.5 w-6 rounded-full bg-primary-500/30 transition-all duration-300 group-hover:w-10 group-hover:bg-primary-500" />

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {member.bio}
        </p>

        {/* Social links - compact bottom bar */}
        <div className="mt-3 flex items-center gap-2 border-t border-neutral-100 pt-3">
          <a
            href={member.linkedin}
            aria-label={`Profil LinkedIn de ${member.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-50 text-neutral-500 transition-all duration-200 hover:bg-primary-500 hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href={member.twitter}
            aria-label={`Profil Twitter de ${member.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-50 text-neutral-500 transition-all duration-200 hover:bg-primary-500 hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default TeamCard;
