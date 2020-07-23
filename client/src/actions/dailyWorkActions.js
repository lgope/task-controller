import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// save todays work | user route
export const saveTodayWork = body => (dispatch, getState) => {
  dispatch(ssetWorksLoading());
  axios
    .get(`api/daily-work/save-today-work`, body, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch({
        type: actions.SAVE_TODAY_WORKS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setWorksLoading = () => {
  return {
    type: actions.WORKS_LOADING,
  };
};
