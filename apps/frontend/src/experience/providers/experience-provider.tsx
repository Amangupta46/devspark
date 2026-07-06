"use client";

import { ReactNode } from "react";
import { ViewportProvider } from "./viewport";
import { MouseProvider } from "./mouse";
import { SmoothScrollProvider } from "./smooth-scroll";
import { LoaderProvider } from "./loader-provider";

export function ExperienceProvider({ children }: { children: ReactNode }) {
  return (
    <LoaderProvider>
      <ViewportProvider>
        {/* 
          MouseProvider internally starts the centralized window listener.
          The IntersectionObserver and rAF managers are singletons that auto-start
          when a component subscribes via their respective hooks.
        */}
        <MouseProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MouseProvider>
      </ViewportProvider>
    </LoaderProvider>
  );
}
