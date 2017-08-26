import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Messages } from './messages.js';

Meteor.publish({
  'messages.listMessages': function listMessages(thread, limit) {
    check(thread, String);

    console.log(thread);
    console.log(limit);
    console.log(Messages.find({ thread }, { sort: { createdAt: -1 }, limit }).count());
    return Messages.find({ thread }, { sort: { createdAt: -1 }, limit });
  },

  'messages.countMessages': function countMessages(thread) {
    check(thread, String);

    Counts.publish(this, 'messagesLength', Messages.find({ thread }));
  },
});
