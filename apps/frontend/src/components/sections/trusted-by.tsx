import * as React from "react";
import { Section, MaxWidth } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";

// Clean, precise vector representations of brand logos in grayscale -> brand-colored hover
const GoogleLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 fill-current text-neutral-400 transition-colors duration-300 group-hover:text-[#4285F4]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.567 0-6.47-2.903-6.47-6.47s2.903-6.47 6.47-6.47c1.554 0 2.973.549 4.09 1.458l3.14-3.14C19.167 1.83 15.932 1 12.24 1 5.866 1 .7 6.166.7 12.54S5.866 24.08 12.24 24.08c6.19 0 11.23-4.47 11.23-11.23 0-.68-.06-1.35-.18-2.005H12.24z" />
  </svg>
);

const MicrosoftLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 23 23"
    className="h-5 fill-current text-neutral-400 transition-colors duration-300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h11v11H0z" className="transition-colors duration-300 group-hover:fill-[#F25022]" />
    <path
      d="M12 0h11v11H12z"
      className="transition-colors duration-300 group-hover:fill-[#7FBA00]"
    />
    <path
      d="M0 12h11v11H0z"
      className="transition-colors duration-300 group-hover:fill-[#00A4EF]"
    />
    <path
      d="M12 12h11v11H12z"
      className="transition-colors duration-300 group-hover:fill-[#FFB900]"
    />
  </svg>
);

const AWSLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 fill-current text-neutral-400 transition-colors duration-300 group-hover:text-[#FF9900]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1.8 14.5c-.8.8-1.7.9-2.5.4-.5-.3-.8-.9-1-1.6-.2-.7-.1-1.6.4-2.2.6-.8 1.6-1.1 2.5-1.1.2 0 .4 0 .6.1v-.3c0-.6-.3-1.1-.9-1.1-.5 0-.9.2-1 .6H8.2c.1-1.3 1.2-2.1 2.6-2.1 1.7 0 2.7.9 2.7 2.6v3.2c0 .8.4 1.1.8 1.1h.3v1.3c-.2.2-.5.3-.8.3zm.6-3.8c-.2-.1-.4-.1-.6-.1-.5 0-1 .2-1.3.6-.3.4-.3.9-.1 1.3.2.4.6.6 1.1.6.5 0 .9-.4 1-.8v-1.6z" />
  </svg>
);

const OpenAILogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 fill-none stroke-current stroke-[1.5] text-neutral-400 transition-colors duration-300 group-hover:text-[#10A37F]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.98 12.18c0-.75-.41-1.46-1.07-1.83l-1.82-1.05c.34-.69.41-1.5.17-2.26-.26-.82-.87-1.47-1.68-1.78l-1.82-1.05c-.65-.37-1.44-.37-2.09 0L9.87 4.26c-.81.31-1.42.96-1.68 1.78-.24.76-.17 1.57.17 2.26L6.54 9.35c-.66.37-1.07 1.08-1.07 1.83v2.1c0 .75.41 1.46 1.07 1.83l1.82 1.05c-.34.69-.41 1.5-.17 2.26.26.82.87 1.47 1.68 1.78l1.82 1.05c.32.19.69.28 1.05.28s.72-.09 1.05-.28l1.82-1.05c.81-.31 1.42-.96 1.68-1.78.24-.76.17-1.57-.17-2.26l1.82-1.05c.66-.37 1.07-1.08 1.07-1.83v-2.1zM10.87 5.96L12 5.31l1.13.65c.37.21.6.6.6 1.03v2.14L12.1 10.1v-1.3c0-.43-.23-.82-.6-1.03L9.67 6.64c-.16-.27-.14-.62.06-.87.16-.19.41-.3.67-.3.16 0 .32.04.47.12v.37zm-.26 10.63c-.37-.21-.6-.6-.6-1.03v-2.14l1.63-1.02V13.7c0 .43.23.82.6 1.03l1.83 1.13c.16.27.14.62-.06.87-.16.19-.41.3-.67.3-.16 0-.32-.04-.47-.12l-2.26-1.31z" />
  </svg>
);

const VercelLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 fill-current text-neutral-400 transition-colors duration-300 group-hover:text-white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 1L24 22H0L12 1Z" />
  </svg>
);

const SupabaseLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 fill-current text-neutral-400 transition-colors duration-300 group-hover:text-[#3ECF8E]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.8 11.2h-5.6l3.3-8.8c.2-.5-.1-1.1-.6-1.2-.2 0-.4 0-.5.1L4.8 11.6c-.4.4-.4 1.1 0 1.5.2.2.4.3.7.3h5.6L7.8 22.2c-.2.5.1 1.1.6 1.2.2 0 .4 0 .5-.1l10.6-10.4c.4-.4.4-1.1 0-1.5-.2-.1-.4-.2-.7-.2z" />
  </svg>
);

const StripeLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 fill-current text-neutral-400 transition-colors duration-300 group-hover:text-[#635BFF]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.93 7.8c0-.6-.5-.9-1.3-.9-1.2 0-2.5.4-3.5 1L8 5.6c1.2-.7 2.9-1.1 4.6-1.1 3 0 5 1.5 5 4.3v7.4c0 1.2.4 1.9.9 2.3h-3.4c-.2-.4-.3-.8-.3-1.2-.9.8-2.2 1.5-3.8 1.5-2.6 0-4.3-1.6-4.3-4.1 0-3.3 2.7-4.7 6.4-4.7h.8v-.4zm-3 8.3c0 .8.6 1.3 1.5 1.3 1 0 1.8-.6 2.1-1.4v-2c-1.8.1-3.6.7-3.6 2.1zM20 2v20h4V2zM0 2v20h4V2z" />
  </svg>
);

const CloudflareLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 fill-current text-neutral-400 transition-colors duration-300 group-hover:text-[#F38020]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.5 11.5a4.5 4.5 0 0 0-4.3-3.2 5 5 0 0 0-9-2.2A5.5 5.5 0 0 0 3 11a5.5 5.5 0 0 0 .1 1H3a4.5 4.5 0 0 0 0 9h17a4 4 0 0 0 2.5-7.5zM17 19H4a2.5 2.5 0 0 1 0-5h.5a1 1 0 0 0 1-1A3.5 3.5 0 0 1 12 9.5a1 1 0 0 0 .8-.5 3 3 0 0 1 5.4 1.3 1 1 0 0 0 .8.8A2.5 2.5 0 0 1 17 19z" />
  </svg>
);

const DigitalOceanLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 fill-current text-neutral-400 transition-colors duration-300 group-hover:text-[#0080FF]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm-1.8 15h-1.6v-1.6h1.6zm0-3.2h-1.6V9.4h1.6zm4.8 3.2h-1.6v-4.8h1.6zm0-6.4h-1.6V7.4h1.6z" />
  </svg>
);

const GitHubLogo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 fill-current text-neutral-400 transition-colors duration-300 group-hover:text-white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
    />
  </svg>
);

const logos = [
  { name: "Google", component: GoogleLogo },
  { name: "Microsoft", component: MicrosoftLogo },
  { name: "AWS", component: AWSLogo },
  { name: "OpenAI", component: OpenAILogo },
  { name: "Vercel", component: VercelLogo },
  { name: "Supabase", component: SupabaseLogo },
  { name: "Stripe", component: StripeLogo },
  { name: "Cloudflare", component: CloudflareLogo },
  { name: "DigitalOcean", component: DigitalOceanLogo },
  { name: "GitHub", component: GitHubLogo },
];

export function TrustedBySection() {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <Section
      id="trusted-by"
      background="transparent"
      className="border-border-subtle/30 relative overflow-hidden border-y bg-neutral-950/40 py-16 backdrop-blur-md md:py-24"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 2rem;
          animation: marquee-scroll 45s linear infinite;
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `,
        }}
      />

      <MaxWidth size="xl" className="mb-12">
        <SectionHeader
          align="center"
          title="Trusted by ambitious teams."
          description="Helping startups and enterprises build products that scale."
        />
      </MaxWidth>

      <div
        className="marquee-container w-full overflow-hidden select-none"
        aria-label="Trusted companies marquee"
      >
        <div className="marquee-track px-4" aria-hidden="true">
          {duplicatedLogos.map((logo, idx) => {
            const LogoComponent = logo.component;
            return (
              <div
                key={`logo-${idx}`}
                className="group border-border-subtle/10 bg-surface-base/5 flex h-16 w-36 items-center justify-center rounded-2xl border px-5 opacity-45 grayscale backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:border-amber-500/20 hover:bg-neutral-900/60 hover:opacity-100 hover:shadow-[0_0_25px_rgba(245,158,11,0.08)] hover:grayscale-0"
                title={logo.name}
              >
                <LogoComponent />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
