import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const RequireAuth = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
