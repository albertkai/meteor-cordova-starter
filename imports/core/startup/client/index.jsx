import React from 'react';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import { AppRouter } from './routes';
import { store } from '../../api/redux/store';

// Import methods for optimistic UI here
import '/imports/core/api/models/users/users_methods';
import '/imports/core/api/models/days/days_methods';

if (Meteor.isCordova) {
  initReactFastclick();
  Meteor.startup(() => {
    console.log('Initializing cordova');
    window.plugins.OneSignal
      .startInit(Meteor.settings.public.oneSignal.appId)
      .handleNotificationReceived(function(jsonData) {
        console.log('Did I receive a notification: ' + JSON.stringify(jsonData));
      })
      .endInit();
  });
}

Meteor.startup(() => {
  initReactFastclick();
  Meteor.subs = new SubsManager();
  render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById('app'),
  );
});
