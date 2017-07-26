import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Switcher } from '/imports/core';
import * as actions from '../../api/redux/actions';

export class ProfilePrivacyComponent extends PureComponent {
  render() {
    const {
      user: {
        serviceData: {
          privacy: {
            contacts,
            progress,
            blocks,
          },
        },
      },
      togglePrivacySetting,
    } = this.props;
    return (
      <div id="profile-privacy">
        <div className="profile-item">
          <div>
            <Switcher
              checked={contacts}
              onChange={() => togglePrivacySetting('contacts')}
              noAnimation
            />
          </div>
          <div>
            <p>Мои контакты видны пользователям</p>
          </div>
        </div>
        <div className="profile-item">
          <div>
            <Switcher
              checked={progress}
              onChange={() => togglePrivacySetting('progress')}
              noAnimation
            />
          </div>
          <div>
            <p>Мой прогресс публикуется в общем потоке</p>
          </div>
        </div>
        <div className="profile-item">
          <div>
            <Switcher
              checked={blocks}
              onChange={() => togglePrivacySetting('blocks')}
              noAnimation
            />
          </div>
          <div>
            <p>Люди видят какие у меня выбраны блоки</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const ProfilePrivacy = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePrivacyComponent);

export default ProfilePrivacy;
