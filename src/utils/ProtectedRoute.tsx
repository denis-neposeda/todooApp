import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import type { RootState } from "@/store";

type ChildrenType = { children: JSX.Element };

export const ProtectedRoute = ({ children }: ChildrenType) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};
