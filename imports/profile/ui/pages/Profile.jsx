import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ProfileTop } from '../components/ProfileTop';
import { ProfileSettings } from '../components/ProfileSettings';
import { ProfileNotifications } from '../components/ProfileNotifications';
import { ProfilePrivacy } from '../components/ProfilePrivacy';

const componentsMap = {
  info: ProfileSettings,
  privacy: ProfilePrivacy,
  notifications: ProfileNotifications,
};

export class ProfileComponent extends PureComponent {
  render() {
    const {
      profile: {
        openedTab,
      },
    } = this.props;
    const Dynamic = componentsMap[openedTab];
    return (
      <div id="profile">
        <ProfileTop {...this.props} />
        <div className="content">
          <Dynamic {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.toJS(),
});

const mapDispatchToProps = () => {};

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);

export default Profile;
