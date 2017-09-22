import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import { AppRouter } from './routes';
import { store } from '../../api/redux/store';

// Import methods for optimistic UI here

if (Meteor.isCordova) {
  initReactFastclick();
  // Meteor.startup(() => {
  //   window.plugins.OneSignal
  //     .startInit(Meteor.settings.public.oneSignal.appId)
  //     .handleNotificationReceived(function(jsonData) {
  //       console.log('Did I receive a notification: ' + JSON.stringify(jsonData));
  //     })
  //     .endInit();
  // });
}

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById('app'),
  );
});
