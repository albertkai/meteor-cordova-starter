import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Groups = new Mongo.Collection('groups');

// const groupsSchema = new SimpleSchema({});

// Groups.attachSchema(groupsSchema);

export default Groups;
