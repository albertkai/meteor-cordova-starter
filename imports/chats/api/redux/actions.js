import { Meteor } from 'meteor/meteor';

import * as c from './constants';

export const sendMessage = (thread, content, type) => () => {
  Meteor.call('messages.send', thread, content, type);
};

export const toggleChatType = chatType => ({
  type: c.TOGGLE_CHAT_TYPE,
  chatType,
});

// Placeholder (used by robot)
