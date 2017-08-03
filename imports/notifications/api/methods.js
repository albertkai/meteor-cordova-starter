import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';

const client = new OneSignalClient(
  Meteor.settings.public.oneSignal.appId,
  Meteor.settings.public.oneSignal.restApiKey,
);

Meteor.methods({
  'push.send'(id) {
    console.log('Calling me');
    Meteor.setTimeout(() => {
      client.sendNotification('Кириллический текст', {
        include_player_ids: [id],
        contents: {
          ru: 'Физкульт, привет!',
        },
        url: 'https://google.com',
      }, 3000);
    });
  },
})