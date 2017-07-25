import React, { PureComponent } from 'react';

import { ProfileTop } from '../components/ProfileTop';
import { ProfileBlocks } from '../components/ProfileBlocks';
import { ProfileSettings } from '../components/ProfileSettings';

export class Profile extends PureComponent {
  render() {
    return (
      <div id="profile">
        <ProfileTop {...this.props} />
        <div className="content">
          <div className="container paper">
            <ProfileSettings {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
