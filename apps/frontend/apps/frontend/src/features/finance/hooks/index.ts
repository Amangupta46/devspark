// Placeholder React Query Hook
// import { useQuery } from '@tanstack/react-query';

export function useFinance() {
  /*
  return useQuery({
    queryKey: ['finance'],
    queryFn: financeService.getAll
  });
  */
  return { data: [], isLoading: false };
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { financeKeys } from '../constants';

export function useCreateFinance() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useUpdateFinance() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useDeleteFinance() {
  return { mutate: (id: string) => {}, isLoading: false };
}
