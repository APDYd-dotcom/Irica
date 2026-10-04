import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import { EASE } from "../../animations/variants";

function TeamCard({ member, featured = false }) {
  const { t } = useLanguage();

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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neutral-900/40 to-transparent" />

        {member.role && (
          <div className="absolute inset-x-3 bottom-3 max-w-[85%] flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase leading-snug tracking-wide text-primary-700 ring-1 ring-primary-200/70 backdrop-blur">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              <span className="text-center">{member.role}</span>
            </span>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col px-5 pt-4 pb-4">
        <h3 className="text-base font-semibold leading-snug text-neutral-900 break-words">
          {member.name}
        </h3>

        {member.bio && (
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 line-clamp-3">
            {member.bio}
          </p>
        )}

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={t("team.emailLabel", { name: member.name })}
            className="mt-2 inline-flex w-fit max-w-full items-center gap-1.5 truncate text-xs text-neutral-900 transition-colors duration-200 hover:text-primary-700 hover:underline"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{member.email}</span>
          </a>
        )}

        <div className="mt-auto border-t border-neutral-200/70 pt-3 flex items-center justify-end gap-1">
          <a
            href={member.linkedin}
            aria-label={t("team.linkedinLabel", { name: member.name })}
            className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.5h4.5V24H.24V8.5zm8.32 0h4.32v2.16c.62-1 1.7-2.2 3.48-2.2 3.73 0 4.42 2.45 4.42 5.64V24h-4.5v-7.15c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.78V24h-4.5V8.5z" />
            </svg>
          </a>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

export default TeamCard;
