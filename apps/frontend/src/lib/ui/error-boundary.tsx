"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 text-center">
          <div className="mb-4 rounded-full bg-red-500/10 p-3 text-red-500">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-neutral-100">Something went wrong</h2>
          <p className="mb-6 max-w-md text-sm text-neutral-400">
            {this.state.error?.message ||
              "An unexpected error occurred while rendering this component."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
