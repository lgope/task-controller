import * as actions from '../actions/actionTypes';

const initialState = {
  task: [],
  tasks: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_TASK:
      return {
        ...state,
        task: action.payload,
        loading: false,
      };
    case actions.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };

    case actions.UPDATE_PROGRESS:
      return {
        ...state,
        loading: false,
      };

    case actions.TASKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
