import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  QuoteFilters,
  getQuoteDashboard,
  getCatalog,
  getProposals,
} from "@/lib/api/quotes";
import { Quote } from "@/types/quotes";
import { PaginationParams } from "@/lib/api/crm";
import { toast } from "sonner";

export function useQuotes(filters: QuoteFilters = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.quotes.quotes.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => {
      return getQuotes({ ...filters, page: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      try {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page ? parseInt(page, 10) : undefined;
      } catch {
        return undefined;
      }
    },
    initialPageParam: 1,
  });
}

export function useQuote(id: string) {
  return useQuery({
    queryKey: queryKeys.quotes.quotes.detail(id),
    queryFn: () => getQuote(id),
    enabled: !!id,
  });
}

export function useCreateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes.quotes.all });
      toast.success("Quote created successfully");
    },
  });
}

export function useUpdateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Quote> }) => updateQuote(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.quotes.quotes.detail(id) });
      const previousQuote = queryClient.getQueryData<Quote>(queryKeys.quotes.quotes.detail(id));
      if (previousQuote) {
        queryClient.setQueryData<Quote>(queryKeys.quotes.quotes.detail(id), {
          ...previousQuote,
          ...data,
        });
      }
      return { previousQuote };
    },
    onError: (err, variables, context) => {
      if (context?.previousQuote) {
        queryClient.setQueryData(
          queryKeys.quotes.quotes.detail(variables.id),
          context.previousQuote,
        );
      }
      toast.error("Failed to update quote");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes.quotes.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes.quotes.all });
    },
  });
}

export function useDeleteQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes.quotes.all });
      toast.success("Quote deleted successfully");
    },
  });
}

// ----------------------------------------------------------------------------
// Catalog & Proposals & Facade
// ----------------------------------------------------------------------------

export function useCatalog(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.quotes.catalog.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => {
      return getCatalog({ ...filters, page: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useProposals(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.quotes.proposals.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => {
      return getProposals({ ...filters, page: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useQuoteDashboardQuery() {
  return useQuery({
    queryKey: queryKeys.quotes.dashboard,
    queryFn: getQuoteDashboard,
  });
}

/**
 * Unified Facade for Quotes domain.
 */
export function useQuotesModule() {
  return {
    dashboard: useQuoteDashboardQuery,
    quotes: {
      useList: useQuotes,
      useCreate: useCreateQuote,
      useUpdate: useUpdateQuote,
      useDelete: useDeleteQuote,
    },
    catalog: {
      useList: useCatalog,
    },
    proposals: {
      useList: useProposals,
    },
  };
}
