# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbo (Next.js)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-sitemap` - Generate sitemap using scripts/generate-sitemap.js
- `npm run generate-rss` - Generate RSS feeds using scripts/generate-rss.js

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4, Shadcn UI components
- **Content**: Content Collections for blog post management
- **Language**: TypeScript with React 19
- **Animations**: Framer Motion
- **Comments**: Giscus (GitHub Discussions)

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components
  - `ui/` - Shadcn UI components
  - `icons/` - Custom icon components  
  - `header/` - Header/navigation components
- `src/content/blog/` - Blog posts (Markdown/MDX files)
- `src/lib/` - Utilities and configuration
- `src/hooks/` - Custom React hooks
- `scripts/` - Build and generation scripts

### Key Files
- `src/lib/config.ts` - Centralized site configuration (SEO, social, author info)
- `content-collections.ts` - Blog content schema and transformation
- `components.json` - Shadcn UI configuration
- `.cursorrules` - Code style preferences for AI assistants

### Content Management
Blog posts are managed through Content Collections:
- Posts stored in `src/content/blog/` as Markdown files
- Schema defined in `content-collections.ts` with required frontmatter:
  - `title` (string)
  - `date` (string) 
  - `updated` (optional string)
  - `featured` (optional boolean)
  - `summary` (optional string)
  - `keywords` (optional string array)

### Configuration System
All site settings centralized in `src/lib/config.ts`:
- Site metadata (title, description, URLs)
- Author information
- Social media links
- SEO settings (OpenGraph, Twitter cards)
- RSS feed configuration
- Giscus comments setup
- Navigation menu structure

### Styling Approach
- Tailwind CSS v4 with custom font (LXGW WenKai Lite)
- Shadcn UI component library
- Custom CSS animations with Framer Motion
- Mobile-first responsive design

## Code Style (from .cursorrules)
- Latest stable versions of React, TypeScript, Next.js
- Focus on clear, readable code
- Use Shadcn UI and Tailwind CSS
- Implement complete features as requested