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
    bio: "Il dirige les évaluations d'impact et accompagne les équipes sur les dispositifs de collecte et de qualité des données.",
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
    <section id="team" className="bg-neutral-50 py-24 md:py-32">
      <Container>
        <div className="fade-in mx-auto mb-16 max-w-3xl text-center">
          <p className="eyebrow text-primary-700">Équipe</p>
          <h2 className="mt-4">Des profils complémentaires, une même exigence.</h2>
          <p className="mt-5">
            Une équipe pluridisciplinaire au service de la recherche, du conseil et du
            renforcement des capacités.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="fade-in">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Team;
