import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { profileActions, TimezoneSelect } from '/imports/profile';

export class ProfileSettingsComponent extends PureComponent {
  render() {
    const {
      setTimezone,
      setFee,
      user: {
        personalData: {
          timezone,
        },
        fees: {
          amount,
        },
      },
    } = this.props;
    return (
      <div id="profile-settings">
        <div className="main-info">
          <div className="item">
            <div>
              <h5>Временная зона:</h5>
            </div>
            <div>
              <TimezoneSelect
                timezone={timezone}
                setTimezone={setTimezone}
              />
            </div>
          </div>
          <div className="item">
            <div>
              <h5>Сумма штрафа:</h5>
            </div>
            <div>
              <input
                id="fee"
                type="number"
                defaultValue={amount}
                onChange={setFee}
              />
              <span><i className="fa fa-rouble" /></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(profileActions, dispatch);

export const ProfileSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsComponent);

export default ProfileSettings;
