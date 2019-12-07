import { Fragment } from 'react';
import Header from './header.component';

const Layout = ({ children }) => {
  return(
    <Fragment>
      <Header/>
      {children}
      <h2>footer</h2>
    </Fragment>
  )
};

export default Layout;