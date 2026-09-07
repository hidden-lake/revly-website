// Revly — Monitor page redesign sections (Direction A treatment)
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mock, useMounted } from './decorative.jsx';
gsap.registerPlugin(ScrollTrigger);

// ============ Monitor scrollytelling: unified dashboard ============
export function MonScrolly() {
  const rootRef = React.useRef(null);
  // The mock's innards only exist after mount, so the timeline waits for them.
  const mounted = useMounted();
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;
    const ctx = gsap.context(() => {
      const plats = [...root.querySelectorAll('[data-plat]')];
      const feed = root.querySelector('[data-feed]');
      const trend = root.querySelector('[data-trend]');
      const search = root.querySelector('[data-search]');
      const slack = root.querySelector('[data-slack]');
      const progs = [...root.querySelectorAll('[data-prog]')];
      let lastStep = -1;

      function reveal(el, show) {
        gsap.killTweensOf(el);
        const start = el.getBoundingClientRect().height;
        el.style.height = 'auto';
        const target = show ? el.offsetHeight : 0;
        el.style.height = start + 'px';
        gsap.to(el, { height: target, opacity: show ? 1 : 0, duration: 0.5, ease: 'power2.inOut', onComplete() { if (show) el.style.height = 'auto'; } });
      }
      function lightPlats(on) {
        plats.forEach((p, i) => {
          const want = on;
          if (p.classList.contains('on') !== want) {
            p.classList.toggle('on', want);
            if (want) gsap.fromTo(p, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, delay: i * 0.08, ease: 'back.out(2)' });
          }
        });
      }
      function goToStep(i) {
        if (i === lastStep) return; lastStep = i;
        lightPlats(i >= 0);
        reveal(slack, i === 1);
        reveal(feed, i >= 2);
        reveal(trend, i >= 3);
        reveal(search, i >= 4);
        progs.forEach((p, pi) => { p.style.width = pi <= i ? '100%' : '0'; });
      }
      const stepEls = [...root.querySelectorAll('.stepA')];
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

  const Row = (badge, avg, pct) => (
    <div className="mon-row"><span className="badge2">{badge}</span><span className="rate">{avg}</span><span className="stars5"><span className="bg">★★★★★</span><span className="fg" style={{ width: pct }}>★★★★★</span></span></div>
  );

  return (
    <section className="scrollyA" ref={rootRef}>
      <div className="container-x">
        <div className="head">
          <span className="eyebrow">How it works</span>
          <h2 className="h2">Every platform, one feed,<br /><span className="mag">one Slack channel.</span></h2>
        </div>
        <div className="scrollyA-grid">
          <div className="mediaA">
            <Mock className="mock" minHeight="21rem">
              <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">Revly · All reviews</span></div>
              <div className="mock-pad">
                <div className="mon-plat">
                  <span className="mon-chip" data-plat><span className="d"></span>G2</span>
                  <span className="mon-chip" data-plat><span className="d"></span>Capterra</span>
                  <span className="mon-chip" data-plat><span className="d"></span>Trustpilot</span>
                  <span className="mon-chip" data-plat><span className="d"></span>App Store</span>
                </div>
                <div className="mon-slack" data-slack>
                  <div className="mon-slack-inner">
                    <div className="mon-slack-head"><span className="hash">#</span>reviews</div>
                    <div className="mon-slack-row"><span className="mon-slack-plat">Capterra</span><span className="mon-slack-rating">★★★★★</span></div>
                    <p className="mon-slack-text">Every new review posts here, with buttons to respond.</p>
                  </div>
                </div>
                <div className="mon-feed" data-feed>
                  {Row("G2", "5.0", "100%")}
                  {Row("Capterra", "4.0", "80%")}
                  {Row("Trustpilot", "4.5", "90%")}
                </div>
                <div className="mon-trend" data-trend>
                  <div className="mon-stats">
                    <div className="mstat">
                      <div className="ml">Avg rating</div>
                      <div className="mv">4.6 <span className="up">▲ 0.3</span></div>
                      <div className="bars">{[10, 12, 11, 14, 13, 17, 16, 20].map((h, i) => <i key={i} style={{ height: h + "px" }}></i>)}</div>
                    </div>
                    <div className="mstat">
                      <div className="ml">Reviews</div>
                      <div className="mv">218 <span className="up">▲ 42</span></div>
                      <div className="bars">{[6, 9, 8, 12, 15, 14, 18, 20].map((h, i) => <i key={i} style={{ height: h + "px" }}></i>)}</div>
                    </div>
                    <div className="mstat">
                      <div className="ml">Sentiment</div>
                      <div className="mv">92% <span className="up">▲ 6</span></div>
                      <div className="gauge"><b style={{ width: "92%" }}></b></div>
                    </div>
                  </div>
                </div>
                <div className="mon-search" data-search>
                  <div className="bar"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>"onboarding": 12 matches across 4 platforms</div>
                </div>
              </div>
            </Mock>
            <div className="progress"><span><b data-prog="0"></b></span><span><b data-prog="1"></b></span><span><b data-prog="2"></b></span><span><b data-prog="3"></b></span><span><b data-prog="4"></b></span></div>
          </div>
          <div className="stepsA">
            <div className="stepA" data-step="0"><span className="n">1</span><h3>Connect your platforms</h3><p>Add your G2, Capterra and app store listings. Revly starts syncing.</p></div>
            <div className="stepA" data-step="1"><span className="n">2</span><h3>Connect Slack</h3><p>Pick the channel. Every new review posts there, with the rating, the platform and the review itself.</p></div>
            <div className="stepA" data-step="2"><span className="n">3</span><h3>Everything in one feed</h3><p>New reviews land in your dashboard daily, across every connected platform. On several platforms, more often.</p></div>
            <div className="stepA" data-step="3"><span className="n">4</span><h3>Track what is changing</h3><p>Rating trends and sentiment shifts over time, so you see the pattern before it turns into a quarter.</p></div>
            <div className="stepA" data-step="4"><span className="n">5</span><h3>Find anything</h3><p>Search your whole review library by keyword, feature or phrase. The quote you need for the deck is one search away.</p></div>
          </div>
        </div>
      </div>
    </section>);
}

// ============ Monitor payoff gallery (pinned horizontal) ============
export function MonGallery() {
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
    <section className="galC" ref={rootRef}>
      <div className="galC-rail" data-rail></div>
      <div className="galC-track" data-track>
        <article className="panelC lead-panel">
          <div>
            <h2>From scattered<br /><span style={{ color: "hsl(var(--primary))" }}>to visible.</span></h2>
            <div className="hint">What changes with one dashboard
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">01</div>
            <div className="lbl">Nothing goes unread</div>
            <h3>Every review, one feed.</h3>
            <p>Filter by platform, rating, or response status. Nothing requires a separate login to find.</p>
          </div>
          <Mock className="vizC"><div className="link">Every platform <span className="pill">1 feed</span></div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">02</div>
            <div className="lbl">Trends you can act on</div>
            <h3>The full picture, in aggregate.</h3>
            <p>Rating shifts and sentiment patterns across platforms, not a snapshot that misses the trend.</p>
          </div>
          <Mock className="vizC"><div className="field">Avg rating ▲ 4.3 → 4.6 this quarter</div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">03</div>
            <div className="lbl">Searchable library</div>
            <h3>The right quote, instantly.</h3>
            <p>Find the exact review that names the feature or describes the outcome, without digging through tabs.</p>
          </div>
          <Mock className="vizC"><div className="field">🔍 "onboarding": 12 matches</div></Mock>
        </article>
      </div>
    </section>);
}
