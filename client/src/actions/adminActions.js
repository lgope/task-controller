import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getAllUsers = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  console.log('getstate', getState);
  console.log('hellowww');
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
      console.log('error adminnnnnn: ', err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setUsersLoading = () => {
  return {
    type: actions.USERS_LOADING,
  };
};
