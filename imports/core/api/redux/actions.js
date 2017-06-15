import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import * as c from './constants';

// Pure actions
export const incrementClickCount = () => ({
  type: c.INCREMENT_CLICK_COUNT,
});

// Actions with side effect
export const loginWithFacebook = () => () => {
  Meteor.loginWithFacebook({}, () => {
    browserHistory.push('/today');
  });
};

export const loginWithVk = () => () => {
  Meteor.loginWithVk({}, () => {
    browserHistory.push('/today');
  });
};

export const loginWithTwitter = () => () => {
  Meteor.loginWithTwitter({}, () => {
    browserHistory.push('/today');
  });
};

export const logOut = () => () => {
  Meteor.logout(() => {
    browserHistory.push('/login');
  });
};

