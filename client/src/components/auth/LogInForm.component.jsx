import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

import { login } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import Loading from '../loading/Loading.component';

const LogInForm = ({ auth, isLoading, error, login, clearErrors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleClearError = useCallback(() => {
    // Clear errors
    clearErrors();
  }, [clearErrors]);

  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.message);
    } else {
      setMsg(null);
    }
  }, [error, handleClearError, auth.isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  if (auth.user && auth.user.role === 'user') {
    return <Redirect to='/user-home' />;
  }

  if (auth.user && auth.user.role === 'admin') {
    return <Redirect to='/admin-home' />;
  }

  const handleChangeEmail = event => setEmail(event.target.value);
  const handleChangePassword = event => setPassword(event.target.value);

  const handleOnSubmit = event => {
    event.preventDefault();
    if (email && password) {
      const user = { email, password };

      // Attempt to login
      login(user);
      handleClearError();
    }
  };

  return (
    <Fragment>
      {!auth.user && (
        <div className='login-page'>
          <div className='container'>
            <div className='row no-gutter'>
              <div className='col-md-2 col-lg-3'></div>
              <div className='col-md-8 col-lg-6'>
                <div className='login d-flex align-items-center py-5'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12 col-lg-12 mx-auto'>
                        <h3 className='login-heading mb-4'>Welcome back!</h3>
                        {msg ? <Alert color='danger'>{msg}</Alert> : null}
                        <form>
                          <div className='form-label-group'>
                            <input
                              type='email'
                              id='inputEmail'
                              className='form-control'
                              placeholder='Email address'
                              required
                              autoFocus
                              value={email}
                              onChange={handleChangeEmail}
                            />
                            <label htmlFor='inputEmail'>Email address</label>
                          </div>

                          <div className='form-label-group'>
                            <input
                              type='password'
                              id='inputPassword'
                              className='form-control'
                              placeholder='Password'
                              required
                              value={password}
                              onChange={handleChangePassword}
                            />
                            <label htmlFor='inputPassword'>Password</label>
                          </div>

                          <div className='custom-control custom-checkbox mb-3'>
                            <input
                              type='checkbox'
                              className='custom-control-input'
                              id='customCheck1'
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='customCheck1'
                            >
                              Remember password
                            </label>
                          </div>
                          <button
                            className='btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2'
                            type='submit'
                            onClick={handleOnSubmit}
                          >
                            Sign in
                          </button>
                          <div className='text-center'>
                            <a className='small' href='/'>
                              Forgot password?
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.auth.isLoading,
  error: state.error,
});
export default connect(mapStateToProps, { login, clearErrors })(LogInForm);
