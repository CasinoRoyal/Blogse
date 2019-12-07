import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, signout } from '../../actions/auth.action';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { APP_NAME } from '../../config.js';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    setAuthenticate(isAuth())
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {
              !isAuthenticate ? 
                <Fragment>
                  <NavItem>
                    <Link href="/signin">
                      <NavLink>Sign In</NavLink>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href="/signup">
                      <NavLink>Sign Up</NavLink>
                    </Link>
                  </NavItem>
                </Fragment>
                :
                <NavItem>
                  <NavLink onClick={() => {
                    setAuthenticate(false);
                    signout(() => Router.push('/'))}
                  }>
                    Sign Out
                  </NavLink>
                </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;