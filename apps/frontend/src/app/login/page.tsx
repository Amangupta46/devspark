"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout
      title={
        <>
          Welcome back to{" "}
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            DevSpark
          </span>
        </>
      }
      subtitle="Your command center for premium software development. Track projects, collaborate with your team, and ship faster."
    >
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <span className="font-mono text-2xl font-bold tracking-tight text-white">
            dev<span className="text-amber-400">spark</span>
          </span>
        </Link>
        <h2 className="mt-4 text-xl font-bold text-white">Sign in to your account</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-amber-400 transition-colors hover:text-amber-300"
          >
            Sign up free
          </Link>
        </p>
      </div>
      <LoginForm />
    </AuthLayout>
  );
}
