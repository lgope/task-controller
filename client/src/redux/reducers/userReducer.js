import * as actions from '../actions/actionTypes';

const initialState = {
  tasks: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_TASKS:
      return {
        tasks: action.payload,
        loading: false,
      };

      case actions.UPDATE_TASK:
        return {
          tasks: state.tasks.map(task => task._id === action.payload._id ? {...action.payload} : task),
          loading: false,
        };

      case actions.USER_TASKS_LOADING:
        return {
          ...state,
          loading: true
        }

    default:
      return state;
  }
}
