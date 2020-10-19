import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({
  isAuthenticated,
  user,
  component: Component,
  ...rest
}) => {
  if ((user && user.role === 'admin') || isAuthenticated === false) {
    return <Redirect to='/' />;
  }


  return <Route {...rest} component={Component} />;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps)(UserRoute);
