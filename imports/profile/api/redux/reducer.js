import { fromJS } from 'immutable';

import * as c from './constants.js';

const initialState = fromJS({
  choosePictureModalShown: false,
  avatarIsUploading: false,
  backgroundIsUploading: false,
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
		case c.TOGGLE_CHOOSE_PICTURE_MODAL:
			return state.set('choosePictureModalShown', !state.get('choosePictureModalShown'));
		case c.SET_AVATAR_UPLOADING:
			return state.set('avatarIsUploading', action.isUploading);
		case c.SET_BACKGROUND_UPLOADING:
			return state.set('backgroundIsUploading', action.isUploading);
		// Placeholder (used by robot)
    default:
      return state;
  }
}
