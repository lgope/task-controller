import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getUserTasks = () => (dispatch, getState) => {
  dispatch(setTasksLoading());
  axios
    .get(`/api/user`, tokenConfig(getState))
    .then(res => {
      console.log('ut ', res.data);
      dispatch({
        type: actions.GET_USER_TASKS, // TODO: ! getusertask not working
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


export const setTasksLoading = () => {
  return {
    type: actions.USER_TASKS_LOADING,
  };
};
