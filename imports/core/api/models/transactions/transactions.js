import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Transactions = new Mongo.Collection('transactions');

// const transactionsSchema = new SimpleSchema({});

// Transactions.attachSchema(transactionsSchema);

export default Transactions;
