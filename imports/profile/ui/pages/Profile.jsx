import React, { PureComponent } from 'react';

import { ProfileTop } from '../components/ProfileTop';
import { ProfileBlocks } from '../components/ProfileBlocks';

export class Profile extends PureComponent {
  render() {
    return (
      <div id="profile">
        <ProfileTop {...this.props} />
        <div className="content">
          <ProfileBlocks />
        </div>
      </div>
    );
  }
}

export default Profile;
