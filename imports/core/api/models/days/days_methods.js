import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { check } from 'meteor/check';

import { Days } from './days.js';

Meteor.methods({
  'days.checkTextBlock': function checkTextBlock(dayId, name, text, min) {
    check(dayId, String);
    check(name, String);
    check(text, String);
    check(min, Number);

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
      return currentDay.blocks.filter(b => b.passed).length + 1 === currentDay.blocks.length;
    }
    return false;
  },

  'days.checkWakeUpBlock': function checkWakeUpBlock(dayId) {
    check(dayId, String);

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
    return false;
  },

  'days.checkWaterBlock': function checkWaterBlock(dayId) {
    check(dayId, String);

    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const waterBlock = currentDay.blocks.find(b => b.name === 'water');
    if (waterBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      if (dayTimezone === currentUsersDayFormat) {
        const currentVolume = (waterBlock.data && waterBlock.data.volume) || 0;
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
    return false;
  },

  'days.addTask': function addTask(dayId, text) {
    check(dayId, String);
    check(text, String);

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
          $push: {
            'blocks.$.data.tasks': { text, checked: false },
          },
        });
      }
    }
  },

  'days.removeTask': function removeTask(dayId, index) {
    check(dayId, String);
    check(index, Number);

    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const tasksBlock = currentDay.blocks.find(b => b.name === 'taskList');
    if (tasksBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      if (dayTimezone === currentUsersDayFormat) {
        const currentTasks = tasksBlock.data.tasks;
        currentTasks.splice(index, 1);
        Days.update({
          _id: dayId,
          userId: this.userId,
          'blocks.name': 'taskList',
        }, {
          $set: {
            'blocks.$.data.tasks': currentTasks,
          },
        });
      }
    }
  },

  'days.updateTask': function updateTask(dayId, text, index) {
    check(dayId, String);
    check(text, String);
    check(index, Number);

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

  'days.updateTextBlock': function updateTextBlock(dayId, name, text) {
    check(dayId, String);
    check(name, String);
    check(text, String);

    Days.update({
      _id: dayId,
      userId: this.userId,
      'blocks.name': name,
    }, {
      $set: {
        'blocks.$.data.text': text,
      },
    });
  },

  'days.checkTask': function checkTask(dayId, index) {
    check(dayId, String);
    check(index, Number);

    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const tasksBlock = currentDay.blocks.find(b => b.name === 'taskList');
    if (tasksBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
      if (dayTimezone === currentUsersDayFormat) {
        if (tasksBlock.data && tasksBlock.data.tasks && tasksBlock.data.tasks[index]) {
          const currentTasks = tasksBlock.data.tasks;
          currentTasks[index].checked = true;
          const query = {
            $set: {
              'blocks.$.data.tasks': currentTasks,
            },
          };
          const allChecked = !currentTasks
            .map(task => task.checked)
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
    return false;
  },

  'days.checkMeditationBlock': function checkMeditationBlock() {
    const currentDay = Days.findOne({ userId: this.userId }, { sort: { createdAt: -1 } });
    const targetBlock = currentDay.blocks.find(b => b.name === 'meditation');
    if (targetBlock) {
      Days.update({
        _id: currentDay._id,
        userId: this.userId,
        'blocks.name': 'meditation',
      }, {
        $set: {
          'blocks.$.passed': true,
        },
      });
      return currentDay.blocks.filter(b => b.passed).length + 1 === currentDay.blocks.length;
    }
    return false;
  },

  'days.checkSportBlock': function checkSportBlock() {
    const currentDay = Days.findOne({ userId: this.userId }, { sort: { createdAt: -1 } });
    const targetBlock = currentDay.blocks.find(b => b.name === 'sport');
    if (targetBlock) {
      Days.update({
        _id: currentDay._id,
        userId: this.userId,
        'blocks.name': 'sport',
      }, {
        $set: {
          'blocks.$.passed': true,
        },
      });
      return currentDay.blocks.filter(b => b.passed).length + 1 === currentDay.blocks.length;
    }
    return false;
  },

  'days.checkSimpleBlock': function checkSimpleBlock(dayId, blockName) {
    check(dayId, String);
    check(blockName, String);

    const user = Meteor.users.findOne(this.userId);
    const currentDay = Days.findOne(dayId);
    const tasksBlock = currentDay.blocks.find(b => b.name === blockName);
    if (tasksBlock) {
      const { timezone } = user.personalData;
      const dayTimezone = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
      const currentUsersDayFormat = moment.tz(timezone).format('DD/MM/YYYY');
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
      return currentDay.blocks.filter(b => b.passed).length + 1 === currentDay.blocks.length;
    }
    return false;
  },

  'days.countUsersHistory': function countUsersHistory() {
    const yesterday = moment().subtract(24, 'hours').toISOString();
    return Days.find({ createdAt: { $lte: yesterday }, userId: this.userId }).count();
  },
});
