// Revly — Manage Review Responses page redesign sections (Direction A treatment)
gsap.registerPlugin(ScrollTrigger);
const RESP_REPLY = "Thanks for the honest feedback! We've just reworked onboarding with a guided setup — I'd love to walk you through the features you missed.";

// ============ Response scrollytelling ============
function RespScrolly() {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      const needsChip = root.querySelector('[data-needs]');
      const review = root.querySelector('[data-review]');
      const reply = root.querySelector('[data-reply]');
      const replyText = root.querySelector('[data-replytext]');
      const post = root.querySelector('[data-post]');
      const status = root.querySelector('[data-status]');
      const progs = [...root.querySelectorAll('[data-prog]')];
      let lastStep = -1, typeTween = null;
      function reveal(el, show) {
        gsap.killTweensOf(el);
        const start = el.getBoundingClientRect().height;
        el.style.height = 'auto';
        const target = show ? el.offsetHeight : 0;
        el.style.height = start + 'px';
        gsap.to(el, { height: target, opacity: show ? 1 : 0, duration: 0.5, ease: 'power2.inOut', onComplete() { if (show) el.style.height = 'auto'; } });
      }
      function type(forward) {
        if (typeTween) typeTween.kill();
        if (forward) { const st = { n: 0 }; typeTween = gsap.to(st, { n: RESP_REPLY.length, duration: 1.1, ease: 'none', onUpdate() { replyText.innerHTML = RESP_REPLY.slice(0, Math.round(st.n)) + '<span class="caret"></span>'; }, onComplete() { replyText.innerHTML = RESP_REPLY; } }); }
        else { replyText.textContent = ''; }
      }
      function goToStep(i) {
        if (i === lastStep) return; const prev = lastStep; lastStep = i;
        needsChip.classList.toggle('on', i >= 1);
        reveal(review, i >= 1);
        reveal(reply, i >= 2);
        if (i >= 2 && prev < 2) type(true);
        if (i < 2 && prev >= 2) type(false);
        gsap.to(post, { opacity: i >= 3 ? 1 : 0.4, duration: 0.4 });
        status.textContent = i >= 3 ? 'Ready to post' : 'Needs reply';
        status.classList.toggle('ready', i >= 3);
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
  }, []);

  return (
    <section className="scrollyA" ref={rootRef}>
      <div className="container-x">
        <div className="head">
          <span className="eyebrow">How it works</span>
          <h2 className="h2">Every review, answered.<br /><span className="mag">In one click.</span></h2>
        </div>
        <div className="scrollyA-grid">
          <div className="mediaA">
            <div className="mock">
              <div className="mock-bar"><i></i><i></i><i></i><span className="lbl">Revly · Responses</span></div>
              <div className="mock-pad">
                <div className="rr-top">
                  <div className="rr-rating">4.4 <span className="rr-stars">★★★★☆</span></div>
                  <div className="rr-count"><b>248</b> reviews</div>
                </div>
                <div className="rr-filters">
                  <span className="rr-fchip">All</span>
                  <span className="rr-fchip" data-needs>Needs response</span>
                  <span className="rr-fchip">Responded</span>
                </div>
                <div className="rr-review ci-hide" data-review>
                  <div className="rr-head"><span className="rr-plat">G2</span><span className="rr-stars sm">★★★☆☆</span><span className="rr-status" data-status>Needs reply</span></div>
                  <p className="rr-text">"Solid tool, but onboarding felt rushed and I missed a few features early on."</p>
                </div>
                <div className="rr-reply ci-hide" data-reply>
                  <div className="rr-reply-inner">
                    <div className="rr-reply-tag">✦ Suggested reply · your voice</div>
                    <p className="rr-reply-text" data-replytext></p>
                  </div>
                </div>
                <div className="rr-post" data-post>Post on G2 →</div>
              </div>
            </div>
            <div className="progress"><span><b data-prog="0"></b></span><span><b data-prog="1"></b></span><span><b data-prog="2"></b></span><span><b data-prog="3"></b></span></div>
          </div>
          <div className="stepsA">
            <div className="stepA" data-step="0"><span className="n">1</span><h3>Every review in one place</h3><p>Revly pulls reviews from G2, Capterra, TrustRadius and more into one dashboard, synced every five minutes.</p></div>
            <div className="stepA" data-step="1"><span className="n">2</span><h3>Filter to what needs a reply</h3><p>See exactly what's waiting — no manual triage, no platform you forgot to check.</p></div>
            <div className="stepA" data-step="2"><span className="n">3</span><h3>Draft with AI, in your voice</h3><p>Revly suggests a reply matched to your brand voice from the first line. Edit it, or send it as-is.</p></div>
            <div className="stepA" data-step="3"><span className="n">4</span><h3>Go straight there to post</h3><p>One click takes you to the review on the platform. No searching, no extra logins.</p></div>
          </div>
        </div>
      </div>
    </section>);
}

// ============ Payoff gallery ============
function RespGallery() {
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
            <h2>Show up<br /><span style={{ color: "hsl(var(--primary))" }}>where it matters.</span></h2>
            <div className="hint">What changes when you reply
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">01</div>
            <div className="lbl">Nothing slips through</div>
            <h3>Every platform, one feed.</h3>
            <p>Filter to unresponded reviews in a click and see exactly what's waiting — across every platform.</p>
          </div>
          <div className="vizC"><div className="link">Needs response <span className="pill">5</span></div></div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">02</div>
            <div className="lbl">In your voice</div>
            <h3>Replies that sound like you.</h3>
            <p>AI drafts matched to your brand voice from the first line — not generic responses you rewrite.</p>
          </div>
          <div className="vizC"><div className="field">✦ "Thanks for the honest feedback — we've reworked onboarding…"</div></div>
        </article>
        <article className="panelC">
          <div>
            <div className="num">03</div>
            <div className="lbl">An AEO edge</div>
            <h3>The advantage most miss.</h3>
            <p>Your responses are indexable content on the high-authority domains AI answers actually cite.</p>
          </div>
          <div className="vizC"><div className="field"><span className="spk" style={{ fontSize: "1rem", marginRight: "0.4rem", verticalAlign: "-2px" }}>🔍</span>Cited in AI answers for "best review tool"</div></div>
        </article>
      </div>
    </section>);
}

Object.assign(window, { RespScrolly, RespGallery });
