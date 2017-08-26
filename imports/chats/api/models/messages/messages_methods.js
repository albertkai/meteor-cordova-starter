import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import sanitize from 'sanitize-html';

import { Messages } from './messages.js';

Meteor.methods({
  'messages.send': function send(thread, content, type) {
    check(thread, String);
    check(content, String);
    check(type, String);

    const {
      personalData: {
        avatar,
        firstName,
        lastName,
      },
    } = Meteor.users.findOne(this.userId);
    console.log(thread);
    console.log(sanitize(content));
    console.log(type);
    // Messages.insert({
    //   author: this.userId,
    //   thread,
    //   userData: {
    //     avatar,
    //     firstName,
    //     lastName,
    //   },
    //   content,
    //   type,
    // });
  },
});
