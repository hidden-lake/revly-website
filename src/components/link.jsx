import React from 'react';
export function Link({ to, children, className, style, onClick, ...rest }) {
  return <a href={to} className={className} style={style} onClick={onClick} {...rest}>{children}</a>;
}
