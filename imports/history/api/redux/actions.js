import { Meteor } from 'meteor/meteor';
import { Notify } from '/imports/notifications';

import * as c from './constants';

export const resetHistoryLimit = () => ({ type: c.RESET_HISTORY_LIMIT });

export const updateTextBlock = (day, name, text) => dispatch => {
  Meteor.call('days.updateTextBlock', day, name, text, (err) => {
    if (err) {
      Notify.alert({
        title: 'Произошла ошибка',
        text: 'Пожалуйста напишите в службу поддержки',
        type: 'error',
      });
    } else {
      Notify.alert({
        title: 'Отлично!',
        text: 'Текст ответа обновлен!',
        type: 'success',
      });
    }
  });
};

export const checkLoadMore = elem => (dispatch) => {
  if (elem.scrollTop === 0) {
    const scrollHeight = elem.scrollHeight;
    console.log('scrollHeight', elem.scrollHeight);
    dispatch({
      type: c.INCREMENT_HISTORY_LIMIT,
      scrollHeight,
    });
  }
};

export const countUsersHistory = () => (dispatch) => {
  Meteor.call('days.countUsersHistory', (err, historyLength) => {
    dispatch({
      type: c.COUNT_USERS_HISTORY,
      historyLength,
    });
  });
}
