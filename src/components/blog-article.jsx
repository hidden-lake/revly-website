// Revly blog — article shell.
//
// Renders one post from its `blocks` array. The visible FAQ and the FAQPage schema are
// built from the same `faqs` array in the post module, so the two cannot drift.
import React, { useState, useEffect } from 'react';
import { Navbar, Footer, Icon } from './components.jsx';
import { Graphic } from './blog-graphics.jsx';
import { Inline } from './blog-inline.jsx';
import { PostCard } from './blog-index.jsx';

// LinkedIn and X carry this audience; everything else is a copy-paste of the link.
// Both share targets are real hrefs built from the canonical URL, so they work whether
// or not the island has hydrated. Only the copy button needs JavaScript.
function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  // Clipboard access throws on insecure origins and when the browser blocks it. The
  // two share links still work, so a failure here is not worth surfacing.
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      /* no clipboard available */
    }
  }

  return (
    <div className="bl-share">
      <span className="bl-share-label">Share</span>
      <a
        className="bl-share-btn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
        target="_blank"
        rel="noopener"
        aria-label="Share this article on LinkedIn"
      >
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
          <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
        </svg>
      </a>
      <a
        className="bl-share-btn"
        href={`https://x.com/intent/post?url=${u}&text=${t}`}
        target="_blank"
        rel="noopener"
        aria-label="Share this article on X"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
          <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93zm-1.29 19.49h2.04L6.49 3.24H4.3z"/>
        </svg>
      </a>
      <button className="bl-share-btn" type="button" onClick={copy} aria-label="Copy a link to this article">
        {copied ? (
          <Icon name="check" size={17} />
        ) : (
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        )}
      </button>
      <span className="bl-share-status" role="status" aria-live="polite">{copied ? 'Link copied' : ''}</span>
    </div>
  );
}

function Byline({ author, dateDisplay, readTime, url, title }) {
  return (
    <div className="bl-byline">
      <span
        className="bl-avatar"
        aria-hidden="true"
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, color: 'hsl(var(--primary))', fontSize: '1.05rem' }}
      >
        R
      </span>
      <span>
        <strong>{author}</strong>
        Last updated {dateDisplay} · {readTime}
      </span>
      <ShareBar url={url} title={title} />
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return <p className="bl-lead"><Inline text={block.text} /></p>;
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'quote':
      return (
        <blockquote className="bl-quote">
          <p>"{block.text}"</p>
          <span className="bl-cite">
            {block.href ? <a href={block.href} target="_blank" rel="noopener">{block.cite}</a> : block.cite}
          </span>
        </blockquote>
      );
    case 'graphic':
      return <Graphic name={block.name} caption={block.caption} />;
    default:
      return <p><Inline text={block.text} /></p>;
  }
}

function ArticleFaq({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <section className="section bl-faq" style={{ padding: '4.5rem 0', background: 'hsl(var(--card))' }}>
      <div className="container-x bl-faq-inner">
        <h2 className="h2" style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: 'clamp(1.7rem, 3vw, 2.25rem)' }}>
          Common questions
        </h2>
        {items.map((it, i) => (
          <div key={it.q} className={'acc-item' + (open === i ? ' open' : '')}>
            <button className="acc-trigger" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{it.q}</span>
              <Icon name="chevron-down" size={20} />
            </button>
            <div className="acc-content">
              <div>{it.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BlogArticle({ post, next, url }) {
  const { title, excerpt, category, author, dateDisplay, readTime, blocks, faqs, cta } = post;
  return (
    <>
      <Navbar />
      <main>
        <article className="bl-article">
          <header className="bl-head">
            <div className="bl-crumbs">
              <a href="/blog/">Blog</a>
              <span className="sep" aria-hidden="true">/</span>
              <span className="cat">{category}</span>
            </div>
            <h1>{title}</h1>
            <p className="bl-standfirst">{excerpt}</p>
            <Byline author={author} dateDisplay={dateDisplay} readTime={readTime} url={url} title={title} />
          </header>

          <div className="bl-body">
            {blocks.map((b, i) => <Block key={i} block={b} />)}
          </div>
        </article>

        <ArticleFaq items={faqs} />

        {/* Full-width ink band, identical to the one closing every feature page.
            Kept outside .bl-body so article link styling never touches the buttons. */}
        <section className="section">
          <div className="container-x">
            <div className="ctaA">
              {/* One line, with the closing phrase in magenta. */}
              <h2 className="h2">
                {cta.headingTop} <span style={{ color: '#f1057a' }}>{cta.headingAccent}</span>
              </h2>
              <p className="lead" style={{ color: 'rgba(255,255,255,0.75)', margin: '1rem auto 0', maxWidth: '46ch' }}>{cta.body}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                <a className="btn btn-default btn-lg" href={cta.primary.href}>{cta.primary.label}</a>
                <a className="btn btn-yellow btn-lg" href={cta.secondary.href}>{cta.secondary.label}</a>
              </div>
            </div>
          </div>
        </section>

        {next && (
          <section className="section bl-next" style={{ padding: '4.5rem 0', background: '#f6f6f4' }}>
            <div className="container-x" style={{ maxWidth: '760px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                <h2 className="h2" style={{ fontSize: '1.7rem' }}>Keep reading</h2>
                <a href="/blog/" style={{ color: 'hsl(var(--primary))', fontWeight: 700, fontSize: '.95rem' }}>All articles &rarr;</a>
              </div>
              <PostCard post={next} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
