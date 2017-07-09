import { fromJS } from 'immutable';

import * as c from './constants.js';

const initialState = fromJS({
  chatType: 'group',
});

export function chatsReducer(state = initialState, action) {
  switch (action.type) {
    case c.TOGGLE_CHAT_TYPE:
			return state.set('chatType', action.chatType);
		// Placeholder (used by robot)
    default:
      return state;
  }
}
