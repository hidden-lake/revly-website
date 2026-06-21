// Revly — Product pages (Collect, Monitor, Smart, Manage)
const PRODUCT_BASE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Revly",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://revly.io"
};
function softwareSchema(description) {
  return JSON.stringify({ ...PRODUCT_BASE_SCHEMA, description });
}
function faqSchema(items) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((it) => ({
      "@type": "Question",
      "name": it.q,
      "acceptedAnswer": { "@type": "Answer", "text": it.a }
    }))
  });
}

function ProductHero({ chip, chipClass, h1, sub, ctas, h1Black }) {
  return (
    <section style={{ background: "hsl(var(--card))", padding: "4rem 0 5rem" }}>
      <div className="container-x" style={{ maxWidth: "880px", textAlign: "center" }}>
        <div className={"chip " + chipClass} style={{ marginBottom: "1.5rem" }}>{chip}</div>
        <h1 className="h1" style={h1Black ? { color: "hsl(var(--foreground))" } : undefined}>{h1}</h1>
        <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "720px", marginLeft: "auto", marginRight: "auto" }}>{sub}</p>
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: ".75rem", flexWrap: "wrap" }}>{ctas}</div>
      </div>
    </section>);

}

function ProductBeforeAfter({ heading, rows }) {
  return (
    <section className="section" style={{ background: "hsl(var(--primary-foreground))" }}>
      <div className="container-x">
        <h2 className="h2" style={{ textAlign: "center", marginBottom: "3rem", maxWidth: "780px", marginLeft: "auto", marginRight: "auto" }}>{heading}</h2>
        <BeforeAfterSlider rows={rows} />
      </div>
    </section>);

}

function HowItWorksGrid({ heading, steps, extraBelow, narrow = false, bg = "#f6f6f4" }) {
  return (
    <section className="section" style={{ background: bg }}>
      <div className="container-x" style={narrow ? { maxWidth: "840px" } : undefined}>
        <h2 className="h2" style={{ textAlign: "center", marginBottom: "3.5rem", maxWidth: "820px", marginLeft: "auto", marginRight: "auto", color: "rgb(18, 18, 18)" }}>{heading}</h2>
        <div className="grid-4">
          {steps.map((s, i) =>
          <div key={i} className="card" style={{ padding: "2rem" }}>
              <div className="num-badge" style={{ marginBottom: "1rem" }}>{i + 1}</div>
              <h3 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.25rem", marginBottom: ".6rem" }}>{s.title}</h3>
              <p style={{ color: "hsl(var(--foreground)/0.65)", fontSize: ".97rem", lineHeight: 1.65 }}>{s.body}</p>
            </div>
          )}
        </div>
        {extraBelow}
      </div>
    </section>);

}

function ThreeColCallout({ title, items, bg = "ink", variant = "horizontal" }) {
  if (variant === "stack") {
    const cards = items.map((it) => ({ tag: it.title, text: it.body }));
    return <StackReveal title={title} cards={cards} bg={bg} />;
  }
  const panels = items.map((it) => ({ icon: it.icon, heading: it.title, text: it.body }));
  return <HorizontalReveal title={title} panels={panels} bg={bg} />;
}

function NarrativeSection({ title, paragraphs = [], emphasized, bg = "card", variant = "kinetic" }) {
  if (variant === "stack") {
    const cards = paragraphs.map((p) => ({ text: p }));
    if (emphasized) cards.push({ text: emphasized, emph: true });
    return <StackReveal title={title} cards={cards} bg={bg} />;
  }
  if (variant === "horizontal") {
    const panels = paragraphs.map((p, i) => ({ tag: String(i + 1).padStart(2, "0"), text: p }));
    if (emphasized) panels.push({ heading: emphasized, accent: true, wide: true });
    return <HorizontalReveal title={title} panels={panels} bg={bg} />;
  }
  return <KineticReveal title={title} lines={paragraphs} emphasized={emphasized} bg={bg} />;
}

// ========== Collect Quality Reviews ==========
function CollectBetterReviews() {
  usePageMeta(
    "Collect Quality Software Reviews with Revly",
    "Your customers are willing to review you. Most just don't know what to write or where to post. Revly removes both problems: one smart link, AI writing assistance, and automatic routing to the platform that needs reviews most."
  );
  const FAQS = [
  { q: "How do you collect better reviews on G2, Capterra, and other software platforms?", a: "The most common barrier to useful reviews is friction — customers don't know what to write or which platform to use. Revly removes both by providing one smart link that handles platform routing automatically, and AI writing assistance that helps customers turn a brief thought into a detailed, specific review. The result is more reviews, on the right platforms, that actually reflect what customers think." },
  { q: "Is the AI writing the review for the customer?", a: "No. The customer writes their review first, in their own words. If they want help expanding or structuring what they've written, Revly's AI offers suggestions — but the customer can edit, rewrite, or ignore the suggestions entirely. Nothing goes live without their explicit approval. The AI assists; it doesn't replace." },
  { q: "What if the customer just wants to write their own review without AI help?", a: "That's completely fine. The AI assistance is optional. Customers who want to write their own review from scratch can do so — Revly just makes sure they end up on the right platform without having to choose between multiple links." },
  { q: "How does the smart routing work?", a: "You set the routing priority in Revly. If you need more reviews on a specific platform — say G2 is strong but Capterra is thin — you can prioritise Capterra until it's balanced. Or you can let Revly distribute automatically based on your current review counts across platforms. Either way, customers get sent to one place with no confusion about where to go." },
  { q: "Can customers leave a review on the platform they prefer?", a: "The smart link routes customers based on your priorities, but the goal is always to remove confusion rather than force a choice. If a customer has a strong preference for a specific platform, they can still post there directly — Revly just ensures the default is wherever you need reviews most." },
  { q: "What kinds of reviews does this produce?", a: "Reviews that are more detailed and specific than what customers typically write without assistance. Instead of \"Great tool, easy to use\" — which tells a prospect nothing — customers are more likely to describe the specific problem it solved, the feature that made the difference, or how it compares to what they used before. That's the information that actually influences buying decisions." },
  { q: "Does this work if we only have a small number of customers?", a: "Yes — in fact it matters more. With a small customer base, every review counts more. Revly makes sure each one lands on the right platform and says something useful. One well-written review on the right platform does more than five vague ones spread across platforms you're not actively trying to build." }];

  useJsonLd(
    softwareSchema("Revly helps software companies collect better reviews with one smart link, AI writing assistance, and automatic routing to the platform that needs reviews most."),
    faqSchema(FAQS)
  );
  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <FeatureHeroC variant="collect" />
      
      <CQScrolly />

      <CQSmartRouting />

      <CQGallery />

      <ProductBeforeAfter
        heading={<>Before and after <span className="text-primary">a review collection system.</span></>} rows={[
        { without: "Customers stare at a blank text box and give up", with: "AI writing assistance helps them say what they actually mean" },
        { without: "\"Great tool.\" reviews that don't help anyone decide", with: "Detailed, specific reviews that convert prospects" },
        { without: "Customers get a list of platform links and pick randomly", with: "One smart link routes each customer to the right platform" },
        { without: "Reviews skewed to whichever platform customers recognise", with: "Review distribution balanced automatically or set by you" }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Your customers want to review you.<br /><span style={{ color: "#f1057a" }}>Make it easy for them.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "46ch" }}>One smart link, AI writing assistance that keeps their voice intact, and automatic routing to the platform that needs it most.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="#/pricing">Start collecting quality reviews</a>
              <a className="btn btn-yellow btn-lg" href="#/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>
      
      <CrossLinks items={[
      { chip: "Smart Requests", title: "Send Smart Review Requests", body: "Revly checks in with customers before sending them anywhere. Those who need support reach your team. Those who are ready get guided to the right review platform.", to: "/smart-review-requests" },
      { chip: "Monitor", title: "Monitor Multiple Review Platforms", body: "All your reviews from every platform in a single dashboard, updated every five minutes.", to: "/monitor-platforms" },
      { chip: "Respond", title: "Manage Review Responses", body: "Surface every review that needs a reply and draft one in your voice — across every platform.", to: "/manage-review-responses" }]
      } />
    </main>
    <Footer />
  </>;
}

// ========== Monitor Platforms ==========
function MonitorPlatforms() {
  usePageMeta(
    "Monitor All Review Platforms in One Place with Revly",
    "Stop logging into G2, Capterra, TrustRadius, and other platforms separately. Revly syncs every review into one dashboard, so nothing goes unread, no trend goes unnoticed, and the right customer quote is always one search away."
  );
  const FAQS = [
  { q: "How do you monitor across G2, Capterra, and TrustRadius without logging into each?", a: "Revly connects to each platform once during setup and syncs every new review into one dashboard automatically. After connection, you never need to log into the individual platforms to check or read reviews — everything appears in your Revly feed within five minutes of being posted." },
  { q: "Which platforms does Revly monitor?", a: "Revly currently monitors G2, Capterra, GetApp, Software Advice, Trustpilot, Apple App Store, Google Play Store, Shopify App Store, WooCommerce Marketplace, QuickBooks Marketplace, WordPress Plugin Marketplace, and Xero Marketplace. More platforms are added regularly — if a platform matters for software buying decisions, it's on the roadmap." },
  { q: "How quickly does Revly pick up new reviews?", a: "New reviews appear in your Revly dashboard within five minutes of being posted on the source platform. You don't have to refresh, check, or log in anywhere to see them." },
  { q: "Can I search for specific quotes or topics?", a: "Yes. Your entire review history is searchable from one place. Search by keyword, feature name, customer language, or topic to find the exact quote you need for a campaign, landing page, or sales conversation." },
  { q: "Does Revly notify me when a new review comes in?", a: "Yes. You can configure notifications via email and Slack, so the right person on your team is alerted as soon as a new review is posted on any connected platform." },
  { q: "How is this different from checking each platform manually?", a: "Manual checking is reactive — you remember to look, or you don't. Reviews go unread for days or weeks. Trends are invisible because you only see one platform at a time. Revly replaces that with a single feed updated every five minutes, so nothing slips through and patterns become visible across platforms." }];

  useJsonLd(
    softwareSchema("Revly syncs every review from G2, Capterra, TrustRadius, and other key platforms into one dashboard — so nothing goes unread, no trend goes unnoticed, and the right customer quote is always one search away."),
    faqSchema(FAQS)
  );
  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <FeatureHeroC variant="monitor" />
      
      <MonScrolly />

      <MonGallery />

      <ProductBeforeAfter
        heading={<>Before and after <span className="text-primary">unified review monitoring.</span></>} rows={[
        { without: "Logging into G2, Capterra, TrustRadius separately", with: "Every platform synced to one dashboard" },
        { without: "Reviews going unread for days or weeks", with: "New reviews surface within five minutes" },
        { without: "No way to spot trends across platforms", with: "Rating trends and sentiment tracked over time" },
        { without: "Customer quotes buried across five platforms", with: "Search your entire review library in one place" }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Your entire review presence,<br /><span style={{ color: "#f1057a" }}>finally in one place.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "46ch" }}>One dashboard, every platform, updated every five minutes.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="#/pricing">Start monitoring your reviews</a>
              <a className="btn btn-yellow btn-lg" href="#/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>
      
      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed, specific reviews on the platforms that matter.", to: "/collect-quality-reviews" },
      { chip: "Smart Requests", title: "Send Smart Review Requests", body: "Revly checks in with customers before sending them anywhere. Those who need support reach your team. Those who are ready get guided to the right review platform.", to: "/smart-review-requests" },
      { chip: "Respond", title: "Manage Review Responses", body: "Surface every review that needs a reply and draft one in your voice — across every platform from one place.", to: "/manage-review-responses" }]
      } />
    </main>
    <Footer />
  </>;
}

// ========== Smart Review Requests ==========
function SmartReviewRequests() {
  usePageMeta(
    "Send Smart Review Requests — Know How Your Customers Feel with Revly",
    "Sending a review request without knowing how a customer is doing is a missed opportunity. Revly checks in with customers first: connecting those who need support with your team, and those who are ready with the right review platform."
  );
  const FAQS = [
  { q: "Why check in with customers before sending them to a review platform?", a: "Sending a public review request without knowing how a customer feels is a coin flip. Some land on a platform when they would have benefited from support first. A short feedback step turns one campaign into two distinct, useful workflows: customers who are ready share publicly, and customers who need help reach your team. Both outcomes are better than the alternative." },
  { q: "What does the feedback step look like for the customer?", a: "It's a short check-in — usually a question or two — that takes seconds to complete. Customers don't see it as a survey or a barrier; it feels like part of the review flow. Their answers determine where they go next, automatically." },
  { q: "What happens to customers who indicate they need support?", a: "They share more detail with your team via a short form, and your team gets notified. The customer never lands on a public review platform from this flow — instead, they get the chance to flag whatever's wrong and have you address it." },
  { q: "Is this hiding negative reviews?", a: "No. Customers can still leave a public review independently if they choose. What Revly does is route the review request itself — so a customer who would benefit from support gets help instead of a request to post publicly at the wrong moment. The customer decides whether to post anywhere, always." },
  { q: "How does the routing decide where to send a customer?", a: "You configure the rules in Revly. Based on what the customer shares in the feedback step, Revly routes them either to the review platform you want to prioritise, or to the private feedback path that reaches your team." },
  { q: "Will customers know they're being filtered?", a: "No. The feedback step looks like a natural first part of the review flow — it asks how things are going. Customers who are happy proceed to a review platform; customers who flagged an issue proceed to a form for your team. Both paths feel coherent and intentional." },
  { q: "How is this different from a Net Promoter Score survey?", a: "NPS is a measurement tool — it asks how likely you are to recommend, then tracks the score. Revly's feedback step is operational — it routes each customer based on their response, in real time, to the action that fits their experience. You're not just measuring sentiment; you're acting on it." },
  { q: "Can I run this on customers I don't know personally?", a: "Yes — that's the most common use case. The feedback step is automated, so it works whether you have ten customers or ten thousand. Each customer gets the right next step based on their own response, regardless of how well your team knows them individually." }];

  useJsonLd(
    softwareSchema("Revly is the review management platform built for B2B SaaS companies. Collect better reviews with one smart link, monitor G2, Capterra, and other key platforms from a single dashboard, and catch unhappy customers before they post publicly."),
    faqSchema(FAQS)
  );
  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <FeatureHeroC variant="routing" />
      
      <SmartScrolly />

      <CQSmartRouting />

      <SmartGallery />

      <ProductBeforeAfter
        heading={<>Before and after <span className="text-primary">smart review requests.</span></>}
        rows={[
        { without: "Public requests sent to all customers equally", with: "A feedback step checks in with customers first" },
        { without: "Customer issues stay in the dark", with: "Customers who need support reach your team directly" },
        { without: "No way to capture feedback from customers who need support", with: "Every customer's experience captured and acted on" },
        { without: "Reactive damage control", with: "Proactive customer relationship management" }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Every customer has something to say.<br /><span style={{ color: "#f1057a" }}>Make sure it's heard.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "48ch" }}>One link, one feedback step. Those who are ready share their experience; those who need support reach your team.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="#/pricing">Send smarter review requests</a>
              <a className="btn btn-yellow btn-lg" href="#/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>
      
      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed reviews on the platforms that matter.", to: "/collect-quality-reviews" },
      { chip: "Monitor", title: "Monitor Multiple Review Platforms", body: "All your reviews from every platform in a single dashboard, synced every five minutes.", to: "/monitor-platforms" },
      { chip: "Respond", title: "Manage Review Responses", body: "Surface every review that needs a reply and draft a response in your voice — across every platform.", to: "/manage-review-responses" }]
      } />
    </main>
    <Footer />
  </>;
}

// ========== Manage Review Responses ==========
function ManageReviewResponses() {
  usePageMeta(
    "Manage Review Responses Across Every Platform with Revly",
    "Most software companies never respond to their reviews. Prospects notice. Revly surfaces every review that needs a reply and helps you draft a response in your voice — then takes you directly to the platform to post it."
  );
  const FAQS = [
  { q: "How do you respond to reviews on G2, Capterra, and other software platforms from one place?", a: "Revly pulls every review from your connected platforms into one dashboard. You filter to unresponded reviews and draft a reply with AI in your brand voice. Then, Revly takes you directly to the review source platform to post it. No logging into each platform separately, no searching for the review again." },
  { q: "Can the AI match my brand voice?", a: "Yes. You set up tone instructions in Revly's settings — formal vs casual, sign-off conventions, words to use or avoid. Revly's AI uses those instructions to draft replies that sound like your team from the first draft, not generic responses you have to rewrite." },
  { q: "Why does it matter to respond to positive reviews too?", a: "Responding to positive reviews acknowledges the customers who took the time to advocate for you, and it signals to prospects browsing your profile that you actually engage. It also adds indexable content on review platforms that AI systems and search engines cite — your responses become part of how your product is described publicly." },
  { q: "Will Revly post the response automatically?", a: "No. Revly drafts the response and takes you directly to the review on the platform, but you post it yourself. This keeps the response under your team's control and ensures every reply is a deliberate decision, not an automated one." },
  { q: "How does responding to reviews help with AEO and SEO?", a: "Review platforms like G2 and Capterra are among the most cited domains in AI-generated answers for commercial queries. Responses that mirror the language of the review — feature names, outcomes, specific use cases — add indexable content on those high-authority domains and reinforce what your product does and who it's for." },
  { q: "What happens if a critical review needs urgent attention?", a: "You can configure notifications via email or Slack so the right person on your team is alerted as soon as a low-rated review is posted. Filter your dashboard to unresponded critical reviews and address them while the customer is still listening." },
  { q: "Can multiple team members manage responses?", a: "Yes, with all Revly paid plans. Multiple team members can be added, each with their own access. You can see who drafted or posted which response, and assign reviews to the right person on your team." },
  { q: "How long does it take to draft a response in Revly?", a: "Drafting takes seconds — the AI generates a reply matched to your brand voice based on the review content. You edit if you want to, then click through to post on the platform. Most teams find responding goes from a chore they avoid to something they actually keep up with." }];

  useJsonLd(
    softwareSchema("Revly surfaces every review that needs a reply across G2, Capterra, and other key platforms and helps you draft a response in your voice — then takes you directly to the platform to post it."),
    faqSchema(FAQS)
  );
  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <FeatureHeroC variant="manage" />
      
      <RespScrolly />

      <RespGallery />

      <ProductBeforeAfter
        heading={<>Before and after <span className="text-primary">a review response system.</span></>} rows={[
        { without: "Reviews go unread across multiple platforms", with: "Every review surfaces in one dashboard" },
        { without: "No clear view of which reviews need a reply", with: "Filter by unresponded reviews instantly" },
        { without: "Navigating to each platform separately to check and reply", with: "Draft with AI in Revly, go straight to the review to post" },
        { without: "Responses written from scratch, inconsistently", with: "AI-assisted replies matched to your brand voice" },
        { without: "Negative reviews sitting unanswered for weeks", with: "Nothing slips through unnoticed" }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Your reviews are a conversation.<br /><span style={{ color: "#f1057a" }}>Start showing up to it.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "48ch" }}>One dashboard, every platform, AI-assisted replies matched to your brand voice — and one click to post.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="#/pricing">Start replying to all reviews</a>
              <a className="btn btn-yellow btn-lg" href="#/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>
      
      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed reviews on the platforms that matter.", to: "/collect-quality-reviews" },
      { chip: "Smart Requests", title: "Send Smart Review Requests", body: "Revly checks in with customers before sending them anywhere. Those who need support reach your team. Those who are ready get guided to the right review platform.", to: "/smart-review-requests" },
      { chip: "Monitor", title: "Monitor Multiple Review Platforms", body: "All your reviews from every platform in one dashboard, synced every five minutes.", to: "/monitor-platforms" }]
      } />
    </main>
    <Footer />
  </>;
}

Object.assign(window, { CollectBetterReviews, MonitorPlatforms, SmartReviewRequests, ManageReviewResponses, NarrativeSection, HowItWorksGrid, ThreeColCallout });