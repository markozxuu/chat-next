import React, { SFC } from 'react';
import Meta from './Meta';

const Layout: SFC = ({ children }) => (
  <>
    <Meta />
    {children}
  </>
);

export default Layout;
