import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const token = localStorage.getItem("token");

  // If user is logged in, redirect to feed
  if (token) return <Navigate to="/feed" replace />;

  return children; // else render the page
};

export default AuthRedirect;
