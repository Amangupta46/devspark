import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { TokenManager } from '@/lib/auth/token-manager';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = TokenManager.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

export function requestLoggerInterceptor(config: InternalAxiosRequestConfig) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
}

export function responseLoggerInterceptor(response: AxiosResponse) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API RESPONSE] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
  }
  return response;
}

export async function errorResponseInterceptor(error: AxiosError, axiosInstance: AxiosInstance) {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = TokenManager.getRefreshToken();

    if (refreshToken) {
      try {
        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        TokenManager.setTokens(access, refreshToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`;
        }
        return axiosInstance(originalRequest);
      } catch {
        TokenManager.clearTokens();
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
    } else {
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
  }

  return Promise.reject(error);
}
