// Blog cards for the "Learn" section under the FAQ on product and use-case pages.
//
// Why it exists: posts link out to the feature pages freely, so without this the
// only routes into a post are the blog index and the footer (SEO audit, Sep 2026).
//
// Card fields are copied, not imported from lib/blog.js, on purpose. That module
// pulls in all four article bodies (roughly 10,000 words) at import time, and these
// pages render three short cards. Importing it would ship the whole blog inside every
// feature page's JavaScript. If you retitle a post or change its cover, update it here.
// The hrefs are covered by the build, which fails on a link to a page that isn't built.

const POST = {
  g2Alternatives: {
    slug: 'g2-alternatives',
    title: 'Where B2B buyers actually read reviews',
    teaser: 'G2 is not the whole map. Which platforms your buyers really use, and which are not worth the effort.',
    readTime: '8 min read',
    cover: '/assets/blog/cover-g2-alternatives.svg',
    coverAlt: 'Hand-drawn illustration of a signpost with three arms pointing in different directions.',
  },
  howMany: {
    slug: 'how-many-g2-reviews-do-you-need',
    title: 'How many G2 reviews do you need?',
    teaser: 'Ten for a Grid Report, twenty at 4.0 for Users Love Us, and how the review decay curve erodes both.',
    readTime: '7 min read',
    cover: '/assets/blog/cover-how-many-g2-reviews.svg',
    coverAlt: 'Hand-drawn illustration of a star above ten tally marks.',
  },
  badges: {
    slug: 'g2-badges-explained',
    title: 'G2 badges explained',
    teaser: 'Which badges you can earn, what each one actually requires, and what it costs to keep them.',
    readTime: '8 min read',
    cover: '/assets/blog/cover-g2-badges.svg',
    coverAlt: 'Hand-drawn illustration of an award rosette with a price tag hanging from it.',
  },
  g2Capterra: {
    slug: 'g2-capterra-acquisition-review-management',
    title: 'G2 acquired Capterra. What changed?',
    teaser: 'One owner, still two platforms. Reviews do not syndicate, the incentive rules differ, and you still run two campaigns.',
    readTime: '6 min read',
    cover: '/assets/blog/cover-g2-capterra.svg',
    coverAlt: 'Hand-drawn illustration of two separate review listings side by side, with a dividing line between them.',
  },
};

// Three per page, chosen for the question a reader of that page is already asking.
export const LEARN = {
  collect: [POST.howMany, POST.badges, POST.g2Capterra],
  monitor: [POST.g2Alternatives, POST.g2Capterra, POST.howMany],
  respond: [POST.badges, POST.howMany, POST.g2Alternatives],
  embed: [POST.badges, POST.g2Alternatives, POST.howMany],
  mcp: [POST.g2Alternatives, POST.howMany, POST.g2Capterra],
  slack: [POST.g2Alternatives, POST.g2Capterra, POST.howMany],
  saas: [POST.g2Alternatives, POST.howMany, POST.badges],
  agency: [POST.g2Alternatives, POST.g2Capterra, POST.badges],
};
