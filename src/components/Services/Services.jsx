import { BarChart3, BookOpenCheck, ShieldCheck, UsersRound } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../Layout/Container";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "../../i18n/LanguageContext";
import { EASE } from "../../animations/variants";

const serviceDefs = [
  { key: "research", icon: BarChart3 },
  { key: "project", icon: BookOpenCheck },
  { key: "audit", icon: ShieldCheck },
  { key: "capacity", icon: UsersRound },
];

function Services() {
  const { t } = useLanguage();

  const services = serviceDefs.map((s) => ({
    title: t(`services.items.${s.key}.title`),
    icon: s.icon,
    description: t(`services.items.${s.key}.description`),
    points: [
      t(`services.items.${s.key}.points.0`),
      t(`services.items.${s.key}.points.1`),
      t(`services.items.${s.key}.points.2`),
    ],
  }));

  return (
    <section id="services" className="bg-neutral-50 py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="eyebrow text-primary-700">{t("services.eyebrow")}</p>
          <h2 className="mt-4">{t("services.title")}</h2>
          <p className="mt-5">{t("services.description")}</p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Services;
