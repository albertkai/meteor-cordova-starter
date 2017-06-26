import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Days = new Mongo.Collection('days');

const blockSchema = new SimpleSchema({
  name: {
    type: String,
  },
  passed: {
    type: Boolean,
  },
  closed: {
    type: Boolean,
  },
  options: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  timezone: {
    type: String,
    optional: true,
  },
  data: {
    type: Object,
    blackbox: true,
    optional: true,
  },
});

const daysSchema = new SimpleSchema({
  blocks: {
    type: [blockSchema],
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

Days.attachSchema(daysSchema);

export default Days;
