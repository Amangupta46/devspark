"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseApiError } from "@/lib/api/error-parser";

import { useAuth } from "@/lib/auth/auth-provider";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});
type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      if (forgotPassword) {
        await forgotPassword(data.email);
        setSuccess(true);
      }
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
            Password reset link sent! Check your email.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="group relative">
        <label className="mb-1.5 block text-xs font-medium tracking-wider text-neutral-500 uppercase">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            {...register("email")}
            placeholder="you@company.com"
            autoComplete="email"
            className={cn(
              "w-full rounded-xl border bg-white/[0.03] px-4 py-3 pl-11 text-sm text-neutral-100 transition-all duration-300 outline-none placeholder:text-neutral-600 md:backdrop-blur-sm",
              errors.email
                ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 hover:border-white/20 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-500/20",
            )}
          />
          <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-xs text-red-400"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

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
              Sending...
            </>
          ) : (
            <>
              Reset Password
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </span>
      </motion.button>
    </form>
  );
}
