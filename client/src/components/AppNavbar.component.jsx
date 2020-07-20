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
      <NavItem>
        <Logout />
        {auth && auth.user && (
          <Link className='option' to='/users-info'>
            User Info
          </Link>
        )}
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
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
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
    </div>
  );
};

// TODO: render navbar based on user rolo (auth)

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
