import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Transactions = new Mongo.Collection('transactions');

const transactionsSchema = new SimpleSchema({
  status: {
    type: String,
    allowedValues: ['SUCCESS', 'FAILED', 'ERROR'],
  },
  response: {
    type: Object,
    blackbox: true,
  },
  createdAt: {
    type: Number,
  },
});

Transactions.attachSchema(transactionsSchema);

export default Transactions;
