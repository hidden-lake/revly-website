// Revly — Slack app landing page (/slack).
//
// Built from the same sections as the other product pages (Monitor, Collect,
// Respond): kinetic hero, sticky scrolly, pinned gallery, before/after slider,
// FAQ, dark CTA, cross-links.
//
// Written for the Slack Marketplace review as much as for customers. Slack's
// landing-page guidelines need four things on one public page: the install path
// (Revly's "Add to Slack" button lives behind the dashboard login, so the steps
// to reach it are spelled out), exactly what the app posts and what triggers it,
// the OAuth scopes and data handling, and a link to the privacy policy. Keep the
// facts here in step with src/lib/integrations/slack*.ts in the app repo.
//
// Since Nov 2026 the scopes and data handling live in the FAQ ("Does Revly read my
// Slack messages?"), and the privacy, terms and contact links in the footer.
// #install and #messages are kept as anchors in case the Slack listing links them.
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar, Footer, FAQ, CrossLinks, BeforeAfterSlider } from './components.jsx';
import { Mock, useMounted } from './decorative.jsx';
import { FeatureHeroC } from './feature-hero.jsx';
import { FeatureMotion } from './feature-collect.jsx';
import { SlackLogo } from './usecase-hero.jsx';
import { SLACK_FAQ } from '../lib/faqs.js';
gsap.registerPlugin(ScrollTrigger);

const APP_SETTINGS = 'https://app.revly.io/settings';

// The Revly app avatar as Slack draws it beside a bot message. Inline rather
// than an <img> so it stays crisp at 36px and needs no extra request.
const RevlyIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="15" fill="#F0047F" opacity="0.1" />
    <circle cx="16" cy="16" r="10" fill="#F0047F" opacity="0.28" />
    <circle cx="16" cy="16" r="4.5" fill="#F0047F" />
  </svg>
);

// Points at the dashboard, not at Slack's OAuth URL: the install is per-Revly-
// workspace and only an owner or admin can make it, so the real button lives in
// Settings. Slack's guidelines allow this as long as the page says so and gives
// the steps, which the hero note and the install section do.
function AddToSlack({ large }) {
  return (
    <a className={'btn btn-slack' + (large ? ' btn-lg' : '')} href={APP_SETTINGS}>
      <SlackLogo /> Add to Slack
    </a>
  );
}

// ============ Hero ============
const HERO = {
  chip: 'REVLY FOR SLACK', chipClass: 'chip-pink',
  headline: <>See every new review{' '}<br /><span className="pay">in Slack, instantly.</span></>,
  lead: "Revly watches your listings on G2, Capterra, Trustpilot, the Shopify App Store, WordPress.org, WooCommerce, Xero and QuickBooks. When a review appears, changes or disappears, Revly posts it to the Slack channel you choose, with the rating, the reviewer's words and a one-click path to respond.",
  ctas: <a className="btn btn-yellow btn-lg" href="/pricing/">Get Slack notifications for reviews</a>,
};

// Before: five listings nobody has opened. After: one Revly message in Slack.
// Sample review text lives inside a Mock so it never reaches the static HTML.
const HERO_MORPH = (
  <Mock className="hc2-morph" minHeight="260px">
    <div className="frame" style={{ minHeight: '244px' }}>
      <div className="hd-state hd-weak">
        <span className="mlbl lbl-weak">Without Revly <span className="met">· checked when someone remembers</span></span>
        <div className="mess">
          <span className="tab t1"><b>G2</b> 3 unread <i className="badge">3</i></span>
          <span className="tab t2"><b>Capterra</b> 1 missed <i className="badge">1</i></span>
          <span className="tab t3"><b>Trustpilot</b> ? <i className="badge">!</i></span>
          <span className="tab t4"><b>Shopify</b> 2 new <i className="badge">2</i></span>
          <span className="tab t5"><b>Xero</b> ?</span>
        </div>
      </div>
      <div className="hd-state hd-strong">
        <span className="mlbl lbl-strong">With Revly <span className="met">· #reviews</span></span>
        <div className="sk-msg slk-hero-msg">
          <div className="sk-av"><RevlyIcon /></div>
          <div>
            <div className="sk-meta"><b>Revly</b><span className="sk-app">App</span><time>11:47 AM</time></div>
            <div className="sk-body">
              <div className="sk-h">New review on G2</div>
              <div className="sk-s">★★★★★ by <b>Priya Nair</b><br />"A campaign that used to take an afternoon now takes 20 minutes."</div>
              <div className="sk-btns"><span className="sk-btn pri">Respond in Revly</span><span className="sk-btn">View Review on G2</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Mock>
);

// ============ How to install (scrolly) ============
const STEPS = [
  { t: 'Sign in to Revly', b: <>Go to <a href="https://app.revly.io/login">app.revly.io</a> and sign in, or <a href="https://app.revly.io/signup">create an account</a>. Slack notifications are included on the Core plan and above; you can upgrade any time from <span className="path">Settings → Plan &amp; Billing</span>.</> },
  { t: 'Open Settings → Integrations', b: <>Choose <span className="path">Settings</span> in the left sidebar, scroll to <span className="path">Integrations</span>, and press <span className="path">Add to Slack</span> on the Slack Notifications card. Only workspace owners and admins see the button.</> },
  { t: 'Approve in Slack', b: <>Slack asks which workspace to add Revly to and shows the three permissions it needs (listed below). Press <span className="path">Allow</span>.</> },
  { t: 'Confirm and choose a channel', b: <>You are returned to Revly Settings with a <em>Slack connected!</em> confirmation. Pick the channel Revly should post to. Public channels are always listed; private channels appear once Revly has been invited to them.</> },
  { t: 'Invite Revly to the channel', b: <>Revly can only post to channels it is a member of. In Slack, open the channel you picked and run <code>/invite @Revly</code>. If you chose a private channel, do this first and press <span className="path">refresh the list</span> in Revly.</> },
  { t: 'Send a test', b: <>Press <span className="path">Send Test</span>. A <em>Revly is connected!</em> message appears in the channel within a few seconds. From here on, notifications arrive on their own.</> },
];

function SlackScrolly() {
  const rootRef = React.useRef(null);
  // The mock's panes only exist after mount, so the timeline waits for them.
  const mounted = useMounted();
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;
    const ctx = gsap.context(() => {
      const panes = [...root.querySelectorAll('[data-pane]')];
      const progs = [...root.querySelectorAll('[data-prog]')];
      const stepEls = [...root.querySelectorAll('.stepA')];
      let last = -1;
      function goToStep(i) {
        if (i === last) return; last = i;
        panes.forEach((p, pi) => {
          gsap.killTweensOf(p);
          gsap.to(p, { autoAlpha: pi === i ? 1 : 0, y: pi === i ? 0 : 8, duration: 0.4, ease: 'power2.out' });
        });
        progs.forEach((p, pi) => { p.style.width = pi <= i ? '100%' : '0'; });
      }
      stepEls.forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: 'top center', end: 'bottom center',
          onToggle: (self) => { if (self.isActive) { stepEls.forEach((s) => s.classList.toggle('active', s === el)); goToStep(i); } } });
      });
      goToStep(0); stepEls[0].classList.add('active');
    }, rootRef);
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const rt = setTimeout(refresh, 600);
    window.addEventListener('load', refresh);
    return () => { clearTimeout(rt); window.removeEventListener('load', refresh); ctx.revert(); };
  }, [mounted]);

  return (
    <section className="scrollyA" id="install" ref={rootRef}>
      <div className="container-x">
        <div className="head">
          <span className="eyebrow">Setup</span>
          <h2 className="h2">See reviews in Slack<br /><span className="mag">in minutes.</span></h2>
        </div>
        <div className="scrollyA-grid">
          <div className="mediaA">
            <Mock className="mock" minHeight="21rem">
              <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">Revly and Slack</span></div>
              <div className="slk-stage">
                <div className="slk-pane" data-pane>
                  <div className="slk-signin">
                    <div className="slk-logo"><RevlyIcon /></div>
                    <div className="slk-t">Sign in to Revly</div>
                    <div className="slk-input">you@company.com</div>
                    <div className="slk-input">••••••••••</div>
                    <span className="slk-btn">Sign in</span>
                    <div className="slk-plan">Core plan · Slack notifications included</div>
                  </div>
                </div>
                <div className="slk-pane" data-pane>
                  <div className="sl-settings">
                    <div className="crumb">Revly · Settings → Integrations</div>
                    <div className="t"><SlackLogo /> Slack Notifications</div>
                    <div className="d">Get notified in Slack when new reviews are detected across your monitored channels.</div>
                    <span className="b"><SlackLogo /> Add to Slack</span>
                  </div>
                </div>
                <div className="slk-pane" data-pane>
                  <div className="slk-oauth">
                    <div className="slk-t">Revly is requesting permission to access the <b>Acme</b> Slack workspace</div>
                    <ul>
                      <li><code>chat:write</code> Post messages to the channel you choose</li>
                      <li><code>channels:read</code> List public channels</li>
                      <li><code>groups:read</code> List private channels Revly is in</li>
                    </ul>
                    <div className="slk-actions"><span className="slk-ghost">Cancel</span><span className="slk-allow">Allow</span></div>
                  </div>
                </div>
                <div className="slk-pane" data-pane>
                  <div className="slk-channel">
                    <div className="slk-toast">✓ Slack connected!</div>
                    <div className="slk-lbl">Post notifications to</div>
                    <div className="slk-select">
                      <span># general</span>
                      <span className="on"># reviews</span>
                      <span># customer-success</span>
                    </div>
                  </div>
                </div>
                <div className="slk-pane" data-pane>
                  <div className="slk-invite">
                    <div className="slk-chan"># reviews</div>
                    <div className="slk-sys">Revly joined #reviews.</div>
                    <div className="slk-composer"><code>/invite @Revly</code></div>
                  </div>
                </div>
                <div className="slk-pane" data-pane>
                  <div className="slk-invite">
                    <div className="slk-chan"># reviews</div>
                    <div className="sk-msg slk-test-msg">
                      <div className="sk-av"><RevlyIcon /></div>
                      <div>
                        <div className="sk-meta"><b>Revly</b><span className="sk-app">App</span><time>now</time></div>
                        <div className="sk-s">Revly is connected! New reviews will be posted to this channel.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Mock>
            <div className="progress">{STEPS.map((s, i) => <span key={s.t}><b data-prog={i}></b></span>)}</div>
          </div>
          <div className="stepsA">
            {STEPS.map((s, i) =>
              <div className="stepA slk-step" key={s.t}><span className="n">{i + 1}</span><h3>{s.t}</h3><p>{s.b}</p></div>
            )}
            <div style={{ marginTop: '1rem' }}><AddToSlack large /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ What Revly posts (pinned gallery) ============
const MESSAGE_TYPES = [
  {
    img: '/assets/slack/01-new-review.png',
    alt: 'A Revly message in Slack announcing a new five-star G2 review, with Respond in Revly and View Review on G2 buttons',
    when: 'New reviews',
    title: 'See every new review first.',
    body: 'The rating, the reviewer and what they wrote land in Slack, with a button to reply.',
  },
  {
    img: '/assets/slack/02-needs-response.png',
    alt: 'A Revly message in Slack with two new Trustpilot reviews, one two-star and one four-star, and the team discussing who replies',
    when: 'Low ratings',
    title: 'Answer bad reviews while they are fresh.',
    body: 'One click opens the review in Revly with an AI-drafted reply ready to edit.',
  },
  {
    img: '/assets/slack/03-digest.png',
    alt: 'A Revly digest message in Slack summarising six new Shopify App Store reviews with the average rating and the best and lowest review',
    when: 'Digests',
    title: 'A busy day stays one message.',
    body: 'Four or more new reviews on one listing arrive as a single summary, not a flood.',
  },
  {
    img: '/assets/slack/04-updated-removed.png',
    alt: 'Two Revly messages in Slack: a Capterra review updated from two stars to four, and two reviews removed from the Shopify App Store',
    when: 'Changes',
    title: 'Know when a review changes or disappears.',
    body: 'See the before and after of every edit, and keep the text of removed reviews so you can appeal.',
  },
  {
    img: '/assets/slack/05-incentive-due.png',
    alt: 'A Revly message in Slack saying an incentive is due because a collected review went live on G2, with a Mark as sent in Revly button',
    when: 'Rewards',
    title: 'Never forget a promised reward.',
    body: 'Revly tells you when a collected review goes live and who to send the reward to.',
  },
];

function SlackGallery() {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      const track = root.querySelector('[data-track]');
      const rail = root.querySelector('[data-rail]');
      const panels = [...root.querySelectorAll('.panelC')];
      if (window.matchMedia('(min-width: 800px)').matches) {
        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => { if (rail) { const pct = (Math.min(1, Math.max(0, self.progress)) * 100).toFixed(1); rail.style.background = 'linear-gradient(to right, hsl(var(--primary)) ' + pct + '%, hsl(var(--foreground)/0.14) ' + pct + '%)'; } } }
        });
        panels.forEach((pan) => {
          const num = pan.querySelector('.num'); if (!num) return;
          gsap.fromTo(num, { xPercent: 12 }, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: pan, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        });
      } else {
        root.style.height = 'auto'; root.style.display = 'block';
        track.style.flexDirection = 'column'; track.style.padding = '4rem 1.5rem';
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="galC slk-gal" id="messages" ref={rootRef}>
      <div className="galC-rail" data-rail></div>
      <div className="galC-track" data-track>
        <article className="panelC lead-panel">
          <div>
            <h2>Know about every review<br /><span style={{ color: 'hsl(var(--primary))' }}>before your buyers do.</span></h2>
            <p className="slk-lead">Revly posts to one channel and never reads your messages.</p>
            <div className="hint">What you get
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </article>
        {MESSAGE_TYPES.map((m, i) =>
          <article className="panelC" key={m.title}>
            <div>
              <div className="num">{String(i + 1).padStart(2, '0')}</div>
              <div className="lbl">{m.when}</div>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </div>
            <a className="slk-shot-link" href={m.img} target="_blank" rel="noopener" aria-label={'Open full size: ' + m.title}>
              <img className="slk-shot" src={m.img} alt={m.alt} width="1600" height="1000" loading="lazy" decoding="async" />
            </a>
          </article>
        )}
        <article className="panelC">
          <div>
            <div className="num">06</div>
            <div className="lbl">Test</div>
            <h3>Know it works before the first review.</h3>
            <p>Press Send Test and a <em>Revly is connected!</em> message confirms the channel.</p>
          </div>
          <div className="sl-settings">
            <div className="crumb">Revly · Settings → Integrations</div>
            <div className="t"><SlackLogo /> Slack Notifications</div>
            <div className="d">Get notified in Slack when new reviews are detected across your monitored channels.</div>
            <span className="b"><SlackLogo /> Add to Slack</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export function SlackApp() {
  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <FeatureHeroC id="overview" config={HERO} morph={HERO_MORPH} />

      <SlackScrolly />

      <SlackGallery />

      <section className="section" style={{ background: 'hsl(var(--primary-foreground))' }}>
        <div className="container-x">
          <h2 className="h2" style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '780px', marginLeft: 'auto', marginRight: 'auto' }}>Before and after <span className="text-primary">Revly in Slack.</span></h2>
          <BeforeAfterSlider rows={[
            { without: 'Someone checks five marketplaces, when they remember', with: 'Every new review posts to Slack' },
            { without: 'A two-star review sits unseen for a week', with: 'Your team sees new reviews instantly' },
            { without: 'A reviewer quietly changes their rating', with: 'Slack notifications for review updates' },
            { without: 'Reviews disappear from a listing without a trace', with: 'Revly tells you when a review is deleted' }]
          } />
        </div>
      </section>

      <FAQ items={SLACK_FAQ} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Stop checking five marketplaces.<br /><span style={{ color: '#f1057a' }}>Let the reviews come to you.</span></h2>
            <p className="lead" style={{ color: 'rgba(255,255,255,0.75)', margin: '1rem auto 0', maxWidth: '46ch' }}>Connect Revly to Slack once. Every new review, edit and removal shows up where your team will actually see it.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <a className="btn btn-default btn-lg" href="https://app.revly.io/signup">Start for free</a>
              <a className="btn btn-yellow btn-lg" href="#install">See the install steps</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
        { chip: 'Monitor', title: 'Monitor multiple review platforms', body: 'Every review from every platform in one dashboard, with Slack alerts for new reviews.', to: '/monitor-platforms/' },
        { chip: 'Respond', title: 'Manage review responses', body: 'Revly flags what needs a reply and drafts one in your voice.', to: '/manage-review-responses/' },
        { chip: 'Claude connector', title: 'Query your review data with AI', body: 'Connect Revly to Claude or ChatGPT and ask questions about your review data in plain language.', to: '/claude-mcp/' }]
      } />
    </main>
    <Footer />
  </>;
}
