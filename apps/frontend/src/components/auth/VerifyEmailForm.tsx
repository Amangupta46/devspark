"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { parseApiError } from "@/lib/api/error-parser";

import { useVerifyEmailMutation } from "@/lib/auth/mutations";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";
  const uid = searchParams?.get("uid") || "";

  const verifyEmailMutation = useVerifyEmailMutation();

  const [status, setStatus] = useState<"loading" | "success" | "error">(() => {
    if (!token || !uid) return "error";
    return "loading";
  });
  const [error, setError] = useState(() => {
    if (!token || !uid) return "Invalid or missing verification token.";
    return "";
  });

  useEffect(() => {
    if (!token || !uid) return;

    const verify = async () => {
      try {
        await verifyEmailMutation.mutateAsync({ token, uid });
        setStatus("success");
      } catch (err) {
        const parsed = parseApiError(err);
        setStatus("error");
        setError(parsed.message);
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              <svg
                className="h-full w-full animate-spin text-amber-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  className="opacity-75"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Verifying your email...</h3>
            <p className="text-sm text-neutral-400">Please wait while we verify your account.</p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Email Verified!</h3>
            <p className="text-sm text-neutral-400">Your account is now active.</p>
            <button
              onClick={() => router.push("/login")}
              className="group relative mt-4 flex h-11 w-full max-w-[200px] items-center justify-center overflow-hidden rounded-xl font-semibold text-neutral-950 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 transition-all duration-500 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-amber-300" />
              <span className="relative z-10 flex items-center gap-2 text-sm">
                Continue to Login
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <XCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Verification Failed</h3>
            <p className="text-sm text-neutral-400">{error}</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 text-sm font-semibold text-amber-400/80 transition-colors hover:text-amber-400"
            >
              Back to Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
