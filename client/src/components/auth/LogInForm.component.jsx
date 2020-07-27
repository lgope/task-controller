import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import Loading from '../loading/Loading.component';

const UserDiv = ({ user }) => {
  if (user && user.role === 'user') return <Redirect to='/user-home' />;
  else return <Redirect to='/admin-home' />;
};

const LogInForm = ({ auth, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (auth && auth.user && auth.user.role === 'admin') {
    return <Redirect to='/admin-home' />;
  }

  if (auth && auth.user && auth.user.role === 'user') {
    return <Redirect to='/user-home' />;
  }

  return (
    <Fragment>
      {auth && auth.user && <UserDiv user={auth.user} />}

      {!auth ||
        (!auth.user && (
          <section className='banner-area relative'>
            <div className='overlay overlay-bg'></div>
            <div className='container'>
              <div className='row fullscreen align-items-center justify-content-between'>
                <div className='col-lg-6 col-md-7 col-sm-8'>
                  <div className='banner-content'>
                    <h1>
                      Task Controller <br />
                    </h1>
                    <p>
                      Task controller this app will help to track daily tasks
                      and works
                    </p>
                  </div>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-4'>
                  <img
                    src='https://user-images.githubusercontent.com/58518192/88472695-774e6a00-cf37-11ea-970c-df3f66b3bfcb.png'
                    alt='image'
                    className='img-fluid'
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps, { login, clearErrors })(LogInForm);
