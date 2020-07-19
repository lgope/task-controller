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
        discusses: action.payload, //[action.payload, ...state.discusses],
      };

    default:
      return state;
  }
}
