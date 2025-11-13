import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="text-center mt-10">L<span className="loading loading-spinner loading-xl"></span>ading...</p>;
  }
  if (user) return children;
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
