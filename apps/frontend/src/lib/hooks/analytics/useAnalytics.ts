import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getDashboardMetrics,
  getRevenueCharts,
  getPipelineCharts,
  getTaskCharts,
  getProjectCharts,
} from "@/lib/api/analytics";

// 5 minutes in milliseconds
const CHART_STALE_TIME = 5 * 60 * 1000;

export function useDashboardMetrics() {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard,
    queryFn: getDashboardMetrics,
    staleTime: CHART_STALE_TIME,
    refetchOnWindowFocus: true, // Background refetch on focus
  });
}

export function useRevenueCharts() {
  return useQuery({
    queryKey: queryKeys.analytics.charts.revenue,
    queryFn: getRevenueCharts,
    staleTime: CHART_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

export function usePipelineCharts() {
  return useQuery({
    queryKey: queryKeys.analytics.charts.pipeline,
    queryFn: getPipelineCharts,
    staleTime: CHART_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

export function useTaskCharts() {
  return useQuery({
    queryKey: queryKeys.analytics.charts.tasks,
    queryFn: getTaskCharts,
    staleTime: CHART_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

export function useProjectCharts() {
  return useQuery({
    queryKey: queryKeys.analytics.charts.projects,
    queryFn: getProjectCharts,
    staleTime: CHART_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook to prefetch all dashboard data, ensuring instant loads when navigating.
 */
export function usePrefetchDashboard() {
  const queryClient = useQueryClient();

  return async () => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.analytics.dashboard,
        queryFn: getDashboardMetrics,
        staleTime: CHART_STALE_TIME,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.analytics.charts.revenue,
        queryFn: getRevenueCharts,
        staleTime: CHART_STALE_TIME,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.analytics.charts.pipeline,
        queryFn: getPipelineCharts,
        staleTime: CHART_STALE_TIME,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.analytics.charts.tasks,
        queryFn: getTaskCharts,
        staleTime: CHART_STALE_TIME,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.analytics.charts.projects,
        queryFn: getProjectCharts,
        staleTime: CHART_STALE_TIME,
      }),
    ]);
  };
}

/**
 * Unified Facade for Analytics & Dashboard domain.
 */
export function useAnalytics() {
  return {
    useDashboardMetrics,
    charts: {
      useRevenue: useRevenueCharts,
      usePipeline: usePipelineCharts,
      useTasks: useTaskCharts,
      useProjects: useProjectCharts,
    },
    usePrefetchDashboard,
  };
}
