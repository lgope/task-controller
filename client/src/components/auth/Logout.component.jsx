import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';

export const Logout = ({ logout }) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href='#'>
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
