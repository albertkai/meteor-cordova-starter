import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.data', function data() {
  if (!this.userId) {
    return this.ready();
  }
  const query = { _id: this.userId };
  return Meteor.users.find(query);
});

Meteor.publish('users.groupUsers', function groupUsers() {
  const user = Meteor.users.findOne(this.userId);
  const { serviceData: { groupId } } = user;
  return Meteor.users.find({ 'serviceData.groupId': groupId });
});
