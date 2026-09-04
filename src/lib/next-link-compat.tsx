import { Link as RRLink, type LinkProps } from "react-router";
import React from "react";

export interface CompatLinkProps extends Omit<LinkProps, "to"> {
  href?: string;
  to?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

export function Link({ href, to, children, ...props }: CompatLinkProps) {
  const targetPath = to || href || "#";
  return (
    <RRLink to={targetPath} {...(props as any)}>
      {children}
    </RRLink>
  );
}

export default Link;
