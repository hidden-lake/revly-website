// Revly — 404 page
import React from 'react';
import { Navbar, Footer } from './components.jsx';

export function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "65vh", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--muted))", padding: "6rem 1.5rem" }}>
        <div style={{ textAlign: "center", maxWidth: "520px" }}>
          {/* Big decorative number */}
          <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "clamp(7rem, 20vw, 12rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "hsl(var(--primary)/0.12)", userSelect: "none", marginBottom: "-1rem" }}>404</div>
          <h1 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
            This page doesn't exist.
          </h1>
          <p style={{ color: "hsl(var(--foreground)/0.6)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "2rem" }}>
            It may have moved, or you may have followed a broken link. Either way, you can head back home from here.
          </p>
          <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" className="btn btn-default">Go home</a>
            <a href="/pricing" className="btn btn-outline">See pricing</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
