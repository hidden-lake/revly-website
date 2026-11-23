// Revly blog: "How to connect your review data to Claude or ChatGPT"
//
// Generated from the approved draft in revly-content-agent
// (drafts/connect-review-data-to-claude-chatgpt/post.md). Edit the draft, not this file.

export const meta = {
  slug: 'connect-review-data-to-claude-chatgpt',
  title: "How to connect your review data to Claude or ChatGPT",
  metaTitle: 'How to Connect Review Data to Claude or ChatGPT | Revly',
  metaDescription:
    'No review platform connects all your reviews to Claude or ChatGPT at once. How to query G2, Capterra and app store reviews together through one connector.',
  excerpt:
    "G2 has its own connector for Claude and ChatGPT, but access depends on your G2 plan, and most other review platforms have none. To ask one question across every platform and product, your reviews need to sit behind one connector. Here's how that works, and how to set it up.",
  description:
    'No review platform offers one connector for all your reviews. How to query reviews from G2, Capterra, Trustpilot and the app marketplaces in Claude or ChatGPT through one connector, with setup steps for both.',
  author: 'Revly team',
  related: ['g2-alternatives', 'how-many-g2-reviews-do-you-need'],
  category: 'Review data',
  datePublished: '2026-11-23',
  dateModified: '2026-11-23',
  dateDisplay: '23 November 2026',
  readTime: '8 min read',
  cover: '/assets/blog/cover-connect-review-data-ai.svg',
  coverAlt: 'Hand-drawn illustration of a chat bubble plugged into a star by a cable.',
  featured: false,
  keywords:
    'connect review data to Claude, ChatGPT MCP connector, Claude custom connector, Model Context Protocol, review data AI, Revly MCP',
  about: [
    { '@type': 'SoftwareApplication', name: 'Claude', url: 'https://claude.ai/' },
    { '@type': 'SoftwareApplication', name: 'ChatGPT', url: 'https://chatgpt.com/' },
    { '@type': 'Thing', name: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
    { '@type': 'Organization', name: 'G2', url: 'https://www.g2.com/' },
  ],
  citation: [
    { '@type': 'CreativeWork', name: 'Get started with custom connectors using remote MCP', url: 'https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp' },
    { '@type': 'CreativeWork', name: "Use connectors to extend Claude's capabilities", url: 'https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities' },
    { '@type': 'CreativeWork', name: 'Connecting custom MCP servers in ChatGPT', url: 'https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta' },
    { '@type': 'CreativeWork', name: 'Connecting and managing app accounts in ChatGPT', url: 'https://help.openai.com/en/articles/20001494' },
    { '@type': 'CreativeWork', name: 'G2 MCP Server documentation', url: 'https://documentation.g2.com/docs/g2-mcp-server' },
    { '@type': 'CreativeWork', name: 'Trustpilot API module overview', url: 'https://developers.trustpilot.com/api-module-overview/' },
    { '@type': 'CreativeWork', name: 'Shopify: manage app reviews', url: 'https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews' },
    { '@type': 'CreativeWork', name: 'Model Context Protocol introduction', url: 'https://modelcontextprotocol.io/introduction' },
    { '@type': 'CreativeWork', name: 'Introducing the Model Context Protocol', url: 'https://www.anthropic.com/news/model-context-protocol' },
  ],
  cta: {
    headingTop: 'Ask your review data',
    headingAccent: 'anything.',
    body: 'Revly collects reviews across G2, Capterra and the app marketplaces from a single link, keeps them in one dashboard with Slack alerts and AI-drafted replies, puts the best ones on your site with widgets, and lets you query all of it from Claude or ChatGPT with one connector.',
    primary: { label: 'Start free', href: '/pricing/' },
    secondary: { label: 'See what the Claude and ChatGPT connector can do', href: '/claude-mcp/' },
  },
};

export const blocks = [
  {
    "type": "lead",
    "text": "If your reviews live on G2, Capterra, Trustpilot and a couple of app marketplaces, you have probably wondered whether Claude or ChatGPT could read all of them and answer questions about your product. They can, through one connector that holds every review you have. No review platform offers that itself: G2 has a connector for its own reviews, depending on your G2 plan, and most others have none."
  },
  {
    "type": "p",
    "text": "Revly's connector for Claude and ChatGPT puts your reviews from every platform and every product behind one connection, so a single question gets an answer drawn from all of them."
  },
  {
    "type": "h2",
    "text": "One connector for every review platform"
  },
  {
    "type": "p",
    "text": "Revly pulls your reviews from [G2, Capterra, Trustpilot and the app marketplaces](/monitor-platforms/) into one dashboard, sorted by product. The Revly AI + MCP connector makes that whole library available in Claude or ChatGPT, together with the analytics from your [Revly collection links](/collect-quality-reviews/)."
  },
  {
    "type": "graphic",
    "name": "one-connector"
  },
  {
    "type": "p",
    "text": "The difference shows in the size of the question you can ask."
  },
  {
    "type": "p",
    "text": "Start with the quote you need while you write: \"Find the strongest line about onboarding from any five-star review this year, on any platform.\" The answer comes back with the reviewer, the platform and the date, so you can check it before it goes on a landing page, into an ad or onto a slide."
  },
  {
    "type": "p",
    "text": "Then ask how customers describe you: \"How do customers describe the reporting feature, in their own words?\" Reviews are a record of how buyers explain your product to each other, and that phrasing usually lands better in copy than anything written in a positioning workshop."
  },
  {
    "type": "p",
    "text": "Reporting no longer needs an export: \"Compare our average rating on each platform this quarter with last quarter, and list unanswered reviews under four stars.\" Save the prompt and ask it again next quarter. The data is current each time, so the report rebuilds itself."
  },
  {
    "type": "p",
    "text": "And you can find where collection breaks down: \"Which collection links brought in the most detailed reviews, and where do customers drop out?\" No review platform can tell you this, because the record of who you asked and who finished sits in Revly."
  },
  {
    "type": "p",
    "text": "Whatever you ask, have the assistant cite the review behind each claim, and open a few of them yourself. Assistants summarise confidently, and a summary of 400 reviews is still a summary."
  },
  {
    "type": "h2",
    "text": "How do you connect Revly to Claude or ChatGPT?"
  },
  {
    "type": "p",
    "text": "The setup has three parts: [connect your review platforms in Revly](/pricing/), turn on the connector and add it to your assistant once, then ask."
  },
  {
    "type": "graphic",
    "name": "setup-flow"
  },
  {
    "type": "p",
    "text": "The connector is included on the Team plan and above. In Revly, open Settings, scroll down to Integrations and find Revly AI + MCP. Turn it on there and copy the connector address it gives you."
  },
  {
    "type": "h3",
    "text": "In Claude"
  },
  {
    "type": "graphic",
    "name": "claude-connector-steps"
  },
  {
    "type": "p",
    "text": "On Claude Team and Enterprise, an owner adds the connector first under Organization settings, then Connectors. Everyone else then finds it in their own Connectors list and clicks Connect. To use it in a chat, click the \"+\" in the lower left, go to Connectors and switch Revly on."
  },
  {
    "type": "h3",
    "text": "In ChatGPT"
  },
  {
    "type": "graphic",
    "name": "chatgpt-connector-steps"
  },
  {
    "type": "p",
    "text": "In a chat, type @ and pick Revly. The selection applies to one message at a time, so pick it again whenever you want your review data in the answer."
  },
  {
    "type": "h2",
    "text": "Can you connect each review platform to Claude or ChatGPT separately?"
  },
  {
    "type": "p",
    "text": "Mostly, no. Of the platforms software companies collect reviews on, G2 is the only one with an official connector that is generally available."
  },
  {
    "type": "graphic",
    "name": "platform-connectors",
    "caption": "From each platform's own documentation and the Claude and ChatGPT connector directories: [G2 MCP Server](https://documentation.g2.com/docs/g2-mcp-server), [Trustpilot API module](https://developers.trustpilot.com/api-module-overview/), [Shopify app reviews](https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews)."
  },
  {
    "type": "p",
    "text": "G2's own [G2 MCP Server](https://documentation.g2.com/docs/g2-mcp-server) works in Claude and ChatGPT, but you need a G2 account, and G2 says what you can access \"depends on your G2 subscription and entitlements.\" It covers G2 data. Its documentation does not mention Capterra, GetApp or Software Advice reviews, even though [G2 now owns all three](/blog/g2-capterra-acquisition-review-management/)."
  },
  {
    "type": "p",
    "text": "Trustpilot offers [API access as a paid add-on](https://developers.trustpilot.com/api-module-overview/), and has [announced a connector](https://www.prnewswire.com/it/comunicati-stampa/trustpilot-amplia-la-suite-ai-discovery-con-pagine-dedicate-alle-recensioni-di-prodotto-e-nuovi-strumenti-di-brand-intelligence-302888153.html) in a limited beta for Enterprise customers. For Capterra, the Shopify App Store, WooCommerce, Xero and QuickBooks, we found no official connector and no way to read your own reviews from outside the platform. On the Shopify App Store, [reviews live in the Partner Dashboard](https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews). WordPress.org publishes plugin reviews openly but offers no connector."
  },
  {
    "type": "p",
    "text": "Even where a connector exists, the useful questions cross platforms. \"Which feature do five-star reviewers mention most?\" has a different answer on G2 than on the Shopify App Store, and you want the combined one. With separate connections you ask several times, get several partial answers and stitch them together yourself. An assistant connected only to G2 answers confidently about G2 and stays silent about everything else, which matters most for a product whose buyers [read reviews somewhere other than G2](/blog/g2-alternatives/)."
  },
  {
    "type": "h2",
    "text": "Which Claude and ChatGPT plans support custom connectors?"
  },
  {
    "type": "p",
    "text": "Claude allows a custom connector on every plan, Free included, according to Anthropic's [custom connector guide](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp). ChatGPT keeps them to its workplace plans, according to [OpenAI's help page](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta)."
  },
  {
    "type": "graphic",
    "name": "mcp-plans",
    "caption": "From [Anthropic's custom connector guide](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp) and [OpenAI's custom MCP help page](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta)."
  },
  {
    "type": "p",
    "text": "Reading reviews only needs read access, so a ChatGPT Pro account may work too. We would test it on your own account first."
  },
  {
    "type": "h2",
    "text": "Is the Revly connector safe?"
  },
  {
    "type": "p",
    "text": "Yes. You sign in through Revly's own login window, the same way you connect Slack or Google Drive to another app, and Claude or ChatGPT never sees your password. The connector only reads your review and collection data and turns it into answers. It never posts a review, a reply or anything else on your behalf, and it doesn't change your data in Revly."
  },
  {
    "type": "p",
    "text": "You stay in control of the connection. To end it, remove the connector in Claude under Customize, then Connectors, or in ChatGPT under Settings, then Plugins. You can also switch Revly AI + MCP off in Revly's settings."
  }
];

export const faqs = [
  {
    "q": "Can I connect all my review platforms to Claude or ChatGPT at once?",
    "a": "Yes, with Revly's connector. Revly brings your reviews from G2, Capterra, Trustpilot and the app marketplaces into one place, and the Revly AI + MCP connector makes all of them available in Claude or ChatGPT at once. The platforms themselves don't offer this: apart from G2, whose connector depends on your G2 plan, none has its own."
  },
  {
    "q": "What can I ask once my reviews are connected?",
    "a": "Anything you would ask someone who had read every review. Ask for the strongest quote on a topic for a campaign, how customers describe a feature in their own words, how ratings changed on each platform this quarter, which low ratings still need a reply, or which collection links bring in the most detailed reviews."
  },
  {
    "q": "What is an MCP connector?",
    "a": "An MCP connector links an AI assistant like Claude or ChatGPT to an outside tool through the Model Context Protocol, an [open standard created by Anthropic](https://www.anthropic.com/news/model-context-protocol). You add the connector once and sign in, and from then on the assistant can look things up in that tool while you chat, without exports or copy and paste."
  },
  {
    "q": "Does G2 have its own connector for Claude and ChatGPT?",
    "a": "Yes. The G2 MCP Server works in Claude and ChatGPT, but you need a G2 account, and G2 says access to its data depends on your subscription. It covers G2 reviews only, so reviews on Capterra, Trustpilot or the app marketplaces still need a separate route, such as Revly's single connector."
  },
  {
    "q": "Can I connect review data to Claude on the free plan?",
    "a": "Yes. Claude's Free plan allows one custom connector, which is enough for the Revly connector, since one connection covers every platform Revly monitors. Paid Claude plans can add more connectors. Revly's connector itself is included on Revly's Team plan and above."
  },
  {
    "q": "Which ChatGPT plans support custom connectors?",
    "a": "ChatGPT Business, Enterprise and Edu workspaces can add custom connectors on the web, and admins and owners set them up for the workspace. OpenAI's help page also says Pro users can connect them with read access only, which is all a review connector like Revly's needs."
  },
  {
    "q": "Can Claude or ChatGPT post replies to reviews through the Revly connector?",
    "a": "No. Revly's connector only reads your review and collection data, so neither assistant can post a review, reply or change anything through it. To answer a review, Revly drafts a reply in your brand voice and a person on your team posts it on the review platform."
  },
  {
    "q": "How do I disconnect Revly from Claude or ChatGPT?",
    "a": "Remove the connector in Claude under Customize, then Connectors, or in ChatGPT under Settings, then Plugins, by selecting Revly and choosing Disconnect. You can also switch off Revly AI + MCP in Revly under Settings, then Integrations, to turn the connector off from Revly's side."
  }
];

// Steps rendered by the claude-connector-steps and chatgpt-connector-steps figures.
export const CLAUDE_STEPS = [
  "Open [Customize, then Connectors](https://claude.ai/customize/connectors).",
  "Click \"+ Add\", then \"Add custom connector\". Some versions of the menu put this under \"Add\", then \"Custom\", then \"Web\".",
  "Name it Revly.",
  "Paste the connector address from Revly AI + MCP and click Continue.",
  "Keep the authentication settings Claude detects and click Add.",
  "Sign in with your Revly account when the window opens, and approve access."
];
export const CHATGPT_STEPS = [
  "Go to [Plugins](https://chatgpt.com/plugins) on chatgpt.com.",
  "Click the plus button, then \"Add custom MCP server\".",
  "Name it Revly.",
  "Under Connection, paste the connector address from Revly AI + MCP.",
  "Choose OAuth, tick \"I understand and want to continue\", and select \"Create as a plugin\".",
  "Install the plugin and sign in with your Revly account."
];
