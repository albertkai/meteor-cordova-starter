import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Groups = new Mongo.Collection('groups');

const groupsSchema = new SimpleSchema({
  createdAt: {
    type: Number,
  },
  people: {
    type: Number,
  },
  name: {
    type: String,
  },
});

Groups.attachSchema(groupsSchema);

export default Groups;
