import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Groups } from './groups.js';

Meteor.methods({
  'groups.setName': function setName(groupId, name) {
    check(groupId, String);
    check(name, String);

    Groups.update(groupId, { $set: { name } });
  },
});
