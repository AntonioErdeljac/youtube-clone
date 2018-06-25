import { createStore, combineReducers } from 'redux';
import { login } from './reducers';

const store = combineReducers({
  login,
});

export default store;