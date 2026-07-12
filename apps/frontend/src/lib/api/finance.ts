import { apiClient } from "@/lib/api/client";
import { PaginatedResponse } from "@/types/api";
import { Invoice, Payment, Estimate, Expense, Subscription } from "@/types/finance";
import { PaginationParams } from "./crm";

export async function getInvoices(params?: PaginationParams): Promise<PaginatedResponse<Invoice>> {
  const response = await apiClient.get<PaginatedResponse<Invoice>>("/finance/invoices/", {
    params,
  });
  return response.data;
}

export async function getPayments(params?: PaginationParams): Promise<PaginatedResponse<Payment>> {
  const response = await apiClient.get<PaginatedResponse<Payment>>("/finance/payments/", {
    params,
  });
  return response.data;
}

export async function createPayment(data: Partial<Payment>): Promise<Payment> {
  const response = await apiClient.post<Payment>("/finance/payments/", data);
  return response.data;
}

export async function getEstimates(
  params?: PaginationParams,
): Promise<PaginatedResponse<Estimate>> {
  const response = await apiClient.get<PaginatedResponse<Estimate>>("/finance/estimates/", {
    params,
  });
  return response.data;
}

export async function getExpenses(params?: PaginationParams): Promise<PaginatedResponse<Expense>> {
  const response = await apiClient.get<PaginatedResponse<Expense>>("/finance/expenses/", {
    params,
  });
  return response.data;
}

export async function getSubscriptions(
  params?: PaginationParams,
): Promise<PaginatedResponse<Subscription>> {
  const response = await apiClient.get<PaginatedResponse<Subscription>>("/finance/subscriptions/", {
    params,
  });
  return response.data;
}
