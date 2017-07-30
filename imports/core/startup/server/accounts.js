import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { HTTP } from 'meteor/http';
import _ from 'underscore';

import { Groups } from '../../api/models/groups/groups';

const GROUP_MAX = 20;

Accounts.onCreateUser(function(options, user) {
  const background = `samples/${_.random(1, 3)}.jpg`;
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
      background,
      createdAt: Date.now(),
      firstName: first_name,
      lastName: last_name,
      language: locale.split('_')[0],
    };
    // const requestString = `https://graph.facebook.com/v2.9/${ facebookId }?access_token=${ accessToken }&fields=${ fields.join(',') }`;
  }
  if (user.services.vk) {
    const {
      accessToken,
      first_name,
      last_name,
      photo_big,
      id,
      sex,
      email,
    } = user.services.vk;
    user.personalData = {
      avatar: photo_big ? photo_big : '',
      email,
      gender: sex === 2 ? 'male' : 'female',
      vkId: id,
      background,
      createdAt: Date.now(),
      firstName: first_name,
      lastName: last_name,
      language: 'ru',
    };
  }
  if (user.services.twitter) {
    const {
      profile_image_url_https,
      screenName,
      lang,
      id,
    } = user.services.twitter;
    user.personalData = {
      avatar: profile_image_url_https ? profile_image_url_https : '',
      gender: 'male',
      twitterId: id,
      background,
      createdAt: Date.now(),
      firstName: screenName.split('_')[0],
      lastName: screenName.split('_')[1],
      language: lang,
    };
  }
  if (user.services.password) {
    const {
      profile: {
        firstName,
        lastName,
      },
      email,
    } = options;
    user.personalData = {
      avatar: null,
      gender: 'male',
      email,
      background,
      createdAt: Date.now(),
      firstName,
      lastName,
      language: '',
    };
  }
  user.blocks = {};
  user.blocked = false;
  user.onboard = {
    step: 'intro',
  };
  user.fees = {
    amount: 500,
    toPay: 0,
    items: [],
  };
  let groupId = '';
  const lastGroup = Groups.findOne({}, { sort: { createdAt: -1 } });
  if (lastGroup && lastGroup.people < GROUP_MAX) {
    if (lastGroup.people < GROUP_MAX) {
      groupId = lastGroup._id;
      Groups.update(groupId, { $inc: { people: 1 } });
    }
  } else {
    groupId = Groups.insert({
      createdAt: Date.now(),
      people: 1,
    });
  }
  user.serviceData = {
    groupId,
    notifications: {
      water: true,
      motivation: true,
      dailyTask: true,
      endOfDay: true,
      chat: true,
    },
    privacy: {
      contacts: true,
      progress: true,
      blocks: true,
    },
    introduction: {
      myDay: false,
      today: false,
      profile: false,
      leftMenu: false,
      chats: false,
      history: false,
    },
  };
  return user;
});