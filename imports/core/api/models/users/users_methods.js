import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

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
  'users.removeCurrentUser': function () {
    Meteor.users.remove(this.userId);
  },

  'users.setFee': function (amount) {
    const parsed = parseFloat(amount);
    const fee = parsed < 500 ? 500 : parsed;
    Meteor.users.update(this.userId, { $set: { 'fees.amount': fee } });
    return parsed >= 500;
  },

  'users.setCity': function (city) {
    Meteor.users.update(this.userId, { $set: { 'personalData.city': city } });
  },

  'users.setTimezone': function (timezone) {
    Meteor.users.update(this.userId, { $set: { 'personalData.timezone': timezone } });
  },

  'users.toggleBlock': function (name) {
    const block = Meteor.users.findOne(this.userId).blocks[name];
    if (!block) {
      const query = {
        $set: {
          [`blocks.${name}`]: {
            enabled: true,
          },
        },
      };
      if (options[name]) query.$set[`blocks.${name}`].options = options;
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

  'users.setBlockOption': function (name, option, value) {
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
});
