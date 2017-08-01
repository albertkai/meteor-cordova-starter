import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { check } from 'meteor/check';

import { Days } from './days.js';

Meteor.publish('days.getUserDays', function (limit) {
  const yesterday = moment().subtract(24, 'hours').toISOString();
  return Days.find({ createdAt: { $lte: yesterday }, userId: this.userId }, { limit: 20 });
});

Meteor.publish('days.getToday', function () {
  return Days.find({ userId: this.userId }, { sort: { createdAt: -1 }, limit: 1 });
});
