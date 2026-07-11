import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query';
import { toast } from 'sonner';
import { parseApiError } from '@/lib/api/error-parser';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      // Global query error handling could go here, but usually mutations are more critical to toast
      console.error('Query Error:', error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const parsedError = parseApiError(error);
      toast.error(parsedError.message, {
        description: parsedError.details ? 'Please check the form for validation errors.' : undefined,
      });
    },
  }),
});
