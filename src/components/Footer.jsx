import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-100">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand block */}
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-white mb-3">IRICA</p>
          <p className="text-sm text-forest-100/70 max-w-sm leading-relaxed">
            Institute of Research and Immersive Career Advancement — building
            practical, research-backed pathways for the next generation of
            professionals in the Great Lakes region.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="eyebrow text-gold-400 mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/materials" className="hover:text-white">Materials</Link></li>
            <li><Link to="/checkout" className="hover:text-white">Subscribe</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow text-gold-400 mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-forest-100/70">
            <li>Bujumbura, Burundi</li>
            <li>Avenue de l'Amitié</li>
            <li className="pt-2">
              <a href="mailto:hello@irica.bi" className="hover:text-white">hello@irica.bi</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-100/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-forest-100/50">
          <p>© {new Date().getFullYear()} IRICA. All rights reserved.</p>
          <p>Bujumbura, Burundi</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
