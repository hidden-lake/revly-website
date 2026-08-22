// Revly — Review embeds page sections (scrollytelling + payoff gallery)
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mock, useMounted } from './decorative.jsx';
gsap.registerPlugin(ScrollTrigger);

export function EmbedScrolly() {
  const rootRef = React.useRef(null);
  // The mock's innards only exist after mount, so the timeline waits for them.
  const mounted = useMounted();
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;
    const ctx = gsap.context(() => {
      const wall = root.querySelector('[data-wall]');
      const tabs = [...root.querySelectorAll('[data-tab]')];
      const theme = root.querySelector('[data-theme]');
      const code = root.querySelector('[data-code]');
      const live = root.querySelector('[data-live]');
      const revs = [...root.querySelectorAll('.eb-rev')];
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
      function goToStep(i) {
        if (i === lastStep) return; const prev = lastStep; lastStep = i;
        tabs.forEach((t, ti) => t.classList.toggle('on', i >= 1 && ti === 1 || i < 1 && ti === 0));
        wall.classList.toggle('dark', i >= 1);
        if (i === 0 && prev !== 0) gsap.fromTo(revs, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' });
        reveal(theme, i >= 1);
        reveal(code, i >= 2);
        reveal(live, i >= 3);
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

  return (
    <section className="scrollyA" ref={rootRef}>
      <div className="container-x">
        <div className="head">
          <span className="eyebrow">How it works</span>
          <h2 className="h2">Display your reviews,<br /><span className="mag">in your style.</span></h2>
        </div>
        <div className="scrollyA-grid">
          <div className="mediaA">
            <Mock className="cmp mock" minHeight="20rem">
              <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">Revly · Widget builder</span></div>
              <div className="mock-pad">
                <div className="eb-tabs">
                  <span className="eb-tab on" data-tab>Grid</span>
                  <span className="eb-tab" data-tab>Carousel</span>
                  <span className="eb-tab" data-tab>Wall</span>
                </div>
                <div className="eb-src">
                  <span className="eb-pill">4★ and up</span>
                  <span className="eb-pill">G2 + Capterra</span>
                </div>
                <div className="eb-wall" data-wall>
                  <div className="eb-rev"><span className="st">★★★★★</span><p>"Cut our weekly reporting from half a day to twenty minutes."</p><span className="who">Maria O. · G2</span></div>
                  <div className="eb-rev"><span className="st">★★★★★</span><p>"Setup took ten minutes. Support replied in five."</p><span className="who">Jonas P. · Capterra</span></div>
                  <div className="eb-rev"><span className="st">★★★★★</span><p>"I stopped checking five tabs every morning."</p><span className="who">Devon R. · G2</span></div>
                  <div className="eb-rev"><span className="st">★★★★</span><p>"The one tool our whole team actually opens."</p><span className="who">Priya S. · Capterra</span></div>
                </div>
                <div className="eb-theme" data-theme>
                  <div className="eb-theme-inner">
                    <span className="eb-lbl">Brand colour</span>
                    <span className="eb-sw on" style={{ background: "hsl(var(--primary))" }}></span>
                    <span className="eb-lbl" style={{ marginLeft: ".4rem" }}>Custom CSS</span>
                  </div>
                </div>
                <div className="eb-code" data-code>
                  <div className="eb-code-inner"><span className="tg">&lt;script</span> <span className="at">src</span>="https://cdn.revly.io/w.js" <span className="at">data-widget</span>="wall"<span className="tg">&gt;&lt;/script&gt;</span></div>
                </div>
                <div className="eb-live" data-live>
                  <div className="eb-live-inner"><span className="dot"></span>Live · 3 new reviews added this week</div>
                </div>
              </div>
            </Mock>
            <div className="progress"><span><b data-prog="0"></b></span><span><b data-prog="1"></b></span><span><b data-prog="2"></b></span><span><b data-prog="3"></b></span></div>
          </div>
          <div className="stepsA">
            <div className="stepA"><span className="n">1</span><h3>Choose which reviews show</h3><p>Filter by rating and platform.</p></div>
            <div className="stepA"><span className="n">2</span><h3>Style it to match your site</h3><p>Pick a layout, style, and colours. Drop in your custom CSS and make it look like you built it yourself.</p></div>
            <div className="stepA"><span className="n">3</span><h3>Paste one line of code</h3><p>One snippet, any site or CMS. Build as many widgets as you need: a wall of praise on the pricing page, a trust-building carousel on the home page.</p></div>
            <div className="stepA"><span className="n">4</span><h3>Automatically updated</h3><p>New reviews flow in as they're posted. No exports, no screenshots going stale, no testimonials from two years ago.</p></div>
          </div>
        </div>
      </div>
    </section>);
}

export function EmbedGallery() {
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
            <h2>Reviews earn their keep<br /><span style={{ color: "hsl(var(--primary))" }}>on your own pages.</span></h2>
            <div className="hint">What changes when the proof is on-site
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">01</div>
            <div className="lbl">Proof at the decision point</div>
            <h3>Praise where the buying happens.</h3>
            <p>Visitors weighing your pricing page rarely detour to G2. Put the reviews they'd have found there directly in front of them.</p>
          </div>
          <Mock className="vizC"><div className="link">Pricing page <span className="pill">4.8 ★ · 218 reviews</span></div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">02</div>
            <div className="lbl">You choose what shows</div>
            <h3>Only the reviews you want.</h3>
            <p>Filter by star rating, platform, and minimum length, so every widget shows the reviews worth reading.</p>
          </div>
          <Mock className="vizC"><div className="chips"><span className="chip2 sel">4★ and up</span><span className="chip2 sel">G2 + Capterra</span><span className="chip2">Min. 200 characters</span></div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">03</div>
            <div className="lbl">On brand, not off the shelf</div>
            <h3>Seamless style fit.</h3>
            <p>Pick grid, carousel, or wall, set your brand colour, and take it further with custom CSS.</p>
          </div>
          <Mock className="vizC"><div className="field">Layout: carousel · brand colour · custom CSS</div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">04</div>
            <div className="lbl">Never stale</div>
            <h3>Fresh reviews, automatically.</h3>
            <p>New reviews appear as they're posted. The testimonial section stops being a thing someone has to remember to update.</p>
          </div>
          <Mock className="vizC"><div className="field">▲ 3 new reviews added this week, automatically</div></Mock>
        </article>
      </div>
    </section>);
}
