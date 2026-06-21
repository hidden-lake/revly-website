// Revly — Direction C feature hero: kinetic headline + looping "before → with Revly" morph card.
// Exposes window.FeatureHeroC; used by products.jsx for all four feature pages.

function useHeroMorphLoop(rootRef) {
  React.useEffect(() => {
    const root = rootRef.current;
    const gsap = window.gsap;
    if (!root || !gsap) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.from('.hc2-copy > *', { opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.1 });
      const weak = root.querySelector('.hd-weak');
      const strong = root.querySelector('.hd-strong');
      if (!weak || !strong) return;
      if (reduce) { gsap.set(weak, { opacity: 0 }); gsap.set(strong, { opacity: 1 }); return; }
      gsap.set(strong, { opacity: 0, y: 12 });
      gsap.set(weak, { opacity: 1, y: 0 });
      const tl = gsap.timeline({ repeat: -1, delay: 0.7 });
      tl.to({}, { duration: 1.8 })
        .to(weak, { opacity: 0, y: -12, duration: 0.5, ease: 'power2.in' })
        .to(strong, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '<0.12')
        .to({}, { duration: 2.8 })
        .to(strong, { opacity: 0, y: -12, duration: 0.5, ease: 'power2.in' })
        .to(weak, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '<0.12');
    }, root);
    return () => ctx.revert();
  }, []);
}

const HERO_MORPHS = {
  collect: (
    <div className="hc2-morph">
      <div className="frame with-stars" style={{ minHeight: "200px" }}>
        <div className="st">★★★★★</div>
        <div className="hd-state hd-weak"><span className="mlbl lbl-weak">Without Revly</span><p className="hd-q-weak">"Great tool."</p></div>
        <div className="hd-state hd-strong"><span className="mlbl lbl-strong">With Revly</span><p className="hd-q-strong">"Acme cut our weekly reporting from half a day to twenty minutes. The unified dashboard means I stopped checking five tabs every morning — and onboarding took ten."</p></div>
      </div>
    </div>
  ),
  monitor: (
    <div className="hc2-morph">
      <div className="frame" style={{ minHeight: "224px" }}>
        <div className="hd-state hd-weak">
          <span className="mlbl lbl-weak">Without Revly <span className="met">· 5 tabs open</span></span>
          <div className="mess">
            <span className="tab t1"><b>G2</b> 3 unread <i className="badge">3</i></span>
            <span className="tab t2"><b>Capterra</b> 1 missed <i className="badge">1</i></span>
            <span className="tab t3"><b>App&nbsp;Store</b> ? <i className="badge">!</i></span>
            <span className="tab t4"><b>Trustpilot</b> 2 new <i className="badge">2</i></span>
            <span className="tab t5"><b>WordPress</b> ?</span>
          </div>
        </div>
        <div className="hd-state hd-strong">
          <span className="mlbl lbl-strong">With Revly <span className="met">· one live feed</span></span>
          <div className="mlist">
            <div className="mrow on"><span className="mp">G2</span> Maria O. <span className="mst">★★★★★</span> <span className="mtime">just now</span></div>
            <div className="mrow on"><span className="mp">Capterra</span> Jonas P. <span className="mst">★★★★</span> <span className="mtime">4m</span></div>
            <div className="mrow on"><span className="mp">App Store</span> Devon R. <span className="mst">★★★★★</span> <span className="mtime">12m</span></div>
          </div>
        </div>
      </div>
    </div>
  ),
  routing: (
    <div className="hc2-morph">
      <div className="frame with-stars" style={{ minHeight: "212px" }}>
        <div className="qh">How was your experience with Acme?</div>
        <div className="hd-state hd-weak">
          <span className="mlbl lbl-care">Need help → your team</span>
          <p className="rate"><span className="on">★★</span><span className="off">★★★</span></p>
          <div className="bubble strong"><span className="who">We're on it.</span> Routed privately to support — "Hi Maria, let's get that import issue sorted today."</div>
        </div>
        <div className="hd-state hd-strong">
          <span className="mlbl lbl-strong">Delighted → public review</span>
          <p className="rate"><span className="on">★★★★★</span></p>
          <div className="bubble strong"><span className="who">Love that!</span> Invited to share on G2 — one happy customer becomes one public advocate.</div>
        </div>
      </div>
    </div>
  ),
  manage: (
    <div className="hc2-morph">
      <div className="frame" style={{ minHeight: "200px" }}>
        <div className="hd-state hd-weak">
          <span className="mlbl lbl-weak">Blank box <span className="met">· ~5 min each</span></span>
          <div className="bubble weak">"Thanks for the feedback!"<br /><span style={{ opacity: .6 }}>…staring at the cursor for the other 14 reviews.</span></div>
        </div>
        <div className="hd-state hd-strong">
          <span className="mlbl lbl-strong">AI-drafted <span className="met">· ~20 sec each</span></span>
          <div className="bubble strong">Thanks Devon — you're right that onboarding felt rushed, and we've since added a guided setup. I'd love to walk you through the parts you missed; I'll follow up directly.</div>
        </div>
      </div>
    </div>
  )
};

const HERO_CONFIGS = {
  collect: {
    chip: "GET HIGH QUALITY REVIEWS", chipClass: "chip-amber",
    headline: <>Turn <span className="kw">"great tool"</span> into a<br />review that <span className="pay">converts.</span></>,
    lead: "Your customers know why they love you. Revly's AI writing assistance helps them say it — specific, detailed, and on the platform that needs it most.",
    ctas: <a className="btn btn-yellow btn-lg" href="#/pricing">Start collecting quality reviews</a>
  },
  monitor: {
    chip: "SEE EVERY REVIEW", chipClass: "chip-amber",
    headline: <>Turn <span className="kw">five open tabs</span><br />into <span className="pay">one dashboard.</span></>,
    lead: "Reviews land across G2, Capterra, the app stores and more. Revly pulls every one into a single live feed — so nothing slips past you again.",
    ctas: <a className="btn btn-yellow btn-lg" href="#/pricing">See all your reviews in one place</a>
  },
  routing: {
    chip: "SMART FEEDBACK ROUTING", chipClass: "chip-pink",
    headline: <>Turn <span className="kw">one star rating</span><br />into <span className="pay">the right conversation.</span></>,
    lead: "Ask for a rating first. Customers who are thrilled get invited to post publicly; anyone who needs help reaches your team directly — so you can help them first and win them back.",
    ctas: <>
      <a className="btn btn-default btn-lg" href="#/pricing">See how routing works</a>
      <a className="btn btn-yellow btn-lg" href="#/pricing">Get started for free</a>
    </>
  },
  manage: {
    chip: "REPLY TO ALL REVIEWS", chipClass: "chip-amber",
    headline: <>Turn <span className="kw">a blank reply box</span> into an<br />on-brand response in <span className="pay">seconds.</span></>,
    lead: "Every review deserves a reply, but the blank box eats your day. Revly drafts a tailored, on-brand response you can review and send in one click.",
    ctas: <a className="btn btn-yellow btn-lg" href="#/pricing">Reply to every review faster</a>
  }
};

function FeatureHeroC({ variant }) {
  const cfg = HERO_CONFIGS[variant];
  const ref = React.useRef(null);
  useHeroMorphLoop(ref);
  if (!cfg) return null;
  return (
    <section className="hero-c2" ref={ref}>
      <div className="hc2-inner">
        <div className="hc2-copy">
          <div className={"chip " + cfg.chipClass} style={{ display: "inline-flex" }}>{cfg.chip}</div>
          <h1 className="h1">{cfg.headline}</h1>
          <p className="lead">{cfg.lead}</p>
          <div className="hc2-cta">{cfg.ctas}</div>
        </div>
        {HERO_MORPHS[variant]}
      </div>
    </section>
  );
}

Object.assign(window, { FeatureHeroC });
