import React, { PureComponent } from 'react';

import { ProfileBlocks } from '/imports/profile';

export class MyDay extends PureComponent {
  render() {
    return (
      <div id="my-day" className="page">
        <ProfileBlocks {...this.props} />
      </div>
    );
  }
}

export default MyDay;
