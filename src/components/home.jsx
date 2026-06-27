// Revly — Home page (faithful port of approved Direction A)
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar, Footer, Icon, BeforeAfterSlider, FAQ } from './components.jsx';
gsap.registerPlugin(ScrollTrigger);

const HOME_STAR = "M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z";
function Stars({ n = 5, className = "rev-stars" }) {
  return <span className={className} aria-hidden="true">{Array.from({ length: n }).map((_, i) => <svg key={i} viewBox="0 0 24 24" fill="currentColor"><path d={HOME_STAR} /></svg>)}</span>;
}
const HOME_INBOX = [
{ n: "Maria O.", av: "hsl(var(--primary))", plat: "G2", pc: "hsl(var(--muted))", pt: "hsl(var(--primary))", t: "“Finally one place for everything. Saved us hours every week.”", time: "2m" },
{ n: "Devon R.", av: "hsl(var(--secondary))", plat: "Capterra", pc: "#fdf0c8", pt: "#7a4f05", t: "“Setup took ten minutes and the AI drafts are genuinely good.”", time: "18m" },
{ n: "Priya S.", av: "hsl(var(--foreground))", plat: "TrustRadius", pc: "#eaeaea", pt: "#444", t: "“We caught two unhappy customers before they posted publicly.”", time: "1h" },
{ n: "Alex T.", av: "hsl(var(--primary))", plat: "App Store", pc: "hsl(var(--muted))", pt: "hsl(var(--primary))", t: "“Competitor monitoring alone is worth the price.”", time: "3h" }];

function ReviewRow({ r }) {
  return (
    <div className="rev">
      <div className="rev-av" style={{ background: r.av }}>{r.n[0]}</div>
      <div className="rev-main">
        <div className="rev-row1">
          <span className="rev-name">{r.n}</span>
          <span className="rev-plat" style={{ background: r.pc, color: r.pt }}>{r.plat}</span>
          <span className="rev-time">{r.time}</span>
        </div>
        <Stars />
        <div className="rev-txt">{r.t}</div>
      </div>
    </div>);
}

function scrollToId(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 60, behavior: "smooth" });
}

function HeroNeedRow({ r, showDraft }) {
  return (
    <div className="rev">
      <div className="rev-av" style={{ background: r.av }}>{r.n[0]}</div>
      <div className="rev-main">
        <div className="rev-row1"><span className="rev-name">{r.n}</span><span className="rev-plat" style={{ background: r.pc, color: r.pt }}>{r.plat}</span><span className="rev-time">{r.time}</span></div>
        <Stars n={r.stars} />
        <div className="rev-txt">{r.t}</div>
        {showDraft && r.draft && <div className="hero-draft"><b>✦ AI reply drafted</b> {r.draft}</div>}
      </div>
    </div>);
}
function HeroInbox() {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const dur = phase === 0 ? 1600 : phase === 1 ? 900 : 1800;
    const t = setTimeout(() => setPhase((p) => (p + 1) % 3), dur);
    return () => clearTimeout(t);
  }, [phase]);
  const needs = [
    { n: "Devon R.", av: "hsl(var(--secondary))", plat: "Capterra", pc: "#fdf0c8", pt: "#7a4f05", t: "“Solid tool, but onboarding felt rushed and I missed a few features.”", time: "4m", stars: 3, draft: "“Thanks for the honest feedback — we’ve reworked onboarding with a guided setup.”" },
    { n: "Priya S.", av: "hsl(var(--primary))", plat: "G2", pc: "hsl(var(--muted))", pt: "hsl(var(--primary))", t: "“Wanted more integrations on the starter plan.”", time: "1h", stars: 2 }];

  const onAll = phase === 0;
  return (
    <div className="inbox" aria-label="Unified review inbox preview">
      <div className="inbox-top"><span className="ttl">All reviews</span><span className="inbox-live"><span className="pulse"></span> Live sync</span></div>
      <div className="inbox-filters">
        <span className={"inbox-pill" + (onAll ? " on" : "")} style={{ cursor: "pointer" }} onClick={() => setPhase(0)}>All platforms</span>
        <span className={"inbox-pill" + (!onAll ? " on" : "")} style={{ cursor: "pointer" }} onClick={() => setPhase(1)}>Needs reply</span>
        <span className="inbox-pill">5★</span>
        <span className="inbox-pill">This week</span>
      </div>
      <div className="inbox-list" key={onAll ? "all" : "needs"} style={{ animation: "heroFade .5s cubic-bezier(.22,.61,.36,1)", minHeight: "26rem" }}>
        {onAll ?
          HOME_INBOX.map((r, i) => <ReviewRow key={i} r={r} />) :
          needs.map((r, i) => <HeroNeedRow key={i} r={r} showDraft={phase === 2} />)}
      </div>
    </div>);
}
function Hero() {
  return (
    <section className="hero-a">
      <div className="container-x hero-grid">
        <div>
          <span className="hero-rating">
            <span className="avs">
              <i style={{ background: "hsl(var(--primary))" }}></i>
              <i style={{ background: "hsl(var(--secondary))" }}></i>
              <i style={{ background: "hsl(var(--foreground))" }}></i>
            </span>
            <Stars />
            Loved by SaaS marketing teams
          </span>
          <h1 className="display" style={{ marginTop: "1.4rem" }}>Every software review.<br /><span className="mag">One place.</span></h1>
          <p className="lead" style={{ marginTop: "1.4rem", maxWidth: "30ch" }}>Revly is the review management platform built for software companies. Collect better reviews with one smart link, monitor every platform from a single dashboard, and respond where buyers are looking.</p>
          <div className="hero-cta">
            <a className="btn btn-default btn-lg" href="/pricing">Take control of your reviews</a>
            <a className="btn btn-outline btn-lg" href="#how" onClick={(e) => scrollToId(e, "how")}>See how it works</a>
          </div>
          <p className="hero-note">
            <span style={{ color: "hsl(var(--primary))", display: "inline-flex" }}><Icon name="check" size={16} /></span>
            Free plan, no card required · Set up in under 30 minutes
          </p>
        </div>
        <div>
          <HeroInbox />
        </div>
      </div>
    </section>);
}

function TrustMarquee() {
  const logos = [
    ["/assets/logos/g2.svg", "G2"],
    ["/assets/logos/capterra.png", "Capterra"],
    ["/assets/logos/trustpilot.png", "Trustpilot"],
    ["/assets/logos/shopify.png", "Shopify", "lg"],
    ["/assets/logos/woo.png", "WooCommerce", "sm"],
    ["/assets/logos/wordpress.png", "WordPress"],
    ["/assets/logos/xero.png", "Xero"],
    ["/assets/logos/quickbooks.png", "QuickBooks"]];

  const triple = [...logos, ...logos, ...logos];
  return (
    <section className="mq-band">
      <div className="mq">
        <div className="mq-track">
          {triple.map((l, i) => <img key={i} src={l[0]} alt={l[1]} className={"mq-logo" + (l[2] ? " " + l[2] : "")} />)}
        </div>
      </div>
    </section>);
}

function BeforeAfter() {
  const rows = [
  { without: "Reviews scattered across 2–4 platforms", with: "Every review in one dashboard" },
  { without: "Requests sent without knowing how customers feel", with: "Sentiment screening before every ask" },
  { without: "“Great tool.” reviews that convert no one", with: "Detailed reviews that actually help buyers" },
  { without: "Negative reviews posted before you can help", with: "Negative feedback routed to your inbox first" },
  { without: "No idea which reviews need a response", with: "A response queue surfaced automatically" },
  { without: "Hunting across platforms for the right quote for a campaign", with: "Search your entire review library for any quote in seconds" }];

  return (
    <section className="section" style={{ background: "hsl(var(--card))" }}>
      <div className="container-x">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem" }}>
          <span className="eyebrow">Before &amp; after</span>
          <h2 className="h2" style={{ marginTop: "0.9rem" }}>No more <span className="mag">winging it.</span></h2>
          <p className="lead" style={{ marginTop: "0.9rem" }}>See what changes the day reviews stop being scattered.</p>
        </div>
        <BeforeAfterSlider rows={rows} />
      </div>
    </section>);
}

function CollectMock() {
  return (
    <div className="mock">
      <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">collect.revly.io/acme</span></div>
      <div className="mock-pad">
        <p style={{ fontWeight: 700, textAlign: "center", fontFamily: "Bricolage Grotesque", fontSize: "1.1rem" }}>How was Acme for you?</p>
        <Stars className="collect-stars" />
        <div className="collect-input">"Cut our reporting time in half…"</div>
        <div className="collect-ai">
          <div className="tag"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8z" /></svg> AI-polished draft</div>
          <p>"Revly cut our weekly reporting time in half. Setup took ten minutes and the unified dashboard means I finally stopped checking five tabs every morning."</p>
        </div>
      </div>
    </div>);
}
function StarRow({ filled, total = 5, size = 16 }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: total }).map((_, i) =>
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < filled ? "hsl(var(--secondary))" : "hsl(var(--foreground) / 0.16)"}>
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.401 8.169L12 18.896l-7.335 3.857 1.401-8.169L.132 9.21l8.2-1.192z" />
        </svg>
      )}
    </div>);
}
function DownArrow({ color = "hsl(var(--primary))" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="4" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>);
}
function DashStat({ label, value, sub, stars }) {
  return (
    <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", padding: "0.8rem 0.85rem" }}>
      <div style={{ fontSize: "0.7rem", color: "hsl(var(--foreground)/0.5)", marginBottom: "0.4rem" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.35rem", lineHeight: 1 }}>{value}</span>
        {stars != null && <StarRow filled={stars} size={11} />}
        {sub && <span style={{ fontSize: "0.7rem", color: "hsl(var(--foreground)/0.45)" }}>{sub}</span>}
      </div>
    </div>);
}
function DashMock() {
  const bars = [
  { n: "Trustpilot", w: "100%", c: "hsl(215 16% 65%)" },
  { n: "Shopify", w: "92%", c: "hsl(var(--primary))" },
  { n: "G2", w: "90%", c: "hsl(330 97% 32%)" },
  { n: "Capterra", w: "82%", c: "hsl(var(--primary))" },
  { n: "Wordpress", w: "80%", c: "hsl(330 97% 32%)" },
  { n: "WooCommerce", w: "74%", c: "hsl(330 97% 32%)" }];

  const cardBox = { background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", padding: "0.9rem 1rem" };
  const cardTitle = { fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.7rem" };
  return (
    <div className="mock">
      <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">Revly · Dashboard</span></div>
      <div className="mock-pad">
        <div className="mock-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.55rem", marginBottom: "0.85rem" }}>
          <DashStat label="Total Reviews" value="81" />
          <DashStat label="Average Rating" value="4.3" stars={4} />
          <DashStat label="Last 30 Days" value="12" sub="new reviews" />
          <DashStat label="Connected Channels" value="6" sub="platforms" />
        </div>
        <div className="mock-charts" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
          <div style={cardBox}>
            <div style={cardTitle}>Reviews Over Time</div>
            <svg viewBox="0 0 300 110" style={{ width: "100%", height: "auto", display: "block" }}>
              <defs>
                <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,72 C25,60 45,46 70,50 C95,54 112,66 135,64 C160,62 178,48 205,46 C232,44 252,30 275,34 C286,36 295,44 300,48 L300,110 L0,110 Z" fill="url(#revArea)" />
              <path d="M0,72 C25,60 45,46 70,50 C95,54 112,66 135,64 C160,62 178,48 205,46 C232,44 252,30 275,34 C286,36 295,44 300,48" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.45rem", fontSize: "0.64rem", color: "hsl(var(--foreground)/0.4)" }}>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
          <div style={cardBox}>
            <div style={cardTitle}>Reviews by Platform</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {bars.map((b) =>
              <div key={b.n} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                  <span style={{ width: "68px", textAlign: "right", fontSize: "0.66rem", color: "hsl(var(--foreground)/0.5)", flex: "none" }}>{b.n}</span>
                  <div style={{ flex: 1, height: "13px" }}>
                    <div style={{ width: b.w, height: "100%", background: b.c, borderRadius: "4px" }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
function RouteMock() {
  const col = { display: "flex", flexDirection: "column", alignItems: "center", gap: "1.1rem", padding: "1.8rem 0.75rem", textAlign: "center" };
  const pillBase = { display: "inline-flex", alignItems: "center", fontFamily: "DM Sans", fontWeight: 700, fontSize: "0.9rem", padding: "0.55rem 1.1rem", borderRadius: "999px" };
  return (
    <div className="mock">
      <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">Smart routing</span></div>
      <div className="mock-pad">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
          <div style={col}>
            <StarRow filled={2} size={24} />
            <DownArrow color="hsl(var(--foreground)/0.35)" />
            <span style={{ ...pillBase, background: "hsl(var(--secondary))", color: "rgb(51, 50, 48)" }}>Support team</span>
          </div>
          <div style={col}>
            <StarRow filled={5} size={24} />
            <DownArrow color="hsl(var(--foreground)/0.35)" />
            <span style={{ ...pillBase, background: "hsl(var(--muted))", backgroundColor: "rgb(241, 5, 122)", color: "rgb(255, 255, 255)" }}>Public review</span>
          </div>
        </div>
      </div>
    </div>);
}
function RespMock() {
  return (
    <div className="mock">
      <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">Response composer</span></div>
      <div className="mock-pad">
        <div className="resp-orig">★★★☆☆ "Solid tool but the onboarding felt rushed and I missed a few features early on." — G2</div>
        <div className="resp-reply">
          <div className="tag">Suggested reply · your voice</div>
          <p>"Thanks for the honest feedback! We've just reworked onboarding with a guided setup — I'd love to walk you through the features you missed. Reaching out now."</p>
        </div>
      </div>
    </div>);
}

function Features() {
  const rows = [
  { chip: "Collect", chipClass: "chip-amber", heading: "Collect better reviews", body: "Share a single link. Customers share a quick thought, and Revly's AI turns it into a polished, authentic review — in their words, approved by them — ready to post on the right platform.", to: "/collect-quality-reviews", Mock: CollectMock, flip: false },
  { chip: "Monitor", chipClass: "chip-magenta", heading: "Every platform, one dashboard", body: "Stop checking a dozen tabs. Revly syncs reviews from all your listings, organised by product. Track rating trends, surface quotes for campaigns, and manage the entire review process in a single dashboard.", to: "/monitor-platforms", Mock: DashMock, flip: true },
  { chip: "Smart requests", chipClass: "chip-amber", heading: "Send smart review requests", body: "Revly checks in with customers before sending them anywhere. Those who need support reach your team first. Those who are ready get guided to the right review platform.", to: "/smart-review-requests", Mock: RouteMock, flip: false },
  { chip: "Respond", chipClass: "chip-magenta", heading: "Stay on top of every reply", body: "Almost no software company responds to its reviews — and savvy buyers sort by lowest rating first to see if you showed up. Revly flags what needs a response and helps you write one in your voice, across every platform.", to: "/manage-review-responses", Mock: RespMock, flip: true }];

  return (
    <section className="section" style={{ background: "hsl(var(--card))" }}>
      <div className="container-x">
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 4.5rem" }}>
          <span className="eyebrow">The platform</span>
          <h2 className="h2" style={{ marginTop: "0.9rem" }}>One platform to rule them <span className="mag">all.</span></h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "9rem" }}>
          {rows.map((r, i) => {
            const copy =
            <div>
                <span className={"chip " + r.chipClass}>{r.chip}</span>
                <h3 className="h3" style={{ margin: "1.1rem 0 0.75rem" }}>{r.heading}</h3>
                <p className="lead">{r.body}</p>
                <a className="btn btn-outline btn-sm" href={r.to} style={{ marginTop: "1.4rem" }}>Learn more →</a>
              </div>;
            const mock = <r.Mock />;
            return (
              <div key={i} className="grid-2">
                {r.flip ? <>{copy}{mock}</> : <>{mock}{copy}</>}
              </div>);
          })}
        </div>
      </div>
    </section>);
}

function HowItWorks() {
  const steps = [
  { t: "Connect your platforms", b: "Add your G2, Capterra, TrustRadius and app-store listings. Revly starts syncing reviews instantly." },
  { t: "Share your smart link", b: "One link per product checks in with customers, routes those who need help to your team, and guides the rest to the right platform." },
  { t: "Watch reviews improve", b: "AI turns brief feedback into detailed, authentic reviews — approved by customers, tracked in one dashboard." }];

  return (
    <section className="section how-dark" id="how" style={{ background: "hsl(var(--foreground))" }}>
      <div className="container-x">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 4rem" }}>
          <span className="eyebrow">How it works</span>
          <h2 className="h2" style={{ marginTop: "0.9rem" }}>Up and running in minutes.</h2>
          <p className="lead" style={{ marginTop: "0.9rem" }}>No complex setup, no code required.</p>
        </div>
        <div className="steps">
          <div className="steps-track"></div>
          <div className="steps-grid">
            {steps.map((s, i) =>
            <div className="step" key={i}>
                <div className="step-n">{i + 1}</div>
                <h3 className="h3">{s.t}</h3>
                <p className="text-muted">{s.b}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);
}

function StatsBanner() {
  const stats = [["500+", "Reviews tracked"], ["6+", "Platforms supported"], ["5 min", "Sync interval"]];
  return (
    <section className="section">
      <div className="container-x">
        <div className="statsA">
          <div className="statsA-grid">
            {stats.map((s, i) => <div key={i}><div className="num">{s[0]}</div><div className="l">{s[1]}</div></div>)}
          </div>
        </div>
      </div>
    </section>);
}

function WhoItsFor() {
  const items = ["A marketing manager at a growing SaaS company", "Managing reviews across 2+ platforms with no unified view", "Losing deals to better-reviewed competitors", "Worried about negative reviews landing before you can help"];
  return (
    <section className="section fitA">
      <div className="container-x fitA-grid">
        <div>
          <span className="eyebrow">Who it's for</span>
          <h2 className="h2" style={{ margin: "0.9rem 0 1rem" }}>Built for software companies.<br /><span className="mag">Not everyone else.</span></h2>
          <p className="lead">Most review tools were built for local businesses. Revly is built for G2, Capterra and TrustRadius — the platforms that decide software purchases.</p>
        </div>
        <div className="fit-card">
          <span className="chip chip-magenta">Revly is a good fit if you're</span>
          <ul>
            {items.map((it, i) => <li key={i}><span className="ck"><Icon name="check" size={17} /></span><span>{it}</span></li>)}
          </ul>
        </div>
      </div>
    </section>);
}

const HOME_FAQ = [
{ q: "Is this just AI generating fake reviews?", a: "No. The customer writes their own review. They can use our AI to help draft it and add detail, but it doesn't replace what they said. The customer reads it, edits it if they want to, and posts it themselves. Their voice, their specific points, their approval." },
{ q: "What platforms does Revly work with?", a: "Revly currently supports G2, Capterra, GetApp, Software Advice, Trustpilot, Apple App Store, Google PlayStore, Shopify App Store, WooCommerce Marketplace, QuickBooks Marketplace, WordPress Plugin Marketplace, Xero Marketplace. More platforms are being added — if a platform matters for software buying decisions, it's on the roadmap." },
{ q: "How is this different from emailing customers and asking for a review?", a: "When you email customers manually, you're guessing who's happy, sending links to multiple platforms and hoping they pick the right one, and getting back whatever they feel like writing. Revly replaces all three steps: sentiment screening identifies who to ask for a public review and who to send to your support team; a smart link routes them to the right platform based on your goals; AI drafting turns their response into a review that's actually useful to someone evaluating your product." },
{ q: "What if a customer doesn't want to post the AI-drafted review?", a: "They can edit it, rewrite it entirely, or decline. Nothing goes live without their explicit approval. If they don't post, nothing happens — no chasing, no pressure." },
{ q: "How long does setup take?", a: "Under 30 minutes for most teams. Connect your review platforms, create your first smart review link, and send your first campaign. Most customers see their first reviews come in within a few days." },
{ q: "Is Revly right for a company with only a handful of reviews?", a: "Yes — that's a common starting point. Companies with 10–50 reviews have enough customers to run meaningful campaigns, but not enough reviews to have social proof that converts. Getting from thin to credible is the first thing Revly helps with." }];


function HomeClosingCTA() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="ctaA">
          <h2 className="h2">Your review chaos? <span className="mag">Solved.</span></h2>
          <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "46ch" }}>One smart link. Every platform. Up and running in minutes.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <a className="btn btn-default btn-lg" href="/pricing">Get started for free</a>
            <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
          </div>
        </div>
      </div>
    </section>);
}

export function HomeMotion() {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('main > section').forEach((sec, i) => {
        if (i < 2) return; // leave hero + marquee untouched
        gsap.from(sec, { opacity: 0, y: 18, duration: 0.9, ease: 'power3.out', immediateRender: false,
          scrollTrigger: { trigger: sec, start: 'top 88%' } });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const t = setTimeout(refresh, 600);
    window.addEventListener('load', refresh);
    return () => { clearTimeout(t); window.removeEventListener('load', refresh); ctx.revert(); };
  }, []);
  return null;
}

export function Index() {
  return <>
    <Navbar />
    <main>
      <HomeMotion />
      <Hero />
      <TrustMarquee />
      <BeforeAfter />
      <Features />
      <HowItWorks />
      <WhoItsFor />
      <FAQ items={HOME_FAQ} />
      <HomeClosingCTA />
    </main>
    <Footer />
  </>;
}
