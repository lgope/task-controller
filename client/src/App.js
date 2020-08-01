import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar.component';
import AppFooter from './components/AppFooter.component';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

import LogInForm from './components/auth/LogInForm.component';

import Admin from './components/admin/Admin.component';
import UsersInfo from './components/admin/UsersInfo.component';
import TaskInfo from './components/admin/TaskInfo.component';

// user
import User from './components/user/User.component';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <AppNavbar />
        <Container>
          <Switch>
            <Route exact path='/' component={LogInForm} />
            <Route path='/user-home' component={User} />

            <Route exact path='/admin-home' component={Admin} />
            <Route path='/users-info' component={UsersInfo} />
            <Route  path='/tasks-info' component={TaskInfo} />
          </Switch>
        </Container>
        <AppFooter />
      </div>
    </Provider>
  );
};

export default App;
