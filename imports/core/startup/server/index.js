// Some startup logic and config
import '/imports/onboard/startup/server';

import './accounts';
import './config';
import './cron';
import './fixture';
import './slingshot';

import '../../api/models/days/days_methods.js';
import '../../api/models/days/days_pubs.js';

import '../../api/models/users/users_methods.js';
import '../../api/models/users/users_pubs.js';
import '../../api/models/tasks/tasks_methods.js';
import '../../api/models/tasks/tasks_pubs.js';
import '../../api/models/tasks/tasks_fixture.js';

import '/imports/chats/startup/server/index.js';
import '/imports/notifications/startup/server/index.js';
import '../../api/models/groups/groups_methods.js';
import '../../api/models/groups/groups_pubs.js';
