import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";

function AdminLayout() {
  const { user } = useAuth();
  const { data: resourcesData } = useFetch("/materials/");
  const { data: programsData } = useFetch("/programs/");
  const { data: publicationsData } = useFetch("/publications/");

  const resourcesCount = resourcesData?.length ?? resourcesData?.results?.length ?? 0;
  const programsCount = programsData?.length ?? programsData?.results?.length ?? 0;
  const publicationsCount = publicationsData?.length ?? publicationsData?.results?.length ?? 0;

  const linkClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-forest-900 text-white shadow"
        : "text-ink-soft hover:bg-forest-50"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-8 rounded-3xl bg-white border border-ink/10 p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-2">
                Admin Dashboard
              </p>
              <h1 className="text-3xl font-serif text-ink">Welcome back{user?.full_name ? `, ${user.full_name}` : ""}</h1>
              <p className="mt-2 text-sm text-ink-soft max-w-2xl">
                Manage resources, programs, and publications from one polished workspace.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-100 border border-ink/10 px-5 py-4 text-sm text-ink-soft">
              <p className="font-semibold text-ink">Quick access</p>
              <p className="mt-2">Use the left menu to add content or edit existing items.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 border border-ink/10 p-4 text-sm">
              <p className="text-ink-soft uppercase tracking-[0.24em] font-semibold">Resources</p>
              <p className="mt-3 text-3xl font-semibold text-ink">{resourcesCount}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 border border-ink/10 p-4 text-sm">
              <p className="text-ink-soft uppercase tracking-[0.24em] font-semibold">Programs</p>
              <p className="mt-3 text-3xl font-semibold text-ink">{programsCount}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 border border-ink/10 p-4 text-sm">
              <p className="text-ink-soft uppercase tracking-[0.24em] font-semibold">Publications</p>
              <p className="mt-3 text-3xl font-semibold text-ink">{publicationsCount}</p>
            </div>
          </div>
        </header>

        <div className="md:flex md:items-start md:gap-8">
          <aside className="md:w-72 shrink-0">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-3xl bg-white border border-ink/10 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-4">
                  Resources
                </p>
                <nav className="space-y-2">
                  <NavLink to="/admin/materials" end className={linkClass}>
                    📚 Resources
                  </NavLink>
                  <NavLink to="/admin/materials/new" className={linkClass}>
                    ➕ Add Resource
                  </NavLink>
                </nav>
              </div>

              <div className="rounded-3xl bg-white border border-ink/10 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-4">
                  Programs
                </p>
                <nav className="space-y-2">
                  <NavLink to="/admin/programs" end className={linkClass}>
                    🎓 Programs
                  </NavLink>
                  <NavLink to="/admin/programs/new" className={linkClass}>
                    ➕ Add Program
                  </NavLink>
                </nav>
              </div>

              <div className="rounded-3xl bg-white border border-ink/10 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-4">
                  Publications
                </p>
                <nav className="space-y-2">
                  <NavLink to="/admin/publications" end className={linkClass}>
                    📄 Publications
                  </NavLink>
                </nav>
              </div>

              <div className="rounded-3xl bg-white border border-ink/10 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-4">
                  Subscriptions
                </p>
                <nav className="space-y-2">
                  <NavLink to="/admin/subscriptions" end className={linkClass}>
                    ✉️ Subscriptions
                  </NavLink>
                </nav>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
