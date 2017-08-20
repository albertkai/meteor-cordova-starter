import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { Random } from 'meteor/random';
import _ from 'underscore';
import { check } from 'meteor/check';

import { Days, Tasks } from '/imports/core';

const options = {
  wakeUp: {
    time: '05:00',
  },
  sport: {
    type: '1',
  },
  meditation: {
    time: '10',
    voice: 'male',
    background: 'none',
  },
};

Meteor.methods({
  'users.removeCurrentUser': function removeCurrentUser() {
    Meteor.users.remove(this.userId);
  },

  'users.setFee': function setFee(amount) {
    check(amount, String);

    const parsed = parseFloat(amount);
    const fee = parsed < 500 ? 500 : parsed;
    Meteor.users.update(this.userId, { $set: { 'fees.amount': fee } });
    return parsed >= 500;
  },

  'users.setCity': function setCity(city) {
    check(city, String);

    Meteor.users.update(this.userId, { $set: { 'personalData.city': city } });
  },

  'users.setTimezone': function setTimezone(timezone) {
    check(timezone, String);

    Meteor.users.update(this.userId, { $set: { 'personalData.timezone': timezone } });
  },

  'users.toggleNotificationSetting': function toggleNotificationSetting(type) {
    check(type, String);

    const user = Meteor.users.findOne(this.userId);
    const setting = user.serviceData.notifications[type];
    if (type) {
      Meteor.users.update(this.userId, {
        $set: {
          [`serviceData.notifications.${type}`]: !setting,
        },
      });
    }
  },

  'users.togglePrivacySetting': function togglePrivacySetting(type) {
    check(type, String);

    const user = Meteor.users.findOne(this.userId);
    const setting = user.serviceData.privacy[type];
    if (type) {
      Meteor.users.update(this.userId, {
        $set: {
          [`serviceData.privacy.${type}`]: !setting,
        },
      });
    }
  },

  'users.setProfileField': function setProfileField(name, value) {
    check(name, String);
    check(value, String);

    Meteor.users.update(this.userId, {
      $set: {
        [`personalData.${name}`]: value,
      },
    });
  },

  'users.addCustomTask': function addCustomTask(task) {
    check(task, Object);

    if (task.name) {
      const taskObj = Object.assign({}, task);
      taskObj._id = Random.id();
      taskObj.createdAt = Date.now();
      taskObj.enabled = true;
      console.log(taskObj);
      Meteor.users.update(this.userId, {
        $addToSet: {
          'blocks.custom': taskObj,
        },
      });
      return true;
    }
    throw new Meteor.Error('Name needs to be provided');
  },

  'users.updateCustomTask': function addCustomTask(task) {
    check(task, Object);

    if (task.name) {
      Meteor.users.update({ _id: this.userId, 'blocks.custom._id': task._id }, {
        $set: {
          'blocks.custom.$.name': task.name,
          'blocks.custom.$.frequency': task.frequency,
          'blocks.custom.$.color': task.color,
          'blocks.custom.$.type': task.type,
        },
      });
      return true;
    }
    throw new Meteor.Error('Name needs to be provided');
  },

  'users.removeCustomTask': function addCustomTask(task) {
    check(task, Object);

    Meteor.users.update(this.userId, {
      $pull: {
        'blocks.custom': task,
      },
    });
    return true;
  },

  'users.toggleCustomBlock': function toggleCustomBlock(_id) {
    check(_id, String);

    const customBlocks = Meteor.users.findOne(this.userId).blocks.custom;
    if (customBlocks) {
      const block = customBlocks.find(b => b._id === _id);
      if (block) {
        const { enabled } = block;
        Meteor.users.update(
          { _id: this.userId, 'blocks.custom._id': _id },
          {
            $set: {
              'blocks.custom.$.enabled': !enabled,
            },
          },
        );
        return !enabled;
      }
    }
    return false;
  },

  'users.toggleBlock': function toggleBlock(name) {
    check(name, String);

    const block = Meteor.users.findOne(this.userId).blocks[name];
    if (!block) {
      const query = {
        $set: {
          [`blocks.${name}.enabled`]: true,
        },
      };
      if (options[name]) query.$set[`blocks.${name}.options`] = options[name];
      Meteor.users.update(this.userId, query);
      return true;
    }
    const { enabled } = block;
    Meteor.users.update(this.userId, {
      $set: {
        [`blocks.${name}.enabled`]: !enabled,
      },
    });
    return !enabled;
  },

  'users.setBlockOption': function setBlockOption(name, option, value) {
    check(name, String);
    check(option, String);
    check(value, String);

    const block = Meteor.users.findOne(this.userId).blocks[name];
    if (!block) {
      Meteor.users.update(this.userId, {
        $set: {
          [`blocks.${name}.enabled`]: false,
          [`blocks.${name}.options.${option}`]: value,
        },
      });
    } else {
      Meteor.users.update(this.userId, {
        $set: {
          [`blocks.${name}.options.${option}`]: value,
        },
      });
    }
  },

  'users.uploadAvatar': function uploadAvatar(file) {
    check(file, String);

    Meteor.users.update(this.userId, {
      $set: {
        'personalData.avatar': file,
      },
    });
  },

  'users.takeVacation': function takeVacation(days) {
    check(days, String);

    const endDate = moment().add(parseInt(days, 10) + 1, 'days').startOf('day').valueOf();
    Meteor.users.update(this.userId, {
      $set: {
        'serviceData.vacationUntil': endDate,
      },
    });
  },

  'users.stopVacation': function takeVacation() {
    Meteor.users.update(this.userId, {
      $set: {
        'serviceData.vacationUntil': null,
      },
    });
  },

  'users.uploadBackground': function uploadBackground(file) {
    check(file, String);

    Meteor.users.update(this.userId, {
      $set: {
        'personalData.background': file,
      },
    });
  },

  'users.setIntroductionSeen': function setIntroductionSeen(name) {
    check(name, String);

    Meteor.users.update(this.userId, {
      $set: {
        [`serviceData.introduction.${name}`]: true,
      },
    });
  },

  'users.updateNotificationsId': function updateNotificationsId(userId) {
    check(userId, String);

    Meteor.users.update(this.userId, { $set: { 'serviceData.notifications.oneSignalId': userId } });
  },

  'users.goToDay': function goToDay(userId, day) {
    check(userId, String);
    check(day, Number);

    if (!this.isSimulation) {
      const user = Meteor.users.findOne(userId);
      const { blocks, personalData: { timezone } } = user;
      const newCreatedAt = moment().subtract(day - 1, 'days').valueOf();
      Meteor.users.update(userId, { $set: { createdAt: newCreatedAt, 'fees.items': [], 'fees.toPay': 0 } });
      Days.remove({ userId });
      _.range(0, day).forEach((n) => {
        console.log('Adding day', n + 1);
        const task = Tasks.findOne({ day: n + 1 });
        if (n + 1 !== day) {
          Days.insert({
            userId,
            index: n + 1,
            createdAt: moment(newCreatedAt).add(n, 'days').subtract(1, 'hour').toISOString(),
            timezone,
            blocks: [
              {
                name: 'dailyTask',
                passed: true,
                closed: false,
                timezone,
                options: {
                  html: task.html,
                  day: n + 1,
                },
              },
            ],
          });
        } else {
          const newBlocks = [];
          newBlocks.push({
            name: 'dailyTask',
            passed: false,
            closed: false,
            options: {
              html: task.html,
              day,
            },
          });
          Object.keys(blocks).forEach((block) => {
            const blockData = blocks[block];
            const { enabled, options: opt } = blockData;
            if (enabled) {
              const blockDoc = {
                name: block,
                passed: false,
                closed: false,
              };
              if (opt) {
                blockDoc.options = opt;
              }
              newBlocks.push(blockDoc);
            }
          });
          Days.insert({
            userId,
            index: n + 1,
            createdAt: moment(newCreatedAt).add(n, 'days').subtract(1, 'hour').startOf('day').toISOString(),
            timezone,
            blocks: newBlocks,
          });
        }
      });
    }
  },
});
