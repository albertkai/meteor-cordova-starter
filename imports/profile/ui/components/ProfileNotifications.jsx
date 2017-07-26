import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Switcher } from '/imports/core';
import * as actions from '../../api/redux/actions';

export class ProfileNotificationsComponents extends PureComponent {
  render() {
    const {
      user: {
        serviceData: {
          notifications: {
            water,
            motivation,
            dailyTask,
            endOfDay,
            chat,
          },
        },
      },
      toggleNotificationSetting,
    } = this.props;
    return (
      <div id="profile-notifications">
        <div className="profile-item">
          <div>
            <Switcher
              checked={dailyTask}
              onChange={() => toggleNotificationSetting('dailyTask')}
              noAnimation
            />
          </div>
          <div>
            <p>Напоминание о дневном задании</p>
          </div>
        </div>
        <div className="profile-item">
          <div>
            <Switcher
              checked={motivation}
              onChange={() => toggleNotificationSetting('motivation')}
              noAnimation
            />
          </div>
          <div>
            <p>Мотивационные напоминания</p>
          </div>
        </div>
        <div className="profile-item">
          <div>
            <Switcher
              checked={water}
              onChange={() => toggleNotificationSetting('water')}
              noAnimation
            />
          </div>
          <div>
            <p>Напоминание выпить стакан воды</p>
          </div>
        </div>
        <div className="profile-item">
          <div>
            <Switcher
              checked={endOfDay}
              onChange={() => toggleNotificationSetting('endOfDay')}
              noAnimation
            />
          </div>
          <div>
            <p>Напоминание о невыполненных заданиях в конце дня</p>
          </div>
        </div>
        <div className="profile-item">
          <div>
            <Switcher
              checked={chat}
              onChange={() => toggleNotificationSetting('chat')}
              noAnimation
            />
          </div>
          <div>
            <p>Оповещения из чата</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const ProfileNotifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileNotificationsComponents);

export default ProfileNotifications;
