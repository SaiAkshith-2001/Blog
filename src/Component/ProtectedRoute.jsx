import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // const { user } = useContext(AuthContext);
  const user = false; // for testing purposes
  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
