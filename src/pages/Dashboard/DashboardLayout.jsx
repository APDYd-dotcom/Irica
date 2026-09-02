import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, House, LockKeyhole, UserRound } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function DashboardLayout() {
  const { user } = useAuth();
  const displayName = user?.email || user?.username || "Member";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const linkClass = ({ isActive }) =>
    `flex shrink-0 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-semibold transition lg:justify-start ${
      isActive ? "bg-forest-800 text-white" : "text-ink-soft hover:bg-forest-50"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-6 sm:py-6 lg:py-8">
        <header className="mb-4 rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:mb-6 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest-800 text-sm font-semibold text-white sm:h-14 sm:w-14 sm:text-base">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-soft/70 font-semibold sm:text-xs sm:tracking-[0.22em]">
                  Member Dashboard
                </p>
                <h1 className="mt-1 truncate text-lg font-serif text-ink sm:text-xl">{displayName}</h1>
              </div>
            </div>

            <div className="rounded-2xl bg-forest-50 px-4 py-3 text-xs text-forest-800 sm:max-w-sm">
              <p className="font-semibold">IRICA learning space</p>
              <p className="text-forest-800/80">Your registered programs and articles in one place.</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="min-w-0">
            <div className="rounded-3xl border border-ink/10 bg-white p-3 shadow-sm lg:sticky lg:top-6 lg:p-4">
              <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
                <NavLink to="/dashboard" end className={linkClass}>
                  <House className="h-4 w-4" />
                  Overview
                </NavLink>
                <NavLink to="/dashboard/programs" className={linkClass}>
                  <BookOpen className="h-4 w-4" />
                  Programs
                </NavLink>
                <NavLink to="/dashboard/profile" className={linkClass}>
                  <UserRound className="h-4 w-4" />
                  Profile
                </NavLink>
                <NavLink to="/dashboard/subscription" className={linkClass}>
                  <LockKeyhole className="h-4 w-4" />
                  Access
                </NavLink>
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
