import { fromJS } from 'immutable';

import * as c from './constants.js';

const initialState = fromJS({
  customTaskModalData: null,
});

export function mydayReducer(state = initialState, action) {
  switch (action.type) {
    case c.OPEN_CUSTOM_TASK_MODAL:
			return state.set('customTaskModalData', action.task);
    case c.CLOSE_CUSTOM_TASK_MODAL:
      return state.set('customTaskModalData', null);
		  // Placeholder (used by robot)
    default:
      return state;
  }
}
