import { apiClient } from "@/lib/api/client";
import { PaginatedResponse } from "@/types/api";
import { Project, ProjectTask, TimeLog, ProjectDashboard } from "@/types/projects";
import { PaginationParams } from "./crm";

export interface ProjectFilters extends PaginationParams {
  status?: string;
  client?: string;
  manager?: string;
}

export interface TaskFilters extends PaginationParams {
  status?: string;
  assignee?: string;
  project?: string;
}

// ----------------------------------------------------------------------------
// Projects
// ----------------------------------------------------------------------------

export async function getProjects(params?: ProjectFilters): Promise<PaginatedResponse<Project>> {
  const response = await apiClient.get<PaginatedResponse<Project>>("/projects/projects/", { params });
  return response.data;
}

export async function getProject(id: string): Promise<Project> {
  const response = await apiClient.get<Project>(`/projects/projects/${id}/`);
  return response.data;
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const response = await apiClient.post<Project>("/projects/projects/", data);
  return response.data;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  const response = await apiClient.patch<Project>(`/projects/projects/${id}/`, data);
  return response.data;
}

export async function deleteProject(id: string): Promise<void> {
  await apiClient.delete(`/projects/projects/${id}/`);
}

// ----------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------

export async function getTasks(params?: TaskFilters): Promise<PaginatedResponse<ProjectTask>> {
  const response = await apiClient.get<PaginatedResponse<ProjectTask>>("/projects/tasks/", { params });
  return response.data;
}

export async function getTask(id: string): Promise<ProjectTask> {
  const response = await apiClient.get<ProjectTask>(`/projects/tasks/${id}/`);
  return response.data;
}

export async function createTask(data: Partial<ProjectTask>): Promise<ProjectTask> {
  const response = await apiClient.post<ProjectTask>("/projects/tasks/", data);
  return response.data;
}

export async function updateTask(id: string, data: Partial<ProjectTask>): Promise<ProjectTask> {
  const response = await apiClient.patch<ProjectTask>(`/projects/tasks/${id}/`, data);
  return response.data;
}

export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/projects/tasks/${id}/`);
}

// ----------------------------------------------------------------------------
// TimeLogs
// ----------------------------------------------------------------------------

export async function getTimeLogs(params?: PaginationParams): Promise<PaginatedResponse<TimeLog>> {
  const response = await apiClient.get<PaginatedResponse<TimeLog>>("/projects/timelogs/", { params });
  return response.data;
}

export async function createTimeLog(data: Partial<TimeLog>): Promise<TimeLog> {
  const response = await apiClient.post<TimeLog>("/projects/timelogs/", data);
  return response.data;
}

// ----------------------------------------------------------------------------
// Dashboard
// ----------------------------------------------------------------------------

export async function getProjectDashboard(): Promise<ProjectDashboard> {
  const response = await apiClient.get<ProjectDashboard>("/projects/dashboard/");
  return response.data;
}
