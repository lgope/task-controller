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
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setUsersLoading = () => {
  return {
    type: actions.USERS_LOADING,
  };
};
