import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/auth";
import { queryKeys } from "@/lib/query/keys";
import { TokenManager } from "@/lib/auth/token-manager";

export function useProfileQuery() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getCurrentUser,
    enabled: !!TokenManager.getAccessToken(),
    retry: false, // Don't retry auth queries immediately if 401
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
