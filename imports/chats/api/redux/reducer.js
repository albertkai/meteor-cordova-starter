import { fromJS } from 'immutable';

import { coreConstants } from '/imports/core';
import * as c from './constants.js';

const initialState = fromJS({
  initiallyScrolled: false,
  component: 'chat',
  limit: coreConstants.MESSAGES_LIMIT,
  scrollHeight: null,
});

export function chatsReducer(state = initialState, action) {
  switch (action.type) {
    case c.TOGGLE_CHAT_TYPE:
      return state.withMutations((st) => {
        st.set('component', action.chatType);
        st.set('initiallyScrolled', false);
        st.set('limit', coreConstants.MESSAGES_LIMIT);
      });
    case c.INCREMENT_MESSAGES_LIMIT:
      return state.withMutations((st) => {
        st.set('limit', state.get('limit') + (coreConstants.MESSAGES_LIMIT * 2));
        st.set('scrollHeight', action.scrollHeight);
      });
    case c.RESET_MESSAGES_LIMIT:
      return state.withMutations((st) => {
        st.set('limit', coreConstants.MESSAGES_LIMIT);
        st.set('initiallyScrolled', false);
      });
    case c.SET_INITIALLY_SCROLLED:
      return state.set('initiallyScrolled', true);
    // Placeholder (used by robot)
    default:
      return state;
  }
}
