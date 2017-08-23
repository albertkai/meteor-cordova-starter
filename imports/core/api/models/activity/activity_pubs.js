import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Activity } from './activity.js';

Meteor.publish('activity.groupActivity', function groupActivity() {
  const user = Meteor.users.findOne(this.userId);
  const { serviceData: { groupId } } = user;
  return Activity.find({ groupId }, { sort: { createdAt: -1 }, limit: 30 });
});
