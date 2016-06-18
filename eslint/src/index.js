/*eslint-disable no-unused-vars*/
import SC from 'soundcloud';
/*eslint-enable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import Callback from './components/Callback';
import Stream from './components/Stream';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Stream} />
        <Route path="/" component={Stream} />
        <Route path="/callback" component={Callback} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);