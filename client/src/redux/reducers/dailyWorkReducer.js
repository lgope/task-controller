import * as actions from '../actions/actionTypes';

const initialState = {
  allWorks: [],
  userWorks: [],
  todayWorks: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_WORKS:
      return {
        ...state,
        userWorks: action.payload,
        loading: false,
      };

    case actions.SAVE_TODAY_WORKS:
      return {
        ...state,
        todayWorks: [action.payload, ...state.todayWorks], // [action.payload, ...state.items]
        loading: false,
      };

    case actions.GET_ALL_USERS_WORK:
      return {
        ...state,
        allWorks: action.payload,
        loading: false,
      };

    case actions.UPDATE_USER_WORK:
      return {
        ...state,
        userWorks: [...state.userWorks], // TODO: update object
        loading: false,
      };

    case actions.WORKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
