/* @flow */
import * as React from 'react';
import Meta from './Meta';

type Props = {
  children?: React.Node
};

const Layout = ({ children }: Props) => (
  <div>
    <Meta />
    {children}
  </div>
);

export default Layout;
