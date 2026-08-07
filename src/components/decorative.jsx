// Revly — Decorative product mockups.
//
// The mockups (sample dashboards, sample review feeds, the collection form preview)
// illustrate the product. They are not page copy, but in the static HTML they read
// exactly like it: AI answer engines were quoting our sample review text back as
// though real customers had written it about Revly.
//
// Mock renders the container server-side so layout and CSS are unchanged, and holds
// its contents back until the browser mounts. The sample text never reaches the
// static HTML. data-nosnippet tells Google not to use it in snippets or AI
// Overviews, and aria-hidden keeps screen readers from reading sample data as fact.
//
// Anything animating the inside of a mock must gate its effect on useMounted(),
// otherwise the effect runs before the inner elements exist.
import React from 'react';

// False on the server and through hydration, true once mounted in a browser.
export function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

// Renders as `as` (default div) with the className/props you pass, so it stands in
// for the mock container itself rather than wrapping it in an extra element.
// minHeight reserves the space the contents will take, so nothing jumps on mount.
export function Mock({ children, minHeight, style, as: Tag = 'div', ...rest }) {
  const mounted = useMounted();
  return (
    <Tag data-nosnippet aria-hidden="true" style={minHeight ? { minHeight, ...style } : style} {...rest}>
      {mounted ? children : null}
    </Tag>
  );
}
