import { apiClient } from "@/lib/api/client";
import { 
  RevenueChartData, PipelineChartData, TaskChartData, 
  ProjectChartData, GlobalDashboardMetrics 
} from "@/types/analytics";

export async function getDashboardMetrics(): Promise<GlobalDashboardMetrics> {
  const response = await apiClient.get<GlobalDashboardMetrics>("/analytics/dashboard/");
  return response.data;
}

export async function getRevenueCharts(): Promise<RevenueChartData> {
  const response = await apiClient.get<RevenueChartData>("/analytics/revenue-charts/");
  return response.data;
}

export async function getPipelineCharts(): Promise<PipelineChartData> {
  const response = await apiClient.get<PipelineChartData>("/analytics/pipeline-charts/");
  return response.data;
}

export async function getTaskCharts(): Promise<TaskChartData> {
  const response = await apiClient.get<TaskChartData>("/analytics/task-charts/");
  return response.data;
}

export async function getProjectCharts(): Promise<ProjectChartData> {
  const response = await apiClient.get<ProjectChartData>("/analytics/project-charts/");
  return response.data;
}
