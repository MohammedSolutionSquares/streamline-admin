import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";

interface RequireRoleProps {
  allowed: UserRole[];
  children: React.ReactNode;
  redirectTo?: string;
}

export default function RequireRole({ allowed, children, redirectTo = "/login" }: RequireRoleProps) {
  const { user } = useRole();
  const location = useLocation();

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!allowed.includes(user.role)) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return <>{children}</>;
}


