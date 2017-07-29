import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import moment from 'moment';
import 'moment-timezone';

import { Days, Tasks } from '/imports/core';

SyncedCron.add({
  name: 'Add new days',
  schedule: function(parser) {
    return parser.text('every 10 hours');
  },
  job: function() {
    // Need to be optimized using batch insert and aggregation on first major release
    Meteor.users.find().forEach(u => {
      const { timezone } = u.personalData;
      const currentUsersTime = moment.tz(timezone);
      const currentHour = parseInt(currentUsersTime.format('HH'), 10);
      if (currentHour === 5) {
        const currentDay = Days.findOne({ userId: u._id }, { sort: { createdAt: -1 } });
        if (currentDay) {
          const createdAtFormat = moment(currentDay.createdAt).tz(timezone).format('DD/MM/YYYY');
          const currentUsersDayFormat = currentUsersTime.format('DD/MM/YYYY');
          if (createdAtFormat !== currentUsersDayFormat) {
            const userCreatedAt = moment(u.createdAt).tz(timezone).format('DD/MM/YYYY');
            const day = moment(currentUsersTime.format('DD/MM/YYYY HH:mm:SS'), 'DD/MM/YYYY HH:mm:SS')
                .diff(moment(`${userCreatedAt} 00:00:00`, 'DD/MM/YYYY HH:mm:SS'), 'days') + 1;
            const task = Tasks.findOne({ day });
            const { blocks } = u;
            let index = currentDay.index || 1;
            index += 1;
            const obj = {
              userId: u._id,
              createdAt: moment().toISOString(),
              blocks: [],
              index,
              timezone,
            };
            obj.blocks.push({
              name: 'dailyTask',
              passed: false,
              closed: false,
              options: {
                html: task.html,
                day,
              },
            });
            Object.keys(blocks).forEach((block) => {
              const blockData = blocks[block];
              const { enabled, options } = blockData;
              if (enabled) {
                const blockDoc = {
                  name: block,
                  passed: false,
                  closed: false,
                };
                if (options) {
                  blockDoc.options = options;
                }
                obj.blocks.push(blockDoc);
              }
            });
            Days.insert(obj);
            const uncheckedBlocks = currentDay.blocks.filter(b => !b.passed);
            if (uncheckedBlocks.length > 0) {
              const { items, toPay, amount } = u.fees;
              let newToPay = toPay;
              uncheckedBlocks.forEach((b) => {
                newToPay += amount;
                items.push({ name: b.name, date: moment(currentDay.createdAt).valueOf() });
              });
              const query = {
                $set: {
                  'fees.toPay': newToPay,
                  'fees.items': items,
                },
              };
              Meteor.users.update(u._id, query);
            }
          }
        } else {
          const { blocks } = u;
          const task = Tasks.findOne({ day: 1 });
          const obj = {
            userId: u._id,
            createdAt: moment().toISOString(),
            blocks: [],
          };
          obj.blocks.push({
            name: 'dailyTask',
            passed: false,
            closed: false,
            options: {
              html: task.html,
              day: 1,
            },
          });
          Object.keys(blocks).forEach((block) => {
            const blockData = blocks[block];
            const { enabled, options } = blockData;
            if (enabled) {
              const blockDoc = {
                name: block,
                passed: false,
                closed: false,
              };
              if (options) {
                blockDoc.options = options;
              }
              obj.blocks.push(blockDoc);
            }
          });
          Days.insert(obj);
        }
      }
    });
  },
});

SyncedCron.add({
  name: 'Send scheduled notifications',
  schedule: function(parser) {
    return parser.text('every hour');
  },
  job: function() {
    const { timezone } = u.personalData;
    const currentUsersTime = moment.tz(timezone);
    const currentHour = parseInt(currentUsersTime.format('HH'), 10);
    // Water
    if ([9, 12, 15, 18, 21].includes(currentHour)) {
      Meteor.users.find({ 'blocks.water.enabled': true }).forEach(u => {
        console.log('sending push notification');
      });
    }
    if ([8, 14, 20].includes(currentHour)) {
      Meteor.users.find().forEach(u => {
        console.log('Send motivating notification');
      });
    }
    if (currentHour === 11) {
      console.log('Send the daily task notification if not marked');
    }
    // Days.find({ createdAt: moment().s }).forEach(d => {
    //   console.log(d._id);
    // });
  },
});

SyncedCron.start();