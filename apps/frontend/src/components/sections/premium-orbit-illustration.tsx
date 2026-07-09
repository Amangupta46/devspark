"use client";

import React, { useEffect, useRef } from "react";
import { useSharedIntersection } from "@/experience/providers/intersection";

export function PremiumOrbitIllustration() {
  const { ref, isIntersecting } = useSharedIntersection<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Directly mutate the DOM to avoid React re-renders on every scroll intersection
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = isIntersecting ? "running" : "paused";

      // Update all child elements with the animation play state class
      const elements = containerRef.current.querySelectorAll(".orbit-animated");
      elements.forEach((el) => {
        (el as HTMLElement).style.animationPlayState = isIntersecting ? "running" : "paused";
      });
    }
  }, [isIntersecting]);

  return (
    <div
      ref={ref}
      className="pointer-events-none relative flex aspect-square w-full max-w-[600px] min-w-[300px] items-center justify-center select-none"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes float-breathing {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.02); }
        }
        @keyframes orbit-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        .orbit-system {
          transform-style: preserve-3d;
          transform: rotateX(55deg) rotateY(-10deg) rotateZ(0deg);
        }

        .animate-orbit {
          animation: orbit-spin linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-spin-reverse linear infinite;
        }
        .animate-float {
          animation: float-breathing 8s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 6s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .desktop-particle {
            display: none;
          }
          .orbit-system {
            transform: rotateX(50deg) rotateY(-5deg) rotateZ(0deg) scale(0.9);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-orbit,
          .animate-orbit-reverse,
          .animate-float,
          .animate-pulse-glow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Floating System */}
      <div
        ref={containerRef}
        className="orbit-animated animate-float orbit-system relative flex h-full w-full items-center justify-center"
        style={{ animationPlayState: "paused" }}
      >
        <svg
          viewBox="0 0 800 800"
          className="absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        >
          <defs>
            {/* Core Glows - 80% Amber / Gold */}
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 1)" /> {/* Amber 400 */}
              <stop offset="30%" stopColor="rgba(245, 158, 11, 0.8)" /> {/* Amber 500 */}
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
            </radialGradient>

            <radialGradient id="energyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.4)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
            </radialGradient>

            <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </radialGradient>

            {/* Blur Filter */}
            <filter id="blurGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="blurIntense" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="24" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Premium Glass Ring Gradients */}
            <linearGradient id="ringGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.6)" />
              <stop offset="30%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="70%" stopColor="rgba(255, 255, 255, 0.02)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.4)" />
            </linearGradient>

            <linearGradient id="ringGradBlue" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
            </linearGradient>

            <linearGradient id="ringGradGlass" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.2)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.02)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.15)" />
            </linearGradient>
          </defs>

          {/* Breathing Background Glow */}
          <g
            className="orbit-animated animate-pulse-glow"
            style={{ animationPlayState: "paused", transformOrigin: "400px 400px" }}
          >
            <circle cx="400" cy="400" r="180" fill="url(#energyGlow)" filter="url(#blurIntense)" />
          </g>

          {/* Core Star */}
          <circle cx="400" cy="400" r="45" fill="url(#coreGlow)" filter="url(#blurGlow)" />
          <circle cx="400" cy="400" r="12" fill="#ffffff" filter="url(#blurGlow)" />
          <circle cx="400" cy="400" r="4" fill="#ffffff" />

          {/* INNER ORBIT (Fastest, Smallest) */}
          <g
            className="orbit-animated animate-orbit"
            style={{
              animationDuration: "25s",
              animationPlayState: "paused",
              transformOrigin: "400px 400px",
            }}
          >
            <circle
              cx="400"
              cy="400"
              r="130"
              fill="none"
              stroke="url(#ringGradGold)"
              strokeWidth="1"
            />
            <circle cx="400" cy="270" r="5" fill="#FBBF24" filter="url(#blurGlow)" />
            {/* Comet Trail */}
            <path
              d="M 400 270 A 130 130 0 0 1 500 310"
              fill="none"
              stroke="rgba(251,191,36,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* MIDDLE ORBIT (Reverse, Dashed Gold) */}
          <g
            className="orbit-animated animate-orbit-reverse"
            style={{
              animationDuration: "45s",
              animationPlayState: "paused",
              transformOrigin: "400px 400px",
            }}
          >
            <circle
              cx="400"
              cy="400"
              r="210"
              fill="none"
              stroke="url(#ringGradGold)"
              strokeWidth="1.5"
              strokeDasharray="4 16"
            />
            <circle cx="400" cy="190" r="4" fill="#ffffff" filter="url(#blurGlow)" />
            <circle
              cx="400"
              cy="610"
              r="6"
              fill="#3B82F6"
              filter="url(#blurGlow)"
              className="desktop-particle"
            />
            <path
              d="M 400 610 A 210 210 0 0 0 520 572"
              fill="none"
              stroke="rgba(59,130,246,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              className="desktop-particle"
            />
          </g>

          {/* OUTER ORBIT (Premium Thick Glass Ring) */}
          <g
            className="orbit-animated animate-orbit"
            style={{
              animationDuration: "65s",
              animationPlayState: "paused",
              transformOrigin: "400px 400px",
            }}
          >
            {/* Thick translucent glass body */}
            <circle
              cx="400"
              cy="400"
              r="290"
              fill="none"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="28"
            />
            {/* Inner & Outer sharp borders for the glass ring */}
            <circle
              cx="400"
              cy="400"
              r="276"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <circle
              cx="400"
              cy="400"
              r="304"
              fill="none"
              stroke="url(#ringGradGlass)"
              strokeWidth="1.5"
            />

            {/* Satellites on the glass ring */}
            <circle cx="110" cy="400" r="4" fill="#ffffff" filter="url(#blurGlow)" />
            <circle
              cx="690"
              cy="400"
              r="8"
              fill="#F59E0B"
              filter="url(#blurGlow)"
              className="desktop-particle"
            />
            <circle cx="400" cy="110" r="3" fill="#3B82F6" filter="url(#blurGlow)" />
          </g>

          {/* FARTHEST ORBIT (Reverse, Very Slow, Blue Accent) */}
          <g
            className="orbit-animated animate-orbit-reverse desktop-particle"
            style={{
              animationDuration: "100s",
              animationPlayState: "paused",
              transformOrigin: "400px 400px",
            }}
          >
            <circle
              cx="400"
              cy="400"
              r="370"
              fill="none"
              stroke="url(#ringGradBlue)"
              strokeWidth="1"
              strokeDasharray="2 12"
            />
            <circle cx="400" cy="30" r="6" fill="none" stroke="#3B82F6" strokeWidth="2" />
            <circle cx="400" cy="30" r="2" fill="#ffffff" />
          </g>

          {/* STATIC DUST PARTICLES & HIGHLIGHTS */}
          <g opacity="0.6" className="desktop-particle">
            <circle cx="220" cy="160" r="1.5" fill="#ffffff" />
            <circle cx="680" cy="220" r="2.5" fill="#F59E0B" filter="url(#blurGlow)" />
            <circle cx="580" cy="670" r="1.5" fill="#FBBF24" />
            <circle cx="140" cy="520" r="2" fill="#3B82F6" filter="url(#blurGlow)" />
            <circle cx="720" cy="550" r="1.5" fill="#ffffff" />
            <circle cx="300" cy="720" r="3" fill="#F59E0B" filter="url(#blurGlow)" />
            <circle cx="200" cy="350" r="1" fill="#ffffff" />
            <circle cx="550" cy="150" r="2" fill="#3B82F6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
