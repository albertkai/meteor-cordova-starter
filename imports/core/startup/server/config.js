import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
// import { BrowserPolicy } from 'meteor/browser-policy-common';
import AWS from 'aws-sdk';

// Configure meteor email module to use Amazon SES
Meteor.startup(() => {
  process.env.MAIL_URL = `smtp://${Meteor.settings.smtp.username}:${Meteor.settings.smtp.password}@${Meteor.settings.smtp.host}`;
  // Meteor.users.remove({});
});

ServiceConfiguration.configurations.remove({
  service: 'facebook',
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: Meteor.settings.facebook.appId,
  secret: Meteor.settings.facebook.secret,
});

ServiceConfiguration.configurations.remove({
  service: 'vk',
});

ServiceConfiguration.configurations.insert({
  service: 'vk',
  appId: Meteor.settings.vk.appId, // Your app id
  secret: Meteor.settings.vk.secret, // Your app secret
  scope: 'email,country', // Your app scope
});

ServiceConfiguration.configurations.remove({
  service: 'twitter',
});

ServiceConfiguration.configurations.insert({
  service: 'twitter',
  consumerKey: Meteor.settings.twitter.key,
  loginStyle: 'popup',
  secret: Meteor.settings.twitter.secret,
});

AWS.config.update({
  accessKeyId: Meteor.settings.AWSAccessKeyId,
  secretAccessKey: Meteor.settings.AWSSecretAccessKey,
});

AWS.config.region = 'eu-central-1';
