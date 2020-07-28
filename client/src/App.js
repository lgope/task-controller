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
  // const currPage = localStorage.getItem('currPage');
  // console.log('currPage', currPage)
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // if (currPage) {
  //   return <Redirect to={currPage} />
  // }
  return (
    <Provider store={store}>
      {/* redirect previous page if user reload any page */}
      {/* {currPage && <Redirect to={currPage} />} */}
      <div className='App'>
        <AppNavbar />
        <Container>
          <Switch>
            <Route exact path='/' component={LogInForm} />
            <Route exact path='/admin-home' component={Admin} />
            <Route path='/users-info' component={UsersInfo} />
            <Route path='/tasks-info' component={TaskInfo} />
            <Route path='/user-home' component={User} />
          </Switch>
        </Container>
        <AppFooter />
      </div>
    </Provider>
  );
};

export default App;
