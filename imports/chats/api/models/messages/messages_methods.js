import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from './messages.js';

Meteor.methods({
  'messages.send'(thread, content, type) {
    const {
      personalData: {
        avatar,
        firstName,
        lastName,
      },
    } = Meteor.users.findOne(this.userId);
    Messages.insert({
      author: this.userId,
      thread,
      userData: {
        avatar,
        firstName,
        lastName,
      },
      content,
      type,
      createdAt: Date.now(),
    });
  },
});
