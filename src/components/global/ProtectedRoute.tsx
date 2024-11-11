import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accessToken, user, displayFlag, logout } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      logout();
    }
  }, [accessToken]);

  return accessToken && user && displayFlag && children;
}
