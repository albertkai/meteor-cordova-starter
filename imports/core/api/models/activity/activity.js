import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Activity = new Mongo.Collection('activity');

const activitySchema = new SimpleSchema({
  groupId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    max: 1000,
  },
  userData: {
    type: Object,
  },
  'userData._id': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  'userData.firstName': {
    type: String,
    max: 100,
  },
  'userData.lastName': {
    type: String,
    max: 100,
  },
  type: {
    type: String,
    allowedValues: ['PASSED', 'FEE', 'WATER', 'ALL'],
  },
  createdAt: {
    type: Number,
    autoValue() {
      return Date.now();
    },
  },
});

Activity.attachSchema(activitySchema);

export default Activity;
