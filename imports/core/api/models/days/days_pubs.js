import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Days } from './days.js';

Meteor.publish('days.getUserDays', function (limit) {
  return Days.find({ userId: this.userId });
});

Meteor.publish('days.getToday', function () {
  return Days.find({ userId: this.userId }, { sort: { createdAt: -1 }, limit: 1 });
});
