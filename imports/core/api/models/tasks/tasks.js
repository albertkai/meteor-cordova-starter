import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tasks = new Mongo.Collection('Tasks');

const TasksSchema = new SimpleSchema({
  day: {
    type: Number,
  },
  html: {
    type: String,
  },
});

Tasks.attachSchema(TasksSchema);

export default Tasks;
