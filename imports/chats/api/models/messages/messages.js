import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('messages');

const messagesSchema = new SimpleSchema({
  author: {
    type: String,
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
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
});

Messages.attachSchema(messagesSchema);

export default Messages;
