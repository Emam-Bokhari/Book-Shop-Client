import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface PrivateRouteProps {
  children: JSX.Element;
  role?: "admin" | "user";
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
