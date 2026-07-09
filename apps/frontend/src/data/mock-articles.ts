import { BlogPost } from "@/types/blog";

export const MOCK_ARTICLES: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-react-server-components",
    title: "The Future of React: A Deep Dive into Server Components",
    description:
      "Explore how React Server Components (RSC) are revolutionizing web architecture by blending server-side performance with client-side interactivity.",
    content: `
      <h2>Introduction to Server Components</h2>
      <p>React Server Components represent a fundamental shift in how we architect modern web applications. By allowing components to render exclusively on the server, we can significantly reduce the JavaScript bundle size sent to the client.</p>
      
      <blockquote>
        "Server Components allow you to write UI that can be rendered and optionally cached on the server."
      </blockquote>

      <h3>Key Benefits</h3>
      <ul>
        <li><strong>Zero Bundle Size:</strong> Dependencies used in Server Components don't bloat the client bundle.</li>
        <li><strong>Direct Backend Access:</strong> Query databases and access file systems directly from your UI components without creating API endpoints.</li>
        <li><strong>Automatic Code Splitting:</strong> Client components are automatically code-split based on imports.</li>
      </ul>

      <h3>Implementation Example</h3>
      <pre><code class="language-tsx">
import { db } from '@/lib/db';

// This component runs exclusively on the server
export default async function ProductList() {
  const products = await db.products.findMany();
  
  return (
    &lt;div className="grid gap-4"&gt;
      {products.map(product =&gt; (
        &lt;ProductCard key={product.id} product={product} /&gt;
      ))}
    &lt;/div&gt;
  );
}
      </code></pre>

      <p>As we continue to adopt the App Router in Next.js, understanding the boundaries between Server and Client components becomes the most critical skill for a modern frontend engineer.</p>
    `,
    author: {
      name: "Marcus Thorne",
      role: "VP of Engineering",
      avatar: "/authors/marcus.jpg",
    },
    publishDate: "2026-06-15T09:00:00Z",
    readingTime: 6,
    coverImage: "/blog/react-server-components.jpg",
    category: "Development",
    tags: ["React", "Next.js", "Architecture", "Performance"],
    featured: true,
  },
  {
    id: "2",
    slug: "designing-premium-saas-interfaces",
    title: "Designing Premium SaaS Interfaces: The Glassmorphism Era",
    description:
      "Learn how to utilize modern CSS techniques like backdrop-filter, subtle gradients, and micro-interactions to create a high-end software experience.",
    content: `
      <h2>Beyond Flat Design</h2>
      <p>The era of purely flat design is evolving. Users now expect interfaces that feel tactile, layered, and responsive to their inputs. Glassmorphism has emerged not just as a trend, but as a functional way to establish visual hierarchy.</p>
      
      <h3>The Anatomy of a Premium Card</h3>
      <p>Creating a premium feel requires mastering lighting and depth in CSS. Here's a look at the layers:</p>
      <ul>
        <li><strong>Base:</strong> A highly translucent background color (e.g., <code>rgba(255, 255, 255, 0.03)</code>)</li>
        <li><strong>Blur:</strong> A strong <code>backdrop-filter: blur(12px)</code></li>
        <li><strong>Border:</strong> A subtle gradient border to simulate light reflection</li>
        <li><strong>Glow:</strong> A dynamic radial gradient that follows the mouse (micro-interaction)</li>
      </ul>

      <h3>Implementation</h3>
      <pre><code class="language-css">
.premium-card {
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
      </code></pre>

      <p>Remember, less is more. Apply these effects to structural elements like navigation bars and modal dialogs rather than every button.</p>
    `,
    author: {
      name: "Elena Rodriguez",
      role: "Head of Design",
      avatar: "/authors/elena.jpg",
    },
    publishDate: "2026-06-10T14:30:00Z",
    readingTime: 4,
    coverImage: "/blog/premium-saas.jpg",
    category: "Design",
    tags: ["UI/UX", "CSS", "Tailwind", "Design Systems"],
    featured: true,
  },
  {
    id: "3",
    slug: "optimizing-core-web-vitals-2026",
    title: "The 2026 Guide to Optimizing Core Web Vitals",
    description:
      "A comprehensive breakdown of INP, LCP, and CLS optimization techniques for enterprise Next.js applications.",
    content: `
      <h2>The Shift to Interaction to Next Paint (INP)</h2>
      <p>With INP officially replacing FID as a Core Web Vital, the focus has shifted entirely to rendering responsiveness. If your React application blocks the main thread for more than 200ms, your SEO rankings will suffer.</p>

      <h3>Common Culprits of Poor INP</h3>
      <ul>
        <li>Heavy client-side hydration</li>
        <li>Complex animations on the main thread (use CSS transforms or GSAP!)</li>
        <li>Synchronous analytics tracking</li>
        <li>Large third-party scripts</li>
      </ul>

      <h3>Optimizing LCP with Next.js</h3>
      <p>Largest Contentful Paint is usually dictated by your hero image. Always use the <code>priority</code> prop on your hero <code>next/image</code> components:</p>
      
      <pre><code class="language-tsx">
import Image from 'next/image';

export function Hero() {
  return (
    &lt;Image
      src="/hero-cover.webp"
      alt="Platform overview"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    /&gt;
  );
}
      </code></pre>
    `,
    author: {
      name: "Sarah Jenkins",
      role: "Performance Engineer",
      avatar: "/authors/sarah.jpg",
    },
    publishDate: "2026-06-05T10:15:00Z",
    readingTime: 8,
    coverImage: "/blog/core-web-vitals.jpg",
    category: "Performance",
    tags: ["SEO", "Core Web Vitals", "Next.js", "React"],
    featured: true,
  },
  {
    id: "4",
    slug: "integrating-llms-into-production",
    title: "Architecting LLM Integrations for Production Apps",
    description:
      "Best practices for streaming AI responses, managing context windows, and keeping API costs under control in your SaaS.",
    content: `
      <h2>The Vercel AI SDK Standard</h2>
      <p>Streaming AI responses is no longer optional; it's the expected baseline UX. Using the Vercel AI SDK simplifies this process immensely.</p>
      
      <p>When architecting LLM features, always assume the API will be slow. The UI must instantly acknowledge user input, present a loading state, and gracefully handle chunked streaming.</p>

      <h3>Handling Context Windows</h3>
      <p>Don't send your entire database to the LLM. Implement Retrieval-Augmented Generation (RAG) using vector databases like Pinecone or pgvector.</p>
    `,
    author: {
      name: "Alex Mercer",
      role: "Lead AI Engineer",
      avatar: "/authors/alex.jpg",
    },
    publishDate: "2026-05-28T08:45:00Z",
    readingTime: 5,
    coverImage: "/blog/llm-production.jpg",
    category: "AI",
    tags: ["LLM", "OpenAI", "Vercel AI SDK", "RAG"],
    featured: false,
  },
  {
    id: "5",
    slug: "migrating-to-tailwind-v4",
    title: "Migrating Enterprise Apps to Tailwind CSS v4",
    description:
      "What to expect when upgrading to Tailwind v4: Lightning-fast builds, CSS variables, and zero configuration.",
    content: `
      <h2>The Oxide Engine</h2>
      <p>Tailwind v4 is a complete rewrite in Rust, resulting in builds that are up to 10x faster. The configuration file is gone, replaced entirely by CSS variables.</p>
      
      <p>This drastically simplifies how we build theming systems in React applications.</p>
    `,
    author: {
      name: "Marcus Thorne",
      role: "VP of Engineering",
      avatar: "/authors/marcus.jpg",
    },
    publishDate: "2026-05-20T11:00:00Z",
    readingTime: 3,
    coverImage: "/blog/tailwind-v4.jpg",
    category: "Development",
    tags: ["Tailwind CSS", "Frontend", "CSS"],
    featured: false,
  },
  {
    id: "6",
    slug: "zero-trust-security-cloud",
    title: "Implementing Zero Trust Architecture in AWS",
    description:
      "How to secure your cloud infrastructure by assuming internal networks are just as hostile as the public internet.",
    content: `
      <h2>Trust Nothing, Verify Everything</h2>
      <p>Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network.</p>
      
      <p>By implementing strict IAM roles, VPC endpoints, and mutual TLS between microservices, we can drastically reduce the blast radius of any potential breach.</p>
    `,
    author: {
      name: "David Chen",
      role: "Cloud Architect",
      avatar: "/authors/david.jpg",
    },
    publishDate: "2026-05-15T09:30:00Z",
    readingTime: 7,
    coverImage: "/blog/zero-trust.jpg",
    category: "Cloud",
    tags: ["AWS", "Security", "DevOps", "Infrastructure"],
    featured: false,
  },
  {
    id: "7",
    slug: "mastering-framer-motion",
    title: "Advanced Micro-Interactions with Framer Motion",
    description:
      "Elevate your React applications with physics-based animations, layout transitions, and scroll reveals.",
    content: `
      <h2>Physics > Durations</h2>
      <p>Traditional CSS transitions rely on fixed durations and easing curves. Framer Motion uses spring physics, which feel infinitely more natural and responsive to user input.</p>
      
      <p>Using <code>layoutId</code> to smoothly morph elements across different DOM hierarchies is the secret to building native-feeling web applications.</p>
    `,
    author: {
      name: "Elena Rodriguez",
      role: "Head of Design",
      avatar: "/authors/elena.jpg",
    },
    publishDate: "2026-05-02T13:20:00Z",
    readingTime: 4,
    coverImage: "/blog/framer-motion.jpg",
    category: "Design",
    tags: ["Framer Motion", "React", "Animation", "UX"],
    featured: false,
  },
  {
    id: "8",
    slug: "the-roi-of-accessibility",
    title: "The Business Case for Digital Accessibility (a11y)",
    description:
      "Why investing in WCAG compliance isn't just about avoiding lawsuits—it's about capturing a wider market and building better products.",
    content: `
      <h2>Beyond Compliance</h2>
      <p>Accessible design is good design. High contrast text, logical focus trapping, and semantic HTML benefit all users, not just those using assistive technologies.</p>
      
      <p>We've found that prioritizing keyboard navigation directly correlates with increased power-user engagement in SaaS platforms.</p>
    `,
    author: {
      name: "Sarah Jenkins",
      role: "Performance Engineer",
      avatar: "/authors/sarah.jpg",
    },
    publishDate: "2026-04-28T16:00:00Z",
    readingTime: 5,
    coverImage: "/blog/accessibility.jpg",
    category: "Business",
    tags: ["Accessibility", "WCAG", "Design", "Strategy"],
    featured: false,
  },
];
