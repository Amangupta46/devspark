export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // Markdown or HTML content
  author: BlogAuthor;
  publishDate: string; // ISO string
  updatedAt?: string; // ISO string
  readingTime: number; // in minutes
  coverImage: string;
  category: string;
  tags: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}
