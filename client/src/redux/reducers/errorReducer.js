import * as actions from '../actions/actionTypes';

const initialState = {
  msg: {},
  state: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };

    case actions.CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };

    default:
      return state;
  }
}
