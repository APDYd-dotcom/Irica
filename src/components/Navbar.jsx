import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// Use real PNG logo from public/images

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-parchment border-b border-ink/10">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center gap-8">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="IRICA" className="h-11 block" />
        </Link>

        <div className="hidden md:flex items-center gap-6 eyebrow text-ink-soft">
          <Link to="/materials" className="hover:text-forest-800">Materials</Link>
          {user && (
            <Link to="/dashboard/materials" className="hover:text-forest-800">Dashboard</Link>
          )}
          {user?.is_staff && (
            <Link to="/admin/materials" className="hover:text-forest-800">Admin</Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-4">
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
            to="/checkout"
            className="bg-forest-800 hover:bg-forest-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition"
          >
            Subscribe
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
