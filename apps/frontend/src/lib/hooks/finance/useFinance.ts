import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import {
  getInvoices, getPayments, createPayment,
  getEstimates, getExpenses, getSubscriptions
} from '@/lib/api/finance';
import { PaginationParams } from '@/lib/api/crm';
import { toast } from 'sonner';

export function useInvoices(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.finance.invoices.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getInvoices({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function usePayments(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.finance.payments.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getPayments({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.payments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.invoices.all });
      toast.success('Payment recorded successfully');
    },
  });
}

export function useEstimates(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.finance.estimates.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getEstimates({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useExpenses(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.finance.expenses.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getExpenses({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useSubscriptions(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.finance.subscriptions.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getSubscriptions({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

/**
 * Unified Facade for Finance domain.
 */
export function useFinance() {
  return {
    invoices: {
      useList: useInvoices,
    },
    payments: {
      useList: usePayments,
      useCreate: useCreatePayment,
    },
    estimates: {
      useList: useEstimates,
    },
    expenses: {
      useList: useExpenses,
    },
    subscriptions: {
      useList: useSubscriptions,
    },
  };
}
