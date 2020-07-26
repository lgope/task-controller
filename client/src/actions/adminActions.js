import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
// get all users
export const getAllUsers = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  axios
    .get('/api/admin/get-all-user', tokenConfig(getState))
    .then(res => {
      console.log('users', res.data);
      dispatch({
        type: actions.GET_ALL_USERS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// add new user
export const addUser = body => (dispatch, getState) => {
  axios
    .post('api/admin/create-user', body, tokenConfig(getState))
    .then(res => {
      console.log('users', res.data);
      dispatch({
        type: actions.SAVE_USER,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('error: 11', err.response);
      dispatch(returnErrors(err.response.data, err.response.status, 'ADD_USER_FAIL'));
    });
};

// assign task
export const assignTask = body => (dispatch, getState) => {
  axios
    .post('api/task/assign-task', body, tokenConfig(getState))
    .then(res => {
      console.log('new task 🚀', res.data);
      dispatch({
        type: actions.ADD_TASK,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('error: 11', err.response);
      dispatch(returnErrors(err.response.data, err.response.status, 'ASSIGN_TASK_FAIL'));
    });
};

export const setUsersLoading = () => {
  return {
    type: actions.USERS_LOADING,
  };
};
