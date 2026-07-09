"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title={
        <>
          Create your{" "}
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            Account
          </span>
        </>
      }
      subtitle="Join the premium software development platform. Start shipping faster with DevSpark."
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Create an account</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-amber-400 transition-colors hover:text-amber-300"
          >
            Sign in
          </a>
        </p>
      </div>
      <RegisterForm />
    </AuthLayout>
  );
}
