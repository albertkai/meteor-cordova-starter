import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';

import { Notify } from '/imports/notifications';
import * as c from './constants.js';

const notifyChange = (err, isActive) => {
  if (err) {
    Notify.alert({
      title: 'Упс',
      text: 'Что-то пошло не так, напишите в службу поддержки',
      type: 'error',
    });
  } else {
    if (isActive) {
      Notify.alert({
        title: 'Блок активирован!',
        text: 'И с завтрашнего дня будет включен в ваш ежедневный распорядок',
        type: 'success',
      });
    } else {
      Notify.alert({
        title: 'Блок отключен',
        text: 'С завтрашнего дня будет исключен из вашего ежедневного распорядка',
        type: 'info',
      });
    }
  }
};

const notifyFeeChange = (err, res) => {
  if (err) {
    Notify.alert({
      title: 'Упс',
      text: 'Что-то пошло не так, напишите в службу поддержки',
      type: 'error',
    });
  } else {
    if (res) {
      Notify.alert({
        title: 'Сумма штрафа изменена!',
        text: 'Изменения вступят в силу с завтрашнего дня',
        type: 'success',
      });
    } else {
      Notify.alert({
        title: 'Слишком маленькая сумма!',
        text: 'Минимальная сумма штрафа - 500р',
        type: 'error',
      });
    }
  }
};

// Placeholder (used by robot)

// Side effect actions
export const toggleWakeUp = () => {
  return () => {
    Meteor.call('users.toggleBlock', 'wakeUp', notifyChange);
  };
};

export const toggleSport = () => {
  return () => {
    Meteor.call('users.toggleBlock', 'sport', notifyChange);
  };
};

export const toggleMeditation = () => {
  return () => {
    Meteor.call('users.toggleBlock', 'meditation', notifyChange);
  };
};

export const toggleTasks = () => {
  return () => {
    Meteor.call('users.toggleBlock', 'taskList', notifyChange);
  };
};

export const toggleWater = () => {
  return () => {
    Meteor.call('users.toggleBlock', 'water', notifyChange);
  };
};

export const toggleKind = () => {
  return () => {
    Meteor.call('users.toggleBlock', 'kind', notifyChange);
  };
};

export const toggleReport = () => {
  return () => {
    Meteor.call('users.toggleBlock', 'report', notifyChange);
  };
};

export const setTimezone = (e) => () => {
  const { value } = e.target;
  Meteor.call('users.setTimezone', value);
};

let feeTimeout;
export const setFee = e => () => {
  e.persist();
  Meteor.clearTimeout(feeTimeout);
  feeTimeout = Meteor.setTimeout(() => {
    const { value } = e.target;
    Meteor.call('users.setFee', value, notifyFeeChange);
  }, 700);
};

export const setBlockOption = (name, option, value) => () => {
  Meteor.call('users.setBlockOption', name, option, value);
};

export const uploadAvatar = e => () => {
  const file = e.target.files[0];
  const uploader = new Slingshot.Upload('imageUploads');
  uploader.send(file, (error, url) => {
    if (error) {
      console.error('Error uploading', error);
      Notify.alert({
        title: 'Что-то пошло не так!',
        text: 'Пожалуйста, обратитесь в службу поддержки',
        type: 'error',
      });
      return false;
    }
    const fileName = _.last(url.split('/'));
    Meteor.call('users.uploadAvatar', fileName, (err) => {
      if (err) {
        Notify.alert({
          title: 'Что-то пошло не так!',
          text: 'Пожалуйста, обратитесь в службу поддержки',
          type: 'error',
        });
      }
    });
    return true;
  });
};

export const uploadBackground = e => () => {
  const file = e.target.files[0];
  const uploader = new Slingshot.Upload('imageUploads');
  uploader.send(file, (error, url) => {
    if (error) {
      console.error('Error uploading', error);
      Notify.alert({
        title: 'Что-то пошло не так!',
        text: 'Пожалуйста, обратитесь в службу поддержки',
        type: 'error',
      });
      return false;
    }
    const fileName = _.last(url.split('/'));
    Meteor.call('users.uploadBackground', fileName, (err) => {
      if (err) {
        Notify.alert({
          title: 'Что-то пошло не так!',
          text: 'Пожалуйста, обратитесь в службу поддержки',
          type: 'error',
        });
      }
    });
    return true;
  });
};
