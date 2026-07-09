import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section, MaxWidth } from "@/components/layout/primitives";
import { Badge } from "@/components/shared/badge";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ArticleContent } from "@/components/blog/article-content";
import { BlogCard } from "@/components/blog/blog-card";
import { NewsletterCTA } from "@/components/blog/newsletter-cta";
import { getPostBySlug, getRelatedPosts, getAllSlugs } from "@/lib/blog";

export const dynamicParams = false; // Strictly enforce static generation

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);
  const currentUrl = `https://devspark.dev/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.coverImage,
    datePublished: post.publishDate,
    dateModified: post.updatedAt || post.publishDate,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "DevSpark",
      logo: {
        "@type": "ImageObject",
        url: "https://devspark.dev/logo.png", // Fallback logo
      },
    },
    description: post.description,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://devspark.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://devspark.dev/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: currentUrl,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-neutral-50 selection:bg-amber-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <ReadingProgress />
      <Header />

      <main className="flex-grow pt-24 md:pt-32">
        <article>
          {/* Article Header */}
          <MaxWidth className="max-w-4xl px-4 md:px-8">
            <Link
              href="/blog"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-amber-400"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to all articles
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <Badge variant="amber" className="border-amber-500/30 bg-amber-500/10 text-amber-400">
                {post.category}
              </Badge>
              <span className="text-sm font-medium text-neutral-500">
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-neutral-300">{post.description}</p>

            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-neutral-800 pb-8 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-700">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">{post.author.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <span>{post.author.role}</span>
                    <span className="hidden sm:inline">•</span>
                    <time dateTime={post.publishDate} className="hidden sm:inline">
                      {new Date(post.publishDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </div>

              <ShareButtons url={currentUrl} title={post.title} />
            </div>
          </MaxWidth>

          {/* Hero Image */}
          <MaxWidth className="mb-16 max-w-6xl px-4 md:px-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/5">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </MaxWidth>

          {/* Content */}
          <MaxWidth className="max-w-3xl px-4 md:px-8">
            <ArticleContent content={post.content} />

            {/* Tags */}
            <div className="mt-16 flex flex-wrap gap-2 border-t border-neutral-800 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-neutral-900 px-3 py-1 text-sm text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </MaxWidth>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Section
            id="related-posts"
            className="relative z-10 mt-20 border-t border-neutral-900 bg-neutral-950"
          >
            <MaxWidth>
              <h2 className="mb-10 text-3xl font-bold tracking-tight text-white">
                Continue Reading
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {relatedPosts.map((relatedPost, i) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} index={i} />
                ))}
              </div>
            </MaxWidth>
          </Section>
        )}

        {/* Newsletter */}
        <Section id="newsletter" className="relative z-10 bg-[#050505]">
          <MaxWidth>
            <NewsletterCTA />
          </MaxWidth>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
