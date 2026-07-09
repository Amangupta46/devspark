"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { PremiumCard } from "@/components/ui/premium-card";
import { Badge } from "@/components/shared/badge";
import { ArrowUpRight } from "lucide-react";

interface FeaturedPostCardProps {
  post: BlogPost;
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full outline-none">
      <PremiumCard glowColor="hsla(210,100%,60%,0.2)" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl border-b border-white/5 lg:aspect-auto lg:rounded-l-3xl lg:rounded-tr-none lg:border-r lg:border-b-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-950/20 transition-opacity duration-300 group-hover:opacity-0" />
            <div className="absolute top-6 left-6">
              <Badge variant="amber">{post.category}</Badge>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 xl:p-16">
            <div className="mb-4 flex items-center gap-4 text-sm font-medium text-neutral-400">
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <div className="h-1 w-1 rounded-full bg-neutral-700" />
              <span>{post.readingTime} min read</span>
            </div>

            <h2 className="mb-6 text-3xl leading-tight font-bold text-neutral-50 transition-colors duration-300 group-hover:text-blue-400 md:text-4xl lg:text-5xl">
              {post.title}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-neutral-300">{post.description}</p>

            <div className="mt-auto flex items-center justify-between border-t border-neutral-800/50 pt-8">
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
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-neutral-100">{post.author.name}</span>
                  <span className="text-xs text-neutral-400">{post.author.role}</span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:text-blue-400">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </PremiumCard>
    </Link>
  );
}
