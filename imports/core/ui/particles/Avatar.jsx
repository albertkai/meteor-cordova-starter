import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';

import { coreConstants } from '/imports/core';

export class Avatar extends PureComponent {
  uploadMobile = () => {
    if (Meteor.isCordova && this.props.onChange) {
      this.props.onChange(null, true);
    }
  };

  render() {
    const { avatar, onChange } = this.props;
    const url = (() => {
      if (avatar) {
        if (avatar.match(/^(http|https)/)) {
          return avatar;
        }
        return `${coreConstants.CLOUDFRONT_URL}images/${avatar}`;
      }
      return `${coreConstants.CLOUDFRONT_URL}samples/default_avatar.jpg`;
    })();
    return (
      <div
        className="avatar"
        style={{ backgroundImage: `url(${url})` }}
        onClick={this.uploadMobile}
      >
        {!Meteor.isCordova && onChange && <div className="ovrl">
          <label
            className="upload-image"
            htmlFor="upload-image"
          >
            <input
              id="upload-image"
              type="file"
              onChange={onChange}
            />
            <i className="fa fa-camera" />
          </label>
        </div>}
      </div>
    );
  }
}

export default Avatar;
