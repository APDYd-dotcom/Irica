import { CheckCircle2, LineChart, Network, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../Layout/Container";
import { EASE } from "../../animations/variants";

const objectives = [
  {
    name: "Professionnaliser",
    description:
      "Former les individus et les organisations à exceller en gestion, finance et entrepreneuriat",
  },
  {
    name: "Structurer",
    description:
      "Offrir des services de conseil et d'audit afin de garantir l'efficacité, la transparence et la réussite des projets de développement",
  },
  {
    name: "Innover/Informer",
    description:
      "Mener des recherches et études scientifiques afin de proposer des solutions concrètes aux défis du développement socio-économique",
  },
];

function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="eyebrow text-primary-700">Notre Mission</p>
            <h2 className="section-title mt-4">L'accélérateur de croissance</h2>
            <p className="mt-8">
              Nous stimulons le développement socio-économique en renforçant les capacités de
              vos équipes et de vos structures. Notre mission est de vous fournir l'expertise et
              les connaissances scientifiques nécessaires à une prise de décision réussie et
              éclairée.
            </p>

            <p className="mt-12 text-sm font-semibold uppercase tracking-wide text-primary-700">
              Nos 3 objectifs clés (piliers de l'impact)
            </p>
            <ul className="mt-6 space-y-6">
              {objectives.map((objective) => (
                <li key={objective.name} className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary-600" />
                  <div>
                    <p className="font-semibold text-ink">{objective.name}</p>
                    <p className="mt-1 text-sm text-neutral-600">{objective.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-2xl shadow-neutral-900/10">
              <img src="/images/5.jpg" alt="Équipe IRICA en conférence" className="h-[34rem] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/90 p-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Du terrain à la décision</h3>
                    <p className="text-sm leading-6 text-neutral-600">
                      Méthodes robustes, livrables lisibles, accompagnement humain.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-5 top-10 hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl shadow-neutral-900/10 lg:block">
              <LineChart className="h-6 w-6 text-primary-600" />
            </div>
            <div className="absolute -right-5 top-32 hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl shadow-neutral-900/10 lg:block">
              <Network className="h-6 w-6 text-primary-600" />
            </div>
            <div className="absolute -bottom-5 left-16 hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl shadow-neutral-900/10 lg:block">
              <CheckCircle2 className="h-6 w-6 text-primary-600" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default About;
