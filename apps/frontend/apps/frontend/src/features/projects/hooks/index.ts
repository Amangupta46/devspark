// Placeholder React Query Hook
// import { useQuery } from '@tanstack/react-query';

export function useProjects() {
  /*
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getAll
  });
  */
  return { data: [], isLoading: false };
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { projectsKeys } from '../constants';

export function useCreateProjects() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useUpdateProjects() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useDeleteProjects() {
  return { mutate: (id: string) => {}, isLoading: false };
}
