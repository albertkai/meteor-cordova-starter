import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.data', function () {
  if (!this.userId) {
    return this.ready();
  }
  const query = { _id: this.userId };
  return Meteor.users.find(query);
});
