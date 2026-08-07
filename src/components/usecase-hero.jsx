// Revly — Who It's For animated hero.
import React from 'react';
import gsap from 'gsap';
import { Mock, useMounted } from './decorative.jsx';

export const SlackLogo = () => (
  <svg className="logo" viewBox="0 0 122.8 122.8" aria-hidden="true">
    <path d="M25.8 77.6a12.9 12.9 0 1 1-12.9-12.9h12.9zm6.5 0a12.9 12.9 0 0 1 25.8 0v32.3a12.9 12.9 0 0 1-25.8 0z" fill="#E01E5A"/>
    <path d="M45.2 25.8a12.9 12.9 0 1 1 12.9-12.9v12.9zm0 6.5a12.9 12.9 0 0 1 0 25.8H12.9a12.9 12.9 0 0 1 0-25.8z" fill="#36C5F0"/>
    <path d="M97 45.2a12.9 12.9 0 1 1 12.9 12.9H97zm-6.5 0a12.9 12.9 0 0 1-25.8 0V12.9a12.9 12.9 0 0 1 25.8 0z" fill="#2EB67D"/>
    <path d="M77.6 97a12.9 12.9 0 1 1-12.9 12.9V97zm0-6.5a12.9 12.9 0 0 1 0-25.8h32.3a12.9 12.9 0 0 1 0 25.8z" fill="#ECB22E"/>
  </svg>
);

function useWifSceneLoop(ref, mounted) {
  // Headline and copy are real content, so this runs straight away.
  React.useEffect(() => {
    const root = ref.current;
    if (!root || !gsap) return;
    const ctx = gsap.context(() => {
      gsap.from('.wif-copy > *', { opacity: 0, y: 24, duration: .8, stagger: .1, ease: 'power3.out', delay: .1 });
    }, root);
    return () => ctx.revert();
  }, []);

  // The scene lives inside a Mock, so it doesn't exist until after mount.
  React.useEffect(() => {
    const root = ref.current;
    if (!root || !gsap || !mounted) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const weak = root.querySelector('.ws-weak'), strong = root.querySelector('.ws-strong');
      if (!weak || !strong) return;
      if (reduce) { gsap.set(weak, { opacity: 0 }); gsap.set(strong, { opacity: 1 }); return; }
      gsap.set(strong, { opacity: 0, y: 14 }); gsap.set(weak, { opacity: 1, y: 0 });
      const tl = gsap.timeline({ repeat: -1, delay: .7 });
      tl.to({}, { duration: 2.2 })
        .to(weak, { opacity: 0, y: -14, duration: .5, ease: 'power2.in' })
        .to(strong, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }, '<0.12')
        .to({}, { duration: 3.1 })
        .to(strong, { opacity: 0, y: -14, duration: .5, ease: 'power2.in' })
        .to(weak, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }, '<0.12');
    }, root);
    return () => ctx.revert();
  }, [mounted]);
}

export function WifHero({ chip, headline, lead, cta, scene, tall }) {
  const ref = React.useRef(null);
  const mounted = useMounted();
  useWifSceneLoop(ref, mounted);
  return (
    <section className="wif-hero" ref={ref}>
      <div className="wif-inner">
        <div className="wif-copy">
          <div className="chip wif-chip chip-amber">{chip}</div>
          <h1 className="h1">{headline}</h1>
          <p className="lead">{lead}</p>
          <div className="wif-cta">
            <a className="btn btn-default btn-lg" href="/pricing">{cta}</a>
          </div>
        </div>
        <Mock className={"wif-scene" + (tall ? " tall" : "")} minHeight={tall ? "34rem" : "30rem"}>{scene}</Mock>
      </div>
    </section>
  );
}

const DASH_BARS = [
  ["Trustpilot", "#aeb4c0", "96%"],
  ["Shopify", "#ff2e8a", "84%"],
  ["G2", "#c0136a", "72%"],
  ["Capterra", "#e8237e", "64%"],
  ["Wordpress", "#8c1450", "52%"],
  ["WooCommerce", "#a01a5d", "44%"]];

export function RevlyDashboard({ id, revs, count, line }) {
  return (
    <div className="dash">
      <div className="dash-revs">
        <div className="drev-head"><span className="drh-t">Needs reply</span><span className="drh-c">{count}</span></div>
        {revs.map((r, i) =>
          <div className="drev" key={i}>
            <span className="drev-av" style={{ background: r.c, color: r.tc || '#fff' }}>{r.i}</span>
            <div className="drev-mid">
              <div className="drev-top"><b>{r.n}</b><span className="drev-plat">{r.p}</span></div>
              <span className="drev-st"><span className="on">{"★".repeat(r.s)}</span><span className="off">{"★".repeat(5 - r.s)}</span></span>
            </div>
            <span className="drev-flag">Needs reply</span>
          </div>
        )}
      </div>
      <div className="dash-charts">
        <div className="dchart grow">
          <div className="dchart-t">Reviews over time</div>
          <div className="dspark-wrap">
            <svg className="dspark" viewBox="0 0 300 70" preserveAspectRatio="none">
              <defs><linearGradient id={"dg" + id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f1057a" stopOpacity="0.18" /><stop offset="1" stopColor="#f1057a" stopOpacity="0" /></linearGradient></defs>
              <path className="darea" fill={"url(#dg" + id + ")"} d={line.a} />
              <path className="dline" d={line.l} />
            </svg>
          </div>
          <div className="dmonths"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
        </div>
        <div className="dchart">
          <div className="dchart-t">Reviews by platform</div>
          <div className="dbars">
            {DASH_BARS.map(([n, c, w]) =>
              <div className="dbar" key={n}><span className="dbl">{n}</span><span className="dbt"><i style={{ width: w, background: c }}></i></span></div>
            )}
          </div>
        </div>
      </div>
    </div>);
}

export const wifSaasScene = (
  <div className="wif-frame">
    <div className="wif-state ws-weak">
      <span className="wif-slab slab-weak">Without Revly <span className="met">· Monday, 8:42am</span></span>
      <div className="scatter">
        <span className="dcard slackcard" style={{ top: '6px', left: '60px', transform: 'rotate(-3deg)', zIndex: 6 }}>
          <span className="dh"><SlackLogo /> #marketing <span className="src">Slack</span></span>
          <span className="db">"did anyone ever reply to that G2 review?? 😬"</span>
        </span>
        <span className="dcard" style={{ top: '148px', left: '0', transform: 'rotate(-5deg)', zIndex: 5, width: '198px' }}>
          <span className="dh"><span className="stars">★☆☆☆☆</span> <span className="src">G2</span></span>
          <span className="db"><span className="warn">Missed.</span> 3 weeks old, still no reply <span className="em">😭</span></span>
        </span>
        <span className="dcard" style={{ top: '236px', left: '8px', transform: 'rotate(-9deg)', zIndex: 2, width: '178px' }}>
          <span className="dh"><span className="stars">★☆☆☆☆</span> <span className="src">Trustpilot</span></span>
          <span className="db"><span className="warn">Public 1★</span>, no response yet 🫠</span>
        </span>
        <span className="dcard" style={{ top: '292px', left: '150px', transform: 'rotate(4deg)', zIndex: 4, width: '186px' }}>
          <span className="dh"><span className="stars">★★☆☆☆</span> <span className="src">Capterra</span></span>
          <span className="db">5 months old, <span className="warn">never replied</span> 🫠</span>
        </span>
        <span className="dcard" style={{ top: '420px', left: '92px', transform: 'rotate(6deg)', zIndex: 1, width: '208px' }}>
          <span className="dh">Inbox <span className="src">Email</span></span>
          <span className="db"><span className="warn">47 unread</span> review alerts piling up 😵‍💫</span>
        </span>
      </div>
    </div>
    <div className="wif-state ws-strong">
      <span className="wif-slab slab-strong">With Revly <span className="met">· your dashboard</span></span>
      <RevlyDashboard id="saas" count="3"
        revs={[
        { i: "M", n: "Maria O.", p: "G2", c: "#f0047f", s: 2 },
        { i: "D", n: "Devon R.", p: "Capterra", c: "#f5b301", tc: "#5a3a00", s: 3 },
        { i: "P", n: "Priya S.", p: "Trustpilot", c: "#2bb673", s: 4 }]}
        line={{ l: "M0,44 C28,38 48,34 74,34 C100,34 116,44 150,48 C182,52 202,42 232,32 C262,23 282,22 300,24", a: "M0,44 C28,38 48,34 74,34 C100,34 116,44 150,48 C182,52 202,42 232,32 C262,23 282,22 300,24 L300,70 L0,70 Z" }} />
    </div>
  </div>
);

export const wifAgencyScene = (
  <div className="wif-frame">
    <div className="wif-state ws-weak">
      <span className="wif-slab slab-weak">Without Revly <span className="met">· 12 clients</span></span>
      <div className="scatter">
        <span className="dcard" style={{ top: '0', left: '0', transform: 'rotate(-4deg)', zIndex: 6, width: '206px' }}>
          <span className="dh">Acme <span className="src">G2</span></span>
          <span className="db"><span className="stars">★☆☆☆☆</span> <span className="warn">missed a 1★ review</span> <span className="em">😭</span></span>
        </span>
        <span className="dcard" style={{ top: '104px', left: '160px', transform: 'rotate(5deg)', zIndex: 5, width: '184px' }}>
          <span className="dh">Bolt <span className="src">Capterra</span></span>
          <span className="db"><span className="warn">Unanswered for 3 months</span> 🫠</span>
        </span>
        <span className="dcard" style={{ top: '150px', left: '22px', transform: 'rotate(7deg)', zIndex: 2, width: '182px' }}>
          <span className="dh">Vertex <span className="src">Trustpilot</span></span>
          <span className="db">2 public 1★, <span className="warn">no reply</span> 😬</span>
        </span>
        <span className="dcard" style={{ top: '244px', left: '0', transform: 'rotate(3deg)', zIndex: 4, width: '198px' }}>
          <span className="dh">Nimbus <span className="src">App Store</span></span>
          <span className="db">5 new reviews, <span className="warn">nobody saw them</span> 😬</span>
        </span>
        <span className="dcard" style={{ top: '342px', left: '166px', transform: 'rotate(-5deg)', zIndex: 3, width: '176px' }}>
          <span className="dh">Orbit <span className="src">Report day</span></span>
          <span className="db">Client wants numbers, <span className="warn">data's a week stale</span></span>
        </span>
        <span className="dcard" style={{ top: '452px', left: '40px', transform: 'rotate(-7deg)', zIndex: 1, width: '196px' }}>
          <span className="dh">Lumen <span className="src">Google Play</span></span>
          <span className="db"><span className="warn">14 unanswered</span> across 3 clients 😵‍💫</span>
        </span>
      </div>
    </div>
    <div className="wif-state ws-strong">
      <span className="wif-slab slab-strong">With Revly <span className="met">· one dashboard</span></span>
      <RevlyDashboard id="agency" count="6"
        revs={[
        { i: "A", n: "Acme", p: "G2", c: "#f0047f", s: 2 },
        { i: "B", n: "Bolt", p: "Capterra", c: "#f5b301", tc: "#5a3a00", s: 3 },
        { i: "N", n: "Nimbus", p: "App Store", c: "#2bb673", s: 1 }]}
        line={{ l: "M0,50 C30,46 50,40 76,40 C102,40 118,30 150,30 C184,30 204,40 232,38 C262,36 282,22 300,16", a: "M0,50 C30,46 50,40 76,40 C102,40 118,30 150,30 C184,30 204,40 232,38 C262,36 282,22 300,16 L300,70 L0,70 Z" }} />
    </div>
  </div>
);
