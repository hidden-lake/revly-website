// Revly blog: "How to connect your review data to Claude or ChatGPT"
//
// Generated from the approved draft in revly-content-agent
// (drafts/connect-review-data-to-claude-chatgpt/post.md). Edit the draft, not this file.

export const meta = {
  slug: 'connect-review-data-to-claude-chatgpt',
  title: "How to connect your review data to Claude or ChatGPT",
  metaTitle: 'How to Connect Review Data to Claude or ChatGPT | Revly',
  metaDescription:
    'No review platform connects all your reviews to Claude or ChatGPT at once. How to query G2, Capterra and app store reviews together with one connector.',
  excerpt:
    'G2 has its own connector for Claude and ChatGPT, Trustpilot has one in an Enterprise beta, and the app marketplaces have none. To ask one question across every platform and every product, your reviews need to sit behind one connector. Here is how that works, and how to set it up.',
  description:
    'No review platform offers one connector for all your reviews. How to query reviews from G2, Capterra, Trustpilot and the app marketplaces in Claude or ChatGPT through one connector, with setup steps for both.',
  author: 'Revly team',
  related: ['g2-alternatives', 'how-many-g2-reviews-do-you-need'],
  category: 'Review data',
  datePublished: '2026-11-24',
  dateModified: '2026-11-24',
  dateDisplay: '24 November 2026',
  readTime: '9 min read',
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
    "text": "If your reviews live on G2, Capterra, Trustpilot and a couple of app marketplaces, you have probably wondered whether Claude or ChatGPT could read all of them and answer questions about your product. They can, but not through the review platforms themselves. Claude and ChatGPT connect to outside data through MCP connectors, and no review platform offers one connector that covers the others."
  },
  {
    "type": "p",
    "text": "G2 has its own connector, Trustpilot has one in a limited beta for Enterprise customers, and we found no official connector from Capterra, the Shopify App Store, WordPress.org, WooCommerce, Xero or QuickBooks. To ask one question across every platform and every product, the reviews first need to sit in one place that runs its own connector. That is what Revly's connector for Claude and ChatGPT does."
  },
  {
    "type": "h2",
    "text": "What is an MCP connector?"
  },
  {
    "type": "p",
    "text": "MCP, the Model Context Protocol, is how AI assistants connect to outside tools. The [project's own documentation](https://modelcontextprotocol.io/introduction) describes it as \"an open-source standard for connecting AI applications to external systems.\" Anthropic [open-sourced it on 25 November 2024](https://www.anthropic.com/news/model-context-protocol), and both Claude and ChatGPT support it today."
  },
  {
    "type": "p",
    "text": "When a tool runs an MCP server, you add it to your assistant once and sign in. From then on the assistant can look things up in that tool while you chat, so you stop exporting CSVs and pasting reviews into a prompt."
  },
  {
    "type": "h2",
    "text": "Can you connect each review platform to Claude or ChatGPT?"
  },
  {
    "type": "p",
    "text": "Only one of the platforms software companies collect reviews on has an official connector that is generally available, and it covers its own reviews only."
  },
  {
    "type": "graphic",
    "name": "platform-connectors",
    "caption": "From each platform's own documentation and the Claude and ChatGPT connector directories, checked 23 November 2026: [G2 MCP Server](https://documentation.g2.com/docs/g2-mcp-server), [Trustpilot API module](https://developers.trustpilot.com/api-module-overview/), [Shopify app reviews](https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews)."
  },
  {
    "type": "p",
    "text": "G2 runs the [G2 MCP Server](https://documentation.g2.com/docs/g2-mcp-server), which works in Claude, ChatGPT and Microsoft Copilot. G2's documentation, updated 29 October 2026, says you need a G2 account to sign in and that \"access to G2 data depends on your G2 subscription and entitlements.\" Some review data needs an Enterprise package. The connector returns G2 data, and its documentation does not mention Capterra, GetApp or Software Advice reviews, even though G2 now owns all three."
  },
  {
    "type": "p",
    "text": "Trustpilot sells API access as [an add-on for Trustpilot for Business users](https://developers.trustpilot.com/api-module-overview/), included on its Enterprise plan. In September 2026 it [announced an MCP service](https://www.prnewswire.com/it/comunicati-stampa/trustpilot-amplia-la-suite-ai-discovery-con-pagine-dedicate-alle-recensioni-di-prodotto-e-nuovi-strumenti-di-brand-intelligence-302888153.html) as part of a limited beta for Enterprise customers."
  },
  {
    "type": "p",
    "text": "For Capterra, the Shopify App Store, WooCommerce, Xero and QuickBooks, we found no official connector and no published API for reading your own reviews. On the Shopify App Store, for example, [you read and reply to reviews in the Partner Dashboard](https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews). WordPress.org publishes plugin reviews openly, but offers no connector."
  },
  {
    "type": "p",
    "text": "We checked each platform's own documentation and the Claude and ChatGPT connector directories on 23 November 2026. The directories list hundreds of connectors and change weekly, so check again before you rely on this."
  },
  {
    "type": "h2",
    "text": "Why connecting platforms one at a time falls short"
  },
  {
    "type": "p",
    "text": "Say you could connect every platform separately. The questions worth asking still cross platforms. \"Which feature do five-star reviewers mention most?\" has a different answer on G2 than on the Shopify App Store, and the useful answer is the combined one. With separate connectors, you ask the same question several times, get several partial answers, and stitch them together yourself, which is the spreadsheet you were trying to avoid."
  },
  {
    "type": "p",
    "text": "The gaps make it worse. With no connector for most marketplaces, an assistant connected only to G2 answers confidently about G2 and stays silent about everything else. A summary that leaves out your Shopify listing reads exactly like a summary that includes it."
  },
  {
    "type": "p",
    "text": "Product teams with more than one product hit a third problem. Each platform organises reviews by its own listing, so \"how do customers describe product A compared with product B\" turns into another round of manual matching."
  },
  {
    "type": "h2",
    "text": "One connector for every platform, through Revly"
  },
  {
    "type": "p",
    "text": "Revly already pulls your reviews from [G2, Capterra, Trustpilot and the app marketplaces](/monitor-platforms/) into one dashboard, sorted by product. Its MCP server puts that whole library behind a single connector in Claude or ChatGPT, together with the analytics from your [Revly collection links](/collect-quality-reviews/)."
  },
  {
    "type": "graphic",
    "name": "one-connector"
  },
  {
    "type": "p",
    "text": "That changes the size of the question you can ask."
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
    "text": "And you can find where collection breaks down: \"Which collection links brought in the most detailed reviews, and where do customers drop out?\" This is the part no review platform can tell you, because the record of who you asked and who finished sits in Revly."
  },
  {
    "type": "p",
    "text": "Whatever you ask, have the assistant cite the review behind each claim, and open a few of them yourself. Assistants summarise confidently, and a summary of 400 reviews is still a summary."
  },
  {
    "type": "h2",
    "text": "How do you add the Revly connector?"
  },
  {
    "type": "p",
    "text": "The setup has three parts: connect your review platforms in Revly, add Revly to your assistant once, and ask."
  },
  {
    "type": "graphic",
    "name": "setup-flow"
  },
  {
    "type": "p",
    "text": "Revly's MCP server address is https://app.revly.io/api/mcp, and the connector is included on the Team plan and above. The steps are the same as for any custom connector."
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
    "text": "On Claude Team and Enterprise, an owner adds the connector first under Organization settings, then Connectors. Everyone else then finds it in their own Connectors list with a \"Custom\" label and clicks Connect. To use it in a chat, click the \"+\" in the lower left, go to Connectors and switch Revly on."
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
    "text": "In a chat, type @ and pick Revly. The selection applies to one message at a time, so pick it again whenever you want your review data in the answer. Older guides send you through Developer mode, and [OpenAI's current help page](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta) says you no longer need it."
  },
  {
    "type": "h2",
    "text": "Which Claude and ChatGPT plans support custom connectors?"
  },
  {
    "type": "p",
    "text": "Claude is the easier of the two. Anthropic's [custom connector guide](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp) lists every plan from Free to Enterprise, with one limit on Free: a single custom connector. ChatGPT keeps custom MCP servers to its workplace plans."
  },
  {
    "type": "graphic",
    "name": "mcp-plans",
    "caption": "From [Anthropic's custom connector guide](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp) and [OpenAI's custom MCP help page](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta), checked 23 November 2026."
  },
  {
    "type": "p",
    "text": "OpenAI's help page contradicts itself on Pro. It lists Business, Enterprise and Edu under Availability, then says in its FAQ that Pro users \"can connect custom MCP servers with read/fetch permissions.\" Reading reviews only needs read access, so a Pro account may work, but we would test it on your own account first."
  },
  {
    "type": "h2",
    "text": "Is it safe to connect review data to an AI assistant?"
  },
  {
    "type": "p",
    "text": "Both assistants connect through OAuth, the same sign-in you use when you connect Slack or Google Drive to another app. You approve access in Revly's own login window, the assistant never sees your password, and you can revoke access at any time: in Claude under Customize, then Connectors, and in ChatGPT under Settings, then Plugins."
  },
  {
    "type": "p",
    "text": "Both vendors leave the judgment about which servers to trust with you. Anthropic's guide says custom connectors \"connect Claude to services that haven't been verified by Anthropic.\" OpenAI warns that \"connecting to unsafe or untrusted MCP servers may increase exposure to security risks (including prompt injection).\" Connect servers run by the companies whose tools you already use, from the address they publish, and treat any review connector you found on a forum with the suspicion it deserves."
  }
];

export const faqs = [
  {
    "q": "Can I connect all my review platforms to Claude or ChatGPT at once?",
    "a": "Not through the platforms themselves. As of November 2026, G2 is the only one of G2, Capterra, Trustpilot and the main app marketplaces with a generally available official connector, and it covers G2 data. Connecting a tool that already holds reviews from every platform, like Revly, gives the assistant all of them through one connector."
  },
  {
    "q": "Does G2 have a connector for Claude and ChatGPT?",
    "a": "Yes. The G2 MCP Server works in Claude, ChatGPT and Microsoft Copilot. G2 says you need a G2 account to sign in, and that access to its data depends on your G2 subscription and entitlements."
  },
  {
    "q": "Can I connect review data to Claude on the free plan?",
    "a": "Yes. Claude's Free plan allows one custom connector, according to Anthropic's help centre as of November 2026. Anthropic names that limit for the Free plan only."
  },
  {
    "q": "Which ChatGPT plans support custom MCP servers?",
    "a": "ChatGPT Business, Enterprise and Edu support custom MCP servers on the web, according to OpenAI's help centre as of November 2026. The same page says Pro users can connect them with read access only."
  },
  {
    "q": "What can I ask once my reviews are connected?",
    "a": "Anything you would ask someone who had read every review: the strongest quote on a topic, how customers describe a feature, rating changes by platform, unanswered low ratings, or which collection links bring in the most detailed reviews."
  },
  {
    "q": "Can Claude or ChatGPT post replies to reviews through the Revly connector?",
    "a": "No. Revly's connector reads review and collection data, and a person on your team still posts each reply on the review platform."
  },
  {
    "q": "How do I disconnect a review tool from Claude or ChatGPT?",
    "a": "In Claude, remove the connector under Customize, then Connectors. In ChatGPT, open Settings, then Plugins, select the plugin and choose Disconnect. You can also revoke access from the review tool's side."
  }
];

// Steps rendered by the claude-connector-steps and chatgpt-connector-steps figures.
export const CLAUDE_STEPS = [
  "Open [Customize, then Connectors](https://claude.ai/customize/connectors).",
  "Click \"+ Add\", then \"Add custom connector\". Some versions of the menu put this under \"Add\", then \"Custom\", then \"Web\".",
  "Name it Revly.",
  "Paste https://app.revly.io/api/mcp and click Continue.",
  "Keep the authentication settings Claude detects and click Add.",
  "Sign in with your Revly account when the window opens, and approve access."
];
export const CHATGPT_STEPS = [
  "Go to [Plugins](https://chatgpt.com/plugins) on chatgpt.com.",
  "Click the plus button, then \"Add custom MCP server\".",
  "Name it Revly.",
  "Under Connection, paste https://app.revly.io/api/mcp.",
  "Choose OAuth, tick \"I understand and want to continue\" under the risk warning, and select \"Create as a plugin\".",
  "Install the plugin and sign in with your Revly account."
];
