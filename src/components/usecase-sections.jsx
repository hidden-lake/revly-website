// Revly — Use-case signature sections: console scrolly (SaaS), client gallery (Agencies), capability index (shared)
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './components.jsx';
gsap.registerPlugin(ScrollTrigger);

// ============ SaaS — "One console" pinned scrollytelling ============
export function UCConsoleScrolly() {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      const mock = root.querySelector('#ucMock');
      const chips = [...mock.querySelectorAll('[data-chip]')];
      const feed = mock.querySelector('[data-feed]');
      const rows = [...mock.querySelectorAll('.mon-row')];
      const reply = mock.querySelector('[data-reply]');
      const search = mock.querySelector('[data-search]');
      const progs = [...root.querySelectorAll('[data-prog]')];
      let lastStep = -1;

      function reveal(el, show) {
        gsap.killTweensOf(el);
        const start = el.getBoundingClientRect().height;
        el.style.height = 'auto';
        const target = show ? el.offsetHeight : 0;
        el.style.height = start + 'px';
        gsap.to(el, { height: target, opacity: show ? 1 : 0, duration: 0.5, ease: 'power2.inOut', onComplete() {if (show) el.style.height = 'auto';} });
      }
      function goToStep(i) {
        if (i === lastStep) return;lastStep = i;
        chips.forEach((c, ci) => {
          const on = i >= 0 && ci <= (i === 0 ? 1 : 4);
          if (c.classList.contains('on') !== on) {c.classList.toggle('on', on);if (on) gsap.fromTo(c, { scale: 0.6 }, { scale: 1, duration: 0.35, ease: 'back.out(2.2)' });}
        });
        reveal(feed, i >= 1);
        rows[0] && rows[0].classList.toggle('flag', i >= 1);
        reveal(reply, i >= 2);
        reveal(search, i >= 3);
        progs.forEach((p, pi) => {p.style.width = pi <= i ? '100%' : '0';});
      }
      const stepEls = [...root.querySelectorAll('.stepA')];
      stepEls.forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: 'top center', end: 'bottom center',
          onToggle: (self) => {if (self.isActive) {stepEls.forEach((s) => s.classList.toggle('active', s === el));goToStep(i);}} });
      });
      goToStep(0);stepEls[0].classList.add('active');
    }, rootRef);
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const rt = setTimeout(refresh, 600);
    window.addEventListener('load', refresh);
    return () => {clearTimeout(rt);window.removeEventListener('load', refresh);ctx.revert();};
  }, []);

  const PLATS = ["G2", "Capterra", "Shopify", "Xero", "QuickBooks"];
  const ROWS = [
  { p: "G2", r: "2.0", w: "40%", flagged: true },
  { p: "Capterra", r: "5.0", w: "100%" },
  { p: "Shopify", r: "4.0", w: "80%" }];

  return (
    <section className="scrollyA" ref={rootRef}>
      <div className="container-x">
        <div className="head">
          <span className="eyebrow">One console</span>
          <h2 className="h2">All reviews. <br /><span className="text-primary">In one place.</span></h2>
        </div>
        <div className="scrollyA-grid">
          <div className="mediaA">
            <div className="cmp mock ucMock" id="ucMock">
              <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">app.revly.io</span></div>
              <div className="mock-pad">
                <div className="mon-head">
                  <span className="mon-title">All reviews</span>
                  <span className="mon-live"><span className="pulse"></span>Live</span>
                </div>
                <div className="mon-plat">
                  {PLATS.map((p, i) => <span className="mon-chip" data-chip key={i}><span className="d"></span>{p}</span>)}
                </div>
                <div className="mon-feed" data-feed>
                  {ROWS.map((r, i) =>
                  <div className={"mon-row" + (r.flagged ? "" : "")} key={i}>
                      <span className="badge2">{r.p}</span>
                      <span className="stars5"><span className="bg">★★★★★</span><span className="fg" style={{ width: r.w }}>★★★★★</span></span>
                      <span className="rate">{r.r}</span>
                      <span className="nrf">Needs reply</span>
                    </div>
                  )}
                </div>
                <div className="mon-reply" data-reply>
                  <div className="rr-reply-inner">
                    <div className="rr-reply-tag">✦ AI-drafted reply</div>
                    <p className="rr-reply-text">Thanks for the honest note — we'd love to make this right. I've sent you a direct line to our team so we can sort it quickly.</p>
                  </div>
                </div>
                <div className="mon-search" data-search>
                  <div className="bar">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    "cut our reporting time" — 14 reviews
                  </div>
                </div>
              </div>
            </div>
            <div className="progress"><span><b data-prog="0"></b></span><span><b data-prog="1"></b></span><span><b data-prog="2"></b></span><span><b data-prog="3"></b></span></div>
          </div>
          <div className="stepsA">
            <div className="stepA" data-step="0"><span className="n">1</span><h3>Every platform, one dashboard</h3><p>G2, Capterra, and the app stores sync into a single view automatically. No more checking five logins to know where you stand.</p></div>
            <div className="stepA" data-step="1"><span className="n">2</span><h3>See exactly what needs a reply</h3><p>Each new review lands with a clear flag, so a 2★ never sits unseen while you're in a meeting. Spot sentiment trends across platforms at a glance.</p></div>
            <div className="stepA" data-step="2"><span className="n">3</span><h3>Revly drafts the response</h3><p>When a review needs a reply, Revly writes one for you. Copy it, adjust if needed, and post — one less thing to think about.</p></div>
            <div className="stepA" data-step="3"><span className="n">4</span><h3>Find any quote in seconds</h3><p>Search every review from one place to pull the exact line you need for a campaign, a landing page, or a sales deck.</p></div>
          </div>
        </div>
      </div>
    </section>);
}

// ============ Agencies — "Client switchboard" pinned horizontal gallery ============
export function UCClientGallery() {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      const track = root.querySelector('#clTrack');
      const railDots = [...root.querySelectorAll('#clRail span')];
      const panels = [...root.querySelectorAll('.panelC')];
      if (window.matchMedia('(min-width: 800px)').matches) {
        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => {const idx = Math.min(3, Math.max(1, Math.round(self.progress * 3)));railDots.forEach((d, i) => d.classList.toggle('on', i < idx));} }
        });
        panels.forEach((pan) => {
          const num = pan.querySelector('.num');if (!num) return;
          gsap.fromTo(num, { xPercent: 12 }, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: pan, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        });
      } else {
        root.style.height = 'auto';root.style.display = 'block';
        track.style.flexDirection = 'column';track.style.padding = '4rem 1.5rem';
      }
    }, rootRef);
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const rt = setTimeout(refresh, 600);
    window.addEventListener('load', refresh);
    return () => {clearTimeout(rt);window.removeEventListener('load', refresh);ctx.revert();};
  }, []);

  return (
    <section className="galC" ref={rootRef}>
      <div className="galC-rail" id="clRail"><span></span><span></span><span></span></div>
      <div className="galC-track" id="clTrack">
        <article className="panelC lead-panel">
          <div>
            <h2>Every client.<br /><span style={{ color: "hsl(var(--primary))" }}>One dashboard.</span></h2>
            <div className="hint">Switch clients, not tabs
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">01</div>
            <div className="lbl">Multi-client dashboard</div>
            <h3>All your clients, one login.</h3>
            <p>Switch between accounts instantly and see which clients need attention before they have to tell you.</p>
          </div>
          <div className="vizC"><div className="cl-switch">
            <div className="cl-row active"><span className="av" style={{ background: "#f0047f" }}>A</span><span className="nm">Acme</span><span className="rt"><span className="st">★</span>4.6</span></div>
            <div className="cl-row"><span className="av" style={{ background: "#f5c542", color: "#5a3a00" }}>O</span><span className="nm">Orbit</span><span className="rt"><span className="st">★</span>4.8</span></div>
            <div className="cl-row"><span className="av" style={{ background: "#2bb673" }}>N</span><span className="nm">Nimbus</span><span className="rt"><span className="st">★</span>4.2</span></div>
          </div></div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">02</div>
            <div className="lbl">Real-time alerts</div>
            <h3>Reply before the client notices.</h3>
            <p>Real-time Slack notifications the moment a review lands, across every client account, so nothing sits unseen for days.</p>
          </div>
          <div className="vizC"><div className="cl-alert">
            <div className="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 15a2 2 0 1 1 0-4h2v2a2 2 0 0 1-2 2zm3 0a2 2 0 0 1 4 0v5a2 2 0 0 1-4 0zm6-9a2 2 0 1 1 4 0 2 2 0 0 1-2 2h-2zm0 3a2 2 0 0 1 0 4h-5a2 2 0 0 1 0-4zM9 6a2 2 0 0 1 0-4 2 2 0 0 1 2 2v2zm0 3a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4z" /></svg></div>
            <div><div className="ttl">New review · Nimbus</div><div className="sub">2★ on Capterra just landed — needs a reply</div></div>
          </div></div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">03</div>
            <div className="lbl">Live reporting</div>
            <h3>Numbers that are never stale.</h3>
            <p>Live performance across every client, always current — no more screenshots and spreadsheets that were out of date before you sent them.</p>
          </div>
          <div className="vizC"><div className="cl-rollup">
            <div className="cl-stat"><div className="v">+218%</div><div className="l">Reviews collected</div></div>
            <div className="cl-stat"><div className="v">4.6★</div><div className="l">Portfolio avg</div></div>
            <div className="cl-stat"><div className="v">12</div><div className="l">Active clients</div></div>
            <div className="cl-stat"><div className="v">🙂</div><div className="l">Avg sentiment</div></div>
          </div></div>
        </article>
      </div>
    </section>);
}

// ============ Shared — capability timeline ============
export function UCCapabilityIndex({ eyebrow, heading, items }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current.querySelector('.uc-tl-spine .fill'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: ref.current.querySelector('.uc-tl'), start: 'top 70%', end: 'bottom 75%', scrub: 0.6 } });
      gsap.from(ref.current.querySelectorAll('.uc-tl-item'), { opacity: 0, y: 24, duration: 0.55, ease: 'power2.out', stagger: 0.12, immediateRender: false, scrollTrigger: { trigger: ref.current.querySelector('.uc-tl'), start: 'top 78%' } });
      gsap.from(ref.current.querySelectorAll('.uc-tl-node'), { scale: 0.4, opacity: 0, duration: 0.5, ease: 'back.out(2.4)', stagger: 0.12, immediateRender: false, scrollTrigger: { trigger: ref.current.querySelector('.uc-tl'), start: 'top 78%' } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="section uc-cap" ref={ref}>
      <div className="container-x">
        <div className="head">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="h2">{heading}</h2>
        </div>
        <div className="uc-tl">
          <div className="uc-tl-spine"><span className="fill"></span></div>
          {items.map((it, i) =>
          <div className="uc-tl-item" key={i}>
              <div className="uc-tl-node"><Icon name={it.icon || "check"} size={22} /></div>
              <div className="uc-tl-body">
                <div className="uc-tl-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);
}

// ============ Problem split — copy + purpose-built visual ============
export function UCProblemVisual({ kind }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const r = ref.current;
      if (kind === 'saas-chaos') {
        gsap.from(r.querySelectorAll('.pv-tab'), { y: -14, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08, immediateRender: false, scrollTrigger: { trigger: r, start: 'top 78%' } });
        gsap.from(r.querySelector('.pv-badge'), { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(3)', delay: 0.5, immediateRender: false, scrollTrigger: { trigger: r, start: 'top 78%' } });
        gsap.from(r.querySelector('.pv-search'), { opacity: 0, y: 12, duration: 0.5, delay: 0.4, immediateRender: false, scrollTrigger: { trigger: r, start: 'top 78%' } });
      } else if (kind === 'agency-multiply') {
        const cells = r.querySelectorAll('.pv-cell');
        const cap = r.querySelector('[data-count]');
        const tl = gsap.timeline({ scrollTrigger: { trigger: r, start: 'top 78%', once: true } });
        tl.from(cells, { scale: 0.3, opacity: 0, transformOrigin: 'center', duration: 0.35, ease: 'power1.out', stagger: { each: 0.02, from: 'start' }, immediateRender: false });
        const counter = { n: 0 };
        tl.to(counter, { n: cells.length, duration: cells.length * 0.02, ease: 'none', onStart() {if (cap) cap.textContent = '0';}, onUpdate() {if (cap) cap.textContent = Math.round(counter.n);} }, 0);
      }
    }, ref);
    return () => ctx.revert();
  }, [kind]);

  if (kind === 'saas-chaos') {
    return (
      <div className="uc-prob-visual" ref={ref}>
        <div className="pv-win">
          <span className="pv-badge">1 new · unseen</span>
          <div className="pv-tabbar">
            <span className="pv-tab live">G2 <span className="rd"></span></span>
            <span className="pv-tab">Capterra</span>
            <span className="pv-tab">App Store</span>
            <span className="pv-tab">Play</span>
            <span className="pv-tab">Slack</span>
          </div>
          <div className="pv-winbody">
            <div className="pv-row w1"></div>
            <div className="pv-row w2"></div>
            <div className="pv-row w3"></div>
            <div className="pv-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              Where was that 5★ from again?
            </div>
          </div>
        </div>
      </div>);
  }
  // agency-multiply
  return (
    <div className="uc-prob-visual" ref={ref}>
      <div className="pv-mult">
        <div className="pv-mult-row">
          <span className="pv-pill">12 clients</span>
          <span className="pv-x">×</span>
          <span className="pv-pill">5 platforms</span>
        </div>
        <div className="pv-grid">
          {Array.from({ length: 60 }).map((_, i) => <span className="pv-cell on" key={i}></span>)}
        </div>
        <div className="pv-cap"><b data-count>60</b> logins to check, by hand</div>
      </div>
    </div>);
}

export function UCProblemSplit({ eyebrow, title, lead, emphasized, visual, bg = "muted", flip }) {
  const bgVal = bg === "accent" ? "hsl(var(--accent))" : bg === "card" ? "hsl(var(--card))" : bg === "f6" ? "#f6f6f4" : "hsl(var(--muted))";
  const copyRef = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(copyRef.current.children, { opacity: 0, y: 22, duration: 0.6, ease: 'power2.out', stagger: 0.1, immediateRender: false, scrollTrigger: { trigger: copyRef.current, start: 'top 80%' } });
    }, copyRef);
    return () => ctx.revert();
  }, []);
  return (
    <section className={"section uc-prob" + (flip ? " flip" : "")} style={{ background: bgVal }}>
      <div className="container-x">
        <div className="uc-prob-grid">
          <div className="uc-prob-copy" ref={copyRef}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 className="h2">{title}</h2>
            {lead && <p className="lead">{lead}</p>}
            {emphasized && <p className="uc-prob-emph">{emphasized}</p>}
          </div>
          <UCProblemVisual kind={visual} />
        </div>
      </div>
    </section>);
}

// ============ Outcome band ============
export function UCOutcome({ title, lead, tiles }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.head > *'), { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', stagger: 0.1, immediateRender: false, scrollTrigger: { trigger: ref.current, start: 'top 78%' } });
      gsap.from(ref.current.querySelectorAll('.uc-out-tile'), { opacity: 0, y: 26, duration: 0.6, ease: 'power2.out', stagger: 0.12, immediateRender: false, scrollTrigger: { trigger: ref.current.querySelector('.uc-out-tiles'), start: 'top 84%' } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="section uc-out" ref={ref}>
      <div className="container-x">
        <div className="head">
          <h2 className="h2">{title}</h2>
          {lead && <p className="lead">{lead}</p>}
        </div>
        <div className="uc-out-tiles">
          {tiles.map((t, i) =>
          <div className="uc-out-tile" key={i}>
              <div className="ic"><Icon name={t.icon} size={22} /></div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);
}
