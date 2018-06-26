import { actions } from '../constants';

function changeValue(key, value) {
  return {
    type: actions.LOGIN_FORM_CHANGE_VALUE,
    key,
    value,
  };
}

export default {
  changeValue,
};