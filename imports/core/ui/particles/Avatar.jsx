import React, { PureComponent } from 'react';

import { coreConstants } from '/imports/core';

export class Avatar extends PureComponent {
  render() {
    const { avatar } = this.props;
    const url = (() => {
      if (avatar) {
        if (avatar.match(/^(http|https)/)) {
          return avatar;
        }
        return `${coreConstants.CLOUDFRONT_URL}${avatar}`;
      }
      return `${coreConstants.CLOUDFRONT_URL}samples/default_avatar.jpg`;
    })();
    return (
      <div className="avatar" style={{ backgroundImage: `url(${url})` }}>
        {/*<div className="ovrl"><i className="fa fa-edit" /></div>*/}
      </div>
    );
  }
}

export default Avatar;
