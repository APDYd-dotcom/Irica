import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function DashboardLayout() {
  const { user } = useAuth();
  const displayName = user?.full_name || user?.email || "Member";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
      isActive ? "bg-forest-800 text-white" : "text-ink-soft hover:bg-forest-50"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <header className="mb-6 rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-800 text-lg font-semibold text-white">
                {initials}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold">
                  Member Dashboard
                </p>
                <h1 className="mt-1 text-2xl font-serif text-ink">Welcome back, {displayName}</h1>
              </div>
            </div>

            <div className="rounded-2xl bg-forest-50 px-4 py-3 text-sm text-forest-800">
              <p className="font-semibold">IRICA learning space</p>
              <p className="text-forest-800/80">Programs, access codes, and articles in one place.</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside>
            <div className="sticky top-6 rounded-3xl border border-ink/10 bg-white p-4 shadow-sm">
              <nav className="space-y-2">
                <NavLink to="/dashboard" end className={linkClass}>🏠 Overview</NavLink>
                <NavLink to="/dashboard/materials" className={linkClass}>📚 Programs</NavLink>
                <NavLink to="/dashboard/profile" className={linkClass}>👤 Profile</NavLink>
                <NavLink to="/dashboard/subscription" className={linkClass}>🔐 Access</NavLink>
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
