import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { check } from 'meteor/check';

import { Days } from './days.js';

const indexes = ['first', 'second', 'third'];

Meteor.methods({
  'days.clean'() {
    Days.remove({});
  },

  'days.checkTextBlock'(dayId, name, text, min) {
    if (text.length >= min) {
      const user = Meteor.users.findOne(this.userId);
      const currentDay = Days.findOne(dayId);
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      const query = {
        $set: {
          'blocks.$.data.text': text,
        },
      };
      if (dayTimezone === currentUsersDayFormat) {
        query.$set['blocks.$.passed'] = true;
      }
      Days.update({
        _id: dayId,
        userId: this.userId,
        'blocks.name': name,
      }, query);
    }
  },

  'days.checkWakeUpBlock'(dayId) {
    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const wakeUpBlock = currentDay.blocks.find(b => b.name === 'wakeUp');
    if (wakeUpBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      if (dayTimezone === currentUsersDayFormat) {
        const { time } = wakeUpBlock.options;
        const usersTimeNow = moment.tz(timezone).format('HH:mm');
        const hourTime = parseInt(time.split(':')[0], 10);
        const hourNow = parseInt(usersTimeNow.split(':')[0], 10);
        const minutesTime = parseInt(time.split(':')[1], 10);
        const minutesNow = parseInt(usersTimeNow.split(':')[1], 10);
        if (hourTime > hourNow || (hourTime === hourNow && minutesNow <= minutesTime + 5)) {
          Days.update({
            _id: dayId,
            userId: this.userId,
            'blocks.name': 'wakeUp',
          }, {
            $set: {
              'blocks.$.passed': true,
              'blocks.$.data.time': usersTimeNow,
            },
          });
          return true;
        }
        return false;
      }
    }
  },

  'days.checkWaterBlock'(dayId) {
    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const waterBlock = currentDay.blocks.find(b => b.name === 'water');
    if (waterBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      if (dayTimezone === currentUsersDayFormat) {
        const currentVolume = waterBlock.data ? waterBlock.data.volume : 0;
        const isCheck = currentVolume >= 1800;
        const query = {
          $inc: {
            'blocks.$.data.volume': 200,
          },
        };
        if (isCheck) {
          query.$set = {
            'blocks.$.passed': true,
          };
        }
        Days.update({
          _id: dayId,
          userId: this.userId,
          'blocks.name': 'water',
        }, query);
        return 2000 - currentVolume - 200;
      }
    }
  },

  'days.updateTask'(dayId, text, index) {
    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const tasksBlock = currentDay.blocks.find(b => b.name === 'taskList');
    if (tasksBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      if (dayTimezone === currentUsersDayFormat) {
        Days.update({
          _id: dayId,
          userId: this.userId,
          'blocks.name': 'taskList',
        }, {
          $set: {
            [`blocks.$.data.${index}.text`]: text,
          },
        });
      }
    }
  },

  'days.updateTextBlock'(dayId, name, text) {
    Days.update({
      _id: dayId,
      userId: this.userId,
      'blocks.name': name,
    }, {
      $set: {
        ['blocks.$.data.text']: text,
      },
    });
  },

  'days.checkTask'(dayId, index) {
    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const tasksBlock = currentDay.blocks.find(b => b.name === 'taskList');
    if (tasksBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      if (dayTimezone === currentUsersDayFormat) {
        if (tasksBlock.data && tasksBlock.data[index].text) {
          const query = {
            $set: {
              [`blocks.$.data.${index}.checked`]: true,
            },
          };
          const allChecked = !indexes
            .filter(i => i !== index)
            .map(i => tasksBlock.data[i].checked)
            .includes(false);
          if (allChecked) query.$set['blocks.$.passed'] = true;
          Days.update({
            _id: dayId,
            userId: this.userId,
            'blocks.name': 'taskList',
          }, query);
          return allChecked;
        }
      }
    }
  },

  'days.checkSimpleBlock'(dayId, blockName) {
    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const tasksBlock = currentDay.blocks.find(b => b.name === blockName);
    if (tasksBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      console.log(dayTimezone);
      console.log(currentUsersDayFormat);
      if (dayTimezone === currentUsersDayFormat) {
        Days.update({
          _id: dayId,
          userId: this.userId,
          'blocks.name': blockName,
        }, {
          $set: {
            'blocks.$.passed': true,
          },
        });
      }
    }
  },
});