import braintree from 'braintree';
import { Meteor } from 'meteor/meteor';

import { Transactions } from '/imports/core';

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "psbzkspmzyscrv39",
  publicKey: "txh5zpkk5y8n7pm9",
  privateKey: "d2201b0463ba46a1655d1c95164d5393",
});

// gateway.clientToken.generate({}, function (err, response) {
//   console.log(response.clientToken);
// });

Meteor.methods({
  'braintree.getToken': async function getToken() {
    try {
      const result = await gateway.clientToken.generate({});
      return result.clientToken;
    } catch (e) {
      console.log(e);
    }
  },

  'braintree.transaction': async function sendNounce(paymentMethodNonce) {
    const user = Meteor.users.findOne(this.userId);
    const { fees: { toPay } } = user;
    try {
      const transaction = await gateway.transaction.sale({
        amount: toPay.toFixed(2),
        paymentMethodNonce,
        options: {
          submitForSettlement: true,
        },
      });
      if (transaction.success) {
        Meteor.users.update(this.userId, {
          $set: {
            'fees.toPay': 0,
            'fees.items': [],
          },
        });
        Transactions.insert({
          status: 'SUCCESS',
          response: transaction,
          createdAt: Date.now(),
        });
        return true;
      }
      Transactions.insert({
        status: 'FAILED',
        response: transaction,
        createdAt: Date.now(),
      });
      return false;
    } catch (e) {
      console.log('Error occured during transaction', e);
      Transactions.insert({
        status: 'ERROR',
        response: e,
        createdAt: Date.now(),
      });
      return false;
    }
  },
});
