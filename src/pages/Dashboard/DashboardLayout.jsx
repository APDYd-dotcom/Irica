import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, ChevronRight, House, LockKeyhole } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../i18n/LanguageContext";

const NAV_ITEMS = [
  { to: "/dashboard", labelKey: "dashboard.nav.overview", icon: House, end: true },
  { to: "/dashboard/programs", labelKey: "dashboard.nav.programs", icon: BookOpen },
  { to: "/dashboard/subscription", labelKey: "dashboard.nav.access", icon: LockKeyhole },
];

const linkClass = ({ isActive }) =>
  [
    "group flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3",
    "text-sm font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40",
    isActive
      ? "bg-primary-500 text-white shadow-sm"
      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
  ].join(" ");

const chevronClass = ({ isActive }) =>
  [
    "ml-auto h-4 w-4 flex-none transition-all duration-200",
    isActive ? "opacity-60" : "opacity-40 lg:opacity-0 lg:group-hover:opacity-60",
  ].join(" ");

function DashboardLayout() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const email = user?.email || user?.username || "";
  const initial = (email.charAt(0) || "M").toUpperCase();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pt-32 lg:px-12 lg:pt-40">
        <header className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-primary-500 text-2xl font-bold text-white">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
                  {t("dashboard.headerLabel")}
                </p>
                <p className="mt-1 break-words text-lg font-semibold text-neutral-900 lg:text-xl">
                  {email || t("dashboard.noEmail")}
                </p>
              </div>
            </div>

            <div className="max-w-md rounded-2xl bg-primary-50 p-6">
              <p className="text-base font-semibold text-primary-800">
                {t("dashboard.spaceTitle")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-primary-700/80">
                {t("dashboard.spaceDescription")}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="min-w-0">
            <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm lg:sticky lg:top-24">
              <nav className="scrollbar-hidden flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
                {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }) => (
                  <NavLink key={to} to={to} end={end} className={linkClass}>
                    {({ isActive }) => (
                      <>
                        <Icon className="h-4 w-4 flex-none" />
                        {t(labelKey)}
                        <ChevronRight className={chevronClass({ isActive })} />
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
