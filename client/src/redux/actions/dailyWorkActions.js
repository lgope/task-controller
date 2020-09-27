import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// TODO: get all user works

// save todays work | user route
export const saveTodayWork = body => (dispatch, getState) => {
  // dispatch(setWorksLoading());
  axios
    .post(`api/daily-work/save-today-work`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.SAVE_TODAY_WORKS,
        payload: res.data.todaysWork,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all daily works | user route
export const getUserWorks = id => (dispatch, getState) => {
  dispatch(setWorksLoading());
  axios
    .get(`api/daily-work/get-user-works/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_USER_WORKS,
        payload: res.data.userDailyWorks,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// upate daily works | user route
export const updateWork = (id, body) => (dispatch, getState) => {
  // dispatch(setWorksLoading());
  axios
    .patch(`api/daily-work/update-dailyWork/${id}`, body,tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.UPDATE_USER_WORK,
        payload: res.data.doc,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all daily works | admin route
export const getAllWorks = id => (dispatch, getState) => {
  dispatch(setWorksLoading());
  axios
    .get(`api/daily-work/get-all-work`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_ALL_USERS_WORK,
        payload: res.data.doc,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all daily works based on date | admin route
export const getUserFilterdWorks = (userId,fromDate, toDate) => (dispatch, getState) => {
  // dispatch(setWorksLoading());
  axios
    .get(`api/daily-work/get-works-by-date/${userId}/${fromDate}/${toDate}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_USER_WORKS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all daily works based on date | admin route
export const getFilterdWorks = (fromDate, toDate) => (dispatch, getState) => {
  // dispatch(setWorksLoading());
  axios
    .get(`api/daily-work/get-works-by-date/${fromDate}/${toDate}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.GET_ALL_USERS_WORK,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteDailyWorks = id => (dispatch, getState) => {
  axios
    .delete(`/api/daily-work/delete-dailyWork/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: actions.DELETE_USER_WORK,
        payload: id,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const setWorksLoading = () => {
  return {
    type: actions.WORKS_LOADING,
  };
};
