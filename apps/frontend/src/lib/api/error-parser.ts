import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';

/**
 * Parses generic Axios errors into our standardized ApiError DTO.
 */
export function parseApiError(error: unknown): ApiError {
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<Record<string, unknown>>;
    const responseData = axiosError.response?.data;

    // Handle Django REST Framework validation errors (which are usually objects with field keys)
    if (axiosError.response?.status === 400 && responseData && typeof responseData === 'object') {
      const details: Record<string, string[]> = {};
      
      // If DRF returns a generic non_field_errors array
      if (responseData.non_field_errors) {
        details['non_field_errors'] = Array.isArray(responseData.non_field_errors) 
          ? responseData.non_field_errors 
          : [responseData.non_field_errors];
      }

      // Map other field-specific errors
      for (const [key, val] of Object.entries(responseData)) {
        if (key !== 'non_field_errors') {
          details[key] = Array.isArray(val) ? val : [String(val)];
        }
      }

      return {
        message: 'Validation Error',
        code: 'VALIDATION_ERROR',
        details
      };
    }

    return {
      message: (typeof responseData?.detail === 'string' ? responseData.detail : undefined) || axiosError.message || 'An unexpected error occurred.',
      code: typeof responseData?.code === 'string' ? responseData.code : axiosError.code,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'An unknown error occurred.' };
}
