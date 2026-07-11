import { apiClient } from "@/lib/api/client";
import { PaginatedResponse } from "@/types/api";
import { Company, Contact, Lead, CRMDashboard } from "@/types/crm";

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  ordering?: string;
}

export interface LeadFilters extends PaginationParams {
  status?: string;
}

// ----------------------------------------------------------------------------
// Companies
// ----------------------------------------------------------------------------

export async function getCompanies(params?: PaginationParams): Promise<PaginatedResponse<Company>> {
  const response = await apiClient.get<PaginatedResponse<Company>>("/crm/companies/", { params });
  return response.data;
}

export async function getCompany(id: string): Promise<Company> {
  const response = await apiClient.get<Company>(`/crm/companies/${id}/`);
  return response.data;
}

export async function createCompany(data: Partial<Company>): Promise<Company> {
  const response = await apiClient.post<Company>("/crm/companies/", data);
  return response.data;
}

export async function updateCompany(id: string, data: Partial<Company>): Promise<Company> {
  const response = await apiClient.patch<Company>(`/crm/companies/${id}/`, data);
  return response.data;
}

export async function deleteCompany(id: string): Promise<void> {
  await apiClient.delete(`/crm/companies/${id}/`);
}

// ----------------------------------------------------------------------------
// Contacts
// ----------------------------------------------------------------------------

export async function getContacts(params?: PaginationParams): Promise<PaginatedResponse<Contact>> {
  const response = await apiClient.get<PaginatedResponse<Contact>>("/crm/contacts/", { params });
  return response.data;
}

export async function getContact(id: string): Promise<Contact> {
  const response = await apiClient.get<Contact>(`/crm/contacts/${id}/`);
  return response.data;
}

export async function createContact(data: Partial<Contact>): Promise<Contact> {
  const response = await apiClient.post<Contact>("/crm/contacts/", data);
  return response.data;
}

export async function updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
  const response = await apiClient.patch<Contact>(`/crm/contacts/${id}/`, data);
  return response.data;
}

export async function deleteContact(id: string): Promise<void> {
  await apiClient.delete(`/crm/contacts/${id}/`);
}

// ----------------------------------------------------------------------------
// Leads
// ----------------------------------------------------------------------------

export async function getLeads(params?: LeadFilters): Promise<PaginatedResponse<Lead>> {
  const response = await apiClient.get<PaginatedResponse<Lead>>("/crm/leads/", { params });
  return response.data;
}

export async function getLead(id: string): Promise<Lead> {
  const response = await apiClient.get<Lead>(`/crm/leads/${id}/`);
  return response.data;
}

export async function createLead(data: Partial<Lead>): Promise<Lead> {
  const response = await apiClient.post<Lead>("/crm/leads/", data);
  return response.data;
}

export async function updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
  const response = await apiClient.patch<Lead>(`/crm/leads/${id}/`, data);
  return response.data;
}

export async function deleteLead(id: string): Promise<void> {
  await apiClient.delete(`/crm/leads/${id}/`);
}

// ----------------------------------------------------------------------------
// Dashboard
// ----------------------------------------------------------------------------

export async function getCRMDashboard(): Promise<CRMDashboard> {
  const response = await apiClient.get<CRMDashboard>("/crm/dashboard/");
  return response.data;
}
