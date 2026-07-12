"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./auth-provider";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
        // Redirect to a generic unauthorized or dashboard page
        router.push("/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
