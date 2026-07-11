import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import { getContacts, getContact, createContact, updateContact, deleteContact, PaginationParams } from '@/lib/api/crm';
import { Contact } from '@/types/crm';
import { toast } from 'sonner';

export function useContacts(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.crm.contacts.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => {
      return getContacts({ ...filters, page: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      try {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get('page');
        return page ? parseInt(page, 10) : undefined;
      } catch {
        return undefined;
      }
    },
    initialPageParam: 1,
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: queryKeys.crm.contacts.detail(id),
    queryFn: () => getContact(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.contacts.all });
      toast.success('Contact created successfully');
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Contact> }) => updateContact(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.crm.contacts.detail(id) });
      const previousContact = queryClient.getQueryData<Contact>(queryKeys.crm.contacts.detail(id));
      if (previousContact) {
        queryClient.setQueryData<Contact>(queryKeys.crm.contacts.detail(id), {
          ...previousContact,
          ...data,
        });
      }
      return { previousContact };
    },
    onError: (err, variables, context) => {
      if (context?.previousContact) {
        queryClient.setQueryData(queryKeys.crm.contacts.detail(variables.id), context.previousContact);
      }
      toast.error('Failed to update contact');
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.contacts.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.contacts.all });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm.contacts.all });
      toast.success('Contact deleted successfully');
    },
  });
}
