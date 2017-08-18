import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Notify } from '/imports/notifications';

import { coreConstants } from '/imports/core';

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

export const resetPaymentToken = () => ({ type: c.SET_PAYMENT_TOKEN, token: '' });

export const toggleWakeUpModal = () => ({ type: c.TOGGLE_WAKE_UP_MODAL });

export const getPaymentToken = () => (dispatch) => {
  Meteor.call('braintree.getToken', (err, token) => {
    console.log(token);
    window.BraintreePlugin.initialize(token,
      () => {
        dispatch({
          type: c.SET_PAYMENT_TOKEN,
          token,
        });
      },
      (error) => {
        console.error(error);
      },
    );
    dispatch({
      type: c.SET_PAYMENT_TOKEN,
      token,
    });
  });
};

export const payFee = amount => (dispatch) => {
  window.BraintreePlugin.presentDropInPaymentUI({ amount }, (result) => {
    if (result.userCancelled) {
      console.debug('User cancelled payment dialog.');
    } else {
      Meteor.call('braintree.transaction', result.nonce, (err, success) => {
        if (success) {
          Notify.alert({
            title: 'Отлично!',
            text: 'Ваш платеж принят! Надеемся вам больше не придется платить штраф',
          });
          dispatch({
            type: c.TOGGLE_PAY_FEES_MODAL,
          });
        }
      });
    }
  });
};

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

const cacheImage = (path) => {
  if (path) {
    console.log('Preloading image:', path);
    const image = new Image();
    image.src = path;
  }
};

export const preload = user => () => {
  console.log('Preloading data');
  Meteor.subs.subscribe('days.getUserDays', 20);
  const { background, avatar } = user.personalData;
  if (avatar) {
    const url = (() => {
      if (avatar) {
        if (avatar.match(/^(http|https)/)) {
          return avatar;
        }
        return `${coreConstants.CLOUDFRONT_URL}images/${avatar}`;
      }
      return `${coreConstants.CLOUDFRONT_URL}samples/default_avatar.jpg`;
    })();
    cacheImage(url);
  }
  if (background) {
    const backgroundUrl = (() => {
      if (background.match(/samples/g)) {
        return `${coreConstants.CLOUDFRONT_URL}${background}`;
      }
      return `${coreConstants.CLOUDFRONT_URL}images/${background}`;
    })();
    cacheImage(backgroundUrl);
  }
};

export const takeVacation = days => (dispatch) => {
  Meteor.call('users.takeVacation', days, (err) => {
    if (!err) {
      Notify.alert({
        title: 'Вы взяли отпуск!',
        text: 'Теперь в это время вам не будут приходить штрафы, но все же вы должны будете заполнить пропущенные задания по возвращению',
        type: 'success',
      });
      dispatch({
        type: 'core/TOGGLE_VACATION',
      });
    }
  });
};

export const stopVacation = () => (dispatch) => {
  Meteor.call('users.stopVacation', (err) => {
    if (!err) {
      Notify.alert({
        title: 'Вы закончили отпуск!',
        text: 'Вы настолько стремитесь к саморазвитию, тчо закончили отпуск ранбше времени! Вы многого добьетесь с таким настроем!',
        type: 'success',
      });
      dispatch({
        type: 'core/TOGGLE_VACATION',
      });
    }
  });
};
