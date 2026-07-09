"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { PremiumCard } from "@/components/ui/premium-card";
import { Badge } from "@/components/shared/badge";
import { ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const isSpecialColor = index % 3 === 0;

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full outline-none">
      <PremiumCard
        className="h-full"
        glowColor={isSpecialColor ? "hsla(280,80%,60%,0.2)" : "hsla(37,93%,55%,0.15)"}
      >
        <div className="flex h-full flex-col">
          {/* Image Container */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl border-b border-white/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-neutral-950/20 transition-opacity duration-300 group-hover:opacity-0" />
            <div className="absolute top-4 left-4">
              <Badge variant="amber">{post.category}</Badge>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
            <div>
              <div className="mb-3 flex items-center justify-between text-xs font-medium text-neutral-400">
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>{post.readingTime} min read</span>
              </div>
              <h3 className="mb-3 text-xl leading-tight font-bold text-neutral-50 transition-colors duration-300 group-hover:text-amber-400">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-neutral-300">
                {post.description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-neutral-800/50 pt-5">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-neutral-700">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-neutral-200">{post.author.name}</span>
                </div>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 transition-colors duration-300 group-hover:border-amber-500/30 group-hover:bg-amber-500/10 group-hover:text-amber-400">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </PremiumCard>
    </Link>
  );
}
