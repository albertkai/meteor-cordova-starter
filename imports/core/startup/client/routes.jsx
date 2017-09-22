import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import {
  MainLayout,
  EmptyLayout,
  Home,
  Login,
} from '/imports/core';
// Placeholder (used by robot)

const authenticate = (nextState, replace) => {
  console.log(nextState);
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
    });
  }
};

export const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} onEnter={authenticate} />
      {/* Placeholder (used by robot) */}
    </Route>
    <Route component={EmptyLayout}>
      <Route path="/login" component={Login} />
    </Route>
  </Router>
);

export default AppRouter;
