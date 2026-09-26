import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../Layout/Container";
import { useLanguage } from "../../i18n/LanguageContext";
import { EASE } from "../../animations/variants";
import { submitComment } from "../../api/public";

function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = event.currentTarget;

    setStatus("loading");
    setError(null);

    try {
      await submitComment({
        name: data.get("name") || "",
        email: data.get("email") || "",
        organization: data.get("organization") || "",
        message: data.get("message") || "",
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      const message = err?.response?.data?.detail || err?.response?.data?.message || t("contact.errorGeneric");
      setError(message);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-neutral-50 pt-24 md:pt-32 pb-0">
      <Container className="pb-16 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="eyebrow text-primary-700">{t("contact.eyebrow")}</p>
            <h2 className="section-title mt-4">{t("contact.title")}</h2>
            <p className="mt-6">
              {t("contact.description")}
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
                {t("contact.email")}
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: EASE }}
                href="tel:+25776891572/+25766479153"
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-700 shadow-sm hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Phone className="h-5 w-5" />
                </span>
                {t("contact.phone")}
              </motion.a>
              <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-700 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <MapPin className="h-5 w-5" />
                </span>
                {t("contact.location")}
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
                <span className="text-sm font-semibold text-neutral-800">{t("contact.nameLabel")}</span>
                <input
                  type="text"
                  name="name"
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                  placeholder={t("contact.namePlaceholder")}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-neutral-800">{t("contact.emailLabel")}</span>
                <input
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                  placeholder={t("contact.emailPlaceholder")}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-neutral-800">{t("contact.organizationLabel")}</span>
              <input
                type="text"
                name="organization"
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                placeholder={t("contact.organizationPlaceholder")}
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-neutral-800">{t("contact.messageLabel")}</span>
              <textarea
                name="message"
                rows="6"
                className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                placeholder={t("contact.messagePlaceholder")}
              />
            </label>

            {status === "success" && (
              <p className="mt-4 text-sm text-green-700">
                {t("contact.success")}
              </p>
            )}

            {status === "error" && error && (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
              whileTap={{ scale: status === "loading" ? 1 : 0.985 }}
              transition={{ duration: 0.2, ease: EASE }}
              disabled={status === "loading"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-4 text-base font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-900/15 focus:outline-none focus:ring-4 focus:ring-primary-500/25 sm:w-auto disabled:opacity-60"
            >
              {status === "loading" ? t("contact.sending") : t("contact.submit")}
              {status !== "loading" && <ArrowRight className="h-5 w-5" />}
            </motion.button>
          </motion.form>
        </div>
      </Container>

      <div className="relative mt-16 w-full overflow-hidden">
        <iframe
          title="Localisation IRICA"
          src="https://maps.google.com/maps?q=-3.382328,29.366774&z=15&output=embed"
          width="100%"
          height="420"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[320px] w-full md:h-[420px]"
        />
        <a
          href="https://www.google.com/maps/place/-3.382328,29.366774"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-primary-700 shadow-md hover:bg-neutral-50"
        >
          {t("contact.openInMaps")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

export default ContactForm;
