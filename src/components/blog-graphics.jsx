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
                <span className="v">{b.v}</span>
                <span className="track"><span className="col" style={{ height: scale(b.v) }} /></span>
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
              <span className="v">10</span>
              <span className="track"><span className="col" style={{ height: scale(10) }} /></span>
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
