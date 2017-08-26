import OneSignalClient from 'node-onesignal';

export const onesignalClient = new OneSignalClient(
  Meteor.settings.public.oneSignal.appId,
  Meteor.settings.public.oneSignal.restApiKey,
);

export default onesignalClient;
