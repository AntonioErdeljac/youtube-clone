import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Navigation, Authentication } from './components';

import store from './store';
import { paths } from './constants';

import './resources/scss/style.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
      <Navigation>
        <Route exact path={paths.client.BASE} component={() => <p>Hello test</p>} />
        <Route exact path={paths.client.LOGIN} component={Authentication.Login} />
      </Navigation>
    </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);