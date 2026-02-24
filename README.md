# Cosmic Blog

![Cosmic Blog](https://imgix.cosmicjs.com/c6427280-112d-11f1-9d0e-b53b97dc6163-photo-1555066931-4365d14bab8c-1771902371794.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, beautifully designed blog platform built with **Next.js 16** and powered by [Cosmic](https://www.cosmicjs.com). Browse posts by category, discover authors, and enjoy rich markdown content — all rendered server-side for blazing-fast performance.

## Features

- 📝 **Dynamic Blog Posts** — Markdown content with rich typography via `@tailwindcss/typography`
- ✍️ **Author Profiles** — Dedicated pages with bio, photo, and social links
- 🏷️ **Category Pages** — Filter and browse posts by category
- 🚀 **Server-Side Rendering** — Next.js 16 App Router with Server Components
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- 🖼️ **Image Optimization** — Crisp retina images via imgix query parameters
- 🎨 **Clean Design** — Minimalist editorial layout with Inter font

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=699ce84622395ada296b536a&clone_repository=699d382ed2eb457b349f023e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown support

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+) or Node.js (v18+)
- A [Cosmic](https://www.cosmicjs.com) account with blog content

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cosmic-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching all posts with depth
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a single post by slug
```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching authors
```typescript
const { objects: authors } = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This blog is fully integrated with Cosmic's headless CMS. Content is organized into three object types:

| Object Type | Description | Key Fields |
|-------------|-------------|------------|
| **Posts** 📝 | Blog articles | content (markdown), featured_image, author, category |
| **Authors** ✍️ | Writer profiles | name, bio, profile_photo, social_link |
| **Categories** 🏷️ | Content groupings | name, description |

Posts are connected to Authors and Categories via object relationship metafields. Using `depth(1)` in queries automatically resolves these relationships.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->