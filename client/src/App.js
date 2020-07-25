import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar.component';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
// import './App.css';

import LogInForm from './components/auth/LogInForm.component';

import UsersInfo from './components/admin/UsersInfo.component'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <Switch>
          <Route exact path='/' component={LogInForm} />
          <Route path='/users-info' component={UsersInfo} />
        </Switch>
        </Container>
      </div>
    </Provider>
  );
};

export default App;
