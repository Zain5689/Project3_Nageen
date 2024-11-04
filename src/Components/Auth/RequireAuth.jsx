import { useContext } from "react";
import { user } from "../UseContext/Usercontext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const User = useContext(user);

  return User.Auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
