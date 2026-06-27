// Revly — Smart Review Requests page redesign sections (Direction A treatment)
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const SMART_STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.401 8.169L12 18.896l-7.335 3.857 1.401-8.169L.132 9.21l8.2-1.192z"/></svg>';

// ============ Check-in scrollytelling ============
export function SmartScrolly() {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      const starHost = root.querySelector('[data-stars]');starHost.innerHTML = '';
      const stars = [];
      for (let i = 0; i < 5; i++) {const s = document.createElement('span');s.className = 'cs';s.innerHTML = SMART_STAR;starHost.appendChild(s);stars.push(s);}
      const route = root.querySelector('[data-route]');
      const outcome = root.querySelector('[data-outcome]');
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
      function setStars(n) {stars.forEach((s, i) => {const on = i < n;if (s.classList.contains('on') !== on) {s.classList.toggle('on', on);if (on) gsap.fromTo(s, { scale: 0.3 }, { scale: 1, duration: 0.4, ease: 'back.out(2.4)' });}});}
      function goToStep(i) {
        if (i === lastStep) return;lastStep = i;
        setStars(i >= 1 ? 2 : 0);
        reveal(route, i >= 2);
        reveal(outcome, i >= 3);
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

  return (
    <section className="scrollyA" ref={rootRef}>
      <div className="container-x">
        <div className="head">
          <span className="eyebrow">How it works</span>
          <h2 className="h2">Catch it early.<br /><span className="mag">Turn it around.</span></h2>
        </div>
        <div className="scrollyA-grid">
          <div className="mediaA">
            <div className="mock">
              <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">revly.link/acme</span></div>
              <div className="mock-pad">
                <div className="ci-q">How are you finding Acme overall?</div>
                <div className="ci-stars" data-stars></div>
                <div className="ci-route ci-hide" data-route>
                  <div className="rcard">
                    <div className="ric"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg></div>
                    <div><div className="rlbl">ROUTED PRIVATELY</div><div className="rbig">Your support team</div></div>
                  </div>
                </div>
                <div className="ci-outcome ci-hide" data-outcome>
                  <div className="ocard">
                    <div className="ostars"><span dangerouslySetInnerHTML={{ __html: SMART_STAR.repeat(5) }}></span></div>
                    <p>"Your team sorted it out fast — now I actually recommend Acme."</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="progress"><span><b data-prog="0"></b></span><span><b data-prog="1"></b></span><span><b data-prog="2"></b></span><span><b data-prog="3"></b></span></div>
          </div>
          <div className="stepsA">
            <div className="stepA" data-step="0"><span className="n">1</span><h3>Everyone gets the same link</h3><p>Every customer gets one link and one question: how are they finding the product overall?</p></div>
            <div className="stepA" data-step="1"><span className="n">2</span><h3>They give a star rating</h3><p>That rating determines where each customer goes next — and anyone who needs a hand reaches your support team automatically.</p></div>
            <div className="stepA" data-step="2"><span className="n">3</span><h3>Unhappy? You hear it first</h3><p>Your team gets the chance to respond, understand what happened, and turn the experience around — while it still matters.</p></div>
            <div className="stepA" data-step="3"><span className="n">4</span><h3>Turn it around, earn an advocate</h3><p>A customer you helped becomes a champion — the kind who tells other people about you.</p></div>
          </div>
        </div>
      </div>
    </section>);
}

// ============ Payoff gallery ============
export function SmartGallery() {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      const track = root.querySelector('[data-track]');
      const rail = root.querySelector('[data-rail]');
      const panels = [...root.querySelectorAll('.panelC')];
      const vs = root.querySelector('[data-vstars]');if (vs) vs.innerHTML = SMART_STAR.repeat(5);
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
  }, []);

  return (
    <section className="galC" ref={rootRef}>
      <div className="galC-rail" data-rail></div>
      <div className="galC-track" data-track>
        <article className="panelC lead-panel">
          <div>
            <h2>Meet customers<br /><span style={{ color: "hsl(var(--primary))" }}>where they are.</span></h2>
            <div className="hint" style={{ color: "rgb(0, 0, 0)" }}>What changes when you check in first
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" style={{ stroke: "rgb(0, 0, 0)" }} /><polyline points="12 5 19 12 12 19" style={{ stroke: "rgb(0, 0, 0)" }} /></svg>
            </div>
          </div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">01</div>
            <div className="lbl">You hear the quiet ones</div>
            <h3>Customers who need help reach you.</h3>
            <p>You get the signal — and the chance to act on it — before it ever becomes a bigger problem.</p>
          </div>
          <div className="vizC"><div className="link">Needs a hand <span className="pill">→ Your team</span></div></div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">02</div>
            <div className="lbl">Better relationships</div>
            <h3>A resolution makes an advocate.</h3>
            <p>A customer you helped is far more likely to champion you than one whose concerns went unheard.</p>
          </div>
          <div className="vizC"><div className="stars" data-vstars></div><div className="field">"You turned my week around — happy to recommend."</div></div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">03</div>
            <div className="lbl">A healthier profile</div>
            <h3>Fewer surprises in public.</h3>
            <p>The reviews that surface publicly come from customers who were genuinely ready to share.</p>
          </div>
          <div className="vizC"><div className="chips"><span className="chip2 sel">Ready ✓</span><span className="chip2">Public review</span></div></div>
        </article>
      </div>
    </section>);
}
