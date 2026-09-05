import { motion } from "framer-motion";
import Container from "../Layout/Container";
import TeamCard from "./TeamCard";
import { EASE } from "../../animations/variants";

const team = [
  {
    name: "Patrick BIZOZA",
    role: "Co-founder, Chief Executive Officer",
    image: "/images/patrick.jpeg",
    linkedin: "https://www.linkedin.com/in/patrick-bizoza-m-a-b51171134?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    twitter: "https://twitter.com",
    email: "patrick.bizoza@iricaconnect.org",
    bio: "- PhD. candidate Author of 'Life Out of Cage',Global Keynote Speaker on Leadership and Governance, Experienced programs' manager with a demonstrated history of working in the non-profit organizations, Skilled in Strategic Project Management, Leadership Development & Corporate Governance.",
  },
  {
    name: "Juste Axel NDIKUMASABO",
    role: "Technical Director",
    image: "/images/axel.jpeg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "jean-claude.nduwimana@iricaconnect.org",
    bio: "Technical Director at IRICA, with expertise in Digital Transformation, Technology Strategy, Data Systems & Infrastructure. Leads IRICA’s technical strategy, overseeing digital platforms and technology infrastructure that support the institute’s research, training, and innovation programs. Skilled in Technology Leadership, Digital Solutions, Systems Management & Strategic Project Development.",
  },
  {
    name: "Alain Gabriel SENGIYUMVA",
    role: "Secretaire permenant",
    image: "/images/alain.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "aline.niyomwungere@iricaconnect.org",
    bio: "Analyste de données spécialisée sur Stata et R, elle supervise les bases et anime les parcours d'économétrie appliquée.",
  },
  {
    name: "Odon Delors Irakoze",
    role: "Monitoring & Evaluation Officer",
    image: "/images/odon1.jpeg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "aline.niyomwungere@iricaconnect.org",
    bio:"Monitoring & Evaluation Officer at IRICA, with expertise in Statistics, Program Monitoring & Evaluation, Data Analysis & Digital Communications. Supports the organization’s mission by tracking program performance and impact while overseeing digital communications to strengthen IRICA’s visibility and engagement. Skilled in Data-Driven Decision Making, Impact Measurement, Statistical Analysis & Strategic Communication.",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative mx-auto mb-16 max-w-3xl text-center"
        >
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
        </motion.div>

        <motion.div
          className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className={index === 0 ? "lg:translate-y-6" : ""}
            >
              <TeamCard member={member} featured={index === 0} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Team;