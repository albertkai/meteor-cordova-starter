import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { onesignalClient } from '/imports/notifications';
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
      serviceData: {
        groupId,
      },
    } = Meteor.users.findOne(this.userId);
    if (content) {
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
      });
      Meteor.users
        .find({ 'serviceData.groupId': groupId, _id: { $ne: this.userId } })
        .forEach((u) => {
          const { serviceData: { notifications: { messages } } } = u;
          if (messages) {
            onesignalClient.sendNotification('Новое сообщение', {
              include_player_ids: [u._id],
              contents: {
                en: `${firstName} ${lastName}: ${type === 'text' ? content : 'New message'}`,
                ru: `${firstName} ${lastName}: ${type === 'text' ? content : 'Новое сообщение'}`,
              },
            });
          }
        });
    }
  },
});
