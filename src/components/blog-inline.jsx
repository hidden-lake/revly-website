// Revly blog — minimal inline markup for authored copy.
//
// Post bodies are plain strings so the copy stays readable and editable in
// src/content/. Two constructs only: **bold** and [label](href). Anything else is
// rendered as literal text, which keeps a stray bracket in the copy from silently
// disappearing from the page.
import React from 'react';

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

// External links get target and rel; internal ones stay in the tab.
function Link({ href, children }) {
  const external = /^https?:\/\//.test(href) && !href.startsWith('https://revly.io');
  return external
    ? <a href={href} target="_blank" rel="noopener">{children}</a>
    : <a href={href}>{children}</a>;
}

export function Inline({ text }) {
  if (!text) return null;
  const parts = String(text).split(TOKEN).filter((p) => p !== '');
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          return <Link key={i} href={link[2]}>{link[1]}</Link>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}
