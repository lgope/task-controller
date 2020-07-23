import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// TODO: get all user works

// save todays work | user route
export const saveTodayWork = body => (dispatch, getState) => {
  dispatch(setWorksLoading());
  axios
    .post(`api/daily-work/save-today-work`, body, tokenConfig(getState))
    .then(res => {
      console.log('today',res.data);
      dispatch({
        type: actions.SAVE_TODAY_WORKS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('save error', err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all daily works | user route
export const getUserWorks = id => (dispatch, getState) => {
  dispatch(setWorksLoading());
  axios
    .get(`api/daily-work/get-user-works/${id}`, tokenConfig(getState))
    .then(res => {
      console.log('get-user-works', res.data);
      dispatch({
        type: actions.GET_USER_WORKS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('get-user-works errors : ', err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setWorksLoading = () => {
  return {
    type: actions.WORKS_LOADING,
  };
};
