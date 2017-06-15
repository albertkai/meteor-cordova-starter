import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { HTTP } from 'meteor/http';
import _ from 'underscore';

Accounts.onCreateUser(function(options, user) {
  if (user.services.facebook) {
    const {
      id,
      email,
      accessToken,
      gender,
      first_name,
      last_name,
      locale,
    } = user.services.facebook;
    // const fields = ['birthday', 'location'];
    // const requestString = `https://graph.facebook.com/v2.4/${id}?access_token=${ accessToken }&fields=${ fields.toString() }`;
    // const result = HTTP.get(requestString);
    // const { data: { birthday, location } } = result;
    // const birthDay = birthday ? moment(birthday, 'MM/DD/YYYY').valueOf() : Date.now();
    // let country;
    // if (location) {
    //   country = HTTP.get(`https://graph.facebook.com/v2.9/${location.id}?access_token=${accessToken}&fields=location`).data.location.country;
    // } else {
    //   country = '';
    // }
    const picResult = HTTP.get(`https://graph.facebook.com/${id}/picture`, {
      params: {
        accessToken,
        redirect: false,
        width: 320,
        height: 320,
      },
    });
    user.personalData = {
      avatar: picResult ? picResult.data.data.url : '',
      email,
      gender,
      facebookId: id,
      background: `samples/${_.random(1, 3)}.jpg`,
      createdAt: Date.now(),
      firstName: first_name,
      lastName: last_name,
      language: locale.split('_')[0],
      topics: [],
    };
    // const requestString = `https://graph.facebook.com/v2.9/${ facebookId }?access_token=${ accessToken }&fields=${ fields.join(',') }`;
    user.blocks = {};
    user.blocked = false;
    user.fees = [];
  }
  console.log(user.services);
  return user;
});