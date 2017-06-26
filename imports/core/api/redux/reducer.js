import { fromJS } from 'immutable';

import * as c from './constants';

const initialState = fromJS({
  clickCount: 0,
  menuOpened: false,
});

export function coreReducer(state = initialState, action) {
  switch (action.type) {
    case c.INCREMENT_CLICK_COUNT:
      return state.set('clickCount', state.get('clickCount') + 1);
    case c.TOGGLE_MENU:
			return state.set('menuOpened', !state.get('menuOpened'));
		case c.CLOSE_MENU:
      return state.set('menuOpened', false);
		// Placeholder (used by robot)
    default:
      return state;
  }
}
