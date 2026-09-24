import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeartHandshake, LayoutDashboard, LockKeyhole, LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useLanguage } from "../../i18n/LanguageContext";
import { EASE } from "../../animations/variants";
import Container from "../Layout/Container";

const navLinks = [
  { to: "/#services", labelKey: "nav.services", id: "services" },
  { to: "/#about", labelKey: "nav.about", id: "about" },
  { to: "/#programs", labelKey: "nav.programs", id: "programs" },
  { to: "/#publications", labelKey: "nav.publications", id: "publications" },
  { to: "/blog", labelKey: "nav.blog", id: "blog" },
  { to: "/#team", labelKey: "nav.team", id: "team" },
  { to: "/#contact", labelKey: "nav.contact", id: "contact" },
];

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 p-1 text-xs font-semibold">
      <button
        type="button"
        onClick={() => setLanguage("fr")}
        className={`rounded-full px-2.5 py-1 transition ${
          language === "fr"
            ? "bg-primary-500 text-white"
            : "text-neutral-500 hover:text-neutral-900"
        }`}
        aria-label={t("nav.lang.fr")}
      >
        {t("nav.lang.fr")}
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-1 transition ${
          language === "en"
            ? "bg-primary-500 text-white"
            : "text-neutral-500 hover:text-neutral-900"
        }`}
        aria-label={t("nav.lang.en")}
      >
        {t("nav.lang.en")}
      </button>
    </div>
  );
}

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const scrolled = useScrollDirection();
  const { t } = useLanguage();

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
    <motion.header
      initial={false}
      animate={{
        boxShadow: scrolled
          ? "0 8px 24px -16px rgba(0, 58, 23, 0.18)"
          : "0 0 0 rgba(0,0,0,0)",
        borderColor: scrolled ? "rgba(232, 226, 216, 0.95)" : "rgba(232, 226, 216, 0.7)",
      }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 border-b glass"
    >
      <Container>
        <motion.nav
          initial={false}
          animate={{ height: scrolled ? 64 : 80 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex items-center justify-between gap-6"
        >
          <Link to="/" className="flex items-center gap-3" onClick={closeDrawer}>
            <motion.img
              src="/images/logo.png"
              alt="IRICA"
              initial={false}
              animate={{ height: scrolled ? 44 : 56 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-auto"
            />
            <span className="hidden text-sm font-bold tracking-tight text-neutral-900 sm:block">
              IRICA
            </span>
          </Link>

<div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-full px-3 py-2 text-xs md:text-sm font-medium whitespace-nowrap ${
                  active
                    ? "text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                  {t(link.labelKey)}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-500 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <LanguageToggle />

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 md:gap-2 rounded-full px-3 py-2 text-xs md:text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
              >
                <LogOut className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="hidden sm:inline">{t("nav.logout")}</span>
              </button>
            ) : null}

            <Link
              to="/donate"
              className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-primary-500 px-3 py-2 text-xs md:text-sm font-semibold text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
            >
              <HeartHandshake className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden sm:inline">{t("nav.donate")}</span>
            </Link>

            <Link
              to={adminLink}
              className="inline-flex items-center gap-1.5 md:gap-2 rounded-full px-3 py-2 text-xs md:text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
            >
              <LockKeyhole className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden sm:inline">{t("nav.admin")}</span>
            </Link>

            <Link
              to={dashboardLink}
              className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-primary-500 px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-900/15 focus:outline-none focus:ring-4 focus:ring-primary-500/25"
            >
              <LayoutDashboard className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden sm:inline">{t("nav.memberSpace")}</span>
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-primary-500/20 lg:hidden"
            aria-label={drawerOpen ? t("nav.menuClose") : t("nav.menuOpen")}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((prev) => !prev)}
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.nav>
      </Container>

      {drawerOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-neutral-900/30 lg:hidden"
          style={{ top: scrolled ? 64 : 80 }}
          aria-label={t("nav.menuClose")}
          onClick={closeDrawer}
        />
      ) : null}

      <motion.aside
        initial={false}
        animate={{
          y: drawerOpen ? 0 : -16,
          opacity: drawerOpen ? 1 : 0,
          top: scrolled ? 80 : 96,
        }}
        transition={{ duration: 0.25, ease: EASE }}
        className={`fixed right-4 z-40 w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-neutral-200 bg-white p-4 shadow-2xl shadow-neutral-900/15 lg:hidden ${
          drawerOpen ? "pointer-events-auto" : "pointer-events-none"
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
              {t(link.labelKey)}
            </Link>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center">
          <LanguageToggle />
        </div>

        <div className="mt-4 grid gap-2 border-t border-neutral-200 pt-4">
          <Link
            to="/donate"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-500 px-4 py-3 text-sm font-semibold text-primary-700 bg-white hover:bg-primary-50"
            onClick={closeDrawer}
          >
            <HeartHandshake className="h-4 w-4" />
            {t("nav.donate")}
          </Link>
          <Link
            to={adminLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
            onClick={closeDrawer}
          >
            <LockKeyhole className="h-4 w-4" />
            {t("nav.admin")}
          </Link>
          <Link
            to={dashboardLink}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-600"
            onClick={closeDrawer}
          >
            <LayoutDashboard className="h-4 w-4" />
            {t("nav.memberSpace")}
          </Link>
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-100"
            >
              <LogOut className="h-4 w-4" />
              {t("nav.logout")}
            </button>
          ) : null}
        </div>
      </motion.aside>
    </motion.header>
  );
}

export default Navbar;
