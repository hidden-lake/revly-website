// Revly — Claude MCP page sections (scrollytelling + payoff gallery)
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mock, useMounted } from './decorative.jsx';
gsap.registerPlugin(ScrollTrigger);

export function McpScrolly() {
  const rootRef = React.useRef(null);
  // The mock's innards only exist after mount, so the timeline waits for them.
  const mounted = useMounted();
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;
    const ctx = gsap.context(() => {
      const nodes = [...root.querySelectorAll('[data-node]')];
      const wire = root.querySelector('[data-wire]');
      const q = root.querySelector('[data-q]');
      const a = root.querySelector('[data-a]');
      const rep = root.querySelector('[data-rep]');
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
        nodes.forEach((n, ni) => {
          const on = i >= 0;
          if (n.classList.contains('on') !== on) {
            n.classList.toggle('on', on);
            if (on && prev < 0) gsap.fromTo(n, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, delay: ni * 0.1, ease: 'back.out(2)' });
          }
        });
        wire.style.width = i >= 0 ? '100%' : '0';
        reveal(q, i >= 1);
        reveal(a, i >= 2);
        reveal(rep, i >= 3);
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
          <h2 className="h2">Ask a question.<br /><span className="mag">Get an answer from your reviews.</span></h2>
        </div>
        <div className="scrollyA-grid">
          <div className="mediaA">
            <Mock className="cmp mock" minHeight="22rem">
              <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">Claude · Revly connector</span></div>
              <div className="mock-pad">
                <div className="mcp-conn">
                  <span className="mcp-logo" data-node><img src="/assets/claude-icon.png" alt="Claude" style={{ height: "34px", borderRadius: "9px" }} /><img src="/assets/chatgpt-icon.png" alt="ChatGPT" style={{ height: "34px", marginLeft: ".45rem" }} /></span>
                  <span className="mcp-wire"><b data-wire></b></span>
                  <span className="mcp-logo" data-node><img src="/assets/revly-wordmark.png" alt="Revly" style={{ height: "26px" }} /></span>
                </div>
                <div className="mcp-thread">
                  <div className="mcp-q" data-q>
                    <div className="mcp-you">Which features do five-star reviewers mention most this quarter, and what exact words do they use?</div>
                  </div>
                  <div className="mcp-a" data-a>
                    <div>
                      <span className="mcp-tool">✦ revly · search_reviews</span>
                      <div className="mcp-ans">
                        <p>Across 84 five-star reviews this quarter: onboarding speed (31), the unified dashboard (24), Slack alerts (11).</p>
                        <div className="mcp-quote">"I stopped checking five tabs every morning. Everything shows up in one feed within minutes."</div>
                        <div className="mcp-cite">Devon R. · G2 · 12 Mar</div>
                      </div>
                    </div>
                  </div>
                  <div className="mcp-rep" data-rep>
                    <div className="mcp-rep-inner"><span className="tag">Saved</span>Quarterly voice-of-customer summary → run again next quarter</div>
                  </div>
                </div>
              </div>
            </Mock>
            <div className="progress"><span><b data-prog="0"></b></span><span><b data-prog="1"></b></span><span><b data-prog="2"></b></span><span><b data-prog="3"></b></span></div>
          </div>
          <div className="stepsA">
            <div className="stepA"><span className="n">1</span><h3>Connect Revly to Claude once</h3><p>Add the Revly connector in Claude or ChatGPT, authorise your account, and your review data is available. No exports, no scripts, no data pipeline to maintain.</p></div>
            <div className="stepA"><span className="n">2</span><h3>Ask in plain language</h3><p>No query syntax or dashboard filters to learn. Ask the question the way you'd ask a colleague who had read every review.</p></div>
            <div className="stepA"><span className="n">3</span><h3>Claude answers from your real data</h3><p>Answers come from your actual reviews and collection data, with the quotes and sources attached, so you can check the claim and lift the line straight into your copy.</p></div>
            <div className="stepA"><span className="n">4</span><h3>Fold it into how you already work</h3><p>Build the analysis into your reporting flow, rerun it each quarter, or use it mid-draft while you're writing a landing page. Claude does the fetching; you keep the judgement.</p></div>
          </div>
        </div>
      </div>
    </section>);
}

export function McpGallery() {
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
            <h2>Everything your customers said,<br /><span style={{ color: "hsl(var(--primary))" }}>one question away.</span></h2>
            <div className="hint">What you can ask
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">01</div>
            <div className="lbl">Quotes on demand</div>
            <h3>The right line, while you're writing.</h3>
            <p>Ask for the strongest quote about onboarding, or something an agency said about client reporting. Use it on the landing page, in the ad, in the deck, sourced and attributable.</p>
          </div>
          <Mock className="vizC"><div className="field">"Find me three quotes about time saved, from reviewers at agencies."</div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">02</div>
            <div className="lbl">Reporting without the export</div>
            <h3>Reports built the way you think.</h3>
            <p>Rating trends by platform, response coverage, month over month movement. Ask once, refine in the same conversation, and rerun it whenever you need the update.</p>
          </div>
          <Mock className="vizC"><div className="link">Q3 review summary <span className="pill">no CSV</span></div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">03</div>
            <div className="lbl">Collection diagnostics</div>
            <h3>See where collection breaks down.</h3>
            <p>Your collection data is queryable too. Find which links convert, where customers drop out, which segments never finish, then fix the step that's costing you reviews.</p>
          </div>
          <Mock className="vizC"><div className="field">Link opens 412 → ratings 260 → posted 88. Drop-off: platform step.</div></Mock>
        </article>
        <article className="panelC">
          <div>
            <div className="num">04</div>
            <div className="lbl">Voice of customer</div>
            <h3>Their words, not your positioning.</h3>
            <p>How customers describe the features, the benefits, and the parts that frustrate them. That language belongs in your copy. It already convinces people.</p>
          </div>
          <Mock className="vizC"><div className="field">Top phrase: "stopped checking five tabs" (14 reviews)</div></Mock>
        </article>
      </div>
    </section>);
}
