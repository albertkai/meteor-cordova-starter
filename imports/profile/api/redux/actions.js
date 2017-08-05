import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';

import { coreHelpers } from '/imports/core';
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
    // if (isActive) {
    //   Notify.alert({
    //     title: 'Блок активирован!',
    //     text: 'И с завтрашнего дня будет включен в ваш ежедневный распорядок',
    //     type: 'success',
    //   });
    // } else {
    //   Notify.alert({
    //     title: 'Блок отключен',
    //     text: 'С завтрашнего дня будет исключен из вашего ежедневного распорядка',
    //     type: 'info',
    //   });
    // }
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

export const toggleTab = tab => ({
  type: c.TOGGLE_TAB,
  tab,
});

export const toggleChoosePictureModal = () => ({ type: c.TOGGLE_CHOOSE_PICTURE_MODAL });

export const setAvatarUploading = isUploading => ({
  type: c.SET_AVATAR_UPLOADING,
  isUploading,
});

export const setBackgroundUploading = () => ({ type: c.SET_BACKGROUND_UPLOADING });

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

let textTimeout;
export const setProfileField = (name, e) => () => {
  e.persist();
  Meteor.clearTimeout(textTimeout);
  textTimeout = Meteor.setTimeout(() => {
    const { value } = e.target;
    Meteor.call('users.setProfileField', name, value);
  }, 700);
};

export const setBlockOption = (name, option, value) => () => {
  Meteor.call('users.setBlockOption', name, option, value);
};

export const uploadAvatar = (e, isMobile, type) => dispatch => {
  const uploader = new Slingshot.Upload('imageUploads');
  const handleResponse = (error, url) => {
    if (error) {
      console.error('Error uploading', error);
      Notify.alert({
        title: 'Что-то пошло не так!',
        text: 'Пожалуйста, обратитесь в службу поддержки',
        type: 'error',
      });
      dispatch({ type: 'profile/SET_AVATAR_UPLOADING', isUploading: false });
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
      dispatch({ type: 'profile/SET_AVATAR_UPLOADING', isUploading: false });
      dispatch({ type: 'profile/TOGGLE_CHOOSE_PICTURE_MODAL' });
    });
    return true;
  };
  if (isMobile) {
    const success = (picture) => {
      const blob = coreHelpers.dataURItoBlob(`data:image/jpeg;base64,${picture}`);
      uploader.send(blob, handleResponse);
    };
    const failure = (error) => {
      dispatch({ type: 'profile/SET_AVATAR_UPLOADING', isUploading: false });
      throw new Meteor.Error('cordovaError', error);
    };
    const sourceType = Camera.PictureSourceType[type === 'camera' ? 'CAMERA' : 'PHOTOLIBRARY'];
    navigator.camera.getPicture(success, failure, {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType,
      correctOrientation: true,
      targetWidth: 260,
      targetHeight: 260,
      quality: 100,
    });
    Meteor.setTimeout(() => {
      dispatch({ type: 'profile/SET_AVATAR_UPLOADING', isUploading: true });
    }, 1000);
  } else {
    const file = e.target.files[0];
    uploader.send(file, handleResponse);
    Meteor.setTimeout(() => {
      dispatch({ type: 'profile/SET_AVATAR_UPLOADING', isUploading: true });
    }, 1000);
  }
};

export const uploadBackground = (e, isMobile) => dispatch => {
  const uploader = new Slingshot.Upload('imageUploads');
  const handleResponse = (error, url) => {
    if (error) {
      console.error('Error uploading', error);
      Notify.alert({
        title: 'Что-то пошло не так!',
        text: 'Пожалуйста, обратитесь в службу поддержки',
        type: 'error',
      });
      dispatch({ type: 'profile/SET_BACKGROUND_UPLOADING', isUploading: false });
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
      dispatch({ type: 'profile/SET_BACKGROUND_UPLOADING', isUploading: false });
    });
    return true;
  };
  if (isMobile) {
    const success = (picture) => {
      const blob = coreHelpers.dataURItoBlob(`data:image/jpeg;base64,${picture}`);
      uploader.send(blob, handleResponse);
    };
    const failure = (error) => {
      dispatch({ type: 'profile/SET_BACKGROUND_UPLOADING', isUploading: false });
      throw new Meteor.Error('cordovaError', error);
    };
    const sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    navigator.camera.getPicture(success, failure, {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType,
      targetWidth: 800,
      targetHeight: 600,
      quality: 100,
      correctOrientation: true,
    });
    Meteor.setTimeout(() => {
      dispatch({ type: 'profile/SET_BACKGROUND_UPLOADING', isUploading: true });
    }, 1000);
  } else {
    const file = e.target.files[0];
    uploader.send(file, handleResponse);
    Meteor.setTimeout(() => {
      dispatch({ type: 'profile/SET_BACKGROUND_UPLOADING', isUploading: true });
    }, 1000);
  }
};

export const toggleNotificationSetting = type => () => Meteor.call('users.toggleNotificationSetting', type);

export const togglePrivacySetting = type => () => Meteor.call('users.togglePrivacySetting', type);
