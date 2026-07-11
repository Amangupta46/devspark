import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { tokenManager } from './token-manager';
import { handleError } from './error-handler';

export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = await tokenManager.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const errorInterceptor = async (error: AxiosError) => {
  // Handle 401 retry logic here
  return handleError(error);
};
