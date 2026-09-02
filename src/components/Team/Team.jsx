import Container from "../Layout/Container";
import TeamCard from "./TeamCard";

const team = [
  {
    name: "Patrick BIZOZA",
    role: "Directeur Exécutif",
    image: "/images/1.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    bio: "Expert senior en économie du développement et statistiques, il pilote la vision stratégique et les partenariats régionaux.",
  },
  {
    name: "Jean-Claude NDUWIMANA",
    role: "Spécialiste Suivi-Évaluation",
    image: "/images/2.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    bio: "Il dirige les evaluations d'impact et accompagne les équipes sur les dispositifs de collecte et de qualité des données.",
  },
  {
    name: "Aline NIYOMWUNGERE",
    role: "Responsable Recherche",
    image: "/images/3.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    bio: "Analyste de données spécialisée sur Stata et R, elle supervise les bases et anime les parcours d'économétrie appliquée.",
  },
];

function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-neutral-50 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-primary-100/40 blur-3xl"
      />
      <Container>
        <div className="fade-in relative mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-700">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Équipe
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-neutral-900 md:text-4xl">
            Des profils complémentaires,{" "}
            <span className="text-primary-700">une même exigence.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-neutral-600">
            Une équipe pluridisciplinaire au service de la recherche, du conseil et du
            renforcement des capacités.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`fade-in ${index === 0 ? "lg:translate-y-6" : ""}`}
            >
              <TeamCard member={member} featured={index === 0} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Team;