import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Container } from 'reactstrap';
import Logout from './auth/Logout.component';
import { connect } from 'react-redux';

const AppNavbar = ({ auth }) => {
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

      {auth.user && auth.user.role === 'admin' && (
        <>
          <NavItem className='p-2'>
            <Link to='/users-info'>Users</Link>
          </NavItem>

          <NavItem className='p-2'>
            <Link to='/tasks-info'>Tasks</Link>
          </NavItem>
        </>
      )}

      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment>
      {auth.isAuthenticated && (
        <Navbar expand='sm' className='mb-5'>
          <Container>
            <Link
              to={auth.user.role === 'admin' ? '/admin-home' : '/user-home'}
            >
              <h5>Task Controller</h5>
            </Link>
            <Nav className='ml-auto' navbar>
              {authLinks}
            </Nav>
          </Container>
        </Navbar>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
