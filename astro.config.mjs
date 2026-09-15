import { execSync } from 'node:child_process'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { POSTS } from './src/lib/blog.js'

// Sitemap lastmod. The sitemap listed all 17 URLs with no dates at all, so a post
// edited yesterday looked exactly like a terms page untouched since launch and
// crawlers had nothing to prioritise on.
//
// Two sources, both honest. A blog post states the date it was actually revised,
// which the post module already tracks and the page already renders. Everything
// else takes the repo's last commit date: the site is a static build deployed as a
// whole, so that IS the date the page last changed. Google ignores lastmod it finds
// untrustworthy, so a made-up per-page date would be worse than none.
const POST_LASTMOD = new Map(POSTS.map((p) => [`/blog/${p.slug}/`, p.dateModified]))

function lastCommitDate() {
  try {
    return execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim()
  } catch {
    // Shallow clone or no git (some CI checkouts) — fall back to build day.
    return new Date().toISOString().slice(0, 10)
  }
}
const SITE_LASTMOD = lastCommitDate()

export default defineConfig({
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const { pathname } = new URL(item.url)
        item.lastmod = POST_LASTMOD.get(pathname) ?? SITE_LASTMOD
        return item
      },
    }),
  ],
  site: 'https://revly.io',
  redirects: {
    '/collect-better-reviews': '/collect-quality-reviews/',
    // Merged into /collect-quality-reviews in September 2026.
    '/smart-review-requests': '/collect-quality-reviews/',
    // Never a real page, but redirected in case the URL was ever shared or indexed.
    '/slack-notifications': '/monitor-platforms/',
    // An address from an earlier version of the site. It still shows up as a Revly
    // result in Google and has been answering 404 ever since (SEO audit, Sep 2026).
    '/pricing-plans': '/pricing/',
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
