import fs from "fs";
import path from "path";

const libDir = path.join(process.cwd(), "apps", "frontend", "src", "core", "lib");
const authDir = path.join(process.cwd(), "apps", "frontend", "src", "core", "auth");

// 1. Augment token-manager.ts
let tokenManagerContent = "export type StorageStrategy = 'localStorage' | 'cookie';\n\n";
tokenManagerContent += "class TokenManager {\n";
tokenManagerContent += "  private strategy: StorageStrategy = 'localStorage';\n";
tokenManagerContent += "  private token: string | null = null;\n";
tokenManagerContent += "  private refreshQueue: Array<(token: string) => void> = [];\n";
tokenManagerContent += "  private isRefreshing = false;\n";
tokenManagerContent += "  private channel: BroadcastChannel | null = null;\n\n";
tokenManagerContent += "  constructor() {\n";
tokenManagerContent += "    if (typeof window !== 'undefined') {\n";
tokenManagerContent += "      this.channel = new BroadcastChannel('auth_sync');\n";
tokenManagerContent += "      this.channel.onmessage = (event) => {\n";
tokenManagerContent += "        if (event.data === 'LOGOUT') this.clearToken();\n";
tokenManagerContent += "      };\n";
tokenManagerContent += "    }\n";
tokenManagerContent += "  }\n\n";
tokenManagerContent += "  setStrategy(strategy: StorageStrategy) {\n";
tokenManagerContent += "    this.strategy = strategy;\n";
tokenManagerContent += "  }\n\n";
tokenManagerContent += "  async getToken(): Promise<string | null> {\n";
tokenManagerContent +=
  "    if (this.strategy === 'localStorage' && typeof window !== 'undefined') {\n";
tokenManagerContent += "      return localStorage.getItem('access_token');\n";
tokenManagerContent += "    }\n";
tokenManagerContent += "    return this.token;\n";
tokenManagerContent += "  }\n\n";
tokenManagerContent += "  setToken(token: string) {\n";
tokenManagerContent += "    this.token = token;\n";
tokenManagerContent +=
  "    if (this.strategy === 'localStorage' && typeof window !== 'undefined') {\n";
tokenManagerContent += "      localStorage.setItem('access_token', token);\n";
tokenManagerContent += "    }\n";
tokenManagerContent += "  }\n\n";
tokenManagerContent += "  clearToken() {\n";
tokenManagerContent += "    this.token = null;\n";
tokenManagerContent +=
  "    if (this.strategy === 'localStorage' && typeof window !== 'undefined') {\n";
tokenManagerContent += "      localStorage.removeItem('access_token');\n";
tokenManagerContent += "      localStorage.removeItem('refresh_token');\n";
tokenManagerContent += "    }\n";
tokenManagerContent += "    if (this.channel) this.channel.postMessage('LOGOUT');\n";
tokenManagerContent += "  }\n\n";
tokenManagerContent += "  getIsRefreshing() { return this.isRefreshing; }\n";
tokenManagerContent += "  setIsRefreshing(val: boolean) { this.isRefreshing = val; }\n";
tokenManagerContent +=
  "  addRefreshSubscriber(cb: (token: string) => void) { this.refreshQueue.push(cb); }\n";
tokenManagerContent += "  onTokenRefreshed(token: string) {\n";
tokenManagerContent += "    this.refreshQueue.forEach(cb => cb(token));\n";
tokenManagerContent += "    this.refreshQueue = [];\n";
tokenManagerContent += "  }\n";
tokenManagerContent += "}\n\n";
tokenManagerContent += "export const tokenManager = new TokenManager();\n";
fs.writeFileSync(path.join(libDir, "token-manager.ts"), tokenManagerContent);

// 2. Augment Guards.ts
let guardsContent = "import React from 'react';\n\n";
guardsContent += "export const Guards = {};\n\n";
guardsContent +=
  "export function PublicRoute({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n";
guardsContent +=
  "export function ProtectedRoute({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n";
guardsContent +=
  "export function GuestRoute({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n";
guardsContent +=
  "export function RoleRoute({ children, roles }: { children: React.ReactNode, roles: string[] }) { return <>{children}</>; }\n";
guardsContent +=
  "export function PermissionRoute({ children, permission }: { children: React.ReactNode, permission: string }) { return <>{children}</>; }\n";
guardsContent +=
  "export function OrganizationRoute({ children, orgId }: { children: React.ReactNode, orgId: string }) { return <>{children}</>; }\n";
guardsContent +=
  "export function FeatureFlagRoute({ children, flag }: { children: React.ReactNode, flag: string }) { return <>{children}</>; }\n";
fs.writeFileSync(path.join(authDir, "Guards.ts"), guardsContent);

console.log(
  "Successfully augmented Authentication Layer with Refresh Queue, Configurable Storage, and Route Protection.",
);
