import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import _ from 'underscore';

Slingshot.createDirective('imageUploads', Slingshot.S3Storage, {
  bucket: 'betterme.storage',
  region: 'eu-central-1',
  acl: 'public-read',
  maxSize: 3 * 1024 * 1024,
  allowedFileTypes: [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
  ],
  authorize() {
    if (!this.userId) {
      const message = 'Please login before posting files';
      throw new Meteor.Error('Login Required', message);
    }
    return true;
  },
  key(file) {
    const filenameSplit = file.name.split('.');
    const ext = _.last(filenameSplit);
    const fileName = _.initial(filenameSplit).join('').replace(/[|&;$%@"<>()+,\s]/g, '');
    return `images/${fileName}.${ext}`;
  },
});
