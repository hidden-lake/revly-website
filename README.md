# Revly Marketing Website

Marketing site for [Revly](https://revly.io) — the AI-powered review management platform.

**Live at:** https://revly.io

## Pages

| Page | Path | Description |
|------|------|-------------|
| Homepage | `/` | Hero, how it works, feature highlights, stats, CTA |
| Features | `/features.html` | Detailed feature breakdown (Collect, Monitor, Respond, Track) |
| Pricing | `/pricing.html` | Free early access + planned tiers with FAQ |
| SaaS | `/use-cases/saas.html` | SaaS app store review management |
| E-commerce | `/use-cases/ecommerce.html` | Online store review collection |
| Agencies | `/use-cases/agencies.html` | Multi-client review management |
| Local Business | `/use-cases/local-business.html` | Reputation management for local businesses |
| Privacy Policy | `/privacy.html` | Privacy policy |
| Terms of Service | `/terms.html` | Terms of service |

## Tech Stack

- **HTML** — Plain static HTML, no build step
- **Tailwind CSS** — Via CDN (`cdn.tailwindcss.com`)
- **Inter** — Google Fonts
- **Hosting** — GitHub Pages with custom domain (`revly.io`)

## SEO

- `sitemap.xml` — All 9 pages with priorities
- `robots.txt` — Points to sitemap
- JSON-LD structured data (Organization, WebSite, SoftwareApplication on homepage; FAQPage on pricing)
- Open Graph + Twitter Card meta tags on all pages
- Canonical URLs on all pages

## File Structure

```
revly-website/
├── index.html              # Homepage
├── features.html           # Features page
├── pricing.html            # Pricing page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── use-cases/
│   ├── saas.html           # SaaS use case
│   ├── ecommerce.html      # E-commerce use case
│   ├── agencies.html       # Agencies use case
│   └── local-business.html # Local business use case
├── logos/                  # Platform logo assets
├── sitemap.xml             # XML sitemap
├── robots.txt              # Robots file
├── CNAME                   # Custom domain config
└── claude.md               # AI assistant context
```

## Design System

- **Primary color:** Indigo-600 (`#4f46e5`)
- **Font:** Inter
- **Headings:** `text-slate-900`, `font-bold`
- **Body text:** `text-slate-600`
- **Cards:** White bg, `border-slate-200`, `rounded-2xl`, `shadow-lg`
- **Alt sections:** `bg-slate-50`
- **Footer:** `bg-slate-900`
- **Badges:** Green (Collect), Blue (Monitor), Purple (Respond), Amber (Track)

## Development

No build step needed. Open any HTML file directly in a browser, or use a local server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

## Deployment

Push to `main` → GitHub Pages auto-deploys to `revly.io`.
