import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import {
  MainLayout,
  EmptyLayout,
  Login,
  SignUp,
  Blocked,
} from '/imports/core';
import { History } from '/imports/history';
import { Goals } from '/imports/goals';
import { Today } from '/imports/today';
import { Profile } from '/imports/profile';
import { Landing } from '/imports/langing';
import { Onboard } from '/imports/onboard';
import { MyDay } from '/imports/myday';
import { Chats } from '/imports/chats';
// Placeholder (used by robot)

const authenticate = (nextState, replace) => {
  console.log(nextState)
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
    });
  }
};

export const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Today} onEnter={authenticate} />
      <Route path="/today" component={Today} />
      <Route path="/history" component={History} />
			<Route path="/goals" component={Goals} />
			<Route path="/profile" component={Profile} />
			<Route path="/my-day" component={MyDay} />
			<Route path="/group" component={Chats} />
			<Route path="/blocked" component={Blocked} />
			{/* Placeholder (used by robot) */}
    </Route>
    <Route component={EmptyLayout}>
      <Route path="/onboard" component={Onboard} />
      <Route path="/onboard/:templateName" component={Onboard} />
      <Route path="/landing" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} />
    </Route>
  </Router>
);

export default AppRouter;
