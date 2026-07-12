import { User, ApiError } from "./api";
export type { User, ApiError };
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  company_name: string;
}

export interface LoginResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;
}
