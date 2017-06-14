import { fromJS } from 'immutable';

import * as c from './constants';

const initialState = fromJS({
  clickCount: 0,
});

export function coreReducer(state = initialState, action) {
  switch (action.type) {
    case c.INCREMENT_CLICK_COUNT:
      return state.set('clickCount', state.get('clickCount') + 1);
    // Placeholder (used by robot)
    default:
      return state;
  }
}
