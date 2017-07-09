import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import { Random } from 'meteor/random';
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
    const ext = _.last(file.name.split('.'));
    const fileName = Random.id();
    return `images/${fileName}.${ext}`;
  },
});
