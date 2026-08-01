import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function DashboardLayout() {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium ${
      isActive ? "bg-forest-800 text-white" : "text-ink-soft hover:bg-forest-50"
    }`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="md:w-56 shrink-0">
        <div className="mb-6">
          <p className="text-sm text-ink-soft/70">Welcome back,</p>
          <p className="font-semibold text-ink">{user?.full_name || user?.email}</p>
        </div>

        <nav className="space-y-1">
          <NavLink to="/dashboard/materials" className={linkClass}>📚 Resources</NavLink>
          <NavLink to="/dashboard/profile" className={linkClass}>👤 Profile</NavLink>
          <NavLink to="/dashboard/subscription" className={linkClass}>💳 Subscription</NavLink>
        </nav>
      </aside>

      {/* Page content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
