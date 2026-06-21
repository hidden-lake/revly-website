// Tiny HashRouter — replaces react-router-dom for static hosting
const RouterCtx = React.createContext({ pathname: "/" });

function HashRouter({ children }) {
  const get = () => {
    const h = window.location.hash || "#/";
    return h.startsWith("#") ? h.slice(1) || "/" : "/";
  };
  const [pathname, setPathname] = React.useState(get());
  React.useEffect(() => {
    const onChange = () => setPathname(get());
    window.addEventListener("hashchange", onChange);
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return <RouterCtx.Provider value={{ pathname, setPathname }}>{children}</RouterCtx.Provider>;
}

function useLocation() {
  const { pathname } = React.useContext(RouterCtx);
  return { pathname };
}

function navigate(to) {
  window.location.hash = "#" + to;
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

function Link({ to, children, ...rest }) {
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={"#" + to} onClick={onClick} {...rest}>{children}</a>;
}

window.ReactRouterDOM = { HashRouter, Routes, Route, Link, useLocation, navigate };
