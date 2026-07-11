import axios from 'axios';
import { 
  API_URL, 
  authRequestInterceptor, 
  requestLoggerInterceptor, 
  responseLoggerInterceptor, 
  errorResponseInterceptor 
} from './interceptors';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s default timeout
});

apiClient.interceptors.request.use(authRequestInterceptor);
apiClient.interceptors.request.use(requestLoggerInterceptor);

apiClient.interceptors.response.use(
  responseLoggerInterceptor,
  (error) => errorResponseInterceptor(error, apiClient)
);
