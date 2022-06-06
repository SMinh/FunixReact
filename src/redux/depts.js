import * as ActionTypes from "./ActionTypes";

export const Depts = (
  state = { isLoading: true, errMess: null, depts: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        depts: action.payload,
      };

    case ActionTypes.DEPTS_LOADING:
      return { ...state, isLoading: true, errMess: null, depts: [] };

    case ActionTypes.DEPTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
