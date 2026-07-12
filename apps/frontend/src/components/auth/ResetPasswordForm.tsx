"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseApiError } from "@/lib/api/error-parser";

import { useResetPasswordMutation } from "@/lib/auth/mutations";
import { PasswordInput } from "./PasswordInput";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";
  const uid = searchParams?.get("uid") || "";

  const resetPasswordMutation = useResetPasswordMutation();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    if (!token || !uid) {
      setError("Invalid or missing reset token.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await resetPasswordMutation.mutateAsync({
        uid,
        token,
        new_password: data.password,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      const parsed = parseApiError(err);
      setError(parsed.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            Password has been reset successfully! Redirecting to login...
          </motion.div>
        )}
      </AnimatePresence>

      <PasswordInput
        {...register("password")}
        label="New Password"
        error={errors.password?.message}
      />

      <PasswordInput
        {...register("confirmPassword")}
        label="Confirm New Password"
        error={errors.confirmPassword?.message}
      />

      <motion.button
        type="submit"
        disabled={submitting || success}
        whileHover={{ scale: submitting || success ? 1 : 1.02 }}
        whileTap={{ scale: submitting || success ? 1 : 0.98 }}
        className="group relative mt-2 flex h-13 w-full items-center justify-center overflow-hidden rounded-xl font-semibold text-neutral-950 transition-all duration-300 disabled:opacity-70"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 transition-all duration-500 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-amber-300" />
        <span className="relative z-10 flex items-center gap-2 text-base">
          {submitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  className="opacity-75"
                />
              </svg>
              Resetting...
            </>
          ) : (
            <>
              Confirm Reset
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </span>
      </motion.button>
    </form>
  );
}
