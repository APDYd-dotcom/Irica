import { BarChart3, BookOpenCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../Layout/Container";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "../../i18n/LanguageContext";
import { EASE } from "../../animations/variants";

const serviceDefs = [
  { key: "conseilAudit", icon: ShieldCheck },
  { key: "formationLangues", icon: BookOpenCheck },
  { key: "rechercheInterpretariat", icon: BarChart3 },
];

// Upper bound for bullet slots; pillars declare fewer than this (some have 2).
const MAX_POINTS = 4;

function Services() {
  const { t } = useLanguage();

  const services = serviceDefs.map((s) => ({
    title: t(`services.items.${s.key}.title`),
    icon: s.icon,
    description: t(`services.items.${s.key}.description`),
    // t() falls back to returning the lookup path itself when a key is missing,
    // so unused slots are dropped instead of rendering as visible bullet text.
    points: Array.from({ length: MAX_POINTS }, (_, i) => {
      const path = `services.items.${s.key}.points.${i}`;
      const value = t(path);
      return value === path ? null : value;
    }).filter(Boolean),
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
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
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
