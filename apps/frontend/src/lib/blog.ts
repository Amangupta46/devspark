import { BlogPost } from "@/types/blog";
import { MOCK_ARTICLES } from "@/data/mock-articles";

export async function getAllPosts(): Promise<BlogPost[]> {
  // Simulate network delay
  return MOCK_ARTICLES.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = MOCK_ARTICLES.find((p) => p.slug === slug);
  return post || null;
}

export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.featured).slice(0, limit);
}

export async function getAllCategories(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
}

export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3,
): Promise<BlogPost[]> {
  const posts = await getAllPosts();

  // Scoring algorithm: +2 for same category, +1 for matching tag
  const scoredPosts = posts
    .filter((p) => p.id !== currentPost.id)
    .map((post) => {
      let score = 0;
      if (post.category === currentPost.category) score += 2;

      const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      score += commonTags.length;

      return { post, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map((p) => p.post);
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
