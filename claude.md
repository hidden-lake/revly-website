# Revly - Project Context for Claude

> This file provides context for Claude Code sessions working on this project.
> Last updated: January 25, 2026

## Project Overview

**Revly** is a review management platform for SaaS companies. It has two core features:

1. **Review Monitoring** - Aggregate and track reviews from multiple platforms (Shopify, QuickBooks, G2, etc.)
2. **Review Collection** - Smart review funnel that routes positive feedback to public platforms and negative feedback privately

See [SCOPE.md](./SCOPE.md) for the full product specification.

## Marketing & Brand

### Full Summary

> **Most SaaS companies are leaving reviews on the table.** Customers *want* to share feedback, but they hit friction—too many steps, too many platforms, not enough time.
>
> Revly fixes this with one smart link that handles everything. Customers share quick feedback, AI enhances it into a ready-to-post review, and we smartly guide them to post wherever you tell us it matters most—balancing reviews across platforms, prioritizing where you need them, and more. Negative feedback routes privately to your team, protecting your public ratings.
>
> Meanwhile, Revly monitors all your app store reviews automatically—helping with proactive steps like responding to reviews and giving you complete visibility across Shopify, G2, QuickBooks, and beyond.
>
> **Review collection on autopilot. Monitor and respond, effortlessly.**
>
> Simple for your customers. Effortless for your team.

### Taglines

**Primary:**
- "Review collection on autopilot. Monitor and respond, effortlessly."

**Secondary:**
- "Simple for your customers. Effortless for your team."

**One-liner options:**
- "One smart link. AI-enhanced reviews. Complete visibility."
- "Turn customer feedback into five-star reviews—automatically."
- "The all-in-one review platform for SaaS companies."

**Problem-led hook:**
- "Most SaaS companies are leaving reviews on the table."

### Tone & Voice

- **Friendly & Approachable** - conversational, warm, startup-friendly
- Avoid jargon and overly technical language in marketing
- Emphasize simplicity and automation
- Lead with outcomes, not features

### Key Differentiators (vs ReviewFlowz)

| Revly | ReviewFlowz |
|-------|-------------|
| AI-enhanced review generation | No AI enhancement |
| Product-centric organization | Flat structure |
| 6 nav items (simple) | 11 nav items (complex) |
| SaaS app store focused | Generic across industries |
| One smart link does everything | "Magic links" (buried feature) |
| Clipboard + redirect UX | Standard flow |

## Current Status

**Phase:** All scrapers complete (6/7 platforms), ready for dashboard UI
**Focus:** Dashboard UI next, then scheduled syncing
**Design:** Option B (Stripe-style) - locked in
**Database:** RDS MySQL instance live with enhanced schema (status, last_seen_at, is_verified, helpful_count)
**Reviews:** 703+ reviews synced across 6 platforms for MyWorks test data

### Scraper Status

| Platform | Status | Notes |
|----------|--------|-------|
| WordPress.org | ✅ Complete | RSS feed + HTML pagination for all reviews |
| Shopify App Store | ✅ Complete | HTML scraping, detects archived vs active reviews |
| WooCommerce | ✅ Complete | REST API (no scraping needed, 0 credits) |
| Xero | ✅ Complete | SSR JSON extraction with pagination (0 credits) |
| G2 | ✅ Complete | Turbo frame endpoint bypasses Datadome, 1 credit/page |
| QuickBooks App Store | ✅ Complete | GraphQL API discovered, gets all reviews (10 credits one-time) |
| Capterra | ❌ Blocked | 403 from all ScraperAPI configurations |

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Multi-tenant | Yes, from day 1 | Avoid architectural rework later |
| Primary database | RDS MySQL (db.t3.micro) | Cost-effective for MVP, free tier eligible |
| Database ORM | Raw mysql2 | Direct SQL, no abstraction overhead |
| Auth | AWS Cognito | Integrates with AWS stack |
| Hosting | AWS Amplify | SSR support for Next.js |
| Scraping | ScraperAPI (primary) | Best balance of features/cost for MVP |
| AI | Anthropic Claude Sonnet | Review enhancement feature |
| Payments | Stripe | Industry standard |

## Priority Platforms (for scraping)

In order of importance for initial customer (MyWorks):
1. QuickBooks App Store
2. Shopify App Store
3. Xero App Store
4. WordPress.org Plugins (has official API - easiest, start here)
5. WooCommerce.com Marketplace
6. Capterra
7. G2

## Tech Stack

```
Frontend:     Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
Backend:      Next.js API Routes / AWS Lambda
Database:     MySQL 8.0 (AWS RDS db.t3.micro)
ORM:          Raw SQL with mysql2
Cache:        Redis (ElastiCache) - future
Auth:         AWS Cognito
AI:           Anthropic Claude API
Scraping:     ScraperAPI
Email:        AWS SES
Hosting:      AWS Amplify
Billing:      Stripe
```

## AWS Resources

| Resource | ID/Name | Region | Notes |
|----------|---------|--------|-------|
| RDS Instance | revly-db | us-east-2 | db.t3.micro, MySQL 8.0 |
| Security Group | sg-0ed097541fa0119f8 | us-east-2 | Allows 3306 from dev IP |
| VPC | vpc-03efe3e881bb189aa | us-east-2 | Default VPC |

### Database Credentials
- **Instance:** revly-db
- **Username:** revly_admin
- **Database:** revly
- **Port:** 3306
- **Password:** Stored securely (see .env.local)

## Project Structure

```
/revly
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Auth pages (login, signup)
│   │   ├── (dashboard)/     # Protected dashboard pages
│   │   ├── design-preview/  # Design system preview (temporary)
│   │   └── r/[token]/       # Public review collection pages
│   ├── components/          # React components
│   │   └── ui/              # shadcn/ui components
│   ├── lib/                 # Utilities, helpers
│   │   ├── db/              # Database client & queries
│   │   │   ├── index.ts     # Connection pool & query helpers
│   │   │   └── schema.sql   # Database schema
│   │   └── scrapers/        # Platform-specific scrapers
│   │       ├── logger.ts       # Structured scraper logging utility
│   │       ├── scraper-api.ts  # ScraperAPI wrapper with render instructions
│   │       ├── wordpress.ts    # WordPress.org (RSS + HTML)
│   │       ├── shopify.ts      # Shopify App Store (archived detection)
│   │       ├── woocommerce.ts  # WooCommerce Marketplace (REST API)
│   │       ├── xero.ts         # Xero App Store (SSR JSON extraction)
│   │       ├── g2.ts           # G2 (Turbo frame endpoint)
│   │       └── quickbooks.ts   # QuickBooks App Store (SPA limited)
│   └── types/               # TypeScript types
│       └── database.ts      # Database model types
├── scripts/
│   ├── migrate.ts           # Database migration script
│   └── seed.ts              # Database seed script (MyWorks test data)
├── public/                  # Static assets
├── reference/               # Competitor screenshots, research
├── .env.example             # Environment template
├── .env.local               # Local environment (git-ignored)
├── SCOPE.md                 # Full product specification
└── claude.md                # This file
```

## Code Conventions

### General
- TypeScript strict mode
- Prefer named exports over default exports
- Use absolute imports (`@/components/...`)
- Keep components small and focused

### Naming
- Components: PascalCase (`ReviewCard.tsx`)
- Utilities/hooks: camelCase (`useReviews.ts`)
- Database tables: snake_case (`review_channels`)
- API routes: kebab-case (`/api/review-channels`)

### Database
- UUIDs for primary keys (CHAR(36))
- Timestamps: `created_at`, `updated_at`
- Soft deletes where appropriate
- JSON columns for flexible settings/metadata
- Use parameterized queries to prevent SQL injection

### Styling
- Tailwind CSS for all styling
- shadcn/ui as component foundation
- Design system: **Option B (Stripe-style)**

## Design System

**Style:** Clean, data-rich, professional (Stripe-inspired)

### Color Palette
| Token | Light Mode | Usage |
|-------|------------|-------|
| `background` | slate-50 | Page backgrounds |
| `card` | white | Cards, panels |
| `primary` | indigo-600 | Buttons, links, focus states |
| `muted` | slate-100 | Secondary backgrounds |
| `muted-foreground` | slate-500 | Secondary text |
| `border` | slate-200 | Borders, dividers |
| `destructive` | red-500 | Errors, delete actions |

### Typography
- Font: Geist Sans (default from Next.js)
- Headings: font-semibold, text-slate-900
- Body: text-slate-600
- Muted: text-slate-500

### Spacing & Sizing
- Border radius: 0.75rem (rounded-xl for cards)
- Card padding: p-5 or p-6
- Section gaps: gap-4 to gap-6
- Stat cards: text-3xl for values

### Component Patterns
- **Cards**: White bg, slate-200 border, rounded-xl, subtle shadow-sm
- **Buttons (primary)**: indigo-600 bg, white text, rounded-lg
- **Buttons (secondary)**: White bg, slate-200 border, slate-700 text
- **Badges**: Rounded-full, colored backgrounds (green-100/green-700 for platforms)
- **Sidebar nav**: Active = indigo-50 bg + indigo-700 text

## Environment Variables

```env
# Database
DATABASE_URL=mysql://revly_admin:PASSWORD@ENDPOINT:3306/revly

# AWS
AWS_REGION=us-east-2

# Scraping
SCRAPER_API_KEY=

# AI
ANTHROPIC_API_KEY=

# Stripe (Phase 2)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (Phase 2)
SES_FROM_EMAIL=
```

## NPM Scripts

```bash
npm run dev          # Start dev server on port 3002
npm run build        # Build for production
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed MyWorks test data
```

## Development Workflow

1. **Local development** - Run Next.js locally (`npm run dev`), connect to RDS
2. **Database changes** - Update `schema.sql`, run `npm run db:migrate`
3. **Testing** - Local testing, then deploy to production
4. **Deployment** - Push to main → AWS Amplify auto-deploys

No formal staging environment initially. Will add if/when needed.

## Important Context

### Why scraping first?
Scraping is the higher-risk technical challenge. Better to validate this works before building the easier review collection UI.

### MyWorks is the first customer
The founder's company (MyWorks Software) is the initial use case. They have products on QuickBooks, Shopify, Xero, WordPress, and WooCommerce app stores.

### Differentiation from ReviewFlowz
- Product-centric organization (not flat)
- Simpler UI (6 nav items vs 11)
- AI-enhanced review generation
- SaaS app store focus
- More affordable

## Session Notes

<!-- Add notes from each working session here -->

### Session 1 - January 24, 2026

**Planning & Setup:**
- Reviewed SCOPE.md and competitor screenshots (ReviewFlowz)
- Confirmed: Start with monitoring, multi-tenant from day 1, skip staging
- Design direction chosen: **Option B (Stripe-style)** - clean, data-rich, indigo accent

**Project Initialization:**
- Initialized Next.js 14 project with TypeScript, Tailwind, App Router
- Installed shadcn/ui and base components (button, card, badge, input, avatar, tabs)
- Created design preview page at `/design-preview` with 3 style options
- Updated globals.css with Option B color tokens (light + dark mode)
- Set port to 3002 to avoid conflicts

**Database Setup:**
- Chose raw mysql2 over Prisma (user prefers familiar tools)
- Chose RDS MySQL (db.t3.micro) over Aurora Serverless (cost savings)
- Created AWS security group for RDS
- Created RDS MySQL instance (revly-db) in us-east-2
- Built database connection module (`src/lib/db/index.ts`)
- Created full schema (`src/lib/db/schema.sql`)
- Created TypeScript types (`src/types/database.ts`)
- Created migration script (`scripts/migrate.ts`)

**Next Steps:**
- Wait for RDS endpoint to become available
- Run migrations to create tables
- Build WordPress.org scraper (API-based, lowest risk)
- Create minimal channels UI to test scraping

### Session 2 - January 25, 2026

**Scraper Analysis:**
- Compared ScraperAPI vs ScrapingBee vs Bright Data
- ScraperAPI confirmed as best choice for MVP ($49/month, transparent pricing)
- Discovered WordPress.org has RSS feed for reviews (no scraper needed!)

**Scraper Infrastructure Built:**
- Created seed script (`scripts/seed.ts`) - MyWorks company + 3 products
- Created API routes:
  - `GET/POST /api/channels` - List/create review channels
  - `POST /api/channels/[id]/sync` - Trigger review sync
  - `GET /api/reviews` - List reviews with filters
  - `GET /api/companies` - List companies
  - `GET /api/products` - List products by company
- Created WordPress.org scraper (`src/lib/scrapers/wordpress.ts`)
  - Uses RSS feed at `wordpress.org/support/plugin/{slug}/reviews/feed/`
  - Parses title, rating, content, author, date
  - Paginates through all pages automatically
- Created test page (`/test`) for end-to-end validation

**WordPress.org Scraper Details:**
- RSS feed returns ~30 items per page
- Successfully synced 30 reviews from MyWorks plugin
- No ScraperAPI credits needed for WordPress (free!)

**Known Limitations:**
- WordPress.org RSS may include support threads as well as reviews
- Need to investigate filtering for reviews-only

**Next Steps:**
- Build scrapers for other platforms (will need ScraperAPI)
- Build actual dashboard UI
- Set up scheduled syncing (cron/Lambda)

### Session 3 - January 25, 2026

**WordPress Scraper Enhancement:**
- Discovered RSS pagination is broken (returns same 30 reviews)
- Added `fullScrape` mode that scrapes HTML pages directly
- HTML pagination works at `/reviews/page/N/` URLs
- Two-phase approach: RSS first (full content), then HTML for all reviews
- Fixed slug extraction for both `/plugins/` and `/support/plugin/` URLs

**ScraperAPI Render Instructions:**
- Added support for browser automation (scroll, click, wait, loop)
- Created `scraper-api.ts` with `fetchWithScraperApi()` function
- Helper functions: `createScrollInstructions()`, `createLoadMoreInstructions()`
- Instructions don't add extra cost beyond render=true (10 credits)

**QuickBooks Scraper Built:**
- Created `quickbooks.ts` scraper with JS rendering
- Challenge: SPA architecture doesn't load app content properly
- ScraperAPI render returns page shell but not actual reviews
- Current workaround: Gets ~8-9 reviews from first page only
- Would need Puppeteer/Playwright for full SPA handling

**Shopify Scraper Built:**
- Created `shopify.ts` with full pagination support
- Server-side HTML (no JS rendering needed = 1 credit/page)
- Pagination via `?page=N` URL parameter
- 10 reviews per page
- **Archived Reviews Detection:**
  - Discovered Shopify has "archived" reviews that don't count toward rating
  - Reviews inside `<div id="archived-reviews-container">` are archived
  - Scraper marks archived reviews with `metadata.isArchived = true`
  - MyWorks example: 49 active + 14 archived = 63 total

**G2 Investigation:**
- Blocked by Datadome + Cloudflare anti-bot protection
- Standard ScraperAPI returns 403/empty response
- Premium ScraperAPI ($149/mo) might work
- Ultra-premium ($249/mo) recommended for G2
- Deferred for now due to cost

**API Updates:**
- `POST /api/channels/[id]/sync` now accepts options:
  - `fullScrape: boolean` - Enable full scraping mode
  - `maxPages: number` - Max pages for pagination (default: 50)
- Channel creation extracts platform identifiers from URLs

**Files Created/Modified:**
- `src/lib/scrapers/scraper-api.ts` - ScraperAPI wrapper with render instructions
- `src/lib/scrapers/quickbooks.ts` - QuickBooks App Store scraper
- `src/lib/scrapers/shopify.ts` - Shopify App Store scraper with archived detection
- `src/lib/scrapers/wordpress.ts` - Enhanced with fullScrape HTML mode
- `src/app/api/channels/[id]/sync/route.ts` - Added scraper options
- `src/app/api/channels/route.ts` - Added Shopify/QuickBooks URL parsing

**Test Data:**
- MyWorks Shopify channel: 63 reviews (49 active, 14 archived)
- MyWorks WordPress channel: 300+ reviews (with fullScrape)
- MyWorks QuickBooks channel: ~8-9 reviews (limited by SPA)

**Next Steps:**
- Build dashboard UI to visualize reviews
- Consider alternative for QuickBooks (official API? different approach?)
- Implement scheduled syncing
- Add Xero and WooCommerce scrapers

### Session 4 - January 25, 2026

**WooCommerce Scraper Built:**
- Investigated WooCommerce Marketplace structure
- Discovered WooCommerce.com has a **public REST API** for reviews
- No HTML scraping or ScraperAPI needed (0 credits)
- API endpoints:
  - Product lookup: `/wp-json/wp/v2/product?slug={slug}`
  - Reviews: `/wp-json/wc/store/v1/products/reviews?product_id={id}`
- Pagination via `X-WP-Total` and `X-WP-TotalPages` headers
- Created `woocommerce.ts` scraper using native fetch

**WooCommerce Test Results:**
- MyWorks WooCommerce channel: 14 reviews synced
- All reviews include: rating, reviewer name, date, verified status
- Metadata stores `verified` flag and avatar URL

**Files Created/Modified:**
- `src/lib/scrapers/woocommerce.ts` - New scraper using REST API
- `src/app/api/channels/[id]/sync/route.ts` - Added woocommerce case
- `src/app/api/channels/route.ts` - Added WooCommerce URL extraction

**Xero Scraper Built:**
- Investigated Xero App Store structure
- Discovered reviews are embedded as JSON in SSR HTML (`reviewState.reviews[]`)
- No JS rendering or ScraperAPI needed (0 credits)
- Created `xero.ts` scraper with JSON extraction from HTML
- Pagination support via `?page=N` URL parameter
- Handles both standard URLs (`/app/{slug}`) and collection URLs (`/collection/{collection}/app/{slug}`)

**Xero Test Results:**
- MyWorks Xero channel: 5 reviews synced
- Tested pagination with Quotient app: 138 reviews across 23 pages
- Pagination structure: `{"page":1,"pageSize":6,"pageCount":23,"itemCount":138}`

**Files Created/Modified:**
- `src/lib/scrapers/woocommerce.ts` - New scraper using REST API
- `src/lib/scrapers/xero.ts` - New scraper using SSR JSON extraction
- `src/app/api/channels/[id]/sync/route.ts` - Added woocommerce and xero cases
- `src/app/api/channels/route.ts` - Added WooCommerce and Xero URL extraction

**Scraper Cost Summary:**
| Platform | Credits/Sync |
|----------|--------------|
| WordPress.org | 0 (RSS/HTML) |
| WooCommerce | 0 (REST API) |
| Xero | 0 (SSR JSON) |
| Shopify | 1/page (HTML) |
| QuickBooks | 10 (JS render) |

**Next Steps:**
- Build dashboard UI
- Implement scheduled syncing
- Consider alternative for QuickBooks (official API? different approach?)

### Session 5 - January 25, 2026

**Capterra Investigation:**
- Tested multiple ScraperAPI configurations against Capterra
- Configurations tested: Standard, Render, Premium, Premium+Render, Premium+Render+US geotargeting
- All configurations returned **403 Forbidden**
- Capterra appears to have aggressive anti-bot protection that blocks all proxy attempts
- **Decision:** Capterra deferred - not feasible with current ScraperAPI setup

**G2 Investigation & Breakthrough:**
- Initial tests showed Datadome challenge page on main G2 URLs
- **Key Discovery:** G2 uses Turbo frames (Hotwire) to load reviews dynamically
- The Turbo frame endpoint bypasses Datadome protection entirely!
- Endpoint: `https://www.g2.com/products/{slug}/reviews_and_filters?page=N`
- Works with **standard ScraperAPI** (1 credit per page) - no premium or render needed

**G2 Scraper Built:**
- Created `g2.ts` scraper using Turbo frame endpoint
- Reviews parsed using `itemprop="review"` Schema.org markup as split marker
- Extracts: rating, reviewer name, company size, industry, "like best", "dislike", "problems solved"
- Pagination via `?page=N` parameter
- Review text combines all sections into formatted content
- Metadata stores structured fields (companySize, industry, likeBest, dislike, problemsSolved)

**G2 Parsing Approach:**
- Initial regex patterns didn't match reliably
- Solution: Split HTML by `itemprop="review"` to isolate review blocks
- Extract review ID from `{product_slug}-review-{id}` pattern
- Extract rating from `X/5</label>` pattern
- Clean G2 attribution text ("Review collected by and hosted on G2.com.")

**Files Created/Modified:**
- `src/lib/scrapers/g2.ts` - New G2 scraper using Turbo frame endpoint
- `src/app/api/channels/[id]/sync/route.ts` - Added G2 import and case
- `src/app/api/channels/route.ts` - Added G2 URL extraction

**Updated Scraper Cost Summary:**
| Platform | Credits/Sync |
|----------|--------------|
| WordPress.org | 0 (RSS/HTML) |
| WooCommerce | 0 (REST API) |
| Xero | 0 (SSR JSON) |
| Shopify | 1/page (HTML) |
| G2 | 1/page (Turbo frame) |
| QuickBooks | 10 (JS render) |
| Capterra | ❌ Blocked |

**Final Scraper Status:**
| Platform | Status | Approach |
|----------|--------|----------|
| WordPress.org | ✅ Complete | RSS feed + HTML pagination |
| Shopify App Store | ✅ Complete | HTML scraping with archived detection |
| WooCommerce | ✅ Complete | REST API (0 credits) |
| Xero | ✅ Complete | SSR JSON extraction (0 credits) |
| G2 | ✅ Complete | Turbo frame endpoint (1 credit/page) |
| QuickBooks App Store | ⚠️ Partial | SPA limits to ~8 reviews |
| Capterra | ❌ Blocked | 403 from all configurations |

**Next Steps:**
- Build dashboard UI
- Implement scheduled syncing
- Consider Puppeteer/Playwright for QuickBooks full scraping

### Session 6 - January 25, 2026

**G2 Scraper Testing & Rating Fix:**
- Created G2 channel for MyWorks Sync product
- Initial sync: 77 reviews (matches G2 page count)
- Rating distribution was off: 71 five-star vs G2's 67

**Root Cause:**
- Original regex `(\d)\/5<\/label>` only matched single digits
- G2 uses decimal ratings (e.g., "2.5/5") stored in Schema.org metadata
- Reviews with unmatched ratings defaulted to 5 stars

**Fix Applied:**
- Extract rating from `<meta content="X" itemprop="ratingValue">` (Schema.org)
- Use `Math.round()` for decimal ratings (2.5 → 3)
- Fallback to visible label pattern for edge cases

**After Fix - Exact Match:**
| Rating | G2 Shows | Scraped |
|--------|----------|---------|
| 5 stars | 67 | 67 ✓ |
| 4 stars | 8 | 8 ✓ |
| 3 stars | 1 | 1 ✓ |
| 2 stars | 0 | 0 ✓ |
| 1 star | 1 | 1 ✓ |

**G2 Scraper Now Production-Ready:**
- 77 reviews synced for MyWorks Sync
- Accurate ratings via Schema.org metadata
- Captures: reviewer name, company size, industry, like/dislike/problems sections

**Next Steps:**
- Investigate Capterra alternatives (different scraping service?)
- Build dashboard UI
- Implement scheduled syncing

### Session 7 - January 25, 2026

**Capterra Deep Investigation:**
- ScraperAPI advertises Capterra support with `ultra_premium` tier
- Tested: Our $49/month plan doesn't include ultra_premium (requires $149+/month)
- Tested direct endpoints without proxy - all return 403:
  - Main reviews page
  - API endpoint guesses (`/api/v1/products/`, `/api/products/`)
  - GraphQL endpoint
  - RSS feed guesses
  - Widget/embed endpoints

**Key Finding - Reviews ARE Server-Rendered:**
- User confirmed reviews appear in View Page Source HTML
- No JavaScript rendering needed
- Clear HTML structure with parseable selectors:
  - Rating: `<span class="sr2r3oj">4.0</span>`
  - Title: `<h3 class="typo-20 font-semibold">"Review Title"</h3>`
  - Reviewer: `<span class="typo-20 text-neutral-99 font-semibold">Name</span>`
  - Pros/Cons: Inside `<span>Pros</span>` / `<span>Cons</span>` sections
- The ONLY blocker is anti-bot protection, not page structure

**Alternative Investigated - Crawlbase:**
- Different proxy service with 1,000 free requests
- Specifically handles "advanced anti-bot systems"
- Could be viable alternative to ScraperAPI ultra_premium

**Decision: Skip Capterra for MVP**
- Capterra is #7 priority (lowest)
- MyWorks only has ~7 reviews there
- Would require either:
  - Crawlbase integration (new service, added complexity)
  - ScraperAPI upgrade (+$100/month)
- Not worth it for MVP - revisit post-launch

**Final MVP Scraper Status:**
| Platform | Status | Reviews | Credits |
|----------|--------|---------|---------|
| WordPress.org | ✅ Complete | 300+ | 0 (RSS/HTML) |
| Shopify App Store | ✅ Complete | 63 | 1/page |
| WooCommerce | ✅ Complete | 14 | 0 (REST API) |
| Xero | ✅ Complete | 5 | 0 (SSR JSON) |
| G2 | ✅ Complete | 77 | 1/page |
| QuickBooks | ⚠️ Partial | ~8 | 10 (JS render) |
| Capterra | ❌ Skipped | 7 | N/A |

**Total: 467+ reviews across 6 platforms for MyWorks**

**Next Steps:**
- Build dashboard UI to visualize reviews
- Implement scheduled syncing (cron/Lambda)
- Consider Puppeteer for QuickBooks improvement post-MVP

### Session 8 - January 25, 2026

**Schema Improvements for Review Lifecycle Tracking:**

Before diving into QuickBooks investigation, added important data architecture improvements:

**New Database Columns Added to `reviews` table:**
| Column | Type | Purpose |
|--------|------|---------|
| `status` | `ENUM('active', 'archived', 'removed')` | Track review lifecycle |
| `last_seen_at` | `TIMESTAMP` | Updated on every sync - enables detecting removed reviews |
| `is_verified` | `BOOLEAN` | Consistent verified purchase/user tracking |
| `helpful_count` | `INT` | Track engagement/helpful votes |

**Rationale:**
- `status` replaces `metadata.isArchived` with a proper queryable field
- `last_seen_at` allows detecting reviews that were removed from platforms (if not seen in 2-3 syncs, mark as removed)
- `is_verified` standardizes verified tracking across platforms (WooCommerce, G2 provide this)
- `helpful_count` captures engagement metrics (Xero provides helpful vote count)

**Structured Scraper Logger Created:**
- New file: `src/lib/scrapers/logger.ts`
- Provides timestamped, contextual logging across all scrapers
- Features:
  - `log.info()`, `log.warn()`, `log.error()`, `log.debug()`
  - `log.time()` - measure operation durations
  - `log.pageFetched()` - consistent page fetch logging
  - `log.syncSummary()` - standardized completion summary
- Can be controlled via `SCRAPER_LOG_LEVEL` environment variable

**All 6 Scrapers Updated:**
| Scraper | Fields Now Populated |
|---------|---------------------|
| Shopify | `status` (active/archived), `last_seen_at` |
| G2 | `status`, `last_seen_at`, `is_verified` (from "Verified User") |
| WooCommerce | `status`, `last_seen_at`, `is_verified` (API provides this) |
| Xero | `status`, `last_seen_at`, `helpful_count` (from helpfulVoteCount) |
| WordPress | `status`, `last_seen_at` |
| QuickBooks | `status`, `last_seen_at` |

**Files Created/Modified:**
- `src/lib/db/schema.sql` - Added 4 new columns + index on status
- `src/types/database.ts` - Added `ReviewStatus` type, updated `Review` interface
- `scripts/migrate-add-review-fields.ts` - Migration script for existing tables
- `src/lib/scrapers/logger.ts` - New structured logger utility
- `src/lib/scrapers/shopify.ts` - Logger + new fields
- `src/lib/scrapers/g2.ts` - Logger + new fields + isVerified detection
- `src/lib/scrapers/woocommerce.ts` - Logger + new fields (verified from API)
- `src/lib/scrapers/xero.ts` - Logger + new fields (helpful_count from API)
- `src/lib/scrapers/wordpress.ts` - New fields
- `src/lib/scrapers/quickbooks.ts` - Logger + new fields

**Migration Results:**
- 197 existing reviews updated with `last_seen_at` and `status = 'active'`
- New index `idx_reviews_status` added for efficient filtering

**Next Steps:**
- Investigate QuickBooks App Store blocker in depth
- Build dashboard UI
- Implement scheduled syncing

### Session 9 - January 25, 2026

**QuickBooks App Store - BREAKTHROUGH!**

**The Problem:**
- QuickBooks uses a Single Page Application (SPA) architecture
- ScraperAPI JS rendering only returned ~8 reviews (first render)
- Scrolling/clicking via render instructions didn't load more reviews
- Reviews were being loaded dynamically via GraphQL API

**Discovery Process:**
1. User inspected Network tab in browser DevTools
2. Found GraphQL request to `https://reviews.api.intuit.com/v4/graphql`
3. The API returns ALL review data as JSON!

**Key Technical Findings:**
1. **Public GraphQL API**: `https://reviews.api.intuit.com/v4/graphql`
2. **Public API Key**: `prdakyresH8WJPaZ8svg3j4ze0P28uhbo9mAxINZ` (embedded in page, not user-specific)
3. **App Database ID**: Each app has a unique `data-dbid` attribute in the HTML (e.g., `b7r9euqh4x`)
4. **Review Summary ID Pattern**: `{base64_prefix}:{app_dbid}`
   - Prefix: `djQuMTpiN3M5NTd4OW1hOjBhOGEyMzY3ZGY` (base64 of `v4.1:b7s957x9ma:0a8a2367df`)
   - This prefix appears to be constant for all QuickBooks apps

**New Scraper Approach:**
1. Fetch app page with JS rendering (10 credits) to extract `data-dbid`
2. Construct review summary ID: `{prefix}:{dbid}`
3. Query GraphQL API directly with pagination (0 credits!)
4. Parse JSON response instead of HTML

**Results:**
| Before | After |
|--------|-------|
| ~8 reviews | **244 reviews** |
| HTML parsing (unreliable) | JSON parsing (reliable) |
| No developer responses | Developer responses captured |
| No recommendation data | Recommendation status captured |

**API Returns:**
- `id`, `title`, `text`, `rating`, `submissionDate`
- `reviewerAlias`, `reviewerLocation`
- `comments[]` - Developer responses
- `recommended` - Whether reviewer recommends

**Files Modified:**
- `src/lib/scrapers/quickbooks.ts` - Complete rewrite using GraphQL API
- `src/app/api/channels/[id]/sync/route.ts` - Updated options (maxReviews instead of fullScrape/scrollCount)

**Test Results:**
```
Total reviews: 244
Average rating: 4.549
Sample review: [5/5] "Continuous improvements" by CharlesBisaillon
```

**Final Scraper Cost Summary:**
| Platform | Credits/Sync |
|----------|--------------|
| WordPress.org | 0 (RSS/HTML) |
| WooCommerce | 0 (REST API) |
| Xero | 0 (SSR JSON) |
| Shopify | 1/page (HTML) |
| G2 | 1/page (Turbo frame) |
| QuickBooks | **10 one-time** + 0 for API calls |
| Capterra | ❌ Blocked |

**ALL SCRAPERS NOW COMPLETE!**
| Platform | Status | Reviews | Credits |
|----------|--------|---------|---------|
| WordPress.org | ✅ Complete | 300+ | 0 |
| QuickBooks | ✅ Complete | **244** | 10 one-time |
| Capterra | ❌ Blocked | **111** | N/A |
| G2 | ✅ Complete | 77 | 1/page |
| Shopify App Store | ✅ Complete | 63 | 1/page |
| WooCommerce | ✅ Complete | 14 | 0 |
| Xero | ✅ Complete | 5 | 0 |

**Total: 703+ reviews across 6 working platforms for MyWorks**
(+111 on Capterra blocked by anti-bot protection)

**Capterra Note:**
- Has 111 reviews (3rd highest count) - more valuable than initially thought
- Blocked by aggressive anti-bot protection (all ScraperAPI configs return 403)
- Options for post-MVP: Crawlbase free tier or ScraperAPI Ultra Premium ($149+/month)

**Next Steps:**
- Build dashboard UI to visualize reviews
- Implement scheduled syncing (cron/Lambda)
