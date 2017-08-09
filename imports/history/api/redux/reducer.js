import { fromJS } from 'immutable';

import { coreConstants } from '/imports/core';
import * as c from './constants';

const initialState = fromJS({
  limit: coreConstants.HISTORY_LIMIT,
  scrollHeight: null,
  historyLength: null,
});

export function historyReducer(state = initialState, action) {
  switch (action.type) {
    case c.COUNT_USERS_HISTORY:
      return state.set('historyLength', action.historyLength);
    case c.INCREMENT_HISTORY_LIMIT:
      return state.withMutations((st) => {
        st.set('limit', state.get('limit') + coreConstants.HISTORY_LIMIT);
        st.set('scrollHeight', action.scrollHeight);
      });
    case c.RESET_HISTORY_LIMIT:
      return state.withMutations((st) => {
        st.set('limit', coreConstants.HISTORY_LIMIT);
        st.set('historyItemsCount', null);
      });
    // Placeholder (used by robot)
    default:
      return state;
  }
}
