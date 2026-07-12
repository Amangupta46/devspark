import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  PaginationParams,
} from "@/lib/api/crm";
import { Company } from "@/types/crm";
import { toast } from "sonner";

export function useCompanies(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.crm.companies.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => {
      return getCompanies({ ...filters, page: pageParam });
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

export function useCompany(id: string) {
  return useQuery({
    queryKey: queryKeys.crm.companies.detail(id),
    queryFn: () => getCompany(id),
    enabled: !!id,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.companies.all });
      toast.success("Company created successfully");
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Company> }) => updateCompany(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.crm.companies.detail(id) });
      const previousCompany = queryClient.getQueryData<Company>(queryKeys.crm.companies.detail(id));
      if (previousCompany) {
        queryClient.setQueryData<Company>(queryKeys.crm.companies.detail(id), {
          ...previousCompany,
          ...data,
        });
      }
      return { previousCompany };
    },
    onError: (err, variables, context) => {
      if (context?.previousCompany) {
        queryClient.setQueryData(
          queryKeys.crm.companies.detail(variables.id),
          context.previousCompany,
        );
      }
      toast.error("Failed to update company");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.companies.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.companies.all });
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.companies.all });
      toast.success("Company deleted successfully");
    },
  });
}
