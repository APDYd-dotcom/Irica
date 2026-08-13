import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
    setDrawerOpen(false);
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/#services", label: "Services" },
    { to: "/#programs", label: "Programmes" },
    { to: "/#publications", label: "Publications" },
    { to: "/#activities", label: "Activités" },
    { to: "/#team", label: "Équipe" },
    { to: "/#programs", label: "Resources" },
    { to: "/dashboard/programs", label: "Dashboard" },
    user?.is_staff && { to: "/admin/articles", label: "Admin" },
  ].filter(Boolean);

  useEffect(() => {
    if (!drawerOpen) {
      document.body.style.overflow = "";
      return;
    }

    // prevent background scroll while drawer is open
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="relative bg-parchment border-b border-ink/10">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="IRICA" className="h-20 block" />
        </Link>
        {/* Desktop nav (visible md+) */}
        <div className="hidden md:flex items-center gap-6 eyebrow text-ink-soft">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-forest-800">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions (visible md+) */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {user ? (
            <button
              onClick={handleLogout}
              className="eyebrow text-ink-soft hover:text-forest-800"
            >
              Log out
            </button>
          ) : (
            <Link to="/login" className="eyebrow text-ink-soft hover:text-forest-800">
              Login
            </Link>
          )}

          <Link
            to="/#programs"
            className="bg-forest-800 hover:bg-forest-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition"
          >
            Programs
          </Link>
        </div>

        {/* Mobile menu button (hidden md+) */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-between h-6 w-8 focus:outline-none"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-full bg-ink rounded" />
          <span className="block h-0.5 w-full bg-ink rounded" />
          <span className="block h-0.5 w-full bg-ink rounded" />
        </button>
      </nav>

      {/* Overlay */}
      {/* Overlay (mobile only) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden
        />
      )}

      {/* Left drawer */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-80 bg-parchment border-r border-ink/10 shadow-xl transform transition-transform duration-300 md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div className="h-20 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={() => setDrawerOpen(false)}>
            <img src="/images/logo.png" alt="IRICA" className="h-14 block" />
          </Link>
          <button
            type="button"
            className="p-2 rounded-md hover:bg-ink/5"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block text-lg font-medium text-ink-soft hover:text-forest-800"
              onClick={() => setDrawerOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-ink/10 pt-4 flex flex-col gap-3">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-left text-lg font-medium text-ink-soft hover:text-forest-800"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block text-lg font-medium text-ink-soft hover:text-forest-800"
                onClick={() => setDrawerOpen(false)}
              >
                Login
              </Link>
            )}

            <Link
              to="/checkout"
              className="inline-block bg-forest-800 hover:bg-forest-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition w-max"
              onClick={() => setDrawerOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </aside>
      {/* Close drawer on Escape */}
      {/* useEffect below handles Escape key when drawerOpen changes */}
    </header>
  );
}

export default Navbar;
