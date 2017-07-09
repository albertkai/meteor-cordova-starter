import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from './messages.js';

Meteor.publish({
  'messages.listMessages'(thread) {
    return Messages.find({ thread });
  },
});