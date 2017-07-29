import { fromJS } from 'immutable';

import * as c from './constants';

const initialState = fromJS({
  clickCount: 0,
  menuOpened: false,
  wakeUpModalShown: false,
  daySuccessModalShown: false,
  vacationModalShown: false,
  feesModalShown: false,
  payFeesModalShown: false,
});

export function coreReducer(state = initialState, action) {
  switch (action.type) {
    case c.INCREMENT_CLICK_COUNT:
      return state.set('clickCount', state.get('clickCount') + 1);
    case c.TOGGLE_MENU:
			return state.set('menuOpened', !state.get('menuOpened'));
		case c.CLOSE_MENU:
      return state.set('menuOpened', false);
		case c.TOGGLE_WAKE_UP_MODAL:
			return state.set('wakeUpModalShown', !state.get('wakeUpModalShown'));
		case c.TOGGLE_DAY_SUCCESS_MODAL:
			return state.set('daySuccessModalShown', !state.get('daySuccessModalShown'));
		case c.TOGGLE_VACATION:
			return state.set('vacationModalShown', !state.get('vacationModalShown'));
		case c.TOGGLE_FEES_MODAL:
			return state.set('feesModalShown', !state.get('feesModalShown'));
		case c.TOGGLE_PAY_FEES_MODAL:
			return state.set('payFeesModalShown', !state.get('payFeesModalShown'));
		// Placeholder (used by robot)
    default:
      return state;
  }
}
