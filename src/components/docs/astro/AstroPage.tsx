import React from "react";
import { TextBlock } from "../../tools/TextBlock";
import { CodeSnippet } from "../../tools/CodeSnippet";
import { Quiz } from "../../tools/Quiz";
import { Resources } from "../../tools/Resources";
import { MermaidDiagram } from "../../tools/MermaidDiagram";

const AstroPage: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h1 className='text-4xl font-bold mb-8 text-white'>
        Astro: The Web Framework for Content-Driven Websites
      </h1>

      <TextBlock
        header="The Problem Space: JavaScript Bloat in Content-Heavy Websites"
        text="Modern web development has led to JavaScript bundle sizes growing exponentially, often delivering hundreds of kilobytes of unused code to users. Content-driven websites like blogs, documentation sites, and marketing pages suffer from this 'JavaScript tax' - loading entire React/Vue applications for pages that are primarily static content.

**Key challenges Astro addresses:**

- **Bundle Size Inflation**: Traditional SPAs ship framework code even for static pages
- **Performance Degradation**: Heavy JavaScript impacts Core Web Vitals and user experience
- **SEO and Accessibility**: Client-side rendering delays content availability to search engines and screen readers
- **Developer Complexity**: Framework lock-in and steep learning curves for simple content sites
- **Build Performance**: Complex bundling and optimization processes for static content

Astro introduces a fundamentally different approach: **islands of interactivity** in a sea of static HTML, allowing developers to build fast, content-focused websites without sacrificing modern development features."
      />

      <MermaidDiagram
        diagramPath="/diagrams/astro-architecture.mmd"
        caption="Astro's island architecture showing selective hydration and static generation"
      />

      <TextBlock
        header="Conceptual Architecture: Islands of Interactivity"
        text="Astro's architecture centers on **component islands** - isolated, interactive components surrounded by static HTML. This approach fundamentally differs from traditional single-page applications by treating interactivity as an enhancement rather than a requirement.

**Core Architectural Principles:**

1. **Server-First Rendering**: Pages are rendered to HTML on the server by default, eliminating client-side JavaScript for static content

2. **Selective Hydration**: Interactive components are hydrated independently, only when and where needed

3. **Framework Agnosticism**: Use any UI framework (React, Vue, Svelte, Solid) or none at all with Astro components

4. **File-Based Routing**: Pages are created by placing `.astro` files in the `src/pages/` directory

5. **Content Collections**: Type-safe content management with automatic TypeScript generation

**Build System Integration:**

- **Vite-Powered**: Leverages Vite's fast development server and optimized production builds
- **Asset Optimization**: Automatic image optimization, CSS processing, and font loading
- **Deployment Flexibility**: Output formats include static sites, server-side rendering, and edge functions

This architecture enables **zero-JavaScript websites by default**, with progressive enhancement through client directives like `client:load`, `client:idle`, and `client:visible`."
      />

      <CodeSnippet
        language="javascript"
        fileName="astro.config.mjs"
        code={`import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static', // 'static' | 'server' | 'hybrid'
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});`}
      />

      <TextBlock
        header="Practical Implementation: Building Content-Driven Sites"
        text="Astro excels at building content-heavy websites with minimal JavaScript overhead. The development workflow combines familiar web technologies with powerful content management features.

**Project Structure and Conventions:**

- **`src/pages/`**: File-based routing with `.astro`, `.md`, `.mdx` files
- **`src/components/`**: Reusable components with framework mixing support
- **`src/layouts/`**: Page templates with shared structure
- **`src/content/`**: Type-safe content collections with schema validation
- **`public/`**: Static assets served at root path

**Content Collections API:**

Astro's content collections provide type-safe content management with automatic schema validation and TypeScript generation. Collections are defined in `src/content/config.ts` and content is stored in `src/content/[collection]/` directories.

**Build Output Options:**

- **Static Generation** (`output: 'static'`): Pre-built HTML files for maximum performance
- **Server-Side Rendering** (`output: 'server'`): Dynamic rendering with adapters for various platforms
- **Hybrid Rendering** (`output: 'hybrid'`): Mix of static and dynamic pages

**Client Directives for Interactivity:**

- `client:load`: Immediate hydration on page load
- `client:idle`: Hydration after page becomes idle
- `client:visible`: Hydration when component enters viewport
- `client:media`: Hydration based on media queries
- `server:defer`: Server islands with fallback content

This approach enables developers to build sophisticated websites that perform like static sites while retaining the flexibility of modern web frameworks."
      />

      <CodeSnippet
        language="astro"
        fileName="src/pages/blog/[...slug].astro"
        code={`---
// Dynamic route for blog posts
import { getCollection } from 'astro:content';
import Layout from '../../layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  return blogEntries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<Layout title={entry.data.title}>
  <article class="prose prose-lg max-w-none">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {entry.data.title}
      </h1>
      <p class="text-gray-600 text-lg">
        {entry.data.description}
      </p>
      <time class="text-sm text-gray-500">
        {entry.data.publishDate.toLocaleDateString()}
      </time>
    </header>

    <!-- Rendered content from Markdown/MDX -->
    <Content />
  </article>

  <!-- Interactive comment component (React island) -->
  <div class="mt-12">
    <Comments client:load postId={entry.data.postId} />
  </div>
</Layout>`}
      />

      <Quiz
        title="Understanding Astro's Island Architecture"
        question={{
          question:
            "What is the primary advantage of Astro's island architecture over traditional single-page applications?",
          options: [
            { id: "A", text: "It eliminates the need for HTML entirely" },
            { id: "B", text: "It allows selective hydration, shipping zero JavaScript by default for static content" },
            { id: "C", text: "It forces all components to be interactive" },
            { id: "D", text: "It requires every page to be server-side rendered" },
          ],
          correctAnswer: "B",
          explanation:
            "Astro's island architecture allows components to be selectively hydrated, meaning static content ships as pure HTML/CSS without JavaScript, while interactive components are hydrated independently. This results in dramatically smaller bundle sizes and better performance for content-driven sites.",
        }}
      />

      <TextBlock
        header="Advanced Features: Content Collections and Type Safety"
        text="Astro's Content Collections API provides a powerful, type-safe way to manage content with automatic validation and TypeScript integration. This feature transforms content management from error-prone file operations to a robust, developer-friendly system.

**Schema Definition:**

Content collections use Zod schemas to define content structure, enabling runtime validation and automatic TypeScript type generation. This ensures content integrity and provides excellent developer experience with full IntelliSense support.

**Content Organization:**

Collections are stored in `src/content/[collection]/` directories, supporting Markdown, MDX, and JSON formats. Each collection can have its own schema, allowing for flexible content modeling.

**Query and Rendering:**

The `getCollection()` and `getEntry()` functions provide efficient content querying with filtering and sorting capabilities. Content is rendered using the `.render()` method, which processes frontmatter and returns the content body.

**Integration Ecosystem:**

Astro's adapter system enables deployment to various platforms including Netlify, Vercel, Cloudflare, and traditional servers. Integrations extend functionality with React, Vue, Tailwind CSS, and specialized tools for images, fonts, and SEO.

**Performance Optimization:**

Built-in optimizations include automatic image processing, CSS optimization, font loading strategies, and critical resource hints. The build system analyzes dependencies to minimize bundle sizes and optimize loading performance.

This combination of features makes Astro particularly well-suited for documentation sites, blogs, marketing pages, and any content-heavy application where performance and developer experience are paramount."
      />

      <CodeSnippet
        language="typescript"
        fileName="src/content/config.ts"
        code={`import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content', // 'content' for Markdown/MDX, 'data' for JSON/YAML
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
  }),
});

// Product collection schema
const productCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    features: z.array(z.string()),
    category: z.enum(['software', 'hardware', 'service']),
  }),
});

export const collections = {
  blog: blogCollection,
  products: productCollection,
};`}
      />

      <Quiz
        title="Astro Content Collections"
        question={{
          question:
            "What is the primary benefit of using Astro's Content Collections API over traditional file-based content management?",
          options: [
            { id: "A", text: "It automatically generates HTML from content files" },
            { id: "B", text: "It provides type-safe content with schema validation and automatic TypeScript generation" },
            { id: "C", text: "It eliminates the need for frontmatter in Markdown files" },
            { id: "D", text: "It converts all content to JSON format automatically" },
          ],
          correctAnswer: "B",
          explanation:
            "Content Collections provide type safety through Zod schemas, enabling automatic TypeScript generation, runtime validation, and excellent developer experience with IntelliSense. This prevents content-related bugs and provides compile-time guarantees about content structure.",
        }}
      />

      <Resources
        title="Essential Astro Resources"
        links={[
          {
            title: "Official Astro Documentation",
            url: "https://docs.astro.build/",
            description:
              "Comprehensive documentation covering all Astro features, guides, and API references",
          },
          {
            title: "Astro Tutorial",
            url: "https://docs.astro.build/en/tutorial/0-introduction/",
            description: "Step-by-step tutorial for building your first Astro website",
          },
          {
            title: "Astro Islands Guide",
            url: "https://docs.astro.build/en/concepts/islands/",
            description:
              "Deep dive into Astro's island architecture and selective hydration",
          },
          {
            title: "Content Collections",
            url: "https://docs.astro.build/en/guides/content-collections/",
            description: "Guide to using Astro's type-safe content management system",
          },
          {
            title: "Astro Integrations",
            url: "https://docs.astro.build/en/guides/integrations-guide/",
            description: "Official and community integrations for extending Astro functionality",
          },
          {
            title: "Astro Discord Community",
            url: "https://astro.build/chat",
            description:
              "Active community forum for questions, discussions, and getting help",
          },
          {
            title: "Awesome Astro",
            url: "https://github.com/one-aalam/awesome-astro",
            description:
              "Curated list of Astro resources, themes, tools, and integrations",
          },
        ]}
      />
    </div>
  );
};

export default AstroPage;
