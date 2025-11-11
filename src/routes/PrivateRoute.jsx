import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Show a loading spinner or message while Firebase checks auth
    return <p className="text-center mt-10">Loading...</p>;
  }

  // If user exists, show the protected page
  if (user) return children;

  // Otherwise, redirect to login
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
