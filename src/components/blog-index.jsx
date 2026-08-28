// Revly blog — index.
//
// Two posts. No category filter and no newsletter form: there is nothing to filter yet
// and no list to subscribe anyone to, and a control that does nothing is worse than no
// control at all. Both come back when there is something behind them.
import React from 'react';
import { Navbar, Footer } from './components.jsx';

// Featured image: hand-drawn line art on a brand colour, drawn per post and stored as
// SVG so it stays sharp at any card size and weighs almost nothing.
function Cover({ post }) {
  return (
    <div className="bl-cover">
      <img src={post.cover} alt={post.coverAlt} loading="lazy" width="640" height="360" />
      <span className="bl-cover-cat">{post.category}</span>
    </div>
  );
}

export function PostCard({ post, headingLevel = 'h3' }) {
  const Heading = headingLevel;
  return (
    <a href={`/blog/${post.slug}/`} className="card bl-card">
      <Cover post={post} />
      <div className="bl-card-body">
        <Heading>{post.title}</Heading>
        <p>{post.excerpt}</p>
        <div className="bl-meta">
          <span>{post.author}</span>
          <span>{post.dateDisplay}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </a>
  );
}

export function BlogIndex({ posts }) {
  const [featured, ...rest] = posts;
  return (
    <>
      <Navbar />
      <main>
        <section className="bl-hero">
          <div className="container-x">
            <div className="bl-hero-grid">
              <div className="bl-hero-card">
                <span className="bl-mark" aria-hidden="true">R</span>
                <h1>Blog</h1>
                <p>
                  What we find in the review platforms' own documentation, checked against the source
                  and written down before we forget it.
                </p>
              </div>
              <PostCard post={featured} headingLevel="h2" />
            </div>
          </div>
        </section>

        {rest.length > 0 && (
          <section style={{ background: '#f6f6f4', padding: '3.5rem 0 5.5rem' }}>
            <div className="container-x">
              <div className="bl-grid">
                {rest.map((p) => <PostCard key={p.slug} post={p} headingLevel="h2" />)}
              </div>
            </div>
          </section>
        )}

        {/* Same ink band and same button pair as every other CTA on the site. */}
        <section className="section">
          <div className="container-x">
            <div className="ctaA">
              <h2 className="h2">All your software reviews <span style={{ color: '#f1057a' }}>in one place</span></h2>
              <p className="lead" style={{ color: 'rgba(255,255,255,0.75)', margin: '1rem auto 0', maxWidth: '46ch' }}>
                Revly collects reviews with one smart link, monitors every platform in a single
                dashboard, and drafts your replies so nothing sits unanswered.
              </p>
              <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                <a className="btn btn-default btn-lg" href="https://app.revly.io/signup">Start for free</a>
                <a className="btn btn-yellow btn-lg" href="/pricing/">See pricing</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
