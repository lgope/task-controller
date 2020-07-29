import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';

import LoginModal from './auth/LoginModal.component';
import Logout from './auth/Logout.component';
import { connect } from 'react-redux';

const AppNavbar = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className='navbar-text mr-3'>
          <strong>
            {auth && auth.user ? `Welcome ${auth.user.name}` : null}
          </strong>
        </span>
      </NavItem>
      <NavItem className='p-2'>
        {auth.user && auth.user.role === 'admin' ? (
          <Link to='/admin-home'>Home</Link>
        ) : (
          <Link to='/user-home'>Home</Link>
        )}
      </NavItem>

      {auth && auth.user && auth.user.role === 'admin' && (
        <>
          <NavItem className='p-2'>
            <Link to='/users-info'>User Info</Link>
          </NavItem>

          <NavItem className='p-2'>
            <Link to='/tasks-info'>Task Info</Link>
          </NavItem>
        </>
      )}

      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <Navbar expand='sm' className='mb-5'>
      <Container>
        <NavbarBrand href='/'>Task Controller</NavbarBrand>
        <NavbarToggler onClick={handleToggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            {auth && auth.isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
