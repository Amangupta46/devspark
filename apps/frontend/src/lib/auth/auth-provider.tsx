"use client";

import React, { createContext, useContext, useEffect } from "react";
import { User, LoginRequest, RegisterRequest } from "@/types/auth";
import { useProfileQuery } from "./queries";
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
} from "./mutations";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<unknown>;
  register: (data: RegisterRequest) => Promise<unknown>;
  logout: () => Promise<unknown>;
  forgotPassword: (email: string) => Promise<unknown>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data: user, isLoading: isProfileLoading } = useProfileQuery();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();
  const forgotPasswordMutation = useForgotPasswordMutation();

  useEffect(() => {
    const handleUnauthorized = () => {
      queryClient.setQueryData(queryKeys.auth.me, null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [queryClient]);

  const value = {
    user: user || null,
    isAuthenticated: !!user,
    isLoading: isProfileLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
