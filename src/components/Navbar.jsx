import { useState } from "react";
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
    { to: "/materials", label: "Resources" },
    user && { to: "/dashboard/materials", label: "Dashboard" },
    user?.is_staff && { to: "/admin/materials", label: "Admin" },
  ].filter(Boolean);

  return (
    <header className="relative bg-parchment border-b border-ink/10">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="IRICA" className="h-20 block" />
        </Link>

        <button
          type="button"
          className="flex flex-col justify-between h-6 w-8 focus:outline-none"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-full bg-ink rounded" />
          <span className="block h-0.5 w-full bg-ink rounded" />
          <span className="block h-0.5 w-full bg-ink rounded" />
        </button>
      </nav>

      {drawerOpen && (
        <div className="absolute inset-x-0 top-full z-20 border-t border-ink/10 bg-parchment shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4">
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
        </div>
      )}
    </header>
  );
}

export default Navbar;
