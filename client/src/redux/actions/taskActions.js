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
      dispatch({
        type: actions.GET_TASKS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const updateTaskProgress = (id, body) => (dispatch, getState) => {
  dispatch(setTasksLoading());
  axios
    .put(`/api/task/progress-update/${id}`, body, tokenConfig(getState))
    .then(res => {
      // TODO: optimaized loading time
      dispatch({
        type: actions.UPDATE_PROGRESS,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const updateTask = (id, body) => (dispatch, getState) => {
  dispatch(setTasksLoading());
  axios
    .patch(`/api/task/update-task/${id}`, body, tokenConfig(getState))
    .then(res => {
      // TODO: optimaized loading time
      dispatch({
        type: actions.UPDATE_TASK,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all task based on date
export const getFilterdTasks = (userEmail,fromDate, toDate) => (dispatch, getState) => {
  dispatch(setTasksLoading());
  axios
    .get(`api/task/get-tasks-by-date/${userEmail}/${fromDate}/${toDate}`, tokenConfig(getState))
    .then(res => {
      // console.log('date data ', res.data);
      dispatch({
        type: actions.GET_USER_TASKS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


export const setTasksLoading = () => {
  return {
    type: actions.TASKS_LOADING,
  };
};
