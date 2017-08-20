import { Meteor } from 'meteor/meteor';

import { Notify } from '/imports/notifications';
import * as c from './constants.js';

export const openCustomTaskModal = (task) => {
  return {
    type: c.OPEN_CUSTOM_TASK_MODAL,
    task,
  };
};

export const closeCustomTaskModal = () => ({
  type: c.CLOSE_CUSTOM_TASK_MODAL,
});

// Placeholder (used by robot)

export const addCustomTask = task => (dispatch) => {
  Meteor.call('users.addCustomTask', task, (err, success) => {
    if (err) {
      console.log(err);
    } else if (success) {
      Notify.alert({
        title: 'Задание добавлено!',
        text: 'С завтрашнего дня оно будет добавлено в ваш распорядок!',
        type: 'success',
      });
    } else {
      Notify.alert({
        title: 'Упс!',
        text: 'Что-то пошло не так, обратитесь пожалуйста в нашу службу поддержки',
        type: 'error',
      });
    }
    dispatch({
      type: c.CLOSE_CUSTOM_TASK_MODAL,
    });
  });
};

export const updateCustomTask = task => (dispatch) => {
  Meteor.call('users.updateCustomTask', task, () => {
    dispatch({
      type: c.CLOSE_CUSTOM_TASK_MODAL,
    });
  });
};

export const removeCustomTask = task => (dispatch) => {
  Meteor.call('users.removeCustomTask', task, () => {
    dispatch({
      type: c.CLOSE_CUSTOM_TASK_MODAL,
    });
  });
};
