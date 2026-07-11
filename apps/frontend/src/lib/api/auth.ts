import { LoginRequest, LoginResponse, RegisterRequest, User } from "@/types/auth";
import { apiClient } from "@/lib/api/client";
import { TokenManager } from "@/lib/auth/token-manager";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/users/login/", data);
  TokenManager.setTokens(response.data.access, response.data.refresh);
  const user = await getCurrentUser();
  return { ...response.data, user };
}

export async function registerUser(data: RegisterRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/users/register/", data);
  // Registration usually returns tokens or we log them in directly
  // Adjust based on the actual backend response, which from views.py returns { id, email }
  // Wait, backend RegisterView returns 201 with ProfileSerializer. So we don't set tokens here if it doesn't return them.
  return response.data as unknown as LoginResponse;
}

export async function logoutUser(): Promise<void> {
  const refresh = TokenManager.getRefreshToken();
  if (refresh) {
    try {
      await apiClient.post("/users/logout/", { refresh });
    } catch {
      // ignore
    }
  }
  TokenManager.clearTokens();
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<User>("/users/profile/");
  return response.data;
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  const response = await apiClient.patch<User>("/users/profile/", data);
  return response.data;
}

export async function changePassword(data: Record<string, unknown>): Promise<void> {
  await apiClient.post("/users/change-password/", data);
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post("/users/password/reset/", { email });
}

export async function resetPassword(data: Record<string, unknown>): Promise<void> {
  await apiClient.post("/users/password/reset/confirm/", data);
}

export async function verifyEmail(data: Record<string, unknown>): Promise<void> {
  await apiClient.post("/users/registration/verify-email/", data);
}

export async function resendVerification(email: string): Promise<void> {
  await apiClient.post("/users/registration/resend-email/", { email });
}

export async function googleLogin(data: Record<string, unknown>): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/users/google/", data);
  TokenManager.setTokens(response.data.access, response.data.refresh);
  const user = await getCurrentUser();
  return { ...response.data, user };
}
