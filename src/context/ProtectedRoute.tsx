import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get("auth_token");
  const isAuthenticated = !!token
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
