import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import AdminHomePage from '../admin/Admin.component';
import UserHomePage from '../user/User.component';
import Loading from '../loading/Loading.component';

const UserDiv = ({ user }) => (
  <div>{user.role === 'user' ? <UserHomePage /> : <AdminHomePage />}</div>
);

const LogInForm = ({ auth, isLoading }) => {
  if (auth && auth.user && auth.user.role === 'admin') {
    return <AdminHomePage />;
  }

  if (auth && auth.user && auth.user.role === 'user') {
    return <UserHomePage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {auth && auth.user && <UserDiv user={auth.user} />}

      {!auth ||
        (!auth.user && (
          <h4 className='mb-3 ml-4'>Please Login to Process....</h4>
        ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps, { login, clearErrors })(LogInForm);
