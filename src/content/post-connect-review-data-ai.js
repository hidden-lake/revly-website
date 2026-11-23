// Revly blog: "How to connect your review data to Claude or ChatGPT"
//
// Generated from the approved draft in revly-content-agent
// (drafts/connect-review-data-to-claude-chatgpt/post.md). Edit the draft, not this file.

export const meta = {
  slug: 'connect-review-data-to-claude-chatgpt',
  title: "How to connect your review data to Claude or ChatGPT",
  metaTitle: 'How to Connect Review Data to Claude or ChatGPT | Revly',
  metaDescription:
    'Connect review data to Claude from Customize, then Connectors, on any plan. ChatGPT limits custom MCP servers to Business, Enterprise and Edu. Steps inside.',
  excerpt:
    'Claude lets every plan add a custom MCP connector, Free included. ChatGPT keeps custom MCP servers to Business, Enterprise and Edu on the web. The steps for both, what to ask once your reviews are connected, and what to check before you hand an AI assistant customer data.',
  description:
    'Claude allows a custom MCP connector on every plan, Free included; ChatGPT limits custom MCP servers to Business, Enterprise and Edu. Steps for both, what to ask, and what to check first.',
  author: 'Revly team',
  related: ['g2-alternatives', 'how-many-g2-reviews-do-you-need'],
  category: 'Review data',
  datePublished: '2026-11-24',
  dateModified: '2026-11-24',
  dateDisplay: '24 November 2026',
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
  ],
  citation: [
    { '@type': 'CreativeWork', name: 'Get started with custom connectors using remote MCP', url: 'https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp' },
    { '@type': 'CreativeWork', name: "Use connectors to extend Claude's capabilities", url: 'https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities' },
    { '@type': 'CreativeWork', name: 'Connecting custom MCP servers in ChatGPT', url: 'https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta' },
    { '@type': 'CreativeWork', name: 'Connecting and managing app accounts in ChatGPT', url: 'https://help.openai.com/en/articles/20001494' },
    { '@type': 'CreativeWork', name: 'Model Context Protocol introduction', url: 'https://modelcontextprotocol.io/introduction' },
    { '@type': 'CreativeWork', name: 'Introducing the Model Context Protocol', url: 'https://www.anthropic.com/news/model-context-protocol' },
  ],
  cta: {
    headingTop: 'Ask your review data',
    headingAccent: 'anything.',
    body: 'Revly collects reviews across G2, Capterra and the app marketplaces from a single link, keeps them in one dashboard with Slack alerts and AI-drafted replies, puts the best ones on your site with widgets, and lets you query all of it from Claude or ChatGPT.',
    primary: { label: 'Start free', href: '/pricing/' },
    secondary: { label: 'See how the Claude and ChatGPT connector works', href: '/claude-mcp/' },
  },
};

export const blocks = [
  {
    "type": "lead",
    "text": "If you have tried asking Claude or ChatGPT about your G2 reviews, you have probably ended up pasting them in by hand. You can connect the data directly instead, through a standard called MCP. In Claude, open Customize, then Connectors, add a custom connector and paste the server URL your review tool gives you. In ChatGPT, custom MCP servers are limited to Business, Enterprise and Edu workspaces on the web."
  },
  {
    "type": "p",
    "text": "Once the connection is in place, the assistant reads your reviews when you ask a question and answers from them, with the quotes attached."
  },
  {
    "type": "h2",
    "text": "What is MCP?"
  },
  {
    "type": "p",
    "text": "MCP, the Model Context Protocol, is how AI assistants connect to outside data. The [project's own documentation](https://modelcontextprotocol.io/introduction) describes it as \"an open-source standard for connecting AI applications to external systems.\" Anthropic [open-sourced it on 25 November 2024](https://www.anthropic.com/news/model-context-protocol), and Claude and ChatGPT both support it today."
  },
  {
    "type": "p",
    "text": "A review tool that runs an MCP server can be added to your assistant as a connector, the same way you would add Google Drive or Slack. You sign in once, and from then on the assistant can look things up in that tool while you chat. No CSV exports, no copying reviews into a prompt."
  },
  {
    "type": "h2",
    "text": "Which plans can connect a custom MCP server?"
  },
  {
    "type": "p",
    "text": "Claude is the easier of the two. Anthropic's [custom connector guide](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp) lists every plan, from Free to Enterprise, with one limit on Free: a single custom connector. ChatGPT reserves custom MCP servers for its workplace plans."
  },
  {
    "type": "graphic",
    "name": "mcp-plans",
    "caption": "From [Anthropic's custom connector guide](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp) and [OpenAI's custom MCP help page](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta), checked 23 November 2026."
  },
  {
    "type": "p",
    "text": "Plan names and limits are from Anthropic's and OpenAI's help centres as of 23 November 2026, and both change often."
  },
  {
    "type": "p",
    "text": "Before you buy a plan for this, know that OpenAI's [custom MCP help page](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta) contradicts itself. It lists Business, Enterprise and Edu under Availability, then says in its FAQ that Pro users \"can connect custom MCP servers with read/fetch permissions.\" Reading reviews only needs read access, so a Pro account may well work. We would test it on your own account before counting on it."
  },
  {
    "type": "h2",
    "text": "How do you add a connector in Claude?"
  },
  {
    "type": "p",
    "text": "On a personal plan (Free, Pro or Max), the steps from Anthropic's guide are:"
  },
  {
    "type": "graphic",
    "name": "claude-connector-steps"
  },
  {
    "type": "p",
    "text": "On Team and Enterprise, an owner adds the connector first under Organization settings, then Connectors. After that, everyone else finds it in their own Connectors list with a \"Custom\" label and clicks Connect, which signs them in individually."
  },
  {
    "type": "p",
    "text": "To use it, open a chat, click the \"+\" in the lower left, go to Connectors and switch it on for that conversation. Anthropic also notes that editing a custom connector means removing it and adding it again with the new details, so get the URL right the first time."
  },
  {
    "type": "h2",
    "text": "How do you add one in ChatGPT?"
  },
  {
    "type": "p",
    "text": "Older guides send you through Developer mode. OpenAI's current page says you no longer need to turn it on, and the option now lives under Plugins. The steps on a Business, Enterprise or Edu workspace are:"
  },
  {
    "type": "graphic",
    "name": "chatgpt-connector-steps"
  },
  {
    "type": "p",
    "text": "In a chat, type @ and pick the connector, or choose it from the \"+\" menu. The selection applies to that one message, not the whole conversation, so you pick it again each time you want your review data in the answer."
  },
  {
    "type": "p",
    "text": "On Business, only admins and owners can create and publish these, so if the option is missing, that is usually why."
  },
  {
    "type": "h2",
    "text": "What should you ask once it is connected?"
  },
  {
    "type": "p",
    "text": "The connector is only as useful as the questions you put to it, and the best ones are the questions you would otherwise answer with an afternoon of exports and a spreadsheet."
  },
  {
    "type": "p",
    "text": "Start with the quote you need while you write: \"Find the three strongest quotes about onboarding from five-star G2 reviews this year.\" The answer comes back with the reviewer and the platform attached, so you can check the source before the line goes on a landing page."
  },
  {
    "type": "p",
    "text": "For customer language, \"How do customers describe the reporting feature in their own words?\" is the use we would start with. Reviews are a record of how buyers explain your product to each other, and that phrasing tends to land better in an ad or on a pricing page than anything written in a positioning workshop."
  },
  {
    "type": "p",
    "text": "For reporting, try \"Compare our average rating by platform this quarter with last quarter, and list unanswered reviews below four stars.\" Save the prompt and ask it again next quarter. The data is live each time, so the report updates itself."
  },
  {
    "type": "p",
    "text": "If your review tool also records collection, you can ask where customers drop out of the flow or which campaigns convert. That turns a vague sense that \"people are not finishing\" into the specific step to fix."
  },
  {
    "type": "p",
    "text": "Whatever you ask, have the assistant cite the review behind every claim, and open a few of them yourself. Assistants summarise confidently, and a summary of 400 reviews is still a summary."
  },
  {
    "type": "h2",
    "text": "Is it safe to connect review data to an AI assistant?"
  },
  {
    "type": "p",
    "text": "Both assistants connect through OAuth, the same sign-in you use to connect Slack or Google Drive to another app. You approve access in the review tool's own login window, the assistant never sees your password, and you can revoke access whenever you like. In Claude, remove or disconnect the connector under Customize, then Connectors. In ChatGPT, disconnect it under Settings, then Plugins."
  },
  {
    "type": "p",
    "text": "Both vendors leave the judgment about which servers to trust with you. Anthropic's guide says custom connectors \"connect Claude to services that haven't been verified by Anthropic.\" OpenAI's page warns that \"connecting to unsafe or untrusted MCP servers may increase exposure to security risks (including prompt injection).\" In practice that means connecting servers run by the companies whose tools you already use, from the URL they publish, and treating any MCP server you found on a forum with the suspicion it deserves."
  },
  {
    "type": "p",
    "text": "Reviews are already public, so the exposure is smaller than connecting a CRM or a shared drive. The parts that are not public, like reviewer email addresses, collection data and incentive records, are worth a look in your review tool's documentation before you connect."
  },
  {
    "type": "h2",
    "text": "Connecting Revly to Claude or ChatGPT"
  },
  {
    "type": "p",
    "text": "Revly runs its own MCP server at https://app.revly.io/api/mcp, and it is included on the Team plan and above. Add it with the steps above, sign in with your Revly account, and the assistant can query every review Revly holds for you, across [G2, Capterra, Trustpilot and the app marketplaces your products are listed on](/monitor-platforms/), plus the analytics from your [Revly collection links](/collect-quality-reviews/)."
  },
  {
    "type": "p",
    "text": "The review platforms each hold their own slice of feedback, and the record of who you asked, who finished and where people dropped out sits in Revly. With both behind one connector, \"which campaign brought in our most detailed reviews last quarter\" is a single question. [More on what the Revly connector can do](/claude-mcp/)."
  }
];

export const faqs = [
  {
    "q": "What is an MCP connector?",
    "a": "An MCP connector links an AI assistant like Claude or ChatGPT to an outside tool through the Model Context Protocol, an open standard Anthropic released in November 2024. Once connected, the assistant can look up data in that tool while you chat."
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
    "q": "Do I need developer mode to add an MCP server in ChatGPT?",
    "a": "No. OpenAI's current help page says you do not need to turn on Developer Mode first. You add the server from Plugins on chatgpt.com, using \"Add custom MCP server\"."
  },
  {
    "q": "Can I set up a custom connector on my phone?",
    "a": "In ChatGPT, no: custom MCP servers are web only. In Claude, mobile setup is in beta and Anthropic recommends the web or desktop app, but a connector added there works in the Claude mobile apps."
  },
  {
    "q": "Can Claude or ChatGPT post replies to reviews through a connector?",
    "a": "Only if the connector offers a tool for posting, and Revly's does not. Revly's connector reads review and collection data, and a person on your team still posts each reply on the review platform."
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
  "Give it a name. This is what you will see in the connector list.",
  "Paste the server URL exactly as your provider documents it, including the path at the end, and click Continue.",
  "Keep the authentication settings Claude detects, unless your provider tells you otherwise, and click Add.",
  "Sign in to the review tool when the window opens, and approve access."
];
export const CHATGPT_STEPS = [
  "Go to [Plugins](https://chatgpt.com/plugins) on chatgpt.com.",
  "Click the plus button, then \"Add custom MCP server\".",
  "Enter a name, and a description if you want one.",
  "Under Connection, paste the server URL.",
  "Choose OAuth for authentication, tick \"I understand and want to continue\" under the risk warning, and select \"Create as a plugin\".",
  "Review the tools ChatGPT found, install the plugin, and sign in to the review tool."
];
