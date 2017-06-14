import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout, EmptyLayout, Login } from '/imports/core';
import { History } from '/imports/history';
import { Goals } from '/imports/goals';
import { Today } from '/imports/today';
import { Profile } from '/imports/profile';
import { Landing } from '/imports/langing';
// Placeholder (used by robot)

export const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Today} />
      <Route path="/today" component={Today} />
      <Route path="/history" component={History} />
			<Route path="/goals" component={Goals} />
			<Route path="/profile" component={Profile} />
			{/* Placeholder (used by robot) */}
    </Route>
    <Route component={EmptyLayout}>
      <Route path="/landing" component={Landing} />
      <Route path="/login" component={Login} />
    </Route>
  </Router>
);

export default AppRouter;
