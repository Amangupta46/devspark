import { apiClient } from "@/lib/api/client";
import { PaginatedResponse } from "@/types/api";
import { 
  ClientUser, Deliverable, ClientMessage, SatisfactionSurvey, 
  DigitalSignature, ClientDashboard 
} from "@/types/client";
import { PaginationParams } from "./crm";

// ----------------------------------------------------------------------------
// Client Portal
// ----------------------------------------------------------------------------

export async function getClientUsers(params?: PaginationParams): Promise<PaginatedResponse<ClientUser>> {
  const response = await apiClient.get<PaginatedResponse<ClientUser>>("/client_portal/users/", { params });
  return response.data;
}

export async function getDeliverables(params?: PaginationParams): Promise<PaginatedResponse<Deliverable>> {
  const response = await apiClient.get<PaginatedResponse<Deliverable>>("/client_portal/deliverables/", { params });
  return response.data;
}

export async function getClientMessages(params?: PaginationParams): Promise<PaginatedResponse<ClientMessage>> {
  const response = await apiClient.get<PaginatedResponse<ClientMessage>>("/client_portal/messages/", { params });
  return response.data;
}

export async function getSatisfactionSurveys(params?: PaginationParams): Promise<PaginatedResponse<SatisfactionSurvey>> {
  const response = await apiClient.get<PaginatedResponse<SatisfactionSurvey>>("/client_portal/surveys/", { params });
  return response.data;
}

export async function getDigitalSignatures(params?: PaginationParams): Promise<PaginatedResponse<DigitalSignature>> {
  const response = await apiClient.get<PaginatedResponse<DigitalSignature>>("/client_portal/signatures/", { params });
  return response.data;
}

export async function getClientDashboard(): Promise<ClientDashboard> {
  const response = await apiClient.get<ClientDashboard>("/client_portal/dashboard/");
  return response.data;
}
