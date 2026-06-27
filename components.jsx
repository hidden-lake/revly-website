// Revly — Shared components
const { useState, useEffect, useRef } = React;
const { BrowserRouter, HashRouter, Routes, Route, Link, NavLink, useLocation } = ReactRouterDOM;

// ---------- Hooks ----------
function useJsonLd(...schemas) {
  const ref = useRef([]);
  useEffect(() => {
    const nodes = schemas.map((s) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = typeof s === "string" ? s : JSON.stringify(s);
      document.head.appendChild(el);
      return el;
    });
    ref.current = nodes;
    return () => {ref.current.forEach((n) => n.remove());};
  }, []);
}

function usePageMeta(title, description) {
  const { pathname } = useLocation();
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    const prev = m ? m.getAttribute("content") : "";
    if (!m) {m = document.createElement("meta");m.setAttribute("name", "description");document.head.appendChild(m);}
    m.setAttribute("content", description);

    // Keep the canonical URL in sync with the current route so every page
    // self-canonicalizes instead of all pointing at the homepage.
    let c = document.querySelector('link[rel="canonical"]');
    const prevHref = c ? c.getAttribute("href") : "https://revly.io/";
    if (!c) {c = document.createElement("link");c.setAttribute("rel", "canonical");document.head.appendChild(c);}
    const path = pathname === "/" ? "" : pathname.replace(/\/$/, "");
    c.setAttribute("href", "https://revly.io" + (path || "/"));

    return () => {document.title = prevTitle;if (m) m.setAttribute("content", prev);if (c) c.setAttribute("href", prevHref);};
  }, [title, description, pathname]);
}

// ---------- ScrollToTop ----------
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {window.scrollTo(0, 0);}, [pathname]);
  return null;
}

// ---------- Icons (lucide-style, lightweight inline SVG) ----------
const Icon = ({ name, size = 24, className = "" }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className };
  switch (name) {
    case "chevron-down":return <svg {...props}><polyline points="6 9 12 15 18 9" /></svg>;
    case "chevron-right":return <svg {...props}><polyline points="9 18 15 12 9 6" /></svg>;
    case "menu":return <svg {...props}><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
    case "x":return <svg {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
    case "check":return <svg {...props}><polyline points="20 6 9 17 4 12" /></svg>;
    case "users":return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "msg":return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
    case "nav":return <svg {...props}><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>;
    case "dash":return <svg {...props}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>;
    case "trend":return <svg {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>;
    case "search":return <svg {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
    case "ear":return <svg {...props}><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" /><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" /></svg>;
    case "heart":return <svg {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5L12 21z" /></svg>;
    case "shield":return <svg {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "eye":return <svg {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "mic":return <svg {...props}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>;
    default:return null;
  }
};

// ---------- Navbar ----------
function Navbar() {
  const [productOpen, setProductOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef(null);
  const ucRef = useRef(null);
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setProductOpen(false);
      if (ucRef.current && !ucRef.current.contains(e.target)) setUseCasesOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  const productLinks = [
  { to: "/collect-quality-reviews", label: "Collect Quality Reviews" },
  { to: "/monitor-platforms", label: "Monitor Multiple Review Platforms" },
  { to: "/smart-review-requests", label: "Send Smart Review Requests" },
  { to: "/manage-review-responses", label: "Manage Review Responses" }];
  const useCasesLinks = [
  { to: "/use-cases/saas", label: "SaaS teams" },
  { to: "/use-cases/agencies", label: "Agencies" }];

  return (
    <header className="nav">
      <div className="container-x" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/assets/revly-logo.png" alt="Revly" style={{ height: "2rem" }} />
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hide-md">
          <div ref={ref} style={{ position: "relative" }}>
            <button className="nav-link" onClick={() => setProductOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: ".25rem", border: 0, background: "transparent", fontSize: "15px" }}>
              product <Icon name="chevron-down" size={16} />
            </button>
            {productOpen &&
            <div className="dropdown">
                {productLinks.map((l) =>
              <Link key={l.to} to={l.to} onClick={() => setProductOpen(false)}>{l.label}</Link>
              )}
              </div>
            }
          </div>
          <div ref={ucRef} style={{ position: "relative" }}>
            <button className="nav-link" onClick={() => setUseCasesOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: ".25rem", border: 0, background: "transparent", fontSize: "15px", whiteSpace: "nowrap" }}>
              who it's for <Icon name="chevron-down" size={16} />
            </button>
            {useCasesOpen &&
            <div className="dropdown">
                {useCasesLinks.map((l) =>
              <Link key={l.to} to={l.to} onClick={() => setUseCasesOpen(false)}>{l.label}</Link>
              )}
              </div>
            }
          </div>
          <Link className="nav-link" to="/pricing">pricing</Link>
          <a className="btn btn-ghost btn-sm" href="https://app.revly.io/login" style={{ marginLeft: ".5rem", color: "hsl(var(--foreground) / 0.45)" }}>Sign in</a>
          <a className="btn btn-default btn-sm" href="https://app.revly.io/signup">Start for free</a>
        </nav>
        <button className="show-md" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu" style={{ border: 0, background: "transparent", display: "none" }}>
          <Icon name={mobileOpen ? "x" : "menu"} />
        </button>
      </div>
      {mobileOpen &&
      <div className="show-md" style={{ borderTop: "1px solid hsl(var(--border))", background: "hsl(var(--card))", padding: "1rem 1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
            {productLinks.map((l) => <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} style={{ padding: ".5rem 0" }}>{l.label}</Link>)}
            <div style={{ height: "1px", background: "hsl(var(--border))", margin: ".4rem 0" }} />
            {useCasesLinks.map((l) => <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} style={{ padding: ".5rem 0" }}>{l.label}</Link>)}
            <Link to="/pricing" onClick={() => setMobileOpen(false)} style={{ padding: ".5rem 0" }}>Pricing</Link>
            <a className="btn btn-default" href="https://app.revly.io/signup" style={{ marginTop: ".5rem" }}>Start for free</a>
          </div>
        </div>
      }
      <style>{`
        @media (max-width: 880px) { .hide-md { display: none !important; } .show-md { display: inline-flex !important; } }
        @media (min-width: 881px) { .show-md { display: none !important; } }
      `}</style>
    </header>);

}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="footer">
      <div className="container-x">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "2.25rem" }} className="footer-grid">
          <div>
            <img src="/assets/revly-logo-icon-white.png" alt="Revly" style={{ height: "1.85rem" }} />
            <p style={{ color: "rgba(255,255,255,0.6)", marginTop: ".75rem", fontSize: ".95rem", maxWidth: "24rem" }}>Review management for software companies.</p>
            <div style={{ display: "flex", gap: "0.9rem", alignItems: "center", marginTop: "1.25rem" }}>
              <a href="https://www.youtube.com/@revlyhq" target="_blank" rel="noopener" aria-label="Revly on YouTube" style={{ color: "#fff", display: "inline-flex" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/revlyhq/" target="_blank" rel="noopener" aria-label="Revly on LinkedIn" style={{ color: "#fff", display: "inline-flex" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" /></svg>
              </a>
              <a href="https://open.spotify.com/playlist/4nJO121CkVgAQI9mOyTSc6" target="_blank" rel="noopener" aria-label="Revly on Spotify" style={{ color: "#fff", display: "inline-flex" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>
            </div>
          </div>
          <FooterCol title="Product" links={[
          ["Collect Quality Reviews", "/collect-quality-reviews"],
          ["Monitor Multiple Review Platforms", "/monitor-platforms"],
          ["Send Smart Review Requests", "/smart-review-requests"],
          ["Manage Review Responses", "/manage-review-responses"]]
          } />
          <FooterCol title="Platforms" items={[
          "G2",
          "Trustpilot",
          "Shopify App Marketplace",
          "WordPress Plugin Marketplace",
          "WooCommerce Marketplace",
          "Xero Marketplace",
          "QuickBooks Marketplace",
          "Capterra, GetApp & Software Advice"]
          } />
          <FooterCol title="Who it's for" links={[
          ["SaaS teams", "/use-cases/saas"],
          ["Agencies", "/use-cases/agencies"]]
          } />
          <FooterCol title="Company" links={[["Contact", "mailto:hello@revly.io"], ["Privacy", "/privacy"], ["Terms", "/terms"]]} />
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "3rem", paddingTop: "1.5rem", color: "rgba(255,255,255,0.4)", fontSize: ".85rem" }}>
          © 2026 Revly. Built for software companies.
        </div>
      </div>
      <style>{`@media (max-width: 880px){ .footer-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 540px){ .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>);

}
function FooterCol({ title, links, items }) {
  return (
    <div>
      <h4 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: ".95rem", color: "white", marginBottom: ".9rem" }}>{title}</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".55rem" }}>
        {items ?
        items.map((label) =>
        <li key={label} style={{ color: "rgba(255,255,255,0.6)", fontSize: ".9rem", lineHeight: 1.4 }}>{label}</li>
        ) :
        links.map(([label, to]) =>
        <li key={label}>
            {to.startsWith("/") ? <Link to={to} style={{ color: "rgba(255,255,255,0.6)", fontSize: ".9rem" }}>{label}</Link> :
          <a href={to} style={{ color: "rgba(255,255,255,0.6)", fontSize: ".9rem" }}>{label}</a>}
          </li>
        )}
      </ul>
    </div>);

}

// ---------- PlatformBar ----------
function PlatformBar() {
  const logos = ["G2", "Capterra", "TrustRadius", "GetApp", "Software Advice", "Trustpilot", "App Store", "Google Play", "Shopify"];
  const triple = [...logos, ...logos, ...logos];
  return (
    <div style={{ background: "hsl(var(--primary))", padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
      <div className="animate-scroll" style={{ display: "flex", gap: "6rem", whiteSpace: "nowrap", width: "max-content" }}>
        {triple.map((l, i) =>
        <span key={i} style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.01em" }}>{l}</span>
        )}
      </div>
    </div>);

}

// ---------- BeforeAfterSlider — static before/after comparison table ----------
function BeforeAfterSlider({ rows }) {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <div className="ba2-grid">
        <div className="ba2-backdrop ba2-backdrop-without" aria-hidden="true"></div>
        <div className="ba2-backdrop ba2-backdrop-with" aria-hidden="true"></div>

        <div className="ba2-h without" style={{ gridColumn: 1, gridRow: 1 }}>Without Revly</div>
        <div className="ba2-h with" style={{ gridColumn: 2, gridRow: 1 }}><span>With Revly</span></div>

        {rows.map((r, i) =>
        <React.Fragment key={i}>
            <div className="ba2-cell without" style={{ gridColumn: "1 / -1", gridRow: i + 2 }}><span>{r.without}</span></div>
            <div className="ba2-cell with" style={{ gridColumn: 2, gridRow: i + 2 }}><span>{r.with}</span></div>
          </React.Fragment>
        )}
      </div>
    </div>);

}

// ---------- ScrollRevealSection — sticky scroll-driven crossfade ----------
function ScrollRevealSection({ title, bgClassName = "", keepTitle = false, children }) {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const compute = () => {
      tickingRef.current = false;
      const el = wrapperRef.current;if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const wrapperHeight = el.offsetHeight;
      const denom = Math.max(1, wrapperHeight - vh);
      const p = Math.max(0, Math.min(1, -rect.top / denom));
      setProgress(p);
    };
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const bg = bgClassName === "card" ? "hsl(var(--card))" :
  bgClassName === "f6" ? "#f6f6f4" :
  bgClassName === "accent" ? "hsl(var(--accent))" :
  bgClassName === "muted" ? "hsl(var(--muted))" : "transparent";

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  // Smooth ease-in-out so progress doesn't feel linear/clunky
  const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // Detect small viewports: skip the sticky-runway treatment to keep mobile usable
  const isSmall = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 880px)").matches;

  if (isSmall) {
    return (
      <section className="section" style={{ background: bg }}>
        <div className="container-x" style={{ maxWidth: "820px" }}>
          <h2 className="h2" style={{ marginBottom: "2rem", textAlign: "center" }}>{title}</h2>
          <div>{children}</div>
        </div>
      </section>);

  }

  if (keepTitle) {
    // Title persists; body has a faint baseline and ramps up smoothly
    const tRaw = clamp((progress - 0.05) / (0.45 - 0.05), 0, 1);
    const t = ease(tRaw);
    const bodyOpacity = lerp(0.18, 1, t);
    const bodyY = lerp(24, 0, t);
    return (
      <div ref={wrapperRef} style={{ height: "130vh", background: bg, position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
          <div className="container-x" style={{ textAlign: "center", maxWidth: "900px" }}>
            <h2 className="h2" style={{ marginBottom: "2.5rem" }}>{title}</h2>
            <div style={{ opacity: bodyOpacity, transform: `translateY(${bodyY}px)`, willChange: "opacity, transform" }}>
              {children}
            </div>
          </div>
        </div>
      </div>);

  }

  // Default: title and body share the screen; title fades out, body fades up
  let titleOp, titleY, bodyOp, bodyY;
  if (progress < 0.2) {
    titleOp = 1;titleY = 0;
    const t = ease(clamp(progress / 0.2, 0, 1));
    bodyOp = lerp(0.15, 0.22, t);
    bodyY = lerp(18, 10, t);
  } else if (progress <= 0.6) {
    const t = ease((progress - 0.2) / (0.6 - 0.2));
    titleOp = lerp(1, 0, t);
    titleY = lerp(0, -32, t);
    bodyOp = lerp(0.22, 1, t);
    bodyY = lerp(10, 0, t);
  } else {
    titleOp = 0;titleY = -32;bodyOp = 1;bodyY = 0;
  }
  const titlePE = titleOp < 0.1 ? "none" : "auto";
  const bodyPE = bodyOp < 0.4 ? "none" : "auto";
  return (
    <div ref={wrapperRef} style={{ height: "140vh", background: bg, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div className="container-x" style={{ textAlign: "center", maxWidth: "900px", marginBottom: "2rem", opacity: titleOp, transform: `translateY(${titleY}px)`, pointerEvents: titlePE, willChange: "opacity, transform", position: titleOp < 0.05 ? "absolute" : "relative" }}>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="container-x" style={{ maxWidth: "820px", opacity: bodyOp, transform: `translateY(${bodyY}px)`, pointerEvents: bodyPE, willChange: "opacity, transform", transition: "opacity 80ms linear" }}>
          {children}
        </div>
      </div>
    </div>);

}

// ---------- FAQ Accordion ----------
function FAQ({ items, title = "Common questions" }) {
  const [open, setOpen] = useState(-1);
  return (
    <section className="section" style={{ background: "hsl(var(--card))" }}>
      <div className="container-x" style={{ maxWidth: "720px" }}>
        <h2 className="h2" style={{ textAlign: "center", marginBottom: "3rem" }}>{title}</h2>
        <div>
          {items.map((it, i) =>
          <div key={i} className={"acc-item" + (open === i ? " open" : "")}>
              <button className="acc-trigger" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <Icon name="chevron-down" size={20} />
              </button>
              <div className="acc-content">
                <div>{it.a}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------- ClosingCTA ----------
function ClosingCTA({ heading, sub, buttons, bg = "muted" }) {
  const bgStyle = bg === "primary" ? { background: "hsl(var(--primary))", color: "white" } : { background: "hsl(var(--muted))" };
  return (
    <section className="section" style={bgStyle}>
      <div className="container-x" style={{ textAlign: "center", maxWidth: "760px" }}>
        <h2 className="h2" style={{ color: bg === "primary" ? "white" : undefined }}>{heading}</h2>
        <p className="lead" style={{ marginTop: "1rem", color: bg === "primary" ? "rgba(255,255,255,0.85)" : undefined }}>{sub}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {buttons}
        </div>
      </div>
    </section>);

}

// ---------- Cross-links ----------
function CrossLinks({ items }) {
  return (
    <section style={{ background: "#f6f6f4", padding: "4rem 0" }}>
      <div className="container-x">
        <div style={{ fontSize: ".8rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "hsl(var(--foreground)/0.5)", textAlign: "center", marginBottom: "2rem" }}>Also in Revly</div>
        <div className="grid-3">
          {items.map((it, i) =>
          <Link key={i} to={it.to} className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", height: "100%", transition: "all .2s" }}>
              <div className="chip chip-amber" style={{ marginBottom: "1rem", alignSelf: "flex-start" }}>{it.chip}</div>
              <h3 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.35rem", marginBottom: ".5rem", minHeight: "2.6em" }}>{it.title}</h3>
              <p style={{ color: "hsl(var(--foreground)/0.6)", fontSize: ".95rem", margin: 0 }}>{it.body}</p>
              <div style={{ color: "hsl(var(--primary))", fontWeight: 700, marginTop: "auto", paddingTop: "1.25rem", fontSize: ".9rem" }}>Learn more →</div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}

// Export to window
Object.assign(window, {
  useJsonLd, usePageMeta, ScrollToTop, Icon, Navbar, Footer, PlatformBar,
  BeforeAfterSlider, ScrollRevealSection, FAQ, ClosingCTA, CrossLinks
});