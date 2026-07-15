import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

// Same idea as ProtectedRoute, but with an EXTRA check: not just "logged in",
// but "logged in AND is_staff". Regular subscribers should never see this.
//
// Your Django /auth/profile/ response needs to include an `is_staff` field
// (DRF's default UserSerializer usually already exposes this from AbstractUser).
function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  // Logged in, but NOT an admin — send them to their normal dashboard instead
  if (!user.is_staff) return <Navigate to="/dashboard/materials" replace />;

  return <Outlet />;
}

export default AdminRoute;
