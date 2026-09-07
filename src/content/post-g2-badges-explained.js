// Revly blog — "G2 badges explained: which ones you can earn, and what they cost"
//
// Body copy is authored text: transcribe it, don't rewrite it. Paragraph strings accept
// **bold** and [label](href) only. Every figure carries its own visible text, so the
// requirements and dates stay in the crawled HTML rather than living inside an image.

export const meta = {
  slug: 'g2-badges-explained',
  title: 'G2 badges explained: which ones you can earn, and what they cost',
  // Kept under 60 characters for the SERP.
  metaTitle: 'G2 Badges Explained: What You Earn, What It Costs | Revly',
  metaDescription:
    'Users Love Us needs 20 reviews at 4.0 stars. Leader badges have no published number. And since Summer 2025, displaying most G2 badges requires a paid plan.',
  excerpt:
    'Two G2 badges come with a published number. Users Love Us at 20 reviews and a 4.0 average, and AI Users Trust at 25 responses. Everything else, the Leader badge included, is a ranking against your category. And since June 2025, most badges cost money to display even after you have earned them.',
  description:
    'Only two G2 badges have a published number: Users Love Us at 20 reviews and 4.0 stars, and AI Users Trust at 25 responses. Everything else is a ranking, and since Summer 2025 displaying most badges needs a paid plan.',
  author: 'Revly team',
  // Closest topics: the review counts behind the badges, then the wider platform set.
  related: ['how-many-g2-reviews-do-you-need', 'g2-alternatives'],
  category: 'Review platforms',
  datePublished: '2026-09-04',
  dateModified: '2026-09-04',
  dateDisplay: '4 September 2026',
  readTime: '8 min read',
  cover: '/assets/blog/cover-g2-badges.svg',
  coverAlt: 'Hand-drawn illustration of an award rosette with a price tag hanging from it.',
  featured: false,
  keywords:
    'G2 badge, G2 badges, Users Love Us badge, G2 Leader badge, AI Users Trust badge, G2 badge requirements, G2 pricing',
  about: [{ '@type': 'Organization', name: 'G2', url: 'https://www.g2.com/' }],
  citation: [
    { '@type': 'CreativeWork', name: 'G2 Badges documentation', url: 'https://documentation.g2.com/docs/g2-badges' },
    { '@type': 'CreativeWork', name: 'G2 Research Scoring Methodologies', url: 'https://documentation.g2.com/docs/research-scoring-methodologies' },
    { '@type': 'CreativeWork', name: 'G2 badge accessibility changes announcement', url: 'https://company.g2.com/news/badge-accessibility-changes' },
    { '@type': 'CreativeWork', name: 'G2 Research Agenda', url: 'https://research.g2.com/methodology/research-agenda' },
    { '@type': 'CreativeWork', name: 'G2 Marketing Solutions pricing', url: 'https://www.g2.com/products/g2/pricing' },
    { '@type': 'CreativeWork', name: 'G2 Trust Badges', url: 'https://sell.g2.com/g2-trust-badges' },
  ],
  cta: {
    headingTop: 'Every review you collect,',
    headingAccent: 'in one place.',
    body: 'Revly collects reviews across G2, Capterra and the app marketplaces from a single link, then keeps them in one dashboard with Slack alerts, drafted replies, embeddable widgets and a connector for querying your review data in Claude or ChatGPT.',
    primary: { label: 'Start free', href: '/pricing/' },
    secondary: { label: 'See how it works for SaaS teams', href: '/use-cases/saas/' },
  },
};

export const blocks = [
  {
    type: 'lead',
    text: "Somebody on your team has probably asked how many reviews you need for a G2 badge, and the honest answer depends entirely on which badge they mean. Only two come with a published number. Users Love Us is earned at 20 reviews with a 4.0 star average, and an AI Users Trust badge needs 25 responses to G2's AI trust questions.",
  },
  {
    type: 'p',
    text: 'Every other badge, the Leader badge included, comes from where your product ranks against everyone else in your category. So one of these belongs in a quarterly plan and the rest belong in a forecast. And since June 2025, most G2 badges cost money to display even after you have earned them.',
  },

  { type: 'h2', text: 'Which badges exist, and how each one is earned' },
  {
    type: 'p',
    text: 'G2 badges come from several different report families, and the rules change between them.',
  },
  {
    type: 'graphic',
    name: 'badge-matrix',
    caption:
      "From [G2's badge documentation](https://documentation.g2.com/docs/g2-badges), updated 5 March 2026, and [G2's research scoring methodologies](https://documentation.g2.com/docs/research-scoring-methodologies).",
  },
  {
    type: 'p',
    text: 'If anyone quotes you a specific review count for a Leader badge, they are guessing. G2 has never published one, and the threshold moves every season depending on who else collected reviews that quarter. The two badges with real published requirements are the ones almost nobody writes about.',
  },
  {
    type: 'p',
    text: 'None of this applies until your product is in a Grid Report, which takes 10 reviews in a single category. [Those ten also fade](/blog/how-many-g2-reviews-do-you-need/), because G2 weights reviews on a decay curve that drops them to roughly 3% of their original value after three years.',
  },

  { type: 'h2', text: 'Since Summer 2025, displaying a badge requires a paid plan' },
  {
    type: 'p',
    text: 'This change lives in a G2 announcement from April 2025 and never made it into the badge documentation, which is why so few people know about it.',
  },
  {
    type: 'quote',
    text: "Vendors with upgraded G2 Profiles will have exclusive rights to publicly promote G2's quarterly Market Report badges and annual Best Software Award badges.",
    cite: 'G2 badge accessibility changes, 29 April 2025',
    href: 'https://company.g2.com/news/badge-accessibility-changes',
  },
  {
    type: 'p',
    text: 'That applies from the Summer 2025 report release on 24 June 2025. A free profile still earns the Leader placement. The download button is what disappears.',
  },
  {
    type: 'p',
    text: 'Free profiles keep any badge earned before the Summer 2025 report, the Users Love Us badge, and full eligibility for quarterly Market Reports and annual awards. G2 also permits them to reference a placement in text with a backlink, giving "We are recognized as a Leader in a G2 Winter 2025 Report" as the example wording.',
  },
  {
    type: 'graphic',
    name: 'badge-cost',
    caption: "What a free profile keeps, and what the paid plan is actually buying. Prices from [G2's public pricing page](https://www.g2.com/products/g2/pricing).",
  },
  {
    type: 'p',
    text: 'That example is G2\'s own, and it is the most useful sentence in the announcement. Earn a Leader placement on a free profile and you may put that line on your homepage with a link to G2. The graphic stays locked.',
  },
  {
    type: 'p',
    text: 'Whether that is worth paying comes down to whether your buyers reach your website before or after your G2 profile. Most Series A teams have never looked, and the answer is sitting in their analytics.',
  },

  { type: 'h2', text: 'The badge with an actual number on it' },
  {
    type: 'p',
    text: 'Users Love Us is the badge you can plan a campaign around, because G2 states the requirement plainly: it is "earned after collecting 20 reviews with an average rating of 4.0+ stars."',
  },
  {
    type: 'p',
    text: 'It also happens to be the only badge a free profile can newly earn and display. For a company not paying G2 and looking for something to put on a pricing page, this is the whole list.',
  },
  {
    type: 'p',
    text: 'One quirk before you build a page around it. G2\'s documentation says "you cannot select badges from the Additional Rewards panel, such as the Users Love Us badge, as your G2 Profile badge." It works on your own website, and your G2 profile will show something else.',
  },
  {
    type: 'p',
    text: "Twenty reviews at a 4.0 average is an operations question more than a G2 one. It comes down to asking regularly instead of in one push, and pointing enough of that asking at G2 to clear the threshold. Revly's [collection links](/collect-quality-reviews/) set the destination per campaign, so you can aim a season's worth of requests at G2 while a badge is the goal, then rebalance across your other listings once the count is banked.",
  },

  { type: 'h2', text: 'The AI Users Trust badges, which nobody has noticed yet' },
  {
    type: 'p',
    text: 'G2 added a badge family for AI trust, and it is currently the most gettable badge in the system, partly because so few vendors have registered that it exists.',
  },
  {
    type: 'p',
    text: 'The requirements, quoted from [G2\'s scoring methodology](https://documentation.g2.com/docs/research-scoring-methodologies): a product must "have the AI Verified tag" and "have received a minimum of 25 responses to the AI trust questions used in badge scoring." It has to be a software product whose primary category is a defined G2 category, and the high level category grouping needs at least six eligible products before any badges get awarded.',
  },
  {
    type: 'graphic',
    name: 'ai-trust-tiers',
    caption: 'Awarded and renewed quarterly, on the same schedule as the Market Reports.',
  },
  {
    type: 'p',
    text: 'For any product with AI functionality, this is cheaper to chase than a Leader placement. The pool competing for it is small, and 25 answers to a defined question set is a target you can actually work toward. The AI Verified tag is the prerequisite, and it is the step most teams have skipped.',
  },

  { type: 'h2', text: 'When badges are awarded, and the date that actually matters' },
  {
    type: 'p',
    text: 'G2 publishes Grid and Index Reports quarterly. Work backwards from the review deadline several weeks before each release, which is the last day a review is guaranteed to count toward that season.',
  },
  {
    type: 'graphic',
    name: 'release-dates',
    caption: 'Final release dates from [G2\'s research agenda](https://research.g2.com/methodology/research-agenda). Each season carries its own review deadline on the same page, and it moves.',
  },
  {
    type: 'p',
    text: 'Best Software Awards run on a separate annual cycle, counting reviews from 1 January to 31 December of the preceding year, with the 2026 awards launching on 18 February 2026.',
  },
  {
    type: 'p',
    text: 'One inconsistency we could not resolve, and we would rather flag it than pick a side. G2\'s scoring documentation says Best Software Awards need "at least 10 reviews in the past year." G2\'s [trust badges page](https://sell.g2.com/g2-trust-badges) says that to be eligible for the Software Sellers or Software Products Best Of lists "you must receive at least 50 approved and published reviews during any given evaluation period." Two G2 pages, two numbers. They may describe different award lists. If Best Software is a goal for you, ask your G2 rep in writing which one applies.',
  },
  {
    type: 'p',
    text: 'Check the deadline rather than assuming, because a review submitted three days late lands in the next season instead, and by then the campaign has usually stopped.',
  },

  { type: 'h2', text: 'Before you put a badge on your website' },
  {
    type: 'p',
    text: 'G2\'s badge documentation carries a technical warning that will cost you your search result stars if you miss it.',
  },
  {
    type: 'p',
    text: 'G2 offers a feature that lets search engines display your G2 aggregate rating, including stars, score and review count. The documentation says "G2 does not recommend enabling this feature if you have existing Product Review schema markup on your website," and separately, "if you use G2\'s Star Rating Widget to display star ratings in search results, do not enable this feature for Badges."',
  },
  {
    type: 'graphic',
    name: 'markup-conflict',
    caption: 'Same rating, three different sources of markup. Run two at once and the stars stop showing.',
  },
  {
    type: 'p',
    text: 'Competing structured data on one page can leave you with no stars at all, which is a worse outcome than either option alone. Check what schema your site already has before switching G2\'s version on.',
  },
  {
    type: 'p',
    text: "The badge itself is also a fairly small piece of what a G2 profile gives you. G2's badge and star rating assets show G2 reviews, and the display rights sit behind the paid plans above. Revly's [review widgets](/review-widgets/) pull from every platform you collect on, refresh themselves as new reviews land, and drop onto a page with one embed, so the quotes your buyers actually read can sit alongside the badge instead of competing with it for space.",
  },

  { type: 'h2', text: 'What we would actually chase' },
  {
    type: 'graphic',
    name: 'chase-order',
    caption: null,
  },
  {
    type: 'p',
    text: 'Capterra is the other question people ask at this point. [G2 bought it in February 2026 and left the two rulebooks separate](/blog/g2-capterra-acquisition-review-management/), so a Capterra campaign still runs on different incentive rules and different mechanics to a G2 one.',
  },
  {
    type: 'p',
    text: 'And if you are weighing G2 against everything else on the list, [we wrote up the whole set](/blog/g2-alternatives/): the app marketplaces, Capterra, Gartner Peer Insights and TrustRadius, and which buyer each of them actually reaches.',
  },
];

// Rendered as the visible FAQ and as FAQPage schema from the same array, so the two
// can never drift apart.
export const faqs = [
  {
    q: 'How many reviews do you need for a G2 badge?',
    a: 'The Users Love Us badge needs 20 reviews with a 4.0 star average or higher. Leader and High Performer badges have no published review count, because they are earned by placing in a quadrant of your category Grid, which is scored against every other product in that category and recalculated each season.',
  },
  {
    q: 'Which G2 badge can you get for free?',
    a: 'Users Love Us. Since the Summer 2025 report release on 24 June 2025, downloading and displaying quarterly Market Report badges and annual Best Software Award badges requires a paid G2 profile. Free profiles keep any badges earned before that date.',
  },
  {
    q: 'Can you display a G2 Leader badge on a free profile?',
    a: 'The badge image, no. G2 does permit free profiles to reference the placement in text with a backlink, and gives "We are recognized as a Leader in a G2 Winter 2025 Report" as the example wording.',
  },
  {
    q: 'How much does a G2 badge cost?',
    a: 'Displaying a G2 badge starts at $2,999 a year on G2\'s Starter plan, rising to $6,000 a year from year two. The Free plan costs $0 but covers only the Users Love Us badge. Professional and Enterprise pricing is quote-only.',
  },
  {
    q: 'How do you get an AI Users Trust badge on G2?',
    a: "Your product needs the AI Verified tag and at least 25 responses to G2's AI trust questions. Badges are then awarded by percentile, Gold at the 90th percentile or above, Silver from the 80th, Bronze from the 70th, and renewed quarterly.",
  },
  {
    q: 'How often are G2 badges awarded?',
    a: 'Grid and Index Report badges are awarded quarterly, in Winter, Spring, Summer and Fall seasons. AI Users Trust badges renew quarterly on the same schedule. Best Software Awards are annual and published each February.',
  },
  {
    q: 'Do G2 badges expire?',
    a: 'Badges are tied to a reporting season and get replaced automatically with one from the most recent season. A free profile keeps access to badges it earned before the Summer 2025 change.',
  },
  {
    q: "Should you add G2's star ratings to your search results?",
    a: 'G2 advises against it if your website already has Product Review schema markup, and against it if you are using G2\'s Star Rating Widget for the same purpose. Competing markup on one page can result in no stars showing at all.',
  },
];
