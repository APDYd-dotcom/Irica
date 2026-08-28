import { CheckCircle2, LineChart, Network, Sparkles } from "lucide-react";
import Container from "../Layout/Container";

const stats = [
  { value: "30+", label: "missions accompagnées" },
  { value: "12", label: "domaines d'expertise" },
  { value: "5+", label: "années d'impact" },
];

function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="fade-in">
            <p className="eyebrow text-primary-700">Notre histoire</p>
            <h2 className="section-title mt-4">
              Une institution de conseil pensée pour les réalités africaines.
            </h2>
            <p className="mt-8">
              IRICA combine rigueur académique, connaissance du terrain et culture de
              l'innovation pour aider les organisations à prendre de meilleures décisions.
            </p>
            <p className="mt-5">
              Notre approche est volontairement claire : écouter, mesurer, analyser, puis
              transformer les résultats en actions compréhensibles par les équipes.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <div className="text-3xl font-bold tracking-tight text-primary-700">{stat.value}</div>
                  <div className="mt-2 text-sm leading-5 text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in relative">
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
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
