import { createStore, combineReducers } from 'redux';
import { login } from './reducers';

const reducer = combineReducers({
  login,
});

const store = createStore(reducer);

export default store;