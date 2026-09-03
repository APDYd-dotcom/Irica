import { MessageCircle, UserRoundPlus } from "lucide-react";
import { motion } from "framer-motion";
import { EASE } from "../../animations/variants";

function TeamCard({ member, featured = false }) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[0_20px_50px_-20px_rgba(0,90,40,0.25)] hover:shadow-primary-900/10 ${
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
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-neutral-900/85 via-neutral-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs leading-relaxed text-neutral-100/95 line-clamp-4">
            {member.bio}
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col border-t border-neutral-200/70 px-5 pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold leading-snug text-neutral-900 break-words">
              {member.name}
            </h3>
            <div className="mt-2 min-h-[3rem] flex items-start">
              <span className="inline-block max-w-full self-start rounded-lg bg-primary-50 px-3 py-1.5 text-[10px] font-semibold uppercase leading-snug tracking-wide text-primary-700 ring-1 ring-primary-200/70">
                {member.role}
              </span>
            </div>
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

        <div className="mt-auto" />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

export default TeamCard;