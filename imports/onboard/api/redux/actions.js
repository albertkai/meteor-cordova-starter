import { Meteor } from 'meteor/meteor';

export const onboardNextStep = (timezone) => {
  return dispatch => {
    Meteor.call('onboard.onboardNextStep', timezone, (err, res) => {
      if (err) console.log(err);
    });
  };
};
