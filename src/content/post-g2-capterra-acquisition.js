// Revly blog — "G2 acquired Capterra. What it changes for your review programme."
//
// Body copy is authored text: transcribe it, don't rewrite it. Paragraph strings accept
// **bold** and [label](href) only. `graphic` blocks name a component in
// components/blog-graphics.jsx; every figure carries its own visible text, so the facts
// stay in the crawled HTML rather than living inside an image.

export const meta = {
  slug: 'g2-capterra-acquisition-review-management',
  title: 'G2 acquired Capterra. What it changes for your review programme.',
  // Kept under 60 characters for the SERP.
  metaTitle: 'G2 Acquired Capterra: What Changed for Reviews | Revly',
  metaDescription:
    "G2 now owns Capterra, Software Advice and GetApp. Capterra reviews still don't reach G2, the incentive rules differ, and you still run two campaigns.",
  excerpt:
    'G2 bought Capterra, Software Advice and GetApp from Gartner. No merged platform, no shared review pool, no single login. Here is what actually changed for collection, monitoring and display, and the one difference that will cost you reviews if you miss it.',
  description:
    'G2 now owns Capterra, Software Advice and GetApp. Capterra reviews still do not syndicate to G2, the incentive rules are still different, and you still run two separate campaigns. What actually changed for review collection, monitoring and display.',
  author: 'Revly team',
  category: 'Review platforms',
  datePublished: '2026-08-28',
  dateModified: '2026-08-28',
  dateDisplay: '28 August 2026',
  readTime: '6 min read',
  cover: '/assets/blog/cover-g2-capterra.svg',
  coverAlt: 'Hand-drawn illustration of two separate review listings side by side, with a dividing line between them.',
  featured: true,
  keywords:
    'G2, Capterra, Software Advice, GetApp, G2 Digital Markets, review syndication, review incentives, review management',
  about: [
    { '@type': 'Organization', name: 'G2', url: 'https://www.g2.com/' },
    { '@type': 'Organization', name: 'Capterra', url: 'https://www.capterra.com/' },
    { '@type': 'Organization', name: 'GetApp', url: 'https://www.getapp.com/' },
    { '@type': 'Organization', name: 'Software Advice', url: 'https://www.softwareadvice.com/' },
  ],
  citation: [
    { '@type': 'CreativeWork', name: 'Capterra Community Guidelines', url: 'https://www.capterra.com/legal/community-guidelines/' },
    { '@type': 'CreativeWork', name: 'G2 Community Guidelines', url: 'https://legal.g2.com/community-guidelines' },
    { '@type': 'CreativeWork', name: 'Gartner FY2025 Form 10-K', url: 'https://www.sec.gov/Archives/edgar/data/749251/000074925126000112/it-20251231.htm' },
  ],
  cta: {
    // One line; headingAccent is the closing phrase, rendered in magenta.
    headingTop: 'See every review',
    headingAccent: 'in one place.',
    body: 'Revly brings reviews from G2, Capterra and the app stores into a single dashboard, drafts your replies, and turns your best reviews into widgets for your own site.',
    primary: { label: 'Start free', href: '/pricing/' },
    secondary: { label: 'See how monitoring works', href: '/monitor-platforms/' },
  },
};

export const blocks = [
  {
    type: 'lead',
    text: 'The acquisition did not change much for anyone actually running a review programme. G2 bought Capterra, Software Advice and GetApp from Gartner earlier this year, and if you were expecting one merged platform, one login, or one set of rules, none of that happened. You still have four profiles to keep an eye on and two completely different campaigns to run.',
  },
  {
    type: 'p',
    text: 'There are a few real changes though, and one of them will cost you reviews if you miss it. Here is the practical version.',
  },

  { type: 'h2', text: "What changed and what didn't" },
  {
    type: 'graphic',
    name: 'change-table',
    caption: 'What the acquisition moved, and what it left exactly where it was.',
  },
  { type: 'p', text: 'The only row that moved is the last one.' },

  { type: 'h2', text: 'Your collection campaigns are still two jobs' },
  {
    type: 'p',
    text: 'A review someone leaves on Capterra publishes on GetApp and Software Advice as well. That is three listings from one ask, and it survived the acquisition intact. The current guidelines, updated in May, still say reviews may be published on "www.Capterra.com, www.SoftwareAdvice.com or www.GetApp.com, and other associated or partner websites."',
  },
  { type: 'p', text: 'G2.com is not on that list.' },
  {
    type: 'graphic',
    name: 'syndication',
    caption: 'One ask, different reach. Same owner, two separate review pools.',
  },
  {
    type: 'p',
    text: 'This is the thing people assume changed and it didn\'t. Your Capterra reviews do not show up on G2. Your G2 reviews do not show up on Capterra. Same owner, same building, two entirely separate review pools. If your buyers check both, you need to ask twice.',
  },
  {
    type: 'p',
    text: 'Which makes the effort maths worth doing. One Capterra campaign buys you presence on three sites. One G2 campaign buys you presence on one, though G2 is usually the one Series A buyers open first. Most teams should run both, but if you only have the budget or the customer goodwill for one campaign this quarter, Capterra gives you more surface area per ask.',
  },
  {
    type: 'p',
    text: 'Worth watching: that phrase "and other associated or partner websites" is the door through which G2 could get added without anyone announcing it. Nothing has been announced about any of this so far, so checking the guidelines page yourself beats waiting for news.',
  },
  {
    type: 'p',
    text: 'One thing to keep in mind while you set both up: the incentive rules are different. G2 caps incentives at $100 per review and you run the campaign yourself. Capterra, GetApp and Software Advice publish no cap, only "nominal value, as defined by applicable law," but Capterra distributes the incentives itself through a link in its Vendor Portal rather than letting you send your own. Configure it per platform instead of copying one campaign design across both.',
  },
  {
    type: 'p',
    text: 'That is exactly the kind of thing that gets lost in a spreadsheet. Revly\'s [collection links](/collect-quality-reviews/) let you set up a campaign per platform and send each customer to the right destination, so the G2 rules and the Capterra rules stay separate without you having to hold both in your head.',
  },

  { type: 'h2', text: 'Monitoring did not get any easier' },
  {
    type: 'p',
    text: 'Four properties, four places reviews can land, and no consolidated vendor view. If you were hoping the acquisition would give you one inbox, it hasn\'t.',
  },
  {
    type: 'graphic',
    name: 'four-properties',
    caption: 'Four places a review can land, and nothing joining them up.',
  },
  {
    type: 'p',
    text: 'In practice this is the part that quietly eats time. A review lands on GetApp on a Tuesday, nobody notices until someone happens to check, and by then it has been sitting unanswered for three weeks in front of everyone evaluating you. Multiply that by four sites.',
  },
  {
    type: 'p',
    text: 'This is the specific problem [Revly\'s monitoring](/monitor-platforms/) exists for. Every review from G2, Capterra and the app stores lands in one feed within about five minutes of being posted, so you find out when it happens rather than when you next remember to look.',
  },

  { type: 'h2', text: 'Responding still means four logins' },
  {
    type: 'p',
    text: 'No change here either. Each property keeps its own vendor portal and its own response flow, and none of them let you post replies through an API, so responding is still a manual job per platform.',
  },
  {
    type: 'p',
    text: 'Response rates in this category are low, which is an opportunity rather than a problem. A review with a thoughtful vendor reply underneath it reads very differently to a prospect than one that has sat there for six months in silence, and most of your competitors are not bothering.',
  },
  {
    type: 'p',
    text: 'Revly drafts a reply in your brand voice for every review waiting on one and takes you to the right platform to post it. Details on [managing responses](/manage-review-responses/).',
  },

  { type: 'h2', text: 'Displaying reviews on your own site: one trap to avoid' },
  {
    type: 'p',
    text: 'Both platforms give you badges and widgets to put review content on your own pages, and this is where a genuine technical conflict shows up.',
  },
  {
    type: 'p',
    text: "G2 lets you embed a badge that enables star ratings in Google search results for that page. Useful. But G2's own documentation says not to enable it if you already have Product Review schema markup on your site, and not to use it alongside their Star Rating Widget. Turn on all three and you can end up with competing markup on the same page and no stars at all.",
  },
  {
    type: 'graphic',
    name: 'markup-conflict',
    caption: 'Three ways to mark up the same rating. Run them together and Google shows none of them.',
  },
  { type: 'p', text: "Pick one method per page and check it in Google's Rich Results Test afterwards." },
  {
    type: 'p',
    text: 'The broader issue with platform badges is that they send people away from your site to a third party, at the exact moment you had their attention. Revly\'s [review widgets](/review-widgets/) pull your actual review content from every platform onto your own pages, styled to match your site and updating themselves as new reviews land, so the proof stays where the buyer already is.',
  },

  { type: 'h2', text: 'The one thing that actually improved' },
  {
    type: 'p',
    text: 'In June, G2 [combined buyer intent data](https://company.g2.com/news/g2-expands-buyer-intent-capabilities) across all four sites into one view, claiming up to twice as many signals. Those are G2\'s own unaudited numbers, so treat them accordingly.',
  },
  {
    type: 'p',
    text: 'Note what it covers: who read what, who compared which products, who browsed which category. Reviews, profiles and ratings are untouched by it. If you already pay for G2 buyer intent, you are now seeing research activity from Capterra, GetApp and Software Advice too. If you don\'t, this changes nothing for you.',
  },
  {
    type: 'p',
    text: 'The order of operations tells you something. They integrated the data layer first and left the review corpora alone. That is the opposite of what a "merge the platforms" plan would look like.',
  },

  { type: 'h2', text: 'What we would do this quarter' },
  {
    type: 'graphic',
    name: 'quarter-plan',
    caption: null,
  },
  {
    type: 'p',
    text: 'And if you have been holding off on a decision until the dust settled: it settled in February. Waiting longer just means fewer reviews.',
  },
];

// Rendered as the visible FAQ and as FAQPage schema from the same array, so the two
// can never drift apart.
export const faqs = [
  {
    q: 'Do Capterra reviews now appear on G2?',
    a: 'No. A review left on Capterra publishes on GetApp and Software Advice, exactly as it did before the acquisition. G2.com is not in the syndication list in Capterra\'s current community guidelines, updated 4 May 2026, so the two review pools stay entirely separate despite the shared owner.',
  },
  {
    q: 'Do I still need separate review campaigns for G2 and Capterra?',
    a: 'Yes. They remain separate review pools with separate rules, and a review collected on one does not appear on the other, so if your buyers check both platforms you have to ask twice. One Capterra campaign does cover more ground, since a single review there publishes across three sites.',
  },
  {
    q: 'Is the review incentive limit the same across G2 and Capterra now?',
    a: 'No. G2 caps incentives at $100 USD per review and you run the campaign yourself. Capterra, GetApp and Software Advice allow incentives of nominal value as defined by applicable law, with no figure published, and Capterra distributes the incentives itself through a Vendor Portal link rather than letting you send your own.',
  },
  {
    q: 'Will Capterra be shut down or merged into G2?',
    a: 'There is no sign of it. Capterra, GetApp and Software Advice run as separate brands under G2 Digital Markets, each with its own community guidelines, its own vendor portal and its own review pool. G2 has not committed either way publicly, and nothing has been announced since the deal closed.',
  },
  {
    q: 'Did the G2 and Capterra acquisition actually close?',
    a: 'Yes, on 5 February 2026, for approximately $110 million. Neither company announced the completion, so the figure only exists publicly because Gartner had to report the sale in its SEC filings, and those filings do not even name G2 as the buyer.',
  },
  {
    q: 'Should I still collect reviews on Capterra?',
    a: 'If your buyers use it, yes. One Capterra review still publishes across three sites, which is the best effort to placement ratio available in this category. G2 is usually the platform Series A buyers open first, so most teams are better off running both than choosing between them.',
  },
];
