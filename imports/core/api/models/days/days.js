import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Days = new Mongo.Collection('days');

export default Days;
