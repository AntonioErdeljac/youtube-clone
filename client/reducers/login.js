import { actions } from '../constants';

export default (state={}, action) => {
  switch(action.type) {
    case actions.LOGIN:
      return {
        ...state,
      }
  }
}