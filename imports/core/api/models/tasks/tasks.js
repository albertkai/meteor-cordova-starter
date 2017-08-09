import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tasks = new Mongo.Collection('Tasks');

// const TasksSchema = new SimpleSchema({});

// Tasks.attachSchema(TasksSchema);

export default Tasks;
