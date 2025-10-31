// src/routes/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user } = useAuth();

  // No user = go back to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Wrong role = block access
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/auth" replace />;
  }

  // Everything OK
  return children;
};

export default ProtectedRoute;
