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
          <div className="profile-form-item">
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
          <div className="profile-form-item profile-form-item-fee">
            <div>
              <h5>Сумма штрафа:</h5>
            </div>
            <div>
              <span><i className="fa fa-rouble" /></span>
              <input
                id="fee"
                type="number"
                defaultValue={amount}
                onChange={setFee}
              />
            </div>
          </div>
          <div className="profile-form-item">
            <div>
              <h5>Город:</h5>
            </div>
            <div>
              <input
                type="text"
                placeholder="напр. Москва"
              />
            </div>
          </div>
          <div className="profile-form-item">
            <div>
              <h5>Сфера:</h5>
            </div>
            <div>
              <input
                type="text"
                placeholder="напр. Веб-разработка"
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-contact">
            <div>
              <h5><i className="fa fa-facebook" /> Facebook:</h5>
            </div>
            <div>
              <input
                type="text"
                placeholder="https://facebook.com/yourname"
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-contact">
            <div>
              <h5><i className="fa fa-vk"/> Vkontakte:</h5>
            </div>
            <div>
              <input
                id="fee"
                type="text"
                placeholder="https://vk.com/yourname"
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-contact">
            <div>
              <h5><i className="fa fa-instagram"/> Instagram:</h5>
            </div>
            <div>
              <input
                type="text"
                placeholder="https://instagram.com/yourname"
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-contact">
            <div>
              <h5>О себе:</h5>
            </div>
            <div>
              <textarea
                placeholder="Опишите себя в 3х предложениях"
                rows="5"
              />
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
