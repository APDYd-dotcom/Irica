import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

// Wraps around any nested <Route> that should only be visible when logged in.
function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Still checking if the saved token is valid — show a spinner, not a flash-redirect
  if (loading) return <Loader />;

  // No user? Send them to login, remembering nothing extra needed —
  // Login.jsx will send them to /dashboard by default after success.
  if (!user) return <Navigate to="/login" replace />;

  // Logged in — let the nested dashboard routes render here
  return <Outlet />;
}

export default ProtectedRoute;
