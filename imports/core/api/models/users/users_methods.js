import { Meteor } from 'meteor/meteor';
import moment from 'moment';
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

    const endDate = moment().add(parseInt(days, 10), 'days').toDate();
    Meteor.users.update(this.userId, { 'fees.vacation': endDate });
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
});
