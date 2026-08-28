import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LockKeyhole, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Container from "../Layout/Container";

const navLinks = [
  { to: "/#services", label: "Services", id: "services" },
  { to: "/#about", label: "À propos", id: "about" },
  { to: "/#programs", label: "Programmes", id: "programs" },
  { to: "/#publications", label: "Publications", id: "publications" },
  { to: "/#team", label: "Équipe", id: "team" },
  { to: "/#contact", label: "Contact", id: "contact" },
];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const dashboardLink = user && !user.is_staff ? "/dashboard/programs" : "/login";
  const adminLink = user?.is_staff ? "/admin/articles" : "/admin/login";

  function handleLogout() {
    logout();
    navigate("/login");
    setDrawerOpen(false);
  }

  useEffect(() => {
    if (!drawerOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/70 glass">
      <Container>
        <nav className="flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3" onClick={closeDrawer}>
            <img src="/images/logo.png" alt="IRICA" className="h-14 w-auto" />
            <span className="hidden text-sm font-bold tracking-tight text-neutral-900 sm:block">
              IRICA
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = activeId === link.id;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium ${
                    active
                      ? "text-primary-700"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary-500 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
              >
                <LogOut className="h-4 w-4" />
                Sortir
              </button>
            ) : null}

            <Link
              to={adminLink}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
            >
              <LockKeyhole className="h-4 w-4" />
              Admin
            </Link>

            <Link
              to={dashboardLink}
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-900/15 focus:outline-none focus:ring-4 focus:ring-primary-500/25"
            >
              <LayoutDashboard className="h-4 w-4" />
              Espace membre
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-primary-500/20 lg:hidden"
            aria-label={drawerOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((prev) => !prev)}
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      {drawerOpen ? (
        <button
          type="button"
          className="fixed inset-0 top-20 z-30 bg-neutral-900/30 lg:hidden"
          aria-label="Fermer le menu"
          onClick={closeDrawer}
        />
      ) : null}

      <aside
        className={`fixed right-4 top-24 z-40 w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-neutral-200 bg-white p-4 shadow-2xl shadow-neutral-900/15 transition lg:hidden ${
          drawerOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="grid gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl px-4 py-3 text-base font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary-700"
              onClick={closeDrawer}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 grid gap-2 border-t border-neutral-200 pt-4">
          <Link
            to={adminLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
            onClick={closeDrawer}
          >
            <LockKeyhole className="h-4 w-4" />
            Admin
          </Link>
          <Link
            to={dashboardLink}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-600"
            onClick={closeDrawer}
          >
            <LayoutDashboard className="h-4 w-4" />
            Espace membre
          </Link>
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-100"
            >
              <LogOut className="h-4 w-4" />
              Sortir
            </button>
          ) : null}
        </div>
      </aside>
    </header>
  );
}

export default Navbar;
