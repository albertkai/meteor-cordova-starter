import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import moment from 'moment';
import 'moment-timezone';

import { Days, Tasks } from '/imports/core';

SyncedCron.add({
  name: 'Add new days',
  schedule: function(parser) {
    return parser.text('every hour');
  },
  job: function() {
    // Need to be optimized using batch insert and aggregation on first major release
    Meteor.users.find().forEach(u => {
      const { timezone } = u.personalData;
      const currentUsersTime = moment.tz(timezone);
      const currentHour = parseInt(currentUsersTime.format('HH'), 10);
      if (currentHour) {
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
            const obj = {
              userId: u._id,
              createdAt: moment().toISOString(),
              blocks: [],
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
              let { items, toPay, amount, unpaidDate } = u.fees;
              currentDay.blocks.filter(b => !b.passed).forEach(b => {
                toPay += amount;
                items.push(b.name);
              });
              Meteor.users.update(this.userId, {
                $set: {
                  'fees.toPay': toPay,
                  'fees.items': items,
                  'fees.unpaidDate': unpaidDate || Date.now(),
                },
              });
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
  name: 'Set daily fees',
  schedule: function(parser) {
    return parser.text('every hour');
  },
  job: function() {
    console.log('Yo');
  },
});

SyncedCron.add({
  name: 'Check wake up',
  schedule: function(parser) {
    return parser.text('every 10 minutes');
  },
  job: function() {
    console.log('Yo');
  },
});

SyncedCron.start();