import React, { ReactNode } from 'react';
import Meta from './Meta';

export interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => (
  <div>
    <Meta />
    {children}
  </div>
);

export default Layout;
