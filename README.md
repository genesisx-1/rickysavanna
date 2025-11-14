# rickysavanna

A clean, minimalist portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by simple, content-focused personal websites.

## Features

- Clean, minimal design with white background and black text
- Simple navigation (About, Work, Blog, Contact)
- Projects organized by year
- Markdown-based blog posts with syntax highlighting
- Responsive design
- Fast loading static pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── work/              # Work/projects page
│   ├── about/             # About page
│   ├── blog/              # Blog listing and posts
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Header.tsx         # Site header with navigation
│   └── Footer.tsx         # Site footer
├── content/               # Markdown content files
│   ├── blog/             # Blog post markdown files
│   └── projects/         # Project markdown files
├── lib/                   # Utility functions
│   ├── posts.ts          # Blog post utilities
│   └── projects.ts       # Project utilities
└── public/                # Static assets
    └── images/           # Images for projects and blog
```

## Adding Content

### Adding a New Blog Post

1. Create a new markdown file in `content/blog/` with the format `your-post-slug.md`
2. Add frontmatter at the top:

```markdown
---
title: Your Post Title
date: 2024-01-15
excerpt: A brief excerpt of your post
---

Your post content here...
```

3. The post will automatically appear on the blog page.

### Adding a New Project

1. Create a new markdown file in `content/projects/` with the format `your-project-slug.md`
2. Add frontmatter at the top:

```markdown
---
title: Project Name
description: One-line description
year: 2024
url: https://project-url.com
github: https://github.com/username/project
image: /images/project-image.png
technologies:
  - Technology 1
  - Technology 2
---

Detailed project description...
```

3. The project will automatically appear on the work page, organized by year.

## Customization

### Colors

Edit `tailwind.config.ts` to change the link color:

```typescript
colors: {
  link: '#0066cc',        // Your link color
  'link-hover': '#004499', // Hover color
}
```

### Typography

Edit `app/globals.css` to change fonts and sizes. The site uses serif fonts by default (Georgia, Times New Roman).

### Personal Information

Update the following files with your information:

- `components/Header.tsx` - Your name in the header
- `app/page.tsx` - Homepage content
- `app/about/page.tsx` - About page content
- `app/contact/page.tsx` - Contact information
- `app/layout.tsx` - Meta tags

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to GitHub Pages

1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json`:

```json
"scripts": {
  "export": "next build && next export",
  "deploy": "npm run export && gh-pages -d out"
}
```

3. Run `npm run deploy`

## License

MIT

