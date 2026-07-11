import { apiClient } from "@/lib/api/client";
import { PaginatedResponse } from "@/types/api";
import { 
  Organization, TeamMember, Worklog, LeaveRequest, 
  CodeReview, Conversation, ManagerDashboard, DeveloperDashboard 
} from "@/types/team";
import { PaginationParams } from "./crm";

// ----------------------------------------------------------------------------
// Organizations & Members
// ----------------------------------------------------------------------------

export async function getOrganizations(params?: PaginationParams): Promise<PaginatedResponse<Organization>> {
  const response = await apiClient.get<PaginatedResponse<Organization>>("/team/organizations/", { params });
  return response.data;
}

export async function getTeamMembers(params?: PaginationParams): Promise<PaginatedResponse<TeamMember>> {
  const response = await apiClient.get<PaginatedResponse<TeamMember>>("/team/members/", { params });
  return response.data;
}

// ----------------------------------------------------------------------------
// Worklogs & Leaves
// ----------------------------------------------------------------------------

export async function getWorklogs(params?: PaginationParams): Promise<PaginatedResponse<Worklog>> {
  const response = await apiClient.get<PaginatedResponse<Worklog>>("/team/worklogs/", { params });
  return response.data;
}

export async function createWorklog(data: Partial<Worklog>): Promise<Worklog> {
  const response = await apiClient.post<Worklog>("/team/worklogs/", data);
  return response.data;
}

export async function getLeaveRequests(params?: PaginationParams): Promise<PaginatedResponse<LeaveRequest>> {
  const response = await apiClient.get<PaginatedResponse<LeaveRequest>>("/team/leaves/", { params });
  return response.data;
}

export async function createLeaveRequest(data: Partial<LeaveRequest>): Promise<LeaveRequest> {
  const response = await apiClient.post<LeaveRequest>("/team/leaves/", data);
  return response.data;
}

export async function updateLeaveRequest(id: string, data: Partial<LeaveRequest>): Promise<LeaveRequest> {
  const response = await apiClient.patch<LeaveRequest>(`/team/leaves/${id}/`, data);
  return response.data;
}

// ----------------------------------------------------------------------------
// Reviews & Conversations
// ----------------------------------------------------------------------------

export async function getCodeReviews(params?: PaginationParams): Promise<PaginatedResponse<CodeReview>> {
  const response = await apiClient.get<PaginatedResponse<CodeReview>>("/team/reviews/", { params });
  return response.data;
}

export async function getConversations(params?: PaginationParams): Promise<PaginatedResponse<Conversation>> {
  const response = await apiClient.get<PaginatedResponse<Conversation>>("/team/conversations/", { params });
  return response.data;
}

// ----------------------------------------------------------------------------
// Dashboards
// ----------------------------------------------------------------------------

export async function getManagerDashboard(): Promise<ManagerDashboard> {
  const response = await apiClient.get<ManagerDashboard>("/team/dashboard/manager/");
  return response.data;
}

export async function getDeveloperDashboard(): Promise<DeveloperDashboard> {
  const response = await apiClient.get<DeveloperDashboard>("/team/dashboard/developer/");
  return response.data;
}
