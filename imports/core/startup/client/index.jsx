import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import { AppRouter } from './routes';
import { store } from '../../api/redux/store';

// Import methods for optimistic UI here
import '/imports/core/api/models/users/users_methods';
import '/imports/core/api/models/days/days_methods';

Meteor.startup(() => {
  initReactFastclick();
  render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById('app'),
  );
});
