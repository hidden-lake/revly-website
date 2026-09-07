// Revly blog — article figures.
//
// Every figure is HTML and CSS built from the design tokens, not an exported image:
// the numbers and rules stay in the crawled markup, they stay selectable, and they
// re-flow on a phone instead of becoming an unreadable PNG. Decorative geometry (the
// decay curve, connector stems) is aria-hidden and always has a text equivalent
// beside it.
//
// Nothing here is a product mockup. No sample review text, no invented reviewer names
// and no fabricated dashboard numbers, so none of it needs <Mock> and none of it can
// be quoted back by an answer engine as though a customer wrote it.
import React from 'react';
import { Inline } from './blog-inline.jsx';

// ---------------------------------------------------------------- shared bits
function Fig({ children, wide = true, className = '' }) {
  return <div className={`fig-card ${wide ? 'fig-wide' : ''} ${className}`}>{children}</div>;
}

// =============================================================================
// Post 1 — G2 acquired Capterra
// =============================================================================

// What the deal moved, and what it didn't. Buyer intent is the only changed row.
const CHANGE_ROWS = [
  { label: 'Profiles to maintain', before: '4', now: '4' },
  { label: 'Separate collection campaigns', before: '2', now: '2' },
  { label: 'Capterra review appears on GetApp and Software Advice', before: 'Yes', now: 'Yes' },
  { label: 'Capterra review appears on G2', before: 'No', now: 'No' },
  { label: 'Incentive rules', before: 'Different on each', now: 'Still different' },
  { label: 'Logins to respond to reviews', before: '4', now: '4' },
  { label: 'Buyer intent data', before: 'G2 only', now: 'All four sites', changed: true },
];

function ChangeTable() {
  return (
    <Fig>
      <div className="fig-scroll">
        <table className="fig-table">
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col">Before</th>
              <th scope="col">Now</th>
            </tr>
          </thead>
          <tbody>
            {CHANGE_ROWS.map((r) => (
              <tr key={r.label} className={r.changed ? 'changed' : ''}>
                <th scope="row" style={{ fontWeight: 500, textAlign: 'left' }}>{r.label}</th>
                <td className="val">{r.before}</td>
                <td className="val">
                  {r.now}
                  {r.changed && <span className="fig-flag">Changed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fig>
  );
}

// One ask, different reach. The two pools never meet.
function Syndication() {
  return (
    <Fig>
      <div className="fig-flow">
        <div className="fig-flow-pair">
          <div className="fig-branch">
            <div className="fig-source">One Capterra ask</div>
            <div className="fig-stem" aria-hidden="true" />
            <div className="fig-fan">
              <span className="fig-dest">Capterra</span>
              <span className="fig-dest">GetApp</span>
              <span className="fig-dest">Software Advice</span>
            </div>
            <div className="fig-count">Publishes on 3 sites</div>
          </div>
          <div className="fig-branch">
            <div className="fig-source">One G2 ask</div>
            <div className="fig-stem" aria-hidden="true" />
            <div className="fig-fan">
              <span className="fig-dest solo">G2</span>
            </div>
            <div className="fig-count">Publishes on 1 site</div>
          </div>
        </div>
        <p className="fig-divider-note">
          Nothing crosses the middle. A review collected on one side never appears on the other.
        </p>
      </div>
    </Fig>
  );
}

// Four properties, four portals, nothing joining them up.
const PROPERTIES = [
  { n: 'G2', s: 'Own vendor portal' },
  { n: 'Capterra', s: 'Own vendor portal' },
  { n: 'GetApp', s: 'Own vendor portal' },
  { n: 'Software Advice', s: 'Own vendor portal' },
];

function FourProperties() {
  return (
    <Fig>
      <div className="fig-flow">
        <div className="fig-tiles">
          {PROPERTIES.map((p) => (
            <div className="fig-tile" key={p.n}>
              <div className="n">{p.n}</div>
              <div className="s">{p.s}</div>
            </div>
          ))}
        </div>
        <div className="fig-blocked">
          <span className="x" aria-hidden="true">&#10005;</span>
          <span>No consolidated vendor view, and no API to post replies through</span>
        </div>
      </div>
    </Fig>
  );
}

// Three ways to mark up the same rating. Together they cancel out.
function MarkupConflict() {
  return (
    <Fig>
      <div className="fig-flow">
        <div className="fig-conv">
          <span className="fig-chip">G2 star rating badge</span>
          <span className="fig-chip">Product Review schema on your page</span>
          <span className="fig-chip">G2 Star Rating Widget</span>
        </div>
        <div className="fig-stem" aria-hidden="true" style={{ height: '28px', marginTop: '.9rem' }} />
        <div className="fig-serp">
          <div className="u">yoursite.com &rsaquo; product</div>
          <div className="t">Your product page</div>
          <div>
            <span className="stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="miss">No stars shown</span>
          </div>
        </div>
        <p className="fig-divider-note">Pick one method per page, then confirm it in Google's Rich Results Test.</p>
      </div>
    </Fig>
  );
}

// The quarter's actions. Copy is the post's own, numbered.
const QUARTER_STEPS = [
  'Keep both campaigns running. Nothing has broken and nothing needs rebuilding.',
  'Check your incentive settings are configured separately for each platform, because the $100 G2 cap and Capterra\'s "nominal value" are not the same instruction and one campaign design cannot satisfy both.',
  'Claim and tidy all four profiles if you have not already. Same screenshots, same category selections, same current pricing. They are four separate listings and buyers land on whichever one Google gives them.',
];

function NumberedSteps({ steps }) {
  return (
    <Fig>
      <ol className="fig-steps">
        {steps.map((s, i) => (
          <li key={i}>
            <span className="n" aria-hidden="true">{i + 1}</span>
            <p><Inline text={s} /></p>
          </li>
        ))}
      </ol>
    </Fig>
  );
}

function QuarterPlan() {
  return <NumberedSteps steps={QUARTER_STEPS} />;
}

// =============================================================================
// Post 2 — How many G2 reviews do you actually need?
// =============================================================================

const THRESHOLD_ROWS = [
  { want: 'To appear on a live Grid on a category page', need: 'The category needs 3 products with 10 or more reviews' },
  { want: 'Your product in a Grid Report', need: '10 reviews in that category', key: true },
  { want: 'The category to publish a Grid Report at all', need: '6 products with 10 or more reviews, and 150 reviews across the category' },
  { want: 'The Users Love Us badge', need: '20 reviews, 4.0 star average', key: true },
  { want: 'A badge from a Grid Report', need: 'A place in the Leader or High Performer quadrant' },
  { want: 'The Overall Review Sentiment panel on your profile', need: '10 responses to the relevant question' },
];

function Thresholds() {
  return (
    <Fig>
      <div className="fig-scroll">
        <table className="fig-table">
          <thead>
            <tr>
              <th scope="col">What you want</th>
              <th scope="col">What G2 requires</th>
            </tr>
          </thead>
          <tbody>
            {THRESHOLD_ROWS.map((r) => (
              <tr key={r.want} className={r.key ? 'changed' : ''}>
                <th scope="row" style={{ fontWeight: 500, textAlign: 'left' }}>{r.want}</th>
                <td style={r.key ? { fontWeight: 600, color: 'hsl(var(--primary))' } : undefined}>{r.need}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fig>
  );
}

// Same ten reviews, two arrangements, one result.
function CategoryBuckets() {
  const split = [
    { v: 4, k: 'Category A' },
    { v: 3, k: 'Category B' },
    { v: 3, k: 'Category C' },
  ];
  const scale = (v) => `${(v / 10) * 100}%`;
  return (
    <Fig>
      <div className="fig-buckets">
        <div className="fig-bucket-col">
          <div className="fig-title">Ten reviews, three categories</div>
          <div className="fig-bars">
            <div className="fig-threshold" aria-hidden="true"><span>10 needed</span></div>
            {split.map((b) => (
              <div className="fig-bar" key={b.k}>
                <span className="track"><span className="v">{b.v}</span><span className="col" style={{ height: scale(b.v) }} /></span>
                <span className="k">{b.k}</span>
              </div>
            ))}
          </div>
          <div className="fig-verdict no">Not on a Grid</div>
        </div>
        <div className="fig-bucket-col">
          <div className="fig-title">Ten reviews, one category</div>
          <div className="fig-bars">
            <div className="fig-threshold" aria-hidden="true"><span>10 needed</span></div>
            <div className="fig-bar hit">
              <span className="track"><span className="v">10</span><span className="col" style={{ height: scale(10) }} /></span>
              <span className="k">Category A</span>
            </div>
          </div>
          <div className="fig-verdict yes">On the Grid</div>
        </div>
      </div>
    </Fig>
  );
}

// One badge has a number you can plan for. The other is a ranking.
function BadgeContrast() {
  return (
    <Fig>
      <div className="fig-split">
        <div className="fig-col">
          <h4>Users Love Us</h4>
          <div className="fig-sub">A number you can plan for</div>
          <div className="fig-numline">
            <span className="fig-num lg" style={{ color: 'hsl(var(--primary))' }}>20</span>
            <span className="lbl">reviews, at a 4.0 star average or higher</span>
          </div>
          <ul className="fig-list">
            <li>The only badge you can download and share on a free profile.</li>
          </ul>
        </div>
        <div className="fig-col">
          <h4>Grid Report badge</h4>
          <div className="fig-sub">A ranking, not a threshold</div>
          <div className="fig-numline">
            <span className="fig-num lg" style={{ color: 'hsl(var(--foreground)/0.35)' }}>None</span>
            <span className="lbl">no review count earns one</span>
          </div>
          <ul className="fig-list dim">
            <li>Requires a place in the Leader or High Performer quadrant.</li>
            <li>Scored against everyone else in your category.</li>
            <li>Recalculated every reporting season.</li>
          </ul>
        </div>
      </div>
    </Fig>
  );
}

const DECAY_PHASES = [
  { age: '0 to 90 days', w: 'Near full weight, easing down' },
  { age: '90 days to 18 months', w: 'Still strong' },
  { age: '18 months to 3 years', w: 'Dropping faster' },
  { age: '3 years and beyond', w: 'About 3%, held there permanently' },
];

// The shape G2 describes. The curve is decorative; the phases below carry the facts.
function DecayCurve() {
  return (
    <Fig>
      <div className="fig-curve">
        <svg viewBox="0 0 640 190" role="presentation" aria-hidden="true">
          <defs>
            <linearGradient id="decayFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(330 97% 48%)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="hsl(330 97% 48%)" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          {/* baseline and phase dividers */}
          <line x1="40" y1="160" x2="620" y2="160" stroke="hsl(0 0% 90%)" strokeWidth="1" />
          {[110, 250, 430].map((x) => (
            <line key={x} x1={x} y1="24" x2={x} y2="160" stroke="hsl(0 0% 90%)" strokeWidth="1" strokeDasharray="3 4" />
          ))}
          {/* 3% floor */}
          <line x1="430" y1="156" x2="620" y2="156" stroke="hsl(330 97% 48%)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
          <path
            d="M40 24 C 70 30 90 33 110 38 C 160 48 205 55 250 63 C 312 80 372 124 430 156 L 620 156 L 620 160 L 40 160 Z"
            fill="url(#decayFill)"
          />
          <path
            d="M40 24 C 70 30 90 33 110 38 C 160 48 205 55 250 63 C 312 80 372 124 430 156 L 620 156"
            fill="none" stroke="hsl(330 97% 48%)" strokeWidth="2.5" strokeLinecap="round"
          />
          <circle cx="40" cy="24" r="4.5" fill="hsl(330 97% 48%)" />
          <text x="48" y="18" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700" fill="hsl(0 0% 45%)">Full weight</text>
          <text x="596" y="150" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700" fill="hsl(330 97% 48%)" textAnchor="end">3%</text>
          <text x="110" y="178" fontFamily="DM Sans, sans-serif" fontSize="11" fill="hsl(0 0% 55%)" textAnchor="middle">90 days</text>
          <text x="250" y="178" fontFamily="DM Sans, sans-serif" fontSize="11" fill="hsl(0 0% 55%)" textAnchor="middle">18 months</text>
          <text x="430" y="178" fontFamily="DM Sans, sans-serif" fontSize="11" fill="hsl(0 0% 55%)" textAnchor="middle">3 years</text>
        </svg>
      </div>
      <ul className="fig-phases" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {DECAY_PHASES.map((p) => (
          <li key={p.age}>
            <span className="age">{p.age}</span>
            <span className="w">{p.w}</span>
          </li>
        ))}
      </ul>
      <div className="fig-reset">
        Decay resets when a reviewer updates their review. An old review that a customer refreshes goes back to full weight.
      </div>
    </Fig>
  );
}

// Forty reviews either way. Only one arrangement holds a position.
function SteadyVsBurst() {
  const burst = [100, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  const steady = [30, 34, 30, 38, 30, 34, 38, 30, 34, 30, 38, 34];
  return (
    <Fig>
      <div className="fig-buckets">
        <div className="fig-bucket-col">
          <div className="fig-title">40 in one month</div>
          <div className="fig-mini-bars" aria-hidden="true">
            {burst.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
          </div>
          <div className="fig-axis"><span>Jan</span><span>Dec</span></div>
          <div className="fig-verdict no">They all age together, then fade together</div>
        </div>
        <div className="fig-bucket-col">
          <div className="fig-title">40 across a year</div>
          <div className="fig-mini-bars on" aria-hidden="true">
            {steady.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
          </div>
          <div className="fig-axis"><span>Jan</span><span>Dec</span></div>
          <div className="fig-verdict yes">Something is always fresh, so the position holds</div>
        </div>
      </div>
    </Fig>
  );
}

const START_STEPS = [
  'Count by category, not in total. Most teams are closer than they think in one category and further than they think in the others.',
  "Check whether your category is active enough to publish a Grid Report at all. If it isn't, aim at the live Grid and the Users Love Us badge instead, since both are reachable without waiting on five other companies to collect reviews.",
  'Ask without an incentive first, because those reviews score higher, and ask people who have used the product a while for the same reason. Go back to long-term customers and ask them to update reviews they left two years ago. Then spread the whole thing over months instead of running one push, because the curve punishes bursts.',
];

function StartHere() {
  return <NumberedSteps steps={START_STEPS} />;
}

// =============================================================================
// Post 3 — G2 alternatives
// =============================================================================

// The order to work in, and what each tier actually wins you.
const TIERS = [
  {
    n: '1',
    name: 'The marketplace that distributes your product',
    sub: 'Shopify App Store, WordPress.org, WooCommerce, Xero, QuickBooks and others',
    win: 'The buyer already inside the ecosystem, at the moment they decide whether to install.',
  },
  {
    n: '2',
    name: 'G2',
    sub: 'Almost every B2B SaaS category',
    win: 'The buyer still comparing you against three competitors, before they open any app store.',
  },
  {
    n: '3',
    name: 'Capterra, Gartner Peer Insights, TrustRadius',
    sub: 'Plus GetApp and Software Advice, which come with Capterra',
    win: 'SMB and long-tail categories, IT and security buyers, and mid-market deals that turn on detail.',
  },
];

function TierOrder() {
  return (
    <Fig>
      <ol className="fig-ranked">
        {TIERS.map((t) => (
          <li key={t.n}>
            <span className="n" aria-hidden="true">{t.n}</span>
            <div>
              <div className="nm">{t.name}</div>
              <div className="sub">{t.sub}</div>
              <div className="win">{t.win}</div>
            </div>
          </li>
        ))}
      </ol>
    </Fig>
  );
}

// Minimums a marketplace sets before your listing does anything for you.
const GATES = [
  {
    plat: 'Shopify App Store',
    num: '50',
    unit: 'net installs',
    rule: 'From active shops on paid plans, plus 5 reviews and an unpublished minimum recent rating, for Built for Shopify status.',
  },
  {
    plat: 'WooCommerce Marketplace',
    num: '3',
    unit: 'reviews',
    rule: 'Below three, a product\'s reviews stay hidden from the listing entirely.',
  },
  {
    plat: 'G2',
    num: '10',
    unit: 'reviews',
    rule: 'In a single category, before your product appears in that category\'s Grid Report at all.',
  },
];

function MarketplaceGates() {
  return (
    <Fig>
      <div className="fig-gates">
        {GATES.map((g) => (
          <div className="fig-gate" key={g.plat}>
            <div className="plat">{g.plat}</div>
            <div className="fig-numline">
              <span className="fig-num md" style={{ color: 'hsl(var(--primary))' }}>{g.num}</span>
              <span className="lbl">{g.unit}</span>
            </div>
            <p className="rule">{g.rule}</p>
          </div>
        ))}
      </div>
    </Fig>
  );
}

// G2's own Answer Economy numbers. Ink band, three figures, sourced in the caption.
const ANSWER_STATS = [
  { n: '51%', l: 'of B2B software buyers begin research in an AI chatbot rather than a search engine' },
  { n: '29%', l: 'did the same a year earlier' },
  { n: '45%', l: 'said citations from software review sites were the most confidence-inspiring signal in an AI answer' },
];

function AnswerEconomy() {
  return (
    <div className="fig-stats">
      <div className="fig-stats-grid">
        {ANSWER_STATS.map((s) => (
          <div key={s.n}>
            <div className="n">{s.n}</div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Who may review, how they are checked, what you may offer, and who they reach.
const PLATFORM_ROWS = [
  {
    plat: 'App marketplaces',
    note: 'Shopify, WordPress.org, WooCommerce, Xero, QuickBooks and others',
    who: 'Customers of that marketplace',
    ver: 'Install, purchase or connection, checked by the marketplace',
    inc: 'Mostly banned outright, with some marketplaces permitting prize draws',
    fit: 'Any product distributed through a marketplace',
  },
  {
    plat: 'G2',
    who: 'Verified reviewers',
    ver: 'Business email or LinkedIn',
    inc: 'Allowed, capped at $100 per review, labelled, must be disclosed to G2',
    fit: 'Almost every B2B SaaS category',
  },
  {
    plat: 'Capterra, GetApp, Software Advice',
    who: 'Identity-verified first-hand users',
    ver: 'Capterra’s own verification',
    inc: 'Allowed at "nominal value, as defined by applicable law". No dollar figure published. Capterra distributes the gift cards itself',
    fit: 'SMB buyers, and long-tail categories G2 covers thinly',
  },
  {
    plat: 'Gartner Peer Insights',
    who: '"Qualified IT professionals or technology decision makers", Gartner clients or not',
    ver: 'Gartner validation, takes several business days',
    inc: '$25 gift cards. Gartner funds your first 50 approved reviews. Vendors can self-fund up to $10,000 per market per year',
    fit: 'Enterprise and IT buyers, anything a CIO signs off on',
  },
  {
    plat: 'TrustRadius',
    who: 'Verified users with recent product experience',
    ver: 'LinkedIn or work email, then a human researcher reads each review',
    inc: 'Allowed, disclosed with the review, no published dollar figure',
    fit: 'Mid-market and enterprise, longer and more detailed reviews',
  },
];

function PlatformMatrix() {
  return (
    <Fig>
      <div className="fig-scroll">
        <table className="fig-table fig-table-wide">
          <colgroup>
            <col style={{ width: '22%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '18%' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Platform</th>
              <th scope="col">Who can review</th>
              <th scope="col">How they are verified</th>
              <th scope="col">Vendor incentives</th>
              <th scope="col">Best fit</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORM_ROWS.map((r) => (
              <tr key={r.plat}>
                <th scope="row" style={{ textAlign: 'left' }}>
                  <span className="fig-rowname">{r.plat}</span>
                  {r.note && <span className="fig-rownote">{r.note}</span>}
                </th>
                <td>{r.who}</td>
                <td>{r.ver}</td>
                <td>{r.inc}</td>
                <td>{r.fit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fig>
  );
}

// One review, three listings, and the one it still never reaches.
function CapterraSyndication() {
  return (
    <Fig>
      <div className="fig-flow">
        <div className="fig-branch">
          <div className="fig-source">One Capterra review</div>
          <div className="fig-stem" aria-hidden="true" />
          <div className="fig-fan">
            <span className="fig-dest">Capterra</span>
            <span className="fig-dest">Software Advice</span>
            <span className="fig-dest">GetApp</span>
            <span className="fig-dest out"><span className="x" aria-hidden="true">&#10005;</span>G2</span>
          </div>
          <div className="fig-count">Publishes on 3 sites, not 4</div>
        </div>
        <p className="fig-divider-note">
          Same owner since February 2026. The two review pools still never meet.
        </p>
      </div>
    </Fig>
  );
}

// Five rulebooks, one programme.
const CONFLICT_ROWS = [
  { rule: 'Incentive cap', vals: ['Mostly banned', '$100', '"Nominal value", unpublished', '$25, fixed', 'Unpublished'] },
  { rule: 'Who fulfils the incentive', vals: ['Not applicable', 'You', 'Capterra does', 'Gartner or you', 'You'] },
  {
    rule: 'Reviewer must be a verified customer',
    vals: ['Yes on most marketplaces', 'Yes', 'Yes', 'Yes, and an IT professional', 'Yes, human-checked'],
  },
  {
    rule: 'Where the review appears',
    vals: ['That marketplace only', 'G2 only', 'Capterra, Software Advice and GetApp', 'Peer Insights only', 'TrustRadius only'],
  },
];

const CONFLICT_COLS = ['App marketplaces', 'G2', 'Capterra family', 'Gartner Peer Insights', 'TrustRadius'];

function RulesConflict() {
  return (
    <Fig>
      <div className="fig-scroll">
        <table className="fig-table fig-table-wide">
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Rule</th>
              {CONFLICT_COLS.map((c) => <th scope="col" key={c}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {CONFLICT_ROWS.map((r) => (
              <tr key={r.rule} className={r.rule === 'Incentive cap' ? 'changed' : ''}>
                <th scope="row" style={{ textAlign: 'left' }}>
                  <span className="fig-rowname">{r.rule}</span>
                </th>
                {r.vals.map((v, i) => <td key={i}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fig>
  );
}

// Twenty reviews either way. Spread thin, they clear nothing.
function SpreadVsDepth() {
  const thin = ['App store', 'G2', 'Capterra', 'Gartner', 'TrustRadius'];
  const deep = ['App store', 'G2'];
  const scale = (v) => `${(v / 10) * 100}%`;
  return (
    <Fig>
      <div className="fig-buckets">
        <div className="fig-bucket-col">
          <div className="fig-title">4 reviews on 5 listings</div>
          <div className="fig-bars tight">
            <div className="fig-threshold" aria-hidden="true"><span>10 needed</span></div>
            {thin.map((k) => (
              <div className="fig-bar" key={k}>
                <span className="track"><span className="v">4</span><span className="col" style={{ height: scale(4) }} /></span>
                <span className="k">{k}</span>
              </div>
            ))}
          </div>
          <div className="fig-verdict no">Under every minimum, on every listing</div>
        </div>
        <div className="fig-bucket-col">
          <div className="fig-title">10 reviews on 2 listings</div>
          <div className="fig-bars tight">
            <div className="fig-threshold" aria-hidden="true"><span>10 needed</span></div>
            {deep.map((k) => (
              <div className="fig-bar hit" key={k}>
                <span className="track"><span className="v">10</span><span className="col" style={{ height: scale(10) }} /></span>
                <span className="k">{k}</span>
              </div>
            ))}
          </div>
          <div className="fig-verdict yes">Over the line on both</div>
        </div>
      </div>
    </Fig>
  );
}

// =============================================================================
// Post 4 — G2 badges explained
// =============================================================================

const BADGE_ROWS = [
  { badge: 'Leader', from: 'Quarterly Grid Report', how: 'Placing in the Leader quadrant of your category Grid', num: 'No' },
  { badge: 'High Performer', from: 'Quarterly Grid Report', how: 'Placing in the High Performer quadrant', num: 'No' },
  { badge: 'Regional Leader, Regional High Performer', from: 'Regional Grid Reports', how: 'Same quadrants, scored within a region', num: 'No' },
  {
    badge: 'Segment badges (Small Business, Mid-Market, Enterprise)',
    from: 'Segment Grid Reports',
    how: 'Same quadrants, scored within a company size band',
    num: 'No',
  },
  {
    badge: 'Momentum Leader',
    from: 'Momentum Grid',
    how: 'An adjusted model weighted toward year on year growth in employee count, review volume, social following and web presence',
    num: 'No',
  },
  {
    badge: 'Best Usability, Best Relationship, Best Results, Best Estimated ROI and the other index awards',
    from: 'Quarterly Index Reports',
    how: 'Ranking on specific review form questions, scored by a patent-pending algorithm',
    num: 'No',
  },
  { badge: 'Users Love Us', from: 'Additional Rewards', how: '20 reviews at a 4.0+ star average', num: 'Yes', key: true },
  {
    badge: 'AI Users Trust, Gold, Silver or Bronze',
    from: 'AI trust scoring',
    how: '25 responses to the AI trust questions, plus the AI Verified tag, then a percentile placement',
    num: 'Yes, partly',
    key: true,
  },
  { badge: 'Best Software Awards', from: 'Annual, published each February', how: 'Placement on an annual list', num: 'Disputed' },
];

function BadgeMatrix() {
  return (
    <Fig>
      <div className="fig-scroll">
        <table className="fig-table fig-table-wide">
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '37%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Badge</th>
              <th scope="col">Where it comes from</th>
              <th scope="col">How it is earned</th>
              <th scope="col">Published number?</th>
            </tr>
          </thead>
          <tbody>
            {BADGE_ROWS.map((r) => (
              <tr key={r.badge} className={r.key ? 'changed' : ''}>
                <th scope="row" style={{ textAlign: 'left' }}>
                  <span className="fig-rowname">{r.badge}</span>
                </th>
                <td>{r.from}</td>
                <td>{r.how}</td>
                <td style={r.key ? { fontWeight: 700, color: 'hsl(var(--primary))' } : { color: 'hsl(var(--foreground)/0.5)' }}>{r.num}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fig>
  );
}

// What $0 still earns you, and what the paid plan is actually selling.
function BadgeCost() {
  return (
    <Fig>
      <div className="fig-split">
        <div className="fig-col">
          <h4>Free profile</h4>
          <div className="fig-sub">What it still gets you</div>
          <div className="fig-numline">
            <span className="fig-num lg" style={{ color: 'hsl(var(--foreground)/0.35)' }}>$0</span>
          </div>
          <ul className="fig-list">
            <li>The Leader placement itself, earned on the same terms as anyone else.</li>
            <li>The Users Love Us badge, downloadable and displayable.</li>
            <li>Any badge earned before the Summer 2025 report on 24 June 2025.</li>
            <li>Full eligibility for quarterly Market Reports and annual awards.</li>
            <li>The placement referenced in text, with a backlink to G2.</li>
          </ul>
        </div>
        <div className="fig-col">
          <h4>Starter plan</h4>
          <div className="fig-sub">Rising to $6,000 a year from year two</div>
          <div className="fig-numline">
            <span className="fig-num lg" style={{ color: 'hsl(var(--primary))' }}>$2,999</span>
            <span className="lbl">a year</span>
          </div>
          <ul className="fig-list">
            <li>The badge graphic itself, for quarterly Market Reports and annual Best Software Awards.</li>
          </ul>
          <p style={{ marginTop: '.9rem' }}>Professional and Enterprise are quote-only.</p>
        </div>
      </div>
    </Fig>
  );
}

const AI_TIERS = [
  { n: 'Gold', s: '90th percentile or above' },
  { n: 'Silver', s: '80th to below the 90th' },
  { n: 'Bronze', s: '70th to below the 80th' },
];

// Two prerequisites, then a percentile placement.
function AiTrustTiers() {
  return (
    <Fig>
      <div className="fig-flow">
        <div className="fig-conv">
          <span className="fig-chip">The AI Verified tag</span>
          <span className="fig-chip">25 responses to the AI trust questions</span>
          <span className="fig-chip">6 eligible products in the category grouping</span>
        </div>
        <div className="fig-stem" aria-hidden="true" style={{ height: '28px', margin: '1rem auto' }} />
        <div className="fig-tiles" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {AI_TIERS.map((t) => (
            <div className="fig-tile" key={t.n}>
              <div className="n" style={{ color: 'hsl(var(--primary))' }}>{t.n}</div>
              <div className="s">{t.s}</div>
            </div>
          ))}
        </div>
      </div>
    </Fig>
  );
}

const RELEASE_ROWS = [
  { season: 'Winter 2027', date: '1 December 2026' },
  { season: 'Spring 2027', date: '16 March 2027' },
  { season: 'Summer 2027', date: '18 May 2027' },
  { season: 'Fall 2027', date: '24 August 2027' },
];

function ReleaseDates() {
  return (
    <Fig>
      <div className="fig-scroll">
        <table className="fig-table">
          <thead>
            <tr>
              <th scope="col">Season</th>
              <th scope="col">Final release</th>
            </tr>
          </thead>
          <tbody>
            {RELEASE_ROWS.map((r) => (
              <tr key={r.season}>
                <th scope="row" style={{ fontWeight: 500, textAlign: 'left' }}>{r.season}</th>
                <td className="val">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fig>
  );
}

const CHASE_STEPS = [
  'If you are early and not paying G2, aim at Users Love Us and ignore the rest. It is the only badge you can both earn and display for free, the requirement is public and fixed, and 20 reviews at a 4.0 average is a quarter of steady asking.',
  'If your product does anything with AI, get the AI Verified tag and go after an AI Users Trust badge next. The competition for it is thin right now in a way that will not last.',
  'Chase a Leader badge once you are genuinely competitive in your category and you have decided the $2,999 is worth it. Until then the free-profile text-and-backlink route gets you most of the credibility at none of the cost, and almost nobody realises G2 allows it.',
];

function ChaseOrder() {
  return <NumberedSteps steps={CHASE_STEPS} />;
}

// ---------------------------------------------------------------- registry
const GRAPHICS = {
  'change-table': ChangeTable,
  syndication: Syndication,
  'four-properties': FourProperties,
  'markup-conflict': MarkupConflict,
  'quarter-plan': QuarterPlan,
  thresholds: Thresholds,
  'category-buckets': CategoryBuckets,
  'badge-contrast': BadgeContrast,
  'decay-curve': DecayCurve,
  'steady-vs-burst': SteadyVsBurst,
  'start-here': StartHere,
  'tier-order': TierOrder,
  'marketplace-gates': MarketplaceGates,
  'answer-economy': AnswerEconomy,
  'platform-matrix': PlatformMatrix,
  'capterra-syndication': CapterraSyndication,
  'rules-conflict': RulesConflict,
  'spread-vs-depth': SpreadVsDepth,
  'badge-matrix': BadgeMatrix,
  'badge-cost': BadgeCost,
  'ai-trust-tiers': AiTrustTiers,
  'release-dates': ReleaseDates,
  'chase-order': ChaseOrder,
};

// An unknown name renders nothing rather than crashing the build, but it is a
// content bug: the block named a figure that does not exist.
export function Graphic({ name, caption }) {
  const Component = GRAPHICS[name];
  if (!Component) return null;
  return (
    <figure className="fig">
      <Component />
      {caption && <figcaption className="fig-cap"><Inline text={caption} /></figcaption>}
    </figure>
  );
}
