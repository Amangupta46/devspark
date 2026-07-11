// Placeholder React Query Hook
// import { useQuery } from '@tanstack/react-query';

export function useTeam() {
  /*
  return useQuery({
    queryKey: ['team'],
    queryFn: teamService.getAll
  });
  */
  return { data: [], isLoading: false };
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { teamKeys } from '../constants';

export function useCreateTeam() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useUpdateTeam() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useDeleteTeam() {
  return { mutate: (id: string) => {}, isLoading: false };
}
