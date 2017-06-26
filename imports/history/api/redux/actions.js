import { Meteor } from 'meteor/meteor';
import { Notify } from '/imports/notifications';

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
