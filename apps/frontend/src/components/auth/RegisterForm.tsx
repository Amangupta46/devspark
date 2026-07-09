"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, GitBranch, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { useAuth } from "@/providers/auth-provider";
import { PasswordInput } from "./PasswordInput";
import { SocialLoginButton } from "./SocialLoginButton";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type RegisterFormInputs = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setSubmitting(true);
    setRegisterError("");
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/");
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-3">
        <SocialLoginButton icon={GitBranch} label="GitHub" />
        <SocialLoginButton icon={Globe} label="Google" />
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[hsl(220,20%,9%)] px-3 text-xs text-neutral-600">
            or register with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <AnimatePresence>
          {registerError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {registerError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="group relative">
          <label className="mb-1.5 block text-xs font-medium tracking-wider text-neutral-500 uppercase">
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="John Doe"
            className={cn(
              "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-neutral-100 transition-all duration-300 outline-none placeholder:text-neutral-600 md:backdrop-blur-sm",
              errors.name
                ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 hover:border-white/20 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-500/20",
            )}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div className="group relative">
          <label className="mb-1.5 block text-xs font-medium tracking-wider text-neutral-500 uppercase">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="you@company.com"
            className={cn(
              "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-neutral-100 transition-all duration-300 outline-none placeholder:text-neutral-600 md:backdrop-blur-sm",
              errors.email
                ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 hover:border-white/20 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-500/20",
            )}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <PasswordInput
          {...register("password")}
          label="Password"
          error={errors.password?.message}
        />

        <PasswordInput
          {...register("confirmPassword")}
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        />

        <label className="mt-2 flex cursor-pointer items-start gap-3">
          <div className="relative mt-0.5">
            <input type="checkbox" className="peer sr-only" required />
            <div className="flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] transition-all duration-200 peer-checked:border-amber-400/60 peer-checked:bg-amber-400/15 peer-focus-visible:ring-2 peer-focus-visible:ring-amber-400/30">
              <motion.svg
                viewBox="0 0 10 8"
                className="h-3 w-3 text-amber-400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
              >
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </motion.svg>
            </div>
          </div>
          <span className="text-sm leading-tight text-neutral-400">
            I agree to the Terms of Service and Privacy Policy
          </span>
        </label>

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          className="group relative mt-2 flex h-13 w-full items-center justify-center overflow-hidden rounded-xl font-semibold text-neutral-950 transition-all duration-300 disabled:opacity-70"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 transition-all duration-500 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-amber-300" />
          <span className="relative z-10 flex items-center gap-2 text-base">
            {submitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Creating Account…
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </motion.button>
      </form>
    </>
  );
}
