// Renders the Slack Marketplace listing images (1600x1000 PNG, Slack's required
// 8:5 ratio) into public/assets/slack/, where both the /slack landing page and
// the Marketplace listing use them.
//
// The mocks reproduce the Block Kit payloads Revly actually posts — see
// src/lib/integrations/slack.ts in the app repo (hidden-lake/revly) for the
// builders and slack-notify.ts for what triggers each one. They share
// public/slack.css with the landing page's own hero mock, so a styling change
// lands in both places. If the Block Kit builders change, update the mocks
// below and re-run. The PNGs are committed, so this only runs on a change.
//
// Usage:  node scripts/build-slack-images.mjs
// Needs a headless Chrome: set CHROME_BIN, or install one with
// `npx playwright install chromium` (which the default lookup finds).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(REPO, 'public/assets/slack');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'slack-shots-'));
const CSS = `file://${path.join(REPO, 'public/slack.css')}`;

// Prefer an explicit CHROME_BIN, then the newest Playwright browser in the
// user's cache, then a system Chrome. Peter works across two Macs, so nothing
// here may assume a fixed absolute path.
function findChrome() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  const roots = [
    path.join(os.homedir(), 'Library/Caches/ms-playwright'), // macOS
    path.join(os.homedir(), '.cache/ms-playwright'),         // Linux
  ];
  const rels = [
    'chrome-headless-shell-mac-arm64/chrome-headless-shell',
    'chrome-headless-shell-mac-x64/chrome-headless-shell',
    'chrome-headless-shell-linux64/chrome-headless-shell',
    'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    'chrome-linux/chrome',
  ];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    const dirs = fs.readdirSync(root)
      .filter((d) => d.startsWith('chromium_headless_shell-') || d.startsWith('chromium-'))
      .sort().reverse();
    for (const dir of dirs) {
      for (const rel of rels) {
        const p = path.join(root, dir, rel);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  const system = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(system)) return system;
  throw new Error('No headless Chrome found. Set CHROME_BIN, or run: npx playwright install chromium');
}
const CHROME = findChrome();

const ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#F0047F" opacity="0.1"/><circle cx="16" cy="16" r="10" fill="#F0047F" opacity="0.28"/><circle cx="16" cy="16" r="4.5" fill="#F0047F"/></svg>`;

const app = (time, body) => `
<div class="sk-msg">
  <div class="sk-av">${ICON}</div>
  <div>
    <div class="sk-meta"><b>Revly</b><span class="sk-app">App</span><time>${time}</time></div>
    <div class="sk-body">${body}</div>
  </div>
</div>`;

const human = (initial, name, time, text, cls = '') => `
<div class="sk-msg">
  <div class="sk-av human ${cls}">${initial}</div>
  <div>
    <div class="sk-meta"><b>${name}</b><time>${time}</time></div>
    <div class="sk-body"><p>${text}</p></div>
  </div>
</div>`;

const btns = (...b) => `<div class="sk-btns">${b.map(([t, pri]) => `<span class="sk-btn${pri ? ' pri' : ''}">${t}</span>`).join('')}</div>`;
const ctx = (channel) => `<div class="sk-ctx">Channel: <b>${channel}</b> | <a>Open in Revly</a></div>`;
const S5 = '★★★★★', S4 = '★★★★☆', S3 = '★★★☆☆', S2 = '★★☆☆☆', S1 = '★☆☆☆☆';

function frame({ channel, messages, unreadReviews = 0 }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${CSS}">
<style>html,body{margin:0;background:#fff}</style></head><body>
<div class="sk-frame">
  <div class="sk-top"><div class="sk-dots"><i></i><i></i><i></i></div><div class="sk-search">🔍&nbsp; Search Sendly</div></div>
  <div class="sk-rail">
    <div class="sk-ws">S</div>
    <div class="sk-ri on"><b>🏠</b>Home</div>
    <div class="sk-ri"><b>💬</b>DMs</div>
    <div class="sk-ri"><b>🔔</b>Activity</div>
    <div class="sk-ri"><b>⋯</b>More</div>
  </div>
  <div class="sk-side">
    <div class="sk-wsname">Sendly ▾</div>
    <div class="sk-grp">Channels</div>
    <div class="sk-ch"># general</div>
    <div class="sk-ch"># marketing</div>
    <div class="sk-ch"># product</div>
    <div class="sk-ch${channel === 'reviews' ? ' on' : ''}"># reviews${unreadReviews ? `<span class="sk-badge">${unreadReviews}</span>` : ''}</div>
    <div class="sk-ch${channel === 'support' ? ' on' : ''}"># support</div>
    <div class="sk-ch"># wins</div>
    <div class="sk-grp">Direct messages</div>
    <div class="sk-ch"><span class="sk-dm">M</span> Maya Goldberg</div>
    <div class="sk-ch"><span class="sk-dm">D</span> Daniel Okonkwo</div>
    <div class="sk-grp">Apps</div>
    <div class="sk-ch"><span class="sk-appdot">${ICON}</span> Revly</div>
  </div>
  <div class="sk-main">
    <div class="sk-chanhead"><b># ${channel}</b><span>👥 14 members</span><span>Every new review, in one place</span></div>
    <div class="sk-msgs">
      <div class="sk-day"><span>Today</span></div>
      ${messages.join('\n')}
    </div>
    <div class="sk-composer">Message #${channel}</div>
  </div>
</div></body></html>`;
}

const shots = [
  {
    name: '01-new-review',
    channel: 'reviews',
    unreadReviews: 0,
    messages: [
      human('D', 'Daniel Okonkwo', '8:44 AM', 'Reminder: this is the channel for review alerts now. #wins is still for shipping stuff.', 'b'),
      human('M', 'Maya Goldberg', '9:01 AM', 'Connecting Revly to this channel so every new review lands here automatically 👇'),
      app('9:02 AM', `<div class="sk-s">✅ <b>Revly is connected!</b><br>You'll receive notifications here when new reviews are detected.</div>`),
      app('10:20 AM', `
        <div class="sk-h">New review on Capterra</div>
        <div class="sk-s">${S4} by <b>Hannah Whitfield</b><br><b>Great value, a few rough edges</b><br>"Does 90% of what our old enterprise tool did for a fraction of the cost. Segment builder could use saved filters, and the mobile preview is occasionally off."</div>
        ${btns(['Respond in Revly', true], ['View Review on Capterra'])}
        ${ctx('Sendly on Capterra')}`),
      app('11:47 AM', `
        <div class="sk-h">New review on G2</div>
        <div class="sk-s">${S5} by <b>Priya Nair</b><br><b>Cut our campaign build time in half</b><br>"We moved off a clunky legacy ESP and Sendly's drag-and-drop editor is night and day. A campaign that used to take an afternoon now takes 20 minutes, and the templates look good out of the box."</div>
        ${btns(['Respond in Revly', true], ['View Review on G2'])}
        ${ctx('Sendly on G2')}
        <div class="sk-react"><span class="me">🎉 3</span><span>🙌 2</span></div>`),
      human('M', 'Maya Goldberg', '11:52 AM', 'Third five-star this week. Sharing this one in #wins 🎉'),
    ],
  },
  {
    name: '02-needs-response',
    channel: 'support',
    unreadReviews: 2,
    messages: [
      human('M', 'Maya Goldberg', '7:58 AM', 'Revly posts anything under 3 stars in here so it gets picked up the same morning.'),
      app('8:02 AM', `
        <div class="sk-h">New review on Capterra</div>
        <div class="sk-s">${S3} by <b>Nina Kovac</b><br><b>Works, but the learning curve is real</b><br>"Powerful once you understand segments and flows, but the first two weeks were confusing. More guided setup would help."</div>
        ${btns(['Respond in Revly', true], ['View Review on Capterra'])}
        ${ctx('Sendly on Capterra')}`),
      app('8:15 AM', `
        <div class="sk-h">2 new reviews on Trustpilot</div>
        <div class="sk-s">${S2} by <b>Tom Brennan</b><br><b>Support took days to reply</b><br>"The product is fine but I waited four days for an answer on a billing question. For the price I expected faster help. Would bump this up if support improves."</div>
        ${btns(['Respond in Revly', true], ['View Review on Trustpilot'])}
        <div class="sk-div"></div>
        <div class="sk-s">${S4} by <b>Grace Mwangi</b><br><b>Solid automation, editor could be faster</b><br>"The flow builder is genuinely good and the Shopify sync has been reliable. The email editor lags a little on long campaigns, otherwise very happy."</div>
        ${btns(['Respond in Revly', true], ['View Review on Trustpilot'])}
        ${ctx('Sendly on Trustpilot')}`),
      human('D', 'Daniel Okonkwo', '8:21 AM', 'I\'ll take Tom\'s. Drafting a reply in Revly now and checking the ticket history 👀', 'b'),
      human('M', 'Maya Goldberg', '8:23 AM', 'Thanks! Flagging the billing SLA in #product too.'),
    ],
  },
  {
    name: '03-digest',
    channel: 'reviews',
    unreadReviews: 0,
    messages: [
      app('5:12 AM', `
        <div class="sk-h">New review on Xero Marketplace</div>
        <div class="sk-s">${S5} by <b>Oliver Bennett</b><br><b>Rock solid at scale</b><br>"We send around 400k emails a month and haven't had a single deliverability or uptime issue in over a year. It just runs."</div>
        ${btns(['Respond in Revly', true], ['View Review on Xero Marketplace'])}
        ${ctx('Sendly for Xero')}`),
      app('6:30 AM', `
        <div class="sk-h">6 new reviews synced</div>
        <div class="sk-fields"><div><b>Channel:</b><br>Sendly — Shopify App</div><div><b>Platform:</b><br>Shopify App Store</div></div>
        <div class="sk-fields"><div><b>New Reviews:</b><br>6</div><div><b>Avg Rating:</b><br>${S4} (4.3)</div></div>
        <div class="sk-s"><b>Best:</b> ${S5} "Deep Shopify sync is the killer feature. Orders, customers, and products sync automatically, so…" — Ethan Park<br><b>Lowest:</b> ${S3} "Good once it's set up, but the onboarding checklist skipped the step where you map…" — Nina Kovac</div>
        ${btns(['View All Reviews', true])}`),
      human('M', 'Maya Goldberg', '9:04 AM', 'Six in one night after the app store feature 🚀 Reading through them now.'),
      app('9:40 AM', `
        <div class="sk-h">New review on WordPress.org</div>
        <div class="sk-s">${S5} by <b>Lucas Fontaine</b><br><b>Popups + email in one tool</b><br>"The signup forms and popups feed straight into automations, so new subscribers get a welcome series instantly. List growth is up noticeably."</div>
        ${btns(['Respond in Revly', true], ['View Review on WordPress.org'])}
        ${ctx('Sendly for WordPress')}`),
    ],
  },
  {
    name: '04-updated-removed',
    channel: 'reviews',
    unreadReviews: 0,
    messages: [
      human('M', 'Maya Goldberg', '6:52 AM', 'Tom left us 2 stars on Capterra last week over the billing delay. Daniel replied on Tuesday.'),
      app('7:10 AM', `
        <div class="sk-h">A review was updated on Capterra</div>
        <div class="sk-s">${S4} by <b>Tom Brennan</b><br>⬆️ <b>Rating:</b> ${S2} (2) → ${S4} (4)<br><b>Rewritten:</b> review text<br><b>Support turned it around</b><br>"Updating my review: the team reached out within a day of my original post, fixed the billing issue and explained the change. That's the response I was hoping for."</div>
        ${btns(['Respond in Revly', true], ['View Review on Capterra'])}
        ${ctx('Sendly on Capterra')}
        <div class="sk-react"><span class="me">💪 4</span></div>`),
      human('D', 'Daniel Okonkwo', '7:14 AM', 'From 2 to 4 stars after one reply. Worth every minute.', 'b'),
      app('7:31 AM', `
        <div class="sk-h">2 reviews were removed from Shopify App Store</div>
        <div class="sk-s"><b>Sendly — Shopify App</b>: 2 reviews previously live on Shopify App Store no longer appear in the listing. Revly has preserved the full text — useful if you want to appeal the removal.</div>
        <div class="sk-s">${S5} <b>Isabella Conti</b> — "Onboarding was genuinely painless. Imported 60k contacts, connected our store, and had…"<br>${S4} <b>Henrik Solberg</b> — "Reporting dashboards are gorgeous. Clean, fast, and exactly the metrics I care about."</div>
        ${btns(['View Removed Reviews', true])}`),
    ],
  },
  {
    name: '05-incentive-due',
    channel: 'reviews',
    unreadReviews: 0,
    messages: [
      human('M', 'Maya Goldberg', '1:40 PM', 'Review request campaign went out to 40 happy customers on Monday. Watching for these to land.'),
      app('1:58 PM', `
        <div class="sk-h">New review on Trustpilot</div>
        <div class="sk-s">${S5} by <b>Raj Patel</b><br><b>Email and SMS in one place, finally</b><br>"Running both channels off shared segments is exactly what we needed. The unified analytics make it obvious which one is actually driving conversions."</div>
        ${btns(['Respond in Revly', true], ['View Review on Trustpilot'])}
        ${ctx('Sendly on Trustpilot')}`),
      app('2:05 PM', `
        <div class="sk-h">New review on G2</div>
        <div class="sk-s">${S5} by <b>Camila Duarte</b><br><b>Win-back flow paid for the whole year</b><br>"A single lapsed-customer automation re-engaged enough dormant buyers to cover our annual cost in the first quarter. Incredible ROI."</div>
        ${btns(['Respond in Revly', true], ['View Review on G2'])}
        ${ctx('Sendly on G2')}`),
      app('2:05 PM', `
        <div class="sk-s">🎁 <b>Incentive due</b> — a collected review just went live</div>
        <div class="sk-s"><b>Camila Duarte</b>'s ${S5} review is live on <b>G2</b>.<br>Promised: <b>$25 Amazon Gift Card</b> → send to <code>camila@example.com</code> <a>View review</a></div>
        ${btns(['Mark as sent in Revly'])}`),
      human('M', 'Maya Goldberg', '2:12 PM', 'Gift card sent and marked in Revly ✅ That was from last week\'s review request campaign.'),
    ],
  },
];

fs.mkdirSync(OUT, { recursive: true });
console.log(`Chrome:  ${CHROME}`);
for (const s of shots) {
  // The HTML is scratch — only the PNG is committed.
  const html = path.join(TMP, `${s.name}.html`);
  const png = path.join(OUT, `${s.name}.png`);
  fs.writeFileSync(html, frame(s));
  execFileSync(CHROME, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--no-sandbox',
    '--window-size=1600,1000', '--force-device-scale-factor=1',
    // Google Fonts has to load before the shot, or the mock renders in a
    // fallback face and the layout shifts.
    '--virtual-time-budget=8000', `--screenshot=${png}`, `file://${html}`,
  ], { stdio: 'pipe' });
  const kb = Math.round(fs.statSync(png).size / 1024);
  // Slack rejects anything over 2MB; these land around 160KB.
  console.log(`${s.name}.png  ${kb} KB${kb > 2048 ? '  ⚠️ over Slack 2MB limit' : ''}`);
}
fs.rmSync(TMP, { recursive: true, force: true });
