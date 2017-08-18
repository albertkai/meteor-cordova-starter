import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const personalDataSchema = new SimpleSchema({
  avatar: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
    optional: true,
  },
  timezone: {
    type: String,
    optional: true,
  },
  city: {
    type: String,
    optional: true,
  },
  sphere: {
    type: String,
    optional: true,
  },
  facebook: {
    type: String,
    optional: true,
  },
  vkontakte: {
    type: String,
    optional: true,
  },
  instagram: {
    type: String,
    optional: true,
  },
  about: {
    type: String,
    optional: true,
  },
  facebookId: {
    type: String,
    optional: true,
  },
  vkId: {
    type: String,
    optional: true,
  },
  twitterId: {
    type: String,
    optional: true,
  },
  background: {
    type: String,
  },
  createdAt: {
    type: Number,
    autoValue() {
      return Date.now();
    },
  },
  language: {
    type: String,
  },
});

const serviceDataSchema = new SimpleSchema({
  groupId: {
    type: String,
  },
  vacationUntil: {
    type: Number,
    optional: true,
  },
  notifications: {
    type: Object,
  },
  'notifications.oneSignalId': {
    type: String,
    optional: true,
  },
  'notifications.water': {
    type: Boolean,
    defaultValue: true,
  },
  'notifications.motivation': {
    type: Boolean,
    defaultValue: true,
  },
  'notifications.dailyTask': {
    type: Boolean,
    defaultValue: true,
  },
  'notifications.endOfDay': {
    type: Boolean,
    defaultValue: true,
  },
  'notifications.chat': {
    type: Boolean,
    defaultValue: true,
  },
  privacy: {
    type: Object,
  },
  'privacy.contacts': {
    type: Boolean,
    defaultValue: true,
  },
  'privacy.progress': {
    type: Boolean,
    defaultValue: true,
  },
  'privacy.blocks': {
    type: Boolean,
    defaultValue: true,
  },
  introduction: {
    type: Object,
  },
  'introduction.myDay': {
    type: Boolean,
    defaultValue: false,
  },
  'introduction.today': {
    type: Boolean,
    defaultValue: false,
  },
  'introduction.profile': {
    type: Boolean,
    defaultValue: false,
  },
  'introduction.leftMenu': {
    type: Boolean,
    defaultValue: false,
  },
  'introduction.chats': {
    type: Boolean,
    defaultValue: false,
  },
  'introduction.history': {
    type: Boolean,
    defaultValue: false,
  },
});

const feesSchema = new SimpleSchema({
  amount: {
    type: Number,
  },
  toPay: {
    type: Number,
    defaultValue: 0,
  },
  items: {
    type: [Object],
  },
  'items.$.name': {
    type: String,
  },
  'items.$.date': {
    type: Number,
  },
});

const userSchema = new SimpleSchema({
  personalData: {
    type: personalDataSchema,
  },
  blocked: {
    type: Boolean,
    defaultValue: false,
  },
  blocks: {
    type: Object,
    blackbox: true,
  },
  onboard: {
    type: Object,
    blackbox: true,
  },
  fees: {
    type: feesSchema,
  },
  serviceData: {
    type: serviceDataSchema,
  },
});

Meteor.users.attachSchema(userSchema);
