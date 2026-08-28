import { BarChart3, BookOpenCheck, ShieldCheck, UsersRound } from "lucide-react";
import Container from "../Layout/Container";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Recherche appliquée et données",
    icon: BarChart3,
    description:
      "Des études quantitatives et qualitatives pour éclairer les décisions publiques, privées et associatives.",
    points: [
      "Enquêtes de terrain et collecte de données",
      "Analyses statistiques avec R, Stata, SPSS et Power BI",
      "Rapports techniques et publications scientifiques",
    ],
  },
  {
    title: "Gestion de projets et évaluation",
    icon: BookOpenCheck,
    description:
      "Un accompagnement méthodique pour concevoir, piloter et mesurer l'impact des projets.",
    points: [
      "Cadres logiques et plans de suivi",
      "Évaluations indépendantes selon les critères OECD-DAC",
      "Capitalisation des apprentissages",
    ],
  },
  {
    title: "Audit et conseil institutionnel",
    icon: ShieldCheck,
    description:
      "Des diagnostics clairs pour renforcer la gouvernance, la performance et la conformité.",
    points: [
      "Audit organisationnel et financier",
      "Conseil stratégique pour institutions et PME",
      "Accompagnement des propositions aux bailleurs",
    ],
  },
  {
    title: "Formation et capacités",
    icon: UsersRound,
    description:
      "Des parcours pratiques conçus pour rendre les équipes autonomes sur les méthodes et outils.",
    points: [
      "Formations professionnelles courtes",
      "Mentorat en recherche et statistiques",
      "Ateliers sur outils numériques de collecte",
    ],
  },
];

function Services() {
  return (
    <section id="services" className="bg-neutral-50 py-24 md:py-32">
      <Container>
        <div className="fade-in mx-auto mb-16 max-w-3xl text-center">
          <p className="eyebrow text-primary-700">Services</p>
          <h2 className="mt-4">Des expertises intégrées, sans complexité inutile.</h2>
          <p className="mt-5">
            IRICA réunit recherche, évaluation, conseil et formation dans une expérience
            sobre, structurée et orientée vers l'action.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="fade-in">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Services;
