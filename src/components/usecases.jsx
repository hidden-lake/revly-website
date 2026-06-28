// Revly — Use Case pages (SaaS Teams, Agencies)
import React from 'react';
import { Navbar, Footer, Icon, FAQ, CrossLinks } from './components.jsx';
import { FeatureMotion } from './feature-collect.jsx';
import { WifHero, wifSaasScene, wifAgencyScene } from './usecase-hero.jsx';
import { UCConsoleScrolly, UCClientGallery, UCCapabilityIndex, UCProblemSplit, UCOutcome } from './usecase-sections.jsx';
import { SAAS_FAQ, AGENCY_FAQ } from '../lib/faqs.js';

// ---------- Shared use-case building blocks ----------
function UseCaseHero({ chip, h1, sub, cta }) {
  return (
    <section style={{ background: "hsl(var(--card))", padding: "4rem 0 5rem" }}>
      <div className="container-x" style={{ maxWidth: "880px", textAlign: "center" }}>
        <div className="chip chip-pink" style={{ marginBottom: "1.5rem" }}>{chip}</div>
        <h1 className="h1">{h1}</h1>
        <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "720px", marginLeft: "auto", marginRight: "auto" }}>{sub}</p>
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: ".75rem", flexWrap: "wrap" }}>
          <a className="btn btn-default btn-lg" href="/pricing">{cta}</a>
        </div>
      </div>
    </section>);
}

function FeatureGrid({ heading, items, bg = "f6" }) {
  const bgVal = bg === "card" ? "hsl(var(--card))" : bg === "accent" ? "hsl(var(--accent))" : bg === "muted" ? "hsl(var(--muted))" : "#f6f6f4";
  return (
    <section className="section" style={{ background: bgVal }}>
      <div className="container-x">
        <h2 className="h2" style={{ textAlign: "center", marginBottom: "3.5rem", maxWidth: "820px", marginLeft: "auto", marginRight: "auto" }}>{heading}</h2>
        <div className="grid-3">
          {items.map((it, i) =>
          <div key={i} className="card" style={{ padding: "2rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", background: "hsl(var(--muted))", color: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Icon name={it.icon} size={22} />
              </div>
              <h3 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.2rem", marginBottom: ".6rem" }}>{it.title}</h3>
              <p style={{ color: "hsl(var(--foreground)/0.65)", fontSize: ".97rem", lineHeight: 1.65 }}>{it.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);
}

// ========== SaaS Teams ==========
export function UseCaseSaaS() {
  const FAQS = SAAS_FAQ;

  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <WifHero
        chip="For SaaS Teams"
        headline={<>Your software gets reviewed everywhere. <span className="pay">Manage it all from one place.</span></>}
        lead="G2, Capterra, the app stores — your software is being reviewed in a dozen places, and you're the whole review team. Revly pulls every platform into one tab, and shows you exactly what needs a reply."
        cta="Start free with Revly"
        scene={wifSaasScene} />

      <UCProblemSplit
        bg="accent"
        flip
        eyebrow="The manual way"
        title={<>Managing reviews across platforms <span className="text-primary">is a second job.</span></>}
        lead="G2 in one tab, Capterra in another, the app stores in a third — and you're the whole review team, hoping nothing slipped through while you were in a meeting."
        emphasized="The data is everywhere. No one has time to manage it properly."
        visual="saas-chaos" />

      <UCConsoleScrolly />

      <UCCapabilityIndex
        eyebrow="Smarter collection"
        heading={<>Everything in one place, <span className="text-primary">with the control you actually need.</span></>}
        items={[
        { icon: "ear", title: "Check in before every request", body: "Revly starts every review request with a short check-in. Based on what each customer shares, they're guided to the platform where you need reviews most, or connected with your team for support. You catch issues early and run campaigns with confidence." },
        { icon: "mic", title: "AI-assisted review quality", body: "When a customer clicks through to leave a review, Revly offers to help them expand brief feedback into a detailed, specific review in their own voice. They approve it before anything is posted — so reviews tell a prospect something useful, not just \"10/10 would recommend.\"" },
        { icon: "nav", title: "Smart platform routing", body: "One collection link automatically directs customers to the platform where a review matters most right now, based on your current review counts and distribution. No more asking customers to choose between six URLs." }]
        } />

      <UCOutcome
        title={<>Less time managing reviews. <span className="text-primary">More confidence in what gets posted.</span></>}
        lead="Revly replaces the manual scramble with one system: collect thoughtfully, manage from one place, and respond without losing time."
        tiles={[
        { icon: "dash", title: "One tab, every platform", body: "G2, Capterra, and the app stores in a single queue — no more checking five logins to know where you stand." },
        { icon: "eye", title: "A clear reply queue", body: "Every new review surfaces with a 'needs reply' flag, so a 2★ never sits unseen while you're in a meeting." },
        { icon: "shield", title: "A check-in before every ask", body: "Customers are routed to the right next step first, so you collect with confidence in what gets posted." }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Stop managing reviews<br /><span style={{ color: "#f1057a" }}>across a dozen tabs.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "46ch" }}>One tab for every platform, a clear reply queue, and a check-in before every request. Set up in under 30 minutes.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="/pricing">Start free with Revly</a>
              <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed reviews on the platforms that matter.", to: "/collect-quality-reviews" },
      { chip: "Smart Requests", title: "Send Smart Review Requests", body: "Revly checks in with customers before sending them anywhere. Those who need support reach your team. Those who are ready get guided to the right platform.", to: "/smart-review-requests" },
      { chip: "Monitor", title: "Monitor Multiple Review Platforms", body: "All your reviews from every platform in one dashboard, synced every five minutes.", to: "/monitor-platforms" }]
      } />
    </main>
    <Footer />
  </>;
}

// ========== Agencies ==========
export function UseCaseAgencies() {
  const FAQS = AGENCY_FAQ;

  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <WifHero
        chip="For Agencies"
        headline={<>Every client. Every platform. <span className="pay">One dashboard.</span></>}
        lead="Each client's software is reviewed in five different places — dozens of inboxes, and a 1★ review you'll hear about too late. Revly brings every client's reviews into one dashboard, and flags exactly what needs a reply today."
        cta="Start free with Revly"
        scene={wifAgencyScene}
        tall />

      <UCProblemSplit
        bg="accent"
        eyebrow="The manual way"
        title={<>Client review management <span className="text-primary">does not scale manually.</span></>}
        lead="A separate dashboard for every client. Review requests chased by hand. New reviews found days after they posted — and reports built from screenshots that were stale before you sent them."
        emphasized="Every client multiplies the work. There's a better way to run this."
        visual="agency-multiply" />

      <UCClientGallery />

      <UCCapabilityIndex
        eyebrow="One system for every client"
        heading={<>One system <span className="text-primary">for every client.</span></>}
        items={[
        { icon: "ear", title: "A check-in built into every campaign", body: "Every collection campaign opens with a short check-in. From there, Revly guides each customer to the review platform where they're needed most, or connects them with your client's team for support. Issues get resolved before they grow, and your clients run every campaign with confidence." },
        { icon: "mic", title: "AI-assisted review quality", body: "When a customer clicks through to leave a review, Revly offers to help them write something useful — expanding brief feedback into a detailed, specific review in their own voice. They approve it before it goes anywhere. Your clients get reviews that actually help their prospects decide." },
        { icon: "nav", title: "Smart platform routing", body: "One collection link per client automatically directs customers to the platform where a review is needed most right now. No more asking customers to choose, no more uneven distribution across platforms." },
        { icon: "dash", title: "Review response management", body: "Track which reviews across all client accounts have been responded to and which have not. AI drafts the responses. You review, adjust, and post." }]
        } />

      <UCOutcome
        title={<>Less time on operational grunt work. <span className="text-primary">More time on strategy.</span></>}
        lead="Revly replaces the individual logins, the spreadsheet reports, and the hand-written emails with one system that runs in the background — so you spend less time doing the work and more time proving its value."
        tiles={[
        { icon: "dash", title: "Every client, one login", body: "Switch between accounts instantly and see which clients need attention before they have to tell you." },
        { icon: "eye", title: "Alerts the moment it matters", body: "Real-time Slack notifications when a review lands, across every client — so nothing sits unseen for days." },
        { icon: "trend", title: "Live numbers, never stale", body: "Performance across every client, always current — no more screenshots and spreadsheets out of date before you send them." }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Run every client's reviews<br /><span style={{ color: "#f1057a" }}>from one dashboard.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "48ch" }}>Every client, every platform, one login — with alerts the moment something needs a reply. Set up your first client in under 30 minutes.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="/pricing">Start free with Revly</a>
              <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "For SaaS Teams", title: "Review Management for SaaS Teams", body: "One place to collect, monitor, and respond to reviews across every platform — with a check-in before every request.", to: "/use-cases/saas" },
      { chip: "Monitor", title: "Monitor Multiple Review Platforms", body: "All your reviews from every platform in one dashboard, synced every five minutes.", to: "/monitor-platforms" },
      { chip: "Respond", title: "Manage Review Responses", body: "Surface every review that needs a reply and draft a response in your voice — across every platform.", to: "/manage-review-responses" }]
      } />
    </main>
    <Footer />
  </>;
}
