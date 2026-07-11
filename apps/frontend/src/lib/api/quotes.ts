import { apiClient } from "@/lib/api/client";
import { PaginatedResponse } from "@/types/api";
import { ServiceCatalog, Quote, QuoteItem, Proposal, QuoteDashboard } from "@/types/quotes";
import { PaginationParams } from "./crm";

export interface QuoteFilters extends PaginationParams {
  status?: string;
}

// ----------------------------------------------------------------------------
// Catalog
// ----------------------------------------------------------------------------

export async function getCatalog(params?: PaginationParams): Promise<PaginatedResponse<ServiceCatalog>> {
  const response = await apiClient.get<PaginatedResponse<ServiceCatalog>>("/quotes/catalog/", { params });
  return response.data;
}

export async function createCatalogItem(data: Partial<ServiceCatalog>): Promise<ServiceCatalog> {
  const response = await apiClient.post<ServiceCatalog>("/quotes/catalog/", data);
  return response.data;
}

// ----------------------------------------------------------------------------
// Quotes
// ----------------------------------------------------------------------------

export async function getQuotes(params?: QuoteFilters): Promise<PaginatedResponse<Quote>> {
  const response = await apiClient.get<PaginatedResponse<Quote>>("/quotes/quotes/", { params });
  return response.data;
}

export async function getQuote(id: string): Promise<Quote> {
  const response = await apiClient.get<Quote>(`/quotes/quotes/${id}/`);
  return response.data;
}

export async function createQuote(data: Partial<Quote>): Promise<Quote> {
  const response = await apiClient.post<Quote>("/quotes/quotes/", data);
  return response.data;
}

export async function updateQuote(id: string, data: Partial<Quote>): Promise<Quote> {
  const response = await apiClient.patch<Quote>(`/quotes/quotes/${id}/`, data);
  return response.data;
}

export async function deleteQuote(id: string): Promise<void> {
  await apiClient.delete(`/quotes/quotes/${id}/`);
}

// ----------------------------------------------------------------------------
// Quote Items
// ----------------------------------------------------------------------------

export async function addQuoteItem(data: Partial<QuoteItem>): Promise<QuoteItem> {
  const response = await apiClient.post<QuoteItem>("/quotes/items/", data);
  return response.data;
}

export async function updateQuoteItem(id: string, data: Partial<QuoteItem>): Promise<QuoteItem> {
  const response = await apiClient.patch<QuoteItem>(`/quotes/items/${id}/`, data);
  return response.data;
}

export async function removeQuoteItem(id: string): Promise<void> {
  await apiClient.delete(`/quotes/items/${id}/`);
}

// ----------------------------------------------------------------------------
// Proposals
// ----------------------------------------------------------------------------

export async function getProposals(params?: PaginationParams): Promise<PaginatedResponse<Proposal>> {
  const response = await apiClient.get<PaginatedResponse<Proposal>>("/quotes/proposals/", { params });
  return response.data;
}

export async function generateProposal(quoteId: string): Promise<Proposal> {
  const response = await apiClient.post<Proposal>("/quotes/proposals/", { quote: quoteId });
  return response.data;
}

// ----------------------------------------------------------------------------
// Dashboard
// ----------------------------------------------------------------------------

export async function getQuoteDashboard(): Promise<QuoteDashboard> {
  const response = await apiClient.get<QuoteDashboard>("/quotes/dashboard/");
  return response.data;
}
