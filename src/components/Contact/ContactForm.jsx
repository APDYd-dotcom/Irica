import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../Layout/Container";
import { EASE } from "../../animations/variants";

function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Demande de consultation IRICA");
    const body = encodeURIComponent(
      [
        `Nom: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Organisation: ${data.get("organization") || ""}`,
        "",
        data.get("message") || "",
      ].join("\n")
    );

    window.location.href = `mailto:info.irica@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="bg-neutral-50 py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="eyebrow text-primary-700">Contact</p>
            <h2 className="section-title mt-4">Parlons de votre prochain projet.</h2>
            <p className="mt-6">
              Décrivez votre besoin, votre échéance ou votre défi. L'équipe IRICA vous
              répondra avec une première orientation claire.
            </p>

            <div className="mt-10 space-y-4">
              <motion.a
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: EASE }}
                href="mailto:info.irica@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-700 shadow-sm hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Mail className="h-5 w-5" />
                </span>
                info.irica@gmail.com
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: EASE }}
                href="tel:+25776891572"
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-700 shadow-sm hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Phone className="h-5 w-5" />
                </span>
                +257 76 891 572
              </motion.a>
              <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-700 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <MapPin className="h-5 w-5" />
                </span>
                Afrique de l'Est
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-900/5 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-neutral-800">Nom</span>
                <input
                  type="text"
                  name="name"
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                  placeholder="Votre nom"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-neutral-800">Email</span>
                <input
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                  placeholder="vous@exemple.com"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-neutral-800">Organisation</span>
              <input
                type="text"
                name="organization"
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                placeholder="Votre institution"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-neutral-800">Message</span>
              <textarea
                name="message"
                rows="6"
                className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                placeholder="Expliquez brièvement votre besoin"
              />
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-4 text-base font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-900/15 focus:outline-none focus:ring-4 focus:ring-primary-500/25 sm:w-auto"
            >
              Envoyer la demande
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

export default ContactForm;
