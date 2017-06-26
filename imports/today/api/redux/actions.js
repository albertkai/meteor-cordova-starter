import { Notify } from '/imports/notifications';

export const checkTextBlock = (dayId, blockName, text, min) => () => {
  if (text.length < min) {
    Notify.alert({
      title: 'Слишком короткий ответ',
      text: 'Длина текста долдна быть минимум 200 символов',
      type: 'error',
    });
  } else {
    Meteor.call('days.checkTextBlock', dayId, blockName, text, min, (err) => {
      if (err) {
        Notify.alert({
          title: 'Произошла ошибка',
          text: 'Пожалуйста напишите в службу поддержки',
          type: 'error',
        });
      } else {
        Notify.alert({
          title: 'Ты молодец!',
          text: 'Дневное задание выполнено!',
          type: 'success',
        });
      }
    });
  }
};

export const checkWakeUpBlock = dayId => () => {
  Meteor.call('days.checkWakeUpBlock', dayId, (err, checked) => {
    if (err) {
      Notify.alert({
        title: 'Произошла ошибка',
        text: 'Пожалуйста напишите в службу поддержки',
        type: 'error',
      });
    } else if (checked) {
      Notify.alert({
        title: 'Доброе утро!',
        text: 'Ранний подъем это основной залог продуктивного дня! Успехов тебе сегодня!',
        type: 'success',
      });
    } else {
      Notify.alert({
        title: 'Упс!',
        text: 'Кажется кто-то заспал! Придется заплатить штраф:)',
        type: 'error',
      });
    }
  });
};

export const checkWaterBlock = dayId => () => {
  Meteor.call('days.checkWaterBlock', dayId, (err, waterLeft) => {
    if (err) {
      Notify.alert({
        title: 'Произошла ошибка',
        text: 'Пожалуйста напишите в службу поддержки',
        type: 'error',
      });
    } else if (waterLeft === 0) {
      Notify.alert({
        title: 'Отлично!',
        text: 'Вы выпили достаточно воды! Почувствовали изменения?',
        type: 'success',
      });
    } else {
      Notify.alert({
        title: 'Отлично!',
        text: `Осталось выпить еще ${(waterLeft / 1000).toFixed(1)} литра воды сегодня`,
        type: 'success',
      });
    }
  });
};

export const updateTask = (dayId, text, index) => () => {
  Meteor.call('days.updateTask', dayId, text, index);
};

export const checkTask = (dayId, index) => () => {
  Meteor.call('days.checkTask', dayId, index, (err, passed) => {
    if (err) {
      Notify.alert({
        title: 'Произошла ошибка',
        text: 'Пожалуйста напишите в службу поддержки',
        type: 'error',
      });
    } else {
      if (passed) {
        Notify.alert({
          title: 'Супер! Все цели выполнены',
          text: 'Такими маленькими, но верными шагами вы непременно придете к своим большим целям, причем быстрее чем вы думаете!',
          type: 'success',
        });
      }
    }
  });
};

export const checkSimpleBlock = (dayId, blockName) => () => {
  Meteor.call('days.checkSimpleBlock', dayId, blockName, (err) => {
    if (err) {
      Notify.alert({
        title: 'Произошла ошибка',
        text: 'Пожалуйста напишите в службу поддержки',
        type: 'error',
      });
    } else {
      Notify.alert({
        title: 'Супер!',
        text: 'Вы стали еще немного ближе к своим целям!',
        type: 'success',
      });
    }
  });
};
