import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Groups } from './groups.js';

Meteor.methods({
  'groups.setName': function (groupId, name) {
    Groups.update({ $set: { name } });
  },
});
