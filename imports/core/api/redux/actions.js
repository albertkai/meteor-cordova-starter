import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Notify } from '/imports/notifications';

import * as c from './constants';

// Pure actions
export const incrementClickCount = () => ({
  type: c.INCREMENT_CLICK_COUNT,
});

export const toggleMenu = () => ({
  type: c.TOGGLE_MENU,
});

export const closeMenu = () => ({
  type: c.CLOSE_MENU,
});

export const toggleWakeUpModal = () => ({
  type: c.TOGGLE_WAKE_UP_MODAL,
});

export const toggleDaySuccessModal = () => ({ type: c.TOGGLE_DAY_SUCCESS_MODAL });

export const toggleVacation = () => ({ type: c.TOGGLE_VACATION });

export const toggleFeesModal = () => ({ type: c.TOGGLE_FEES_MODAL });

export const togglePayFeesModal = () => ({ type: c.TOGGLE_PAY_FEES_MODAL });

// Placeholder (used by robot)

// Actions with side effect
export const checkNotificationId = user => () => {
  if (user) {
    window.plugins.OneSignal.getIds((ids) => {
      const { userId } = ids;
      Meteor.call('users.updateNotificationsId', userId);
    });
  }
};

export const setStatusBar = type => () => {
  if (window.StatusBar) {
    if (type === 'light') {
      window.StatusBar.styleLightContent();
    } else if (type === 'default') {
      window.StatusBar.styleDefault();
    }
  }
};

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

export const takeVacation = (days) => (dispatch) => {
  Meteor.call('users.takeVacation', days, (err, res) => {
    if (!err) {
      Notify.alert({
        title: 'Вы взяли отпуск!',
        text: 'Теперь в это время вам не будут приходить штрафы, но все же вы должны будете заполнить пропущенные задания по возвращению',
      });
      dispatch({
        type: 'core/TOGGLE_VACATION',
      });
    }
  });
};
