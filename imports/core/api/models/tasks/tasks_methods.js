import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { check } from 'meteor/check';

import { Tasks } from './tasks.js';

Meteor.methods({
  'tasks.getDailyTask'() {
    const user = Meteor.users.findOne(this.userId);
    const daysDiff = moment().diff(user.createdAt, 'days');
    const task = Tasks.find({ day: daysDiff });
    return task.html;
  },
});
