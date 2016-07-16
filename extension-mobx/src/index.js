import SC from 'soundcloud';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Callback from './components/Callback';
import Stream from './components/Stream';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Stream} />
      <Route path="/" component={Stream} />
      <Route path="/callback" component={Callback} />
    </Route>
  </Router>,
  document.getElementById('app')
);