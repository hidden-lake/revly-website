import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  integrations: [react(), sitemap()],
  site: 'https://revly.io',
  redirects: {
    '/collect-better-reviews': '/collect-quality-reviews/',
    // Merged into /collect-quality-reviews in September 2026.
    '/smart-review-requests': '/collect-quality-reviews/',
    // Never a real page, but redirected in case the URL was ever shared or indexed.
    '/slack-notifications': '/monitor-platforms/',
    // The seven posts removed in August 2026. GitHub Pages cannot serve a 301, so
    // Astro emits a noindex meta-refresh page carrying a canonical to the target.
    // Search engines follow it; it is just slower than a real redirect.
    '/blog/why-most-software-companies-fail-at-reviews': '/blog/',
    '/blog/ai-drafted-reviews-honest-or-not': '/blog/',
    '/blog/g2-vs-capterra-vs-trustpilot': '/blog/',
    '/blog/respond-to-reviews-aeo': '/blog/',
    '/blog/the-quietly-unhappy-customer': '/blog/',
    '/blog/review-incentives-what-works': '/blog/',
    '/blog/first-50-reviews': '/blog/',
  },
})
