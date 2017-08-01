import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { Days, Tasks } from '/imports/core';

const steps = [
  'intro',
  'about',
  'history',
  'fees',
  'final',
];

Meteor.methods({
  'onboard.onboardNextStep'(timezone) {
    const user = Meteor.users.findOne(this.userId);
    const { step } = user.onboard;
    const query = { $set: {} };
    if (timezone) {
      query.$set['personalData.timezone'] = timezone;
    }
    if (step !== 'final') {
      query.$set['onboard.step'] = steps[steps.indexOf(step) + 1];
    } else {
      query.$set['onboard.isFinished'] = true;
      const task = Tasks.findOne({ day: 1 });
      const obj = {
        userId: this.userId,
        createdAt: moment().toISOString(),
        blocks: [],
      };
      obj.blocks.push({
        name: 'dailyTask',
        passed: false,
        closed: false,
        options: {
          html: task.html,
          day: 1,
        },
      });
      Days.insert(obj);
    }
    Meteor.users.update(this.userId, query);
  },

  'onboard.onboardBack'() {
    console.log('yoo');
    const user = Meteor.users.findOne(this.userId);
    const { step } = user.onboard;
    const query = { $set: {} };
    if (step !== 'intro') {
      query.$set['onboard.step'] = steps[steps.indexOf(step) - 1];
    }
    Meteor.users.update(this.userId, query);
  },
});