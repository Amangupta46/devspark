import { cn } from "@/lib/utils";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article
      className={cn(
        "prose prose-invert prose-lg max-w-none",
        // Typography matching Vercel/Stripe: High contrast headers, very legible body
        "[&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-white",
        "[&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:text-neutral-100",
        "[&>p]:mb-6 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:text-neutral-300",
        // Lists
        "[&>ul]:mb-8 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-neutral-300",
        "[&>ul>li]:mb-2 [&>ul>li]:leading-relaxed",
        "[&>ol]:mb-8 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-neutral-300",
        "[&>ol>li]:mb-2 [&>ol>li]:leading-relaxed",
        // Quotes
        "[&>blockquote]:my-10 [&>blockquote]:border-l-4 [&>blockquote]:border-amber-500 [&>blockquote]:bg-neutral-900/50 [&>blockquote]:py-4 [&>blockquote]:pl-6 [&>blockquote]:text-neutral-200 [&>blockquote]:italic",
        // Code Blocks
        "[&>pre]:my-8 [&>pre]:overflow-x-auto [&>pre]:rounded-xl [&>pre]:border [&>pre]:border-white/10 [&>pre]:bg-[#0c0c0c] [&>pre]:p-6 [&>pre]:text-sm",
        "[&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:text-neutral-300",
        // Inline Code
        "[&_code]:rounded-md [&_code]:bg-neutral-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-amber-300",
        // Links
        "[&_a]:text-amber-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-amber-300",
        // Media
        "[&>img]:my-12 [&>img]:rounded-2xl [&>img]:border [&>img]:border-white/5",
        "[&>iframe]:my-12 [&>iframe]:rounded-2xl [&>iframe]:border [&>iframe]:border-white/5",
        // Tables
        "[&>table]:my-10 [&>table]:w-full [&>table]:border-collapse [&>table]:text-left [&>table]:text-neutral-300",
        "[&>table_th]:border-b [&>table_th]:border-neutral-800 [&>table_th]:pb-3 [&>table_th]:font-semibold [&>table_th]:text-neutral-100",
        "[&>table_td]:border-b [&>table_td]:border-neutral-800/50 [&>table_td]:py-4",
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
