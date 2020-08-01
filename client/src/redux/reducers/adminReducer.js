import * as actions from '../actions/actionTypes';

const initialState = {
  allUsers: [],
  savedUser: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false,
      };

    case actions.SAVE_USER:
      return {
        ...state,
        savedUser: action.payload
      };

    case actions.USERS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
