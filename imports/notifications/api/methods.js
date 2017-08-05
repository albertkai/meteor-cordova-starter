import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';

const client = new OneSignalClient(
  Meteor.settings.public.oneSignal.appId,
  Meteor.settings.public.oneSignal.restApiKey,
);

Meteor.methods({
  'push.send'() {
    console.log('Calling me');
    const user = Meteor.users.findOne(this.userId);
    const { oneSignalId } = user.serviceData.notifications;
    Meteor.setTimeout(() => {
      console.log(oneSignalId);
      client.sendNotification('Кириллический текст', {
        include_player_ids: [oneSignalId],
        contents: {
          en: 'Yoyoyo',
          ru: 'Физкульт, привет!',
        },
      }, 3000);
    });
  },
})