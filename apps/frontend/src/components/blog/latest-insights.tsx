import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { Section, MaxWidth } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";

export async function LatestInsights() {
  // Fetch latest 3 featured posts for homepage
  const latestPosts = await getFeaturedPosts(3);

  if (latestPosts.length === 0) return null;

  return (
    <Section id="latest-insights" className="relative z-10 overflow-hidden bg-[#050505]">
      <MaxWidth>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            subheading="Engineering Blog"
            title="Latest Insights"
            description="Deep-dives into modern web architecture, performance optimization, and AI integration for elite engineering teams."
            align="left"
          />

          <ScrollReveal delay={0.2}>
            <Link
              href="/blog"
              className="group flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-amber-500/50 hover:text-amber-400"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <BlogCard post={post} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </MaxWidth>
    </Section>
  );
}
