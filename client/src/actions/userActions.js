import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getUserTasks = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/user', tokenConfig(getState))
    .then(res => {
      console.log('tasks', res.data);
      dispatch({
        type: actions.GET_USER_TASKS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('err', err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setItemsLoading = () => {
  return {
    type: actions.TASKS_LOADING,
  };
};
