import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'users.removeCurrentUser': function () {
    Meteor.users.remove(this.userId);
  },
});
