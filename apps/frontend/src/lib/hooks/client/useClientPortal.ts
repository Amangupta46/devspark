import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getClientUsers,
  getDeliverables,
  getClientMessages,
  getClientDashboard,
} from "@/lib/api/client-portal";
import { PaginationParams } from "@/lib/api/crm";

export function useClientUsers(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.client_portal.users.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getClientUsers({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useDeliverables(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.client_portal.deliverables.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getDeliverables({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useClientMessages(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.client_portal.messages.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getClientMessages({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useClientDashboardQuery() {
  return useQuery({
    queryKey: queryKeys.client_portal.dashboard,
    queryFn: getClientDashboard,
  });
}

/**
 * Unified Facade for Client Portal domain.
 */
export function useClientPortal() {
  return {
    dashboard: useClientDashboardQuery,
    users: {
      useList: useClientUsers,
    },
    deliverables: {
      useList: useDeliverables,
    },
    messages: {
      useList: useClientMessages,
    },
  };
}
