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
        todayWorks: action.payload,
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
