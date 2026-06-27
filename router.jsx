// Tiny history router — real, crawlable URLs for static hosting.
// Works on GitHub Pages via the 404.html SPA fallback (see 404.html + index.html restore script).
const RouterCtx = React.createContext({ pathname: "/" });

// Old pre-redesign static pages → new SPA routes. Preserves any link equity
// from URLs Google already indexed before the redesign.
const LEGACY_REDIRECTS = {
  "/index.html": "/",
  "/features.html": "/",
  "/pricing.html": "/pricing",
  "/privacy.html": "/privacy",
  "/terms.html": "/terms",
  "/use-cases/saas.html": "/use-cases/saas",
  "/use-cases/agencies.html": "/use-cases/agencies",
  "/use-cases/ecommerce.html": "/use-cases/saas",
  "/use-cases/local-business.html": "/use-cases/saas",
};

function currentPath() {
  const p = window.location.pathname || "/";
  // Normalize trailing slashes so /pricing/ matches the /pricing route.
  return p.length > 1 ? p.replace(/\/+$/, "") || "/" : p;
}

function navigate(to, replace) {
  if (replace) window.history.replaceState({}, "", to);
  else window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("spa:navigate"));
}

function BrowserRouter({ children }) {
  const [pathname, setPathname] = React.useState(currentPath());
  React.useEffect(() => {
    const onChange = () => setPathname(currentPath());
    window.addEventListener("popstate", onChange);
    window.addEventListener("spa:navigate", onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener("spa:navigate", onChange);
    };
  }, []);
  // Redirect any legacy .html path to its new route, keeping query + fragment
  // so UTM attribution and anchors survive the redirect.
  React.useEffect(() => {
    const dest = LEGACY_REDIRECTS[pathname];
    if (dest && dest !== pathname) navigate(dest + window.location.search + window.location.hash, true);
  }, [pathname]);
  return <RouterCtx.Provider value={{ pathname, setPathname }}>{children}</RouterCtx.Provider>;
}

function useLocation() {
  const { pathname } = React.useContext(RouterCtx);
  return { pathname };
}

function matchPath(pattern, pathname) {
  if (pattern === "*") return true;
  if (pattern === pathname) return true;
  // Support :param segments — e.g. /blog/:slug matches /blog/anything
  if (pattern.includes(":")) {
    const pp = pattern.split("/").filter(Boolean);
    const ap = pathname.split("/").filter(Boolean);
    if (pp.length !== ap.length) return false;
    for (let i = 0; i < pp.length; i++) {
      if (pp[i].startsWith(":")) continue;
      if (pp[i] !== ap[i]) return false;
    }
    return true;
  }
  return false;
}

function Routes({ children }) {
  const { pathname } = React.useContext(RouterCtx);
  const arr = React.Children.toArray(children);
  // First exact match
  for (const ch of arr) {
    if (ch.props.path !== "*" && matchPath(ch.props.path, pathname)) return ch.props.element;
  }
  // Fallback
  for (const ch of arr) {
    if (ch.props.path === "*") return ch.props.element;
  }
  return null;
}

function Route() { return null; }

function Link({ to, children, onClick: userOnClick, ...rest }) {
  const external = typeof to === "string" && (/^https?:|^mailto:|^tel:/.test(to));
  const onClick = (e) => {
    // Run the caller's handler first (e.g. closing a dropdown), then navigate.
    if (typeof userOnClick === "function") userOnClick(e);
    if (external || e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={onClick} {...rest}>{children}</a>;
}

// HashRouter kept as an alias of BrowserRouter for backward compatibility.
window.ReactRouterDOM = { BrowserRouter, HashRouter: BrowserRouter, Routes, Route, Link, useLocation, navigate };
