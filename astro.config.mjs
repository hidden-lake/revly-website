import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  integrations: [react()],
  site: 'https://revly.io',
  redirects: {
    '/collect-better-reviews': '/collect-quality-reviews',
  },
})
