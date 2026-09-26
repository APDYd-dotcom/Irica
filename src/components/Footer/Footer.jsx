import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../Layout/Container";
import { useLanguage } from "../../i18n/LanguageContext";
import { EASE } from "../../animations/variants";
import { subscribeNewsletter } from "../../api/public";

function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterError, setNewsletterError] = useState(null);

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    setNewsletterStatus("loading");
    setNewsletterError(null);

    try {
      await subscribeNewsletter(newsletterEmail);
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterError(t("footer.error"));
      setNewsletterStatus("error");
    }
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="bg-neutral-900 text-white"
    >
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/images/logo.png" alt="IRICA" className="h-12 w-auto rounded bg-white p-1" />
              <span className="text-xl font-bold">IRICA</span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-neutral-300">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-white">{t("footer.navTitle")}</h3>
            <ul className="mt-5 space-y-3 text-sm text-neutral-300">
              <li><a href="#services" className="hover:text-white">{t("nav.services")}</a></li>
              <li><a href="#about" className="hover:text-white">{t("nav.about")}</a></li>
              <li><a href="#programs" className="hover:text-white">{t("nav.programs")}</a></li>
              <li><a href="#publications" className="hover:text-white">{t("nav.publications")}</a></li>
              <li><a href="#team" className="hover:text-white">{t("nav.team")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-white">{t("footer.contactTitle")}</h3>
            <div className="mt-5 space-y-4 text-sm text-neutral-300">
              <a href="mailto:info.irica@gmail.com" className="flex items-center gap-3 hover:text-white">
                <Mail className="h-4 w-4 text-primary-300" />
                {t("footer.email")}
              </a>
              <a href="tel:+25776891572" className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4 text-primary-300" />
                {t("footer.phone")}
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-10 text-primary-300" />
                {t("footer.location")}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-white">{t("footer.newsletterTitle")}</h3>
            <p className="mt-5 text-sm leading-6 text-neutral-300">
              {t("footer.newsletterDesc")}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-5 flex rounded-full border border-white/10 bg-white/10 p-1 focus-within:ring-4 focus-within:ring-primary-500/20">
              <input
                type="email"
                aria-label={t("footer.emailAria")}
                placeholder={t("footer.emailPlaceholder")}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                aria-label={t("footer.subscribeAria")}
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-400 disabled:opacity-60"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="mt-2 text-xs text-green-400">{t("footer.thanks")}</p>
            )}
            {newsletterStatus === "error" && newsletterError && (
              <p className="mt-2 text-xs text-red-400">{newsletterError}</p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>{t("footer.copyright", { year: currentYear })}</p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61581983698428" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/insitute-of-research-and-immersive-career-advancement/" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.5h4.5V24H.24V8.5zm8.32 0h4.32v2.16c.62-1 1.7-2.2 3.48-2.2 3.73 0 4.42 2.45 4.42 5.64V24h-4.5v-7.15c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.78V24h-4.5V8.5z"/>
              </svg>
            </a>
            <a href="#contact" className="hover:text-white">{t("footer.privacy")}</a>
            <a href="#contact" className="hover:text-white">{t("footer.terms")}</a>
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}

export default Footer;
