# Revly

**Review collection on autopilot. Monitor and respond, effortlessly.**

Most SaaS companies are leaving reviews on the table. Customers *want* to share feedback, but they hit friction—too many steps, too many platforms, not enough time.

Revly fixes this with one smart link that handles everything. Customers share quick feedback, AI enhances it into a ready-to-post review, and we smartly guide them to post wherever it matters most. Negative feedback routes privately to your team, protecting your public ratings.

Meanwhile, Revly monitors all your app store reviews automatically—giving you complete visibility across Shopify, G2, QuickBooks, and beyond.

*Simple for your customers. Effortless for your team.*

---

## Features

### Review Monitoring (MVP - In Progress)
- Aggregate reviews from multiple platforms into a single dashboard
- Track rating trends and sentiment over time
- Get notified of new reviews
- **Review lifecycle tracking** - Detect when reviews are archived or removed
- **Verified status tracking** - Know which reviews are from verified purchasers
- **Engagement metrics** - Track helpful votes where available

### Review Collection (Planned)
- Smart review funnel that routes feedback appropriately
- Positive feedback → Public review platforms
- Negative feedback → Private support channels

## Supported Platforms

| Platform | Status | Method | Cost |
|----------|--------|--------|------|
| WordPress.org | ✅ Complete | RSS + HTML scraping | Free |
| Shopify App Store | ✅ Complete | HTML scraping | 1 credit/page |
| WooCommerce Marketplace | ✅ Complete | REST API | Free |
| Xero App Store | ✅ Complete | SSR JSON extraction | Free |
| G2 | ✅ Complete | Turbo frame endpoint | 1 credit/page |
| QuickBooks App Store | ✅ Complete | GraphQL API | 10 credits (one-time) |
| Capterra | ❌ Blocked | Requires premium proxy | N/A |

> **Note:** Capterra is blocked by aggressive anti-bot protection. Will revisit post-MVP.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes
- **Database:** MySQL 8.0 (AWS RDS)
- **Scraping:** ScraperAPI
- **Auth:** AWS Cognito (planned)
- **Hosting:** AWS Amplify

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database (local or RDS)
- ScraperAPI account (for platform scraping)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/revly.git
cd revly

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure your environment variables
# Edit .env.local with your database and API credentials

# Run database migrations
npm run db:migrate

# Seed test data (optional)
npm run db:seed

# Start development server
npm run dev
```

The app will be available at `http://localhost:3002`

### Environment Variables

```env
# Database
DATABASE_URL=mysql://user:password@host:3306/revly

# Scraping
SCRAPER_API_KEY=your_scraper_api_key

# AWS (for production)
AWS_REGION=us-east-2
```

## Project Structure

```
/revly
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   │   ├── channels/       # Review channel endpoints
│   │   │   ├── reviews/        # Reviews endpoints
│   │   │   ├── companies/      # Company endpoints
│   │   │   └── products/       # Product endpoints
│   │   └── (dashboard)/        # Dashboard pages
│   ├── components/             # React components
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── db/                 # Database client & schema
│   │   └── scrapers/           # Platform-specific scrapers
│   │       ├── logger.ts       # Structured logging utility
│   │       ├── scraper-api.ts  # ScraperAPI wrapper
│   │       ├── wordpress.ts    # WordPress.org scraper
│   │       ├── shopify.ts      # Shopify App Store scraper
│   │       ├── woocommerce.ts  # WooCommerce scraper
│   │       ├── xero.ts         # Xero App Store scraper
│   │       ├── g2.ts           # G2 scraper
│   │       └── quickbooks.ts   # QuickBooks scraper
│   └── types/                  # TypeScript types
├── scripts/                    # Database scripts
└── public/                     # Static assets
```

## API Endpoints

### Channels

- `GET /api/channels` - List all review channels
- `POST /api/channels` - Create a new channel
- `POST /api/channels/[id]/sync` - Trigger review sync

### Reviews

- `GET /api/reviews` - List reviews (with filters)
- `GET /api/reviews?channelId=xxx` - Filter by channel
- `GET /api/reviews?productId=xxx` - Filter by product

### Companies & Products

- `GET /api/companies` - List companies
- `GET /api/products` - List products

## Development

```bash
# Run development server
npm run dev

# Run database migrations
npm run db:migrate

# Seed test data
npm run db:seed

# Build for production
npm run build
```

## Review Data Model

Each scraped review includes:

| Field | Description |
|-------|-------------|
| `external_id` | Platform-specific unique ID |
| `rating` | 1-5 star rating |
| `review_text` | Full review content |
| `reviewer_name` | Author name |
| `review_date` | When the review was posted |
| `status` | `active`, `archived`, or `removed` |
| `last_seen_at` | Last time review was found in a scrape |
| `is_verified` | Verified purchaser/user flag |
| `helpful_count` | Upvotes/helpful votes |
| `reply_text` | Vendor's response (if any) |
| `metadata` | Platform-specific extra data (JSON) |

The `status` and `last_seen_at` fields enable detecting when reviews are removed or archived by platforms.

## Architecture Decisions

- **Multi-tenant from day 1** - Avoid architectural rework later
- **Raw SQL over ORM** - Direct control, no abstraction overhead
- **ScraperAPI for scraping** - Best balance of features/cost for MVP
- **Server-side scraping** - More reliable than client-side approaches
- **Structured scraper logging** - Consistent, timestamped logs across all scrapers

## License

Private - All rights reserved
