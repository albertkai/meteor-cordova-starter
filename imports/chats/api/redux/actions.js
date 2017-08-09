import { Meteor } from 'meteor/meteor';

import * as c from './constants';

export const sendMessage = (thread, content, type) => () => {
  Meteor.call('messages.send', thread, content, type);
};

export const toggleChatType = chatType => ({
  type: c.TOGGLE_CHAT_TYPE,
  chatType,
});

export const incrementMessagesLimit = () => ({ type: c.INCREMENT_MESSAGES_LIMIT });

export const resetMessagesLimit = () => ({ type: c.RESET_MESSAGES_LIMIT });

export const setInitiallyScrolled = () => ({ type: c.SET_INITIALLY_SCROLLED });

// Placeholder (used by robot)

export const messagesLoadMore = elem => (dispatch) => {
  if (elem.scrollTop === 0) {
    const scrollHeight = elem.scrollHeight;
    dispatch({
      type: c.INCREMENT_MESSAGES_LIMIT,
      scrollHeight,
    });
  }
};
