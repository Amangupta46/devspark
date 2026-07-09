import { LoginRequest, LoginResponse, RegisterRequest, User } from "@/types/auth";

/**
 * Placeholder Error to ensure backend integration is explicitly handled later.
 */
class BackendNotConnectedError extends Error {
  constructor(message: string = "Backend API not connected") {
    super(message);
    this.name = "BackendNotConnectedError";
  }
}

/**
 * [POST] /api/auth/login
 * Logs in a user with email and password.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loginUser(_data: LoginRequest): Promise<LoginResponse> {
  // TODO: Replace with real API call
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error("Invalid credentials");
  // return response.json();

  // Placeholder simulating network delay and then throwing explicitly
  await new Promise((resolve) => setTimeout(resolve, 800));
  throw new BackendNotConnectedError(
    "Backend API not connected. POST /api/auth/login is required.",
  );
}

/**
 * [POST] /api/auth/register
 * Registers a new user.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function registerUser(_data: RegisterRequest): Promise<LoginResponse> {
  // TODO: Replace with real API call
  // const response = await fetch('/api/auth/register', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error("Registration failed");
  // return response.json();

  await new Promise((resolve) => setTimeout(resolve, 800));
  throw new BackendNotConnectedError(
    "Backend API not connected. POST /api/auth/register is required.",
  );
}

/**
 * [POST] /api/auth/logout
 * Logs out the current user and clears session cookies/tokens.
 */
export async function logoutUser(): Promise<void> {
  // TODO: Replace with real API call
  // await fetch('/api/auth/logout', { method: 'POST' });

  await new Promise((resolve) => setTimeout(resolve, 300));
  throw new BackendNotConnectedError(
    "Backend API not connected. POST /api/auth/logout is required.",
  );
}

/**
 * [GET] /api/auth/me
 * Retrieves the currently authenticated user session.
 */
export async function getCurrentUser(): Promise<User> {
  // TODO: Replace with real API call
  // const response = await fetch('/api/auth/me', { method: 'GET' });
  // if (!response.ok) throw new Error("Unauthorized");
  // return response.json();

  await new Promise((resolve) => setTimeout(resolve, 300));
  throw new BackendNotConnectedError("Backend API not connected. GET /api/auth/me is required.");
}

/**
 * [POST] /api/auth/forgot-password
 * Sends a password reset email.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function forgotPassword(_email: string): Promise<void> {
  // TODO: Replace with real API call
  // await fetch('/api/auth/forgot-password', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email }),
  // });

  await new Promise((resolve) => setTimeout(resolve, 800));
  throw new BackendNotConnectedError(
    "Backend API not connected. POST /api/auth/forgot-password is required.",
  );
}
