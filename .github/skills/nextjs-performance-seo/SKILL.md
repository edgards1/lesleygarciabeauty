---
name: nextjs-performance-seo
description: "Use when: optimize Next.js performance or SEO, improve Core Web Vitals, reduce bundle size, or audit loading/metadata. Keywords: performance, seo, lighthouse, core web vitals, Next.js optimizacion."
---

# Next.js Performance and SEO

## Goal
Identify and apply safe performance and SEO improvements for Next.js (App Router).

## Checklist
- Metadata: ensure `app/layout.tsx` exports proper `metadata` values.
- Images: prefer `next/image` for hero/portfolio media.
- Dynamic loading: split heavy sections with `dynamic()` when suitable.
- Fonts: use `next/font` and avoid large font files.
- CSS: keep Tailwind usage minimal in critical above-the-fold sections.
- JS: remove unused UI components and avoid unused deps.

## Guardrails
- Do not change public URLs or SEO titles without explicit approval.
- Avoid removing analytics/tracking without confirmation.

## Output
- Prioritized list of changes with file locations.
- Optional quick wins and longer-term improvements.
