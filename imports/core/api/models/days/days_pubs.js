import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { check } from 'meteor/check';

import { coreConstants } from '/imports/core';
import { Days } from './days.js';

Meteor.publish('days.getUserDays', function getUserDays(limit = coreConstants.HISTORY_LIMIT) {
  check(limit, Number);

  const yesterday = moment().subtract(24, 'hours').toISOString();
  return Days.find({
    createdAt: {
      $lte: yesterday,
    },
    userId: this.userId,
  }, {
    sort: {
      createdAt: -1,
    },
    limit,
  });
});

Meteor.publish('days.getToday', function getToday() {
  return Days.find({ userId: this.userId }, { sort: { createdAt: -1 }, limit: 1 });
});
