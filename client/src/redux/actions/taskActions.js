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
        payload: res.data.doc,
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
      dispatch({
        type: actions.UPDATE_TASK,
        payload: res.data.doc
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all task based on date only for admin
export const getFilterdTasks = (fromDate, toDate) => (dispatch, getState) => {
  dispatch(setTasksLoading());
  axios
    .get(`api/task/get-tasks-by-date/${fromDate}/${toDate}`, tokenConfig(getState))
    .then(res => {
      console.log('date data ', res.data);
      dispatch({
        type: actions.GET_TASKS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all task based on date
export const geUsertFilterdTasks = (userEmail,fromDate, toDate) => (dispatch, getState) => {
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

export const deleteTasks = id => (dispatch, getState) => {
  axios
    .delete(`/api/task/delete-task/${id}`, tokenConfig(getState))
    .then(res => // console.log('res ', res)
      dispatch({
        type: actions.DELETE_TASK,
        payload: id,
      })
    )
    .catch(err => // console.log('err ', err)
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};



export const setTasksLoading = () => {
  return {
    type: actions.TASKS_LOADING,
  };
};
