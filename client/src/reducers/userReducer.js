import * as actions from '../actions/actionTypes';

const initialState = {
  tasks: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
