import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone, UserRoundPlus } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../Layout/Container";
import { EASE } from "../../animations/variants";

function Footer() {
  const currentYear = new Date().getFullYear();

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
              Institut de recherche et d'innovation pour le conseil en Afrique,
              au service de décisions plus claires et plus utiles.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-white">Navigation</h3>
            <ul className="mt-5 space-y-3 text-sm text-neutral-300">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#about" className="hover:text-white">À propos</a></li>
              <li><a href="#programs" className="hover:text-white">Programmes</a></li>
              <li><a href="#publications" className="hover:text-white">Publications</a></li>
              <li><a href="#team" className="hover:text-white">Équipe</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-white">Contact</h3>
            <div className="mt-5 space-y-4 text-sm text-neutral-300">
              <a href="mailto:info.irica@gmail.com" className="flex items-center gap-3 hover:text-white">
                <Mail className="h-4 w-4 text-primary-300" />
                info.irica@gmail.com
              </a>
              <a href="tel:+25776891572" className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4 text-primary-300" />
                +257 76 891 572
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary-300" />
                Afrique de l'Est
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-white">Newsletter</h3>
            <p className="mt-5 text-sm leading-6 text-neutral-300">
              Recevez nos notes, programmes et publications.
            </p>
            <form className="mt-5 flex rounded-full border border-white/10 bg-white/10 p-1 focus-within:ring-4 focus-within:ring-primary-500/20">
              <input
                type="email"
                aria-label="Adresse email"
                placeholder="Email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                aria-label="S'inscrire"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-400"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} IRICA. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white" aria-label="LinkedIn">
              <UserRoundPlus className="h-4 w-4" />
            </a>
            <a href="#contact" className="hover:text-white">Confidentialité</a>
            <a href="#contact" className="hover:text-white">Conditions</a>
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}

export default Footer;
