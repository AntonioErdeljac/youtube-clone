import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';

import '../resources/scss/style.scss';

ReactDOM.render(
  <Provider store={store}>
    <p>Hello World</p>
  </Provider>,
  document.getElementById('root'),
);