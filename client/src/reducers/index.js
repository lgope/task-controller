import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import taskReducer from './taskReducer'
import discussReducer from './discussReducer'

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  userRoutes: userReducer,
  task: taskReducer,
  discusses: discussReducer
});
