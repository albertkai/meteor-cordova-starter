import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Settings = new Mongo.Collection('settings');

// const settingsSchema = new SimpleSchema({});

// Settings.attachSchema(settingsSchema);

export default Settings;
  