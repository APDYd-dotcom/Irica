import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function AdminLayout() {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium ${
      isActive ? "bg-forest-800 text-white" : "text-ink-soft hover:bg-forest-50"
    }`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
      <aside className="md:w-56 shrink-0">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-ink-soft/70 font-semibold">Admin</p>
          <p className="font-semibold text-ink">{user?.full_name || user?.email}</p>
        </div>

        <nav className="space-y-1">
          <p className="px-4 py-2 text-xs uppercase tracking-wide text-ink-soft/70 font-semibold mt-4">Content</p>
          <NavLink to="/admin/materials" end className={linkClass}>📚 Materials</NavLink>
          <NavLink to="/admin/materials/new" className={linkClass}>➕ Add Material</NavLink>
          
          <p className="px-4 py-2 text-xs uppercase tracking-wide text-ink-soft/70 font-semibold mt-4">Programs</p>
          <NavLink to="/admin/programs" end className={linkClass}>🎓 Programs</NavLink>
          <NavLink to="/admin/programs/new" className={linkClass}>➕ Add Program</NavLink>
        </nav>
      </aside>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
