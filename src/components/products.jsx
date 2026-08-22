// Revly — Product pages (Collect, Monitor, Smart, Manage)
import React from 'react';
import { Navbar, Footer, BeforeAfterSlider, FAQ, CrossLinks } from './components.jsx';
import { KineticReveal, StackReveal, HorizontalReveal } from './reveals.jsx';
import { FeatureHeroC } from './feature-hero.jsx';
import { FeatureMotion, CQScrolly, CQSmartRouting, CQGallery } from './feature-collect.jsx';
import { MonScrolly, MonGallery } from './feature-monitor.jsx';
import { SmartScrolly, SmartGallery } from './feature-smart.jsx';
import { RespScrolly, RespGallery } from './feature-respond.jsx';
import { COLLECT_FAQ, MONITOR_FAQ, SMART_FAQ, RESPOND_FAQ } from '../lib/faqs.js';

export function ProductBeforeAfter({ heading, rows }) {
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
export function CollectBetterReviews() {
  const FAQS = COLLECT_FAQ;

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
              <a className="btn btn-default btn-lg" href="/pricing">Start collecting quality reviews</a>
              <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Smart Requests", title: "Send Smart Review Requests", body: "Revly checks in with customers before sending them anywhere. Those who need support reach your team. Those who are ready get guided to the right review platform.", to: "/smart-review-requests" },
      { chip: "Monitor", title: "Monitor Multiple Review Platforms", body: "All your reviews from every platform in a single dashboard, updated every five minutes.", to: "/monitor-platforms" },
      { chip: "Display", title: "Display Reviews On Your Site", body: "Turn your reviews into styled, self-updating widgets you can drop onto any page.", to: "/review-widgets" }]
      } />
    </main>
    <Footer />
  </>;
}

// ========== Monitor Platforms ==========
export function MonitorPlatforms() {
  const FAQS = MONITOR_FAQ;

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
              <a className="btn btn-default btn-lg" href="/pricing">Start monitoring your reviews</a>
              <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed, specific reviews on the platforms that matter.", to: "/collect-quality-reviews" },
      { chip: "Smart Requests", title: "Send Smart Review Requests", body: "Revly checks in with customers before sending them anywhere. Those who need support reach your team. Those who are ready get guided to the right review platform.", to: "/smart-review-requests" },
      { chip: "Claude connector", title: "Query your review data with AI", body: "Connect Revly to Claude or ChatGPT and ask questions about your review data in plain language.", to: "/claude-mcp" }]
      } />
    </main>
    <Footer />
  </>;
}

// ========== Smart Review Requests ==========
export function SmartReviewRequests() {
  const FAQS = SMART_FAQ;

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
              <a className="btn btn-default btn-lg" href="/pricing">Send smarter review requests</a>
              <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed reviews on the platforms that matter.", to: "/collect-quality-reviews" },
      { chip: "Display", title: "Display Reviews On Your Site", body: "Turn your reviews into styled, self-updating widgets you can drop onto any page.", to: "/review-widgets" },
      { chip: "Claude connector", title: "Query your review data with AI", body: "Connect Revly to Claude or ChatGPT and ask questions about your review data in plain language.", to: "/claude-mcp" }]
      } />
    </main>
    <Footer />
  </>;
}

// ========== Manage Review Responses ==========
export function ManageReviewResponses() {
  const FAQS = RESPOND_FAQ;

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
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "48ch" }}>One dashboard, every platform, AI-assisted replies matched to your brand voice, and one click to post.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="/pricing">Start replying to all reviews</a>
              <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed reviews on the platforms that matter.", to: "/collect-quality-reviews" },
      { chip: "Display", title: "Display Reviews On Your Site", body: "Turn your reviews into styled, self-updating widgets you can drop onto any page.", to: "/review-widgets" },
      { chip: "Claude connector", title: "Query your review data with AI", body: "Connect Revly to Claude or ChatGPT and ask questions about your review data in plain language.", to: "/claude-mcp" }]
      } />
    </main>
    <Footer />
  </>;
}

export { NarrativeSection, HowItWorksGrid, ThreeColCallout };
