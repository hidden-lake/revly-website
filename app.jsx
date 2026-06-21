// Revly — Pricing & NotFound
const PLANS = [
  {
    name: "Free", price: "$0", priceSub: "/mo", desc: "For getting started",
    bullets: ["2 channels, 1 collection link","10 collected reviews/month","Daily review monitoring","Email support"],
    cta: { label: "Get started", href: "https://app.revly.io/signup" }, variant: "outline",
  },
  {
    name: "Pro", price: "$41", priceSub: "/mo", desc: "For growing businesses",
    sub: "$49 billed monthly",
    bullets: ["5 channels, 3 collection links","200 collected reviews/month","AI enhancement, sentiment & responses","Custom branding & incentives","Reports, widget & notifications"],
    cta: { label: "Get started", href: "https://app.revly.io/signup?plan=pro" }, popular: true,
  },
  {
    name: "Business", price: "$84", priceSub: "/mo", desc: "For teams at scale",
    sub: "$99 billed monthly",
    bullets: ["15 channels, 10 collection links","1,000 collected reviews/month","Unlimited team members","Everything in Pro, plus API & integrations","Custom domain & white-label"],
    cta: { label: "Get started", href: "https://app.revly.io/signup?plan=business" }, variant: "outline",
  },
  {
    name: "Agency", price: "Custom", priceSub: "", desc: "For agencies managing clients",
    sub: "Contact us for pricing",
    bullets: ["10+ managed clients","Everything in Business","Multi-client dashboard & billing","Per-client branding & dedicated support"],
    cta: { label: "Contact us", href: "mailto:hello@revly.io?subject=Agency%20Plan%20Inquiry" }, variant: "outline",
  },
];

const COMPARE = [
  { section: "Limits", rows: [
    ["Monitored channels", "2", "5 (+$5/mo)", "15 (+$3/mo)", "5/client (+$3/mo)"],
    ["Collection links", "1", "3", "10", "5/client"],
    ["Collected reviews/month", "10", "200", "1,000", "500/client"],
    ["Team members", "1", "3", "Unlimited", "Unlimited"],
    ["Managed clients", "—", "—", "—", "10+"],
  ]},
  { section: "Review Monitoring", rows: [
    ["Review monitoring", "Every day", "Every 6 hours", "Every 2 hours", "Every 2 hours"],
    ["AI response suggestions", "—", "✓", "✓", "✓"],
    ["AI sentiment analysis", "—", "✓", "✓", "✓"],
  ]},
  { section: "Review Collection", rows: [
    ["Basic collection", "Yes (branded)", "✓", "✓", "✓"],
    ["AI review enhancement", "—", "✓", "✓", "✓"],
    ["Custom branding", "—", "✓", "✓", "Yes (per-client)"],
    ["Incentives", "—", "✓", "✓", "✓"],
    ["Auto incentive fulfillment", "—", "—", "✓", "✓"],
    ["Param rules", "—", "—", "✓", "✓"],
    ["Collection analytics", "—", "✓", "✓", "✓"],
    ["Hide Revly branding", "—", "—", "✓", "✓"],
    ["Custom domain", "—", "—", "✓", "✓"],
  ]},
  { section: "Reporting", rows: [
    ["Reports dashboard", "—", "✓", "✓", "✓"],
    ["Scheduled reports", "—", "✓", "✓", "✓"],
  ]},
  { section: "Integrations & Exports", rows: [
    ["Review widget (embed)", "—", "✓", "Yes + CSS", "Yes + CSS"],
    ["Email notifications", "Weekly digest", "✓", "✓", "✓"],
    ["Slack notifications", "—", "✓", "✓", "✓"],
    ["Webhook notifications", "—", "—", "✓", "✓"],
    ["CSV export", "—", "✓", "✓", "✓"],
    ["Google Sheets export", "—", "—", "✓", "✓"],
    ["HubSpot integration", "—", "—", "✓", "✓"],
    ["API access", "—", "—", "✓", "✓"],
  ]},
  { section: "Support", rows: [
    ["Support", "Email", "Email", "Priority email", "Dedicated"],
  ]},
];

function CmpCell({ value }) {
  if (value === "✓") return <span className="check"><Icon name="check" size={18}/></span>;
  if (value === "—") return <span className="dash">—</span>;
  return <span>{value}</span>;
}

function Pricing() {
  usePageMeta("Pricing — Revly", "Simple, transparent pricing for review management. Start free and scale as you grow. No per-seat pricing, no hidden fees.");
  const FAQS = [
    { q:"What happens when I hit my review limit?", a:"Collected reviews reset each month. If you hit your limit, new collection links pause until next month. Monitoring continues uninterrupted." },
    { q:"Can I add extra channels?", a:"Yes! Pro plans can add channels for $5/mo each, Business and Agency for $3/mo each." },
    { q:"What platforms do you monitor?", a:"Shopify App Store, G2, QuickBooks App Store, WordPress.org, Xero App Store, WooCommerce Marketplace, and Capterra. More coming soon." },
    { q:"How does AI review enhancement work?", a:"Customers share a quick star rating and a few words of feedback. Our AI expands this into a complete, authentic review that matches their sentiment and tone—ready to copy and post on any platform." },
    { q:"Can I switch plans?", a:"Yes, upgrade or downgrade anytime. Changes take effect immediately, and we prorate the difference." },
    { q:"Do you offer a free trial of paid plans?", a:"The Free plan lets you try core features. When you're ready, upgrade to Pro or Business—no trial needed, cancel anytime." },
  ];
  useJsonLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Revly",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Review management for software companies. Collect better reviews, monitor every platform, and respond in your voice — from one dashboard. Start free and scale as you grow.",
      "url": "https://revly.io",
      "offers": [
        { "@type": "Offer", "name": "Free", "price": "0", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Pro", "price": "41", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Business", "price": "84", "priceCurrency": "USD" }
      ]
    }),
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map((it) => ({ "@type": "Question", "name": it.q, "acceptedAnswer": { "@type": "Answer", "text": it.a } }))
    })
  );
  return (<>
    <Navbar/>
    <main>
      <section style={{background:"hsl(var(--muted))", padding:"5rem 0 3rem"}}>
        <div className="container-x" style={{textAlign:"center", maxWidth:"720px"}}>
          <h1 className="h1">Simple, transparent pricing</h1>
          <p className="lead" style={{marginTop:"1.25rem"}}>Start free and scale as you grow. No per-seat pricing, no hidden fees.</p>
        </div>
      </section>

      <section style={{background:"hsl(var(--muted))", paddingBottom:"5rem"}}>
        <div className="container-x">
          <div className="grid-4 grid-4-pricing" style={{alignItems:"stretch"}}>
            {PLANS.map(p => (
              <div key={p.name} className="card" style={{padding:"2rem", display:"flex", flexDirection:"column", position:"relative", border: p.popular ? "2px solid hsl(var(--primary))" : undefined}}>
                {p.popular && <div style={{position:"absolute", top:"-0.85rem", left:"50%", transform:"translateX(-50%)", background:"hsl(var(--primary))", color:"white", fontSize:".7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", padding:".35rem .75rem", borderRadius:"999px"}}>Most popular</div>}
                <h3 style={{fontFamily:"Bricolage Grotesque", fontWeight:800, fontSize:"1.4rem"}}>{p.name}</h3>
                <p style={{color:"hsl(var(--foreground)/0.6)", fontSize:".9rem", marginTop:".15rem"}}>{p.desc}</p>
                <div style={{marginTop:"1.25rem", display:"flex", alignItems:"baseline", gap:".25rem"}}>
                  <span style={{fontFamily:"Bricolage Grotesque", fontWeight:800, fontSize:"2.5rem", lineHeight:1}}>{p.price}</span>
                  {p.priceSub && <span style={{color:"hsl(var(--foreground)/0.6)", fontSize:"1rem"}}>{p.priceSub}</span>}
                </div>
                {p.sub && <div style={{color:"hsl(var(--foreground)/0.5)", fontSize:".85rem", marginTop:".25rem"}}>{p.sub}</div>}
                <ul style={{listStyle:"none", padding:0, margin:"1.5rem 0 1.75rem", display:"flex", flexDirection:"column", gap:".65rem"}}>
                  {p.bullets.map((b, i) => (
                    <li key={i} style={{display:"flex", alignItems:"flex-start", gap:".55rem", fontSize:".92rem"}}>
                      <span style={{color:"hsl(var(--primary))", marginTop:"2px", flex:"none"}}><Icon name="check" size={16}/></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a href={p.cta.href} className={"btn " + (p.popular ? "btn-default" : "btn-outline")} style={{marginTop:"auto"}}>{p.cta.label}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"#f6f6f4"}}>
        <div className="container-x">
          <h2 className="h2" style={{textAlign:"center", marginBottom:"2.5rem"}}>Compare plans</h2>
          <div style={{overflowX:"auto"}}>
            <table className="cmp">
              <thead>
                <tr>
                  <th></th>
                  <th>Free</th>
                  <th>Pro</th>
                  <th>Business</th>
                  <th>Agency</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((g, gi) => (
                  <React.Fragment key={gi}>
                    <tr className="section-row"><td colSpan={5}>{g.section}</td></tr>
                    {g.rows.map((r, ri) => (
                      <tr key={ri}>
                        <td style={{fontWeight:500}}>{r[0]}</td>
                        <td><CmpCell value={r[1]}/></td>
                        <td><CmpCell value={r[2]}/></td>
                        <td><CmpCell value={r[3]}/></td>
                        <td><CmpCell value={r[4]}/></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQ items={FAQS}/>

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Your review chaos? <span className="mag">Solved.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "46ch" }}>One smart link. Every platform. Up and running in minutes.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="https://app.revly.io/signup">Get started for free</a>
              <a className="btn btn-yellow btn-lg" href="mailto:hello@revly.io?subject=Book%20a%20demo">Book a demo</a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </>);
}

function NotFound() {
  return (
    <div style={{minHeight:"100vh", background:"hsl(var(--background))", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem"}}>
      <div style={{textAlign:"center"}}>
        <h1 className="h1" style={{fontSize:"6rem"}}>404</h1>
        <p className="lead" style={{marginTop:"1rem"}}>Oops! Page not found.</p>
        <Link to="/" className="btn btn-default" style={{marginTop:"1.5rem"}}>Return to Home</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/collect-quality-reviews" element={<CollectBetterReviews/>} />
        <Route path="/collect-better-reviews" element={<CollectBetterReviews/>} />
        <Route path="/monitor-platforms" element={<MonitorPlatforms/>} />
        <Route path="/smart-review-requests" element={<SmartReviewRequests/>} />
        <Route path="/manage-review-responses" element={<ManageReviewResponses/>} />
        <Route path="/use-cases/saas" element={<UseCaseSaaS/>} />
        <Route path="/use-cases/agencies" element={<UseCaseAgencies/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
