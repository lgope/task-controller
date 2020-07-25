import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';

const AdminNavBar = ({ auth }) => {
  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand href='/'>Task Controller</NavbarBrand>

          <Nav className='ml-auto' navbar>
            <NavItem>
              <span className='navbar-text mr-3'>
                <strong>
                  {auth && auth.user ? `Welcome ${auth.user.name}` : null}
                </strong>
              </span>
            </NavItem>

            <NavItem>
              <NavLink>
                {auth && auth.user && (
                  <Link className='option' to='/users-info'>
                    User Info
                  </Link>
                )}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink>
                <Link
                  className='option'
                  style={{ color: '#fff' }}
                  to='/users-info'
                >
                  Task Info
                </Link>
              </NavLink>
            </NavItem>

            <NavItem>{/* <Logout /> */}</NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AdminNavBar);
