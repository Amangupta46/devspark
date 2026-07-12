import { useAuth } from "./auth-provider";

export function useCurrentUser() {
  const { user, isAuthenticated, isLoading } = useAuth();
  return { user, isAuthenticated, isLoading };
}

export function useRole() {
  const { user, isLoading } = useAuth();
  return {
    role: user?.role,
    isLoading,
    isSuperAdmin: user?.role === "SUPER_ADMIN",
    isAdmin: user?.role === "ADMIN",
    isProjectManager: user?.role === "PROJECT_MANAGER",
    isDeveloper: user?.role === "DEVELOPER",
    isClient: user?.role === "CLIENT",
  };
}

// Temporary permission hook until we wire up fine-grained backend permissions
export function usePermissions(requiredRole: string) {
  const { role, isLoading } = useRole();
  return {
    hasPermission: role === requiredRole || role === "SUPER_ADMIN",
    isLoading,
  };
}
