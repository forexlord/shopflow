import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAdmin } from "../features/products/utils/isAdmin";

export function AdminRoute() {
  const { user } = useAuth();

  if (!isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
