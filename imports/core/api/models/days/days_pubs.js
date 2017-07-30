import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { check } from 'meteor/check';

import { Days } from './days.js';

Meteor.publish('days.getUserDays', function (limit) {
  const yesterday = moment().subtract(24, 'hours').toISOString();
  console.log(yesterday);
  console.log(this.userId);
  console.log(Days.find({ createdAt: { $lte: yesterday }, userId: this.userId }).fetch());
  return Days.find({ createdAt: { $lte: yesterday }, userId: this.userId });
});

Meteor.publish('days.getToday', function () {
  return Days.find({ userId: this.userId }, { sort: { createdAt: -1 }, limit: 1 });
});
