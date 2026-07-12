import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { getLeads, getLead, createLead, updateLead, deleteLead, LeadFilters } from "@/lib/api/crm";
import { Lead } from "@/types/crm";
import { toast } from "sonner";

export function useLeads(filters: LeadFilters = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.crm.leads.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => {
      return getLeads({ ...filters, page: pageParam });
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

export function useLead(id: string) {
  return useQuery({
    queryKey: queryKeys.crm.leads.detail(id),
    queryFn: () => getLead(id),
    enabled: !!id,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.leads.all });
      toast.success("Lead created successfully");
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lead> }) => updateLead(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.crm.leads.detail(id) });
      const previousLead = queryClient.getQueryData<Lead>(queryKeys.crm.leads.detail(id));
      if (previousLead) {
        queryClient.setQueryData<Lead>(queryKeys.crm.leads.detail(id), {
          ...previousLead,
          ...data,
        });
      }
      return { previousLead };
    },
    onError: (err, variables, context) => {
      if (context?.previousLead) {
        queryClient.setQueryData(queryKeys.crm.leads.detail(variables.id), context.previousLead);
      }
      toast.error("Failed to update lead");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.leads.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.leads.all });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.leads.all });
      toast.success("Lead deleted successfully");
    },
  });
}
