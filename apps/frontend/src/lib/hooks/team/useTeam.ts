import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import {
  getTeamMembers, getWorklogs, createWorklog,
  getLeaveRequests, createLeaveRequest, updateLeaveRequest,
  getManagerDashboard, getDeveloperDashboard
} from '@/lib/api/team';
import { PaginationParams } from '@/lib/api/crm';
import { LeaveRequest } from '@/types/team';
import { toast } from 'sonner';

export function useTeamMembers(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.team.members.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getTeamMembers({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

// ----------------------------------------------------------------------------
// Worklogs
// ----------------------------------------------------------------------------

export function useWorklogs(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.team.worklogs.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getWorklogs({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useCreateWorklog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorklog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.team.worklogs.all });
      toast.success('Worklog saved');
    },
  });
}

// ----------------------------------------------------------------------------
// Leaves
// ----------------------------------------------------------------------------

export function useLeaveRequests(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.team.leaves.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getLeaveRequests({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useCreateLeaveRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLeaveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.team.leaves.all });
      toast.success('Leave request submitted');
    },
  });
}

export function useUpdateLeaveRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LeaveRequest> }) => updateLeaveRequest(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.team.leaves.detail(id) });
      const previous = queryClient.getQueryData<LeaveRequest>(queryKeys.team.leaves.detail(id));
      if (previous) {
        queryClient.setQueryData<LeaveRequest>(queryKeys.team.leaves.detail(id), { ...previous, ...data });
      }
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.team.leaves.detail(variables.id), context.previous);
      }
      toast.error('Failed to update leave request');
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.team.leaves.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.team.leaves.all });
    },
  });
}

// ----------------------------------------------------------------------------
// Dashboards
// ----------------------------------------------------------------------------

export function useManagerDashboardQuery() {
  return useQuery({
    queryKey: queryKeys.team.managerDashboard,
    queryFn: getManagerDashboard,
  });
}

export function useDeveloperDashboardQuery() {
  return useQuery({
    queryKey: queryKeys.team.developerDashboard,
    queryFn: getDeveloperDashboard,
  });
}

/**
 * Unified Facade for Team domain.
 */
export function useTeamModule() {
  return {
    managerDashboard: useManagerDashboardQuery,
    developerDashboard: useDeveloperDashboardQuery,
    members: {
      useList: useTeamMembers,
    },
    worklogs: {
      useList: useWorklogs,
      useCreate: useCreateWorklog,
    },
    leaves: {
      useList: useLeaveRequests,
      useCreate: useCreateLeaveRequest,
      useUpdate: useUpdateLeaveRequest,
    },
  };
}
