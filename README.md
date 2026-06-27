# Revly Marketing Website

Marketing site for [Revly](https://revly.io) — the review management platform for software companies.

**Live at:** https://revly.io

## How it works

A React single-page app with no build step. React, ReactDOM, and Babel are loaded
from a CDN, and the `.jsx` files are compiled in the browser. Routing uses real,
crawlable paths (not hash URLs) via a small custom router in `router.jsx`.

Because GitHub Pages has no server-side rewrites, deep links are handled with the
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique: `404.html`
bounces any unknown path to the app root with the path in a query string, and a small
script in `index.html` restores the real URL before the router runs.

## Pages

| Page | Path | Source |
|------|------|--------|
| Home | `/` | `home.jsx` |
| Pricing | `/pricing` | `app.jsx` |
| Collect Quality Reviews | `/collect-quality-reviews` | `products.jsx` |
| Monitor Platforms | `/monitor-platforms` | `products.jsx` |
| Smart Review Requests | `/smart-review-requests` | `products.jsx` |
| Manage Review Responses | `/manage-review-responses` | `products.jsx` |
| SaaS use case | `/use-cases/saas` | `usecases.jsx` |
| Agencies use case | `/use-cases/agencies` | `usecases.jsx` |
| Privacy Policy | `/privacy` | `legal.jsx` |
| Terms of Service | `/terms` | `legal.jsx` |

`/collect-better-reviews` is kept as an alias of `/collect-quality-reviews` (same page).
It is intentionally left out of the sitemap to avoid duplicate URLs.

## Tech stack

- **React 18** — loaded from unpkg CDN, no bundler
- **Babel standalone** — compiles `.jsx` in the browser
- **GSAP + ScrollTrigger** — scroll animations
- **Fonts** — Bricolage Grotesque (display) and DM Sans (body)
- **Hosting** — GitHub Pages with custom domain (`revly.io` via `CNAME`)

## SEO

- `sitemap.xml` — real, indexable page URLs
- `robots.txt` — allows all, points to the sitemap
- `404.html` + `index.html` restore script — makes deep links work and indexable
- Per-page canonical, title, and description set on route change (`usePageMeta` in `components.jsx`)
- JSON-LD structured data (SoftwareApplication + FAQPage on pricing)
- Open Graph + Twitter Card tags in `index.html`

## Brand

Magenta (`#F0047F`) primary, Bricolage Grotesque + DM Sans. The full brand spec
(colors, type, logo, voice) lives in [BRAND_UPDATE_PLAN.md](./BRAND_UPDATE_PLAN.md).
Styling is hand-written CSS in `styles.css` plus the per-feature CSS files, not Tailwind.

## File structure

```
revly-website/
├── index.html              # SPA shell + meta + script loads
├── 404.html                # GitHub Pages SPA fallback
├── router.jsx              # Custom history router
├── app.jsx                 # Root app, routes, Pricing, 404
├── components.jsx          # Navbar, Footer, hooks, shared UI
├── home.jsx                # Homepage
├── products.jsx            # Four feature pages
├── usecases.jsx            # SaaS + Agencies use cases
├── legal.jsx               # Privacy + Terms
├── feature-*.jsx / *.css   # Feature page sections
├── usecase-*.jsx / *.css   # Use case page sections
├── reveals.jsx             # Scroll reveal helpers
├── styles.css              # Global styles
├── assets/                 # Logos and brand images
├── logos/                  # Platform logo assets
├── sitemap.xml             # XML sitemap
├── robots.txt              # Robots file
├── CNAME                   # Custom domain
├── BRAND_UPDATE_PLAN.md    # Brand spec
└── claude.md               # Product context for AI assistants
```

`blog.jsx` exists but is not wired into routes or navigation (blog was excluded from the
redesign). Leave it out of the sitemap until it ships.

## Development

No build step. Because routing uses real paths, you need a local server that falls back
to `index.html` for unknown routes (a plain static server will 404 on deep links, though
the homepage still works and client-side navigation from there is fine):

```bash
npx serve . -s        # the -s flag serves index.html for any path
```

## Deployment

Push to `main` → GitHub Pages auto-deploys to `revly.io`.
