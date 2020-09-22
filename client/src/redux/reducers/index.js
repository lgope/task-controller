import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import dailyWorkReducer from './dailyWorkReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  admin: adminReducer,
  userReducer: userReducer,
  task: taskReducer,
  dailyWorks: dailyWorkReducer,
});
