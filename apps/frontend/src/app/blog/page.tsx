import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section, MaxWidth } from "@/components/layout/primitives";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogSearch } from "@/components/blog/blog-search";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";
import { NewsletterCTA } from "@/components/blog/newsletter-cta";
import { getAllPosts, getAllCategories, getFeaturedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Insights, Engineering & Innovation",
  description:
    "Deep-dives into modern web architecture, performance optimization, and AI integration for elite engineering teams.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "DevSpark Blog",
    description: "Insights on modern web architecture and AI.",
    url: "https://devspark.dev/blog",
    siteName: "DevSpark",
    type: "website",
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const categories = await getAllCategories();
  const featuredPosts = await getFeaturedPosts(1);

  const topFeatured = featuredPosts[0];
  const regularPosts = topFeatured ? allPosts.filter((p) => p.id !== topFeatured.id) : allPosts;

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-neutral-50 selection:bg-amber-500/30">
      <Header />

      <main className="flex-grow pt-18">
        {/* Animated Hero */}
        <BlogHero totalCount={allPosts.length} categoryCount={categories.length} />

        <Section id="blog-content" className="relative z-20 py-0">
          <MaxWidth>
            {/* Featured Post */}
            {topFeatured && (
              <div className="mb-24">
                <h2 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Featured Insight
                </h2>
                <FeaturedPostCard post={topFeatured} />
              </div>
            )}

            {/* Search and Grid */}
            <div className="mb-32">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Latest Articles
              </h2>
              <BlogSearch initialPosts={regularPosts} categories={categories} />
            </div>

            {/* Newsletter */}
            <NewsletterCTA />
          </MaxWidth>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
