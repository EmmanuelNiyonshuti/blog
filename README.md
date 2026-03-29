# My personal blog web application

Moved from a fullstack Next.js + PostgreSQL, and that's what almost all the commits are about!

If you want to use this, it might be good to know that a lot of this blog was built with heavy `AI-assisted coding`, and then edited and adjusted manually as I went.
To use it, You will have to swap out the content in `posts/` `random_posts/` with your own `.md` or `.mdx` files, update the metadata (name, URLs, social links) that are scattered around the pages.

## Getting started

```bash
git clone git@github.com:EmmanuelNiyonshuti/blog.git
cd blog
npm install
npm run dev
```

## Writing posts in markdown

Drop `.md` or `.mdx` files into `posts/` or `random_posts/`. Each file needs frontmatter like this:

```md
---
title: "Your Post Title"
slug: "your-post-slug"
excerpt: "A short summary."
category: "Python"
tags: []
date: "2026-01-16"
publishedAt: "2026-01-16"
---

You put your content here.
```

Categories are derived from the `category` field.

## Stack

- Next.js 15 (App Router)
- MDX via `next-mdx-remote`
- Tailwind CSS v4
- Deployed on Vercel