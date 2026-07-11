import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import {
  getNotifications, markNotificationAsRead,
  getNotificationPreferences, getAnnouncements
} from '@/lib/api/notifications';
import { PaginationParams } from '@/lib/api/crm';
import { NotificationMessage } from '@/types/notifications';
import { PaginatedResponse } from '@/types/api';

const POLLING_INTERVAL_MS = 30000; // Poll every 30 seconds

export function useNotifications(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.notifications.messages.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getNotifications({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
    // Real-Time Polling Foundation
    refetchInterval: POLLING_INTERVAL_MS,
  });
}

/**
 * Hook specifically for the Notification Badge to compute unread counts across all polled pages.
 */
export function useUnreadNotificationsCount() {
  const { data } = useNotifications();
  
  if (!data) return 0;
  
  let unreadCount = 0;
  for (const page of data.pages) {
    unreadCount += page.results.filter(n => !n.is_read).length;
  }
  return unreadCount;
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationAsRead,
    onMutate: async (id) => {
      // Optimistic Updates for unread badge
      const queryKeyPrefix = queryKeys.notifications.messages.all;
      await queryClient.cancelQueries({ queryKey: queryKeyPrefix });

      // Iterate through all infinite queries in cache matching the notifications key
      const activeQueries = queryClient.getQueriesData<import('@tanstack/react-query').InfiniteData<PaginatedResponse<NotificationMessage>>>({ 
        queryKey: queryKeyPrefix,
        exact: false 
      });

      activeQueries.forEach(([key, previousData]) => {
        if (previousData) {
          const newData = {
            ...previousData,
            pages: previousData.pages.map(page => ({
              ...page,
              results: page.results.map(notification => 
                notification.id === id ? { ...notification, is_read: true } : notification
              )
            }))
          };
          queryClient.setQueryData(key, newData);
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.messages.all });
    },
  });
}

export function useNotificationPreferences(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.notifications.preferences.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getNotificationPreferences({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useAnnouncements(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.notifications.announcements.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getAnnouncements({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}
