// Revly — Single source of truth for FAQ data (reused for rendered FAQ sections and structured data)

export const HOME_FAQ = [
{ q: "Is this just AI generating fake reviews?", a: "No. The customer writes their own review. They can use our AI to help draft it and add detail, but it doesn't replace what they said. The customer reads it, edits it if they want to, and posts it themselves. Their voice, their specific points, their approval." },
{ q: "What platforms does Revly work with?", a: "Revly currently supports G2, Capterra, GetApp, Software Advice, Trustpilot, Apple App Store, Google PlayStore, Shopify App Store, WooCommerce Marketplace, QuickBooks Marketplace, WordPress Plugin Marketplace, Xero Marketplace. More platforms are being added. If a platform matters for software buying decisions, it's on the roadmap." },
{ q: "How is this different from emailing customers and asking for a review?", a: "When you email customers manually, you're guessing who's happy, sending links to multiple platforms and hoping they pick the right one, and getting back whatever they feel like writing. Revly replaces all three steps: a check-in that tells you who needs help before you ask them for praise; a smart link routes them to the right platform based on your goals; AI drafting turns their response into a review that's actually useful to someone evaluating your product." },
{ q: "What if a customer doesn't want to post the AI-drafted review?", a: "They can edit it, rewrite it entirely, or decline. Nothing goes live without their explicit approval. If they don't post, nothing happens. No chasing, no pressure." },
{ q: "How long does setup take?", a: "Under 30 minutes for most teams. Connect your review platforms, create your first smart review link, and send your first campaign. Most customers see their first reviews come in within a few days." },
{ q: "Is Revly right for a company with only a handful of reviews?", a: "Yes, that's a common starting point. Companies with 10 to 50 reviews have enough customers to run meaningful campaigns, but not enough reviews to have social proof that converts. Getting from thin to credible is the first thing Revly helps with." }];

export const PRICING_FAQ = [
  { q:"What happens when I hit my monthly review limit?", a:"Collected reviews reset each month. If you reach your plan's limit before the reset, your collection links pause and stop accepting new reviews until the new month starts. Review monitoring is unaffected and keeps running, so you still see every new review as it's posted." },
  { q:"Can I add extra channels beyond my plan's limit?", a:"Yes. Extra monitored channels are $5/month each on Pro, and $3/month each on Business and Agency. Plans include 2 channels on Free, 5 on Pro, 15 on Business, and 5 per client on Agency, so you only pay for the ones you add on top." },
  { q:"Which review platforms does Revly monitor?", a:"Revly monitors G2, Capterra, GetApp, Software Advice, Trustpilot, the Apple App Store, Google Play Store, Shopify App Store, WooCommerce Marketplace, QuickBooks Marketplace, WordPress Plugin Marketplace, and Xero Marketplace. More are being added, and any platform that matters for software buying decisions is on the roadmap." },
  { q:"How does AI review enhancement work?", a:"The customer gives a star rating and a few words of feedback. Revly's AI expands that into a complete review that keeps their sentiment, tone, and specific points. They read it, edit anything they want to change, and post it themselves. Revly never posts on their behalf." },
  { q:"Can I switch plans later?", a:"Yes. Upgrade or downgrade at any time. The change takes effect immediately rather than at your next billing date, and the difference is prorated, so you only pay for what you actually used on each plan." },
  { q:"Do you offer a free trial of the paid plans?", a:"There's no separate time-limited trial. The Free plan is the trial: it stays free, with 2 monitored channels, 1 collection link, 10 collected reviews a month, and daily review monitoring. Upgrade to Pro or Business when you need higher limits or the AI features." },
];

export const COLLECT_FAQ = [
  { q: 'How do you collect better reviews on G2, Capterra and the app stores?',
    a: 'Two things get in the way: customers do not know what to write, and they do not know where to write it. Revly handles both. One link routes each customer to the platform you need, and AI writing assistance helps them turn a brief thought into something detailed enough to be useful to the next buyer. Before either of those, a short check-in tells you whether this is even a good moment to ask.' },
  { q: 'Why check in with customers before sending a review request?',
    a: 'Sending a review request without knowing how someone is doing is a coin flip. A four-second question turns one campaign into two useful outcomes: customers who are ready share their experience, and customers who are stuck reach a person who can help. You would rather find out either way.' },
  { q: 'What does the check-in look like for the customer?',
    a: 'Revly asks them a simple question about their overall experience. If it looks like they\'re having a tough time, they reach your team so you can help.' },
  { q: 'What happens to a customer who flags a problem?',
    a: 'They get routed to a short contact form to tell your team what is going on, and your team is notified. You get the chance to improve the relationship and meet users where they are.' },
  { q: 'Is the AI writing the review?',
    a: 'The customer writes first, in their own words. If they want help expanding or structuring it, Revly offers a version back. They can edit it, rewrite it, or ignore it. Nothing posts without them approving it.' },
  { q: 'What if a customer wants to write their own review with no help?',
    a: 'That\'s totally fine and they can easily do it. Our AI writing assistance is optional and always will be. Revly still makes sure they end up on the right platform instead of choosing from a long list.' },
  { q: 'How does the platform routing work?',
    a: 'You set the priority in Revly. If G2 is healthy and Capterra is thin, weight Capterra until it catches up. Or let Revly distribute based on your current counts across platforms. The customer sees one destination either way.' },
  { q: 'How is the check-in different from an NPS survey?',
    a: 'NPS measures. It asks how likely you are to recommend, then tracks the number over time. Revly\'s check-in acts. It routes customers experiencing issues to your team in real time.' },
  { q: 'Does this work if we only have a handful of customers?',
    a: 'It matters more. With fifty customers, every review is a meaningful share of your social proof. One detailed review on the platform you are trying to build does more than five vague ones scattered across platforms nobody is checking.' },
];

export const MONITOR_FAQ = [
  { q: 'Does Revly notify me when a new review comes in?',
    a: 'Yes, in Slack and by email. Connect Slack once, choose a channel, and every new review posts there with the rating, the platform and the review text.' },
  { q: 'What is actually in the Slack message?',
    a: 'The star rating, the platform, the product, the review itself, and buttons to respond in Revly or view on the app store. Enough to know whether it needs action now, without opening anything.' },
  { q: 'How quickly does Revly pick up new reviews?',
    a: 'It depends on the platform and your plan. Revly checks most listings every 6 hours on Pro and every 2 hours on Business and Agency. A few are deliberately slower because each check is expensive to run: G2 and Trustpilot are checked once a day, Capterra every three days. Anything new is posted straight away, Slack alerts follow the same schedule, and Sync Now checks immediately on any plan.' },
  { q: 'How do you monitor across G2, Capterra and Trustpilot without logging into each?',
    a: 'Revly connects to each platform once during setup and syncs every new review into one dashboard automatically. Nobody on your team logs into a review platform again unless they want to.' },
  { q: 'Which platforms does Revly monitor?',
    a: 'G2, Capterra, GetApp, Software Advice, Trustpilot, Apple App Store, Google Play Store, Shopify App Store, WooCommerce Marketplace, QuickBooks Marketplace, WordPress Plugin Marketplace and Xero Marketplace.' },
  { q: 'How is this different from checking each platform manually?',
    a: 'Manual checking is reactive and it depends on someone remembering. Reviews go unread for weeks, trends stay invisible, and the two-star review surfaces when a prospect mentions it. Revly replaces that with one feed and a Slack message when something new arrives.' },
];


export const RESPOND_FAQ = [
  { q: "How do you respond to reviews on G2, Capterra, and other software platforms from one place?", a: "Revly pulls every review from your connected platforms into one dashboard. You filter to unresponded reviews and draft a reply with AI in your brand voice. Then, Revly takes you directly to the review source platform to post it. No logging into each platform separately, no searching for the review again." },
  { q: "Can the AI match my brand voice?", a: "Yes. You set up tone instructions in Revly's settings: formal vs casual, sign-off conventions, words to use or avoid. Revly's AI uses those instructions to draft replies that sound like your team from the first draft, not generic responses you have to rewrite." },
  { q: "Why does it matter to respond to positive reviews too?", a: "Responding to positive reviews acknowledges the customers who took the time to advocate for you, and it signals to prospects browsing your profile that you actually engage. It also adds indexable content on review platforms that AI systems and search engines cite. Your responses become part of how your product is described publicly." },
  { q: "Will Revly post the response automatically?", a: "No. Revly drafts the response and takes you directly to the review on the platform, but you post it yourself. This keeps the response under your team's control and ensures every reply is a deliberate decision, not an automated one." },
  { q: "How does responding to reviews help with AEO and SEO?", a: "Review platforms like G2 and Capterra are among the most cited domains in AI-generated answers for commercial queries. Responses that mirror the language of the review (feature names, outcomes, specific use cases) add indexable content on those high-authority domains and reinforce what your product does and who it's for." },
  { q: "What happens if a critical review needs urgent attention?", a: "You can configure notifications via email or Slack so the right person on your team is alerted as soon as a low-rated review is posted. Filter your dashboard to unresponded critical reviews and address them while the customer is still listening." },
  { q: "Can multiple team members manage responses?", a: "Yes. Multiple team members can be added, each with their own access. You can see who drafted or posted which response, and assign reviews to the right person on your team." },
  { q: "How long does it take to draft a response in Revly?", a: "Drafting takes seconds. The AI generates a reply matched to your brand voice based on the review content. You edit if you want to, then click through to post on the platform. Most teams find responding goes from a chore they avoid to something they actually keep up with." }];

export const SAAS_FAQ = [
  { q: "Does Revly post reviews on my behalf?", a: "No. Revly helps customers write better reviews, but the customer always approves the final text before posting it themselves. You are never posting on someone else's behalf." },
  { q: "Why does Revly check in with customers before a review request?", a: "Revly runs a short check-in before directing any customer to a public review platform. Their response determines the next step: a guided path to the right platform, or a private form that reaches your team. Customers who get help when they need it are far more likely to become genuine advocates." },
  { q: "Which platforms does Revly support?", a: "Revly currently supports G2, Capterra, Shopify App Store, QuickBooks App Store, Xero App Store, WooCommerce, and WordPress.org, with more platforms being added." },
  { q: "Is this suitable for a solo marketer with no review operations process in place?", a: "Yes. Revly is built for exactly this situation. Setup takes under 30 minutes and the system handles the operational side so you do not need a dedicated process to get started." }];

export const AGENCY_FAQ = [
  { q: "Can I manage multiple clients from a single Revly account?", a: "Yes. Revly's dashboard is designed to handle multiple products and client accounts from one login. You can switch between clients instantly and see aggregate performance across all of them." },
  { q: "Does Revly offer white-label options for agencies?", a: "White-label functionality is on the Revly roadmap. Get in touch to discuss options and early access." },
  { q: "Which review platforms does Revly support?", a: "Revly currently supports G2, Capterra, Shopify App Store, QuickBooks App Store, Xero App Store, WooCommerce, and WordPress.org, with more platforms being added." },
  { q: "How does the check-in work for client campaigns?", a: "Every Revly collection campaign includes a built-in check-in. Each customer's response determines where they go next: the platform where a review is needed most, or a private form that reaches your client's team. That early signal gives your client the chance to step in, help, and turn the experience around." }];


export const EMBED_FAQ = [
  { q: "How do I display my G2 and Capterra reviews on my own website?", a: "Build a widget in Revly, choose which reviews it shows, style it to match your site, then paste one line of code where you want it to appear. The widget pulls from your connected platforms, so reviews posted on G2, Capterra, the app stores and elsewhere all show up in one place on your own pages." },
  { q: "Can I control which reviews appear?", a: "Yes. Filter by star rating, platform, and minimum review length, so a widget can show, for example, only four-star-and-up G2 and Capterra reviews with enough detail to be worth reading." },
  { q: "How much can I customise the look?", a: "Choose a layout (grid, carousel, or wall) and set your brand colour. Anything beyond that, including typeface and corner radius, is done with custom CSS. Revly branding can also be hidden, so the widget reads as part of your site rather than an embed." },
  { q: "Can I have more than one widget?", a: "Yes. Build as many as you need: a wall of reviews on the pricing page, a carousel on the home page, a separate set for a campaign landing page. Each widget has its own review selection and styling." },
  { q: "Do the widgets update automatically?", a: "Yes. New reviews appear as they're posted on the source platform, without you re-embedding or redeploying anything. Testimonial sections stop going stale." },
  { q: "Will an embed slow my site down or hurt SEO?", a: "The widget script is lightweight and loads asynchronously, so it doesn't block your page render. Review content renders as text on the page, which means it's readable content rather than an opaque iframe." },
  { q: "Does it work with my CMS or site builder?", a: "If you can paste a script tag or embed block (WordPress, Webflow, Squarespace, Shopify, Framer, or a hand-built site), it works."}];

export const MCP_FAQ = [
  { q: "What does connecting Revly to Claude actually let me do?", a: "It gives Claude (or ChatGPT) direct access to your Revly data: reviews from every connected platform, plus your collection analytics. You ask questions in plain language and Claude answers from your real data, with quotes and sources attached. No exports, no dashboards, no query syntax." },
  { q: "What is MCP?", a: "MCP (Model Context Protocol) is an open standard for connecting AI assistants to external tools and data. Revly runs an MCP server, so Claude and ChatGPT can read your review data securely when you ask them to. You authorise the connection once from inside your assistant." },
  { q: "What kinds of questions can I ask?", a: "Anything you'd ask an analyst who had read every review: which features five-star reviewers mention most, how sentiment moved after a release, which collection links convert best, what language customers use to describe a benefit, or which reviews would make the strongest quotes for a specific landing page." },
  { q: "How does this help with marketing copy?", a: "Your reviews are a record of how customers describe your product in their own words: the problems they had, the outcomes they got, the phrases they reach for. Ask Claude to surface that language and use it in landing pages, ads, and sales collateral. Copy written in your customers' words tends to convert better than copy written in your positioning." },
  { q: "Can I use it to diagnose review collection?", a: "Yes. Your collection data is queryable too. Ask where customers drop out of the flow, which links or segments underperform, or how completion rates changed after you altered a step, then fix the specific thing that's costing you reviews." },
  { q: "Can I use it in a recurring reporting flow?", a: "Yes. Because Claude pulls live data each time, the same prompt can be rerun whenever you need the current picture: weekly, monthly, or at quarter end. Many teams keep a set of standing questions and rerun them rather than rebuilding a report." },
  { q: "Is my data safe?", a: "The connection is scoped to your Revly account and authorised by you. Claude reads your review data when you ask a question, and you can revoke the connection at any time from either side." }];

export const SLACK_FAQ = [
  { q: "Where is the Add to Slack button?", a: "Inside the Revly dashboard: Settings, then Integrations, then Add to Slack on the Slack Notifications card. It sits behind the login because the connection belongs to your Revly workspace, and only one of its owners or admins can make it. Sign in at app.revly.io, or create an account, then follow the six steps on this page." },
  { q: "What does Revly post to Slack?", a: "New reviews (full cards for one to three, a digest for four or more), reviews a reviewer has edited, reviews a platform has removed, incentive reminders when a collected review goes live, and a test message when you press Send Test. Each carries the rating, title, review text and reviewer name, plus buttons to respond in Revly or open the review on the platform." },
  { q: "Does Revly read my Slack messages?", a: "No. The app only posts. It asks for chat:write to post to the channel you choose, and channels:read and groups:read to list your channels in the picker. It never reads message content, member profiles or files, has no slash commands, does not respond to mentions, and never sends direct messages." },
  { q: "Which Revly plan do I need?", a: "Pro ($49 a month, or $41 a month billed annually), Business, or Agency. The Slack app itself is free; it is included with every paid plan. The Free plan does not include Slack notifications." },
  { q: "How quickly do notifications arrive?", a: "Revly checks each listing on a schedule set by your plan: every 6 hours on Pro and every 2 hours on Business and Agency. A few platforms are deliberately slower because each check is expensive to run. G2 and Trustpilot are checked once a day and Capterra every three days. Anything new found on a check is posted straight away, and Sync Now in the dashboard checks immediately on any plan." },
  { q: "Can I post to more than one channel?", a: "Each Revly workspace connects to one Slack workspace and one channel, and you can change the channel at any time. Agencies that manage several client workspaces connect each one to its own channel." },
  { q: "Why did a review not show up in Slack?", a: "Reviews posted more than 30 days ago that Revly picks up on a first sync or a historical sweep are backfill, not news, so they are stored but not announced. If a recent review was missed, check that Revly is still a member of the channel, that the app is still installed in your Slack workspace, and that your plan includes Slack." },
  { q: "How do I disconnect Revly from Slack?", a: "Settings, then Integrations, then Disconnect. Revly revokes its token with Slack and deletes the stored workspace, token and channel details immediately. You can also remove the app from Slack's side under Manage apps." }];
