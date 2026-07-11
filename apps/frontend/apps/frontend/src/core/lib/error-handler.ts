import { AxiosError } from 'axios';

export const handleError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 401: console.error('Unauthorized'); break;
      case 403: console.error('Forbidden'); break;
      case 404: console.error('Not Found'); break;
      case 422: console.error('Validation Error'); break;
      case 429: console.error('Rate Limit Exceeded'); break;
      case 500: console.error('Server Error'); break;
    }
  }
  return Promise.reject(error);
};
