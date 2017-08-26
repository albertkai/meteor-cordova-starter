import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('messages');

const messagesSchema = new SimpleSchema({
  author: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  thread: {
    type: String,
  },
  userData: {
    type: Object,
  },
  'userData.avatar': {
    type: String,
  },
  'userData.firstName': {
    type: String,
  },
  'userData.lastName': {
    type: String,
  },
  content: {
    type: String,
    max: 3000,
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Number,
    autoValue() {
      return Date.now();
    },
  },
});

Messages.attachSchema(messagesSchema);

export default Messages;
