import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  integrations: [react(), sitemap()],
  site: 'https://revly.io',
  redirects: {
    '/collect-better-reviews': '/collect-quality-reviews',
  },
})
