// Revly — Slack app landing page (/slack).
//
// Written for the Slack Marketplace review as much as for customers. Slack's
// landing-page guidelines need four things on one public page: the install path
// (Revly's "Add to Slack" button lives behind the dashboard login, so the steps
// to reach it are spelled out), exactly what the app posts and what triggers it,
// the OAuth scopes and data handling, and a link to the privacy policy. Keep the
// facts here in step with src/lib/integrations/slack*.ts in the app repo.
import React from 'react';
import { Navbar, Footer, FAQ, CrossLinks } from './components.jsx';
import { Mock } from './decorative.jsx';
import { SlackLogo } from './usecase-hero.jsx';
import { SLACK_FAQ } from '../lib/faqs.js';

const APP_SETTINGS = 'https://app.revly.io/settings';

const RevlyIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="15" fill="#F0047F" opacity="0.1" />
    <circle cx="16" cy="16" r="10" fill="#F0047F" opacity="0.28" />
    <circle cx="16" cy="16" r="4.5" fill="#F0047F" />
  </svg>
);

function AddToSlack({ large }) {
  return (
    <a className={'btn btn-slack' + (large ? ' btn-lg' : '')} href={APP_SETTINGS}>
      <SlackLogo /> Add to Slack
    </a>
  );
}

// A single Revly notification, drawn the way Slack renders the real Block Kit
// payload. Sample review text lives inside a Mock so it never reaches the
// static HTML (see decorative.jsx).
function HeroMessage() {
  return (
    <Mock className="sl-msgcard" minHeight="19rem">
      <div className="sk-day"><span>Today</span></div>
      <div className="sk-msg">
        <div className="sk-av"><RevlyIcon /></div>
        <div>
          <div className="sk-meta"><b>Revly</b><span className="sk-app">App</span><time>11:47 AM</time></div>
          <div className="sk-body">
            <div className="sk-h">New review on G2</div>
            <div className="sk-s">★★★★★ by <b>Priya Nair</b><br /><b>Cut our campaign build time in half</b><br />"We moved off a clunky legacy ESP and Sendly's drag-and-drop editor is night and day. A campaign that used to take an afternoon now takes 20 minutes."</div>
            <div className="sk-btns"><span className="sk-btn pri">Respond in Revly</span><span className="sk-btn">View Review on G2</span></div>
            <div className="sk-ctx">Channel: <b>Sendly on G2</b> | <a>Open in Revly</a></div>
          </div>
        </div>
      </div>
    </Mock>
  );
}

const MESSAGE_TYPES = [
  {
    img: '/assets/slack/01-new-review.png',
    alt: 'A Revly message in Slack announcing a new five-star G2 review, with Respond in Revly and View Review on G2 buttons',
    when: 'After any sync that finds new reviews',
    title: 'New reviews',
    body: 'One to three new reviews arrive as full cards: the star rating, the review title, the reviewer\'s name and up to 400 characters of what they wrote. Each card has a Respond in Revly button and a link to the review on the platform.',
  },
  {
    img: '/assets/slack/02-needs-response.png',
    alt: 'A Revly message in Slack with two new Trustpilot reviews, one two-star and one four-star, and the team discussing who replies',
    when: 'Same trigger, when a review needs attention',
    title: 'Reviews that need a response',
    body: 'Low ratings arrive the same way, so the person who should reply sees them the moment Revly does. Respond in Revly opens the review in your dashboard with an AI-drafted reply ready to edit.',
  },
  {
    img: '/assets/slack/03-digest.png',
    alt: 'A Revly digest message in Slack summarising six new Shopify App Store reviews with the average rating and the best and lowest review',
    when: 'After a sync that finds four or more',
    title: 'Digest for busy days',
    body: 'When a sync finds four or more new reviews on one listing, Revly posts a single digest instead of flooding the channel: the count, the average rating, the best and the lowest review, and a View All Reviews button.',
  },
  {
    img: '/assets/slack/04-updated-removed.png',
    alt: 'Two Revly messages in Slack: a Capterra review updated from two stars to four, and two reviews removed from the Shopify App Store',
    when: 'After a sync that finds a change',
    title: 'Edited and removed reviews',
    body: 'If a reviewer changes their rating or rewrites their review, Revly posts the before and after. If reviews disappear from a listing, Revly says which ones and keeps the full text so you can appeal.',
  },
  {
    img: '/assets/slack/05-incentive-due.png',
    alt: 'A Revly message in Slack saying an incentive is due because a collected review went live on G2, with a Mark as sent in Revly button',
    when: 'When a collected review goes live',
    title: 'Incentive reminders',
    body: 'If you collect reviews through a Revly link with a reward attached, Revly tells you the moment a promised review is live, who to send the reward to, and links to mark it as sent.',
  },
];

const STEPS = [
  { t: 'Sign in to Revly', b: <>Go to <a href="https://app.revly.io/login">app.revly.io</a> and sign in, or <a href="https://app.revly.io/signup">create an account</a>. Slack notifications are included on the Pro plan and above; you can upgrade any time from <span className="path">Settings → Plan &amp; Billing</span>.</> },
  { t: 'Open Settings → Integrations', b: <>Choose <span className="path">Settings</span> in the left sidebar, scroll to <span className="path">Integrations</span>, and press <span className="path">Add to Slack</span> on the Slack Notifications card. Only workspace owners and admins see the button.</> },
  { t: 'Approve in Slack', b: <>Slack asks which workspace to add Revly to and shows the three permissions it needs (listed below). Press <span className="path">Allow</span>.</> },
  { t: 'Confirm and choose a channel', b: <>You are returned to Revly Settings with a <em>Slack connected!</em> confirmation. Pick the channel Revly should post to. Public channels are always listed; private channels appear once Revly has been invited to them.</> },
  { t: 'Invite Revly to the channel', b: <>Revly can only post to channels it is a member of. In Slack, open the channel you picked and run <code>/invite @Revly</code>. If you chose a private channel, do this first and press <span className="path">refresh the list</span> in Revly.</> },
  { t: 'Send a test', b: <>Press <span className="path">Send Test</span>. A <em>Revly is connected!</em> message appears in the channel within a few seconds. From here on, notifications arrive on their own.</> },
];

export function SlackApp() {
  return <>
    <Navbar />
    <main>
      <section className="sl-hero">
        <div className="container-x">
          <div className="sl-hero-grid">
            <div>
              <span className="eyebrow">Revly for Slack</span>
              <h1 className="h1" style={{ marginTop: '.9rem' }}>Every new review, in the channel where your team already works.</h1>
              <p className="lead" style={{ marginTop: '1.25rem', maxWidth: '54ch' }}>Revly watches your listings on G2, Capterra, Trustpilot, the Shopify App Store, WordPress.org, WooCommerce, Xero and QuickBooks. When a review appears, changes or disappears, Revly posts it to the Slack channel you choose, with the rating, the reviewer's words and a one-click path to respond.</p>
              <div className="sl-cta">
                <AddToSlack large />
                <a className="btn btn-outline btn-lg" href="#install">How to install</a>
              </div>
              <p className="sl-note">The Add to Slack button is inside the Revly dashboard (Settings → Integrations), so it needs a Revly account on the Pro plan or above. <a href="#install">Step-by-step instructions</a> are below.</p>
            </div>
            <HeroMessage />
          </div>
        </div>
      </section>

      <section className="section" id="overview">
        <div className="container-x">
          <div className="sl-section-head">
            <span className="eyebrow">What Revly does</span>
            <h2 className="h2" style={{ marginTop: '.75rem' }}>Review management for software companies, <span className="mag">delivered to Slack.</span></h2>
            <p className="lead">Revly is a review management platform. It collects reviews with one smart link, monitors every marketplace listing you have, and helps you respond. The Slack app is Revly's notification layer: it brings what Revly finds into Slack, so nobody has to check five marketplaces by hand and a two-star review never sits unseen for a week.</p>
          </div>
          <div className="sl-grid-3">
            <div className="sl-card">
              <span className="ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg></span>
              <h3>Revly monitors</h3>
              <p>Connect each listing once. Revly checks it on a schedule set by your plan and stores every review it finds, including edits and removals, in one dashboard.</p>
            </div>
            <div className="sl-card">
              <span className="ico"><SlackLogo /></span>
              <h3>Slack gets the news</h3>
              <p>Anything new goes to your chosen channel: rating, title, review text and reviewer name, plus buttons to respond in Revly or open the review on the platform.</p>
            </div>
            <div className="sl-card">
              <span className="ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></span>
              <h3>Your team responds</h3>
              <p>Respond in Revly opens the review with an AI-drafted reply in your voice, ready to edit and post on the platform, so the answer goes out the same morning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="messages" style={{ background: 'hsl(var(--card))', borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))' }}>
        <div className="container-x">
          <div className="sl-section-head">
            <span className="eyebrow">What Revly posts, and when</span>
            <h2 className="h2" style={{ marginTop: '.75rem' }}>Five kinds of message. <span className="mag">Nothing else.</span></h2>
            <p className="lead">Every message comes from a sync: Revly re-reads each connected listing on a schedule (every 6 hours on Pro, every 2 hours on Business and Agency) or when you press Sync Now, and posts what changed. Revly only ever posts. It does not read messages, answer mentions or slash commands, or send direct messages.</p>
          </div>
          <div className="sl-msgtypes">
            {MESSAGE_TYPES.map((m) =>
              <div className="sl-msgtype" key={m.title}>
                <div className="cap">
                  <div>
                    <span className="when">{m.when}</span>
                    <h3>{m.title}</h3>
                  </div>
                  <p>{m.body}</p>
                </div>
                <img src={m.img} alt={m.alt} width="1600" height="1000" loading="lazy" />
              </div>
            )}
            <div className="sl-msgtype no-img">
              <div className="cap">
                <div>
                  <span className="when">When you press Send Test</span>
                  <h3>A test message</h3>
                  <p style={{ marginTop: '.6rem' }}>Pressing Send Test in Revly Settings posts a short <em>Revly is connected!</em> message, so you can confirm the channel is right before the first real review lands.</p>
                </div>
                <div className="sl-settings">
                  <div className="crumb">Revly · Settings → Integrations</div>
                  <div className="t"><SlackLogo /> Slack Notifications</div>
                  <div className="d">Get notified in Slack when new reviews are detected across your monitored channels.</div>
                  <span className="b"><SlackLogo /> Add to Slack</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="install">
        <div className="container-x">
          <div className="sl-section-head">
            <span className="eyebrow">How to install</span>
            <h2 className="h2" style={{ marginTop: '.75rem' }}>Six steps, <span className="mag">about two minutes.</span></h2>
            <p className="lead">The Add to Slack button is inside the Revly dashboard rather than on this page, because the connection belongs to your Revly workspace and only one of its owners or admins can make it. Here is the whole path.</p>
          </div>
          <div className="sl-steps">
            {STEPS.map((s, i) =>
              <div className="sl-step" key={s.t}>
                <span className="n">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <AddToSlack large />
          </div>
        </div>
      </section>

      <section className="section" id="configure" style={{ background: 'hsl(var(--card))', borderTop: '1px solid hsl(var(--border))' }}>
        <div className="container-x">
          <div className="sl-section-head">
            <span className="eyebrow">Configure and manage</span>
            <h2 className="h2" style={{ marginTop: '.75rem' }}>Everything lives in <span className="mag">Settings → Integrations.</span></h2>
          </div>
          <div className="sl-kv">
            <div><h3>Change the channel</h3><p>Press Change Channel, pick another one, and invite Revly to it if it is private. Notifications switch over immediately.</p></div>
            <div><h3>Pause without disconnecting</h3><p>Pause Notifications stops delivery and keeps the connection. Enable Notifications turns it back on.</p></div>
            <div><h3>Disconnect</h3><p>Press Disconnect. Revly revokes its token with Slack and deletes the stored connection straight away. Removing the app from Slack's side works too.</p></div>
            <div><h3>Who can manage it</h3><p>Owners and admins of the Revly workspace. Members see a note asking them to contact an admin.</p></div>
            <div><h3>One channel per workspace</h3><p>Each Revly workspace connects to one Slack workspace and one channel. Agencies connect each client workspace separately from the company switcher.</p></div>
            <div><h3>What counts as new</h3><p>A review is announced when Revly first sees it and it was posted within the last 30 days. Older reviews picked up on a first sync or a historical sweep are stored quietly as backfill.</p></div>
            <div><h3>How often Revly checks</h3><p>Every 6 hours on Pro and every 2 hours on Business and Agency. Some platforms enforce a longer minimum (Capterra is checked every 72 hours). Sync Now in the dashboard runs a check immediately.</p></div>
            <div><h3>If messages stop</h3><p>Usually one of three things: Revly is no longer a member of the channel (re-invite it), the app was removed from Slack (reconnect from Settings), or the plan no longer includes Slack.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="privacy">
        <div className="container-x">
          <div className="sl-section-head">
            <span className="eyebrow">Permissions and your data</span>
            <h2 className="h2" style={{ marginTop: '.75rem' }}>Three permissions. <span className="mag">One direction.</span></h2>
            <p className="lead">Revly asks Slack for the minimum it needs to post to one channel and to let you pick that channel. Data only flows from Revly into Slack.</p>
          </div>
          <div className="sl-wrap" style={{ maxWidth: '860px', margin: '0 auto' }}>
            <table className="sl-scopes">
              <thead><tr><th>Permission</th><th>What Revly uses it for</th></tr></thead>
              <tbody>
                <tr><td><code>chat:write</code></td><td>Post review notifications to the channel you choose. This is the only thing Revly writes to Slack.</td></tr>
                <tr><td><code>channels:read</code></td><td>List your public channels so you can pick one in Settings.</td></tr>
                <tr><td><code>groups:read</code></td><td>List the private channels Revly has been invited to, for the same picker.</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ maxWidth: '860px', margin: '2.5rem auto 0' }}>
            <p style={{ color: 'hsl(var(--foreground)/.75)', lineHeight: 1.7 }}>When you connect, Revly stores your Slack workspace ID and name, the bot token Slack issues (encrypted at rest with AES-256-GCM), the ID and name of the channel you select, and which Revly user made the connection. Revly never reads messages, member profiles, files or anything else in your workspace. Disconnecting revokes the token with Slack and deletes the record immediately; deleting your Revly account does the same. Full details are in our <a href="/privacy" style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>Privacy Policy</a> and <a href="/terms" style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>Terms of Service</a>.</p>
            <p id="support" style={{ color: 'hsl(var(--foreground)/.75)', lineHeight: 1.7 }}>Questions or support: email <a href="mailto:hello@revly.io" style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>hello@revly.io</a>. We reply within one business day.</p>
          </div>
        </div>
      </section>

      <section className="section" id="pricing" style={{ background: 'hsl(var(--card))', borderTop: '1px solid hsl(var(--border))' }}>
        <div className="container-x">
          <div className="sl-section-head">
            <span className="eyebrow">Pricing</span>
            <h2 className="h2" style={{ marginTop: '.75rem' }}>Included with Pro and above. <span className="mag">No extra charge.</span></h2>
            <p className="lead">The Slack app costs nothing on its own. It is part of every paid Revly plan; the Free plan does not include Slack notifications.</p>
          </div>
          <div className="sl-plans">
            <div className="sl-plan"><div className="nm">Pro</div><div className="pr">$49<small>/mo</small></div><p>$41/mo billed annually. 5 channels, checks every 6 hours, Slack notifications, AI responses.</p></div>
            <div className="sl-plan"><div className="nm">Business</div><div className="pr">$99<small>/mo</small></div><p>$84/mo billed annually. 15 channels, checks every 2 hours, unlimited team members, webhooks and API.</p></div>
            <div className="sl-plan"><div className="nm">Agency</div><div className="pr">Custom</div><p>Ten or more managed clients, each with its own Slack connection, consolidated billing.</p></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a className="btn btn-outline" href="/pricing">Compare all plans</a>
          </div>
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
              <a className="btn btn-outline-light btn-lg" href="#install">Install steps</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
        { chip: 'Monitor', title: 'Monitor Multiple Review Platforms', body: 'All your reviews from every platform in one dashboard, so nothing is missed.', to: '/monitor-platforms' },
        { chip: 'Respond', title: 'Manage Review Responses', body: 'Surface every review that needs a reply and draft one in your voice, across every platform.', to: '/manage-review-responses' },
        { chip: 'Claude MCP', title: 'Query your review data with AI', body: 'Connect Revly to Claude or ChatGPT and ask questions about your review data in plain language.', to: '/claude-mcp' }]
      } />
    </main>
    <Footer />
  </>;
}
