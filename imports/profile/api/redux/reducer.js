import { fromJS } from 'immutable';

import * as c from './constants.js';

const initialState = fromJS({
  wakeUp: '05:30',
  sport: '1',
  meditation: {
    time: '10',
    voice: 'female',
    background: 'none',
  },
  openedTab: 'info',
});

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case c.SET_BLOCK_OPTION:
			return state.setIn(action.path, action.value);
		case c.TOGGLE_TAB:
			return state.set('openedTab', action.tab);
		// Placeholder (used by robot)
    default:
      return state;
  }
}
