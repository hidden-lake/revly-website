// Renders the per-page social cards (1200x630 PNG, the Open Graph standard size)
// into public/assets/. A page opts in by passing `ogImage` to Base.astro and
// `image` to webPageSchema(), which sets og:image, twitter:image and
// primaryImageOfPage together. Pages that pass nothing fall back to the
// site-wide /og-image.png.
//
// The card is deliberately the page's own H1, in the same two-colour treatment
// the hero uses: amber for the thing being turned, magenta for what it turns
// into. Keeping the card and the page saying the same sentence is the point.
//
// Rendered at 2x and downsampled, so the type stays crisp. The PNGs are
// committed, so this only runs when a card changes.
//
// Usage:  node scripts/build-og-images.mjs
// Needs a headless Chrome: set CHROME_BIN, or install one with
// `npx playwright install chromium` (which the default lookup finds).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(REPO, 'public/assets');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'og-cards-'));

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

// One entry per card. `h` accepts <span class="kw"> (amber) and
// <span class="pay"> (magenta); everything else renders white.
const CARDS = [
  {
    file: 'og-collect-quality-reviews.png',
    chip: 'Collect',
    h: 'Turn <span class="kw">"great tool"</span> into a review that <span class="pay">converts.</span>',
    p: 'One link checks in with your customer, routes anyone who needs help to your team, and helps the rest write a review worth reading.',
  },
  {
    file: 'og-monitor-platforms.png',
    chip: 'Monitor',
    h: 'Turn <span class="kw">five open tabs</span> into <span class="pay">one dashboard.</span>',
    p: 'Every review from G2, Capterra and the app stores in one feed, and every new one posted straight to Slack.',
  },
];

const page = (card) => `<!doctype html><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{background:#131313;color:#fff;font-family:"Bricolage Grotesque",system-ui,sans-serif;
    display:flex;flex-direction:column;justify-content:space-between;
    padding:64px 72px 0;position:relative;overflow:hidden}
  /* Soft magenta bloom, bottom right, so the flat ink does not read as a slide. */
  .bloom{position:absolute;right:-160px;bottom:-220px;width:620px;height:620px;border-radius:50%;
    background:radial-gradient(circle,rgba(241,5,122,.30) 0%,rgba(241,5,122,.10) 45%,transparent 70%)}
  .top{display:flex;align-items:center;gap:14px;position:relative}
  .ring{width:38px;height:38px;flex:none}
  .word{font-size:31px;font-weight:800;letter-spacing:-.02em}
  .chip{margin-left:14px;font-family:"DM Sans",sans-serif;font-size:13px;font-weight:700;
    letter-spacing:.14em;text-transform:uppercase;color:#f1057a;
    border:1px solid rgba(241,5,122,.45);border-radius:999px;padding:7px 15px}
  main{position:relative;flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:26px}
  h1{font-size:76px;line-height:1.04;font-weight:800;letter-spacing:-.028em;max-width:19ch}
  h1 .pay{color:#f1057a}
  h1 .kw{color:#f4c243}
  p{margin-top:26px;font-family:"DM Sans",sans-serif;font-size:25px;line-height:1.45;
    color:rgba(255,255,255,.62);max-width:34ch}
  .rule{height:9px;background:#f1057a;margin:0 -72px}
</style>
<div class="bloom"></div>
<div class="top">
  <svg class="ring" viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="15" fill="#F0047F" opacity="0.16"/>
    <circle cx="16" cy="16" r="10" fill="#F0047F" opacity="0.34"/>
    <circle cx="16" cy="16" r="4.5" fill="#F0047F"/>
  </svg>
  <span class="word">revly</span>
  <span class="chip">${card.chip}</span>
</div>
<main><h1>${card.h}</h1><p>${card.p}</p></main>
<div class="rule"></div>`;

for (const card of CARDS) {
  const html = path.join(TMP, card.file.replace('.png', '.html'));
  const shot = path.join(TMP, card.file);
  fs.writeFileSync(html, page(card));
  execFileSync(CHROME, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--window-size=1200,630', '--force-device-scale-factor=2',
    '--virtual-time-budget=9000',
    `--screenshot=${shot}`, `file://${html}`,
  ], { stdio: 'ignore' });
  // Down to the declared 1200x630. The 2x render is what keeps the type clean.
  execFileSync('sips', ['-Z', '1200', shot, '--out', path.join(OUT, card.file)], { stdio: 'ignore' });
  console.log('wrote public/assets/' + card.file);
}
fs.rmSync(TMP, { recursive: true, force: true });
