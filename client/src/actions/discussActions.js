import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const submitDiscuss = discuss => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .post(`/api/discuss`, discuss, tokenConfig(getState))
    .then(res => {
      console.log('dis sub res: ', res.data);
      dispatch({
        type: actions.SUBMIT_DISCUSS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


export const setItemsLoading = () => {
    return {
      type: actions.DISCUSS_LOADING,
    };
  };
  