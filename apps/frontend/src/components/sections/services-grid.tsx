import * as React from "react";
import { ArrowRight, Brain, Layers, Globe, Smartphone, Palette, Terminal } from "lucide-react";
import { PremiumCard } from "@/components/ui/premium-card";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";

const services = [
  {
    icon: Brain,
    title: "AI Engineering",
    description:
      "Architecting intelligent systems, fine-tuning large language models, and building cognitive automation pipelines tailored for complex workflows.",
  },
  {
    icon: Layers,
    title: "SaaS Development",
    description:
      "Designing high-scale, multi-tenant cloud platforms with robust subscription billing engines, secure authentication, and enterprise-grade APIs.",
  },
  {
    icon: Globe,
    title: "Web Platforms",
    description:
      "Engineered with Next.js and React for optimal Core Web Vitals, visual excellence, lightning-fast rendering, and search engine discovery.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Crafting immersive native iOS and Android applications with offline-first capabilities, buttery smooth animations, and deep device integration.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating digital interfaces with mathematical layout precision, cohesive design systems, interactive prototypes, and premium user experiences.",
  },
  {
    icon: Terminal,
    title: "Cloud & DevOps",
    description:
      "Automating zero-downtime deployments, defining secure infrastructure as code, and monitoring containerized systems for 99.99% availability.",
  },
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard key={service.title} service={service} index={index} />
      ))}
    </div>
  );
}

interface ServiceCardProps {
  service: (typeof services)[number];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <ScrollReveal className="h-full" delay={index * 0.1}>
      <PremiumCard className="h-full" aria-label={service.title} glowColor="hsla(37,93%,55%,0.15)">
        <div className="flex h-full flex-col justify-between p-8">
          <div>
            {/* Minimal Icon Container */}
            <div
              className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-all duration-300 group-hover:border-amber-500/20 group-hover:bg-amber-500/5 group-hover:text-amber-400 group-focus-visible:border-amber-500/20 group-focus-visible:text-amber-400"
              aria-hidden="true"
              style={{ transform: "translateZ(10px)" }} // Popping out on tilt
            >
              <Icon className="h-5 w-5" />
            </div>

            {/* Title */}
            <h3
              className="text-lg font-semibold tracking-tight text-neutral-100 transition-colors duration-200 group-hover:text-white"
              style={{ transform: "translateZ(15px)" }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className="mt-3 text-sm leading-relaxed text-neutral-400 transition-colors duration-200 group-hover:text-neutral-300"
              style={{ transform: "translateZ(5px)" }}
            >
              {service.description}
            </p>
          </div>

          {/* Learn More link with animated arrow */}
          <div
            className="mt-8 flex items-center text-xs font-semibold tracking-wider text-neutral-500 uppercase transition-colors duration-300 group-hover:text-amber-400"
            style={{ transform: "translateZ(20px)" }}
          >
            <span>Learn More</span>
            <ArrowRight
              className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </PremiumCard>
    </ScrollReveal>
  );
}
