import React, { useLayoutEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";

interface RequireRoleProps {
  allowed: UserRole[];
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export default function RequireRole({ allowed, children, redirectTo = "/login", fallback = null }: RequireRoleProps) {
  const { user } = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [canRender, setCanRender] = useState(false);

  useLayoutEffect(() => {
    // If no user, redirect before paint
    if (!user) {
      navigate(redirectTo, { replace: true, state: { from: location } });
      return;
    }
    // If role not allowed, redirect before paint
    if (!allowed.includes(user.role)) {
      navigate("/dashboard", { replace: true });
      return;
    }
    // Authorized → allow render
    setCanRender(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, allowed, redirectTo, location.pathname]);

  if (!user) return <>{fallback}</>;
  if (!canRender) return <>{fallback}</>;
  return <>{children}</>;
}


