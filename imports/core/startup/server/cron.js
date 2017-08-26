import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import moment from 'moment';
import 'moment-timezone';
import _ from 'underscore';

import { onesignalClient } from '/imports/notifications';
import { Days, Tasks, Activity } from '/imports/core';

const waterTexts = [
  'Выпейте еще воды! Это совсем не сложно, но производит грандиозный эффект в перспективе!',
  'Вода - главное вещество в нашем огранизме! Не забвайте поддерживать водный баланс - выпейте стакан воды прямо сейчас!',
  'Сейчас же прервитесь, и выпейте стакан воды! Нельзя допкскать обезвоживания',
  'Выпейте еще стакан воды!',
  'Прямо ейчас прервитесь, оглянитесь вокруг, раззлабьтесь и пойдите выпейте стакан воды',
  'Пожалуйста, выпейте еще стакан воды!',
  'Не забывайте про водный баланс - это очень важно для всех процессов! Прямо сейчас выпейте стакан воды',
  'Вода для мозга - это как масло для двигателя в автомобиле. Выпейте стакан воды прямо сейчас',
  'Водный баланс - это главный секрет молодости тела, живости ума и бодрости духа. Выпейте стакан воды прямо сейчас!',
  'Стакан воды ждет вас! Идите и выпейте его прямо сейчас',
];

const motivationTexts = [
  'Остановитесь на минутку! Серьезно, отложите все дела, и вспомните, ради чего вы все это делаете. К чему вы действительно стремитесь?',
  'У вас все получится! Если вы будете усердно идти к своей цели, какой бы сложной она вам не казалась, пусть и маленькими шажками, то вы непременно ее достигнете!',
  'Путь к любой большой цели - это большой набор маленьких действий. Главное - всегда помнить, в каком направдении двигаться! Подумайте еще раз о своих главных целях',
  'Вы на верном пути! Главное не отчаивайтесь, и продолжайте маленькими шагами создавать лучшего себя',
  'Помните, все зависит от вашего внутреннего настроя. Просто поверьте в успех, и он придет!',
  'Вы не представляете, какой силой обладает вера. Поверьте в себя!',
  'Помните, главное - всегда помнить о том, куда и зачем вы идете. Подумайте об этом!',
  'Остановитесь! Задумайтесь, ведет ли то что вы делаете сейчас к вашим целям?',
];

const dailyTaskTexts = [
  'Ваше дневное задание ждет вас!',
  'Прочитайте новое задание! Оно сегодня очень интересное',
  'Для вас новое задание на сегодня, прочтите его прямо сейчас!',
];

const endOfDayTexts = [
  'Пожажуйста, выполните все задания на сегодня! У вас еще осталось 2 часа',
  'Выполните все задания на сегодня, иначе придется заплатить штраф',
  'Не позволяйте себе слабости! Выполните все задания на сегодня',
];

SyncedCron.add({
  name: 'Add new days',
  schedule: function newDaysSchedule(parser) {
    return parser.text('every 1 hour');
  },
  job: function newDaysJob() {
    // TODO Need to run it in half an hour, to check if a block is already added
    // TODO Need to be optimized using batch insert and aggregation on first major release
    Meteor.users.find().forEach((u) => {
      const {
        personalData: {
          timezone,
          firstName,
          lastName,
        },
        serviceData: {
          groupId,
          vacationUntil,
          privacy: {
            progress,
          },
        },
      } = u;
      const currentUsersTime = moment.tz(timezone);
      const currentHour = parseInt(currentUsersTime.format('HH'), 10);
      if (currentHour === 0) {
        const currentDay = Days.findOne({ userId: u._id }, { sort: { createdAt: -1 } });
        const now = Date.now();
        if (currentDay) {
          console.log(`Adding block for ${firstName} ${lastName}`);
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
            if (vacationUntil && vacationUntil >= now) obj.isVacation = true;
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
              if (block !== 'custom') {
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
              } else {
                blockData.filter(data => data.enabled).forEach(data => {
                  const {
                    name,
                    color,
                    frequency,
                    type,
                    _id: blockId,
                  } = data;
                  const isToAdd = (() => {
                    if (frequency.name === 'daily') {
                      return true;
                    } else if (frequency.name === 'days') {
                      const userMoment = moment(currentUsersTime.format('DD/MM/YYYY HH:mm:SS'), 'DD/MM/YYYY HH:mm:SS');
                      const weekday = `${userMoment.weekday() + 1}`;
                      return frequency.options.dayNames.includes(weekday);
                    } else if (frequency.name === 'monthly') {
                      const userMoment = moment(currentUsersTime.format('DD/MM/YYYY HH:mm:SS'), 'DD/MM/YYYY HH:mm:SS');
                      return frequency.options.date === `${userMoment.date()}`;
                    }
                  })();
                  if (isToAdd) {
                    const blockDoc = {
                      name: 'custom',
                      options: {
                        color,
                        type,
                        frequency,
                        name,
                        _id: blockId,
                      },
                      passed: false,
                      closed: false,
                    };
                    obj.blocks.push(blockDoc);
                  }
                });
              }
            });
            Days.insert(obj);
            const uncheckedBlocks = currentDay.blocks.filter(b => !b.passed);
            if (uncheckedBlocks.length > 0 && !vacationUntil) {
              const { items = [], toPay, amount } = u.fees;
              let newToPay = toPay;
              const query = { $set: {} };
              if (items.length) {
                const min = _.min(items, i => i.date);
                if (now - min > 259000000) {
                  query.$set.blocked = true;
                }
              }
              uncheckedBlocks.forEach((b) => {
                newToPay += amount;
                items.push({ name: b.name, date: moment(currentDay.createdAt).valueOf() });
              });
              query.$set['fees.toPay'] = newToPay;
              query.$set['fees.items'] = items;
              Meteor.users.update(u._id, query);
              if (progress) {
                Activity.insert({
                  groupId,
                  userData: {
                    _id: u._id,
                    firstName,
                    lastName,
                  },
                  type: 'FEE',
                  name: newToPay,
                });
              }
            }
            if (vacationUntil && vacationUntil <= now) {
              Meteor.users.update(u._id, {
                $set: {
                  'serviceData.vacationUntil': null,
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

// SyncedCron.add({
//   name: 'Test days',
//   schedule: function newTestDaysSchedule(parser) {
//     return parser.text('every 1 second');
//   },
//   job: function newTestDaysJob() {
//     // Need to be optimized using batch insert and aggregation on first major release
//     Meteor.users.find().forEach((u) => {
//       const {
//         personalData: {
//           timezone,
//         },
//         serviceData: {
//           vacationUntil,
//         },
//       } = u;
//       const currentUsersTime = moment.tz(timezone);
//       const now = Date.now();
//       if (true) {
//         const currentDay = Days.findOne({ userId: u._id }, { sort: { createdAt: -1 } });
//         if (currentDay) {
//           if (true) {
//             const userCreatedAt = moment(u.createdAt).tz(timezone).format('DD/MM/YYYY');
//             const day = moment(currentUsersTime.format('DD/MM/YYYY HH:mm:SS'), 'DD/MM/YYYY HH:mm:SS')
//                 .diff(moment(`${userCreatedAt} 00:00:00`, 'DD/MM/YYYY HH:mm:SS'), 'days') + 1;
//             const task = Tasks.findOne({ day });
//             const { blocks } = u;
//             let index = currentDay.index || 1;
//             index += 1;
//             const obj = {
//               userId: u._id,
//               createdAt: moment().toISOString(),
//               blocks: [],
//               index,
//               timezone,
//               isFake: true,
//             };
//             if (vacationUntil && vacationUntil >= now) obj.isVacation = true;
//             obj.blocks.push({
//               name: 'dailyTask',
//               passed: false,
//               closed: false,
//               options: {
//                 html: task.html,
//                 day,
//               },
//             });
//             Object.keys(blocks).forEach((block) => {
//               const blockData = blocks[block];
//               if (block !== 'custom') {
//                 const { enabled, options } = blockData;
//                 if (enabled) {
//                   const blockDoc = {
//                     name: block,
//                     passed: false,
//                     closed: false,
//                   };
//                   if (options) {
//                     blockDoc.options = options;
//                   }
//                   obj.blocks.push(blockDoc);
//                 }
//               } else {
//                 console.log('custom block detected');
//                 blockData.filter(data => data.enabled).forEach(data => {
//                   console.log('customData', data);
//                   const {
//                     name,
//                     color,
//                     frequency,
//                     type,
//                     _id: blockData,
//                   } = data;
//                   const isToAdd = (()=> {
//                     if (frequency.name === 'daily') {
//                       return true;
//                     } else if (frequency.name === 'days') {
//                       const userMoment = moment(currentUsersTime.format('DD/MM/YYYY HH:mm:SS'), 'DD/MM/YYYY HH:mm:SS');
//                       console.log(userMoment.toDate());
//                       const weekday = `${userMoment.weekday() + 1}`;
//                       console.log('Weekday', weekday);
//                       console.log('Week', frequency.options.dayNames);
//                       return frequency.options.dayNames.includes(weekday);
//                     } else if (frequency.name === 'monthly') {
//                       const userMoment = moment(currentUsersTime.format('DD/MM/YYYY HH:mm:SS'), 'DD/MM/YYYY HH:mm:SS');
//                       console.log(userMoment.date());
//                       console.log(frequency.options.date);
//                       return frequency.options.date === `${userMoment.date()}`;
//                     }
//                   })();
//                   if (isToAdd) {
//                     const blockDoc = {
//                       name: 'custom',
//                       options: {
//                         color,
//                         type,
//                         frequency,
//                         name,
//                         _id: blockData,
//                       },
//                       passed: false,
//                       closed: false,
//                     };
//                     obj.blocks.push(blockDoc);
//                   }
//                 });
//               }
//             });
//             console.log(obj);
//             Days.insert(obj);
//             const uncheckedBlocks = currentDay.blocks.filter(b => !b.passed);
//             if (uncheckedBlocks.length > 0 && !vacationUntil) {
//               const { items, toPay, amount } = u.fees;
//               let newToPay = toPay;
//               uncheckedBlocks.forEach((b) => {
//                 newToPay += amount;
//                 items.push({ name: b.name, date: moment(currentDay.createdAt).valueOf() });
//               });
//               const query = {
//                 $set: {
//                   'fees.toPay': newToPay,
//                   'fees.items': items,
//                 },
//               };
//               Meteor.users.update(u._id, query);
//             }
//             if (vacationUntil && vacationUntil <= now) {
//               Meteor.users.update(u._id, {
//                 $set: {
//                   'serviceData.vacationUntil': null,
//                 },
//               });
//             }
//           }
//         } else {
//           const { blocks } = u;
//           const task = Tasks.findOne({ day: 1 });
//           const obj = {
//             userId: u._id,
//             createdAt: moment().toISOString(),
//             blocks: [],
//           };
//           obj.blocks.push({
//             name: 'dailyTask',
//             passed: false,
//             closed: false,
//             options: {
//               html: task.html,
//               day: 1,
//             },
//           });
//           Object.keys(blocks).forEach((block) => {
//             const blockData = blocks[block];
//             const { enabled, options } = blockData;
//             if (enabled) {
//               const blockDoc = {
//                 name: block,
//                 passed: false,
//                 closed: false,
//                 index: 1,
//               };
//               if (options) {
//                 blockDoc.options = options;
//               }
//               obj.blocks.push(blockDoc);
//             }
//           });
//           console.log(obj);
//           Days.insert(obj);
//         }
//       }
//     });
//   },
// });

SyncedCron.add({
  name: 'Send scheduled notifications',
  schedule: function notificationsSchedule(parser) {
    return parser.text('every 1 hour');
  },
  job: function notificationsJob() {
    Meteor.users.find().forEach((u) => {
      const {
        personalData: {
          timezone,
        },
        blocks: {
          water: waterBlock,
        },
        serviceData: {
          vacationUntil,
          notifications: {
            water,
            motivation,
            dailyTask,
            endOfDay,
            oneSignalId,
          },
        },
      } = u;
      if (!vacationUntil) {
        const currentUsersTime = moment.tz(timezone);
        const currentHour = parseInt(currentUsersTime.format('HH'), 10);
        if (
          water &&
          waterBlock &&
          waterBlock.enabled &&
          [9, 12, 15, 18, 21].includes(currentHour)
        ) {
          onesignalClient.sendNotification('2 литра воды в день', {
            include_player_ids: [oneSignalId],
            contents: {
              en: _.sample(waterTexts),
              ru: _.sample(waterTexts),
            },
          });
        }
        if (motivation && [8, 14, 20].includes(currentHour)) {
          onesignalClient.sendNotification('Мотивация', {
            include_player_ids: [oneSignalId],
            contents: {
              en: _.sample(motivationTexts),
              ru: _.sample(motivationTexts),
            },
          });
        }
        if (
          (dailyTask || endOfDay) &&
          [11, 22].includes(currentHour)
        ) {
          const currentDay = Days.findOne({ userId: u._id }, { sort: { createdAt: -1 } });
          const { blocks } = currentDay;
          if (
            dailyTask && currentHour === 11 &&
            blocks.find(b => b.name === 'dailyTask') &&
            !blocks.find(b => b.name === 'dailyTask').passed
          ) {
            onesignalClient.sendNotification('Дневное задание', {
              include_player_ids: [oneSignalId],
              contents: {
                en: _.sample(dailyTaskTexts),
                ru: _.sample(dailyTaskTexts),
              },
            });
          }
          if (
            endOfDay &&
            currentHour === 22 && blocks.filter(b => !b.passed).length > 0
          ) {
            onesignalClient.sendNotification('Остались невыполненные задания', {
              include_player_ids: [oneSignalId],
              contents: {
                en: _.sample(endOfDayTexts),
                ru: _.sample(endOfDayTexts),
              },
            });
          }
        }
      }
    });
  },
});

SyncedCron.start();
