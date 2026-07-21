import { Link } from "react-router-dom";
// Use real PNG logo from public/images

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-forest-100 border-t border-forest-900">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-extrabold tracking-tight text-white">IRICA</span>
            </Link>
            <p className="text-sm text-forest-200/80 leading-relaxed">
              Cabinet de recherche et développement en Afrique de l'Est.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-3 text-sm text-forest-200/70">
              <li><Link to="/" className="hover:text-white transition duration-200">Accueil</Link></li>
              <li><Link to="/materials" className="hover:text-white transition duration-200">Ressources</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition duration-200">S'abonner</Link></li>
              <li><Link to="/login" className="hover:text-white transition duration-200">Se connecter</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Services</h3>
            <ul className="space-y-3 text-sm text-forest-200/70">
              <li>Recherche Appliquée</li>
              <li>Suivi-Évaluation</li>
              <li>Audit & Conseil</li>
              <li>Formation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="Contact">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Contact</h3>
            <div className="space-y-3 text-sm text-forest-200/70">
              <div>
                <p className="text-xs text-forest-300/60 uppercase mb-1">Téléphone</p>
                <a href="tel:+25776891572" className="hover:text-white transition duration-200">+257 76 891 572</a>
              </div>
              <div>
                <p className="text-xs text-forest-300/60 uppercase mb-1">Email</p>
                <a href="mailto:info.irica@gmail.com" className="hover:text-white transition duration-200">info.irica@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-forest-900/50" />

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-forest-200/50">© {currentYear} IRICA. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-forest-200/60 hover:text-white transition duration-200 text-sm">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-forest-200/60 hover:text-white transition duration-200 text-sm">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-forest-200/60 hover:text-white transition duration-200 text-sm">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
