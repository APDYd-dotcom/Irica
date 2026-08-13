import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

// Same idea as ProtectedRoute, but with an EXTRA check: not just "logged in",
// but "logged in AND is_staff". Regular members should never see this.
function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/admin/login" replace />;

  // Logged in, but NOT an admin — send them to their normal dashboard instead.
  const isAdmin = user.is_staff;
  if (!isAdmin) return <Navigate to="/dashboard/programs" replace />;

  return <Outlet />;
}

export default AdminRoute;
