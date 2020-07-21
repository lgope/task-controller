import * as actions from '../actions/actionTypes';

const initialState = {
  discusses: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SUBMIT_DISCUSS:
      return {
        ...state,
        discusses: [action.payload, ...state.discusses],
        loading: false,
      };

    case actions.DISCUSS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}