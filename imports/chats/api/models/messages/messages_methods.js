import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from './messages.js';

Meteor.methods({
  'messages.send'(thread, content, type) {
    Messages.insert({
      author: this.userId,
      thread,
      content,
      type,
      createdAt: Date.now(),
    });
  },
});
