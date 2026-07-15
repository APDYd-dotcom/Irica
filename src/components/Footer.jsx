import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-100">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand block */}
        <div className="md:col-span-2">
          <Logo className="h-12 mb-4" showText={true} light={true} />
          <p className="text-sm text-forest-100/70 max-w-md leading-relaxed">
            Institute of Research and Immersive Career Advancement (IRICA) est un cabinet de conseil, de recherche appliquée et de développement du capital humain basé à Bujumbura, Burundi. « De la rigueur analytique à l'impact durable ».
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="eyebrow text-forest-100 mb-3">Explorer</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
            <li><Link to="/materials" className="hover:text-white transition">Ressources</Link></li>
            <li><Link to="/checkout" className="hover:text-white transition">S'abonner</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Se connecter</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow text-forest-100 mb-3">Contact</p>
          <ul className="space-y-2 text-xs text-forest-100/70">
            <li className="font-medium text-white">📍 Adresse:</li>
            <li>Avenue de l'Amitié, Immeuble ABC, 3ème étage, Bureau D1-4, Bujumbura, Burundi</li>
            <li className="pt-1 font-medium text-white">📞 Téléphone & WhatsApp:</li>
            <li>+257 76 891 572</li>
            <li className="pt-1 font-medium text-white">📧 Email:</li>
            <li>
              <a href="mailto:info.irica@gmail.com" className="hover:text-white transition">
                info.irica@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-100/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-forest-100/50">
          <p>© {new Date().getFullYear()} IRICA. Tous droits réservés.</p>
          <p className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
