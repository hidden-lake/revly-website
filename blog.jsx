// Revly — Blog index + Article page
const BLOG_POSTS = [
{
  slug: "why-most-software-companies-fail-at-reviews",
  title: "Why most software companies fail at reviews",
  excerpt: "Most B2B software teams treat reviews like a quarterly checkbox. Then they wonder why their G2 page is half-empty and the sales team keeps losing deals to better-reviewed competitors. Here's the playbook nobody hands you.",
  author: "Elena Marinova",
  role: "Revly Co-founder",
  date: "May 14, 2026",
  readTime: "8 min read",
  category: "Strategy",
  featured: true,
  accent: "primary"
},
{
  slug: "ai-drafted-reviews-honest-or-not",
  title: "Are AI-drafted reviews honest? A look behind the curtain",
  excerpt: "The phrase \"AI-generated reviews\" makes most marketers flinch — for good reason. But there's a meaningful difference between AI writing a review from thin air and AI helping a real customer articulate one. We dig in.",
  author: "Elena Marinova",
  role: "Revly Co-founder",
  date: "May 7, 2026",
  readTime: "6 min read",
  category: "Product"
},
{
  slug: "g2-vs-capterra-vs-trustpilot",
  title: "G2 vs Capterra vs Trustpilot: where should you focus first?",
  excerpt: "Spreading review collection across three platforms equally is usually a mistake. Here's how to figure out which platform actually moves the needle for your category — and why the answer is rarely the one everyone assumes.",
  author: "Elena Marinova",
  role: "Revly Co-founder",
  date: "April 28, 2026",
  readTime: "10 min read",
  category: "Strategy"
},
{
  slug: "respond-to-reviews-aeo",
  title: "Responding to reviews is the AEO move nobody is making",
  excerpt: "G2 and Capterra are cited more often than your homepage in AI-generated buyer queries. Your responses on those pages are indexable content. Most software companies are leaving that real estate empty.",
  author: "Elena Marinova",
  role: "Revly Co-founder",
  date: "April 21, 2026",
  readTime: "7 min read",
  category: "Growth"
},
{
  slug: "the-quietly-unhappy-customer",
  title: "The quietly unhappy customer is your biggest blind spot",
  excerpt: "The customer who churns without complaining told you they were unhappy. You just didn't have a system to hear it. A short note on why sentiment screening matters before any review request goes out.",
  author: "Elena Marinova",
  role: "Revly Co-founder",
  date: "April 12, 2026",
  readTime: "5 min read",
  category: "Customer success"
},
{
  slug: "review-incentives-what-works",
  title: "Review incentives: what works, what backfires",
  excerpt: "Offering a $20 gift card for a G2 review can either double your review velocity or get your profile flagged. The line between the two is thinner than most teams realise. Here's how to stay on the right side of it.",
  author: "Elena Marinova",
  role: "Revly Co-founder",
  date: "April 3, 2026",
  readTime: "6 min read",
  category: "Operations"
},
{
  slug: "first-50-reviews",
  title: "From 5 to 50 reviews: the first 90 days, step by step",
  excerpt: "If you're a SaaS company with under 10 reviews and a clear product-market fit, the next 90 days matter more than the previous twelve months. A real playbook from teams who've done it.",
  author: "Elena Marinova",
  role: "Revly Co-founder",
  date: "March 24, 2026",
  readTime: "9 min read",
  category: "Strategy"
}];


const CATEGORIES = ["All", "Strategy", "Product", "Growth", "Operations", "Customer success"];

const ACCENT_BG = {
  primary: "hsl(var(--primary))",
  pink: "hsl(var(--muted))",
  amber: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))"
};
const ACCENT_COLOR = {
  primary: "white",
  pink: "hsl(var(--primary))",
  amber: "#92400e",
  accent: "#b45309"
};

function initials(name) {
  return name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function AuthorAvatar({ name, size = 36 }) {
  const seed = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  const hues = ["primary", "amber", "accent"];
  const accent = hues[seed % hues.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "999px", flex: "none",
      background: ACCENT_BG[accent], color: ACCENT_COLOR[accent],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: size * 0.42
    }}>{initials(name)}</div>);

}

// Decorative editorial hero block (no real image — keeps it on-brand)
function EditorialHero({ category, accent = "pink" }) {
  const bg = ACCENT_BG[accent];
  const fg = ACCENT_COLOR[accent];
  return (
    <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: "1rem", overflow: "hidden", background: bg, color: fg, display: "flex", alignItems: "flex-end", padding: "1.5rem" }}>
      {/* decorative type */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "clamp(7rem, 18vw, 16rem)", lineHeight: 1, opacity: 0.13, letterSpacing: "-0.04em", userSelect: "none" }}>R</div>
      <div style={{ position: "absolute", bottom: "1.25rem", left: "1.5rem", fontFamily: "DM Sans", fontWeight: 700, fontSize: ".72rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.9 }}>{category}</div>
    </div>);

}

function HeroFeatured({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} style={{ display: "block" }}>
      <div className="card" style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="featured-card">
        <div style={{ minWidth: 0 }}>
          <EditorialHero category={post.category} accent="primary" />
        </div>
        <div style={{ padding: "0.5rem 0.75rem 1rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="chip chip-pink" style={{ alignSelf: "flex-start", marginBottom: "1rem" }}>Featured</div>
          <h2 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "clamp(1.85rem, 3vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.018em", marginBottom: "1rem" }}>{post.title}</h2>
          <p className="lead" style={{ marginBottom: "1.5rem" }}>{post.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <AuthorAvatar name={post.author} />
            <div>
              <div style={{ fontWeight: 600, fontSize: ".95rem" }}>{post.author}</div>
              <div style={{ color: "hsl(var(--foreground)/0.6)", fontSize: ".82rem" }}>{post.date} · {post.readTime}</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 880px) { .featured-card { grid-template-columns: 1.15fr 1fr !important; align-items: stretch !important; } }
      `}</style>
    </Link>);

}

function ArticleCard({ post }) {
  const accents = ["pink", "amber", "accent", "primary"];
  const accent = accents[post.slug.length % accents.length];
  return (
    <Link to={`/blog/${post.slug}`} className="card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", transition: "transform .2s ease, box-shadow .2s ease" }} onMouseEnter={(e) => {e.currentTarget.style.transform = "translateY(-2px)";e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";}} onMouseLeave={(e) => {e.currentTarget.style.transform = "";e.currentTarget.style.boxShadow = "";}}>
      <EditorialHero category={post.category} accent={accent} />
      <div style={{ padding: "0 .5rem .5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.25rem", lineHeight: 1.2, letterSpacing: "-0.012em", marginBottom: ".6rem" }}>{post.title}</h3>
        <p style={{ color: "hsl(var(--foreground)/0.65)", fontSize: ".95rem", lineHeight: 1.55, marginBottom: "1rem", flex: 1 }}>{post.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginTop: "auto" }}>
          <AuthorAvatar name={post.author} size={28} />
          <div style={{ fontSize: ".82rem", color: "hsl(var(--foreground)/0.6)" }}>{post.author} · {post.date} · {post.readTime}</div>
        </div>
      </div>
    </Link>);

}

function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <section className="section" style={{ background: "hsl(var(--muted))" }}>
      <div className="container-x" style={{ maxWidth: "720px", textAlign: "center" }}>
        <h2 className="h2">A monthly read for software marketers</h2>
        <p className="lead" style={{ marginTop: "1rem" }}>One short, thoughtful piece a month on reviews, social proof, and the unsexy mechanics behind both. No fluff, no roundup posts.</p>
        <form onSubmit={(e) => {e.preventDefault();if (email) setSubmitted(true);}} style={{ display: "flex", gap: ".6rem", justifyContent: "center", marginTop: "1.75rem", flexWrap: "wrap" }}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@company.com"
            required
            style={{
              padding: "0.85rem 1rem", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))",
              background: "hsl(var(--card))", minWidth: "260px", fontFamily: "DM Sans", fontSize: "0.95rem"
            }} />
          
          <button type="submit" className="btn btn-default" style={{ height: "auto", padding: "0.85rem 1.5rem" }}>{submitted ? "You're in ✓" : "Subscribe"}</button>
        </form>
        <div style={{ color: "hsl(var(--foreground)/0.5)", fontSize: ".82rem", marginTop: ".75rem" }}>No spam. Unsubscribe in one click.</div>
      </div>
    </section>);

}

function Blog() {
  usePageMeta("Blog — Revly", "Thoughtful, opinionated writing on reviews, social proof, and the unsexy mechanics behind both. From the team building Revly.");
  const [cat, setCat] = useState("All");
  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => p !== featured);
  const filtered = cat === "All" ? rest : rest.filter((p) => p.category === cat);

  return <>
    <Navbar />
    <main>
      {/* Hero card + Featured side-by-side */}
      <section style={{ background: "hsl(var(--card))", padding: "3rem 0 3.5rem" }}>
        <div className="container-x">
          <div className="blog-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", alignItems: "stretch" }}>
            {/* Magenta hero card */}
            <div style={{ background: "hsl(var(--primary))", color: "white", borderRadius: "1.25rem", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h1 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "white", fontSize: "100px" }}>Blog</h1>
              <p style={{ marginTop: "0.85rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.55, maxWidth: "24rem", fontSize: "20px" }}>Useful reads fro the Revly team
on reviews, social proof,
and the mechanics behind both.</p>
            </div>

            {/* Featured post card */}
            <Link to={`/blog/${featured.slug}`} className="card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", textDecoration: "none", transition: "transform .2s ease, box-shadow .2s ease" }} onMouseEnter={(e) => {e.currentTarget.style.transform = "translateY(-2px)";e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";}} onMouseLeave={(e) => {e.currentTarget.style.transform = "";e.currentTarget.style.boxShadow = "";}}>
              <EditorialHero category={featured.category} accent="amber" />
              <div style={{ padding: "0 .5rem .5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <div className="chip chip-pink" style={{ alignSelf: "flex-start", marginBottom: ".85rem" }}>Featured</div>
                <h2 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "clamp(1.4rem, 2vw, 1.75rem)", lineHeight: 1.2, letterSpacing: "-0.014em", marginBottom: ".75rem" }}>{featured.title}</h2>
                <p style={{ color: "hsl(var(--foreground)/0.65)", fontSize: ".97rem", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>{featured.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: ".65rem", marginTop: "auto" }}>
                  <AuthorAvatar name={featured.author} size={32} />
                  <div style={{ fontSize: ".85rem", color: "hsl(var(--foreground)/0.6)" }}>{featured.author} · {featured.date} · {featured.readTime}</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <style>{`@media (min-width: 880px){ .blog-hero-grid { grid-template-columns: 0.85fr 1.15fr !important; gap: 2rem !important; } }`}</style>
      </section>

      {/* Category bar */}
      <section style={{ background: "#f6f6f4", padding: "1.5rem 0", borderTop: "1px solid hsl(var(--border))", position: "sticky", top: "4rem", zIndex: 40 }}>
        <div className="container-x" style={{ display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap", overflowX: "auto" }}>
          <span style={{ fontFamily: "DM Sans", fontWeight: 700, fontSize: ".75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "hsl(var(--foreground)/0.5)", marginRight: ".5rem" }}>Browse</span>
          {CATEGORIES.map((c) => {const active = cat === c;return (
                <button key={c} onClick={() => setCat(c)} className="btn" style={{
                  background: active ? "hsl(var(--foreground))" : "transparent",
                  color: active ? "white" : "hsl(var(--foreground))",
                  border: active ? "1px solid hsl(var(--foreground))" : "1px solid hsl(var(--border))",
                  height: "2.25rem", padding: "0 1rem", fontSize: ".85rem", fontWeight: 600,
                  borderRadius: "999px"
                }}>{c}</button>);

            })}
        </div>
      </section>

      {/* Article grid */}
      <section style={{ background: "#f6f6f4", padding: "2rem 0 6rem" }}>
        <div className="container-x">
          {filtered.length === 0 ?
          <div style={{ padding: "4rem 0", textAlign: "center", color: "hsl(var(--foreground)/0.5)" }}>Nothing in this category yet.</div> :

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
              {filtered.map((p) => <ArticleCard key={p.slug} post={p} />)}
            </div>
          }
        </div>
      </section>

      <Newsletter />
    </main>
    <Footer />
  </>;
}

// =========================================================================
// Article page — content for the featured slug
// =========================================================================

const ARTICLE_BODIES = {
  "why-most-software-companies-fail-at-reviews": [
  { type: "lead", text: "If you're reading this with under fifty reviews on G2, a half-finished Capterra page, and a vague plan to \"do something about reviews next quarter,\" this piece is for you." },
  { type: "p", text: "Reviews are one of the most leveraged pieces of social proof a software company can build. They show up in every buying journey — usually before your sales team gets a chance to. And yet most B2B software companies treat reviews like a tax: something to file quarterly, in the cheapest way possible, with no system behind it." },
  { type: "p", text: "I've spent the last eighteen months talking to marketing leaders at growth-stage SaaS companies about this. The mistakes are remarkably consistent. Here are the three I see most often." },
  { type: "h2", text: "Mistake 1: Treating reviews as a campaign, not a system" },
  { type: "p", text: "The classic move: someone notices the G2 page is thin, sends a mass email to active users asking for reviews, gets twelve back over two weeks, and considers the box checked. Six months later the page looks identical — the new reviews have been buried by competitors who kept going." },
  { type: "p", text: "Reviews behave like content: they decay. A platform that ranks reviews chronologically gives more weight to a fresh five-star than to a two-year-old five-star. A program that runs once a year produces a profile that looks neglected nine months out of twelve." },
  { type: "pull", text: "Reviews behave like content: they decay. A program that runs once a year produces a profile that looks neglected nine months out of twelve." },
  { type: "h2", text: "Mistake 2: Sending review requests without sentiment screening" },
  { type: "p", text: "This is the one I see do the most damage." },
  { type: "p", text: "When you blast a review request to everyone in your active customer list, you're rolling the dice on every single person you ask. Some of them are quietly unhappy and you don't know it. A review request landing in their inbox at the wrong moment is what tips them into posting publicly — and once it's there, it's there." },
  { type: "p", text: "A short feedback step before the public ask changes the math entirely. Customers who flag a problem reach your team, not a review platform. You hear from the quietly unhappy before they post; the team gets a chance to actually help; the customers who are ready go on to leave their public review with no friction." },
  { type: "h2", text: "Mistake 3: Asking for reviews without making them easier to write" },
  { type: "p", text: "Every marketer reading this has heard some version of: \"I keep meaning to leave you a review, I just haven't gotten around to it.\" That's not a willingness problem. That's a friction problem." },
  { type: "p", text: "Your customers are at work. They have eleven tabs open. You're asking them to log into a review platform, navigate to your product, write a few hundred words from a blank text box, and post. Three steps too many. The reviews that do come back are usually two words long and don't help anyone." },
  { type: "p", text: "The fix isn't a polished email template. The fix is removing the friction: one link that routes to the right platform, a guided flow, AI assistance for the blank-page problem. The customers who would have given up halfway through actually finish." },
  { type: "h2", text: "The short version" },
  { type: "p", text: "Most software companies fail at reviews because they treat reviews as a one-off marketing task instead of a continuous system. Build the system: sentiment screening so you only ask the right customers; a single link that routes them to the right platform; help with the blank page so they can actually say something useful. That's the whole playbook." },
  { type: "p", text: "If you do this for ninety days, your G2 page will look like a different product's page. The deals you're losing to better-reviewed competitors? You'll start winning some of them. That's worth taking seriously." }]

};

const DEFAULT_ARTICLE_BODY = [
{ type: "lead", text: "This article is part of an ongoing series we're publishing about reviews, social proof, and the unsexy mechanics behind both. New posts go out monthly." },
{ type: "p", text: "If you'd like the full piece in your inbox when it's published, drop your email at the bottom of the page. No spam, no roundup posts, no \"10 ways to\" lists. Just the things we're actually thinking about while we build Revly." },
{ type: "p", text: "In the meantime, the featured post above (\"Why most software companies fail at reviews\") covers the foundations — most of what we'll publish here builds on it." }];


function BlogArticle() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/blog\//, "");
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  usePageMeta(
    post ? `${post.title} — Revly Blog` : "Article — Revly Blog",
    post ? post.excerpt : "An article on the Revly Blog about reviews, social proof, and software companies."
  );
  useJsonLd(...(post ? [JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Person", "name": post.author },
    "publisher": { "@type": "Organization", "name": "Revly", "url": "https://revly.io" },
    "articleSection": post.category,
    "url": "https://revly.io/#/blog/" + post.slug,
    "mainEntityOfPage": "https://revly.io/#/blog/" + post.slug
  })] : []));
  if (!post) {
    return <>
      <Navbar />
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <h1 className="h2">We couldn't find that article.</h1>
          <p className="lead" style={{ marginTop: "1rem" }}>It may have moved, or never existed. Either way, head back to the blog index.</p>
          <Link to="/blog" className="btn btn-default" style={{ marginTop: "1.5rem" }}>← Back to blog</Link>
        </div>
      </main>
      <Footer />
    </>;
  }

  const body = ARTICLE_BODIES[slug] || DEFAULT_ARTICLE_BODY;
  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return <>
    <Navbar />
    <main>
      {/* Article header */}
      <article style={{ background: "hsl(var(--card))" }}>
        <div className="container-x" style={{ maxWidth: "760px", padding: "4rem 1.5rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", fontSize: ".88rem", color: "hsl(var(--foreground)/0.55)", marginBottom: "1.25rem" }}>
            <Link to="/blog" style={{ color: "hsl(var(--foreground)/0.55)" }}>← Blog</Link>
            <span style={{ color: "hsl(var(--foreground)/0.3)" }}>/</span>
            <span style={{ fontWeight: 600, color: "hsl(var(--primary))", textTransform: "uppercase", fontSize: ".72rem", letterSpacing: "0.12em" }}>{post.category}</span>
          </div>
          <h1 className="h1" style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.25rem)", marginBottom: "1.5rem" }}>{post.title}</h1>
          <p className="lead" style={{ fontSize: "1.2rem", color: "hsl(var(--foreground)/0.7)" }}>{post.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid hsl(var(--border))" }}>
            <AuthorAvatar name={post.author} size={44} />
            <div>
              <div style={{ fontWeight: 700, fontSize: ".98rem" }}>{post.author}</div>
              <div style={{ color: "hsl(var(--foreground)/0.55)", fontSize: ".85rem" }}>{post.role} · {post.date} · {post.readTime}</div>
            </div>
          </div>
        </div>

        {/* Editorial cover */}
        <div className="container-x" style={{ maxWidth: "1080px", paddingBottom: "3rem" }}>
          <EditorialHero category={post.category} accent="primary" />
        </div>

        {/* Body */}
        <div className="container-x" style={{ maxWidth: "720px", padding: "0 1.5rem 5rem" }}>
          <div className="article-body" style={{ fontFamily: "DM Sans", fontSize: "1.085rem", lineHeight: 1.75, color: "hsl(var(--foreground)/0.85)" }}>
            {body.map((b, i) => {
              if (b.type === "lead") {
                return <p key={i} style={{ fontSize: "1.225rem", lineHeight: 1.6, color: "hsl(var(--foreground))", fontWeight: 500, marginBottom: "1.5rem" }}>{b.text}</p>;
              }
              if (b.type === "h2") {
                return <h2 key={i} style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-0.014em", margin: "2.5rem 0 1rem" }}>{b.text}</h2>;
              }
              if (b.type === "pull") {
                return <blockquote key={i} style={{ borderLeft: "3px solid hsl(var(--primary))", padding: "0.85rem 0 0.85rem 1.5rem", margin: "2rem 0", fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: "1.35rem", lineHeight: 1.35, color: "hsl(var(--foreground))", letterSpacing: "-0.012em" }}>{b.text}</blockquote>;
              }
              return <p key={i} style={{ marginBottom: "1.25rem" }}>{b.text}</p>;
            })}
          </div>

          {/* Inline subscribe CTA */}
          <div className="card" style={{ padding: "2rem", marginTop: "3rem", display: "flex", flexDirection: "column", gap: ".5rem", background: "hsl(var(--accent))", border: "0" }}>
            <div className="chip chip-pink" style={{ alignSelf: "flex-start" }}>From Revly</div>
            <h3 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.45rem", marginTop: ".25rem" }}>Stop winging your review program.</h3>
            <p style={{ color: "hsl(var(--foreground)/0.7)", fontSize: ".98rem", lineHeight: 1.6 }}>If the playbook above resonates, Revly is what we built to make it work in practice. Sentiment screening, smart routing, AI-assisted drafting — all in one place.</p>
            <div style={{ marginTop: ".75rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              <Link to="/pricing" className="btn btn-default">See pricing →</Link>
              <Link to="/" className="btn btn-outline">How it works</Link>
            </div>
          </div>

          {/* Author bio block */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid hsl(var(--border))", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <AuthorAvatar name={post.author} size={56} />
            <div>
              <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.1rem" }}>{post.author}</div>
              <div style={{ color: "hsl(var(--foreground)/0.55)", fontSize: ".88rem", marginBottom: ".5rem" }}>{post.role}</div>
              <p style={{ color: "hsl(var(--foreground)/0.7)", fontSize: ".95rem", lineHeight: 1.6, margin: 0 }}>Writes about reviews, social proof, and the messy parts of B2B marketing nobody else wants to talk about. Currently building Revly.</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="section" style={{ background: "#f6f6f4" }}>
        <div className="container-x">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 className="h2" style={{ fontSize: "1.85rem" }}>Keep reading</h2>
            <Link to="/blog" style={{ color: "hsl(var(--primary))", fontWeight: 700, fontSize: ".95rem" }}>All articles →</Link>
          </div>
          <div className="grid-3">
            {related.map((p) => <ArticleCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
    <Footer />
  </>;
}

Object.assign(window, { Blog, BlogArticle });