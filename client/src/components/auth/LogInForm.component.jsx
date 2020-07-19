import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import AdminHomePage from '../admin/Admin.component';
import UserHomePage from '../user/User.component';

const UserDiv = ({ user }) => (
  <div>{user.role === 'user' ? <UserHomePage /> : <AdminHomePage />}</div>
);

function LogInForm({ auth }) {
  if (auth && auth.user && auth.user.role === 'admin') {
    return <AdminHomePage />;
  }

  if (auth && auth.user && auth.user.role === 'user') {
    return <UserHomePage />;
  }

  return (
    <Fragment>
      {auth && auth.user ? (
        <UserDiv user={auth.user} />
      ) : (
        <h4 className='mb-3 ml-4'>Please log in to manage....</h4>
      )}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login, clearErrors })(LogInForm);
