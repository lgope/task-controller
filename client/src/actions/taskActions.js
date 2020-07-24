import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getTask = id => (dispatch, getState) => {
  dispatch(setTasksLoading());
  axios
    .get(`/api/task/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_TASK,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getAllTask = () => (dispatch, getState) => {
  dispatch(setTasksLoading());
  axios
    .get(`/api/task/get-all-task`, tokenConfig(getState))
    .then(res => {
      // console.log('task data 1:', res.data);
      dispatch({
        type: actions.GET_TASKS,
        payload: res.data,
      });
    })
    .catch(err => {
      // console.log('err', err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const updateTaskProgress = (id, body) => (dispatch, getState) => {
  dispatch(setTasksLoading());
  console.log('object 12');
  axios
    .put(`/api/task/progress-update/${id}`, body, tokenConfig(getState))
    .then(res => {
      console.log('updated tasks 🔔🔔🔔🔔', res.data);
      dispatch({
        type: actions.UPDATE_PROGRESS,
      });
    })
    .catch(err => {
      console.log('err', err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setTasksLoading = () => {
  return {
    type: actions.TASKS_LOADING,
  };
};
