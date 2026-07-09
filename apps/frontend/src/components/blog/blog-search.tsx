"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookX } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { BlogCard } from "./blog-card";
import { CategoryTabs } from "./category-tabs";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";

interface BlogSearchProps {
  initialPosts: BlogPost[];
  categories: { name: string; count: number }[];
}

export function BlogSearch({ initialPosts, categories }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory = activeCategory ? post.category === activeCategory : true;
    const searchLower = query.toLowerCase();
    const matchesSearch =
      query === "" ||
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Search & Filter Controls */}
      <div className="mb-12 flex flex-col gap-8">
        <div className="relative mx-auto w-full max-w-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
            <Search className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            type="text"
            placeholder="Search articles by title, topic, or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-neutral-800 bg-neutral-900/50 py-4 pr-12 pl-14 text-neutral-100 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
          <AnimatePresence>
            {query.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-5 text-neutral-500 hover:text-neutral-300"
              >
                <X className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>
      </div>

      {/* Results Grid */}
      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <BlogCard post={post} index={index} />
              </ScrollReveal>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-[40vh] flex-col items-center justify-center text-center"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-600">
              <BookX className="h-10 w-10" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-neutral-200">No articles found</h3>
            <p className="max-w-md text-neutral-400">
              We couldn&apos;t find any articles matching &quot;{query}&quot; in{" "}
              {activeCategory ? activeCategory : "all categories"}.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory(null);
              }}
              className="mt-8 text-amber-400 hover:text-amber-300 hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
