"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title={
        <>
          Recover{" "}
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            Access
          </span>
        </>
      }
      subtitle="Enter your email address and we'll send you a link to reset your password."
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Reset password</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Remember your password?{" "}
          <a
            href="/login"
            className="font-semibold text-amber-400 transition-colors hover:text-amber-300"
          >
            Back to sign in
          </a>
        </p>
      </div>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
