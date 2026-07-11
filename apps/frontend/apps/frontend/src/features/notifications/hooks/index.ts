// Placeholder React Query Hook
// import { useQuery } from '@tanstack/react-query';

export function useNotifications() {
  /*
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsService.getAll
  });
  */
  return { data: [], isLoading: false };
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { notificationsKeys } from '../constants';

export function useCreateNotifications() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useUpdateNotifications() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useDeleteNotifications() {
  return { mutate: (id: string) => {}, isLoading: false };
}
