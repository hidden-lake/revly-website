// Revly - Product pages (Collect, Monitor, Manage)
import React from 'react';
import { Navbar, Footer, BeforeAfterSlider, FAQ, CrossLinks } from './components.jsx';
import { KineticReveal, StackReveal, HorizontalReveal } from './reveals.jsx';
import { FeatureHeroC } from './feature-hero.jsx';
import { FeatureMotion, CQScrolly, CQSmartRouting, CQGallery } from './feature-collect.jsx';
import { MonScrolly, MonGallery } from './feature-monitor.jsx';
import { RespScrolly, RespGallery } from './feature-respond.jsx';
import { COLLECT_FAQ, MONITOR_FAQ, RESPOND_FAQ } from '../lib/faqs.js';
import { COLLECT_READING, MONITOR_READING, RESPOND_READING } from '../lib/further-reading.js';

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

// Slack's own mark, inline so it stays crisp and costs no extra request. Decorative:
// the sentence beside it already says Slack, so it carries no alt text of its own.
const SlackMark = () => (
  <svg className="slack-mark" viewBox="0 0 122.8 122.8" aria-hidden="true" focusable="false">
    <path d="M25.8 77.6a12.9 12.9 0 1 1-12.9-12.9h12.9v12.9z" fill="#e01e5a" />
    <path d="M32.3 77.6a12.9 12.9 0 0 1 25.8 0v32.3a12.9 12.9 0 0 1-25.8 0V77.6z" fill="#e01e5a" />
    <path d="M45.2 25.8a12.9 12.9 0 1 1 12.9-12.9v12.9H45.2z" fill="#36c5f0" />
    <path d="M45.2 32.3a12.9 12.9 0 0 1 0 25.8H12.9a12.9 12.9 0 0 1 0-25.8h32.3z" fill="#36c5f0" />
    <path d="M97 45.2a12.9 12.9 0 1 1 12.9 12.9H97V45.2z" fill="#2eb67d" />
    <path d="M90.5 45.2a12.9 12.9 0 0 1-25.8 0V12.9a12.9 12.9 0 0 1 25.8 0v32.3z" fill="#2eb67d" />
    <path d="M77.6 97a12.9 12.9 0 1 1-12.9 12.9V97h12.9z" fill="#ecb22e" />
    <path d="M77.6 90.5a12.9 12.9 0 0 1 0-25.8h32.3a12.9 12.9 0 0 1 0 25.8H77.6z" fill="#ecb22e" />
  </svg>
);

// Slack is the headline of the Monitor page, so it gets a section of its own rather
// than a bullet inside the benefits grid.
function SlackSection() {
  return (
    <section className="section" style={{ background: "hsl(var(--card))" }}>
      <div className="container-x" style={{ maxWidth: "860px" }}>
        <h2 className="h2" style={{ textAlign: "center", marginBottom: "2rem" }}>The review <span className="text-primary">finds you.</span></h2>
        <p className="lead" style={{ marginBottom: "1.25rem" }}>A dashboard only works if someone opens it. Most weeks, nobody does.</p>
        <p className="lead" style={{ marginBottom: "1.25rem" }}>So Revly posts every new review into Slack: the rating, the platform, the product, and what the customer wrote, with buttons to respond in Revly or open the review on the source platform. Your team sees the one-star review while it is still news, not when a prospect raises it on a call.</p>
        <p className="lead" style={{ marginBottom: "2.25rem" }}>Pick the Slack channel and the rest is automatic.</p>
        <div className="slack-pull">
          <SlackMark />
          <blockquote>Reviews stop being something you check and start being something you know about.</blockquote>
        </div>
      </div>
    </section>);
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
        heading={<>Before and after <span className="text-primary">one link.</span></>} rows={[
        { without: "Review requests go out blind to everyone", with: "A check-in first, so you get the chance to help" },
        { without: "A customer with an open problem gets asked to praise you", with: "A struggling customer reaches your team" },
        { without: "Customers stare at a blank text box and give up", with: "Writing help that keeps their voice and adds the detail" },
        { without: "\"Great tool.\" reviews that help nobody decide", with: "Reviews that name the problem, the feature, and the alternative" },
        { without: "A list of platform links and a customer picking at random", with: "One link, routed to the platform you need" },
        { without: "Reviews pile up on whichever platform customers recognise", with: "Distribution balanced automatically, or set by you" }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Ask better,<br /><span style={{ color: "#f1057a" }}>get better reviews.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "50ch" }}>One link. A question that tells you whether this is the right moment, writing help that keeps the customer's voice, and routing to the platform that needs it.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="/pricing/">Start collecting better reviews</a>
              <a className="btn btn-yellow btn-lg" href="/pricing/">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Monitor", title: "Monitor multiple review platforms", body: "Every review from every platform in one dashboard, with Slack alerts for new reviews.", to: "/monitor-platforms/" },
      { chip: "Respond", title: "Manage review responses", body: "Revly flags what needs a reply and drafts one in your voice.", to: "/manage-review-responses/" },
      { chip: "Display", title: "Display reviews on your site", body: "Styled widgets that keep themselves current as new reviews come in.", to: "/review-widgets/" }]
      } />

      <CrossLinks eyebrow="Further reading" cta="Read the article →" bg="hsl(var(--card))" items={COLLECT_READING} />
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

      <SlackSection />

      <MonGallery />

      <ProductBeforeAfter
        heading={<>Before and after <span className="text-primary">one dashboard.</span></>} rows={[
        { without: "Five logins, and only when someone remembers", with: "One feed, and a Slack message when something new lands" },
        { without: "A bad review sits public for two weeks", with: "Your team sees it the day it posts" },
        { without: "Nobody knows whose job it is to check", with: "The Slack channel is the job" },
        { without: "Rating trends invisible until a quarterly review", with: "Shifts tracked across every platform over time" },
        { without: "Hunting for the right customer quote before a campaign", with: "Search your whole review library in seconds" }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Your whole review presence,<br /><span style={{ color: "#f1057a" }}>in one place and in Slack.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "50ch" }}>Every platform in one dashboard, every new review in the channel your team already has open.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="/pricing/">Start monitoring your reviews</a>
              <a className="btn btn-yellow btn-lg" href="/pricing/">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Collect", title: "Collect reviews worth reading", body: "One link checks in with the customer, routes anyone who needs help to your team, and helps everyone else write something detailed.", to: "/collect-quality-reviews/" },
      { chip: "Respond", title: "Manage review responses", body: "Revly flags what needs a reply and drafts one in your voice.", to: "/manage-review-responses/" },
      { chip: "Claude connector", title: "Query your review data with AI", body: "Connect Revly to Claude or ChatGPT and ask questions about your review data in plain language.", to: "/claude-mcp/" }]
      } />

      <CrossLinks eyebrow="Further reading" cta="Read the article →" bg="hsl(var(--card))" items={MONITOR_READING} />
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
              <a className="btn btn-default btn-lg" href="/pricing/">Start replying to all reviews</a>
              <a className="btn btn-yellow btn-lg" href="/pricing/">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed reviews on the platforms that matter.", to: "/collect-quality-reviews/" },
      { chip: "Display", title: "Display Reviews On Your Site", body: "Turn your reviews into styled, self-updating widgets you can drop onto any page.", to: "/review-widgets/" },
      { chip: "Claude connector", title: "Query your review data with AI", body: "Connect Revly to Claude or ChatGPT and ask questions about your review data in plain language.", to: "/claude-mcp/" }]
      } />

      <CrossLinks eyebrow="Further reading" cta="Read the article →" bg="hsl(var(--card))" items={RESPOND_READING} />
    </main>
    <Footer />
  </>;
}

export { NarrativeSection, HowItWorksGrid, ThreeColCallout };
