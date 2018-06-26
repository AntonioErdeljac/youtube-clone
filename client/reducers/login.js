import { actions } from '../constants';

export default (state={}, action) => {
  switch(action.type) {
    case actions.LOGIN:
      return {
        ...state,
      }
    case actions.LOGIN_FORM_CHANGE_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.key]: action.value,
        }
      };
    default:
      return state;
  };
};