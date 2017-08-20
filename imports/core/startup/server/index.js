// Some startup logic and config
import '/imports/onboard/startup/server';
import '/imports/chats/startup/server';
import '/imports/notifications/startup/server';

import './accounts';
import './braintree';
import './config';
import './cron';
import './slingshot';

import '../../api/models/days/days_methods.js';
import '../../api/models/days/days_pubs.js';

import '../../api/models/users/users_methods.js';
import '../../api/models/users/users_pubs.js';
import '../../api/models/tasks/tasks_methods.js';
import '../../api/models/tasks/tasks_pubs.js';
import '../../api/models/tasks/tasks_fixture.js';

import '../../api/models/groups/groups_methods.js';
import '../../api/models/groups/groups_pubs.js';

import '../../api/models/transactions/transactions_methods.js';
import '../../api/models/transactions/transactions_pubs.js';

import '../../api/models/settings/settings_methods.js';
import '../../api/models/settings/settings_pubs.js';
