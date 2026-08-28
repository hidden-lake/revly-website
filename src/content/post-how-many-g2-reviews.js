// Revly blog — "How many G2 reviews do you actually need?"
//
// Body copy is authored text: transcribe it, don't rewrite it. Paragraph strings accept
// **bold** and [label](href) only. Every figure carries its own visible text, so the
// numbers stay in the crawled HTML rather than living inside an image.

export const meta = {
  slug: 'how-many-g2-reviews-do-you-need',
  title: 'How many G2 reviews do you actually need?',
  metaTitle: 'How Many G2 Reviews Do You Actually Need? | Revly',
  metaDescription:
    'Ten reviews in a category to reach a G2 Grid Report. Twenty at 4.0 stars for the Users Love Us badge. Plus the decay curve and the incentive rule most miss.',
  excerpt:
    'Ten reviews in a category gets you into a Grid Report. Twenty at a 4.0 average earns Users Love Us. Both are lower than teams assume. The complications are in where those reviews sit, how they age, and one incentive rule that quietly works against you.',
  description:
    'Ten reviews in a category to appear in a G2 Grid Report, and 20 reviews at a 4.0 star average for the Users Love Us badge. Plus how G2 review decay works and why incentivised reviews score lower.',
  author: 'Revly team',
  category: 'Review platforms',
  datePublished: '2026-08-28',
  dateModified: '2026-08-28',
  dateDisplay: '28 August 2026',
  readTime: '7 min read',
  cover: '/assets/blog/cover-how-many-g2-reviews.svg',
  coverAlt: 'Hand-drawn illustration of a star above ten tally marks.',
  featured: false,
  keywords: 'G2 reviews, G2 Grid Report, Users Love Us badge, G2 review decay, G2 badge requirements',
  about: [{ '@type': 'Organization', name: 'G2', url: 'https://www.g2.com/' }],
  citation: [
    { '@type': 'CreativeWork', name: 'G2 Research Scoring Methodologies', url: 'https://documentation.g2.com/docs/research-scoring-methodologies' },
    { '@type': 'CreativeWork', name: 'G2 Badges documentation', url: 'https://documentation.g2.com/docs/g2-badges' },
    { '@type': 'CreativeWork', name: 'G2 Community Guidelines', url: 'https://legal.g2.com/community-guidelines' },
  ],
  cta: {
    headingTop: 'Stop managing reviews',
    headingAccent: 'manually.',
    body: 'Revly shows your review counts across G2, Capterra and the app stores in one dashboard, sends customers to the right platform with a single link, and drafts your replies so reviews stop sitting unanswered.',
    primary: { label: 'Start free', href: '/pricing/' },
    secondary: { label: 'See how collection works', href: '/collect-quality-reviews/' },
  },
};

export const blocks = [
  {
    type: 'lead',
    text: 'If you are trying to work out how many G2 reviews you need before anything useful happens, there are two numbers worth knowing. Ten reviews in a category gets your product into that category\'s Grid Report. Twenty reviews at a 4.0 star average earns the Users Love Us badge.',
  },
  {
    type: 'p',
    text: 'Both are lower than most teams assume, which is usually good news. The complications are in where those reviews sit, how they age, and one rule about incentives that can quietly work against you.',
  },

  { type: 'h2', text: 'The thresholds' },
  {
    type: 'graphic',
    name: 'thresholds',
    caption: 'All from G2\'s [research scoring methodologies](https://documentation.g2.com/docs/research-scoring-methodologies) and [badge documentation](https://documentation.g2.com/docs/g2-badges).',
  },
  {
    type: 'p',
    text: 'The first two rows are different things, and nearly every article we read while writing this treated them as one number. A live Grid shows up on a category page once three products have ten or more reviews. The quarterly Grid Report needs six products and 150 reviews across the category. In a smaller category you can be visible on the live Grid months before a Report ever runs, which is worth knowing if you have been told you are years away.',
  },

  { type: 'h2', text: 'Reviews only count in the category they were left in' },
  {
    type: 'p',
    text: 'This is the most common reason a team with plenty of reviews still isn\'t on a Grid. Ten reviews spread across three categories gets you nothing. You need ten in one.',
  },
  {
    type: 'graphic',
    name: 'category-buckets',
    caption: 'Same ten reviews. Only one of these arrangements puts you on a Grid.',
  },
  {
    type: 'p',
    text: 'Most teams have never checked this. They know their total, they assume they are short, and they are actually two reviews away in their main category and nowhere near it in the other two.',
  },
  {
    type: 'p',
    text: 'So before you plan anything, go and count properly. Open your G2 seller account and look at how your existing reviews break down by category rather than in aggregate.',
  },
  {
    type: 'p',
    text: 'If you are also collecting on Capterra, the app stores, or anywhere else, that count gets harder to hold in your head, which is the reason [Revly\'s dashboard](/monitor-platforms/) exists. It shows where your review counts stand across every platform you are on, so "how many do we have in this category" stops being a question you answer by hand once a quarter.',
  },

  { type: 'h2', text: 'The badge most teams are actually chasing' },
  {
    type: 'p',
    text: 'Users Love Us is usually the goal, and G2 states the requirement plainly: it is "earned after collecting 20 reviews with an average rating of 4.0+ stars."',
  },
  {
    type: 'graphic',
    name: 'badge-contrast',
    caption: 'One badge has a number. The other has a ranking.',
  },
  {
    type: 'p',
    text: 'It is also the only badge you can download and share on a free G2 profile. Free profiles still qualify for recognition in Grid Reports and Best of Software awards, but sharing a newly earned badge takes a paid profile.',
  },
  {
    type: 'p',
    text: 'Grid Report badges work differently, and no review count earns you one. You need to place in the Leader or High Performer quadrant, which is scored against everyone else in your category and recalculated every reporting season. If somebody quotes you a fixed number of reviews for "Leader," they are guessing.',
  },

  { type: 'h2', text: 'Incentivised reviews are worth less' },
  {
    type: 'p',
    text: 'This one is buried in the scoring methodology and it should change how you spend your budget. Among the factors G2 weighs:',
  },
  {
    type: 'quote',
    text: 'Reviews collected from current product users or from users who have more experience with the product are given increased weight. Reviews solicited without incentive are also weighted more heavily.',
    cite: 'G2 research scoring methodologies',
    href: 'https://documentation.g2.com/docs/research-scoring-methodologies',
  },
  {
    type: 'p',
    text: 'Incentivised reviews are allowed, up to G2\'s $100 cap, and they get labelled as incentivised when they publish. They just count for less than a review someone wrote without a gift card attached.',
  },
  {
    type: 'p',
    text: 'Which means the review you got by emailing a customer of three years is worth more than the one you paid for. Spend the incentive budget on the people who would not have replied to a plain email, and ask everyone else properly first.',
  },

  { type: 'h2', text: 'Reviews do not expire, they fade' },
  {
    type: 'p',
    text: 'You will find confident claims that G2 reviews expire after 12 months, or 18, or two years. None of that is right, and believing it leads people to run exactly the wrong campaign.',
  },
  {
    type: 'p',
    text: 'G2 uses a decay curve that recalculates daily:',
  },
  {
    type: 'quote',
    text: 'A review decays gradually for the first 90 days and maintains a stronger weight for the first 18 months, after which the rate of decay accelerates. After about three years, the review reaches approximately 3% of its original weight and maintains that weight in perpetuity.',
    cite: 'G2 research scoring methodologies',
    href: 'https://documentation.g2.com/docs/research-scoring-methodologies',
  },
  {
    type: 'graphic',
    name: 'decay-curve',
    caption: 'The shape G2 describes. A curve, not a cutoff, and it resets when a reviewer updates.',
  },
  {
    type: 'p',
    text: 'Buried in that documentation is the most useful sentence on this page: decay resets when a reviewer updates their review. An old review that a customer refreshes goes back to full weight.',
  },
  {
    type: 'p',
    text: 'So the fastest way to improve your position might be going back to twenty happy customers from 2024 and asking them to update what they already wrote, rather than finding twenty new reviewers. It is a much easier ask, and we have never seen anyone recommend it.',
  },
  {
    type: 'p',
    text: 'The wider point is that a curve rather than a cutoff means timing beats volume. Forty reviews collected in one month all fade together and leave you with a cliff. Forty collected across a year keeps your position steady. Slow and regular wins, and that is G2\'s own maths saying so rather than us.',
  },
  {
    type: 'graphic',
    name: 'steady-vs-burst',
    caption: 'Forty reviews either way. Only one of them holds a position.',
  },
  {
    type: 'p',
    text: 'Keeping a steady trickle going is more of an operational problem than a strategy problem, which is what [Revly\'s collection links](/collect-quality-reviews/) are for. One link per campaign, sent to the right platform for each customer, so asking becomes something you do continuously instead of a project you rediscover every nine months.',
  },

  { type: 'h2', text: 'Some reviews will not move your score' },
  {
    type: 'p',
    text: 'Check this before you count your total and assume you have cleared ten.',
  },
  {
    type: 'p',
    text: 'Business partner reviews, from resellers and similar, are allowed and get labelled as such, but G2 says they "do not impact the star rating, G2 Score, Satisfaction or Market Presence scores, Best Software lists, or other G2 ranking algorithms." They are visible on your profile. They just do not count toward anything.',
  },

  { type: 'h2', text: 'Once you have the reviews, use them' },
  {
    type: 'p',
    text: 'Hitting ten or twenty is the start rather than the finish, and the reviews you already have are usually underworked.',
  },
  {
    type: 'p',
    text: 'Reply to them. Response rates across this category are poor, and a review with a considered reply underneath reads very differently to a prospect than one sitting in silence since last spring. Revly drafts a reply in your brand voice for every review waiting on one, then takes you to the platform to post it. See [managing responses](/manage-review-responses/).',
  },
  {
    type: 'p',
    text: 'And put them somewhere people will actually see them. Your best reviews are sitting on a platform most of your website visitors will never open. Revly turns them into [widgets for your own pages](/review-widgets/) that update themselves as new reviews come in.',
  },

  { type: 'h2', text: 'Where we would start' },
  { type: 'graphic', name: 'start-here', caption: null },
];

export const faqs = [
  {
    q: 'How many G2 reviews do you need to appear in a Grid Report?',
    a: 'Ten in that specific category. Reviews sitting in your other categories do not count toward it, which is why teams with plenty of reviews in total still miss the threshold. Count by category in your G2 seller account before you assume you are short.',
  },
  {
    q: 'How many G2 reviews do you need for the Users Love Us badge?',
    a: 'Twenty, with an average rating of 4.0 stars or higher. It is also the only badge you can download and share on a free G2 profile, which usually makes it the first one worth aiming at rather than a badge from a Grid Report.',
  },
  {
    q: 'How many reviews does a category need before G2 publishes a Grid Report?',
    a: 'Six products with ten or more reviews each, and 150 or more reviews across the category. A live Grid on a category page needs only three products with ten or more, so in a smaller category you can appear on the Grid months before a Report ever runs.',
  },
  {
    q: 'Do G2 reviews expire?',
    a: 'No. G2 uses a decay curve rather than a cutoff. Reviews fade gradually for the first 90 days, hold stronger weight for 18 months, then drop faster, reaching about 3% of original weight after three years and staying there. Decay resets if the reviewer updates their review.',
  },
  {
    q: 'Do incentivised reviews count on G2?',
    a: 'Yes, up to a $100 incentive cap, and they are labelled as incentivised when they publish. But G2 weights reviews solicited without an incentive more heavily, so an incentivised review counts for less than one someone left unprompted. Spend the budget on customers who would not have replied otherwise.',
  },
  {
    q: 'Is it better to collect G2 reviews steadily or in one big push?',
    a: 'Steadily. Because G2 weights reviews by age instead of expiring them, a batch collected in one month fades as a batch and leaves you with a cliff. The same forty reviews spread across a year keep something fresh in the mix, so your position holds instead of dropping.',
  },
  {
    q: 'Do reviews in one category count toward another?',
    a: 'No. Grid inclusion is calculated per category, which is why teams with enough reviews in total still miss the threshold. Ten reviews spread across three categories gets you nothing, so check how your existing reviews break down before you plan a campaign around the number you have.',
  },
  {
    q: 'How many G2 reviews do you need to be a Leader?',
    a: 'There is no fixed number. Grid Report badges depend on placing in the Leader or High Performer quadrant, which is calculated against the other products in your category and recalculated every reporting season. Anyone quoting you a specific review count for Leader is guessing.',
  },
];
