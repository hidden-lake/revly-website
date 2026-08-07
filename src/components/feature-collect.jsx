// Revly — Collect page redesign sections (Direction A), ported to React with GSAP
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mock, useMounted } from './decorative.jsx';
gsap.registerPlugin(ScrollTrigger);

const FC_STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.401 8.169L12 18.896l-7.335 3.857 1.401-8.169L.132 9.21l8.2-1.192z"/></svg>';
const FC_TYPED = "Acme saved us hours every week.";

// ============ Scrollytelling "How it works" ============
export function CQScrolly() {
  const rootRef = React.useRef(null);
  // The mock's innards only exist after mount, so the timeline waits for them.
  const mounted = useMounted();
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;
    const ctx = gsap.context(() => {
      const mock = root.querySelector('#cqMock');
      const host = mock.querySelector('[data-stars]');host.innerHTML = '';
      const stars = [];
      for (let i = 0; i < 5; i++) {const s = document.createElement('span');s.className = 'star';s.innerHTML = FC_STAR;host.appendChild(s);stars.push(s);}
      const textEl = mock.querySelector('[data-text]');
      const aiEl = mock.querySelector('[data-ai]');
      const routeEl = mock.querySelector('[data-route]');
      const chips = [...mock.querySelectorAll('[data-chip]')];
      const ctaEl = mock.querySelector('[data-cta]');
      const progs = [...root.querySelectorAll('[data-prog]')];
      let lastStep = -1,typeTween = null;

      function reveal(el, show) {
        gsap.killTweensOf(el);
        const start = el.getBoundingClientRect().height;
        el.style.height = 'auto';
        const target = show ? el.offsetHeight : 0;
        el.style.height = start + 'px';
        gsap.to(el, { height: target, opacity: show ? 1 : 0, duration: 0.5, ease: 'power2.inOut', onComplete() {if (show) el.style.height = 'auto';} });
      }
      function setStars(n) {stars.forEach((s, i) => {const on = i < n;if (s.classList.contains('on') !== on) {s.classList.toggle('on', on);if (on) gsap.fromTo(s, { scale: 0.3 }, { scale: 1, duration: 0.4, ease: 'back.out(2.4)' });}});}
      function typeText(forward) {
        if (typeTween) typeTween.kill();
        if (forward) {textEl.classList.remove('empty');const st = { n: 0 };typeTween = gsap.to(st, { n: FC_TYPED.length, duration: 0.7, ease: 'none', onUpdate() {textEl.innerHTML = FC_TYPED.slice(0, Math.round(st.n)) + '<span class="caret"></span>';}, onComplete() {textEl.innerHTML = FC_TYPED;} });} else
        {textEl.classList.add('empty');textEl.textContent = textEl.dataset.empty;}
      }
      function goToStep(i) {
        if (i === lastStep) return;const prev = lastStep;lastStep = i;
        setStars(i >= 1 ? 5 : 0);
        if (i >= 1 && prev < 1) typeText(true);
        if (i < 1 && prev >= 1) typeText(false);
        reveal(aiEl, i >= 2);
        reveal(routeEl, i >= 3);
        chips.forEach((c, ci) => c.classList.toggle('sel', i >= 3 && ci === 0));
        gsap.to(ctaEl, { opacity: i >= 3 ? 1 : 0.4, duration: 0.4 });
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
  }, [mounted]);

  return (
    <section className="scrollyA" ref={rootRef}>
      <div className="container-x">
        <div className="head">
          <span className="eyebrow">How it works</span>
          <h2 className="h2">One link.&nbsp;<br /><span className="mag">A review worth reading.</span></h2>
        </div>
        <div className="scrollyA-grid">
          <div className="mediaA">
            <Mock className="cmp mock" id="cqMock" minHeight="21rem">
              <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">revly.link/acme</span></div>
              <div className="mock-pad cmp-body">
                <div className="cmp-q">How was Acme?</div>
                <div className="cmp-stars" data-stars></div>
                <div className="cmp-field">
                  <p className="cmp-text empty" data-text data-empty="Tell us what you think…">Tell us what you think…</p>
                  <div className="cmp-ai" data-ai>
                    <div className="cmp-ai-inner">
                      <div className="cmp-ai-tag">✦ AI-assisted draft</div>
                      <p className="cmp-ai-text">Acme cut our weekly reporting from half a day to twenty minutes. Setup took ten minutes, and the unified dashboard means I finally stopped checking five tabs every morning.</p>
                    </div>
                  </div>
                </div>
                <div className="cmp-route" data-route>
                  <div className="cmp-route-inner">
                    <div className="cmp-route-label">Routed to the platform that needs it</div>
                    <div className="cmp-chips">
                      <span className="cmp-chip" data-chip><span className="dot"></span>G2</span>
                      <span className="cmp-chip" data-chip><span className="dot"></span>Capterra</span>
                      <span className="cmp-chip" data-chip><span className="dot"></span>TrustRadius</span>
                    </div>
                  </div>
                </div>
                <div className="cmp-cta" data-cta>Post review →</div>
              </div>
            </Mock>
            <div className="progress"><span><b data-prog="0"></b></span><span><b data-prog="1"></b></span><span><b data-prog="2"></b></span><span><b data-prog="3"></b></span></div>
          </div>
          <div className="stepsA">
            <div className="stepA" data-step="0"><span className="n">1</span><h3>Share one smart link</h3><p>No list of platforms, no login instructions. One link per product that handles everything from here.</p></div>
            <div className="stepA" data-step="1"><span className="n">2</span><h3>The customer rates and writes</h3><p>They share their experience in their own words — however much or little they want. No blank-page pressure.</p></div>
            <div className="stepA" data-step="2"><span className="n">3</span><h3>AI helps them say more</h3><p>If they want help, Revly expands their note into something specific — structure and detail added, their voice kept. They can edit it, ignore it, or post as-is.</p></div>
            <div className="stepA" data-step="3"><span className="n">4</span><h3>Routed to the right platform</h3><p>Based on where you need reviews most, Revly sends each customer to the one place their review will do the most good.</p></div>
          </div>
        </div>
      </div>
    </section>);
}

// ============ Smart routing (auto, scroll-coupled connectors) ============
export function CQSmartRouting() {
  const rootRef = React.useRef(null);
  // The routing diagram only exists after mount, so the timeline waits for it.
  const mounted = useMounted();
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;
    let timer = null;
    const onResize = () => layoutPathsRef.fn && layoutPathsRef.fn();
    const layoutPathsRef = {};
    const ctx = gsap.context(() => {
      const review = root.querySelector('#srReview');
      const starHost = root.querySelector('#srStars');starHost.innerHTML = '';
      const stars = [];
      for (let i = 0; i < 5; i++) {const s = document.createElement('span');s.className = 's';s.innerHTML = FC_STAR;starHost.appendChild(s);stars.push(s);}
      const quote = root.querySelector('#srQuote');
      const nm = root.querySelector('#srNm');
      const av = root.querySelector('#srAv');
      const badge = root.querySelector('#srBadge');
      const destPublic = root.querySelector('#destPublic');
      const destSupport = root.querySelector('#destSupport');
      const svg = root.querySelector('#srSvg');
      const pubBase = root.querySelector('#pathPubBase');
      const supBase = root.querySelector('#pathSupBase');
      const pubFlow = root.querySelector('#pathPubFlow');
      const supFlow = root.querySelector('#pathSupFlow');
      const dot = root.querySelector('#srDot');

      const PHASES = [
      { stars: 2, quote: 'A few things in Acme tripped me up early on.', nm: 'Devon R.', av: '#f5c542', avInk: '#5a3a00', dest: 'support', flow: supFlow },
      { stars: 5, quote: 'Acme saves us hours every single week.', nm: 'Maria O.', av: '#f0047f', avInk: '#fff', dest: 'public', flow: pubFlow }];

      let pubLen = 1,supLen = 1;

      function layoutPaths() {
        const sb = svg.getBoundingClientRect();
        if (!sb.width) return;
        svg.setAttribute('viewBox', '0 0 ' + sb.width + ' ' + sb.height);
        const rb = review.getBoundingClientRect();
        const pubI = destPublic.querySelector('.ic').getBoundingClientRect();
        const supI = destSupport.querySelector('.ic').getBoundingClientRect();
        const sx = 0,sy = rb.top + rb.height / 2 - sb.top;
        const mk = (icon) => {
          const ex = icon.left + icon.width / 2 - sb.left;
          const ey = icon.top + icon.height / 2 - sb.top;
          const c = sx + (ex - sx) * 0.5;
          return 'M' + sx + ',' + sy + ' C' + c + ',' + sy + ' ' + c + ',' + ey + ' ' + ex + ',' + ey;
        };
        const dPub = mk(pubI),dSup = mk(supI);
        pubBase.setAttribute('d', dPub);pubFlow.setAttribute('d', dPub);
        supBase.setAttribute('d', dSup);supFlow.setAttribute('d', dSup);
        pubLen = pubFlow.getTotalLength();supLen = supFlow.getTotalLength();
        pubFlow.style.strokeDasharray = pubLen;supFlow.style.strokeDasharray = supLen;
        pubFlow.style.strokeDashoffset = pubLen;supFlow.style.strokeDashoffset = supLen;
        dot.setAttribute('cx', sx);dot.setAttribute('cy', sy);
      }
      layoutPathsRef.fn = layoutPaths;

      function setContent(ph) {
        stars.forEach((s, i) => s.classList.toggle('on', i < ph.stars));
        quote.textContent = ph.quote;
        nm.textContent = ph.nm;
        av.textContent = ph.nm[0];
        av.style.background = ph.av;av.style.color = ph.avInk;
        badge.textContent = ph.dest === 'public' ? 'Ready to share' : 'Needs a hand';
        destPublic.classList.toggle('active', ph.dest === 'public');
        destSupport.classList.toggle('active', ph.dest === 'support');
        gsap.fromTo(review, { opacity: 0.3, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', overwrite: true });
      }
      let dotTween = null;
      function drawPhase(ph) {
        const flow = ph.flow;
        const len = flow === pubFlow ? pubLen : supLen;
        const other = flow === pubFlow ? supFlow : pubFlow;
        gsap.set(other, { opacity: 0 });
        gsap.set(flow, { opacity: 1, strokeDashoffset: len });
        gsap.to(flow, { strokeDashoffset: 0, duration: 0.375, ease: 'power2.inOut' });
        if (dotTween) dotTween.kill();
        const o = { t: 0 };
        gsap.set(dot, { opacity: 1 });
        dotTween = gsap.to(o, { t: 1, duration: 0.375, ease: 'power2.inOut',
          onUpdate() {const pt = flow.getPointAtLength(len * o.t);dot.setAttribute('cx', pt.x);dot.setAttribute('cy', pt.y);},
          onComplete() {gsap.to(dot, { opacity: 0, duration: 0.26, delay: 0.34 });} });
      }
      let idx = 0;
      function tick() {const ph = PHASES[idx];setContent(ph);drawPhase(ph);idx = (idx + 1) % PHASES.length;}
      function startLoop() {if (timer) return;tick();timer = setInterval(tick, 1725);}
      function stopLoop() {if (timer) {clearInterval(timer);timer = null;}}

      layoutPaths();
      setTimeout(layoutPaths, 400);
      window.addEventListener('resize', onResize);
      ScrollTrigger.addEventListener('refresh', layoutPaths);

      ScrollTrigger.create({ trigger: root, start: 'top 75%', end: 'bottom top',
        onEnter: () => {layoutPaths();startLoop();},
        onEnterBack: startLoop, onLeave: stopLoop, onLeaveBack: stopLoop });
    }, rootRef);
    return () => {if (timer) clearInterval(timer);window.removeEventListener('resize', onResize);ctx.revert();};
  }, [mounted]);

  return (
    <section className="sr" ref={rootRef}>
      <div className="container-x">
        <div className="head">
          <span className="eyebrow">Smart routing</span>
          <h2 className="h2">One review. The right destination.</h2>
          <p>Better reviews start with better relationships. When a customer needs help, Revly makes sure they reach your team first — so you get the chance to understand the issue and turn their experience around.</p>
        </div>
        <Mock className="sr-grid" minHeight="17rem">
          <div className="sr-card sr-review" id="srReview">
            <span className="badge" id="srBadge">Incoming</span>
            <div className="who"><div className="av" id="srAv" style={{ background: "#f5c542", color: "#5a3a00" }}>D</div><div><div className="nm" id="srNm">Devon R.</div><div className="src">via revly.link/acme</div></div></div>
            <div className="stars" id="srStars"></div>
            <p className="quote" id="srQuote">A few things in Acme tripped me up early on.</p>
          </div>
          <div className="sr-mid">
            <svg id="srSvg" preserveAspectRatio="none">
              <path className="sr-path-base" id="pathPubBase" d=""></path>
              <path className="sr-path-base" id="pathSupBase" d=""></path>
              <path className="sr-path-flow" id="pathPubFlow" d=""></path>
              <path className="sr-path-flow" id="pathSupFlow" d=""></path>
              <circle className="sr-dot" id="srDot" r="5" cx="0" cy="0"></circle>
            </svg>
          </div>
          <div className="sr-arrow"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg></div>
          <div className="sr-dests">
            <div className="sr-dest public" id="destPublic">
              <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 9 22 9 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9 9 9" /></svg></div>
              <div><div className="lbl">Ready to share</div><div className="big">Review platform</div><div className="sm">G2, Capterra, TrustRadius, etc.</div></div>
            </div>
            <div className="sr-dest support" id="destSupport">
              <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg></div>
              <div><div className="lbl">Needs a hand</div><div className="big">Your support team</div><div className="sm">Routed privately</div></div>
            </div>
          </div>
        </Mock>
      </div>
    </section>);
}

// ============ Payoff — pinned horizontal gallery ============
export function CQGallery() {
  const rootRef = React.useRef(null);
  // The star strip lives in a Mock, so it isn't there until after mount.
  const mounted = useMounted();
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;
    const ctx = gsap.context(() => {
      const track = root.querySelector('#payTrack');
      const rail = root.querySelector('[data-rail]');
      const panels = [...root.querySelectorAll('.panelC')];
      const vs = root.querySelector('[data-vstars]');
      if (vs) vs.innerHTML = FC_STAR.repeat(5);
      if (window.matchMedia('(min-width: 800px)').matches) {
        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => { if (rail) { const pct = (Math.min(1, Math.max(0, self.progress)) * 100).toFixed(1); rail.style.background = 'linear-gradient(to right, hsl(var(--primary)) ' + pct + '%, hsl(var(--foreground)/0.14) ' + pct + '%)'; } } }
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
    return () => ctx.revert();
  }, [mounted]);

  return (
    <section className="galC" id="galPay" ref={rootRef}>
      <div className="galC-rail" data-rail></div>
      <div className="galC-track" id="payTrack">
        <article className="panelC lead-panel">
          <div>
            <h2>Better reviews.<br /><span style={{ color: "hsl(var(--primary))" }}>In the right places.</span></h2>
            <div className="hint">What changes when collection just works
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">01</div>
            <div className="lbl">Higher follow-through</div>
            <h3>Customers who almost reviewed you — do.</h3>
            <p>Remove the platform confusion and the blank page, and the people who were willing finally get there.</p>
          </div>
          <Mock className="vizC"><div className="link">Completed reviews <span className="pill">+218%</span></div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">02</div>
            <div className="lbl">Real specifics</div>
            <h3>Reviews that capture the full story.</h3>
            <p>AI assistance turns two-word summaries into specific experiences that read like a real person wrote them.</p>
          </div>
          <Mock className="vizC"><div className="stars" data-vstars></div><div className="field">Acme cut our weekly reporting from half a day to twenty minutes.</div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">03</div>
            <div className="lbl">The right platform</div>
            <h3>They land where you need them.</h3>
            <p>Set the routing priority, or let Revly balance across platforms automatically. Either way, you stay in control.</p>
          </div>
          <Mock className="vizC"><div className="chips"><span className="chip2 sel">G2 ✓</span><span className="chip2">Capterra</span><span className="chip2">TrustRadius</span></div></Mock>
        </article>
      </div>
    </section>);
}

export function FeatureMotion() {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const reveal = (sel, o) => gsap.utils.toArray(sel).forEach((el) => gsap.from(el, Object.assign({ opacity: 0, y: 26, duration: 0.8, ease: 'power3.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 88%' } }, o || {})));
      reveal('.ba2-grid', { y: 36 });
      reveal('.ctaA', { y: 32 });
      gsap.from('.acc-item', { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out', stagger: 0.07, immediateRender: false, scrollTrigger: { trigger: '.acc-item', start: 'top 86%' } });
      gsap.from('.grid-3 a.card', { opacity: 0, y: 26, duration: 0.6, ease: 'power2.out', stagger: 0.1, immediateRender: false, scrollTrigger: { trigger: '.grid-3', start: 'top 88%' } });
    });
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const t = setTimeout(refresh, 600);
    window.addEventListener('load', refresh);
    return () => {clearTimeout(t);window.removeEventListener('load', refresh);ctx.revert();};
  }, []);
  return null;
}
