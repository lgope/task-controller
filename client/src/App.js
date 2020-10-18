import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar.component';
import AppFooter from './components/AppFooter.component';

import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'mdbreact/dist/css/mdb.css';
import './App.css';

import LogInForm from './components/auth/LogInForm.component';

import Admin from './components/admin/Admin.component';
import UsersInfo from './components/admin/UsersInfo.component';
import TaskInfo from './components/admin/TaskInfo.component';

// user
import User from './components/user/User.component';

// 404 not found page
import NotFound from './components/NotFound.page';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='content'>
        <AppNavbar />
        <Switch>
          {/* user route */}
          <UserRoute exact={true} path='/user-home' component={User} />

          {/* login route */}
          <Route exact path='/' component={LogInForm} />

          {/* admin routes */}
          <AdminRoute exact path='/admin-home' component={Admin} />
          <AdminRoute exact path='/users-info' component={UsersInfo} />
          <AdminRoute exact path='/tasks-info' component={TaskInfo} />

          {/* other page */}
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
      <AppFooter />
    </Provider>
  );
};

export default App;
