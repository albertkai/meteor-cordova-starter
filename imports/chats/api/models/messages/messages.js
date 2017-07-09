import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('messages');

// const messagesSchema = new SimpleSchema({});

// Messages.attachSchema(messagesSchema);

export default Messages;
  