// Revly — Scroll-reveal treatments: Kinetic, Stack, Horizontal
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './components.jsx';

// ---------- math helpers ----------
const rvClamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rvLerp = (a, b, t) => a + (b - a) * t;
const rvEase = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function rvBg(token) {
  switch (token) {
    case "card": return "hsl(var(--card))";
    case "f6": return "#f6f6f4";
    case "muted": return "hsl(var(--muted))";
    case "accent": return "hsl(var(--accent))";
    case "ink": return "hsl(var(--foreground))";
    case "primary": return "hsl(var(--primary))";
    default: return "transparent";
  }
}
const rvDark = (token) => token === "ink" || token === "primary";

// ---------- hooks ----------
// Progress 0..1 across a tall wrapper's sticky runway. Per-instance listener.
function useRevealProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = Math.max(1, el.offsetHeight - vh);
      setP(rvClamp(-rect.top / denom, 0, 1));
    };
    // Compute synchronously on scroll (reliable even if rAF is throttled),
    // and also schedule a rAF pass to catch post-layout shifts.
    const onScroll = () => {
      compute();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

function useIsSmall(maxWidth) {
  const mq = "(max-width: " + (maxWidth || 900) + "px)";
  const [small, setSmall] = useState(
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia(mq).matches : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const m = window.matchMedia(mq);
    const fn = (e) => setSmall(e.matches);
    m.addEventListener ? m.addEventListener("change", fn) : m.addListener(fn);
    return () => { m.removeEventListener ? m.removeEventListener("change", fn) : m.removeListener(fn); };
  }, [mq]);
  return small;
}

function useMaxShift(trackRef, deps) {
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      setShift(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    // re-measure after fonts settle
    const id = setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(id); window.removeEventListener("resize", measure); };
  }, deps || []);
  return shift;
}

// ============================================================
// KINETIC — title sticky left, copy ignites line-by-line right
// ============================================================
export function KineticReveal({ title, lines = [], emphasized, bg = "accent", children }) {
  const wrapRef = useRef(null);
  const p = useRevealProgress(wrapRef);
  const small = useIsSmall(900);
  const dark = rvDark(bg);
  const background = rvBg(bg);
  const titleColor = dark ? "#fff" : "hsl(var(--foreground))";

  const N = Math.max(1, lines.length);
  const lineStyle = (i) => {
    const a = rvLerp(0.1, 0.66, i / N);
    const b = rvLerp(0.1, 0.66, (i + 1.25) / N);
    const t = small ? 1 : rvEase(rvClamp((p - a) / Math.max(0.0001, b - a), 0, 1));
    const op = rvLerp(0.18, 1, t);
    const color = dark
      ? "rgba(255,255,255," + rvLerp(0.3, 0.92, t).toFixed(3) + ")"
      : "hsl(0 0% " + Math.round(rvLerp(66, 12, t)) + "%)";
    return { opacity: op, color, transition: "color .12s linear, opacity .12s linear" };
  };
  // emphasized reveals last
  const eT = small ? 1 : rvEase(rvClamp((p - 0.6) / 0.25, 0, 1));
  const childT = small ? 1 : rvEase(rvClamp((p - 0.66) / 0.28, 0, 1));

  const titleBlock = (
    <div>
      <h2 className="h2" style={{ color: titleColor }}>{title}</h2>
    </div>
  );

  const bodyBlock = (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxWidth: "30rem" }}>
      {lines.map((ln, i) =>
        <p key={i} className="rv-kin-line" style={lineStyle(i)}>{ln}</p>
      )}
      {emphasized &&
        <p style={{
          marginTop: "0.4rem", fontFamily: "Bricolage Grotesque", fontWeight: 800,
          fontSize: "clamp(1.2rem,1.7vw,1.5rem)", lineHeight: 1.35,
          color: dark ? "#fff" : "hsl(var(--foreground))",
          opacity: rvLerp(0.12, 1, eT), transform: "translateY(" + rvLerp(14, 0, eT) + "px)",
          transition: "opacity .12s linear, transform .12s linear"
        }}>{emphasized}</p>}
      {children &&
        <div style={{ marginTop: "1.4rem", opacity: childT, transform: "translateY(" + rvLerp(20, 0, childT) + "px)", transition: "opacity .15s linear, transform .15s linear" }}>
          {children}
        </div>}
    </div>
  );

  if (small) {
    return (
      <section className="section" style={{ background }}>
        <div className="container-x" style={{ maxWidth: "760px" }}>
          <div style={{ marginBottom: "2rem" }}>{titleBlock}</div>
          {bodyBlock}
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapRef} style={{ height: "210vh", background, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center" }}>
        <div className="container-x" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: "clamp(2.5rem,6vw,6rem)", alignItems: "center", width: "100%" }}>
          {titleBlock}
          {bodyBlock}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STACK — title pinned at top, cards rise + stack tight below
// ============================================================
export function StackReveal({ title, subtitle, cards = [], bg = "muted" }) {
  const wrapRef = useRef(null);
  const p = useRevealProgress(wrapRef);
  const small = useIsSmall(900);
  const dark = rvDark(bg);
  const background = rvBg(bg);
  const N = Math.max(1, cards.length);
  const titleColor = dark ? "#fff" : "hsl(var(--foreground))";
  const subColor = dark ? "rgba(255,255,255,0.66)" : "hsl(var(--foreground) / 0.6)";

  const cardSurface = (emph) => ({
    background: dark ? "rgba(255,255,255,0.06)" : "hsl(var(--card))",
    border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid hsl(var(--border))",
    borderRadius: "1.25rem",
    boxShadow: dark ? "0 30px 70px -40px rgba(0,0,0,0.6)" : "0 26px 60px -34px rgba(0,0,0,0.26)",
    padding: "clamp(1.5rem,3.5vw,2.4rem)",
    width: "min(640px, 90vw)"
  });

  const cardInner = (c) => (
    <React.Fragment>
      {c.tag &&
        <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "0.74rem", letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "hsl(var(--secondary))" : "hsl(var(--primary))", marginBottom: "0.7rem" }}>{c.tag}</div>}
      <p style={{
        margin: 0,
        fontFamily: c.emph ? "Bricolage Grotesque" : "DM Sans",
        fontWeight: c.emph ? 800 : 500,
        fontSize: c.emph ? "clamp(1.25rem,2vw,1.7rem)" : "clamp(1.1rem,1.7vw,1.4rem)",
        lineHeight: c.emph ? 1.32 : 1.5,
        color: c.emph ? (dark ? "#fff" : "hsl(var(--foreground))") : (dark ? "rgba(255,255,255,0.9)" : "hsl(var(--foreground))")
      }}>{c.text}</p>
    </React.Fragment>
  );

  if (small) {
    return (
      <section className="section" style={{ background }}>
        <div className="container-x" style={{ maxWidth: "760px", textAlign: "center" }}>
          <h2 className="h2" style={{ color: titleColor }}>{title}</h2>
          {subtitle && <p className="lead" style={{ color: subColor, marginTop: "1rem" }}>{subtitle}</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
            {cards.map((c, i) =>
              <div key={i} style={{ ...cardSurface(c.emph), width: "100%", textAlign: "left" }}>{cardInner(c)}</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapRef} style={{ height: (N * 0.6 + 0.55) * 100 + "vh", background, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", paddingTop: "clamp(3rem,7vh,5rem)" }}>
        <div className="container-x" style={{ textAlign: "center", maxWidth: "760px" }}>
          <h2 className="h2" style={{ color: titleColor }}>{title}</h2>
          {subtitle && <p className="lead" style={{ color: subColor, marginTop: "1rem", marginLeft: "auto", marginRight: "auto", maxWidth: "620px" }}>{subtitle}</p>}
        </div>
        <div style={{ position: "relative", flex: 1, marginTop: "clamp(3rem,6vh,4.25rem)" }}>
          {cards.map((c, i) => {
            const seg = 1 / N;
            const local = rvClamp((p - i * seg * 0.82) / seg, 0, 1.2);
            const e = rvEase(rvClamp(local, 0, 1));
            let after = 0;
            for (let j = i + 1; j < N; j++) after += rvEase(rvClamp((p - j * seg * 0.82) / seg, 0, 1));
            const y = rvLerp(52, 0, e);          // vh from below
            const lift = after * 10;              // px upward as it recedes
            const scale = 1 - after * 0.045;
            const dim = rvClamp(after * 0.14, 0, 0.45);
            return (
              <div key={i} style={{
                position: "absolute", top: 0, left: "50%",
                transform: "translateX(-50%) translateY(calc(" + y + "vh - " + lift + "px)) scale(" + scale + ")",
                opacity: rvClamp(e, 0, 1),
                filter: "brightness(" + (1 - dim) + ")",
                zIndex: 10 + i,
                ...cardSurface(c.emph)
              }}>{cardInner(c)}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HORIZONTAL — section pins, story slides sideways
// ============================================================
export function HorizontalReveal({ title, intro, panels = [], bg = "ink" }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const p = useRevealProgress(wrapRef);
  const small = useIsSmall(900);
  const dark = rvDark(bg);
  const background = rvBg(bg);
  const maxShift = useMaxShift(trackRef, [panels.length]);
  const titleColor = dark ? "#fff" : "hsl(var(--foreground))";
  const bodyColor = dark ? "rgba(255,255,255,0.82)" : "hsl(var(--foreground) / 0.72)";
  const tagColor = dark ? "hsl(var(--secondary))" : "hsl(var(--primary))";

  const panelEls = panels.map((pn, i) => (
    <div key={i} className="rv-h-panel" style={{ width: pn.wide ? "56vw" : "50vw", minWidth: pn.wide ? "480px" : "440px", padding: "18vh clamp(2rem,5vw,5rem) 6vh", display: "flex", flexDirection: "column", justifyContent: "flex-start", flex: "0 0 auto" }}>
      {pn.icon &&
        <div style={{ width: "3rem", height: "3rem", borderRadius: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.4rem", background: dark ? "rgba(255,255,255,0.1)" : "hsl(var(--muted))", color: dark ? "hsl(var(--secondary))" : "hsl(var(--primary))" }}>
          <Icon name={pn.icon} size={24} />
        </div>}
      {pn.tag && <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: tagColor, marginBottom: "1rem" }}>{pn.tag}</div>}
      {pn.heading
        ? <h3 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "clamp(1.5rem,2.6vw,2.3rem)", lineHeight: 1.18, letterSpacing: "-0.02em", color: titleColor, maxWidth: "20ch" }}>{pn.heading}</h3>
        : <p style={{ fontFamily: "DM Sans", fontWeight: 500, fontSize: "clamp(1.15rem,1.7vw,1.6rem)", lineHeight: 1.5, color: bodyColor, maxWidth: "28ch" }}>{pn.text}</p>}
      {pn.heading && pn.text &&
        <p style={{ marginTop: "1.1rem", fontFamily: "DM Sans", fontSize: "clamp(1rem,1.3vw,1.2rem)", lineHeight: 1.6, color: bodyColor, maxWidth: "32ch" }}>{pn.text}</p>}
    </div>
  ));

  // Title panel sits first in the track
  const titlePanel = (
    <div className="rv-h-panel" style={{ width: "56vw", minWidth: "500px", padding: "18vh clamp(2rem,5vw,5rem) 6vh", display: "flex", flexDirection: "column", justifyContent: "flex-start", flex: "0 0 auto" }}>
      <h2 className="h2" style={{ fontSize: "clamp(2rem,4.2vw,3.4rem)", color: titleColor }}>{title}</h2>
      {intro && <p className="lead" style={{ color: bodyColor, marginTop: "1.4rem", maxWidth: "32ch" }}>{intro}</p>}
    </div>
  );

  if (small) {
    return (
      <section className="section" style={{ background }}>
        <div className="container-x" style={{ maxWidth: "760px" }}>
          <div style={{ color: titleColor, marginBottom: intro ? "1rem" : "2rem" }}><h2 className="h2">{title}</h2></div>
          {intro && <p className="lead" style={{ color: bodyColor, marginBottom: "2rem" }}>{intro}</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {panels.map((pn, i) =>
              <div key={i} style={{ borderTop: "1px solid " + (dark ? "rgba(255,255,255,0.16)" : "hsl(var(--border))"), paddingTop: "1.25rem" }}>
                {pn.tag && <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "0.74rem", letterSpacing: "0.1em", textTransform: "uppercase", color: tagColor, marginBottom: "0.5rem" }}>{pn.tag}</div>}
                {pn.heading && <h3 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.4rem", color: titleColor }}>{pn.heading}</h3>}
                <p style={{ color: bodyColor, fontSize: "1.05rem", lineHeight: 1.55 }}>{pn.text}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  const tx = -rvEase(p) * maxShift;
  const activeIdx = Math.round(p * panels.length);

  return (
    <div ref={wrapRef} style={{ height: Math.max(2.4, (panels.length + 1) * 0.72) * 100 + "vh", background, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div ref={trackRef} style={{ display: "flex", height: "100%", transform: "translateX(" + tx + "px)", willChange: "transform" }}>
          {titlePanel}
          {panelEls}
        </div>
        <div style={{ position: "absolute", bottom: "1.75rem", left: "50%", transform: "translateX(-50%)", width: "min(280px, 56vw)", height: "5px", borderRadius: "999px", background: "linear-gradient(to right, " + (dark ? "hsl(var(--secondary))" : "hsl(var(--primary))") + " " + (rvClamp(p, 0, 1) * 100).toFixed(1) + "%, " + (dark ? "rgba(255,255,255,0.18)" : "hsl(var(--foreground)/0.14)") + " " + (rvClamp(p, 0, 1) * 100).toFixed(1) + "%)", zIndex: 5 }}></div>
      </div>
    </div>
  );
}
