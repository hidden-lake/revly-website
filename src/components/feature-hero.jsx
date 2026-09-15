// Revly — Direction C feature hero: kinetic headline + looping "before → with Revly" morph card.
import React from 'react';
import gsap from 'gsap';
import { Mock, useMounted } from './decorative.jsx';

function useHeroMorphLoop(rootRef, mounted) {
  // Headline and copy are real content, so this runs straight away.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !gsap) return;
    const ctx = gsap.context(() => {
      gsap.from('.hc2-copy > *', { opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.1 });
    }, root);
    return () => ctx.revert();
  }, []);

  // The morph card lives inside a Mock, so it doesn't exist until after mount.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !gsap || !mounted) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
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
  }, [mounted]);
}

const HERO_MORPHS = {
  collect: (
    <Mock className="hc2-morph" minHeight="240px">
      <div className="frame with-stars" style={{ minHeight: "200px" }}>
        <div className="st">★★★★★</div>
        <div className="hd-state hd-weak"><span className="mlbl lbl-weak">Without Revly</span><p className="hd-q-weak">"Great tool."</p></div>
        <div className="hd-state hd-strong"><span className="mlbl lbl-strong">With Revly</span><p className="hd-q-strong">"Acme cut our weekly reporting from half a day to twenty minutes. The unified dashboard means I stopped checking five tabs every morning, and onboarding took ten."</p></div>
      </div>
    </Mock>
  ),
  monitor: (
    <Mock className="hc2-morph" minHeight="240px">
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
    </Mock>
  ),
  manage: (
    <Mock className="hc2-morph" minHeight="240px">
      <div className="frame" style={{ minHeight: "200px" }}>
        <div className="hd-state hd-weak">
          <span className="mlbl lbl-weak">Blank box <span className="met">· ~5 min each</span></span>
          <div className="bubble weak">"Thanks for the feedback!"<br /><span style={{ opacity: .6 }}>…staring at the cursor for the other 14 reviews.</span></div>
        </div>
        <div className="hd-state hd-strong">
          <span className="mlbl lbl-strong">AI-drafted <span className="met">· ~20 sec each</span></span>
          <div className="bubble strong">Thanks Devon, you're right that onboarding felt rushed, and we've since added a guided setup. I'd love to walk you through the parts you missed; I'll follow up directly.</div>
        </div>
      </div>
    </Mock>
  )
};

const HERO_CONFIGS = {
  collect: {
    chip: "GET HIGH QUALITY REVIEWS", chipClass: "chip-amber",
    headline: <>Turn <span className="kw">"great tool"</span> into a<br />review that <span className="pay">converts.</span></>,
    lead: "Revly checks in with your customer, points anyone who needs help to your team, then helps everyone else expand a quick thought into a detailed review in their own words, on the platform where it does the most good.",
    ctas: <><a className="btn btn-yellow btn-lg" href="/pricing/">Start collecting better reviews</a><a className="btn btn-outline btn-lg" href="/pricing/">Book a demo</a></>
  },
  monitor: {
    chip: "SEE EVERY REVIEW", chipClass: "chip-amber",
    headline: <>Turn <span className="kw">five open tabs</span><br />into <span className="pay">one dashboard.</span></>,
    lead: <>Reviews land across G2, Capterra, and the app stores. Revly pulls every one into a single feed and <strong>posts each new review to Slack</strong>, so nobody has to remember to check.</>,
    ctas: <><a className="btn btn-yellow btn-lg" href="/pricing/">See all your reviews in one place</a><a className="btn btn-outline btn-lg" href="/pricing/">Book a demo</a></>
  },
  embed: {
    chip: "SHOW YOUR REVIEWS OFF", chipClass: "chip-amber",
    headline: <>Turn <span className="kw" style={{ color: "#12121252" }}>review quotes</span><br />into <span className="pay">proof on your site.</span></>,
    lead: "Your best feedback lives on external platforms. Revly turns it into automatically updated widgets that match your brand.",
    ctas: <a className="btn btn-yellow btn-lg" href="/pricing/">Start showing your reviews</a>
  },
  mcp: {
    chip: "REVLY MCP FOR CLAUDE AND CHATGPT", chipClass: "chip-pink",
    headline: <>Turn <span className="kw">your review data</span><br />into <span className="pay">answers in Claude.</span></>,
    lead: "Connect Revly to Claude or ChatGPT and ask about your reviews in plain language. Instantly find the perfect quote for a campaign, find out where collection breaks down, surface how customers describe your product in their own words.",
    ctas: <a className="btn btn-yellow btn-lg" href="/pricing/">Get your review data in Claude</a>
  },
  manage: {
    chip: "REPLY TO ALL REVIEWS", chipClass: "chip-amber",
    headline: <>Turn <span className="kw">a blank reply box</span> into an<br />on-brand response in <span className="pay">seconds.</span></>,
    lead: "Every review deserves a reply, but the blank box eats your day. Revly drafts a tailored, on-brand response you can review and send in one click.",
    ctas: <a className="btn btn-yellow btn-lg" href="/pricing/">Reply to every review faster</a>
  }
};

export function FeatureHeroC({ variant }) {
  const cfg = HERO_CONFIGS[variant];
  const ref = React.useRef(null);
  const mounted = useMounted();
  useHeroMorphLoop(ref, mounted);
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
