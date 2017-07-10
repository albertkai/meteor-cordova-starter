import { Meteor } from 'meteor/meteor';

export const onboardNextStep = (timezone) => {
  return () => {
    Meteor.call('onboard.onboardNextStep', timezone, (err) => {
      if (err) console.log(err);
    });
  };
};

export const onboardBack = () => {
  return () => {
    Meteor.call('onboard.onboardBack', (err) => {
      if (err) console.log(err);
    });
  };
};
