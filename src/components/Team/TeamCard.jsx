import { MessageCircle, UserRoundPlus } from "lucide-react";

function TeamCard({ member }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/75 via-neutral-900/10 to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="absolute bottom-4 left-4 flex translate-y-4 gap-1.5 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={member.linkedin}
            aria-label={`Profil professionnel de ${member.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900 hover:bg-primary-500 hover:text-white"
          >
            <UserRoundPlus className="h-3.5 w-3.5" />
          </a>
          <a
            href={member.twitter}
            aria-label={`Contacter ${member.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900 hover:bg-primary-500 hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold">{member.name}</h3>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary-700">
          {member.role}
        </p>
        <p className="mt-2 text-xs leading-5 text-neutral-600">{member.bio}</p>
      </div>
    </article>
  );
}

export default TeamCard;
