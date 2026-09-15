// Blog links shown on the commercial pages.
//
// Before this existed the blog was a dead end: posts link out to the feature pages
// freely, but not one feature or use-case page linked back in, so every post's only
// route in was the blog index and the footer (SEO audit, Sep 2026).
//
// The titles and teasers are copied rather than imported from lib/blog.js on purpose.
// That module pulls in all four article bodies at import time — roughly 10,000 words
// of prose — and these pages render three lines of it. Importing would ship the whole
// blog inside every feature page's JavaScript. If you retitle a post, update it here.
// The hrefs are covered by the build, which fails on a link to a page that isn't built.

const POST = {
  g2Alternatives: {
    chip: 'Review platforms',
    title: 'Where B2B buyers actually read reviews',
    body: 'G2 is not the whole map. Which platforms your buyers really use, and which are not worth the effort.',
    to: '/blog/g2-alternatives/',
  },
  howMany: {
    chip: 'Benchmarks',
    title: 'How many G2 reviews do you need?',
    body: 'Ten for a Grid Report, twenty at 4.0 for Users Love Us, and how the review decay curve erodes both.',
    to: '/blog/how-many-g2-reviews-do-you-need/',
  },
  badges: {
    chip: 'Badges',
    title: 'G2 badges explained',
    body: 'Which badges you can earn, what each one actually requires, and what it costs to keep them.',
    to: '/blog/g2-badges-explained/',
  },
  g2Capterra: {
    chip: 'Review platforms',
    title: 'G2 acquired Capterra. What changed?',
    body: 'One owner, still two platforms. Reviews do not syndicate, the incentive rules differ, and you still run two campaigns.',
    to: '/blog/g2-capterra-acquisition-review-management/',
  },
};

// Three per page, chosen for the question a reader of that page is already asking.
export const COLLECT_READING = [POST.howMany, POST.badges, POST.g2Capterra];
export const MONITOR_READING = [POST.g2Alternatives, POST.g2Capterra, POST.howMany];
export const RESPOND_READING = [POST.badges, POST.howMany, POST.g2Alternatives];
export const SAAS_READING = [POST.g2Alternatives, POST.howMany, POST.badges];
export const AGENCY_READING = [POST.g2Alternatives, POST.g2Capterra, POST.badges];
