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
    browserHistory.push('/');
  });
};

export const loginWithVk = () => () => {
  Meteor.loginWithVk({}, () => {
    browserHistory.push('/');
  });
};

export const loginWithTwitter = () => () => {
  Meteor.loginWithTwitter({}, () => {
    browserHistory.push('/');
  });
};

export const logOut = () => () => {
  Meteor.logout(() => {
    browserHistory.push('/login');
  });
};

export const toggleMenu = () => ({
  type: c.TOGGLE_MENU,
});

export const closeMenu = () => ({
  type: c.CLOSE_MENU,
});
