import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/authContext";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return children;
}